import express from "express";
const app = express();


app.use(express.json());

app.get('/files', (request, response, next)=>{

})

app.get('/folders', (request, response, next)=>{
    
})

app.get('/folders/:id', (request, response, next)=>{
    
})

app.post('/folders/:id/files', (request, response, next)=>{
    
})


app.use((request, response, next) => {
  response.status(500).send("Sorry! Something went wrong");
});

export default app;