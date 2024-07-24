const dictionary = require('../dictionary')

describe('dictionary', ()=>{
    test('should return an empty object for empty string',()=>{
        expect(dictionary('')).toEqual({});
    })
    test('should count 1 for one word', () =>{
        expect(dictionary('cheese')).toEqual({cheese: 1});
    })
    test('should count 2 for two words that are the same', ()=>{
        expect(dictionary('cheese cheese')).toEqual({cheese: 2});
    })
    test('should count 1 for two separate words',()=>{
        expect(dictionary('cheese bread')).toEqual({cheese: 1, bread: 1});
    })
})