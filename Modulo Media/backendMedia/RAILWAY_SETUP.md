# Configuración de Conexión a Railway - Módulo Media

## Variables de Entorno Requeridas

Para conectar tu backend a la base de datos de Railway, necesitas configurar estas variables de entorno:

### En Railway Dashboard:

1. Ve a tu proyecto en Railway
2. Selecciona tu servicio de base de datos MySQL
3. Ve a la pestaña "Variables"
4. Agrega las siguientes variables:

```bash
DATABASE_URL=jdbc:mysql://root:UlXUZFwyYlwzdHowzoqfKDADwXwiKWwJ@switchyard.proxy.rlwy.net:34375/railway
DATABASE_USERNAME=root
DATABASE_PASSWORD=UlXUZFwyYlwzdHowzoqfKDADwXwiKWwJ
PORT=3306
```

### Para obtener las credenciales:

1. **DATABASE_URL**: En Railway, ve a tu servicio MySQL → "Connect" → "Connect with MySQL"
2. **DATABASE_USERNAME**: Usuario de la base de datos
3. **DATABASE_PASSWORD**: Contraseña de la base de datos
4. **PORT**: Railway asigna automáticamente, pero puedes usar 8080

## Endpoints de Prueba

Una vez configurado, puedes probar la conexión con estos endpoints:

### 1. Probar Conexión
```bash
GET /api/database/test
```

### 2. Información de la Base de Datos
```bash
GET /api/database/info
```

### 3. Health Check
```bash
GET /api/database/health
```

## Operaciones CRUD Disponibles

Tu backend ya tiene implementadas todas las operaciones CRUD:

### Materiales
- `GET /api/material` - Listar todos los materiales
- `GET /api/material/{id}` - Obtener material por ID
- `POST /api/material` - Crear nuevo material
- `PUT /api/material/{id}` - Actualizar material
- `DELETE /api/material/{id}` - Eliminar material

### Evaluaciones
- `GET /api/evaluacion` - Listar todas las evaluaciones
- `GET /api/evaluacion/{id}` - Obtener evaluación por ID
- `POST /api/evaluacion` - Crear nueva evaluación
- `PUT /api/evaluacion/{id}` - Actualizar evaluación
- `DELETE /api/evaluacion/{id}` - Eliminar evaluación

### Planificaciones
- `GET /api/planificacion` - Listar todas las planificaciones
- `GET /api/planificacion/{id}` - Obtener planificación por ID
- `POST /api/planificacion` - Crear nueva planificación
- `PUT /api/planificacion/{id}` - Actualizar planificación
- `DELETE /api/planificacion/{id}` - Eliminar planificación

## Ejemplo de Uso

### Crear un Material:
```bash
curl -X POST http://tu-app.railway.app/api/material \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Matemáticas Básicas",
    "tipo": "PDF",
    "nivel": "Media",
    "asignatura": "Matemáticas",
    "url_descarga": "https://ejemplo.com/material.pdf",
    "es_online": true,
    "fechaModificacion": "2024-01-15"
  }'
```

### Obtener todos los materiales:
```bash
curl -X GET http://tu-app.railway.app/api/material
```

## Troubleshooting

### Error de conexión:
1. Verifica que las variables de entorno estén correctas
2. Asegúrate de que la base de datos esté activa en Railway
3. Revisa los logs de la aplicación

### Error de tablas:
1. Las tablas se crean automáticamente con `hibernate.ddl-auto=update`
2. Si hay problemas, verifica que el usuario tenga permisos de CREATE

### Logs:
- Los logs SQL están habilitados para debugging
- Revisa la consola de Railway para ver los logs 