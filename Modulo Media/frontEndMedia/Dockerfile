FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

# Railway asignará un puerto dinámicamente
ENV PORT=8080
EXPOSE 8080

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/front-end-media/browser /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

# Asegurarse de que nginx puede escribir en los directorios necesarios
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# CMD como root (por defecto)
CMD ["nginx", "-g", "daemon off;"]
