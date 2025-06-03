"""
Training script for NetworkBot retriever component.
"""

import argparse
import logging
import os
import sys
from pathlib import Path

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent.parent))

from src.model.retriever import NetworkQARetriever

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('training.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def train_retriever(train_data_path, output_path):
    """Train the retriever component."""
    logger.info("="*50)
    logger.info("STARTING NETWORKBOT TRAINING")
    logger.info("="*50)
    
    # Check if training data exists
    if not os.path.exists(train_data_path):
        raise FileNotFoundError(f"Training data not found at {train_data_path}")
    
    logger.info(f"Training retriever with data from {train_data_path}")
    
    try:
        # Initialize and train retriever
        retriever = NetworkQARetriever(data_path=train_data_path)
        
        # Get and log statistics
        stats = retriever.get_stats()
        logger.info(f"Training completed successfully!")
        logger.info(f"Model statistics: {stats}")
        
        # Save the trained model
        retriever.save(output_path)
        
        logger.info("="*50)
        logger.info("TRAINING COMPLETED SUCCESSFULLY!")
        logger.info("="*50)
        logger.info(f"Model saved to: {output_path}")
        logger.info(f"Q&A pairs processed: {stats['num_qa_pairs']}")
        logger.info(f"Vocabulary size: {stats['vocabulary_size']}")
        logger.info("\nNext step: Run 'python src/model/evaluate.py' to test the model")
        
        return True
        
    except Exception as e:
        logger.error(f"Training failed: {str(e)}")
        raise

def main():
    parser = argparse.ArgumentParser(description="Train the NetworkBot retriever")
    parser.add_argument("--data", default="data/processed/network_qa_train.json", 
                        help="Path to training data JSON file")
    parser.add_argument("--output", default="models/retriever.pkl",
                        help="Path to save the trained retriever model")
    
    args = parser.parse_args()
    
    # Create output directory if it doesn't exist
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)
    
    try:
        # Train the retriever
        train_retriever(args.data, args.output)
        
        print("\n" + "="*50)
        print("SUCCESS! Your NetworkBot is ready to use!")
        print("="*50)
        print("To test your bot, run:")
        print("python src/interface/chatbot_cli.py --query 'What is TCP/IP?'")
        
    except Exception as e:
        print(f"\nERROR: {str(e)}")
        print("\nPlease check:")
        print("1. Data preprocessing completed successfully")
        print("2. Training data file exists")
        print("3. All dependencies are installed")

if __name__ == "__main__":
    main()
