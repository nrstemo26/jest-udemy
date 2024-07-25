
const isAlive = (cell, neighbors) => {
    return (neighbors === 3 ||(Boolean(cell) && neighbors === 2))? 1:0;
}

const generate = (root) => new Array(root*root).fill(0);


const add = (...args) => args.reduce((accumulator, current) => accumulator + (current || 0), 0);

const leftColumnValues = (index,width,cells)=>{
   return index % width 
    ? [cells[index-1], cells[index-width-1], cells[index+width-1]]
    :[];
}
const rightColumnValues = (index,width,cells)=>{
    return (index + 1) % width
    ? [cells[index+1], cells[index-width+1], cells[index+width+1]]
    :[];
}

const countNeighbors = (cells, index) => {
    const width = Math.sqrt(cells.length);
    return add(
        cells[index+width],
        cells[index-width],
        ...leftColumnValues(index,width,cells),
        ...rightColumnValues(index,width,cells)
    );   
}

const regenerate = (cells) => {
    return cells.map((cell,index) => isAlive(cell, countNeighbors(cells,index)))
}

const createElement = className => {
    const element = document.createElement("div");
    element.className = className;
    return element;
};

const drawGrid = cells => {
    width = Math.sqrt(cells.length);
    const grid = document.getElementById('grid');
    const container = createElement('container');
    let row;
    cells.forEach((cell, index) => {
        if (index % width === 0) {
          row = createElement("row");
          container.appendChild(row);
        }
        const cellEl = createElement(`cell ${cell === 0 ? "dead" : "live"}`);
        row.appendChild(cellEl);
      });
      grid.innerHTML = "";
      grid.appendChild(container);
}

const attachGridEventHandler = () => {
    document.getElementById("grid").addEventListener("click", event => {
      const className = event.target.className;
      event.target.className = className.includes("dead")
        ? className.replace("dead", "live")
        : className.replace("live", "dead");
    });
};

const getCellsFromDom = () =>{
    return Array.from(document.querySelectorAll('.cell')).map(cell => cell.className.includes('live')? 1:0);
}

let gameLoop;

const start = () =>{
    let generation = game.getCellsFromDom();
    gameLoop = setInterval(()=>{
        generation = game.regenerate(generation);
        game.drawGrid(generation);
    }, 1000);
}

const stop = ()=>{
    clearInterval(gameLoop);

}

window.game = {
    isAlive,
    generate,
    regenerate,
    countNeighbors,
    drawGrid,
    attachGridEventHandler,
    getCellsFromDom,
    start,
    stop,
}

console.log('running in browser')