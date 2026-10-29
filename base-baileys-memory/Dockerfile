FROM node:22-bookworm-slim AS bot
WORKDIR /app
ENV PORT=3000
EXPOSE 3000
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["npm", "start"]
