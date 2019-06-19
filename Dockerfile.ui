FROM node:10-stretch
WORKDIR /app
COPY package*.json /app
RUN npm install && rm -rf ~/.npm
COPY . /app
# RUN rm -rf /app/.git /app/docs /app/node_modules
EXPOSE 7070
# not using npm start to avoid prestart script
CMD npx mastarm build --serve
