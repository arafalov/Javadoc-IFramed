Configuration of Apache for pre-compressed content
===============

Trying to use .gz as an extension causes all sorts of problems with other settings. Same with Options MultiViews.

This seems to be a reasonable approach, though it is only for HTML files for now.

```
<Directory "/var/www/html/javadoc">
        RewriteEngine On
        RewriteCond %{HTTP:Accept-Encoding} gzip
        RewriteCond %{REQUEST_FILENAME}.hgz -f
        RewriteRule ^(.*)$ $1.hgz [QSA,L]

        AddEncoding x-gzip .hgz

        <FilesMatch .*\.html.hgz>
            ForceType text/html
        </FilesMatch>
</Directory>
```