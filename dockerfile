FROM node:12.11.1 AS node

# ARG build_env=develpoment
WORKDIR /dist/src/app


RUN npm cache clean --force
COPY . .

RUN npm install
RUN npm run build --prod
# RUN ls /dist/src/app/dist/
FROM nginx:latest as nginx
COPY --from=node /dist/src/app/dist/gdFront /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
