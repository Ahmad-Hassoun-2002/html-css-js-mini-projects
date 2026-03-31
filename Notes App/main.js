const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage(){
    localStorage.setItem("notes" , notesContainer.innerHTML);
}

createBtn.addEventListener("click" , () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable" , "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
})

notesContainer.addEventListener("click" , (e) => {
    if(e.target.tagName === "IMG"){
        // لك والله هي مهمة مارقة معي بس نسيانا ... هيك بتمسح عنصر بطريقة انك تقلو اذا كان العنصر العم نضغط عليه
        // هوي صورة (قصدو الصورة تبعيت الحذف) احذف العنصر كامل
        e.target.parentElement.remove();
        updateStorage();
    }else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(ele => {
            // onkeyup => هوي وقت بتشيل اصبعك عن الفقسة (اي حرف)
            ele.onkeyup = function(){
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown" , event => {
    if(event.key === "Enter"){
        // execCommand => هي بتخلينا نطبق شيء معين على فقسة او حرف او عنصر معين متل هلق حاليا قلنالو وقت المستخدم بيضغط 
        // اينتر معناها نزول سطر و هيك
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})