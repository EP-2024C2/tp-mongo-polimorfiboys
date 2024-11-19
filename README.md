# Estrategias de Persistencia - TP 2024

Este grupo está integrado por:
- Alonso, Maximiliano
- Balsamo, Martin
- Benoit, Nicolas
- Bianchi, Juan Pablo
- Castro Beilicke, Lucia Abril

## Comandos necesarios para instalar y ejecutar la API
Clonar el repo desde el GitHub.

Para instalar todas las dependencias que están en nuestro package.json debemos ejecutar:

```npm install```

Para poder correr MongoDB debemos ejecutar:

```docker-compose up -d```

Para poder correr nuestro proyecto debemos correr el comando:

```npm start```

## API
Estos son los endpoinds disponibles en nuestra API:

| Verbo  | Recurso                    | Status code   | Descripción                                           |
| ------ | -------------------------- | ------------- | ----------------------------------------------------- |
| GET    | /productos                 | 200           | Obtener todos los productos                           |
| GET    | /productos/:id             | 200, 404      | Obtener un producto en particular                     |
| POST   | /productos                 | 201, 400      | Crear un producto                                     |
| PUT    | /productos/:id             | 200, 404      | Modificar los datos de un producto en particular      |
| DELETE | /productos/:id             | 200, 404, 500 | Borrar un producto en particular                      |
| POST   | /productos/:id/fabricantes | 201, 404, 400 | Crear la asociación de producto con 1 o N fabricantes |
| GET    | /productos/:id/fabricantes | 200, 404      | Obtener todos los fabricantes de un producto          |
| POST   | /productos/:id/componentes | 201, 404, 400 | Crear la asociación de producto con 1 o N componentes |
| GET    | /productos/:id/componentes | 200, 404      | Obtener todos los componentes de un producto          |
| GET    | /fabricantes               | 200           | Obtener todos los fabricantes                         |
| GET    | /fabricantes/:id           | 200, 404      | Obtener un fabricante en particular                   |
| POST   | /fabricantes               | 201, 400      | Crear un fabricante                                   |
| PUT    | /fabricantes/:id           | 200, 404      | Modificar los datos de un fabricante en particular    |
| DELETE | /fabricantes/:id           | 200, 404, 500 | Borrar un fabricante en particular                    |
| GET    | /fabricantes/:id/productos | 200, 404      | Obtener todos los productos de un fabricante          |
| GET    | /componentes               | 200           | Obtener todos los componentes                         |
| GET    | /componentes/:id           | 200, 404      | Obtener un componente en particular                   |
| POST   | /componentes               | 201, 400      | Crear un componente                                   |
| PUT    | /componentes/:id           | 200, 404      | Modificar los datos de un componente en particular    |
| DELETE | /componentes/:id           | 200, 404, 500 | Borrar un componente en particular                    |
| GET    | /componentes/:id/productos | 200, 404      | Obtener todos los productos de un componente          |

## Relaciones
### Producto/Componente = Relación incrustada
Se eligió utilizar una relación incrustada porque los productos no varían con el paso del tiempo.

### Fabricante/Producto = Relación relacionada
Se eligió utilizar una relación relacionada porque la relación puede cambiar con el tiempo.
