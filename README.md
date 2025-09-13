# Aulómetro - Frontend

![UNQ Logo](https://upload.wikimedia.org/wikipedia/commons/5/53/Logo_unqui.png)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/tu-usuario/aulometro-frontend/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React Version](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/bundler-vite-orange)](https://vitejs.dev/)
[![Node.js Version](https://img.shields.io/badge/node-v22.16.0-brightgreen)](https://nodejs.org/)

---

## Descripción

Aulómetro es la web app para **gestionar aulas y docentes** en la Universidad Nacional de Quilmes. Permite:  

- Visualizar y administrar aulas.  
- Registrar y gestionar docentes.  
- Alta y baja de usuarios y aulas con roles diferenciados.  
- Interfaces reactivas y dinámicas basadas en React y Vite.  

---

## Tecnologías

- **Frontend:** React 18, Vite  
- **Estilos:** CSS  
- **Estado y datos:** React Context / Hooks  
- **Backend API:** Consumo de endpoints REST (Express.js, Node.js)  
- **Node.js:** v22.16.0  
- **Linting:** ESLint  
- **Formateo de código:** Prettier  
- **Hooks de Git:** Husky  
- **Testing:** Jest


---

## Instalación

Cloná el repositorio:

```bash
git clone https://github.com/Giordanella/aulometro-front
cd aulometro-front
```

Instala las dependencias:

```bash
npm install
```

Ejecuta en ambiente de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:5173 por defecto.

## Backend

Recomendamos instalar el backend de la aplicación para probar en ambiente de desarrollo los llamados a la API. El mismo se encuentra en:

https://github.com/Giordanella/aulometro-back

## Scripts disponibles

- `dev` - Inicia el servidor de desarrollo con Vite.  
- `build` - Genera la build de producción con Vite.  
- `preview` - Previsualiza la build de producción.  
- `lint` - Corre ESLint para revisar el código (`.js`, `.jsx`, `.ts`, `.tsx`).  
- `format` - Formatea el código con Prettier.  
- `test` - Ejecuta los tests con Jest.  
- `prepare` - Configura Husky para hooks de Git.

## Contribuir

Forkea el repositorio.

Crea una branch con tu feature:

```bash
git checkout -b feature/nueva-funcionalidad
```

Haz commit de tus cambios: 

```bash
git commit -m "feat: agrega nueva funcionalidad"
```

Push a tu branch: 

```bash
git push origin feature/nueva-funcionalidad
```

Crea un Pull Request.

## Licencia

MIT © 2025 Universidad Nacional de Quilmes

## Contacto

Desarrollado por el equipo de Aulómetro (para Elementos de Ingeniería de Software)
Para consultas: nsalvanescki@uvq.edu.ar
