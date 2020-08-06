#!/bin/bash

FILES=docs/**/*.md
for f in $FILES
do
  echo "Processing $f file..."
  filename=$(basename "$f")
  dirname=$(dirname "$f")
  extension="${filename##*.}"
  filename="${filename%.*}"

  mkdir -p "$dirname/pdf"
  pandoc "$f" --pdf-engine=xelatex -o "$dirname/pdf/$filename.pdf"
done
