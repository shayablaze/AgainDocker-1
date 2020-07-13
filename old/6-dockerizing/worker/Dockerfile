FROM node:alpine
WORKDIR '/app'
COPY package.json ./
RUN npm install
COPY . .
# we put start instead of dev. dev is for nodemon, here is the real thing.
CMD ["npm", "run", "start"]
