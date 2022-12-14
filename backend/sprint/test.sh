#!/bin/bash

pylint **/*.py --load-plugins pylint_django
coverage run --source='.' --omit='manage.py','*/wsgi.py','*/asgi.py','*/__init__.py' manage.py test --keepdb
coverage report -m
