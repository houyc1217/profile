#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Usage: ./push.sh \"Your commit message\""
  exit 1
fi

# Add all changes
git add .

# Commit with the provided message
git commit -m "$1"

# Pull latest changes from remote repository (with rebase to avoid merge commits)
echo "Pulling latest changes from remote repository..."
git pull --rebase https://houyc1217:${GITHUB_PAT}@github.com/houyc1217/profile.git main

# Push to GitHub using the PAT from environment variable
echo "Pushing changes to remote repository..."
git push https://houyc1217:${GITHUB_PAT}@github.com/houyc1217/profile.git main