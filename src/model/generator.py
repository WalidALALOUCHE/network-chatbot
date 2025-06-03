"""
Response generation component for NetworkBot.
Formats and enhances retrieved answers.
"""

import random
import re
import nltk
from nltk.tokenize import sent_tokenize
import logging

logger = logging.getLogger(__name__)

# Download NLTK resources
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt', quiet=True)

class NetworkQAGenerator:
    def __init__(self):
        """Initialize the generator."""
        self.templates = [
            "Based on networking principles, {}",
            "In computer networking, {}",
            "According to networking standards, {}",
            "From a technical perspective, {}",
            "In the context of telecommunications, {}",
            "{}"  # Default template (no change)
        ]
        
        self.confidence_thresholds = {
            'high': 0.7,
            'medium': 0.4,
            'low': 0.2
        }
    
    def generate_response(self, retrieved_results, query):
        """Generate a natural response based on retrieved Q&A pairs."""
        if not retrieved_results:
            return self._generate_fallback_response(query)
        
        # Get the best match
        best_match = retrieved_results[0]
        confidence_level = self._get_confidence_level(best_match['score'])
        
        logger.info(f"Best match score: {best_match['score']:.3f}, confidence: {confidence_level}")
        
        if confidence_level == 'high':
            # High confidence: use the answer directly with light formatting
            answer = best_match['answer']
            response = self._format_answer(answer, query, confidence_level)
        elif confidence_level == 'medium':
            # Medium confidence: combine top results
            answers = [result['answer'] for result in retrieved_results[:2]]
            combined_answer = self._combine_answers(answers)
            response = self._format_answer(combined_answer, query, confidence_level)
        else:
            # Low confidence: provide a cautious response
            response = self._generate_low_confidence_response(retrieved_results, query)
        
        return response
    
    def _get_confidence_level(self, score):
        """Determine confidence level based on similarity score."""
        if score >= self.confidence_thresholds['high']:
            return 'high'
        elif score >= self.confidence_thresholds['medium']:
            return 'medium'
        else:
            return 'low'
    
    def _combine_answers(self, answers):
        """Combine multiple answers into a coherent response."""
        # Extract key sentences from each answer
        all_sentences = []
        for answer in answers:
            sentences = sent_tokenize(answer)
            # Take the first 2 sentences from each answer
            all_sentences.extend(sentences[:2])
        
        # Remove duplicates while preserving order
        unique_sentences = []
        seen = set()
        for sentence in all_sentences:
            sentence_clean = sentence.lower().strip()
            if sentence_clean not in seen and len(sentence.split()) > 3:
                unique_sentences.append(sentence)
                seen.add(sentence_clean)
        
        # Combine sentences
        combined = ' '.join(unique_sentences[:3])  # Limit to 3 sentences
        
        return combined
    
    def _format_answer(self, answer, query, confidence_level):
        """Format the answer to sound more natural."""
        # Clean up the answer
        answer = answer.strip()
        
        # Choose formatting based on confidence level
        if confidence_level == 'high':
            # Use a random template for variety
            template = random.choice(self.templates)
        else:
            # Use more cautious language
            template = "{}"
        
        # Apply the template
        if "{}" in template:
            formatted = template.format(answer)
        else:
            formatted = template + " " + answer
        
        # Ensure proper capitalization
        formatted = formatted[0].upper() + formatted[1:] if formatted else ""
        
        # Ensure the answer ends with proper punctuation
        if formatted and not formatted.endswith(('.', '!', '?')):
            formatted += '.'
        
        return formatted
    
    def _generate_fallback_response(self, query):
        """Generate a fallback response when no good matches are found."""
        fallback_responses = [
            "I don't have specific information about that networking topic. Could you try rephrasing your question or asking about a more general networking concept?",
            "I'm not sure about that particular aspect of computer networks. Could you provide more context or ask about a related networking topic?",
            "That's not covered in my current knowledge base. I specialize in computer networks and telecommunications - could you ask about protocols, network architecture, or security?",
            "I don't have enough information to answer that question accurately. I'm trained on networking and telecommunications topics - perhaps you could ask about TCP/IP, routing, or network security?"
        ]
        
        return random.choice(fallback_responses)
    
    def _generate_low_confidence_response(self, retrieved_results, query):
        """Generate a cautious response for low-confidence matches."""
        best_match = retrieved_results[0]
        
        cautious_responses = [
            f"I found some related information, but I'm not entirely certain it answers your question. {best_match['answer']} Please let me know if you'd like me to clarify anything.",
            f"Based on what I know about networking, {best_match['answer']} However, you might want to verify this information for your specific use case.",
            f"Here's what I can tell you about this topic: {best_match['answer']} If this doesn't fully answer your question, please feel free to ask for more details."
        ]
        
        return random.choice(cautious_responses)
