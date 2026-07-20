#!/bin/bash
set -e

echo "Starting image optimization..."

find public/professional -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read -r file; do
    dir=$(dirname "$file")
    base=$(basename "$file")
    name="${base%.*}"
    echo "Converting: $file -> ${dir}/${name}.webp"
    convert "$file" -resize 1920x\> -strip -quality 75 "${dir}/${name}.webp"
    rm "$file"
done

find public/projects -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read -r file; do
    dir=$(dirname "$file")
    base=$(basename "$file")
    name="${base%.*}"
    echo "Converting: $file -> ${dir}/${name}.webp"
    convert "$file" -resize 1920x\> -strip -quality 75 "${dir}/${name}.webp"
    rm "$file"
done

echo "Updating public/JSONJS.js references..."
sed -i -E 's|("(/professional\|/projects)/[^"]+\.)(png\|jpg\|jpeg)"|\1webp"|g' public/JSONJS.js

echo "Image optimization complete!"
