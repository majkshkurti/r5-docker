# Build ───────────────────────────────────────────────────────────────────────
FROM node:12 as build

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app
RUN yarn build


# Run ───────────────────────────────────────────────────────────────────────
FROM node:12-alpine3.12

# app specific
ENV MONGODB_URL=mongodb://127.0.0.1:27017/analysis
ENV NEXT_PUBLIC_ADMIN_ACCESS_GROUP=local
ENV NEXT_PUBLIC_API_URL=http://localhost:7070
ENV NEXT_PUBLIC_AUTH_DISABLED=true
ENV NEXT_PUBLIC_MAPBOX_STYLE=mapbox/light-v10

COPY --from=build /app/next.config.js .
COPY --from=build /app/.next .next
COPY --from=build /app/public public

RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000
CMD node_modules/.bin/next start
