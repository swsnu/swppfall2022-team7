FROM node:16.13.1-alpine3.14
USER root
WORKDIR /frontend
ENV TZ=Asia/Seoul

EXPOSE 3000

## Install packages
RUN mkdir sprint
COPY sprint/package.json ./sprint/
COPY sprint/package-lock.json ./sprint/
COPY sprint/tsconfig.json ./sprint/
COPY sprint/tsconfig.paths.json ./sprint/
COPY sprint/yarn.lock ./sprint/
COPY sprint/craco.config.js ./sprint/
RUN cd sprint && yarn
COPY . .
RUN cd sprint && yarn build

RUN cd sprint && yarn global add serve

CMD cd sprint && serve -s build -l 3000