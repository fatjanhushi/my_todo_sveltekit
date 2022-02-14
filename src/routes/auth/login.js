import { connectToDatabase } from '$lib/mongodb'
import { validAll } from '$lib/validationUtils'

export async function get({ request }) {
	return {}
}

export async function post({ request }) {
	const { email, password } = await request.json()

	if (!validAll(email, password)) {
		return {
			status: 500,
			body: {
				error: 'Bad Credentials',
			},
		}
	}
	return {
		body: {
			error: 'User not found',
		},
	}
}
