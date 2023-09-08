// import { createServer } from 'node:http';

// const server = createServer((req, res) => {
//     console.log('oi');

//     res.write('teste');
// });

// server.listen(3333);


import { fastify } from 'fastify';
import { DataBaseMemory } from '../dataBaseMemory/dataBaseMemory.js';


const server = fastify();
const database = new DataBaseMemory();


server.get('/videos', (req, reply) => {
    const search = req.query.search;

    const videos = database.list(search);

    return videos;
});

server.post('/videos', (request, reply) => {
    // Desestruturação
    const { title, description, duration } = request.body;

    database.create({
        title: title,
        description: description,
        duration: duration
    })

    // console.log(database.list(video));

    return reply.status(201).send();
});

server.put('/videos/:id', (request, reply) => {
    const videioId = request.params.id;
    const { title, description, duration } = request.body;

    database.update(videioId, {
        title: title,
        description: description,
        duration: duration
    })

    return reply.status(204).send();
});

server.delete('/videos/:id', (request, reply) => {
    const videioId = request.params.id;

    database.delete(videioId);

    return reply.status(204).send();
});


server.listen(
    {
        port: 3333
    }
);