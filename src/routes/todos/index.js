import clientPromise from '$lib/mongodb-client'

export async function get(request) {
  const client = await clientPromise
  const db = client.db()
  const collection = db.databaseName
  //const todos = await collection.find()

  return {
    status: 200,
    body: {
      todos: collection,
    },
  }
}
