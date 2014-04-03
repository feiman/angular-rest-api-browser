var http = require('http'),
	httpProxy = require('http-proxy'),
	static = require('node-static');
	bower_root = new static.Server('./bower_components'),
	app_root = new static.Server('./app'),
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
		bower_root.serve(req, res);
	}
	else {
	    app_root.serve(req, res);
	}
}).listen(8000);
