#!/bin/bash

echo "Setting up NetMind backend integration..."

# Create Python backend directories
mkdir -p python_backend/input
mkdir -p python_backend/output
mkdir -p python_backend/logs

# Copy Python requirements
cp requirements.txt python_backend/

# Create Python virtual environment for backend
cd python_backend
python -m venv venv

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install Python dependencies
pip install -r requirements.txt

# Download NLTK data
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"

cd ..

echo "Backend setup completed!"
echo ""
echo "Next steps:"
echo "1. Place your trained model at: models/retriever.pkl"
echo "2. Test the backend: npm run test-chatbot"
echo "3. Start the development server: npm run dev"
