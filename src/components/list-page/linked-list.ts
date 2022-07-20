export class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
    constructor(value: T, next?: LinkedListNode<T> | null) {
      this.value = value;
      this.next = next === undefined ? null : next;
    }
  }
  
  export interface ILinkedList<T> {
    prepend: (element: T) => void;
    append: (element: T) => void;
    getNodeByIndex: (index: number) => T | null;
    addByIndex: (element: T, index: number) => void;
    deleteByIndex: (index: number) => T | null;
    deleteTail: () => LinkedListNode<T> | null;
    deleteHead: () => LinkedListNode<T> | null;
    toArray: () => LinkedListNode<T>[];
    getSize: () => number;
    print: () => void;
  }
  
  export class LinkedList<T> implements ILinkedList<T> {
    private head: LinkedListNode<T> | null;
    private tail: LinkedListNode<T> | null;
    private size: number;
    constructor(initialState?: T[]) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      initialState?.forEach((el) => this.addByIndex(el, 0));
    }
  
    prepend(element: T) {
      const newNode = new LinkedListNode(element, this.head);
  
      this.head = newNode;
      if (!this.tail) {
        this.tail = newNode;
      }
      this.size++;
    }
  
    append(element: T) {
      let node = new LinkedListNode(element);
  
      if (this.size === 0) {
        this.head = node;
      } else {
        let current = this.head;
  
        while (current && current.next !== null) {
          current = current.next;
        }
  
        if (current) current.next = new LinkedListNode(element);
      }
  
      this.size++;
    }
  
    addByIndex(element: T, index: number) {
      if (index < 0 || index > this.size) {
        console.log('Enter a valid index');
        return;
      } else {
        const node = new LinkedListNode(element);
  
        if (index === 0) {
          node.next = this.head;
          this.head = node;
        } else {
          let curr = this.head;
          let currIndex = 0;
          let prev = null;
  
          while (currIndex < index && curr) {
            prev = curr;
            curr = curr.next;
            currIndex++;
          }
  
          if (prev) prev.next = node;
          node.next = curr;
        }
  
        this.size++;
      }
    }
  
    deleteByIndex(index: number) {
      if (index < 0 || index > this.size) {
        return null;
      }
  
      let curr = this.head;
  
      if (index === 0 && curr) {
        this.head = curr.next;
      } else {
        let prev = null;
        let currIndex = 0;
  
        while (currIndex < index && curr) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }
  
        if (prev && curr) prev.next = curr.next;
      }
  
      this.size--;
      return curr ? curr.value : null;
    }
  
    deleteTail() {
      if (!this.tail) {
        return null;
      }
      const deletedTail = this.tail;
  
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
  
        return deletedTail;
      }
  
      let currentNode = this.head;
      while (currentNode!.next) {
        if (!currentNode!.next.next) {
          currentNode!.next = null;
        } else {
          currentNode = currentNode!.next;
        }
      }
  
      this.tail = currentNode;
  
      return deletedTail;
    }
  
    deleteHead() {
      if (!this.head) {
        return null;
      }
      const deletedHead = this.head;
  
      if (this.head.next) {
        this.head = this.head.next;
      } else {
        this.head = null;
        this.tail = null;
      }
  
      return deletedHead;
    }
  
    toArray() {
      const nodes = [];
      let currentNode = this.head;
  
      while (currentNode) {
        nodes.push(currentNode);
        currentNode = currentNode.next;
      }
  
      return nodes;
    }
  
    getSize() {
      return this.size;
    }
  
    getNodeByIndex(index: number) {
      if (index < 0 || index > this.size) {
        return null;
      }
  
      let curr = this.head;
      let currIndex = 0;
  
      while (currIndex < index && curr) {
        curr = curr.next;
        currIndex++;
      }
  
      return curr ? curr.value : null;
    }
  
    print() {
      let curr = this.head;
      let res = '';
      while (curr) {
        res += `${curr.value} `;
        curr = curr.next;
      }
      console.log(res);
    }
  }
  