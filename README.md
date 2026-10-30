# WhatsApp Bot Starter

Plantilla básica y reutilizable para crear un bot de WhatsApp con Node.js, Baileys y `@bot-whatsapp`. Incluye bienvenida, menú interactivo con cuatro opciones y respuestas editables. No depende de un negocio, catálogo ni base de datos concretos.

## Requisitos

- Node.js 22 LTS y npm
- WhatsApp en un teléfono para vincular el bot como dispositivo

## Instalación

```bash
git clone https://github.com/Brasther/chatBotWhatsapp-01.git
cd chatBotWhatsapp-01/base-baileys-memory
npm ci
npm start
```

Al iniciar, abre el portal local que muestra el proyecto y escanea el QR con WhatsApp desde **Dispositivos vinculados**. Mantén el proceso activo para que el bot responda.

## Probar y personalizar

Escribe `menu` al número vinculado. Las opciones y sus respuestas están en `base-baileys-memory/mensajes/`:

| Archivo | Contenido |
| --- | --- |
| `bienvenida.txt` | Presentación inicial |
| `menu.txt` | Texto y opciones del menú |
| `acerca.txt` | Información general |
| `servicios.txt` | Productos, servicios u opciones principales |
| `horarios.txt` | Horarios o disponibilidad |
| `contacto.txt` | Datos de contacto |

Reemplaza los textos entre corchetes. Si cambias la cantidad u orden de las opciones, actualiza también el flujo en `base-baileys-memory/app.js`.

La base usa un adaptador en memoria, suficiente para este menú de ejemplo. Los datos temporales se pierden al reiniciar; no se requiere configurar MongoDB. Baileys crea credenciales locales en `bot_sessions/`; no las compartas ni las subas a Git. Para desconectar la sesión, cierra el proceso y elimina esa carpeta; también puedes cerrar la sesión desde Dispositivos vinculados en el teléfono.

## Comandos

Desde `base-baileys-memory/`:

```bash
npm start     # inicia el bot
npm run lint  # revisa el código con ESLint
```

## Licencia

Este proyecto se distribuye bajo la licencia [MIT](LICENSE), que permite usarlo, modificarlo y redistribuirlo, incluso con fines comerciales, conservando el aviso de copyright y la licencia. Las dependencias conservan sus propias licencias.
