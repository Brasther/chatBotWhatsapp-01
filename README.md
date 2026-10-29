# AnyShirt · Bot de WhatsApp

Bot de demostración para una tienda de poleras y polerones personalizados. Responde saludos, muestra un menú de catálogo, entrega información de productos y guarda datos mediante MongoDB.

El código de la aplicación está en [`base-baileys-memory/`](base-baileys-memory/). Usa `@bot-whatsapp` con el proveedor Baileys y MongoDB. Es un proyecto de aprendizaje; antes de usarlo con clientes reales, reemplaza los textos, precios, imágenes y datos de contacto de ejemplo.

## Requisitos

- Node.js 22 LTS y npm
- Una instancia MongoDB local o una cuenta de MongoDB Atlas
- Una cuenta de WhatsApp para vincular como dispositivo del bot

## Instalación rápida

En PowerShell, desde la carpeta clonada:

```powershell
Set-Location base-baileys-memory
Copy-Item .env.example .env
notepad .env
npm ci
npm start
```

En `.env`, configura `MONGO_DB_URI` con la dirección de tu base MongoDB. No compartas ese archivo ni subas sus credenciales a Git.

Al iniciar, sigue las instrucciones del proveedor para vincular WhatsApp mediante el código QR. Los archivos de sesión se crean localmente en `bot_sessions/`; no los compartas ni los subas al repositorio.

## Cómo probarlo

Envía un saludo para recibir la bienvenida y escribe `menu` para abrir las opciones. El menú permite consultar el catálogo, la información de poleras y polerones, y las consultas frecuentes. Edita los archivos de `base-baileys-memory/mensajes/` para cambiar esos textos.

El enlace del catálogo está configurado en `base-baileys-memory/app.js`; reemplázalo por una imagen o catálogo propio antes de usar el bot.

## Comandos

Ejecuta estos comandos desde `base-baileys-memory/`:

```bash
npm ci        # instala las versiones fijadas en package-lock.json
npm start     # inicia el bot
npm run lint  # revisa el código con ESLint
```

## Docker (opcional)

Después de crear y configurar `base-baileys-memory/.env`, ejecuta desde la raíz:

```bash
docker build -t anyshirt-bot ./base-baileys-memory
docker run --rm -p 3000:3000 --env-file ./base-baileys-memory/.env -v anyshirt_sessions:/app/bot_sessions anyshirt-bot
```

El volumen `anyshirt_sessions` conserva la sesión de WhatsApp entre reinicios del contenedor.

## Estructura

```text
base-baileys-memory/
├── app.js
├── mensajes/          # respuestas y menú editables
├── package.json
├── package-lock.json
└── .env.example       # plantilla sin credenciales
```

## Configuración y datos privados

La aplicación requiere `MONGO_DB_URI`. Duplica `.env.example` como `.env` y agrega tu conexión local o de Atlas. La base de datos se llama `test` por defecto; puedes cambiarla en `app.js`.

Baileys guarda credenciales de WhatsApp en `bot_sessions/`. Esa carpeta, los archivos `.env`, los registros y los QR se excluyen de Git. Si una credencial real se publicó anteriormente, reemplázala en el servicio correspondiente; quitarla de la versión actual no la invalida ni elimina automáticamente las copias históricas.

## Licencia

El código original de este proyecto está bajo la licencia [MIT](LICENSE). Puedes usarlo, modificarlo y redistribuirlo, incluso con fines comerciales, conservando el aviso de copyright y el archivo de licencia. Las dependencias mantienen sus propias licencias.
