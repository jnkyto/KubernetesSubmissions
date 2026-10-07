import express from 'express';

// globals
const app = express();
const port = process.env.PORT || 3000;

// start express server listen
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

// handle signals by calling exit function
process.on("SIGINT", () => {
    gracefulExit("SIGINT");
})

process.on("SIGTERM", () => {
    gracefulExit("SIGTERM");
})

// function to exit the program cleanly. usually node handles this but doesn't work in docker containers.
const gracefulExit = (signal: string) => {
    console.log(`\n${signal} received, exiting.`);
    server.close();
}