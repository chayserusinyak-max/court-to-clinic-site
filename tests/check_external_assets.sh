#!/usr/bin/env bash
set -euo pipefail

asset_path="images/post7-dna-thumbnail.svg"

echo "Verifying local DNA illustration asset..."

if [[ ! -f "$asset_path" ]]; then
  echo "Asset check failed: $asset_path is missing." >&2
  exit 1
fi

if [[ ! -s "$asset_path" ]]; then
  echo "Asset check failed: $asset_path is empty." >&2
  exit 1
fi

required_references=(
  "posts/post7.html"
  "index.html"
  "posts.json"
)

for file in "${required_references[@]}"; do
  if ! grep -q "post7-dna-thumbnail.svg" "$file"; then
    echo "Asset check failed: $file does not reference $asset_path." >&2
    exit 1
  fi
done

echo "Asset check passed"
