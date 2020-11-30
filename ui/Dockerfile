# Please read README.txt for prerequisites before using this Dockerfile

# Build ───────────────────────────────────────────────────────────────────────
FROM node:12 as build

WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build


# Add nextjs ───────────────────────────────────────────────────────────────────────
FROM node:12 as next

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn add next


# Run ───────────────────────────────────────────────────────────────────────
FROM node:12-alpine3.12

WORKDIR /app

COPY --from=build /app/next.config.js .
COPY --from=build /app/.next .next
COPY --from=build /app/public public

COPY --from=next /app/node_modules node_modules

RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000
CMD node_modules/.bin/next start
