#!/bin/bash

if [[ $EUID -eq 0 ]]; then
   echo "This script must NOT be run as root"
   exit 1
fi

git pull origin master
rm -r site/*
mkdocs build --strict
# cp site/assets/javascripts/application-*.js site/assets/javascripts/application.js
rm -r /var/www/docs/*
cp -r site/* /var/www/docs/
