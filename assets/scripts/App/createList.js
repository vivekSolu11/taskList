export class AddCard {

    constructor() {

    };

    createToDOList() {



        console.log("start");
        var addButton = document.getElementById('addButton');
        var subTask = document.getElementById('addSubTask');
        var addInput = document.getElementById('itemInput');
        var subItemInput = document.getElementById('subItemInput');
        var todoList = document.getElementById('todoList');
        var listArray = [];
        var sublistArray = [];




        function listItemObj(content, status, sublistArray) {
            this.content = '';
            this.status = 'incomplete';
            this.sublistArray = [];
        }

        function listSubItemObj(content, status) {
            this.content = '';
            this.status = 'incomplete';
        }

        var createItemDom1 = function (text, status) {

            var listItem1 = document.createElement('li');

            var itemLabel1 = document.createElement('label');

            var itemCompBtn1 = document.createElement('button');

            var itemIncompBtn1 = document.createElement('button');

            var editSubTask = document.createElement('button');



            listItem1.className = (status == 'incomplete') ? 'completed well' : 'uncompleted well';


            itemLabel1.innerText = text;
            itemCompBtn1.className = 'btn btn-success';
            itemCompBtn1.innerText = (status == 'incomplete') ? 'In-Progress' : 'Done';
            if (status == 'incomplete') {
                itemCompBtn1.addEventListener('click', changeToComp);
            } else {
                itemCompBtn1.addEventListener('click', changeToInComp);
            }


            itemIncompBtn1.className = 'btn btn-danger';
            itemIncompBtn1.innerText = 'Delete';
            editSubTask.className = 'btn btn-primary';
            editSubTask.innerText = 'Edit';

            itemIncompBtn1.addEventListener('click', removeSubItem);
            editSubTask.addEventListener('click', editSubItem);


            listItem1.appendChild(itemLabel1);
            listItem1.appendChild(itemCompBtn1);
            listItem1.appendChild(editSubTask);
            listItem1.appendChild(itemIncompBtn1);


            return listItem1;
        }

        subTask.addEventListener('click', function () {

            var newObject = new listSubItemObj();
            newObject.content = subItemInput.value;
            if (subItemInput.value !== "") {
                for (var i = 0; i < listArray.length; i++) {

                    if (listArray[i].content == localStorage.getItem("storedId")) {
                        listArray[i].sublistArray.push(newObject);
                        console.log("found", sublistArray);
                        refreshLocal();
                        var item = createItemDom1(subItemInput.value, 'incomplete');
                        document.getElementById('subtodoList').appendChild(item);
                        subItemInput.value = '';
                    }
                }
            }
            else {
                window.alert("Field Should not be empty");
            }


        }, false)



        const selectElement = document.querySelector('.category');
        selectElement.addEventListener('change', (event) => {
            var category = event.target.value;
            var list = localStorage.getItem('todoList');

            while (todoList.firstChild) {
                todoList.removeChild(todoList.firstChild);
            }

            if (list != null) {
                var todos = JSON.parse(list);
                listArray = todos;

                for (var i = 0; i < listArray.length; i++) {
                    if (listArray[i].content === category || category === "All") {
                        var data = listArray[i].content;
                        var item = createItemDom(data, listArray[i].status);
                        todoList.appendChild(item);
                    }
                }

            }
        });

        const search = document.getElementById("search");
        search.addEventListener('click', function() {
            const searchItem = document.getElementById("searchTask");
            var category = searchItem.value;
            var list = localStorage.getItem('todoList');

            while (todoList.firstChild) {
                todoList.removeChild(todoList.firstChild);
            }

            if (list != null) {
                var todos = JSON.parse(list);
                listArray = todos;

                for (var i = 0; i < listArray.length; i++) {
                    if (listArray[i].content === category || category === "All") {
                        var data = listArray[i].content;
                        var item = createItemDom(data, listArray[i].status);
                        todoList.appendChild(item);
                    }
                }

            }
        });

        var changeToComp = function () {
            var parent = this.parentElement;
            console.log('Changed to complete');
            parent.className = 'uncompleted well';
            this.innerText = 'Done';
            this.removeEventListener('click', changeToComp);
            this.addEventListener('click', changeToInComp);
            changeListArray(parent.firstChild.innerText, 'complete');

        }

        var changeToInComp = function () {
            var parent = this.parentElement;
            console.log('Changed to incomplete');
            parent.className = 'completed well';
            this.innerText = 'In-Progress';
            this.removeEventListener('click', changeToInComp);
            this.addEventListener('click', changeToComp);

            changeListArray(parent.firstChild.innerText, 'incomplete');

        }

        var removeItem = function () {
            var parent = this.parentElement.parentElement;
            parent.removeChild(this.parentElement);

            var data = this.parentElement.firstChild.innerText;
            for (var i = 0; i < listArray.length; i++) {

                if (listArray[i].content == data) {
                    listArray.splice(i, 1);
                    refreshLocal();
                    break;
                }
            }


        }




        var removeSubItem = function () {
            var parent = this.parentElement.parentElement;
            parent.removeChild(this.parentElement);
            var category = localStorage.getItem("storedId");
            var data = this.parentElement.firstChild.innerText;
            for (var i = 0; i < listArray.length; i++) {
                if (listArray[i].content == category) {
                    for (var j = 0; j < listArray[i].sublistArray.length; j++) {
                        if (listArray[i].sublistArray[j].content == data) {
                            var newArray = listArray[i].sublistArray.splice(j, 1);
                            console.log("item", newArray);
                            refreshLocal();
                            break;
                        }
                    }
                }
            }


        }

        var editSubItem = function () {
            var name = window.prompt("enter the value");
            if (name != null) {
                var category = localStorage.getItem("storedId");
                var data = this.parentElement.firstChild.innerText;
                for (var i = 0; i < listArray.length; i++) {
                    if (listArray[i].content == category) {
                        for (var j = 0; j < listArray[i].sublistArray.length; j++) {
                            if (listArray[i].sublistArray[j].content == data) {
                                this.parentElement.firstChild.innerText = name;
                                listArray[i].sublistArray[j].content = name;
                                refreshLocal();
                                location.reload();
                                break;
                            }
                        }
                    }
                }
            }
        }




        var editItem = function () {
            var name = window.prompt("enter the value");
            if (name != null) {

                var data = this.parentElement.firstChild.innerText;
                for (var i = 0; i < listArray.length; i++) {

                    if (listArray[i].content == data) {
                        this.parentElement.firstChild.innerText = name;
                        listArray[i].content = name;
                        refreshLocal();
                        location.reload();
                        break;
                    }
                }
            }


        }

        var changeListArray = function (data, status) {

            for (var i = 0; i < listArray.length; i++) {

                if (listArray[i].content == data) {
                    listArray[i].status = status;
                    refreshLocal();
                    break;
                }
            }
        }


        var createItemDom = function (text, status) {

            var listItem = document.createElement('li');

            var itemLabel = document.createElement('label');

            var itemCompBtn = document.createElement('button');

            var itemIncompBtn = document.createElement('button');

            var editTaskName = document.createElement('button');

            listItem.className = (status == 'incomplete') ? 'completed well' : 'uncompleted well';




            itemLabel.innerText = text;
            itemCompBtn.className = 'btn btn-success';
            itemCompBtn.innerText = (status == 'incomplete') ? 'In-Progress' : 'Done';
            if (status == 'incomplete') {
                itemCompBtn.addEventListener('click', changeToComp);
            } else {
                itemCompBtn.addEventListener('click', changeToInComp);
            }


            itemIncompBtn.className = 'btn btn-danger';
            itemIncompBtn.innerText = 'Delete';
            editTaskName.className = 'btn btn-primary';
            editTaskName.innerText = 'Edit';
            itemIncompBtn.addEventListener('click', removeItem);
            editTaskName.addEventListener('click', editItem);


            listItem.addEventListener("click", function show() {
                if (sessionStorage.getItem("checkDisable") === text)
                    null;
                else {

                    sessionStorage.setItem("checkDisable", text);
                    var x = document.getElementById("subTask");
                    if (x.style.display === "none") {
                        x.style.display = "block";
                        localStorage.setItem("storedId", text);

                    }
                    else {

                        localStorage.setItem("storedId", text);
                    }

                    document.getElementById("subTaskHead").innerHTML = text + " " + "Task List";
                    var list = localStorage.getItem('todoList');
                    var element = document.getElementById('subtodoList');


                    while (element.firstChild) {
                        element.removeChild(element.firstChild);
                    }

                    if (list != null) {
                        var todos = JSON.parse(list);
                        listArray = todos;

                        for (var i = 0; i < listArray.length; i++) {
                            if (listArray[i].content == localStorage.getItem("storedId")) {
                                for (var j = 0; j < listArray[i].sublistArray.length; j++) {
                                    var data = listArray[i].sublistArray[j].content;

                                    var item = createItemDom1(data, listArray[j].status);

                                    document.getElementById('subtodoList').appendChild(item);

                                }
                            }

                        }

                    }


                }
            })

            listItem.appendChild(itemLabel);
            // listItem.appendChild(itemCompBtn);
            listItem.appendChild(itemIncompBtn);
            listItem.appendChild(editTaskName);

            return listItem;
        }

        var refreshLocal = function () {
            var todos = listArray;
            localStorage.removeItem('todoList');
            localStorage.setItem('todoList', JSON.stringify(todos));
        }

        var addToList = function () {
            var newItem = new listItemObj();
            newItem.content = addInput.value;
            if (addInput.value !== "") {
                listArray.push(newItem);

                refreshLocal();

                var item = createItemDom(addInput.value, 'incomplete');
                todoList.appendChild(item);
                addInput.value = '';
            }
            else {
                window.alert("Field Should not be empty");
            }

        }



        var clearList = function () {
            listArray = [];
            localStorage.removeItem('todoList');
            todoList.innerHTML = '';

        }

        window.onload = function () {

            sessionStorage.removeItem('checkDisable');

            var list = localStorage.getItem('todoList');

            if (list != null) {
                var todos = JSON.parse(list);
                listArray = todos;

                for (var i = 0; i < listArray.length; i++) {
                    var data = listArray[i].content;

                    var item = createItemDom(data, listArray[i].status);
                    todoList.appendChild(item);
                }

            }

        };

        addButton.addEventListener('click', addToList);
        clearButton.addEventListener('click', clearList);
    }

}