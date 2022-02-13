import { connectToDatabase } from '$lib/mongodb'

export async function get({ request }) {
	return {
		body: {
			name: 'Success',
		},
	}
}

export async function post({ request }) {
	const data = await request.json()
	console.log(data)
	return {
		body: data,
	}
}
