export default class DoublyLinkedList {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }

  getNext() {
    return this.next;
  }

  getPrev() {
    return this.prev;
  }


  setNext(nextLink) {
    this.next = nextLink;
    nextLink.setPrev(this);
  }

  setPrev(prevLink) {
    this.prev = prevLink;
  }

}
