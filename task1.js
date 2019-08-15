const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input_task1.txt'),
});

let array = []
let dict = {}
let count = 0;

readInterface.on('line', (input) => {
    let temp = []
    for (let symbol of input) {
        temp.push(symbol === '+' ? 1 : 0);
    }
    array.push(temp);
});


setTimeout(() => {
    for (let x in array) {
        for (let y in array[x]) {
            let key = `${x} ${y}`;
            if (dict[key] === 1) {
                continue;
            }

            if (array[x][y] === 0) {
                continue;
            } else {
                bfs(x,y);
                count++;
            }
            
            dict[key] = 1;
        }
    }

    console.log(count)
}, 1000)



function bfs(x,y) {
    x = parseInt(x)
    y = parseInt(y)
    let queue = [[x,y]];
    while (queue.length !== 0) {
        let point = queue.shift();
        for (let i=-1; i<=1; i++) {
            for (let j=-1; j<=1; j++) {
                let key = `${point[0]+i} ${point[1]+j}`;
                if (i === 0 && j === 0) {
                    continue;
                }

                if (point[0]+i>=0 && point[0]+i<array.length && point[1]+j>=0  && point[1]+j<array[0].length && dict[key] !== 1) {
                    if (array[point[0]+i][point[1]+j] === 1) {
                        queue.push([point[0]+i,point[1]+j])
                    }
                }

                dict[key] = 1;
            }
        }
    }
}