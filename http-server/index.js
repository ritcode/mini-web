const http = require('http');

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);

    res.setHeader("content-type","text/html");
    res.write("Hello World!")
    res.end(`<html><body><h2>Its my first http server<h2><body><html>`)


})

server.listen(port, hostname, () => {
    console.log(`server running on http://${hostname}:${port}`)
})