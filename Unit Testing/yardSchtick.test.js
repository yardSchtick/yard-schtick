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

describe('Reformatting a Dates', () => {
    test('Testing to get the right output', () => {
       expect(fns.formatDate('A1-B1-C1','A2-B2-C2')).toBe('B1-C1-A1 - B2-C2-A2') 
    })

    test('Testing to get the right output', () => {
        expect(fns.formatDate('2018-03-10','2017-1-31')).toBe('03-10-2018 - 1-31-2017') 
     })
    
    test('Testing to get the right output', () => {
        expect(fns.formatDate('1991-5-10','2017-01-31')).toBe('5-10-1991 - 1-31-2017') 
     })

    test('Testing that return is string', () => {
        expect(typeof fns.formatDate('2018-03-10','2017-1-31')).toBe('string')
    })

    test('Testing to get the right output', () => {
        expect(fns.formatDate('28-03-10','201aad7-a1-1')).toBe('03-10-28 - a1-1-201aad7') 
     })

})

