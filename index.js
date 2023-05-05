const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const { MongoClient, ObjectId } = require('mongodb');
// const mongoose = require('mongoose');
const Todo = require('./modals/')
const Boom = require('@hapi/boom');

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

// const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connect() {
  await client.connect();
  console.log('Connected to MongoDB database');
}

connect();

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello, world!';
  }
});

server.route({
  method: 'GET',
  path: '/todos',
  handler: async (request, h) => {
    try {
      const db = client.db('learn-hapi');
      const collection = db.collection('todos');
      const todos = await collection.find({}).toArray();
      return todos;
    } catch (error) {
      throw Boom.internal(error.message);
    }
  }
});

server.route({
  method: 'POST',
  path: '/todos',
  options: {
    validate: {
      payload: Joi.object({
        title: Joi.string().required(),
        completed: Joi.boolean().required()
      })
    }
  },
  handler: async (request, h) => {
    try {
      const db = client.db('learn-hapi');
      const collection = db.collection('todos');
      const todo = request.payload;
      const result = await collection.insertOne(todo);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw Boom.internal(error.message);
    }
  }
});


server.route({
  method: 'PUT',
  path: '/todos/{id}',
  options: {
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      }),
      payload: Joi.object({
        title: Joi.string().required(),
        completed: Joi.boolean().required()
      })
    }
  },
  handler: async (request, h) => {
    try {
      const db = client.db('learn-hapi');
      const collection = db.collection('todos');
      const id = request.params.id;
      const todo = request.payload;
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: todo }
      );
      console.log(result);
      if (result.modifiedCount === 0) {
        throw Boom.notFound(`Todo item with id ${id} not found`);
      }
      return result.modifiedCount;
    } catch (error) {
      console.log(error);
      throw Boom.internal(error.message);
    }
  }
});

server.route({
  method: 'DELETE',
  path: '/todos/{id}',
  options: {
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      })
    }
  },
  handler: async (request, h) => {
    try {
      const db = client.db('learn-hapi');
      const collection = db.collection('todos');
      const id = request.params.id;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      console.log(result);
      if (result.deletedCount === 0) {
        throw Boom.notFound(`Todo item with id ${id} not found`);
      }
      return result.deletedCount;
    } catch (error) {
      console.log(error);
      throw Boom.internal(error.message);
    }
  }
});

server.ext('onPreResponse', (request, h) => {
  const response = request.response;
  if (response.isBoom) {
    const error = response.output.payload;
    const statusCode = response.output.statusCode;
    const message = error.message || 'An error occurred';
    return h.response({ statusCode, message }).code(statusCode);
  }
  return h.continue;
});

async function start() {
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
}

start();

