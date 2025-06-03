"""
Main chatbot class that combines retrieval and generation components.
"""

from .retriever import NetworkQARetriever
from .generator import NetworkQAGenerator
import logging

logger = logging.getLogger(__name__)

class NetworkChatbot:
    def __init__(self, retriever_path="models/retriever.pkl"):
        """Initialize the chatbot with retriever and generator components."""
        try:
            self.retriever = NetworkQARetriever.load(retriever_path)
            self.generator = NetworkQAGenerator()
            self.conversation_history = []
            logger.info("NetworkChatbot initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize chatbot: {str(e)}")
            raise
    
    def generate_response(self, query):
        """Generate a response to the user query."""
        try:
            # Add query to conversation history
            self.conversation_history.append({"role": "user", "content": query})
            
            # Retrieve relevant Q&A pairs
            retrieved_results = self.retriever.retrieve(query, top_k=3)
            
            # Log retrieval results
            if retrieved_results:
                logger.info(f"Retrieved {len(retrieved_results)} results for query: '{query[:50]}...'")
                logger.info(f"Best match score: {retrieved_results[0]['score']:.3f}")
            else:
                logger.warning(f"No results retrieved for query: '{query[:50]}...'")
            
            # Generate response
            response = self.generator.generate_response(retrieved_results, query)
            
            # Add response to conversation history
            self.conversation_history.append({"role": "assistant", "content": response})
            
            return response
            
        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            return "I'm sorry, I encountered an error while processing your question. Please try again."
    
    def clear_history(self):
        """Clear the conversation history."""
        self.conversation_history = []
        logger.info("Conversation history cleared")
    
    def get_conversation_history(self):
        """Get the current conversation history."""
        return self.conversation_history
    
    def get_stats(self):
        """Get statistics about the chatbot."""
        retriever_stats = self.retriever.get_stats()
        return {
            'retriever_stats': retriever_stats,
            'conversation_length': len(self.conversation_history)
        }
