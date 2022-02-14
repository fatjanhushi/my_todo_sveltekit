import { connectToDatabase } from '$lib/mongodb'
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
			status: 500,
			body: {
				error: 'Bad Credentials',
			},
		}
	}

	//check if user exists on the database
	const conn = await connectToDatabase()
	const collection = conn.db.collection('users')
	const user = await collection.findOne({ email })
	if (user) {
		return {
			status: 500,
			body: {
				error: 'User already exists',
			},
		}
	} else {
		await collection.insertOne({ name, email, password }) //TODO encrypt password
		return {
			status: 201,
			body: {
				message: 'User created',
			},
		}
	}
}
