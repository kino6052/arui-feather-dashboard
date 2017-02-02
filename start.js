const spawn = require('child_process').spawn;

var backend = spawn('node', ['./start-backend']);
backend.stdout.on('data', data => console.log(String(data)));
backend.stderr.on('data', data => console.error(String(data)));

var frontend = spawn('node', ['./start-frontend']);
frontend.stdout.on('data', data => console.log(String(data)));
frontend.stderr.on('data', data => console.error(String(data)));
