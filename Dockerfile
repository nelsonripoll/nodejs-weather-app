FROM node:lts

COPY nodejs /home/node/app

WORKDIR /home/node/app

RUN npm install

ENV PORT=3000

EXPOSE 3000

CMD ["node_modules/nodemon/bin/nodemon.js", "app.js", "--ext", "js,hbs"]
