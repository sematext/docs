The agent ensures any sensitive data such as credentials or tokens are scrubbed before shipping data to Sematext Cloud.

For example, launching a Python process with `--password` and `MYSQL_PASSWORD` arguments passed to it, would result in the command line metadata attribute being masked as following:

```
python daemon.py --password ******** MYSQL_PASSWORD ********
```

Sematext Agent automatically scrubs sensitive data if any of the following patterns are detected in the process' command line arguments. Matching is case insensitive.

- password(s)
- passwd
- pass
- credentials
- secret
- token
- auth_token
- access_token
