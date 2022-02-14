import { connectToDatabase } from '$lib/mongodb'
import * as cookie from 'cookie'
import { v4 as uuidv4 } from 'uuid'

export async function get({ request }) {
	return {}
}

export async function post({ request }) {
	const jsonRes = await request.json()

	console.log(jsonRes)

	return {
		status: 500,
		body: {
			error: 'User not found',
		},
	}
}
