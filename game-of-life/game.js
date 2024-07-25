
const isAlive = (cell, neighbors) => {
    return (neighbors === 3 ||(Boolean(cell) && neighbors === 2))? 1:0;
}

window.game = {
    isAlive
}

console.log('running in browser')