FROM node:12.20.0-alpine

WORKDIR /frontend

# add `/frontend/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

RUN npm init
COPY package.json ./frontend/
COPY package-lock.json ./frontend/
RUN npm install --silent
RUN npm install react-scripts@4.0.0 -g --silent

COPY . ./frontend/

CMD ["npm", "run", "build"]