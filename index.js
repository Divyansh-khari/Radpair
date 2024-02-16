const { OpenAI } = require("openai");
const express = require('express')
const app= express()
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const port= 3080
const configuration = new OpenAI({
    
    apiKey: "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"
})

const bodyParser= require('body-parser')
const cors= require('cors')

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req,res)=>{
    const {message}= req.body;
    console.log(message, "message")
    const completion = await configuration.completions.create({
        model: "davinci-002",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    
    res.json({
        message: completion.choices[0].text
        // messsage: 
      })
})

app.listen(port, ()=>{
    console.log(`Example app listening at http:// localhost: ${port}`)
    
})




