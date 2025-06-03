"""
Evaluation script for NetworkBot.
Tests the model on validation and test data.
"""

import json
import sys
import logging
from pathlib import Path
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent.parent))

from src.model.chatbot import NetworkChatbot

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class NetworkBotEvaluator:
    def __init__(self, model_path="models/retriever.pkl"):
        """Initialize evaluator with trained model."""
        self.chatbot = NetworkChatbot(model_path)
        
    def evaluate_retrieval_accuracy(self, test_data_path, top_k=3):
        """Evaluate retrieval accuracy on test data."""
        logger.info(f"Evaluating retrieval accuracy on {test_data_path}")
        
        # Load test data
        with open(test_data_path, 'r', encoding='utf-8') as f:
            test_data = json.load(f)
        
        correct_retrievals = 0
        total_queries = len(test_data)
        
        for i, test_pair in enumerate(test_data):
            query = test_pair['question']
            expected_answer = test_pair['answer']
            
            # Get retrieval results
            retrieved_results = self.chatbot.retriever.retrieve(query, top_k=top_k)
            
            # Check if the expected answer is in the top-k results
            for result in retrieved_results:
                if result['answer'].lower().strip() == expected_answer.lower().strip():
                    correct_retrievals += 1
                    break
            
            if (i + 1) % 10 == 0:
                logger.info(f"Processed {i + 1}/{total_queries} test queries")
        
        accuracy = correct_retrievals / total_queries
        logger.info(f"Retrieval accuracy (top-{top_k}): {accuracy:.3f}")
        
        return accuracy
    
    def evaluate_response_quality(self, test_data_path, sample_size=20):
        """Evaluate response quality on a sample of test data."""
        logger.info(f"Evaluating response quality on {sample_size} samples")
        
        # Load test data
        with open(test_data_path, 'r', encoding='utf-8') as f:
            test_data = json.load(f)
        
        # Sample random queries
        np.random.seed(42)
        sample_indices = np.random.choice(len(test_data), min(sample_size, len(test_data)), replace=False)
        
        results = []
        
        for i in sample_indices:
            test_pair = test_data[i]
            query = test_pair['question']
            expected_answer = test_pair['answer']
            
            # Generate response
            response = self.chatbot.generate_response(query)
            
            results.append({
                'query': query,
                'expected_answer': expected_answer,
                'generated_response': response
            })
        
        return results
    
    def run_interactive_test(self):
        """Run interactive testing session."""
        print("\n" + "="*50)
        print("NETWORKBOT INTERACTIVE TEST")
        print("="*50)
        print("Type your networking questions below.")
        print("Type 'quit' to exit.")
        print("-"*50)
        
        while True:
            query = input("\nYour question: ").strip()
            
            if query.lower() in ['quit', 'exit', 'q']:
                break
            
            if not query:
                continue
            
            try:
                response = self.chatbot.generate_response(query)
                print(f"\nNetworkBot: {response}")
            except Exception as e:
                print(f"Error: {str(e)}")
        
        print("\nGoodbye!")

def main():
    try:
        evaluator = NetworkBotEvaluator()
        
        print("="*50)
        print("NETWORKBOT EVALUATION")
        print("="*50)
        
        # Test if model is working
        test_query = "What is TCP/IP?"
        response = evaluator.chatbot.generate_response(test_query)
        print(f"Test query: {test_query}")
        print(f"Response: {response}")
        
        # Evaluate on test data if available
        test_data_path = "data/processed/network_qa_test.json"
        if Path(test_data_path).exists():
            print(f"\nEvaluating on test data...")
            accuracy = evaluator.evaluate_retrieval_accuracy(test_data_path)
            print(f"Retrieval accuracy: {accuracy:.1%}")
            
            # Sample response quality evaluation
            sample_results = evaluator.evaluate_response_quality(test_data_path, sample_size=5)
            print(f"\nSample responses:")
            for i, result in enumerate(sample_results[:3]):
                print(f"\n{i+1}. Query: {result['query']}")
                print(f"   Response: {result['generated_response'][:100]}...")
        
        # Interactive testing
        print(f"\nModel evaluation completed!")
        choice = input("\nWould you like to test the bot interactively? (y/n): ")
        if choice.lower().startswith('y'):
            evaluator.run_interactive_test()
            
    except Exception as e:
        print(f"Evaluation failed: {str(e)}")
        print("Make sure the model is trained first by running 'python src/model/train.py'")

if __name__ == "__main__":
    main()
