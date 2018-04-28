/* eslint no-console: [1, { allow: ["log", "error"] }] */
import server from './server';

let currentServer = server;

async function startServer() {
    try {
        await currentServer.start();
    } catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
}

startServer();

if (module.hot) {
    module.hot.accept(['./server'], async () => {
        try {
            await currentServer.stop();

            currentServer = server;
            await startServer();
        } catch (error) {
            console.log('Failed to update server. You probably need to restart application', error);
        }
    });
}
