import os

os.system("python manage.py migrate")
os.system("python manage.py collectstatic")
os.system("gunicorn sprint.wsgi:application --bind 0.0.0.0:8000 --timeout=1000 --workers 3")
