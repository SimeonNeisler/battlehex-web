export default class SinglyLinkedList {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
  }

  getNext() {
    return this.next;
  }



  setNext(nextLink) {
    this.next = nextLink;
  }


}
