FROM node:16-slim as builder
WORKDIR /app
ARG APP_ENVIRONMENT=production
COPY jsconfig.json ./
COPY next.config.js ./
COPY Gruntfile.js ./
COPY package.json ./
COPY package-lock.json ./
COPY .env.${APP_ENVIRONMENT} ./.env
COPY public ./public
COPY src ./src
RUN npm install
RUN ["npm", "run", "build"]
CMD ["npm", "run", "start"]