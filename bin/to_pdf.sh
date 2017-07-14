#!/bin/bash

FILES=*.md
mkdir pdf
for f in $FILES
do
  echo "Processing $f file..."
  filename=$(basename "$f")
  extension="${filename##*.}"
  filename="${filename%.*}"
  pandoc "$f" --latex-engine=xelatex -o "pdf/$filename.pdf"
done
