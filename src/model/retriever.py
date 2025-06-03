"""
Retrieval component for NetworkBot.
Uses TF-IDF vectorization to find relevant Q&A pairs.
"""

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import pickle
import os
from pathlib import Path
import logging

logger = logging.getLogger(__name__)

class NetworkQARetriever:
    def __init__(self, data_path=None):
        """Initialize the retriever with training data."""
        self.vectorizer = TfidfVectorizer(
            lowercase=True,
            ngram_range=(1, 2),  # Use both unigrams and bigrams
            stop_words='english',
            max_features=10000,  # Limit vocabulary size
            min_df=2,  # Ignore terms that appear in less than 2 documents
            max_df=0.95  # Ignore terms that appear in more than 95% of documents
        )
        self.qa_pairs = []
        self.question_vectors = None
        
        if data_path:
            self.load_data(data_path)
    
    def load_data(self, data_path):
        """Load Q&A pairs from JSON file."""
        logger.info(f"Loading training data from {data_path}")
        
        with open(data_path, 'r', encoding='utf-8') as f:
            self.qa_pairs = json.load(f)
        
        # Extract questions for vectorization
        questions = [pair['question'] for pair in self.qa_pairs]
        
        # Fit and transform questions to TF-IDF vectors
        logger.info("Creating TF-IDF vectors...")
        self.question_vectors = self.vectorizer.fit_transform(questions)
        
        logger.info(f"Loaded {len(self.qa_pairs)} Q&A pairs for retrieval")
        logger.info(f"Vocabulary size: {len(self.vectorizer.vocabulary_)}")
    
    def retrieve(self, query, top_k=3):
        """Retrieve the top k most relevant Q&A pairs for a query."""
        if not self.question_vectors:
            raise ValueError("Retriever not trained. Call load_data() first.")
        
        # Transform query to TF-IDF vector
        query_vector = self.vectorizer.transform([query.lower()])
        
        # Calculate similarity scores
        similarity_scores = cosine_similarity(query_vector, self.question_vectors).flatten()
        
        # Get indices of top k most similar questions
        top_indices = similarity_scores.argsort()[-top_k:][::-1]
        
        # Return top k Q&A pairs with their similarity scores
        results = []
        for idx in top_indices:
            results.append({
                'question': self.qa_pairs[idx]['question'],
                'answer': self.qa_pairs[idx]['answer'],
                'score': float(similarity_scores[idx])
            })
        
        return results
    
    def save(self, path="models/retriever.pkl"):
        """Save the trained retriever model."""
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        
        model_data = {
            'vectorizer': self.vectorizer,
            'qa_pairs': self.qa_pairs,
            'question_vectors': self.question_vectors
        }
        
        with open(path, 'wb') as f:
            pickle.dump(model_data, f)
        
        logger.info(f"Retriever model saved to {path}")
    
    @classmethod
    def load(cls, path="models/retriever.pkl"):
        """Load a trained retriever model."""
        logger.info(f"Loading retriever model from {path}")
        
        with open(path, 'rb') as f:
            model_data = pickle.load(f)
        
        retriever = cls()
        retriever.vectorizer = model_data['vectorizer']
        retriever.qa_pairs = model_data['qa_pairs']
        retriever.question_vectors = model_data['question_vectors']
        
        logger.info(f"Retriever model loaded successfully")
        return retriever
    
    def get_stats(self):
        """Get statistics about the retriever."""
        if not self.qa_pairs:
            return {}
        
        return {
            'num_qa_pairs': len(self.qa_pairs),
            'vocabulary_size': len(self.vectorizer.vocabulary_) if self.vectorizer else 0,
            'vector_shape': self.question_vectors.shape if self.question_vectors is not None else None
        }
