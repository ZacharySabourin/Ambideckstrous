FROM node:16

# Create work directory
WORKDIR /src

# Install app dependencies
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "node", "src/app.mjs"]