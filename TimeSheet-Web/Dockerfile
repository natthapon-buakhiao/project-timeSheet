FROM nginx:latest
WORKDIR /usr/src
RUN mkdir /app/
# copy artifact build from the 'build environment'
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./dist/client /app
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]