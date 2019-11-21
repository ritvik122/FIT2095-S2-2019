let http = require('http');
var fs = require('fs');
let urlParse = require('url');
const {
    parse
} = require('querystring');

http.createServer(function (request, response) {

    const {method, url} = request; // get the URL and method from the request

    var filePath = './index.html';

    let q = urlParse.parse(url, true).query; // lets parse the query part of the URL
    let pathName = urlParse.parse(url, true).pathname; // Now we need to get the path name. i.e. /addition or /subtraction ...
    console.log(q.username, q.password);

    if (pathName === '/') // if homepage: http://localhost:8080
    {
        fs.readFile(filePath, function (error, content) { // send the home page back to the user
            // use the fs package to read the file index.html from the local drive
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.end(content, 'utf-8');
        });
    }

    else if (pathName === "/check"){
        
        console.log('We got post');
        
        if (request.method === 'POST') {
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                let items = parse(body);
                
                console.log(items.password, items.username);

                if (items.username === 'admin' && items.password === 'pass'){



                let filePath = './mainpage.html';
                fs.readFile(filePath, function (error, content) { // send the home page back to the user
                // use the fs package to read the file index.html from the local drive
                response.writeHead(200, {
                'Content-Type': 'text/html'
                }); // response.writeHead() is used to write the header of the response
                response.end(content, 'utf-8');
                })}

                else 
                
                {
                    

                    let filePath = './accessdenied.html';
                    fs.readFile(filePath, function (error, content) { // send the home page back to the user
                    // use the fs package to read the file index.html from the local drive
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    }); // response.writeHead() is used to write the header of the response
                    response.end(content, 'utf-8');
                        })}

            })
    }}

}).listen(8080);