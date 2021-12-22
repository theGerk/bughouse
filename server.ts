import * as http from 'http';
import * as fs from 'fs';

let server = http.createServer(function (req, res) {   //create web server
    console.log(req.url);

    if (req.url == '/') { //check the URL of the current request
        
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write(`<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script> -->
            <script src="bughouse.js"></script>
          </head>
          <body> 
        
          </body>
        </html>
        `);
        res.end();
    
    }
    else if (req.url == "/bughouse.js") {
        let data = fs.readFileSync('frontend/bughouse.js');
        let fileContents = data.toString();
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(fileContents);
        res.end();

        fs.readFile('frontend/bughouse.js', null, function (err, data) {
            let fileContents = data.toString();
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(fileContents);
            res.end();
        });
    }
    else if (req.url == "/admin") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.end();
    
    }
    else
        res.end('Invalid Request!');

});

server.listen(5000); //6 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..');