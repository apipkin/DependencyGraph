'use strict';

/**
 * Server instance used to view and order a Dependency Graph values
 */
const Hapi = require('hapi');
const Hoek = require('hoek');
const Joi = require('joi');
const FS = require('fs');

const DGraph = require('./lib/DependencyGraph');
const Password = require('./lib/Password');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({ 
  host: 'localhost', 
  port: process.env.PORT || 3501
});



// Register inert (static file serving) and vision (handlebars) 
server.register([require('inert'), require('vision'), {
  register: require('yar'),
  options: {
    cookieOptions: {
      password: Password.generate({ length: 64 }),
      isSecure: false
    }
  }
}], (err) => {

  // Handle errors
  Hoek.assert(!err, err);

  // Setup view logic
  server.views({
      engines: {
          html: require('handlebars')
      },
      relativeTo: __dirname,
      path: './views',
      layout: 'index',
      layoutPath: './views/layout',
      partialsPath: './views/partials'
  });

  ////
  // ROUTES
  ////

  // Handle build calls with no query
  server.route({
    method: 'post',
    path: '/build/',
    config: {
      payload: {
        output: 'stream',
        parse: true,
        allow: ['multipart/form-data']
      },
      handler(request, reply) {
        const data = request.payload;

        let fileData = '';

        if (data.file) {
          try {
            data.file.on('data', (chunk) => {
              fileData += chunk.toString();
            });

            data.file.on('end', (err) => {
              if (err) {
                return reply({
                  error: err
                });
              }

              const graph = DGraph();
              graph.build(fileData);
              
              // store in session for next route
              request.yar.clear('graph');
              request.yar.set('graph', graph.serialize());

              reply({
                  filename: data.file.hapi.filename,
                  upload: true,
                  graphNodes: graph.getNodeNames()
              });
            });
          }
          catch (e) {
            return reply({
              filename: data.file.hapi.filename,
              error: {
                name: e.name,
                message: e.message
              }
            });
          }
        }
        else {
          reply({ noop: true });
        }
      }
    }
  });

  // Handle topology calls with no query
  server.route({
    method: 'get',
    path: '/topology/',
    handler: (request, reply) => (
      reply({
        query: '',
        error: {
          message: 'Please select a class to recompile.'
        }
      })
    )
  });

  // Handle topology calls with a query
  server.route({
    method: 'get',
    path: '/topology/{q}',
    handler(request, reply) {
      const topology = request.params.q;

      try {
        // hydrate
        const nodes = request.yar.get('graph');
        const graph = DGraph().hydrate(nodes);

        return reply({
          query: topology,
          inbound: graph.getInboundNodes(topology)
        });
      } catch (e) {
        return reply({
          query: topology,
          error: {
            name: e.name,
            message: e.message
          }
        });
      };
    }
  });

  // Handle style requests
  server.route({
    method: 'get',
    path: '/styles/{file}',
    handler: {
      directory: {
        path: './public/styles'
      }
    }
  });

  // Handle script requests
  server.route({
    method: 'get',
    path: '/scripts/{file}',
    handler: {
      directory: {
        path: './public/scripts'
      }
    }
  });

  // Handle DGraph sorter view
  server.route({
    method: 'GET',
    path:'/', 
    handler: {
      view: {
        template: 'index',
        context: {
          title: 'Graph',
          subtitle: 'Class Dependency'
        }
      }
    }
  });

  // Start the server and log local url 
  server.start((err) => {
    if (err) throw err;
  
    console.log('Server running at:', server.info.uri);
  });
});
