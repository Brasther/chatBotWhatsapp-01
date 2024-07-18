const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
require('dotenv').config();

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
//const MockAdapter = require('@bot-whatsapp/database/mock')
const MongoAdapter = require('@bot-whatsapp/database/mongo')
console.log("MongoDB URI:", process.env.MONGO_DB_URI); // Verifica que la URI se imprime correctamente

const path = require("path")
const fs = require("fs")


const menuPath = path.join(__dirname, "mensajes", "catalogo.txt")
const menu = fs.readFileSync(menuPath, "utf8")

const bienvenidaPath = path.join(__dirname, "mensajes", "bienvenida.txt")
const bienvenida = fs.readFileSync(bienvenidaPath, "utf8")

const consultaPath = path.join(__dirname, "mensajes", "consulta.txt")
const consulta = fs.readFileSync(consultaPath, "utf8")

const poleraPath = path.join(__dirname, "mensajes", "polera.txt")
const polera = fs.readFileSync(poleraPath, "utf8")

const poleronPath = path.join(__dirname, "mensajes", "poleron.txt")
const poleron = fs.readFileSync(poleronPath, "utf8")

const FlowCatalogo = addKeyword([EVENTS.ACTION])
    .addAnswer('Este es el Catalogo',{
        media: "https://drive.google.com/file/d/1dl8miuNXodfJ6aJZGutqeKIDdjJf8gY5/view?usp=sharing"
    })
    
const flowPoleras = addKeyword([EVENTS.ACTION])
    .addAnswer(polera)

const flowPolerones = addKeyword([EVENTS.ACTION])
    .addAnswer(poleron)

const flowConsulta = addKeyword([EVENTS.ACTION])
    .addAnswer(consulta)

const flowPrincipal = addKeyword(['hola','Hola','HOLA','ola','Ola','OLA','buenas','Buenas','BUENAS'])
    .addAnswer(bienvenida)


const flowWelcome = addKeyword(EVENTS.WELCOME)
    .addAnswer("===Esta es una respuesta automatica===",{
        delay: 100,
    },
    async (ctx,ctxFn) =>{
        
        await ctxFn.flowDynamic("Para cualquier consulta escriba, 'menu' ")


        console.log(ctx.body)
    })



const menuFlow = addKeyword("Menu").addAnswer(
     menu,
     { capture: true },
     async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
     if (!["1", "2", "3", "4","0"].includes(ctx.body)) {
     return fallBack(
     "Respuesta no válida, por favor selecciona una de las opciones."
     );
     }
     switch (ctx.body) {
        case "1":
            return  gotoFlow(FlowCatalogo);
        case "2":
            return  gotoFlow(flowPoleras);
        case "3":
            return  gotoFlow(flowPolerones);
        case "4":
            return  gotoFlow(flowConsulta);
        case "0":
            return await flowDynamic(
            "Saliendo... Puedes volver a acceder a este menú escribiendo '*Menu*'"

            );

        }
    }
);


const main = async () => {
    const adapterDB = new MongoAdapter({
        dbUri: process.env.MONGO_DB_URI,
        dbName: "test"
    })
    const adapterFlow = createFlow([flowPrincipal,flowWelcome ,menuFlow,FlowCatalogo,flowPoleras,flowPolerones,flowConsulta])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
