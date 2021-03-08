FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY .htpasswd /etc/nginx/.htpasswd
COPY --chown=777 ./certs/server.* /etc/nginx/certs/
COPY --chown=777 ./certs/ca.crt /etc/nginx/certs/
