title: Package Data
description: Package Data collected by Sematext Agent

Package payloads are comprised of various fields as summarized in the table. Sematext Agent currently supports Python, Node.js, RPM and Deb packages.

| Name          | Description |
| --------------|-------------|
| name          | Represents the package name |
| version       | Is the version linked to the particular package |   
| type          | Designates the type of the package (e.g. Python) |
| architecture  | Determines the architecture for which the package was built (32/64 bits) |
| configurations| Is the sequence of the configuration files tied to the package (only applicable for Debian-based packages) |
| container id  | When a package is pulled from the container, this field is the identifier of the container where the package is located  |
