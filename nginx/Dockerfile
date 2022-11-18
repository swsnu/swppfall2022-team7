FROM nginx
USER root
WORKDIR /nginx
ENV TZ=Asia/Seoul

COPY . .

RUN rm /etc/nginx/conf.d/default.conf
RUN mv ./default.conf /etc/nginx/conf.d/default.conf