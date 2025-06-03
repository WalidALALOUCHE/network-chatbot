#!/bin/bash

echo "Setting up NetworkBot environment..."

# Create virtual environment
python -m venv venv

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install dependencies
pip install -r requirements.txt

# Download NLTK data
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"

# Create directory structure
mkdir -p data/raw
mkdir -p data/processed
mkdir -p data/interface/input
mkdir -p data/interface/output
mkdir -p models
mkdir -p logs

echo "Setup completed!"
echo ""
echo "Next steps:"
echo "1. Place your Excel file at: data/raw/network_qa_dataset.xlsx"
echo "2. Run: python src/data_processing/preprocess_data.py"
echo "3. Run: python src/model/train.py"
echo "4. Test with: python src/model/evaluate.py"
