const express = require("express");
const dontenv = require("dotenv");
const connectDB =  require("./dbase/connect");
const todoRouter = require("./routes/todoRoutes");

dontenv.config({
    path: './config.env'
});

connectDB();

const PORT = process.env.port || 8001;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))


//Routes
app.use('/', todoRouter);

//frontend
app.use(express.static('public'));

app.listen(PORT, (err) => {
    if (err) {
        console.error(`Failed to run the server: ${err}`)
    } else {
        console.log(`Server started on port ${PORT}`)
    }
})
