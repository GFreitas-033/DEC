const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/login',
    createProxyMiddleware({
      target: 'http://localhost:5000/login',
      changeOrigin: true,
    })
  );
  app.use(
    '/sair',
    createProxyMiddleware({
      target: 'http://localhost:5000/sair',
      changeOrigin: true,
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000/api',
      changeOrigin: true,
    })
  );
  app.use(
    '/minhasturmas',
    createProxyMiddleware({
      target: 'http://localhost:5000/calendario',
      changeOrigin: true,
    })
  );
  app.use(
    '/admbackend',
    createProxyMiddleware({
      target: 'http://localhost:5000/adm',
      changeOrigin: true,
    })
  );
  app.use(
    '/listaralunos',
    createProxyMiddleware({
      target: 'http://localhost:5000/listaralunos',
      changeOrigin: true,
    })
  );
  app.use(
    '/listartodosalunos',
    createProxyMiddleware({
      target: 'http://localhost:5000/listartodosalunos',
      changeOrigin: true,
    })
  );
};