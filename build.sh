docker build --tag st-mkdocs .
docker create --name st-mkdocs st-mkdocs
docker cp st-mkdocs:/workspace/site ./site
docker rm -f st-mkdocs
