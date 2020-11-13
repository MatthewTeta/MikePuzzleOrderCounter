const fs = require("fs")

module.exports = {
    read: () => new Promise((resolve, reject) => {
        // Open count file for writing
        fs.readFile(process.env.COUNT_FILE, (err, buf) => {
            if (err) return reject(err)
            // Read count and convert to int
            resolve(parseInt(buf.toString()));
        });
    }),

    increment: () => new Promise((resolve, reject) => {
        // Open count file for writing
        fs.readFile(process.env.COUNT_FILE, (err, buf) => {
            if (err) return reject(err)
            // Read count and convert to int
            // Increment count
            var count = parseInt(buf.toString()) + 1;
            fs.writeFile(process.env.COUNT_FILE, count, err => {
                if (err) return reject(err)
                return resolve(count)
            })
        });
    }),

    decrement: () => new Promise((resolve, reject) => {
        // Open count file for writing
        fs.readFile(process.env.COUNT_FILE, (err, buf) => {
            if (err) return reject(err)
            // Read count and convert to int
            // Decrement count
            var count = Math.max(0, parseInt(buf.toString()) - 1);
            fs.writeFile(process.env.COUNT_FILE, count, err => {
                if (err) return reject(err)
                return resolve(count)
            })
        });
    }),
    
    set: (count) => {
        // Write count to file
        fs.writeFile(process.env.COUNT_FILE, count, err => {
            if (err) return reject(err)
            return resolve(count)
        })
    }
}
