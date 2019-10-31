## [Sematext Documentation](https://sematext.com/docs)

### Quick Start - run mkdocs in a container

```
git clone git@github.com:sematext/docs.git
cd docs
docker run  -d --name st-mkdocs -p 8000:8000 -v $(pwd):/workspace pengbai/docker-mkdocs \
pip install mkdocs-material===2.7.0 &&  \
pip install markdown-fenced-code-tabs && mkdocs serve 
open http://localhost:8000
```

### Build site with Docker
Run the `build.sh` script. It will create a `site` folder that you can deploy.
```
$ ./build.sh
```

### Manual installation  
Install `python` & `pip` - see [Manual Installation](http://www.mkdocs.org/#manual-installation)

``` sh
$ python --version
Python 2.7.2
$ pip --version
pip 1.5.2
```

Install requirements:

```sh
pip install -r requirements.txt
```

In mkdocs.yml:
- add extry under markdown_extensions shown on https://github.com/yacir/markdown-fenced-code-tabs for more info:
- add ```- 'stylesheets/code-tabs.css'``` under extra_css

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

Build the site

```sh
$ mkdocs build
```

This will create a new directory, named `site`. Now, we can deploy `site` to server.


### Generate PDF

We also use `pandoc` to convert markdown to PDF.

* goto the markdown folder: we need to convert to PDF fromt he folder which contains the markdown file so that `pandoc` can read image file.
* generate all markdown to PDF and store in folder `./pdf`

```
  PROJECT_FOLDER/bin/to_pdf 
```

### Run link checker

Check 404 links for sematext.com/docs using w3c linkchecker
https://validator.w3.org/checklink?uri=http%3A%2F%2Fsematext.com%2Fdocs&hide_type=dir&recursive=on&depth=&check=Check



### Convert Confluence to Markdown

#### Export Confluence to HTML
Use Confluence export feature to export HTML.  It can export the whole space or individual page. Here are steps:

* go to Space tools
* go to Content Tools tab
* go to Export tab
* choose HTML option
* choose Normal Export option to extract the whole space and Custom Export if you want to extract individual page
* click Export

#### Extract main content from HTML

The exported HTML from the previous step contains layout format from Confluence.  Extract only the main content from it before converting to Markdown.

Extract the export zip file to folder

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

Use `pandoc` to convert HTML to Markdown. Install `pandoc` using instructions from
`https://pandoc.org/installing.html`

Convert the HTML extracted in the previous step to Markdown

```
bin/to_md.sh inputDir outputDir
   - inputDir: the extracted html folder
   - outputDir: the markdown folder
```

### Convert Google Doc to Markdown
1. In your google doc go to `Tools > Script editor`
1. Copy [this script](https://github.com/mangini/gdocs2md/blob/master/converttomarkdown.gapps) to the code section in the `Script editor`
1. Save the script
1. To trigger the conversion (from Script editor) go to `Run > Run function > ConvertToMarkdown` (it will run on the google doc from which you opened `Script editor`)
1. You'll be prompted to give GDrive reading and mailing rights to the script
1. You'll receive an email with markdown and image files attached
