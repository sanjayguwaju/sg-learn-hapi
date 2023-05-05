const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const todoModel = require('./modals/todoSchema')
const Boom = require('@hapi/boom');

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

mongoose.connect('mongodb://localhost:27017/learn-hapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
      const todos = await todoModel.find({});
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
        description: Joi.string().required(),
        status: Joi.string().valid('pending', 'in progress', 'completed').default('pending').optional(),
        dueDate: Joi.date().required()
      })
    }
  },
  handler: async (request, h) => {
    try {
      const todo = new todoModel(request.payload);
      const result = await todo.save();
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
        description: Joi.string().required(),
        status: Joi.string().valid('pending', 'in progress', 'completed').optional(),
        dueDate: Joi.date().required()
      })
    }
  },
  handler: async (request, h) => {
    try {
      const id = request.params.id;
      const todo = await todoModel.findByIdAndUpdate(id, request.payload, { new: true });
      if (!todo) {
        throw Boom.notFound(`Todo item with id ${id} not found`);
      }
      return todo;
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
      const id = request.params.id;
      const result = await todoModel.findByIdAndDelete(id);
      if (!result) {
        throw Boom.notFound(`Todo item with id ${id} not found`);
      }
      return result;
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
  try {
    await mongoose.connect('mongodb://localhost:27017/learn-hapi', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB database');
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();

