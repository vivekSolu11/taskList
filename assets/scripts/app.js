import { AddCard } from "./App/createList.js";
import { DragEvent } from "./App/dragEvent.js";

class App {
  constructor() {    
  }
 static main() {
    var card = new AddCard();
    card.createToDOList();
    var event = new DragEvent();
    event.dragAndDropOperation();
  }
}

App.main();


