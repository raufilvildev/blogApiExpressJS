# API para gestión de una aplicación de Blog

## 1. Gestión de autores

### GET /api/author

* **Method**: GET
* **URL**: /api/author
* **Headers**:
* **Body**: 
* **Response**: Objeto que contiene un array con todos los autores. 

```json
{
  "authors": [
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
}
```
Podemos usar los query params ```page``` y ```limit``` para devolver los datos paginados. Ambos parámetros deben ser positivos y si ```page``` es usado, entonces ```limit``` también.

#### GET /api/author?limit=2

```json
{
  "limit": "2",
  "authors": [
    {
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "image": "juan.jpg"
    },
    {
      "name": "Laura Gómez",
      "email": "laura@example.com",
      "image": "laura.jpg"
    }
  ]
}
```

#### GET api/author?page=2&limit=3

```json
{
  "page": "2",
  "limit": "3",
  "authors": [
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
}
```

Si no encontramos ningún autor usando los query params, devolveremos el siguiente error:

```json
{ "error": "No authors found for that specific page and limit." }
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
        "id": 10,
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
{ "error": "Name, email and image are required." }
```

Si existe un autor con el correo electrónico especificado, obtendremos el siguiente error:

```json
{ "error": "Author already exists with that email." }
```

## 2. Gestión de posts

### GET /api/post

* **Method**: GET
* **URL**: /api/post
* **Headers**:
* **Body**: 
* **Response**: Objeto que contiene un array con todos los los posts junto a los datos de sus autores. 

```json
{
  "posts": [
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
    },
    {
      "title": "_Aprendiendo Node.js con ejemplos",
      "description": "Este post explica cómo comenzar a usar Node.js con proyectos reales.",
      "createdAt": "2025-05-10T22:00:00.000Z",
      "category": "Desarrollo Web",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "image": "juan.jpg"
    }
  ]
}
```

Si usamos el query param ```groupedByAuthor``` con valor ```true``` (por defecto es ```false```), agrupamos los posts por autor:

#### GET /api/post?groupedByAuthor=true

```json
{
  "posts": [
    {
      "author": {
        "name": "Carlos Ruiz",
        "email": "carlos@example.com",
        "image": "carlos.jpg"
      },
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
      "author": {
        "name": "Juan Pérez",
        "email": "juan@example.com",
        "image": "juan.jpg"
      },
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
        },
        {
          "title": "_Aprendiendo Node.js con ejemplos",
          "description": "Este post explica cómo comenzar a usar Node.js con proyectos reales.",
          "createdAt": "2025-05-10T22:00:00.000Z",
          "category": "Desarrollo Web"
        }
      ]
    },
    {
      "author": {
        "name": "Laura Gómez",
        "email": "laura@example.com",
        "image": "laura.jpg"
      },
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
}
```

Podemos usar los query params ```page``` y ```limit``` para devolver los datos paginados. Ambos parámetros deben ser positivos y si ```page``` es usado, entonces ```limit``` también.

#### GET /api/post?limit=3

```json
{
  "limit": "3",
  "posts": [
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
    }
  ]
}
```

#### GET /api/post?page=2&limit=3

```json
{
  "page": "2",
  "limit": "3",
  "posts": [
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
}
```

#### GET /api/post?groupedByAuthor=true&page=2&limit=3

```json
{
  "page": "2",
  "limit": "3",
  "posts": [
    {
      "author": {
        "name": "Juan Pérez",
        "email": "juan@example.com",
        "image": "juan.jpg"
      },
      "posts": [
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
    },
    {
      "author": {
        "name": "Laura Gómez",
        "email": "laura@example.com",
        "image": "laura.jpg"
      },
      "posts": [
        {
          "title": "Fotografía para principiantes",
          "description": "Consejos esenciales de fotografía.",
          "createdAt": "2025-05-08T22:00:00.000Z",
          "category": "Fotografía"
        }
      ]
    }
  ]
}
```

Si usamos el parámetro ```:author_id```, se devuelven los posts asignados al autor con dicho id.

### GET /api/post/:author_id

* **Method**: GET
* **URL**: /api/post/:author_id
* **Headers**:
* **Body**: 
* **Response**: Objeto que contiene un array con todos los los posts asociados al autor con id ```author_id```. 


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

Podemos usar los query params ```page``` y ```limit``` para devolver los datos paginados. Ambos parámetros deben ser positivos y si ```page``` es usado, entonces ```limit``` también.

#### GET /api/post/1?limit=2

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
  }
]
```

#### GET /api/post/1?page=2&limit=2

```json
[
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

Si no existe ningún post para el autor con id ```author_id``` o ```page``` y ```limit``` especificados, se devolverá el siguiente error:

```json
{ "error": "No posts found for that author_id or specific page and limit." }
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
{ "error": "Title, description, category and author_id are required." }
```

Si existe un post con el título especificado, obtendremos el siguiente error:

```json
{ "error": "Post already exists with that title." }
```
