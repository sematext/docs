#!/bin/bash

INPUT_DIR = $1
OUTPUT_DIR = $2

FILES="$INPUT_DIR/*.html"
for f in $FILES
do
  echo "Processing $f file..."
  filename=$(basename "$f")
  extension="${filename##*.}"
  filename="${filename%.*}"
  pandoc -f html -t commonmark < "$f" | tee "$2/$filename.md"
done
