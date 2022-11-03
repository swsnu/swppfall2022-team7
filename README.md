# SPRINT
[![Build Status](https://app.travis-ci.com/swsnu/swppfall2022-team7.svg?branch=main)](https://app.travis-ci.com/swsnu/swppfall2022-team7)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swppfall2022-team7&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swppfall2022-team7)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2021-team7/badge.svg?branch=main)](https://coveralls.io/github/swsnu/swpp2021-team7?branch=main)
<br>
SPRINT(Special Platform for Robust Integration) by Team 7
<br>
SNU SWPP fall 2022

# Frontend

## How to run frontend

Before type below, you need to add .env file to frontend directory.
<pre><code>> pwd
(swppfall2022-team7)/frontend
> cd sprint
> yarn install
> yarn start</code></pre>

## Test

go to http://localhost:3000

# Backend

## How to run backend

Before type below, you need to add .env file to backend directory.
<pre><code>> pwd
(swppfall2022-team7)/backend
> pip install -r requirements.txt
> cd sprint
> python manage.py migrate
> python manage.py runserver</code></pre>

## Test

<pre><code>> cd backend/sprint
> chmod +x test.sh
> ./test.sh</code></pre>