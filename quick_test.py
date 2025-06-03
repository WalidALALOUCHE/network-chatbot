"""
Quick test script to verify everything is working.
"""

import sys
from pathlib import Path
import json

def test_data_processing():
    """Test data processing."""
    print("Testing data processing...")
    
    # Check if processed data exists
    train_file = Path("data/processed/network_qa_train.json")
    if not train_file.exists():
        print("❌ Training data not found. Run data preprocessing first.")
        return False
    
    # Load and check data
    with open(train_file, 'r') as f:
        data = json.load(f)
    
    if len(data) == 0:
        print("❌ Training data is empty.")
        return False
    
    print(f"✅ Found {len(data)} training examples")
    return True

def test_model():
    """Test trained model."""
    print("Testing trained model...")
    
    model_file = Path("models/retriever.pkl")
    if not model_file.exists():
        print("❌ Model not found. Run training first.")
        return False
    
    try:
        sys.path.append(str(Path(__file__).parent))
        from src.model.chatbot import NetworkChatbot
        
        chatbot = NetworkChatbot()
        response = chatbot.generate_response("What is TCP/IP?")
        
        if response and len(response) > 10:
            print("✅ Model is working!")
            print(f"Sample response: {response[:100]}...")
            return True
        else:
            print("❌ Model response is too short or empty.")
            return False
            
    except Exception as e:
        print(f"❌ Model test failed: {str(e)}")
        return False

def main():
    """Run all tests."""
    print("="*50)
    print("NETWORKBOT QUICK TEST")
    print("="*50)
    
    tests = [
        ("Data Processing", test_data_processing),
        ("Trained Model", test_model)
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n{test_name}:")
        result = test_func()
        results.append(result)
    
    print("\n" + "="*50)
    print("TEST RESULTS")
    print("="*50)
    
    all_passed = all(results)
    if all_passed:
        print("🎉 All tests passed! Your NetworkBot is ready to use.")
        print("\nTo test interactively, run:")
        print("python src/model/evaluate.py")
    else:
        print("❌ Some tests failed. Please check the errors above.")
        print("\nMake sure you have:")
        print("1. Placed your Excel file in data/raw/network_qa_dataset.xlsx")
        print("2. Run: python src/data_processing/preprocess_data.py")
        print("3. Run: python src/model/train.py")

if __name__ == "__main__":
    main()
