import Node from "./Node";

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    if (!this.head) return null;
    let dequeueValue = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    return dequeueValue;
  }
}

export default Queue;
