export class DragEvent {

    constructor() {
    }

    dragAndDropOperation() {

        const dragCategoryArea = document.querySelector(".swapCategory");
        new Sortable(dragCategoryArea, {
          animation: 350
        });

        const dragTaskArea = document.querySelector(".swapTask");
        new Sortable(dragTaskArea, {
          animation: 350
        });
  


    }
}