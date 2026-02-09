Qué hace
	•	Formulario para votar: nombre, email, país.
	•	Tabla “Top 10 Most Voted Countries” con buscador por país, capital, región o subregión.
	•	Refresca la tabla después de registrar un voto.

Tecnologías
	•	Angular (standalone components)
	•	Bootstrap (estilos)
	•	HttpClient (consumo de API)

Cómo instalar y ejecutar

Requisitos:
	•	Node.js (LTS recomendado)
	•	npm

Instalación:
- npm install

Ejecución:
- ng serve --proxy-config proxy.conf.json

La app queda disponible en:
	•	http://localhost:4200

Configuración de API

El frontend consume el backend vía /api/....
En desarrollo normalmente se usa un proxy (o configuración equivalente) para que /api apunte a http://localhost:8080.

Decisiones de diseño (y cómo cumplen requisitos)
	•	Separación en componentes:
	•	VoteForm: registra el voto y notifica al padre cuando se crea un voto.
	•	TopTable: carga y muestra el Top 10, y permite filtrar.
	•	Servicio central de API:
	•	CountryvoteApiService encapsula llamadas HTTP (countries, votes, top10).
	•	Validaciones:
	•	Reactive Forms para validar inputs (requeridos, email válido).
Compromisos por tiempo
	•	El refresco de la tabla y el rendering pueden requerir ajustes finos de change detection (especialmente en SSR/hydration).
	•	Manejo de errores: hay casos donde el backend retorna error pero falta mapear el mensaje exacto al usuario en UI.
	•	No se añadieron pruebas unitarias/e2e por limitación de tiempo (se priorizó funcionalidad y demo).
	•	Se mantuvo el estilo simple con Bootstrap, evitando sobre-optimizar UI.

Cómo probar rápido (end-to-end)
	1.	Levantar backend (puerto 8080).
	2.	Levantar frontend (puerto 4200).
	3.	Abrir http://localhost:4200.
	4.	Registrar un voto con email nuevo.
	5.	Verificar que el Top 10 se actualice.
	6.	Intentar votar con el mismo email y validar que el sistema rechaza el voto.