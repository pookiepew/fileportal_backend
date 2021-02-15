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
