const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("data"));

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });
}

addBtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
    <div class="notes">
      <div class="tools">
        <button class="edit btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>
        &nbsp;
        <button class="delete btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>
    </div>
  `;

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");

    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    textArea.value = text;
    main.innerHTML = marked(text);

    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener("click", () => {
        note.remove();

        updateLocalStorage();
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);

        updateLocalStorage();
    });

    document.body.appendChild(note);
    const parentDiv = document.querySelector('.parent')

   parentDiv.appendChild(note)
   
}

const updateLocalStorage = () => {
    const notesTxt = document.querySelectorAll("textarea");
    const notes = [];

    notesTxt.forEach((note) => {
        notes.push(note.value);
    });
    localStorage.setItem("data", JSON.stringify(notes));

}