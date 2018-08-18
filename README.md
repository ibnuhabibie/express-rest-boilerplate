# Overview
This is a straightforward boilerplate for building REST APIs

# Getting Started

Clone the repo:
```sh
git clone https://github.com/ibnuhabibie/express-rest-boilerplate.git
cd express-rest-boilerplate
```

Install dependencies:
```js
npm install
npm install pm2 -g
pm2 install pm2-logrotate
pm2 set pm2-logrotate:compress true
```

Set environment (vars):
```sh
cp .env.example .env
```

Start server:
```sh
# Start development server with pm2
# Enable file-watching
npm run dev
```
