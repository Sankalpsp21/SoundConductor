# vite react dockerfile
# Build
# FROM node:18.16.1-alpine3.18 as build
# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install --production
# COPY . .
# RUN npm run build

# Deploy
FROM --platform=linux/amd64 nginx:1.25.1-alpine3.17
# COPY --from=build /app/dist /usr/share/nginx/html
COPY dist /usr/share/nginx/html

# copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

