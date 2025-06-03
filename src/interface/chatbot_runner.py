"""
File-based chatbot runner for integration with web interface.
Continuously monitors for query files and processes them.
"""

import json
import os
import sys
import time
from pathlib import Path
import logging

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent.parent))

from src.model.chatbot import NetworkChatbot

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ChatbotRunner:
    def __init__(self, model_path="models/retriever.pkl"):
        """Initialize the chatbot runner."""
        self.chatbot = NetworkChatbot(model_path)
        
        # Paths for communication
        self.input_dir = Path("data/interface/input")
        self.output_dir = Path("data/interface/output")
        
        # Create directories if they don't exist
        self.input_dir.mkdir(parents=True, exist_ok=True)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        logger.info("ChatbotRunner initialized successfully")
    
    def process_query(self, query_id, query_text):
        """Process a query and save the response."""
        try:
            logger.info(f"Processing query {query_id}: {query_text[:50]}...")
            
            # Generate response
            response = self.chatbot.generate_response(query_text)
            
            # Save response
            output_file = self.output_dir / f"{query_id}_response.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump({
                    "id": query_id, 
                    "response": response,
                    "timestamp": time.time()
                }, f, indent=2)
            
            # Remove the input file
            input_file = self.input_dir / f"{query_id}_query.json"
            if input_file.exists():
                input_file.unlink()
            
            logger.info(f"Query {query_id} processed successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error processing query {query_id}: {str(e)}")
            
            # Save error
            output_file = self.output_dir / f"{query_id}_error.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump({
                    "id": query_id, 
                    "error": str(e),
                    "timestamp": time.time()
                }, f, indent=2)
            
            return False
    
    def run(self):
        """Main loop to check for new queries."""
        logger.info("Starting NetworkBot query processor...")
        logger.info(f"Monitoring directory: {self.input_dir}")
        logger.info("Press Ctrl+C to stop")
        
        try:
            while True:
                # Check for query files
                query_files = list(self.input_dir.glob("*_query.json"))
                
                for query_file in query_files:
                    try:
                        # Read query
                        with open(query_file, 'r', encoding='utf-8') as f:
                            query_data = json.load(f)
                        
                        query_id = query_data.get("id")
                        query_text = query_data.get("query")
                        
                        if query_id and query_text:
                            self.process_query(query_id, query_text)
                        else:
                            logger.warning(f"Invalid query file format: {query_file}")
                            query_file.unlink()  # Remove invalid file
                            
                    except Exception as e:
                        logger.error(f"Error reading query file {query_file}: {e}")
                        # Move problematic file
                        error_file = self.input_dir / f"error_{query_file.name}"
                        query_file.rename(error_file)
                
                # Sleep before checking again
                time.sleep(1)
                
        except KeyboardInterrupt:
            logger.info("Shutting down NetworkBot query processor...")

def main():
    """Main function."""
    try:
        runner = ChatbotRunner()
        runner.run()
    except Exception as e:
        logger.error(f"Failed to start chatbot runner: {str(e)}")
        print(f"Error: {str(e)}")
        print("Make sure the model is trained first by running 'python src/model/train.py'")

if __name__ == "__main__":
    main()
