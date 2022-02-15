import * as cookie from 'cookie'
import { connectToDatabase } from '$lib/mongodb'

export async function handle({ event, resolve }) {
	const response = await resolve(event)
	console.log('response created')

	const cookies = cookie.parse(event.request.headers.get('cookie') || '')
	if (cookies.session_id) {
		console.log('cookie exists')
		const conn = await connectToDatabase()
		const cookiesCollection = conn.db.collection('cookies')
		const user = await cookiesCollection.findOne({
			cookieId: cookies.session_id,
		})
		if (user) {
			console.log('user exists')
			event.locals.user = user
			response.headers.set('X-Authenticated-User', user.email)
		}
	}

	return response
}

export function getSession(event) {
	console.log('getSession function')
	return event.locals.user
		? {
				user: {
					// only include properties needed client-side —
					// exclude anything else attached to the user
					// like access tokens etc
					name: event.locals.user.name,
					email: event.locals.user.email,
				},
		  }
		: {}
}
