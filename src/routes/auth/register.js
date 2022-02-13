import { connectToDatabase } from '$lib/mongodb'

export async function get({ request }) {
	return {}
}

export async function post({ request }) {
	const formData = await request.formData()

	if (
		!formData.has('name') ||
		!formData.has('email') ||
		!formData.has('password')
	)
		return {
			status: 400,
		}

	const name = formData.get('name')
	const email = formData.get('email')
	const password = formData.get('password')
	console.log(name, email, password)
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
