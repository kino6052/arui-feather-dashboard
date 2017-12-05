const { spawn } = require('child_process');

spawn('node', ['./start-backend'], { stdio: 'inherit' });
spawn('node', ['./start-frontend'], { stdio: 'inherit' });
