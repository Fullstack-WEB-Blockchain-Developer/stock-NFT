FROM node:lts as dependencies
WORKDIR /stoke-frontend
COPY package.json ./
RUN npm install --frozen-lockfile

FROM node:lts as builder
WORKDIR /stoke-frontend
COPY . .
COPY --from=dependencies /stoke-frontend/node_modules ./node_modules
RUN npm run build

FROM node:lts as runner
WORKDIR /stoke-frontend
ENV NODE_ENV production

COPY --from=builder /stoke-frontend/public ./public
COPY --from=builder /stoke-frontend/package.json ./package.json
COPY --from=builder /stoke-frontend/.next ./.next
COPY --from=builder /stoke-frontend/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]