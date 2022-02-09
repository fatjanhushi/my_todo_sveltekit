import { connectToDatabase } from '$lib/mongodb'

export async function get(request) {
  const conn = await connectToDatabase()
  const collection = conn.db.collection('todos')
  const todos = await collection.find({}).toArray()
  //const todos = await collection.find()

  return {
    status: 200,
    body: {
      todos: todos,
    },
  }
}
