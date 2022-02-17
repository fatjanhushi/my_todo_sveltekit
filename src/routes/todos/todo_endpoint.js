import { connectToDatabase } from '$lib/mongodb'
import { ObjectId } from 'mongodb'

export async function get({ url, request }) {
	//get cookieId from the request
	const cookieId = request.headers.get('cookie').split('=')[1]

	let todos

	try {
		const conn = await connectToDatabase()
		//find the user from the cookies collection on the database
		let collection = conn.db.collection('cookies')
		const user = await collection.findOne({ cookieId })
		//find all the todos that have user.email
		collection = conn.db.collection('todos')
		todos = await collection.find({ email: user.email }).toArray()

		return {
			status: 200,
			body: {
				todos,
			},
		}
	} catch {
		return {
			status: 500,
			body: {
				error: 'Server error',
			},
		}
	}
}

export async function post({ request }) {
	try {
		const conn = await connectToDatabase()
		const collection = conn.db.collection('todos')

		const todo = await request.json() //access reques body
		await collection.insertOne(todo)

		return {
			status: 201,
			body: {
				status: 'Success',
			},
		}
	} catch {
		return {
			status: 500,
			body: {
				error: 'Server error',
			},
		}
	}
}

export async function put({ request }) {
	try {
		const conn = await connectToDatabase()
		const collection = conn.db.collection('todos')

		const { _id, name, completed } = await request.json()
		await collection.updateOne(
			{ _id: ObjectId(_id) },
			{ $set: { name, completed } }
		)

		return {
			status: 204,
			body: {
				status: 'Success',
			},
		}
	} catch {
		return {
			status: 500,
			body: {
				error: 'Server error',
			},
		}
	}
}

export async function del({ request }) {
	try {
		const conn = await connectToDatabase()
		const collection = conn.db.collection('todos')

		const _id = await request.json()
		await collection.deleteOne({ _id: ObjectId(_id) })

		return {
			status: 202,
			body: {
				status: 'Success',
			},
		}
	} catch {
		return {
			status: 500,
			body: {
				error: 'Server error',
			},
		}
	}
}
