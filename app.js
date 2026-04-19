import express from "express";
import {getFiles, createFile } from "#/db/queries/files"
import { getFolders, getFolderById } from "#db/queries/folders";
const app = express();


app.use(express.json());

app.get('/files',  async (request, response, next)=>{
    try {
        const files = await getFiles();
        response.send(files);
    } catch (error) {
        next(error);
    }

})

app.get('/folders', async (request, response, next)=>{
    try {
        const folders = await  getFolders();
        response.send(folders);
    } catch (error) {
        next(error);
    }
})

app.get('/folders/:id', async (request, response, next)=>{
    try {
        const folder = await getFolderById(request.params.id);
        if (!folder) {
            return response.status(404).send("Folder doesn't exist");
        }
        response.send(folder);
    } catch (error) {
        next(error);
    }
})

app.post('/folders/:id/files', async (request, response, next)=>{
    try {
        const { id } = request.params;
        
        if (!request.body ) {
            return response.status(400).send("Missing required fields");
        }
        const { name, size } = request.body;
        if(name === undefined || size === undefined){
          return response.status(400).send("Missing required fields");
        }

        const folder = await getFolderById(id);
        if (!folder) {
            return response.status(404).send("Folder doesn't exist");
        }

        const newFile = await createFile({ name, size, folderId: id });
        response.status(201).send(newFile);
    } catch (error) {
        next(error);
    }
})

app.use((request, response, next) => {
  response.status(500).send("Sorry! Something went wrong");
});

export default app; 