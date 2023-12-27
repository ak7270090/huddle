const textgears =require ('textgears-api');
const connectDB=require('./db');
const express = require("express");
const app = express();
const cors = require("cors");

//connectDB();
app.use(cors({
    origin: [`http://localhost:3000`],
    optionsSuccessStatus: 200,
    credentials: true
  }
));
app.use(express.json());


app.post("/rec/getrec", async(req, res) => {
console.log("script",req.body);

const script = req.body.data
 var totalSoFar = script.split(' ').length
 console.log("total words in string", totalSoFar)

 
var totalSoFarError=0;
const textgearsApi = textgears('TMvt6WKwtoYLW5BO', {language: 'en-US', ai: true});
textgearsApi.checkGrammar(script)
    .then((data) => {
        for (const error of data.response.errors) {
             totalSoFarError++;
            console.log('Error: %s. Suggestions: %s', error.bad, error.better.join(', '));
        }
        console.log("total error words",totalSoFarError)
        res.json(data);
    })
    .catch((err) => {});

});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
