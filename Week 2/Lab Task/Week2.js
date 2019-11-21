
class Queue {

    constructor() {
        this.q = [];
    }
	// get the current number of elements in the queue
	//Getter function
    get length() {
        return this.q.length
    };
	//Get all the elements
    get queue() {
        return this.q;
    }
    // Boolean function: returns true if the queue is empty, false otherwise
    isEmpty() {
        return 0 == this.q.length;
    };
	//adds new element to the end of the quue
    enqueue(newItem) {
        this.q.push(newItem)
    };

	//Boolean function: returns true if an item is found (first occurnace); false 		otherwise
    inQueue(item) {
        let i = 0;
        let isFound = false;
        while (i < this.q.length && !isFound) {
            if (this.q[i] === item) {
                isFound = true;
            } else
                i++;
        }
        return (isFound);
    }
	// pop an item from the queue
    dequeue() {
        if (0 != this.q.length) {
            let c = this.q[0];
            this.q.splice(0, 1);
            return c
        }
    };

	//remove all the elements of the queue
	empty() {
		this.q = []
	}

	//add a set of items to the queue
	addAll(setOfItems) {
		let setLength = setOfItems.length
		let counter = 0

		while (counter != setLength)
		{
			this.q.push(setOfItems[counter])
			counter++;
		}
	}

	//function for removing N elements from the queue
	dequeueN(N) {

		// if the lenght of the queue is lesser than N, then just exit the function
		if (N > this.q.length)
		{

			return "No enough items in the queue to be removed !";

		}

		else if (N == 0)
		{
			return "";
		}

	    // else remove N items from the queue
		else
		{
			let result = []
			let counter = 0;
			while (counter != N)
			{
				let c = this.q[0];
            	this.q.splice(0, 1);
				result.push(c);
				counter ++;
			}

			return result;
		}

	}

	//function for displaying the content of the queue with their respective indexes
	contentWithIndex() {

		let counter = 0;

		while (counter != queue.length)
		{
			counter++;
			console.log(counter + "->" + this.queue[counter-1])
		}
	}

};
let queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.length);
console.log(queue.q);
queue.dequeue();
queue.enqueue(33);
console.log(queue.q);
console.log(queue.inQueue(33));
console.log(queue.inQueue(88));

//First task
queue.empty();
console.log(queue.length)

//Second task
queue.addAll([3,7,1,9]);
console.log(queue.q)

//Third task
console.log(queue.dequeueN(0));

//Fourth task
queue.contentWithIndex();
