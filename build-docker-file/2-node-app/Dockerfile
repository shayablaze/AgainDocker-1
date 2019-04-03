# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some depenendencies
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]

#docker build -t shaya/simpleweb:latest .
#docker run -p 8080:8080 shaya/simpleweb
