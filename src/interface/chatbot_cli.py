"""
Command-line interface for NetworkBot.
"""

import argparse
import json
import sys
from pathlib import Path

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent.parent))

from src.model.chatbot import NetworkChatbot

def main():
    """Command-line interface for NetworkBot."""
    parser = argparse.ArgumentParser(description="NetworkBot CLI")
    parser.add_argument("--query", required=True, help="The query text")
    parser.add_argument("--output", default="stdout", help="Output file path (default: print to stdout)")
    parser.add_argument("--model", default="models/retriever.pkl", help="Path to trained model")
    
    args = parser.parse_args()
    
    try:
        # Initialize chatbot
        chatbot = NetworkChatbot(args.model)
        
        # Generate response
        response = chatbot.generate_response(args.query)
        
        # Output response
        result = {"query": args.query, "response": response}
        
        if args.output == "stdout":
            print(json.dumps(result, indent=2))
        else:
            with open(args.output, 'w') as f:
                json.dump(result, f, indent=2)
                
    except Exception as e:
        error_result = {"query": args.query, "error": str(e)}
        if args.output == "stdout":
            print(json.dumps(error_result, indent=2))
        else:
            with open(args.output, 'w') as f:
                json.dump(error_result, f, indent=2)

if __name__ == "__main__":
    main()
