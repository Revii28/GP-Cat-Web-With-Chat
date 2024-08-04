# Individual Project

# Cat Adoption

## User Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`

### 1. POST /register

Request:

- body:

```json
{
    "username": "string",
    "email": "string",
    "passsword": "string",
    "confirmPasssword": "string",

}
```

Response (_201 - Created_)

```json
{
    "id": "number",
    "email": "string"
}
```

Response (_400 - Bad Request_)

```json
{
    "message": "Please provide a valid email address"
}

OR

{
    "message": "This email is already in use"
}

OR

{
    "message": "Email is required"
}
OR

{
    "message": "Username is required"
}

OR

{
    "message": "Password is required"
}
OR

{
    "message": "Password doesn't match"
}

OR

{
    "message": "Password must be at least 6 characters"
}
```

Response (_401 - Unaouthorized_)

```json
{
    "message": "Invalid token"
}
```

Response (_403 - Forbidden_)

```json
{
    "message": "You are not authorized"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 2. POST /login

- body:

```json
{
    "email": "string",
    "passsword": "string"
}
```

Response (_200 - OK_)

```json
{
    "access_token": "string"
}
```

Response (_400 - Bad Request_)

```json
{
    "message": "Email is required"
}

OR

{
    "message": "Password is required"
}

```

Response (_401 - Unauthorized_)

```json
{
    "message": "Email has not been registered"
}

OR

{
    "message": "Invalid password"
}

```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

&nbsp;

## Cats Endpoints

List of available endpoints:

- `GET /cats`
- `POST /cats`
- `PATCH /cats/:id`
- `DELETE /cats/:id`

### 1. GET /cats

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (_200 - OK_)

```json
[
    {
        "cats": [
        {
            "id": "number",
            "name": "string",
            "breed": "string",
            "age": "string",
            "gender": "string",
            "adoptionStatus": "string",
            "description": "string",
            "UserId": "number",
            "CatImages": [
                {
                    "id": "number",
                    "imgUrl": "string",
                    "CatId": "number",
                }
            ]

        }

        ]
    }
]
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Invalid token"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 2. POST /cats

Description:
Create a post and save it to database. Login is required to access this endpoint.

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{       "name": "string",
        "breed": "string",
        "age": "string",
        "gender": "string",
        "description": "string",
        "images": "array"

}
```

Response (_201 - Created_)

```json
{
            "id": "number",
            "name": "string",
            "breed": "string",
            "age": "string",
            "gender": "string",
            "adoptionStatus": "Available",
            "description": "string",
            "UserId": "number"
}
```

Response (_400 - Bad Request_)

```json
{
    "message": "name is required"
}

OR

{
    "message": "breed is required"
}

OR

{
    "message": "age is required"
}
OR

{
    "message": "gender is required"
}
OR

{
    "message": "description is required"
}
OR

{
    "message": "Please upload the image"
}
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Invalid token"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 3. PATCH /cats/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (_200 - OK_)

```json
{
            "id": "number",
            "name": "string",
            "breed": "string",
            "age": "string",
            "gender": "string",
            "adoptionStatus": "Available",
            "description": "string",
            "UserId": "number"
}
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Invalid token"
}
```

Response (_403 - Forbidden_)

```json
{
    "message": "You are not authorized"
}
```

Response (_404 - Not Found_)

```json
{
    "message": "Cat not found"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

### 4. DELETE /cats/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (_200 - OK_)

```json
{
"message": "Delete success"
}
```

Response (_401 - Unauthorized_)

```json
{
    "message": "Invalid token"
}
```

Response (_403 - Forbidden_)

```json
{
    "message": "You are not authorized"
}
```

Response (_404 - Not Found_)

```json
{
    "message": "Cat not found"
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```

## Public Endpoints

List of available endpoints:

- `GET /pub/cats`

### 1. GET /pub/cats

description:
Get all cats data for public.

Response (_200 - OK_)

```json
{
    "cats": [
        {
            "id": "number",
            "name": "string",
            "breed": "string",
            "age": "string",
            "gender": "string",
            "adoptionStatus": "Available",
            "description": "string",
            "UserId": "number",
            "User": {
                "userName": "string"
            },
            "CatImages": [
                {
                    "imgUrl": "string"
                },
                {
                    "imgUrl": "string"
                },
                {
                    "imgUrl": "string"
                }
            ]
        }
    ]
}
```

Response (_500 - Internal Server Error_)

```json
{
    "message": "Internal Server Error"
}
```
