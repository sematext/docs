## Sematext Docs
Mkdocs site for pub-SPM, pub-Logsene & SematextApps confluence.

### Quick Start - run mkdocs on Docker

```
# clone git repository
git clone git@github.com:sematext/docs.git
# run mkdocs in a container, including the required material-theme installation
cd docs
docker run  -d --name st-mkdocs -p 8000:8000 -v $(pwd):/workspace pengbai/docker-mkdocs pip install mkdocs-material && mkdocs serve
# save installed material theme, to use 'docker stop/start st-mkdocs' later without re-installing material theme
docker commit st-mkdocs
# Open the website in a browser 
open http://localhost:8000
```

### Manual installation  
Install `python` & `pip` - Check here [Manual Installation](http://www.mkdocs.org/#manual-installation)

``` sh
$ python --version
Python 2.7.2
$ pip --version
pip 1.5.2
```

Install Mkdocs
Install the `mkdocs` package using `pip`:

```sh
pip install mkdocs
```

Install Material theme

```sh
pip install mkdocs-material
```

Getting started
Start the server by running the `mkdocs serve` command:

```sh
$ mkdocs serve
INFO    -  Building documentation...
INFO    -  Cleaning site directory
[I 160402 15:50:43 server:271] Serving on http://127.0.0.1:8000
[I 160402 15:50:43 handlers:58] Start watching changes
[I 160402 15:50:43 handlers:60] Start detecting changes
```

Open up `http://127.0.0.1:8000/` in your browser, and you'll see the default home page being displayed:

### Convert Confluence to Markdown

#### Export Confluence to HTML
We use Confluence export feature to export HTML, It can export the whole space or individual page. Here are step:

* go to Space tools.
* go to tab Content Tools.
* go to tab Export.
* chose HTML option.
* chose Normal Export option to extract the whole space and Custom Export if you want to extract individual page.

* click export

#### Extract main content from HTML

The exported HTML from previous step contains layout format from Confluence, we need to extract only main content from it before convert to Markdown
First we need extract the export zip file to folder.

```
unzip Confluence-space-export-XXX.zip
```

Then extract main content to another folder

```
java -jar bin/extract.jar inputDir ouputDir
   - inputDir the extracted space folder Or a html file
   - outputDir the output folder
```

#### Convert to Markdown

We use `pandoc` to convert Html to Markdown. So first you need to install `pandoc` using instruction from this page
`https://pandoc.org/installing.html`

Convert the HTML extract from previous step to Markdown

```
bin/to_md.sh inputDir outputDir
   - inputDir: the extracted html folder
   - outputDir: the markdown folder
```

### Generate PDF

We also use `pandoc` to convert markdown to PDF.

* goto the markdown folder: we need to convert to PDF fromt he folder which contains the markdown file so that `pandoc` can read image file.
* generate all markdown to PDF and store in folder `./pdf`

```
  PROJECT_FOLDER/bin/to_pdf 
```