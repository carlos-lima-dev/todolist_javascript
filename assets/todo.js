class ToDo {
  constructor() {
    this.list = [];
  }

  addToDo(item) {
    this.list.push({name: item, completed: false});
    this.saveToLocalStorage();
    this.render();
  }

  toggleComplete(index) {
    if (index >= 0 && index < this.list.length) {
      this.list[index].completed = !this.list[index].completed;
    }
    this.saveToLocalStorage();
    this.render();
  }

  editItem(index, newName) {
    if (index >= 0 && index < this.list.length) {
      this.list[index].name = newName;
    }
    this.saveToLocalStorage();
    this.render();
  }

  removeItem(index) {
    if (index >= 0 && index < this.list.length) {
      this.list.splice(index, 1);
    }
    this.saveToLocalStorage();
    this.render();
  }

  clearCompleted() {
    this.list = this.list.filter((item) => !item.completed);
    this.saveToLocalStorage();
    this.render();
  }

  saveToLocalStorage() {
    localStorage.setItem("toDoList", JSON.stringify(this.list));
  }

  loadFromLocalStorage() {
    const storedList = localStorage.getItem("toDoList");
    if (storedList) {
      this.list = JSON.parse(storedList);
      this.render();
    }
  }

  startEdit(index) {
    const newName = prompt("Edit your item:", this.list[index].name);
    if (newName !== null && newName !== "") {
      this.editItem(index, newName);
    }
  }

  render() {
    const toDoList = document.getElementById("todolist");
    const clearBtn = document.getElementById("clearbtn");
    if (this.list.length === 0) {
      toDoList.innerHTML = "<p>To do list is empty!</p>";
      clearBtn.classList.add("display");
      return;
    }
    toDoList.innerHTML = "";

    this.list.forEach((item, index) => {
      const toDoItem = document.createElement("li");
      clearBtn.classList.remove("display");
      toDoItem.className = item.completed ? "completed" : "";
      toDoItem.innerHTML = `
                <input type="checkbox" ${
                  item.completed ? "checked" : ""
                } onclick="toDo.toggleComplete(${index})">
                <span onclick="toDo.startEdit(${index})">${item.name}</span>
                <button class="removebtn" onclick="toDo.removeItem(${index})">Remove</button>
            `;
      toDoList.appendChild(toDoItem);
    });
  }
}

const toDo = new ToDo();

function addItem() {
  const itemInput = document.getElementById("item-input");
  const item = itemInput.value;
  if (item) {
    toDo.addToDo(item);
    itemInput.value = "";
  } else {
    alert("Please enter a to-do item.");
  }
}

function clearCompleted() {
  toDo.clearCompleted();
}

document.addEventListener("DOMContentLoaded", function () {
  const displayYear = document.getElementById("year");
  const year = new Date().getFullYear();
  displayYear.textContent = year;
  toDo.loadFromLocalStorage();
});
