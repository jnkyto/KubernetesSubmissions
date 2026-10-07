const CHARS = "0123456789ABCDEF";

const generateRandomString = () => {
    const randomString = Array.from({ length: 16 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
    return(`${new Date().toISOString()}: ${randomString}`);
}

let hist: String[] = [];

while (true) {
    const randomString = generateRandomString();
    hist.push(randomString);
    console.log(randomString);
    await new Promise(r => setTimeout(r, 5000));
}