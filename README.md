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

```js

POST /trip/create
Authorization: bearer TOKEN

     {
      tripNumber: '402034'
     }

Example response

{
  "jobs": [],
  "done": false,
  "_id": "602c08afd68e2200210cc3ad",
  "number": 402034,
  "creator": "602aa1f51eed6c0036be61c7",
  "createdAt": "2021-02-16T18:02:23.498Z",
  "updatedAt": "2021-02-16T18:02:23.498Z"
}

```

```js

GET /trip/find
    ?number=402034
Authorization: bearer TOKEN

     {
      tripNumber: '402034'
     }

Example response

{
  "jobs": [],
  "done": false,
  "_id": "602c097e491e41003c298042",
  "number": 402034,
  "creator": {
    "_id": "602aa1f51eed6c0036be61c7",
    "name": "John Doe",
    "email": "some@email.com"
  },
  "createdAt": "2021-02-16T18:05:50.686Z",
  "updatedAt": "2021-02-16T18:05:50.686Z"
}

```

```js

POST /job/create
Authorization: bearer TOKEN

     {
        "jobNumber": "23423",
        "tripNumber": "45345"
      }

Example response

{
  "files": [],
  "_id": "602c0a05491e41003c298043",
  "number": 23423,
  "trip": 45345,
  "info": "",
  "creator": "602aa1f51eed6c0036be61c7",
  "createdAt": "2021-02-16T18:08:05.675Z",
  "updatedAt": "2021-02-16T18:08:05.675Z"
}

```

```js

GET /job/find
    ?number=23423
Authorization: bearer TOKEN

Example response

{
  "files": [],
  "_id": "602c0a05491e41003c298043",
  "number": 23423,
  "trip": 34525,
  "info": "",
  "creator": "602aa1f51eed6c0036be61c7",
  "createdAt": "2021-02-16T18:08:05.675Z",
  "updatedAt": "2021-02-16T18:08:05.675Z"
}

```
