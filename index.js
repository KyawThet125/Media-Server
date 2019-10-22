let http = require('http');
let url = require('url');
require('dotenv').config();

let routes = {
    "GET": {
        "/": () => console.log("GET method and path is /"),
        "/home" : () => console.log("GET method and path is /home")
    },
    "POST": {
        "/": () => console.log("POST method and path is /"),
        "/about" : () => console.log("POST method and path is /about")
    },
    "Not": ()=> console.log("Not defined for that route")
    
}


let start = (req, resp) => {
    resp.writeHead(200, { 'Content-Type': 'text/html' });
    let urlobj = url.parse(req.url, true);
    let method = req.method;

    let name = urlobj.query.name;
    console.log(name);



    let resourceRoute = routes[method][urlobj.path]
    if (resourceRoute != null && resourceRoute != undefined)
        resourceRoute();
    else
        routes["Not"]()
        
}
let server = http.createServer(start);

server.listen(process.env.PORT, () => {
    console.log("Server is running at port " + process.env.PORT);
})