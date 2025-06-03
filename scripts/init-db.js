const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://0ua1idfullofhate:oualidtescon@cluster0.l1fzvlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function testConnection() {
  const client = new MongoClient(uri);
  
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Successfully connected to MongoDB.');
    
    const db = client.db('networkbot');
    
    // Test creating collections and indexes
    console.log('Creating collections and indexes...');
    
    // Users collection
    const usersCollection = db.collection('users');
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.createIndex({ name: 1 });
    console.log('Users collection initialized');
    
    // Conversations collection
    const conversationsCollection = db.collection('conversations');
    await conversationsCollection.createIndex({ userId: 1 });
    await conversationsCollection.createIndex({ createdAt: -1 });
    await conversationsCollection.createIndex({ updatedAt: -1 });
    console.log('Conversations collection initialized');
    
    // Messages collection
    const messagesCollection = db.collection('messages');
    await messagesCollection.createIndex({ conversationId: 1 });
    await messagesCollection.createIndex({ userId: 1 });
    await messagesCollection.createIndex({ timestamp: -1 });
    await messagesCollection.createIndex({ conversationId: 1, timestamp: 1 });
    console.log('Messages collection initialized');
    
    console.log('Database initialization completed successfully!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

testConnection(); 