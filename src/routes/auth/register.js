import { connectToDatabase } from '$lib/mongodb'
import * as cookie from 'cookie'
import { v4 as uuidv4 } from 'uuid'

export async function get({ request }) {
	return {}
}

export async function post({ request }) {
	//const formData = await request.formData()
	const data = await request.json()

	console.log(data)
	return {
		status: 303,
		headers: {
			location: '/todos',
		},
		body: {
			error: 'Form validation error',
		},
	}
}
