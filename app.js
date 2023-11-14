const express = require('express')
const dotenv = require('dotenv');
const hbs = require('hbs')
dotenv.config();
const ws = require("ws");
const app = express()
const userRouter = require('./routers/user')
const port = process.env.PORT
const path = require("path")

// Define paths for express config
const PathDir = path.join (__dirname, '/public')
const ViewsPath = path.join(__dirname, '/templates/views')
const PartialsPath = path.join(__dirname, '/templates/partials')

// Set up static directory to serve
app.use(express.json())
app.use(express.static(PathDir))
app.use(userRouter)

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', ViewsPath)
hbs.registerPartials(PartialsPath)

//import the express-ws library and set up WebSocket support on the app instance.
const expressWs = require('express-ws')(app);

const mongoose = require("mongoose");

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = "mongodb+srv://masterj:" + process.env.MONGO_PWD + "@messagingapp.wy7wslh.mongodb.net/?retryWrites=true&w=majority";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

const MSGStore = require("./models/msg_storage_schema")

// function broadcast(msg) {       // (4)
//     for (const client of ws.clients) {
//         if (client.readyState === ws.OPEN) {
//             client.send(msg)
//         }
//     }
// }

//route handler function is defined for the root path of the server.
app.get('/chat', function(req, res){
    res.render('index');
});

app.ws('/chat', function(ws, req) {
    //an event listener is set up for incoming WebSocket messages.
    ws.on('message', async function (msg) {
        // console.log(MSGStore.find({ sender: "me" })["msg"])
        console.log(msg);
        let data = msg.match(/@.+@/g)[0].replaceAll("@", "");
        let sender = msg.match(/#.+#/g)[0].replaceAll("#", "");
        let date = msg.match(/%.+%/g)[0].replaceAll("%", "");
        saveMSG = new MSGStore({
            sender: sender,
            receiver: "alsoMe",
            msg: data,
            date: date
        })
        console.log("saving model");
        await saveMSG.save();
        // ws.send(msg);
        for (const client of expressWs.getWss().clients) {
            if (client.readyState === ws.OPEN) {
                client.send(msg)
            }
        }
    });
    // ws.on('connection', (client) => {
    //     console.log('Client connected !')
    //     client.on('message', (msg) => {    // (3)
    //         console.log(`Message:${msg}`);
    //         // broadcast(msg)
    //     })
    // })
});

app.get('/last75', async function (req, res) {
    const messages = await MSGStore.find({}).sort({ createdAt: 1 }).limit(75)
    res.send(messages)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
