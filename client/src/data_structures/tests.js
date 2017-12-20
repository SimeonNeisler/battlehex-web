import DoublyLinkedList from './DLL';

var firstLink = new DoublyLinkedList(20);
var secondLink = new DoublyLinkedList(30);
var thirdLink = new DoublyLinkedList(50);
var fourthLink = new DoublyLinkedList(70);
var fifthLink = new DoublyLinkedList(100);

firstLink.setNext(secondLink);
secondLink.setNext(thirdLink);
thirdLink.setNext(fourthLink);
fourthLink.setNext(fifthLink);


var nextNode = fifthLink;
while (nextNode != null) {
  console.log(nextNode.val);
  nextNode = nextNode.getPrev();
}
