# WhatsApp Bot Starter

Plantilla inicial para crear un bot sencillo de WhatsApp con Node.js, Baileys y `@bot-whatsapp`. Trae un mensaje de bienvenida y un menú con cuatro opciones que puedes adaptar a una tienda, servicio, comunidad o proyecto personal.

> Esta plantilla se conecta a WhatsApp mediante Baileys y vincula tu cuenta como un dispositivo. Úsala con una cuenta que controles y no compartas sus archivos de sesión.

## Antes de empezar

1. Instala **Node.js 22 LTS** desde [nodejs.org](https://nodejs.org/en/download/). npm viene incluido.
2. Comprueba la instalación en una terminal nueva:

   ```bash
   node --version
   npm --version
   ```

   El primer comando debe mostrar una versión `v22.x`.
3. Instala [Git](https://git-scm.com/downloads) si aún no lo tienes. También puedes descargar el repositorio como ZIP desde el botón **Code → Download ZIP** de GitHub y extraerlo.

## Instalar y arrancar

Si usas Git, copia estos comandos en la terminal:

```bash
git clone https://github.com/Brasther/chatBotWhatsapp-01.git
cd chatBotWhatsapp-01/base-baileys-memory
npm ci
npm start
```

`npm ci` instala las dependencias fijadas por el proyecto. La primera instalación puede tardar unos minutos. No hace falta configurar MongoDB ni crear un archivo `.env`.

Si descargaste el ZIP, abre una terminal dentro de la carpeta extraída y entra a `base-baileys-memory`. Ejecuta allí:

```bash
npm ci
npm start
```

## Vincular WhatsApp

Con `npm start` en ejecución:

1. Abre en el mismo computador [http://localhost:3000](http://localhost:3000).
2. En WhatsApp del teléfono, abre **Dispositivos vinculados → Vincular un dispositivo**.
3. Escanea el QR que aparece en el portal.
4. Deja abierta la terminal donde ejecutaste el bot. Si la cierras, el bot se detiene.

Desde otra cuenta de WhatsApp, escribe `menu` al número vinculado para probar las opciones. El bot responde a mensajes nuevos con la bienvenida y explica cómo abrir el menú.

## Personalizar los textos

Los mensajes se encuentran en `base-baileys-memory/mensajes/`:

| Archivo | Edita aquí |
| --- | --- |
| `bienvenida.txt` | Nombre del proyecto y saludo inicial |
| `menu.txt` | Texto y nombres de las opciones |
| `acerca.txt` | Descripción del negocio o proyecto (opción 1) |
| `servicios.txt` | Productos, servicios u opciones (opción 2) |
| `horarios.txt` | Horarios o disponibilidad (opción 3) |
| `contacto.txt` | Correo, web y otras formas de contacto (opción 4) |

Reemplaza los textos entre corchetes por tu información. Si solo cambias el texto de las opciones, no tienes que tocar el código. Para agregar, quitar o reordenar opciones, actualiza también el arreglo `optionFlows` y la selección del menú en `base-baileys-memory/app.js`.

## Comandos útiles

Ejecútalos desde `base-baileys-memory/`:

```bash
npm start     # inicia el bot y el portal del QR
npm run lint  # revisa el estilo del código
```

Para detener el bot, vuelve a la terminal y pulsa `Ctrl+C`. Las credenciales de WhatsApp se guardan en `bot_sessions/` dentro de la aplicación. No compartas esa carpeta ni la subas a Git. Para desvincular la cuenta, usa **Dispositivos vinculados** en WhatsApp; para comenzar una sesión local nueva, detén el bot y elimina `bot_sessions/`.

### Solución de problemas

- **`node` o `npm` no se reconoce:** instala Node.js 22 LTS y abre una terminal nueva.
- **El puerto 3000 está ocupado:** cierra la otra aplicación que lo utiliza o inicia el bot en otro puerto. En PowerShell ejecuta `$env:PORT=3001; npm start`; en macOS/Linux, `PORT=3001 npm start`. Abre luego [http://localhost:3001](http://localhost:3001).
- **No aparece o no carga el QR:** confirma que el bot siga ejecutándose y revisa los mensajes de error en la terminal. Si la sesión anterior quedó incompleta, detén el bot, elimina `bot_sessions/` y vuelve a iniciarlo.

## Licencia

El código de este proyecto está disponible bajo la licencia [MIT](LICENSE). Puedes usarlo, modificarlo y redistribuirlo, incluso con fines comerciales, conservando el aviso de copyright y una copia de la licencia. Las dependencias mantienen sus propias licencias.
