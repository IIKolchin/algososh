export interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    getHead: () => T | null;
    getTail: () => T | null;
    getLength: () => number;
    getHeadIndex: () => number;
    getTailIndex: () => number;
    clear: () => void;
  }
  
  export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;
  
    constructor(size: number) {
      this.size = size;
      this.container = Array(size);
    }
  
    enqueue = (item: T) => {
      if (this.length >= this.size) {
        throw new Error('Maximum length exceeded');
      }
  
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    };
  
    dequeue = () => {
      if (this.isEmpty()) {
        throw new Error('No elements in the queue');
      }
  
      delete this.container[this.head % this.size];
      this.head++;
      this.length--;
    };
  
    peak = (): T | null => {
      if (this.isEmpty()) {
        throw new Error('No elements in the queue');
      }
      return this.container[this.head % this.size];
    };
  
    isEmpty = () => this.length === 0;
  
    getHead = (): T | null => this.container[this.head];
  
    getTail = (): T | null => this.container[this.tail - 1];
  
    getLength = (): number => this.tail;
  
    getHeadIndex = () => this.head;
  
    getTailIndex = () => this.tail - 1;
  
    clear = () => {
      this.length = 0;
      this.head = 0;
      this.tail = 0;
      this.container = Array(this.size);
    };
  }
  