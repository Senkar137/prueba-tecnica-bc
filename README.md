# Prueba Técnica - Configuración del Proyecto

Este archivo README proporciona instrucciones detalladas sobre cómo configurar y ejecutar el proyecto "prueba-tecnica-cuscatlan" basado en Angular 12.2.0.

## Requisitos Previos

Asegúrese de tener instaladas las siguientes herramientas antes de comenzar:

- [Node.js](https://nodejs.org/) (versión 14.x o superior) (Utilize nvm, use e instale la version 14 de nvm)
  ```bash
   nvm install 14

   nvm use 14.21.3
   ```
- [npm](https://www.npmjs.com/) (se instala con Node.js)
- [Angular CLI](https://angular.io/cli) (instale globalmente mediante `npm install -g @angular/cli@12`)

## Pasos de Configuración

1. **Clonar el Repositorio**

   ```bash
   git clone https://url-del-repositorio/prueba-tecnica.git
   cd prueba-tecnica
   ```

2. **Instalar Dependencias**

   ```bash
   npm install
   ```

3. **Configuración de Husky**

   Antes de ejecutar cualquier comando, instale Husky:

   ```bash
   npm run prepare
   ```

4. **Ejecutar la Aplicación**

   ```bash
   ng serve
   ```

   Esto iniciará la aplicación en modo de desarrollo. Abra su navegador y vaya a `http://localhost:4200/` para ver la aplicación en funcionamiento.

5. **Compilar la Aplicación para Producción**

   ```bash
   npm run build
   ```

   Esto generará la versión de producción en el directorio `dist/`.

6. **Ejecutar Pruebas Unitarias**

   ```bash
   npm test
   ```

7. **Ejecutar Linter**

   ```bash
   ng lint
   ```

## Scripts Útiles

- **Modo de Desarrollo con Recarga Automática**

  ```bash
  npm run watch
  ```

## Dependencias Principales

- **Angular:** 12.2.0
- **Angular Material:** 12.2.13
- **Transloco:** 3.1.4
- **NgRx:** 12.5.1
- **Owl Carousel:** 6.0.2

## Desarrolladores

- **Nombre del Desarrollador:** Oscar Enrique Orellana Monterrosa
- **Contacto:** orellana.monterrosa.o@gmail.com

---
