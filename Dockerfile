FROM python:3

# This prevents Python from writing out pyc files
ENV PYTHONDONTWRITEBYTECODE 1

# This keeps Python from buffering stdin/stdout
ENV PYTHONBUFFERED=1

RUN mkdir /code
WORKDIR /code

#RUN apt-get install mysql-client

RUN pip install --upgrade pip
COPY requirements.txt /code/

RUN pip install -r requirements.txt
COPY . /code/

EXPOSE 8000

# initial migration on startup
#RUN python manage.py migrate
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
