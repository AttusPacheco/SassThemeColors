const HTTP = require("http"),
    URL = require("url"),
    QUERY_STRING = require("querystring"),
    PATH = require("path"),
    FILE_SYSTEM = require("fs"),
    CHILD_PROCESS = require("child_process"),
    HOST = process.argv[2] || 'localhost'

HTTP.createServer((request, server) => {
    if (request.method === 'POST')
        request.on('data', chunk => {
            CHILD_PROCESS.execSync(`npm run themeColor ${Object.values(QUERY_STRING.parse(chunk.toString())).join(' ')}`)
        })

    let path = PATH.join(process.cwd(), URL.parse(request.url).pathname)

    if (!FILE_SYSTEM.existsSync(path)) {
        server.writeHead(404, {'Content-Type': 'text/plain'});
        server.write("404 not found");
        server.end()
        return;
    }

    let file = (FILE_SYSTEM.statSync(path).isDirectory()) ? `${path}/index.html` : path

    server.writeHead(200);
    server.write(FILE_SYSTEM.readFileSync(file));
    server.end();
}).listen(80, HOST)

console.log(`Server running in http://${HOST}/`)