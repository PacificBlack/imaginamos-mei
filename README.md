<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <br>
  <a href="https://www.imaginamos.com/" target="blank"><img src="https://www.imaginamos.com/wp-content/uploads/2021/04/Brand-300x77.png" width="320" alt="Musicar Logo" /></a>
</p>

## Tecnologias Usadas

[PostgreSql](https://www.postgresql.org/) como gestor de base de datos.
[TypeORM](https://typeorm.io/) como ORM para la comunicación entre bd y aplicación.
[Docker](https://www.docker.com/) como contenedor de despliegue


## Descripcion

Servidor desarrollado en NestJS que resuelve la siguiente prueba tecnica:

Instrucciones:
Se requiere construir un sistema de órdenes de servicio para una empresa que ofrece servicios de
mantenimiento e instalación de soportes para televisores. Los clientes pueden hacer una solicitud de servicio
generando un ticket a través del sistema, al cual se le debe generar un token y asignar a un técnico de forma
aleatoria para que atienda la solicitud.
Por último, los técnicos pueden ver las órdenes asignadas y es necesario contar con un endpoint que retorne los
servicios del técnico en formato JSON con el listado.

Puntos a evaluar:
● Diseño modelado de datos.
● API REST con sus endpoints y documentación.
● Arquitectura de aplicación en Node.js (express o nest.js).
● Usar typescript y typeORM
● NO usar ningún boilerplate ni starter.
● Patrones de diseño utilizados.
● Usar motor de base de datos PostgreSQL.
● Colección de servicios en Postman.

Puntos extras:
● Escribir pruebas unitarias y/o de
comportamiento.
● Virtualización local (docker).
● Deploy (serverless framework).
● Documentación con swagger.
● Realizarlo con microservicios.


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Instalación

```bash
$ npm install
```

## Correr la aplicación:

```bash

#container docker con bd
$ npm run imagen-dock

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



## Extras

- Author - [Cristian Mosquera](https://github.com/PacificBlack)
- Nota - El archivo .env se agrega en esta ocación para ya tener las variables de entorno una vez clonado el proyecto


## License

Nest is [MIT licensed](LICENSE).
