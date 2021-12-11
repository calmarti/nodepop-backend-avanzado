
## Documentación del API
---

Puedes ver una demo <a href="/demo">aquí</a>

## Requisitos de software

Se asume la previa instalación de:

 1. Node 10.19.0 o superior
 2. MongoDB 1.3.6 o superior

---

## Instalación
Clonar el repo:
 <pre>git clone https://github.com/calmarti/NodepopAvanzado.git</pre> 
 
 Instalar las dependencias: 
```sh 
npm install
```
---
## Inicialización de la base de datos

Los ficheros `initdb.js` y `advertSample.json` (muestra de 6 anuncios) permiten incializar la base de datos:

```sh 
npm run initdb
```

### Schemas del modelo

Colección de anuncios:
```js

    name: { type: String, required: true }, 
    sale: { type: Boolean, required: true },
    price:  {type: Number, required:true },
    tags: { type: [String] },   
    picture: { type: String }

```
Colección de usuarios:
```js
  email: { type: String, unique: true },
  password: { type: String },
```
La colección de usuarios tiene un único usuario registrado:
<pre>email: admin@example.com
password: 1234</pre>

---

## Ejecución

Se asume que el servidor de MongoDB ha sido arrancado.

Para establecer la conexión a MongoDB (a través de mongoose) e iniciar la aplicación de Express:

```sh
npm start
```
ó en modo desarrollo: 

```sh
npm run dev
```

---

## Como usar la API de  Nodepop

---
 ### Autenticación
El endpoint de autenticación devuelve un JWT token de 2 horas de duración
```sh
http://127.0.0.1:3000/apiv1/auth

```

Para acceder a cualquier endpoint es necesario enviar el token JWT en la cabecera 'Authentication' o en el body de la peticion POST.

---
### GET /apiv1/adverts

Devuelve todos los anuncios:
```sh
http://127.0.0.1:3000/apiv1/adverts
```

**Campos**

**Name**: nombre del producto

**Price**: precio del producto

**Sale** = `true` si es un anuncio de venta / `false` si es un anuncio de compra

**Tags**: array de tags o categorías a las que pertenece el producto

**Picture**: Cadena con la ruta de la foto del producto

---

### Filtros:

**Par clave-valor**:

```sh
http://127.0.0.1:3000/apiv1/adverts?campo=valor
```

**Por campo seleccionado**

```sh
http://127.0.0.1:3000/apiv1/adverts/?select=campo
```


**Paginación** 

- `skip=n`: ignora los primeros *n* anuncios 

- `limit=n`: muestra solo *n* anuncios 

**Ordenación**

- `sort = campo` 

Ordenación descendente: `sort = -campo` 


**Por rango de precio** están disponibles estas opciones:
- Rango cerrado: 
 ```sh
 http://127.0.0.1:3000/apiv1/adverts/?price=min-max
 ```
- Rango abierto superior a un mínimo: 
 ```sh
 http://127.0.0.1:3000/apiv1/adverts/?price=min-
 ```
- Rango abierto inferior a un máximo:

 ```sh
 http://127.0.0.1:3000/apiv1/adverts/?price=-max
 ```

---

### GET /apiv1/adverts/tags

Para obtener la lista de tags o categorías:

```sh
http://127.0.0.1:3000/apiv1/adverts/tags
```

---

### POST /apiv1/adverts
Para crear un nuevo anuncio (formato multipart/form-data)

```sh
http://127.0.0.1:3000/apiv1/adverts
```


Campos del anuncio:

 `name, price, sale, tags, picture`
 
(los *types* deben coincidir con los definidos en el *schema*) 

---


## Microservicio de redimensionamiento de imagen

El redimensionamiento del fichero de imagen (en caso de haberlo) se realiza con un microservicio, gracias a las librerías: **code** y **jimp**

El servicio se activa y **permanece en modo 'listening'** al arrancar la aplicación.

La **ejecución** del servicio se produce al subir una foto como parte de la creación de un anuncio. 

---

## Test de integración

Test del endpoint GET /apiv1/auth con Supertest y jest.
```
npm run test:inv
```
---
## Frontend de nodepop (internacionalizado)

La aplicación cuenta con una interfaz de frontend internacionaliada en: inglés, español y francés

La ruta **index** renderiza esta documentación gracias a la librería strapdown.js
```sh
http://127.0.0.1:3000/
```
La ruta **demo** (accesible desde index), renderiza en el frontend algunas de las peticiones GET indicadas arriba

```sh
http://127.0.0.1:3000/demo
```


