import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI && process.env.MODE === 'prod') {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI || ''
const options = {}

let client
let clientPromise: Promise<MongoClient>

const G = global as { _mongoClientPromise?: Promise<MongoClient> }

if (process.env.MODE === 'dev') {
  if (!G._mongoClientPromise) {
    client = new MongoClient(uri, options)
    G._mongoClientPromise = client.connect()
  }
  clientPromise = G._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise || {}
