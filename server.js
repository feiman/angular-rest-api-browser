var http = require('http'),
	httpProxy = require('http-proxy'),
	buffet = require('buffet'),
	bower_root = buffet({root: './bower_components'}),
	app_root = buffet({root: './app'}),
	proxy = httpProxy.createProxyServer();

var proxy_url = process.argv[2];

var urlPattern = new RegExp(/(^|\s)((https?:\/\/)?([\w-]+(\.[\w-]+)+\.?(:\d+)?)(\/\S*)?)/g),
	proxy_opts = urlPattern.exec(proxy_url),
	proxy_protocol = proxy_opts[3],
	proxy_domain_port = proxy_opts[4],
	proxy_domain = proxy_domain_port.split(':')[0],
	proxy_path = proxy_opts[7];

http.createServer(function (req, res) {
	if (req.url.indexOf(proxy_path) === 0) {
		req.headers.host = proxy_domain;
	    proxy.web(req, res, {
			target: proxy_protocol + proxy_domain_port,
			changeOrigin: true
	    });
	}
	// TODO: clean this up?
	else if (req.url.indexOf("/bower_components") === 0) {
		req.url = req.url.split("/bower_components")[1];
		bower_root(req, res);
	}
	else {
	    app_root(req, res);
	}
}).listen(8000);
