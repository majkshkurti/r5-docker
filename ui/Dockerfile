# Please read README.txt for prerequisites before using this Dockerfile

# Git commit to use
ARG COMMIT_SHA=3071865ccf01

# Build ───────────────────────────────────────────────────────────────────────
FROM node:12 as build

WORKDIR /app

# Tell Docker that we will use COMMIT_SHA in this layer
ARG COMMIT_SHA
# Clone the source code wuthout all history, then reset to COMMIT_SHA
RUN git clone https://github.com/conveyal/analysis-ui .
RUN git reset --hard ${COMMIT_SHA}

# Copy .env file that can contain Mapbox API key
COPY ui/.env .

RUN yarn install
RUN yarn build


# Add nextjs ───────────────────────────────────────────────────────────────────────
FROM node:12 as next

WORKDIR /app
COPY --from=build /app/package.json /app/yarn.lock /app/
RUN yarn add next


# Run ───────────────────────────────────────────────────────────────────────
FROM node:12-alpine3.12

WORKDIR /app

COPY --from=build /app/next.config.js .
COPY --from=build /app/.next .next
COPY --from=build /app/public public

COPY --from=next /app/node_modules node_modules

COPY ui/.env .env.local

RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000
CMD node_modules/.bin/next start
