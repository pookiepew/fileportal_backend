# Fileportal

### Routes

```js

POST /user/register
     {
      name: 'John Doe',
      email: 'jd@email.com',
      password : 'j5lk43j5lkj34'
     }

Example response

{
  "user": {
    "name": "John Doe",
    "email": "jd@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjAyYTg5NjAxNmY0Y2QzNWExZjdlYTc2In0sImlhdCI6MTYxMzQwMDQxNiwiZXhwIjoxNjEzODMyNDE2fQ.gauvKMWZONIz4FXYvUGZNAWHyXV46O3Vu6l779zIpI8"
  }
}

```

```js

POST /user/login
     {
      email: 'jd@email.com',
      password : 'j5lk43j5lkj34'
     }

Example response

{
  "user": {
    "name": "John Doe",
    "email": "some@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjAyYWExZjUxZWVkNmMwMDM2YmU2MWM3In0sImlhdCI6MTYxMzQwODk0NCwiZXhwIjoxNjEzODQwOTQ0fQ.sL7DvFqC45r5NjtCk-O7bBMHZQLD_hr5l-OeX1UBT-o"
  }
}

```
