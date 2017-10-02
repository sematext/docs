#!/bin/sh
mkdocs build
cp site/assets/javascripts/application-*.js site/assets/javascripts/application.js
rm -r site/* /var/www/docs/*
cp -r site/* /var/www/docs/
