let input = document.getElementById("input-box");
let button = document.getElementById("butt");
let ul = document.getElementById("list-container");

function App(){
    button.onclick = () => {
        if(input.value != ""){
            let ele = document.createElement("li");
            let eleText = document.createTextNode(input.value);
            let span = document.createElement("span");
            ele.appendChild(eleText);
            span.innerHTML = "\u00d7";
            ele.appendChild(span);
            ul.appendChild(ele);
            saveData();
        }
        input.value = "";
        saveData();
    }
}

App();

ul.addEventListener("click" , e => {
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
        saveData()
    }else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
},false)

function saveData(){
    localStorage.setItem("Data", ul.innerHTML);
}

function showTask(){
    ul.innerHTML = localStorage.getItem("Data");
}

showTask();