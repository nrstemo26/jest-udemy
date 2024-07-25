/**
 * @jest-environment jsdom
 */

require('../game');
const game = window.game;
const {isAlive, 
    generate, 
    regenerate, 
    countNeighbors, 
    drawGrid, 
    attachGridEventHandler,
    getCellsFromDom,
    } = game;

jest.useFakeTimers();


describe('game of life', ()=>{
    describe('isAlive algorithm', ()=>{
        test('dead cell with no neighbors',()=>{
            expect(isAlive(0, 0)).toEqual(0);
        });
        test('dead cell with 3 neightbors',()=>{
            expect(isAlive(0, 3)).toEqual(1);
        });
        test('alive with 2 neighbors',()=>{
            expect(isAlive(1, 2)).toEqual(1);
        });
        test('alive with 3 neighbors',()=>{
            expect(isAlive(1, 3)).toEqual(1);
        });
        test('alive cell with 3+ neighbors',()=>{
            expect(isAlive(1, 4)).toEqual(0);
        })
    })

    describe('generate function',()=>{
        test('should create an array of x * x',()=>{
            expect(generate(1)).toEqual([0]);
            expect(generate(2)).toEqual([0,0,0,0]);
            expect(generate(3)).toEqual([0,0,0,0,0,0,0,0,0]);
            
        })
    })

    describe('countNeighbors',()=>{
        test('should count 0 for array of one', ()=>{
            expect(countNeighbors([1],0)).toEqual(0);
        })
        test('should cound 2 neighbors',()=>{
            expect(countNeighbors([1,1,1,0], 1)).toEqual(2);
        })
        test('should count 2 neighbors',()=>{
            expect(countNeighbors([1,1,1,0], 2)).toEqual(2);
        })
        test('should count 3 neighbors',()=>{
            expect(countNeighbors([1,1,1,0], 3)).toEqual(3);
        })
        test("should count 3 neighbours", () => {
            expect(countNeighbors([1, 1, 1, 0, 0, 0, 0, 0, 0], 4)).toEqual(3);
        });
    })

    describe('regenerate function',()=>{
        test('should not update dead cells',()=>{
            const cells = game.generate(2);
            expect(regenerate(cells)).toEqual(cells);
        })
        test('should return all dead cells',()=>{
            const cells = game.generate(2);
            const initialCells = generate(2);
            cells[0] = 1;
            expect(regenerate(cells)).toEqual(initialCells);
        })
        test('should return all alive cells',()=>{  
            const cells = [1,1,1,0];
            expect(regenerate(cells)).toEqual([1,1,1,1]);
        });
    });

    describe('browser grid',()=>{
        test('should dipslay cells',()=>{
            document.body.innerHTML = '<div id="grid"></div>';
            drawGrid([0, 0, 1, 1]);
            expect(document.querySelectorAll(".row").length).toEqual(2);
            expect(document.querySelectorAll(".cell").length).toEqual(4);
            expect(document.querySelectorAll(".dead").length).toEqual(2);
            expect(document.querySelectorAll(".live").length).toEqual(2);
            drawGrid([1, 1, 0, 0]);
            expect(document.querySelectorAll(".row").length).toEqual(2);
            expect(document.querySelectorAll(".cell").length).toEqual(4);
            expect(document.querySelectorAll(".dead").length).toEqual(2);
            expect(document.querySelectorAll(".live").length).toEqual(2);    
        })
    })

    describe('event handler for grid',()=>{
        test('click on cell should toggle live/dead',()=>{
            document.body.innerHTML = '<div id="grid"></div>';
            drawGrid([0]);
            attachGridEventHandler();
            expect(document.querySelectorAll(".dead").length).toEqual(1);
            expect(document.querySelectorAll(".live").length).toEqual(0);
            document.querySelector(".dead").click();
            expect(document.querySelectorAll(".dead").length).toEqual(0);
            expect(document.querySelectorAll(".live").length).toEqual(1);
            document.querySelector(".live").click();
            expect(document.querySelectorAll(".dead").length).toEqual(1);
            expect(document.querySelectorAll(".live").length).toEqual(0);
        })
    })

    describe('get cells from dom',()=>{
        test('should get living and dead cells from dom',()=>{
            document.body.innerHTML = '<div id="grid"></div>';
            const cells =[0,0,1,1];
            drawGrid(cells);
            expect(getCellsFromDom()).toEqual(cells);
        })
    })

    describe('start function',()=>{
        beforeAll(() => {
            jest.spyOn(global, 'setInterval');
            jest.spyOn(global, 'clearInterval');
        });
    
        afterAll(() => {
            global.setInterval.mockRestore();
            global.clearInterval.mockRestore();
        });
        
        test('should start game loop',()=>{   
            document.body.innerHTML = '<div id="grid"></div>';
            const getCellsFromDomSpy = jest.spyOn(game, "getCellsFromDom");
            const regenerateSpy = jest.spyOn(game, "regenerate");
            const drawGridSpy = jest.spyOn(game, "drawGrid");
            game.start();
            jest.runOnlyPendingTimers();
            expect(setInterval).toHaveBeenCalled();
            expect(getCellsFromDomSpy).toHaveBeenCalled();
            expect(regenerateSpy).toHaveBeenCalled();
            expect(drawGridSpy).toHaveBeenCalled()
        });
    })
    describe('stop function',()=>{  
        beforeAll(() => {
            jest.spyOn(global, 'clearInterval');
        });
    
        afterAll(() => {
            global.clearInterval.mockRestore();
        });
        test("stop should clear interval", () => {
            game.stop();
            expect(clearInterval).toHaveBeenCalled();
          });
    })
})
