# spa-auth-app

# Install
```bash
# at the project root
docker-compose up --build

# open anoher terminal tab and at the project root
docker-compose exec auth-backend bash -c 'python manage.py createsuperuser'
```

# Run
```bash
# at the project root
docker-compose up
```

admin: [http://localhost:8081/api/admin/](http://localhost:8081/api/admin/)

app: [http://localhost:8081/](http://localhost:8081/)

# Add package

## Add python package
```bash
# at [prj-root]/spa_auth_app
pip install [package]
pip freeze > requirements.txt
docker-compose up --build
```

## Add js package
```bash
# at [prj-root]/frontend
yarn add [-D] [package]
# or
npm install [--save-dev] [package]
```