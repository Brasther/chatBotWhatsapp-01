const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const fs = require('fs')
const path = require('path')

const readMessage = (fileName) => fs.readFileSync(path.join(__dirname, 'mensajes', fileName), 'utf8').trim()

const answers = {
    about: readMessage('acerca.txt'),
    services: readMessage('servicios.txt'),
    hours: readMessage('horarios.txt'),
    contact: readMessage('contacto.txt'),
}

const createOptionFlow = (answer) => addKeyword([EVENTS.ACTION]).addAnswer(answer)

const optionFlows = [
    createOptionFlow(answers.about),
    createOptionFlow(answers.services),
    createOptionFlow(answers.hours),
    createOptionFlow(answers.contact),
]

const menuFlow = addKeyword(['menu', 'menú', 'Menu', 'Menú', 'MENU', 'MENÚ'])
    .addAnswer(readMessage('menu.txt'), { capture: true }, async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        const choice = ctx.body.trim()

        if (choice === '0') {
            await flowDynamic('Listo. Escribe *menu* cuando quieras volver a ver las opciones.')
            return
        }

        const selectedFlow = Number(choice) - 1
        if (!Number.isInteger(selectedFlow) || selectedFlow < 0 || selectedFlow >= optionFlows.length) {
            return fallBack('Opción no válida. Responde con un número del 0 al 4.')
        }

        return gotoFlow(optionFlows[selectedFlow])
    })

const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAnswer(readMessage('bienvenida.txt'))
    .addAnswer('Escribe *menu* para ver las opciones disponibles.')

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([menuFlow, welcomeFlow, ...optionFlows])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main().catch((error) => {
    console.error('No se pudo iniciar el bot:', error.message)
    process.exitCode = 1
})
