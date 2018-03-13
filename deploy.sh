#!/bin/sh
rm -r site/*
mkdocs build
# cp site/assets/javascripts/application-*.js site/assets/javascripts/application.js
rm -r /var/www/docs/*
cp -r site/* /var/www/docs/
