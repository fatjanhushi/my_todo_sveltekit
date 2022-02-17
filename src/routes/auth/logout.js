import { connectToDatabase } from '../../lib/mongodb'

export async function post({ request }) {
	const cookieId = request.headers.get('cookie').split('=')[1]

	const conn = await connectToDatabase()
	const collection = conn.db.collection('cookies')
	try {
		await collection.updateOne(
			{ cookieId },
			{
				$set: {
					cookieId: '',
				},
			}
		)
	} catch {
		return {
			headers: {
				'set-cookie':
					'session_id=""; path=/; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT',
			},
			body: {
				message: 'error',
			},
		}
	}

	return {
		headers: {
			'set-cookie':
				'session_id=""; path=/; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT',
		},
		body: {
			message: 'success',
		},
	}
}
