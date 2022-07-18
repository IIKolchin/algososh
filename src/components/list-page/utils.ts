export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  prepend: (element: T) => void;
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  deleteAt: (index: number | string) => void;
  deleteTail: () => Node<T> | null;
  deleteHead: () => Node<T> | null;
  toArray: () => Node<T>[];
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  prepend(element: T) {
    const newNode = new Node(element, this.head);

    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex < index - 1 && curr) {
          currIndex++;
          curr = curr.next as Node<T> | null;
        }
        node.next = curr!.next;
        curr!.next = node;
      }

      this.size++;
    }
  }

  deleteAt(index: number | string) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      if (index === 0) {
        this.head = this.head!.next;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let pre = null;
        while (currIndex < index) {
          pre = curr;
          curr = curr!.next;
          currIndex++;
        }

        pre!.next = curr!.next;
        if (curr === this.tail) {
          this.tail = null;
        }
        curr = null;
      }
      this.size--;
    }
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
