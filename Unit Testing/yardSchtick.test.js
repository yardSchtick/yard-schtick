const fns = require('./functions');

describe('Testing sales coming back', () => {

    test('checking data type to be an array', async () => {
        let data = await fns.getAllSales();
        expect(Array.isArray(data)).toBeTruthy();
    })

    test('Array is not empty', () => {
        return fns.getAllSales().then(res => {
            expect(res.length).toBeGreaterThan(0);
        })
    })
    test('Longitude is a key in object in array', () => {
        const data = fns.getAllSales();
        expect(data[0].longitude).toBeTruthy();
    })
})