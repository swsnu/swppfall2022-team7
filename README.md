# SPRINT
<!-- [![Build Status](https://app.travis-ci.com/swsnu/swppfall2022-team7.svg?branch=main)](https://app.travis-ci.com/swsnu/swppfall2022-team7) -->
![Build Status](https://github.com/swsnu/swppfall2022-team7/actions/workflows/main.yml/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swppfall2022-team7&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swppfall2022-team7)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swppfall2022-team7/badge.svg?branch=main)](https://coveralls.io/github/swsnu/swppfall2022-team7?branch=main)
<br>
SPRINT(Special Platform for Robust Integration) by Team 7
<br>
SNU SWPP fall 2022

# Frontend

## How to run frontend

Before typing the script below, you need to set secret environment variables on terminal.
Download <code>env.sh</code> and type <code>source env.sh</code>.
<pre><code>> pwd
(swppfall2022-team7)/frontend
> cd sprint
> yarn install
> yarn start</code></pre>

## Test

* To check its behavior, http://localhost:3000

<pre><code>> cd frontend/sprint
> yarn test --coverage --watchAll=false</code></pre>

# Backend

## How to run backend

Before typing the script below, you need to set secret environment variables on terminal.
Download <code>env.sh</code> and type <code>source env.sh</code>.
<pre><code>> pwd
(swppfall2022-team7)/backend
> pip install -r requirements.txt
> cd sprint
> python manage.py migrate
> python manage.py runserver</code></pre>

## Test

* test.sh : pylint & coverage test

<pre><code>> cd backend/sprint
> chmod +x test.sh
> ./test.sh</code></pre>