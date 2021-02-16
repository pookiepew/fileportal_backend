# Fileportal

### Routes

```js

POST /user/register
     {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password : 'PASSWORD'
     }

Example response

{
  "user": {
    "name": "John Doe",
    "email": "johndoe@email.com",
    "token": "TOKEN"
  }
}

```

```js

POST /user/login
     {
      email: 'johndoe@email.com',
      password : 'PASSWORD'
     }

Example response

{
  "user": {
    "name": "John Doe",
    "email": "johndoe@email.com",
    "token": "TOKEN"
  }
}

```
