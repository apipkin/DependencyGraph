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
      // validate: {
      //   payload: {
      //     // multipart: {
      //     //   mode: 'file',
      //     //   uploadDir: __dirname + "/uploads/"
      //     // },
      //     // file: Joi.string().required().description('File is required')
      //   }
      // },
      payload: {
        output: 'stream',
        parse: true,
        // allow: ['multipart/form-data', 'text/plain']
        allow: ['multipart/form-data']
      },
      handler: function (request, reply) {
        var data = request.payload;
        // console.log('\n\n\n!~!~!~!~!~!~!~!~!~!~!~!~!\n\n\n\n')
        console.log(request.mime);
        // console.log('\n\n\n!~!~!~!~!~!~!~!~!~!~!~!~!\n\n\n\n')
        console.log(request.payload);
        // console.log('\n\n\n+++++++++++++++++++++++++\n\n\n\n')
        // console.log(request);

    

        if (data.file) {

          console.log(Object.keys(data.file.hapi));
          var name = Math.random().toString().substr(2) + '_' + data.file.hapi.filename;
          var path = __dirname + "/uploads/" + name;
          var file = FS.createWriteStream(path);

          file.on('error', function (err) { 
              console.log(Object.keys(data.file));
              console.error(err) 
          });

          data.file.pipe(file);

          file.on('end', function (err) { 
            console.log('done');
              var ret = {
                  filename: data.file.filename,
                  headers: data.file.headers
              }
              reply(ret);
          });

          file.on('close', function (err) { 
            console.log('close');
              var ret = {
                  filename: data.file.filename,
                  headers: data.file.headers
              }
              reply(ret);
          });
        }
        else {
          reply({ noop: true });
        }
      }
    }
  });

  // Handle build calls with no query
  server.route({
    method: 'get',
    path: '/order/',
    handler: function (request, reply) {
      return reply({
        list: '',
        error: {
          message: 'Please enter a list of integers or fractions.'
        }
      })
    }
  });

  // Handle sort calls with a query
  server.route({
    method: 'get',
    path: '/post/{q}',
    handler: function (request, reply) {
      const list = request.params.q;
      const tree = DGraph();
      const order = request.payload.order;

      try {
        tree.addValues(list);

        return reply({
          list: list,
          sorted: order === 'desc' ? tree.toStringDesc() : tree.toStringAsc(),
          tree: tree
        });
      } catch (e) {
        return reply({
          list: list,
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
