var io = require('onoff').Gpio;
const countFile = require('./countFile')

const upPin = new io(process.env.UP_PIN)
const downPin = new io(process.env.DOWN_PIN)

const wait = (ms) => {
    return new Promise((resolve, reject) => {
        var start = Date.now(),
            now = start;
        while (now - start < ms) {
          now = Date.now();
        }
        resolve(true)
    })
}

const pinOn = (pin) => {
    pin.writeSync(1);
}

const pinOff = (pin) => {
    pin.writeSync(0);
}

const pulsePin = (pin) => {
    pinOn(upPin)
    wait(process.env.PULSE_MS)
    .then(s => pinOff()).catch(e => console.log(err))
}

module.exports = {
    increment: () => new Promise((resolve, reject) => {
        countFile.increment()
        .then(count => {
            // Update display by pulsing GPIO
            pulsePin(upPin)
        }).catch(err => reject(err))
    })
}
