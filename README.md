# CountryVote Frontend

Aplicación frontend para el reto **CountryVote**.  
Permite a los usuarios votar por su país favorito y visualizar el Top 10 de países más votados.

---

## Funcionalidad

- Formulario para votar por un país:
  - Nombre
  - Email (único por voto)
  - País
- Tabla **Top 10 Most Voted Countries**
  - Muestra país, capital, región, subregión y número de votos
  - Buscador por país, capital, región o subregión
- La tabla se refresca después de registrar un voto

---

## Tecnologías

- Angular (standalone components)
- Bootstrap (estilos)
- HttpClient (consumo de API REST)

---

## Requisitos

- Node.js (LTS recomendado)
- npm
- Angular CLI

---

## Instalación

```bash
npm install

Ejecución
ng serve --proxy-config proxy.conf.json

La aplicación queda disponible en: http://localhost:4200

Configuración de API
El frontend consume el backend a través del prefijo:
/api
En desarrollo se utiliza un proxy para redirigir las llamadas a:
http://localhost:8080

Esto evita problemas de CORS y mantiene desacoplado el frontend del backend.

⸻

Decisiones de diseño

Separación en componentes
	•	VoteForm
	•	Maneja el formulario de votación
	•	Valida los campos con Reactive Forms
	•	Emite un evento cuando un voto es registrado correctamente
	•	TopTable
	•	Carga y muestra el Top 10 de países más votados
	•	Permite filtrar los resultados desde la UI

Servicio central de API
	•	CountryvoteApiService
	•	Centraliza todas las llamadas HTTP
	•	Facilita mantenimiento y pruebas
	•	Encapsula endpoints de países, votos y top 10

Validaciones
	•	Se usan Reactive Forms
	•	Validaciones de campos requeridos y formato de email
	•	Se evita el envío de votos inválidos desde la UI
