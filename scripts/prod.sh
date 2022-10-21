python manage.py collectstatic --no-input
python manage.py makemigrations
python manage.py migrate
#python manage.py runserver 0:8000
gunicorn -w 4 -b 0.0.0.0:8000 project.wsgi:application
