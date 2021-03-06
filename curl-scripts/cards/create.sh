#!/bin/bash

API="http://localhost:4741"
URL_PATH="/cards"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "card": {
      "name": "'"${NAME}"'",
      "deck": "'"${DECK}"'"
    }
  }'

echo
