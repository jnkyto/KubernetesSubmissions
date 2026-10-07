// globals
let timeoutID: NodeJS.Timeout | null = null;
let shouldExit = false;

// custom 16 char string generator
const generateRandomString = () => {
    const chars = "0123456789ABCDEF";
    const randomString = Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return(randomString);
}

// function to exit the program cleanly. usually node handles this but doesn't work in docker containers.
const gracefulExit = (signal: string) => {
    console.log(`\n${signal} received, exiting.`);
    shouldExit = true;

    if (timeoutID) {
        clearTimeout(timeoutID);
    }
}

// handle signals by calling exit function
process.on("SIGINT", () => {
    gracefulExit("SIGINT");
})

process.on("SIGTERM", () => {
    gracefulExit("SIGTERM");
})

// main function, get new string after 5s timeout and store to array
const main = async () => {
    let hist: String[] = [];

    while (!shouldExit) {
        const randomString = generateRandomString();
        hist.push(randomString);
        console.log(`${new Date().toISOString()}: ${randomString}`);
        await new Promise(r => {
            timeoutID = setTimeout(r, 5000)
        });
    }
}

main().then(r => null);