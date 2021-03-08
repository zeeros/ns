FROM node:14
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json ./
RUN npm install
COPY *.html .recaptcha.key package.json server.js ./
EXPOSE 5000
CMD [ "node", "server.js" ]
