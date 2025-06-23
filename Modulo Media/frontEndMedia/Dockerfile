FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

ENV PORT 8080
EXPOSE 8080

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/front-end-media /usr/share/nginx/html

CMD ["sh", "-c", "sed -i 's/listen       80;/listen       ${PORT};/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
