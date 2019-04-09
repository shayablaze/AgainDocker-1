FROM node:alpine as builder
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# All we need here is the /app/build, not all the devendencies
# here everything is saved batzad in 'builder'
# we can now take ONLY the build and put it in /usr/share/nginx/html
# by puting another FROM, it means the previous one is temporary and will be destroyed.
# I am copying from a previous phaze called builder.
# nginx documentation states to put your stuff in /usr/share/nginx/html
# our image now is going to be very small, just nginx and some html and js files.
FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
