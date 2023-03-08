const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./products.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const db = require('./products.json');

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use(jsonServer.rewriter({
	'/api/products': '/products'
}));

server.get('/get/product', (request, response) => {
	if (request.method === 'GET') {
		let productId = request.body['ID'];
		if (productId != null && productId >= 0) {
			let result = db.productjsons.find(product => {
				return product.ID === productId;
			})

			if (result) {
				let { id, ...product } = result;
				response.status(200).jsonp(product);
			} else {
				response.status(400).jsonp({
					error: "Bad product ID."
				});
			}
		} else {
			response.status(400).jsonp({
				error: "Not valid product ID."
			});
		}
	}
});

server.use(router);
server.listen(port);