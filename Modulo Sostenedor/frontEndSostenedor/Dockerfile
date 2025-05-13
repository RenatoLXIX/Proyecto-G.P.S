
FROM node:18

EXPOSE 80

WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .


RUN npm run build --prod


FROM nginx:alpine


RUN rm -rf /usr/share/nginx/html/*


COPY --from=build /app/dist/front-end-sostenedor /usr/share/nginx/html


CMD ["nginx", "-g", "daemon off;"]
