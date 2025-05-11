# API para gestión de una aplicación de Blog

## 1. Gestión de autores

### GET /api/author

* **Method**: GET
* **URL**: /api/author
* **Headers**:
* **Body**: 
* **Response**: Array con todos los autores. 

```json
[
    {
        "name": "Juan Pérez",
        "email": "juan@example.com",
        "image": "juan.jpg"
    },
    {
        "name": "Laura Gómez",
        "email": "laura@example.com",
        "image": "laura.jpg"
    },
    {
        "name": "Carlos Ruiz",
        "email": "carlos@example.com",
        "image": "carlos.jpg"
    },
    {
        "name": "José García",
        "email": "jose@example.com",
        "image": "jose.jpg"
    },
    {
        "name": "José García",
        "email": "jose_@example.com",
        "image": "jose.jpg"
    }
]
```

### POST /api/author

* **Method**: POST
* **URL**: /api/author
* **Headers**: 
    + ```Content-Type: application/json```
* **Body**: Datos a insertar del autor. Todos los datos son obligatorios.

```json
{
    "name": "José García",
    "email": "jose_@example.com",
    "image": "jose.jpg"
}
```

* **Response**: Devuelve un objeto que contiene los datos del autor y de la respuesta recibida al hacer el INSERT.

```json
{
    "author": {
        "name": "José García",
        "email": "jose_@example.com",
        "image": "jose.jpg"
    },
    "result": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 10,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 0
    }
}
```
    
Si algún dato en el cuerpo de la llamada no se ha especificado, obtendremos el siguiente error:

```json
{ error: 'Name, email, and image are required.' }
```

Si existe un autor con el correo electrónico especificado, obtendremos el siguiente error:

```json
{ error: 'Author already exists with that email.' }
```

## 2. Gestión de posts

### GET /api/post

* **Method**: GET
* **URL**: /api/post
* **Headers**:
* **Body**: 
* **Response**: Array con todos los posts junto a los datos de sus autores. 

```json
[
  {
    "title": "Introducción a SQL",
    "description": "Una guía básica sobre SQL.",
    "createdAt": "2025-05-09T22:00:00.000Z",
    "category": "Programación",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "image": "juan.jpg"
  },
  {
    "title": "Fotografía para principiantes",
    "description": "Consejos esenciales de fotografía.",
    "createdAt": "2025-05-08T22:00:00.000Z",
    "category": "Fotografía",
    "name": "Laura Gómez",
    "email": "laura@example.com",
    "image": "laura.jpg"
  },
  {
    "title": "Cocina vegana fácil",
    "description": "Recetas veganas simples para cada día.",
    "createdAt": "2025-05-07T22:00:00.000Z",
    "category": "Cocina",
    "name": "Carlos Ruiz",
    "email": "carlos@example.com",
    "image": "carlos.jpg"
  },
  {
    "title": "Avanzando en JavaScript",
    "description": "Conceptos intermedios a avanzados de JS.",
    "createdAt": "2025-05-06T22:00:00.000Z",
    "category": "Programación",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "image": "juan.jpg"
  },
  {
    "title": "Viajar barato por Europa",
    "description": "Tips y trucos para ahorrar viajando.",
    "createdAt": "2025-05-05T22:00:00.000Z",
    "category": "Viajes",
    "name": "Laura Gómez",
    "email": "laura@example.com",
    "image": "laura.jpg"
  },
  {
    "title": "Aprendiendo Node.js con ejemplos",
    "description": "Este post explica cómo comenzar a usar Node.js con proyectos reales.",
    "createdAt": "2025-05-09T22:00:00.000Z",
    "category": "Desarrollo Web",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "image": "juan.jpg"
  }
]
```

Si usamos el parámetro ```groupedByAuthor``` con valor ```true``` (por defecto, es ```false```), agrupamos los posts por autor:

### GET /api/post?groupedByAuthor=true

```json
[
  {
    "name": "Carlos Ruiz",
    "email": "carlos@example.com",
    "image": "carlos.jpg",
    "posts": [
      {
        "title": "Cocina vegana fácil",
        "description": "Recetas veganas simples para cada día.",
        "createdAt": "2025-05-07T22:00:00.000Z",
        "category": "Cocina"
      }
    ]
  },
  {
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "image": "juan.jpg",
    "posts": [
      {
        "title": "Introducción a SQL",
        "description": "Una guía básica sobre SQL.",
        "createdAt": "2025-05-09T22:00:00.000Z",
        "category": "Programación"
      },
      {
        "title": "Avanzando en JavaScript",
        "description": "Conceptos intermedios a avanzados de JS.",
        "createdAt": "2025-05-06T22:00:00.000Z",
        "category": "Programación"
      },
      {
        "title": "Aprendiendo Node.js con ejemplos",
        "description": "Este post explica cómo comenzar a usar Node.js con proyectos reales.",
        "createdAt": "2025-05-09T22:00:00.000Z",
        "category": "Desarrollo Web"
      }
    ]
  },
  {
    "name": "Laura Gómez",
    "email": "laura@example.com",
    "image": "laura.jpg",
    "posts": [
      {
        "title": "Fotografía para principiantes",
        "description": "Consejos esenciales de fotografía.",
        "createdAt": "2025-05-08T22:00:00.000Z",
        "category": "Fotografía"
      },
      {
        "title": "Viajar barato por Europa",
        "description": "Tips y trucos para ahorrar viajando.",
        "createdAt": "2025-05-05T22:00:00.000Z",
        "category": "Viajes"
      }
    ]
  }
]
```

Si usamos el parámetro ```:author_id```, se devuelven los posts asignados al autor con dicho id.

### GET /api/post/:author_id

```json
[
  {
    "title": "Introducción a SQL",
    "description": "Una guía básica sobre SQL.",
    "createdAt": "2025-05-09T22:00:00.000Z",
    "category": "Programación"
  },
  {
    "title": "Avanzando en JavaScript",
    "description": "Conceptos intermedios a avanzados de JS.",
    "createdAt": "2025-05-06T22:00:00.000Z",
    "category": "Programación"
  },
  {
    "title": "Aprendiendo Node.js con ejemplos",
    "description": "Este post explica cómo comenzar a usar Node.js con proyectos reales.",
    "createdAt": "2025-05-09T22:00:00.000Z",
    "category": "Desarrollo Web"
  },
  {
    "title": "_Aprendiendo Node.js con ejemplos",
    "description": "Este post explica cómo comenzar a usar Node.js con proyectos reales.",
    "createdAt": "2025-05-10T22:00:00.000Z",
    "category": "Desarrollo Web"
  }
]
```

Si no existe ningún autor con ese id, se devolverá el siguiente error:

```json
{
  "error": "No authors found for that author_id."
}
```

Si no existe ningún post para el autor con ese id, se devolverá el siguiente error:

```json
{
  "error": "No posts found for that author_id."
}
```

### POST /api/post

* **Method**: POST
* **URL**: /api/post
* **Headers**: 
    + ```Content-Type: application/json```
* **Body**: Datos a insertar del post. Todos los datos son obligatorios.

```json
{
    "title": "Aprendiendo Node.js con ejemplos",
    "description": "Este post explica cómo comenzar a usar Node.js con proyectos reales.",
    "category": "Desarrollo Web",
    "author_id": 1
}
```

* **Response**: Devuelve un objeto que contiene los datos del post (la fecha de inserción es asignada por el backend) y de la respuesta recibida al hacer el INSERT.

```json
{
  "post": {
    "title": "_Aprendiendo Node.js con ejemplos",
    "description": "Este post explica cómo comenzar a usar Node.js con proyectos reales.",
    "createdAt": "2025-05-11",
    "category": "Desarrollo Web",
    "author_id": 1
  },
  "result": {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 7,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0,
    "changedRows": 0
  }
}
```
    
Si algún dato en el cuerpo de la llamada no se ha especificado, obtendremos el siguiente error:

```json
{ error: "Title, description, category, and author_id are required." }
```

Si existe un post con el título especificado, obtendremos el siguiente error:

```json
{ error: "Post already exists with that title." }
```
