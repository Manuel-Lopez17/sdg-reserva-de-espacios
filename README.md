
# 🗓️ Sistema de Gestión de Reserva de Espacios

Proyecto Full Stack desarrollado con **Laravel (backend)** y **React + Vite (frontend)**, preparado para correr en contenedores Docker.

## 📦 Requisitos

- [Docker](https://www.docker.com/)
- [Make](https://www.gnu.org/software/make/) (para Linux/macOS) o `make.bat` para Windows
- [PNPM](https://pnpm.io/) (opcional si querés correr el frontend sin Docker)

---

## 🚀 Levantar el proyecto

### Opción 1: Usando Make

#### Linux / macOS

```bash
make build     # Construye las imágenes
make up        # Inicia los servicios en segundo plano
make migrate   # Ejecuta migraciones de la base de datos
```

#### Windows (CMD o PowerShell)

```cmd
make.bat build
make.bat up
make.bat migrate
```

---

### Opción 2: Comandos Docker manuales

```bash
docker compose build
docker compose up -d

# Ejecutar migraciones (dentro del contenedor backend)
docker exec -it reserva_backend php artisan migrate
```

---

## 🔍 Acceso a la app

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend (API):** [http://localhost:8000](http://localhost:8000)

---

## 🧪 Comandos útiles

```bash
# Parar los contenedores
make down

# Ver logs en tiempo real
make logs

# Acceder al contenedor backend
make bash
```

> Todos estos comandos están disponibles en `Makefile` y `make.bat`.

---

## 🗃️ Base de datos

- Usa **SQLite** por defecto
- El archivo se encuentra en: `apps/backend/database/database.sqlite`
- Si no existe, se crea automáticamente cuando ejecutás `make migrate`

---

## 📂 Estructura del proyecto

```
.
├── apps/
│   ├── backend/     # Proyecto Laravel
│   └── frontend/    # Proyecto React + Vite
├── docker-compose.yml
├── Makefile
├── make.bat
└── README.md
```

---

## 🛠️ Tecnologías

- Laravel
- React + Vite
- Tailwind CSS
- Supabase Auth (opcional si se agrega login externo)
- Docker + Docker Compose

---

## 👥 Roles y funcionalidades

- **Usuarios**:
  - Registrarse e iniciar sesión
  - Ver espacios disponibles
  - Crear y cancelar reservas

- **Administradores**:
  - Ver reservas pendientes
  - Aprobar o rechazar reservas

---

## 🧪 Usuarios de prueba
Puedes iniciar sesión usando los siguientes usuarios precargados por el seeder:

- Admin	admin@example.com	password
- User	john@example.com	password
- User	jane@example.com	password

---

## 🧾 Licencia

MIT © [Manuel López](https://github.com/Manuel-Lopez17)
