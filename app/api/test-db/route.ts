import { NextResponse } from 'next/server'
import { insertOne, find } from '@/lib/db'

export async function GET() {
  try {
    // Test the connection by inserting a test document
    const testDoc = {
      message: 'Test connection',
      timestamp: new Date(),
    }
    
    await insertOne('test', testDoc)
    
    // Retrieve the test document
    const docs = await find('test')
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      data: docs
    })
  } catch (error) {
    console.error('MongoDB connection test failed:', error)
    return NextResponse.json({
      success: false,
      message: 'MongoDB connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 