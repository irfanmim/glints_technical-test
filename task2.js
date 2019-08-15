const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input_task2.txt'),
});

let array = []
let names = []
let dict = {}
let count = 0;

readInterface.on('line', (input) => {
    let temp = input.split(" ");
    if (input !== "") {
        let name = temp.shift().slice(0, -1)
        names.push(name)
        array.push(temp)
    }
});


setTimeout(() => {
    let n = names.length / 2;

    let hashTableJobs = {}
    for (let i = 0; i < n; i++) {
        hashTableJobs[names[i]] = array[i]
    } 

    let hashTableCandidates = {}
    for (let i = n; i < names.length; i++) {
        hashTableCandidates[names[i]] = array[i]
    } 

    let result = {}
    for (let job in hashTableJobs) {
        let obj = {
            index: 0,
            candidate: hashTableJobs[job][0] 
        }
        result[job] = obj;
    }
    
    while (checkUniqe(result) != "true") {
        let obj = checkUniqe(result)

        let changeJob = ""
        for (let job of hashTableCandidates[obj.candidate]) {
            if (obj.jobs.includes(job)) {
                changeJob = job
            }
        }

        result[changeJob].index++;
        result[changeJob].candidate = hashTableJobs[changeJob][result[changeJob].index];
    }

    printResult(result, hashTableCandidates)
}, 1000)

function checkUniqe(arr) {
    let hash = {}
    for (let x in arr) {
        if (hash[arr[x].candidate] == undefined) {
            hash[arr[x].candidate] = x;
        } else {
            return {
                candidate: arr[x].candidate,
                jobs: [hash[arr[x].candidate], x]
            };
        }
    }
    return "true";
}

function printResult(result, hashTableCandidates) {
    let candidateHashTable = {}
    for (let job in result) {
        candidateHashTable[result[job].candidate] = job
    }

    for (let candidate in hashTableCandidates) {
        console.log(`${candidate} ${candidateHashTable[candidate]}`)
    }
}