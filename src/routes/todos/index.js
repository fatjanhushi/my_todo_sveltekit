import { connectToDatabase } from '$lib/mongodb'
import { ObjectId } from 'mongodb'

export async function get({ url }) {
	const completed = url.searchParams.get('completed')
	//console.log(completed)
	let todos

	try {
		const conn = await connectToDatabase()
		const collection = conn.db.collection('todos')

		if (completed) {
			todos = await collection.find({ completed }).toArray()
		} else {
			//select all todos inf searchParam('completed') is not set to true
			todos = await collection.find({}).toArray()
		}

		return {
			status: 200,
			body: {
				todos: todos,
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
	} catch (error) {
		return {
			status: 500,
			body: 'An error occurred',
		}
	}
}

export async function put({ request }) {
	try {
		const conn = await connectToDatabase()
		const collection = conn.db.collection('todos')

		const todo = await request.json()
		//await collection.updateOne({_id:},)

		//TODO

		return {
			status: 204,
			body: {
				status: 'Success',
			},
		}
	} catch {
		return {
			status: 500,
			body: 'An error occurred',
		}
	}
}

export async function del({ request }) {
	//TODO
}
