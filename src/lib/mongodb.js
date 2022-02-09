import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()

const { MONGODB_URI, DB_NAME } = process.env

let cachedClient = null
let cachedDb = null

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}

if (!DB_NAME) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env'
  )
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = await client.db(DB_NAME)

  cachedClient = client
  cachedDb = db

  return { client, db }
}
