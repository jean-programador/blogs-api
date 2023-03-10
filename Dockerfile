FROM node:16.14

RUN apt update
RUN apt install lsof
RUN chown -R node:node /root/.npm/_logs