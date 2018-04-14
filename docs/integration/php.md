## Overview

[PHP FPM](http://php.net/manual/en/install.fpm.php) module is integrated with Nginx and Apache and its metrics are displayed as part of Nginx and Apache monitoring in Sematext.

![](https://sematext.com/wp-content/uploads/2017/10/php-fpm-nginx.png)

## Integration

PHP-FPM monitoring instructions are below. To set up [Nginx
monitoring](https://apps.sematext.com/ui/howto/Nginx/overview) or
[Apache
monitoring](https://apps.sematext.com/ui/howto/Apache/overview) see
their integration instructions.

** Preparation for PHP-FPM monitoring **

Activate PHP-FPM status page in your php-fpm config by removing the leading semicolon in the ```;pm.status_path = /status``` entry:

```sh
sudo sed -i -e "s/^;pm.status_path/pm.status_path/" /etc/php-fpm.d/www.conf
```

Or edit the file ` /etc/php-fpm.d/www.conf` manually and ensure it contains this line:

```
pm.status_path = /status
``` 

Restart php-fpm:
```sh
# for upstart
sudo service php-fpm restart 

# for systemd
sudo systemctl restart php-fpm.service
```

Make sure that Node.js > 4.x is installed: [https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/package-manager/)

## Integration with Apache
** Install sematext-agent-httpd via npm **
```sh
sudo npm i sematext-agent-httpd -g
```

** Setup monitoring with PHP-FPM status page via UNIX socket (recommended) **

Run the service setup for the PHP-FPM monitoring agent. Pass your Sematext Monitoring App token (aka SPM_TOKEN), Apache status URL, and the PHP-FPM status URL to the setup command:
```sh
# sematext-httpd-setup -t YOUR_SPM_TOKEN_HERE -u HTTPD_STATUS_URL -p PHP_FPM_STATUS_URL
sudo sematext-httpd-setup -t YOUR_SPM_TOKEN_HERE -u http://localhost/server-status -p http://unix:/var/run/php-fpm.sock:/status
```

** Setup monitoring with PHP-FPM status page via HTTP **

In some scenarios, e.g. in Docker containers, the monitoring agent
might not have access to the local UNIX socket. In such cases the
PHP-FPM status page needs to be exposed via Apache httpd.  To expose
the PHP-FPM status page via Apache httpd change the configuration
```/etc/httpd/conf.d/mod_fastcgi.conf``` e.g.:

```
LoadModule fastcgi_module modules/mod_fastcgi.so
 
<IfModule mod_fastcgi.c>
          DirectoryIndex index.php index.html index.shtml index.cgi
          AddHandler php5-fcgi .php
          Action php5-fcgi /php5-fcgi
          Alias /php5-fcgi /usr/lib/cgi-bin/php5-fcgi
          FastCgiExternalServer /usr/lib/cgi-bin/php5-fcgi -socket /var/run/php-fpm.sock -pass-header Authorization
 
   # For monitoring status with e.g. SPM for Apache httpd
   <LocationMatch "/(ping|status)">
                  SetHandler php5-fcgi-virt
                  Action php5-fcgi-virt /php5-fcgi virtual
   </LocationMatch>
</IfModule>
```

Run the setup command using HTTP URLs for status pages:

```sh
  # sematext-httpd-setup YOUR_SPM_TOKEN_HERE HTTPD_STATUS_URL PHP_FPM_STATUS_URL
  sudo sematext-httpd-setup YOUR_SPM_TOKEN_HERE -u http://localhost/server-status http://localhost/status
```

## Integration with Nginx

** Install sematext-agent-nginx via npm **
```sh
sudo npm i sematext-agent-httpd -g
```

** Setup Nginx Agent with php-fpm UNIX socket (recommended) **

Run the service setup for the PHP-FPM monitoring agent. Pass the
Sematext Monitoring App token (aka SPM token), Nginx status URL, and
the PHP-FPM status URL to the setup command:
```sh
sematext-nginx-setup -t YOUR_SPM_TOKEN_HERE -n http://localhost/nginx_status -p http://unix:/var/run/php-fpm.sock:/status
```

** Setup with PHP-FPM status page via HTTP **

In some scenarios, e.g. in Docker containers, the monitoring agent
might not have access to the local UNIX socket. In such cases the
PHP-FPM status page needs to be exposed via Nginx.  To expose the
PHP-FPM status page via Nginx change the Nginx configuration
```/etc/nginx/sites-enabled/default```:

```
location ~ ^/(status|ping)$ {
       # access_log off;
       allow all;
       # allow SPM-MONITOR-IP;
       # deny all;
       fastcgi_pass unix:/var/run/php-fpm.sock;
       fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
       fastcgi_param SCRIPT_NAME $fastcgi_script_name;
       include fastcgi_params;
}
```

Then run the setup command using HTTP URLs for status pages:
```sh
# sematext-nginx-setup -t YOUR_SPM_TOKEN_HERE -n NGINX_STATUS_URL -p PHP_FPM_STATUS_URL
sematext-nginx-setup -t YOUR_SPM_TOKEN_HERE -n http://localhost/nginx_status -p http://localhost/status
```

## Metrics

Metric Name | Key | Agg | Type | Description
--- | --- | --- | --- | ---
total processes | php.fpm.process.total | Avg | Long | the number of idle + active processes
active processes | php.fpm.process.active | Avg | Long | the number of active processes
max active processes | php.fpm.process.active.max | Max | Long | the maximum number of active processes since FPM has started
idle processes | php.fpm.process.idle | Avg | Long | the number of idle processes
accepted conns. count | php.fpm.request.acceptedconns.count | Sum | Long | the number of requests accepted by the pool
listen queue | php.fpm.queue.listen | Avg | Long | the number of requests in the queue of pending connections
listen queue len | php.fpm.queue.listen.len | Avg | Long | the size of the socket queue of pending connections
max listen queue | php.fpm.queue.listen.max | Max | Long | the maximum number of requests in the queue of pending connections since FPM has started
slow requests count | php.fpm.request.slow.count | Sum | Long | the number of requests that exceeded your request_slowlog_timeout value
max children reached | php.fpm.process.childrenReached.max | Sum | Long | the number of times, the process limit has been reached, when pm tries to start more children (works only for pm dynamic and ondemand)
