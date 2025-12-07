#!/bin/bash

# Simple script to update contract address
# Usage: ./update-contract.sh <new_address>
# Example: ./update-contract.sh soon
# Example: ./update-contract.sh 8vQaFNBxqzX...

NEW_ADDRESS="${1:-soon}"

echo "🔄 Updating PARALLY contract address to: $NEW_ADDRESS"
echo ""

curl -X PATCH http://localhost:8001/api/token/info/PARALLY \
  -H "Content-Type: application/json" \
  -d "{\"contract_address\": \"$NEW_ADDRESS\"}" \
  -s | python -m json.tool

echo ""
echo "✅ Update complete!"
echo ""
echo "📋 Verify by visiting your app or running:"
echo "   curl http://localhost:8001/api/token/info/PARALLY | python -m json.tool"
