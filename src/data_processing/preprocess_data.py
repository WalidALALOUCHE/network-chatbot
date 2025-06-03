"""
Data preprocessing script for NetworkBot training.
Converts Excel Q&A data to JSON format with train/val/test splits.
"""

import pandas as pd
import json
import os
import re
import numpy as np
from sklearn.model_selection import train_test_split
from pathlib import Path
import logging

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def clean_text(text):
    """Clean and normalize text."""
    if not isinstance(text, str):
        return ""
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Remove special characters but keep basic punctuation
    text = re.sub(r'[^\w\s\.\?\!\,\-$$$$]', '', text)
    
    # Normalize technical terms
    replacements = {
        'tcp/ip': 'tcp ip',
        'wi-fi': 'wifi',
        'wi fi': 'wifi',
        'e-mail': 'email',
        'ip address': 'ip address',
        'mac address': 'mac address',
    }
    
    for old, new in replacements.items():
        text = text.replace(old, new)
    
    return text

def validate_data(df):
    """Validate the input data format."""
    required_columns = ['question', 'answer']
    
    # Check if required columns exist
    missing_columns = [col for col in required_columns if col not in df.columns]
    if missing_columns:
        raise ValueError(f"Missing required columns: {missing_columns}")
    
    # Check for empty data
    if df.empty:
        raise ValueError("Dataset is empty")
    
    # Check for null values
    null_questions = df['question'].isnull().sum()
    null_answers = df['answer'].isnull().sum()
    
    logger.info(f"Found {null_questions} null questions and {null_answers} null answers")
    
    return True

def augment_data(qa_pairs):
    """Simple data augmentation by creating question variations."""
    augmented_pairs = []
    
    question_starters = [
        "what is",
        "explain",
        "describe",
        "how does",
        "can you tell me about",
        "what are"
    ]
    
    for pair in qa_pairs:
        original_question = pair['question']
        answer = pair['answer']
        
        # Add original pair
        augmented_pairs.append(pair)
        
        # Create variations for questions that start with common patterns
        for starter in question_starters:
            if original_question.startswith(starter):
                # Create alternative question formats
                if starter == "what is":
                    alt_question = original_question.replace("what is", "explain")
                    augmented_pairs.append({
                        'question': alt_question,
                        'answer': answer
                    })
                elif starter == "explain":
                    alt_question = original_question.replace("explain", "what is")
                    augmented_pairs.append({
                        'question': alt_question,
                        'answer': answer
                    })
                break
    
    return augmented_pairs

def process_excel_to_json():
    """Main function to process Excel Q&A data to JSON format."""
    
    # Create directories
    Path("data/processed").mkdir(parents=True, exist_ok=True)
    Path("data/interface/input").mkdir(parents=True, exist_ok=True)
    Path("data/interface/output").mkdir(parents=True, exist_ok=True)
    
    # Load Excel file
    excel_path = "data/raw/network_qa_dataset.xlsx"
    
    if not os.path.exists(excel_path):
        raise FileNotFoundError(f"Excel file not found at {excel_path}")
    
    logger.info(f"Loading data from {excel_path}")
    df = pd.read_excel(excel_path)
    
    logger.info(f"Loaded {len(df)} rows from Excel file")
    logger.info(f"Columns found: {list(df.columns)}")
    
    # Validate data
    validate_data(df)
    
    # Clean the data
    logger.info("Cleaning text data...")
    df['question'] = df['question'].apply(clean_text)
    df['answer'] = df['answer'].apply(clean_text)
    
    # Remove rows with empty questions or answers
    initial_count = len(df)
    df = df.dropna(subset=['question', 'answer'])
    df = df[df['question'].str.strip() != ""]
    df = df[df['answer'].str.strip() != ""]
    
    logger.info(f"Removed {initial_count - len(df)} rows with empty data")
    
    # Remove duplicates
    initial_count = len(df)
    df = df.drop_duplicates(subset=['question'])
    logger.info(f"Removed {initial_count - len(df)} duplicate questions")
    
    # Convert to list of dictionaries
    qa_pairs = df.to_dict('records')
    
    # Data augmentation
    logger.info("Performing data augmentation...")
    qa_pairs = augment_data(qa_pairs)
    logger.info(f"Dataset size after augmentation: {len(qa_pairs)}")
    
    # Split into train, validation, and test sets
    logger.info("Splitting data into train/validation/test sets...")
    train_data, temp_data = train_test_split(qa_pairs, test_size=0.2, random_state=42)
    val_data, test_data = train_test_split(temp_data, test_size=0.5, random_state=42)
    
    # Save to JSON files
    datasets = {
        'train': train_data,
        'val': val_data,
        'test': test_data
    }
    
    for split_name, data in datasets.items():
        output_path = f"data/processed/network_qa_{split_name}.json"
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        logger.info(f"Saved {len(data)} {split_name} examples to {output_path}")
    
    # Create summary statistics
    stats = {
        'total_pairs': len(qa_pairs),
        'train_pairs': len(train_data),
        'val_pairs': len(val_data),
        'test_pairs': len(test_data),
        'avg_question_length': np.mean([len(pair['question'].split()) for pair in qa_pairs]),
        'avg_answer_length': np.mean([len(pair['answer'].split()) for pair in qa_pairs])
    }
    
    with open("data/processed/dataset_stats.json", 'w') as f:
        json.dump(stats, f, indent=2)
    
    logger.info("Data processing completed successfully!")
    logger.info(f"Dataset statistics: {stats}")
    
    return stats

if __name__ == "__main__":
    try:
        stats = process_excel_to_json()
        print("\n" + "="*50)
        print("DATA PROCESSING COMPLETED SUCCESSFULLY!")
        print("="*50)
        print(f"Total Q&A pairs: {stats['total_pairs']}")
        print(f"Training pairs: {stats['train_pairs']}")
        print(f"Validation pairs: {stats['val_pairs']}")
        print(f"Test pairs: {stats['test_pairs']}")
        print(f"Average question length: {stats['avg_question_length']:.1f} words")
        print(f"Average answer length: {stats['avg_answer_length']:.1f} words")
        print("\nNext step: Run 'python src/model/train.py' to train the model")
        
    except Exception as e:
        logger.error(f"Error during data processing: {str(e)}")
        print(f"\nERROR: {str(e)}")
        print("\nPlease check:")
        print("1. Excel file exists at 'data/raw/network_qa_dataset.xlsx'")
        print("2. Excel file has 'question' and 'answer' columns")
        print("3. File is not corrupted or password protected")
