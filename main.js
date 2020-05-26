const pattern = '^((ab)*)+$';
const answer = 'abababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababab a';
let received = null;
const result = document.querySelector('.result');

if (window.Worker) {
    
    //Initialising worker
	const myWorker = new Worker("worker.js");
	myWorker.postMessage([pattern, answer]);//Posting to worker
	console.log('Message posted to worker');
	
	//Setting TimeOut
	const timeoutInMs = 3000;
    let timeout = setTimeout(() => {
    console.log("setTimeout starts , received = "+received);
    if (!received) {
        console.log('worker is still running!');
        myWorker.terminate(); 
        result.textContent = 'Evil regex detected!';
        console.log("worker terminated!");
      }
    }, timeoutInMs);

    //Detecting message from worker
	myWorker.onmessage = function(e) {
		result.textContent = e.data;
        clearTimeout(timeout);
		received = e.data;
        myWorker.terminate();
		console.log('Message received from worker , received = '+received);
	}
	
} else {
	console.log('Your browser doesn\'t support web workers.')
}
