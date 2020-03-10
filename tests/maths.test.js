const { add, fahrenheitToCelsius, celsiusToFahrenheit } = require('./maths')


test('Should convert 32 F to 0 C', () => {
    const returnVal = fahrenheitToCelsius(32)
    expect(returnVal).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    const returnVal = celsiusToFahrenheit(0)
    expect(returnVal).toBe(32)
})

test('Test Promise', (done) => {
    add(1,4).then((result) => {
        expect(result).toBe(5)
        done()
    }).catch((err) => {
        
    });
})

test('Test Async', async () => {
    const sum = await add(1,6)
    expect(sum).toBe(5)
})


// test('check addition', () => {
//     const sum = add(1,5)
//     expect(sum).toBe(5)

//     // if (sum !== 5) {
//     //     throw new Error('failed')
//     // }
// })


// test('first test', () => {
    
// })

// test('first error', () => {
//     throw new Error('error')
// })