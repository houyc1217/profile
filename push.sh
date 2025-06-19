#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Usage: ./push.sh \"Your commit message\""
  exit 1
fi

# Add all changes
git add .

# Commit with the provided message
git commit -m "$1"

# Push to GitHub using the PAT from environment variable
git push https://houyc1217:${GITHUB_PAT}@github.com/houyc1217/profile.git main