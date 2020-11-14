const fs = require('fs');
const lame = require('lame');
const Speaker = require('speaker');

let playSound = (file) => {
    fs.createReadStream(file)
      .pipe(new lame.Decoder())
      .on('format', function (format) {
        this.pipe(new Speaker(format));
      });
}

module.exports = {
    ding: () => new Promise((resolve, reject) => {
        playSound(process.env.SOUND_DIR + process.env.DING_FILE)
    })
}
