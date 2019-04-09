#!/bin/bash

API="http://localhost:4741"
URL_PATH="/cards"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "card": {
      "name": "'"${NAME}"'"
    }
  }'

echo
