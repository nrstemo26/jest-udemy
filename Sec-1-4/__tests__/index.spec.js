//different set up without changing jest environment to access window object
const {example} = require('../index.js');
const index = example.index;

//JEST hooks
beforeAll(()=>{
    console.log("beforeAll tests");
    console.log("setup code"); 
});

afterAll(()=>{
    console.log("afterAll tests");
    console.log("teardown code");
});

beforeEach(()=>{
    console.log("beforeEach test");
    console.log("reset code");
})


describe('name module',()=>{
    test('if hello function returns hello name',()=>{
        const name = 'nate';
        const expected = example.hello(name);
        expect(expected).toEqual(`Hello nate`);
    })
})

describe('our example module',()=>{
    test('example',()=>{
        expect(index).toBeDefined();
    })
    //we can use it in place of test... they do the same thing
    it('should be an object',()=>{
        expect(typeof example).toEqual("object");
    });
})