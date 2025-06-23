FROM node:18 AS build

EXPOSE 80

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/front-end-media /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
