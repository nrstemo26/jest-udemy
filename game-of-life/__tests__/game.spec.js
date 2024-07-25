/**
 * @jest-environment jsdom
 */

require('../game');
const game = window.game;

// any cell with fewer than 2 neighbors dies
// any cell with 2 or 3 neighbors lives
// any cell with 3+ neighbors dies
// any dead cell with exactly 3 neighbors lives next round

//two parameters isAlive for current cell, alive neighbors
//so we have to make the grid at some point too
//or is it a function that returns a boolean for the next round?


describe('game of life', ()=>{
    describe('isAlive algorithm', ()=>{
        test('dead cell with no neighbors',()=>{
            expect(game.isAlive(0, 0)).toEqual(0);
        });
        test('dead cell with 3 neightbors',()=>{
            expect(game.isAlive(0, 3)).toEqual(1);
        });
        test('alive with 2 neighbors',()=>{
            expect(game.isAlive(1, 2)).toEqual(1);
        });
        test('alive with 3 neighbors',()=>{
            expect(game.isAlive(1, 3)).toEqual(1);
        });
        test('alive cell with 3+ neighbors',()=>{
            expect(game.isAlive(1, 4)).toEqual(0);
        })
    })
    
})