import clientPromise from './mongodb'

export async function getDb() {
  const client = await clientPromise
  return client.db('networkbot') // You can change 'networkbot' to your preferred database name
}

export async function getCollection(collectionName: string) {
  const db = await getDb()
  return db.collection(collectionName)
}

// Example functions for common operations
export async function insertOne(collectionName: string, document: any) {
  const collection = await getCollection(collectionName)
  return collection.insertOne(document)
}

export async function find(collectionName: string, query: any = {}) {
  const collection = await getCollection(collectionName)
  return collection.find(query).toArray()
}

export async function findOne(collectionName: string, query: any) {
  const collection = await getCollection(collectionName)
  return collection.findOne(query)
}

export async function updateOne(collectionName: string, query: any, update: any) {
  const collection = await getCollection(collectionName)
  return collection.updateOne(query, { $set: update })
}

export async function deleteOne(collectionName: string, query: any) {
  const collection = await getCollection(collectionName)
  return collection.deleteOne(query)
} 