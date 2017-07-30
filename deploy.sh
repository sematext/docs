#!/bin/sh
mkdocs build
cp site/assets/javascripts/application-*.js site/assets/javascripts/application.js
cp -r site/* /var/www/docs/
