const elForm = document.querySelector(".form");
const elInput = document.querySelector(".title");
const elTextArea = document.querySelector(".text");
const elNotes = document.querySelector(".notes");


let localData = JSON.parse(window.localStorage.getItem("notes"));
let notes = localData || [];

elForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    const  title = elInput.value;
    const  text = elTextArea.value;

    const note = {
        id: notes[notes.length - 1]?.id + 1 || 0,
        title: title,
        text: text,
        // day: (new Date()).getFullYear(),
        hour:(new Date()).getHours(),
        minut: (new Date()).getMinutes(),
        second: (new Date()).getSeconds()
    }

    elInput.value = null;
    elTextArea.value = null;
    notes.push(note);

    renderNotes(notes);
    window.localStorage.setItem("notes", JSON.stringify(notes));
   

    if(notes.length == 0){
        window.localStorage.removeItem("notes");
    }

});

renderNotes(notes);


function renderNotes(arr){
    elNotes.innerHTML = null;
    for(let note of arr){
        const newItem = document.createElement("li");
        const newTitle = document.createElement("p");
        const newText = document.createElement("p");
        const newTime = document.createElement("p");
        const newDeleteBtn = document.createElement("button");


        newDeleteBtn.dataset.NoteId = note.id;


        newItem.style.margin = "10px";
        newItem.style.padding = "10px";
        newItem.classList.add("card");
        newTitle.setAttribute("class", "text-decoration-underline border border-primary rounded px-3");
        newTime.setAttribute("class", " px-3");
        newText.setAttribute("class", " px-3");
        newDeleteBtn.setAttribute("class", "btn btn-danger rounded bg-gradient delBtn")


        newTitle.textContent = note.title;
        newText.textContent = note.text;
        newTime.textContent = `Added on ${note.hour}:${note.minut}:${note.second}`
        newDeleteBtn.textContent = "delete"


        elNotes.appendChild(newItem)
        newItem.appendChild(newTitle)
        newItem.appendChild(newText)
        newItem.appendChild(newTime)
        newItem.appendChild(newDeleteBtn);

        window.localStorage.setItem("notes", JSON.stringify(notes));
    }
}

elNotes.addEventListener("click", function(e){
    const deleteId =  Number(e.target.dataset.NoteId);
    const index = notes.findIndex(e => e.id === deleteId);

    if(e.target.matches(".delBtn")){
        notes.splice(index , 1);
        window.localStorage.removeItem("notes");
        renderNotes(notes);
    }
   
    console.log(deleteId);
    
})
