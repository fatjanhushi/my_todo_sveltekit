import { connectToDatabase } from '$lib/mongodb'
import { v4 as uuidv4 } from 'uuid'
import * as cookie from 'cookie'
import stringHash from 'string-hash'
import { validAll } from '$lib/validationUtils'

export async function get({ request }) {
	return {}
}

export async function post({ request }) {
	const { email, password } = await request.json()

	if (!validAll(email, password)) {
		return {
			status: 401,
			body: {
				error: 'Bad Credentials',
			},
		}
	}

	//connect to database and check for a user with that email
	const conn = await connectToDatabase()
	const usersCollection = conn.db.collection('users')
	const user = await usersCollection.findOne({ email })
	if (!user) {
		return {
			status: 400,
			body: {
				error: 'Incorrect email or password',
			},
		}
	}

	//user exists -> check for matching password
	if (user.password !== stringHash(password)) {
		return {
			status: 400,
			body: {
				error: 'Invali credentials',
			},
		}
	}

	//generate cookieId and insert cookie on the database
	const cookieId = uuidv4()
	const cookiesCollection = conn.db.collection('cookies')
	await cookiesCollection.updateOne(
		{ email },
		{ $set: { cookieId } },
		{ upsert: true }
	)

	const headers = {
		'Set-Cookie': cookie.serialize('session_id', cookieId, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'lax',
			path: '/',
		}),
	}

	return {
		status: 200,
		headers,
		body: {
			message: 'Success',
		},
	}
}
