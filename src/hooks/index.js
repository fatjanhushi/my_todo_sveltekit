import * as cookie from 'cookie'
import { connectToDatabase } from '$lib/mongodb'

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '')

	if (cookies.session_id) {
		const conn = await connectToDatabase()
		const cookiesCollection = conn.db.collection('cookies')
		const user = await cookiesCollection.findOne({
			cookieId: cookies.session_id,
		})
		if (user) {
			event.locals.user = user
		}
	}
	const response = await resolve(event)
	return response
}

export function getSession(event) {
	return event.locals.user
		? {
				user: {
					email: event.locals.user.email,
				},
		  }
		: {}
}
