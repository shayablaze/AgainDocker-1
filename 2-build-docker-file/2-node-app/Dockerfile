# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some depenendencies, notice how the copy is done after npm Install
# so we don't have to install npm after every change in the files
COPY ./package.json ./
RUN npm install
COPY ./ ./

# Default command
CMD ["npm", "start"]
