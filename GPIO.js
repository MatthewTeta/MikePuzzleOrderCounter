var io = require('onoff').Gpio;
const countFile = require('./countFile')

const upPin = new io(process.env.UP_PIN, 'out', { activeLow: true })
const downPin = new io(process.env.DOWN_PIN, 'out', { activeLow: true })

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
    pin.writeSync(1)
}

const pinOff = (pin) => {
    pin.writeSync(0)
}

const pulsePin = (pin) => new Promise((resolve, reject) => {
    pinOn(pin)
    wait(process.env.PULSE_MS)
    .then(success => {
        pinOff(pin)
        resolve(success)
    }).catch(err => reject(err))
})

const pulsePinNTimes = (pin, N) => {
    var promise = Promise.resolve()
    while (N-- > 0) promise = promise.then(() => pulsePin(pin));
    return promise;
}

module.exports = {
    init: () => {
        // upPin.setActiveLow(true)
        // downPin.setActiveLow(true)
        pinOff(upPin)
        pinOff(downPin)
    },

    increment: () => new Promise((resolve, reject) => {
        countFile.increment()
        .then(count => {
            // Update display by pulsing GPIO
            pulsePin(upPin)
            resolve(true)
        }).catch(err => reject(err))
    }),
    
    decrement: () => new Promise((resolve, reject) => {
        countFile.decrement()
        .then(count => {
            // Update display by pulsing GPIO
            pulsePin(downPin)
            resolve(true)
        }).catch(err => reject(err))
    }),
    
    set: (count) => new Promise((resolve, reject) => {
        countFile.read()
        .then(oldCount => {
            countFile.set(count)
            .then(count => {
                // Update display by pulsing GPIO
                let countDiff = count - oldCount
                if (countDiff > 0) {
                    // inc countDiff times
                    pulsePinNTimes(upPin, countDiff)
                    .then(success => resolve(success))
                    .catch(err => reject(err))
                } else {
                    // dec countDiff times
                    pulsePinNTimes(downPin, countDiff)
                    .then(success => resolve(success))
                    .catch(err => reject(err))
                }
                resolve(true)
            }).catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
}
