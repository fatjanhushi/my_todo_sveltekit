import { connectToDatabase } from '$lib/mongodb'
import stringHash from 'string-hash'
import * as cookie from 'cookie'
import { v4 as uuidv4 } from 'uuid'
import { validAll } from '$lib/validationUtils'

export async function get({ request }) {
	return {}
}

export async function post({ request }) {
	const { name, email, password } = await request.json()

	//check if request data for the user is valid
	if (!validAll(email, password, name)) {
		return {
			status: 401,
			body: {
				error: 'Bad Credentials',
			},
		}
	}

	//check if user exists on the database
	const conn = await connectToDatabase()
	const usersCollection = conn.db.collection('users')
	const user = await usersCollection.findOne({ email })
	if (user) {
		return {
			status: 409,
			body: {
				error: 'User already exists',
			},
		}
	}

	//insert user on the database
	await usersCollection.insertOne({
		name,
		email,
		password: stringHash(password),
	})

	//generate cookieId and insert cookie on the database
	const cookieId = uuidv4()
	const cookiesCollection = conn.db.collection('cookies')
	await cookiesCollection.insertOne({ email, cookieId })

	const headers = {
		'Set-Cookie': cookie.serialize('session_id', cookieId, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'lax',
			path: '/',
		}),
	}

	return {
		status: 201,
		headers,
		body: {
			message: 'User created',
		},
	}
}
