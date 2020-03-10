const { add } = require('./maths')

test('check addition', () => {
    const sum = add(1,5)
    expect(sum).toBe(5)

    // if (sum !== 5) {
    //     throw new Error('failed')
    // }
})


// test('first test', () => {
    
// })

// test('first error', () => {
//     throw new Error('error')
// })