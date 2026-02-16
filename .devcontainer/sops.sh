#!/bin/bash

# Generate a new secret key if one doesn't exist
if [ ! -f "$SOPS_AGE_KEY_FILE" ]; then
    age-keygen -o $SOPS_AGE_KEY_FILE
fi
