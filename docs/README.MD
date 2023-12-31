<div align="center">
<h1>Documentation Rest API</h1>
<small><a href="https://github.com/zoelabbb/expresslearn">Repository</a></small>
</div>

### GET

> GET https://localhost:3000/api/posts

| Status   | Description                                                            |
| -------- | ---------------------------------------------------------------------- |
| 200 - OK | When you have a data in the database, you will see the response below. |

Response: 200 - OK

```json
{
  "status": true,
  "message": "List Data Posts",
  "data": []
}
```

### POST

> POST https://localhost:3000/api/posts

Response: 200 - OK
```json
{
  "message": "Data inserted successfully",
  "postId": 7
}
```

<hr>

Response: 400 - Bad Request
```json
{
  "message": "Title and content are required."
}
```

### PUT

> PUT https://localhost:3000/api/posts/update/{:id}

| Status          | Description                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------- |
| 200 - OK        | When you have a data in the database, you will see the response below.                       |
| 400 - Not Found | When you UPDATE a post and not have a data in the database, you will see the response below. |

Response: 200 - OK
```json
{
  "status": true,
  "message": "Update Data Successfully",
  "data": {
    "title": "Belajar memasak",
    "content": "Hari ini kita akan memasak nasi goreng khas kediri."
  }
}
```

<hr>

Response: 404 - Not Found
```json
{
  "status": false,
  "message": "Opps.. Data Not Found"
}
```

### DELETE

> DELETE https://localhost:3000/api/posts/delete/{:id}

| Status          | Description                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------- |
| 200 - OK        | When you have a data in the database, you will see the response below.                       |
| 400 - Not Found | When you DELETE a post and not have a data in the database, you will see the response below. |

Response: 200 - OK

```json
{
  "status": true,
  "message": "Data deleted successfully"
}
```

<hr>
Response: 404 - Not Found

```json
{
  "status": false,
  "message": "Opps.. Data Not Found, try to add data first"
}
```
