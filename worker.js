onmessage = function(e) {
    console.log('Worker: Message received from main script');
    let pattern = new RegExp(e.data[0]);
    console.log("pattern = "+pattern);
    let result = pattern.test(e.data[1]);//Regex evaluation
    let workerResult = 'Result: ' + result;
    console.log("RESULT = "+result);
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);//Posting back to main.js
}
