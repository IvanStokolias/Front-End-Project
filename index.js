var todo = {
  // INITIALIZE TO DO LIST
  data : [],        // todo list data array
  hAdd : null,      // html add item text field
  hTemplate : null, // html item row template
  hList : null,     // html to do list
  init : () => {
    // INIT LOCALSTORAGE
    if (localStorage.todo == undefined) { localStorage.todo = "[]"; }

    // RESTORE PREVIOUS SESSION
    todo.data = JSON.parse(localStorage.todo);

    // GET HTML ELEMENTS
    todo.hAdd = document.getElementById("todo-item");
    todo.hTemplate = document.getElementById("todo-template").content;
    todo.hList = document.getElementById("todo-list");

    // (A4) "ENABLE" ADD ITEM FORM
    document.getElementById("todo-add").onsubmit = todo.add;

    // (A5) DRAW TO DO LIST
    todo.draw();
  },

  // DRAW TO DO LIST
  draw : () => {
    // RESET LIST
    todo.hList.innerHTML = "";

    // (B2) LOOP & GENERATE ROWS
    if (todo.data.length>0) { for (let id in todo.data) {
      let row = todo.hTemplate.cloneNode(true),
          edit = row.querySelector(".todo-edit"),
          item = row.querySelector(".todo-item");
      item.value = todo.data[id][0];
      item.id = "item" + id;
      edit.id = "edit" + id;
      edit.onclick = () => todo.edit(id);
      row.querySelector(".todo-done").onclick = () => todo.toggle(id);
      row.querySelector(".todo-del").onclick = () => todo.del(id);
      if (todo.data[id][1]) { row.querySelector(".todo-item").classList.add("todo-ok"); }
      todo.hList.appendChild(row);
    }}
  },

  // HELPER - SAVE DATA INTO LOCAL STORAGE
  save: () => {
    localStorage.todo = JSON.stringify(todo.data);
    todo.draw();
  },

  // ADD A NEW ITEM TO THE LIST
  add : () => {
    todo.data.push([todo.hAdd.value, false]);
    todo.hAdd.value = "";
    todo.save();
    return false;
  },

  // TOGGLE EDIT ITEM
  edit : id => {
    // (E1) GET EDIT BUTTON + ITEM
    let edit = document.getElementById("edit" + id),
        item = document.getElementById("item" + id);

    // SET EDITABLE
    if (item.disabled) {
      item.classList.add("editing");
      item.disabled = false;
      item.select();
      edit.value = "\u270F";
    }

    // SAVE
    else {
      item.classList.remove("editing");
      item.disabled = true;
      edit.value = "\u270E";
      todo.data[id][0] = item.value;
      todo.save();
    }
  },

  //UPDATE TODO ITEM DONE/NOT YET
  toggle: id => {
    todo.data[id][1] = !todo.data[id][1];
    todo.save();
  },

  // DELETE ITEM
  del: id => { if (confirm("Delete task?")) {
    todo.data.splice(id, 1);
    todo.save();
  }}
};

// PAGE INIT
window.addEventListener("load", todo.init);
