The agent ensures any sensitive data such as credentials or tokens are scrubbed before shipping the data to Sematext Cloud.

For example, launching a Python process with `--password` and `MYSQL_PASSWORD` arguments passed to it, would result in the command line metadata attribute being masked as following:

```
python daemon.py --password ******** MYSQL_PASSWORD ********
```
