FROM python:3.9.6
USER root
WORKDIR /backend
ENV TZ=Asia/Seoul

EXPOSE 8000

COPY .env ./

RUN pip install --upgrade pip
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .

CMD cd sprint && python run.py
