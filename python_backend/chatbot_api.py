#!/usr/bin/env python3
"""
API interface for the NetworkBot Python backend.
Processes requests from the Next.js frontend.
"""

import sys
import json
import os
from pathlib import Path
import logging
from pymongo import MongoClient

# Add the src directory to Python path
sys.path.append(str(Path(__file__).parent.parent / 'src'))

from src.model.chatbot import NetworkChatbot

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ChatbotAPI:
    def __init__(self):
        """Initialize the chatbot API."""
        try:
            model_path = Path(__file__).parent.parent / 'models' / 'retriever.pkl'
            # Connect to MongoDB
            self.client = MongoClient("mongodb+srv://0ua1idfullofhate:oualidtescon@cluster0.l1fzvlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
            self.db = self.client["networkbot"]
            self.chat_collection = self.db["chats"]
            self.chatbot = NetworkChatbot(str(model_path))
            logger.info("Chatbot API initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize chatbot: {e}")
            raise

    def process_request(self, request_id):
        """Process a chat request."""
        try:
            # Read input from MongoDB
            request_data = self.chat_collection.find_one({"_id": request_id})
            if not request_data:
                raise ValueError(f"Request {request_id} not found")

            message = request_data["message"]
            logger.info(f"Processing request {request_id}: {message[:50]}...")
            
            # Generate response using the trained model
            response = self.chatbot.generate_response(message)
            
            # Get retrieval confidence (optional)
            retrieved_results = self.chatbot.retriever.retrieve(message, top_k=1)
            confidence = retrieved_results[0]['score'] if retrieved_results else 0.5
            
            # Store response in MongoDB
            self.chat_collection.update_one(
                {"_id": request_id},
                {
                    "$set": {
                        "response": response,
                        "confidence": float(confidence),
                        "timestamp": request_data["timestamp"]
                    }
                }
            )
            
            logger.info(f"Request {request_id} processed successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error processing request {request_id}: {e}")
            
            return False

def main():
    """Main function to process a single request."""
    if len(sys.argv) != 2:
        print("Usage: python chatbot_api.py <request_id>")
        sys.exit(1)
    
    request_id = sys.argv[1]
    
    try:
        api = ChatbotAPI()
        success = api.process_request(request_id)
        sys.exit(0 if success else 1)
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
