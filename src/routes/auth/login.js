import { connectToDatabase } from '$lib/mongodb'

export async function get({ request }) {
	return {
		body: {
			name: 'Success',
		},
	}
}

export async function post({ request }) {
	const jsonRes = await request.json()
	const email = jsonRes.email

	console.log(email)
	return {
		body: {
			error: 'User not found',
		},
	}
}
