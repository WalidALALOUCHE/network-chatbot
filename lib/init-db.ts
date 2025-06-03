import { getDb } from './db'

export async function initializeDatabase() {
  try {
    const db = await getDb()

    // Create Users collection
    const usersCollection = db.collection('users')
    await usersCollection.createIndex({ email: 1 }, { unique: true })
    await usersCollection.createIndex({ name: 1 })

    // Create Conversations collection
    const conversationsCollection = db.collection('conversations')
    await conversationsCollection.createIndex({ userId: 1 })
    await conversationsCollection.createIndex({ createdAt: -1 })
    await conversationsCollection.createIndex({ updatedAt: -1 })

    // Create Messages collection
    const messagesCollection = db.collection('messages')
    await messagesCollection.createIndex({ conversationId: 1 })
    await messagesCollection.createIndex({ userId: 1 })
    await messagesCollection.createIndex({ timestamp: -1 })
    await messagesCollection.createIndex({ conversationId: 1, timestamp: 1 })

    console.log('Database initialized successfully')
    return true
  } catch (error) {
    console.error('Failed to initialize database:', error)
    throw error
  }
} 