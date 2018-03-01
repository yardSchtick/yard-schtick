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

describe('Counting Characters in String', () => {
    test('Correct output',() => {
        expect(fns.countTrack('Hello', 100)).toBe(95)
    })

    test("Correct output", () => {
        expect(fns.countTrack('Where are you?', 100)).toBe(86)
    })

    test("Correct output", () => {
        expect(fns.countTrack('16',100)).toBe(98)
    })

    test("Correct output", () => {
        expect(fns.countTrack(16,100)).toBe(98)
    })
    
    test("Correct output type", () => {
        expect(typeof fns.countTrack('16',100)).toBe('number')
    })

    test('Correct output type', () => {
        expect(typeof fns.countTrack(16,199)).toBe('number')
    })
})

describe('Formating Time', () => {
    test('Correct output', () => {
        expect(fns.formatTime('12:00:00', '1:00:00')).toBe('12:00 - 1:00')
    })

    test('Correct output', () => {
        expect(fns.formatTime('12:00', '1:00')).toBe('12:00 - 1:00')
    })

    test('Correct output', () => {
        expect(fns.formatTime('ABCDEFG', 'HI')).toBe('ABCDE - HI')
    })

    test('Correct output type', () => {
        expect(typeof fns.formatTime('12:00:00', '1:00:00')).toBe('string')
    })
})

describe('testing address to geo', ()=>{

    test('test for correct geo address return format', ()=>{
        var promise = fns.getAddress("515e ut");
        promise.then(result =>{
            expect(typeof result).toBe('array')
        })
    })
    test('test for geo address no input', ()=>{
        var promise = fns.getAddress("");
        promise.then(result =>{
            expect(typeof result).toBeUndefined()
        })

    })
    test('test for correct geo address vage qurry length', ()=>{
        var promise = fns.getAddress("515e ut");
        promise.then(result =>{
            expect(result.length).toBeGreaterThan(1)
        })
    })
    test('test for correct type', ()=>{
        var promise = fns.getAddress2("515 e,slc,ut");
        promise.then(result =>{
            expect(typeof result).toBe("object")
        })
    })

    test('test for correct lat', ()=>{
        var promise = fns.getAddress3("515 e,slc,ut");
        promise.then(result =>{
            expect(result).toBe(40.781287)
        })
    })
    
})