# Build ───────────────────────────────────────────────────────────────────────
FROM node:12 as build

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app
RUN yarn build


# Add nextjs ───────────────────────────────────────────────────────────────────────
FROM node:12 as next

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn add next


# Run ───────────────────────────────────────────────────────────────────────
FROM node:12-alpine3.12

WORKDIR /app

# app specific
ENV MONGODB_URL=mongodb://mongodb:27017/analysis
ENV NEXT_PUBLIC_ADMIN_ACCESS_GROUP=local
ENV NEXT_PUBLIC_API_URL=http://backend:7070
ENV NEXT_PUBLIC_AUTH_DISABLED=true
ENV NEXT_PUBLIC_MAPBOX_STYLE=mapbox/light-v10

COPY --from=build /app/next.config.js .
COPY --from=build /app/.next .next
COPY --from=build /app/public public

COPY --from=next /app/node_modules node_modules

RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000
CMD node_modules/.bin/next start
