# IndexCards
A full stack web app utilizing Django REST Framework (backend) and React.js/Redux (frontend).
Contains Login, Logout, and Registration with token authentication from Django-Rest-Knox.
Each card and cardset utilizes CRUD (Create, Retrieve, Update, Delete) operations.
The database used is SQLite but will soon be changed to POSTGreSQL.

This web app models Index Cards and can be used for studying, note-taking, reminders, etc.
Cards are grouped into cardsets. Each cardset contains a title and optional description. Each card has a value and description.

To see the web app in action:

1. Make sure you are in the same directory as the manage.py file after cloning the repository.

2. Then, type this command in the terminal:

      python manage.py runserver

3. Then copy the url into a browser tab.

      It should look something like: http://127.0.0.1:8000/
