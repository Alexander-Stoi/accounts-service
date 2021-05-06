const fs = require(`fs`);

const writeData = (path, data) => {
    fs.writeFileSync(path, data, err => {
        if (err) {
            console.log(`Failed to write the data to DB err:`, err);
        }
    });
};

const readData = (path) => {
    fs.readFileSync(path, { encoding: `utf-8` })
}

const textService = {
    writeData,
    readData
}

module.exports = textService;