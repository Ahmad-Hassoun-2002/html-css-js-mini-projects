// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Elzero Web School`;

// Setting Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Manage Words
let wordToGuess = "";
const words = ["Create" , "Update" , "Delete" , "Master" , "Branch" , "Mainly" , "Elzero" , "School" , "AhmadH"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

// Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint")
getHintButton.addEventListener("click" , getHint);

function generateInput(){
    const inputsContainer = document.querySelector(".inputs");
    // Create Main Try Div
    for(let i = 1 ; i <= numberOfTries ; i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>try ${i}</span>`;
        if(i !== 1) tryDiv.classList.add("disabled-inputs");
        // Create Inputs
        for(let j = 1 ; j <= numberOfLetters ; j++){
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength" , "1");
            tryDiv.appendChild(input);
        }
        // just try somethings
        if(i === numberOfTries){
            tryDiv.style.cssText = "display: none;";
        }
        inputsContainer.appendChild(tryDiv);
    }
    // Focus On First Input In First Try Element
    inputsContainer.children[0].children[1].focus();
    // Disable All Inputs Except First One
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
    inputsInDisabledDiv.forEach((input) => (input.disabled = true)); // disabled => Input Is Not Allowed

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input , index) => {
        // Convert Input To Uppercase
        input.addEventListener("input" , function(){
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if(nextInput) nextInput.focus();
        });
        input.addEventListener("keydown" , function(event){
            // console.log(event);
            const currentIndex = Array.from(inputs).indexOf(event.target); // OR this
            // console.log(currentIndex);
            if(event.key === "ArrowRight"){
                const nextInput = currentIndex + 1;
                if(nextInput < inputs.length) inputs[nextInput].focus();
            }
            if(event.key === "ArrowLeft"){
                const prevInput = currentIndex - 1;
                if(prevInput >= 0) inputs[prevInput].focus();
                event.preventDefault();
            }
        });
    })
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click" , handleGuesses);
console.log(wordToGuess);

function handleGuesses(){
    let successGuess = true;
    for(let i = 1 ; i <= numberOfLetters ; i++){
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        // console.log(letter);
        const actualLetter = wordToGuess[i - 1];
        // Game Logic
        if(actualLetter === letter){
            inputField.classList.add("in-place");
        }else if(wordToGuess.includes(letter) && letter !== ""){
            inputField.classList.add("not-in-place");
            successGuess = false;
        }else{
            inputField.classList.add("no");
            successGuess = false;
        }
    }
    // Check If User Win Or Lose
    if(successGuess){
        messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
        if(numberOfHints === 2 && currentTry === 1){
            messageArea.innerHTML = `<p>Congratulations You Didn't Use Hints</p>`
        }
        // Add Disabled Class ON All Try Divs
        let allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
        // Disable Guess Button
        guessButton.disabled = true;
        getHintButton.disabled = true;
    }else{
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input) => input.disabled = true);
        currentTry++;

        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        if(currentTry === numberOfTries){
            let DivInputs = document.querySelector(".inputs");
            let triesAll = document.querySelectorAll(".inputs > div");
            let spanDiv = document.createElement("span");
            spanDiv.textContent = "You Have A One Last Try";
            triesAll.forEach(ele => ele.style.cssText = "display: none;");
            triesAll[currentTry - 1].style.cssText = "display: block";
            DivInputs.prepend(spanDiv);
        }
        nextTryInputs.forEach((input) => input.disabled = false);

        let el = document.querySelector(`.try-${currentTry}`);
        if(el){
            el.classList.remove("disabled-inputs");
            el.children[1].focus();
        }else{
            // Disable Guess Button
            guessButton.disabled = true;
            getHintButton.disabled = true;
            messageArea.innerHTML = `
            <div class="card">
                <div class="content">
                    <div class="name">You Are Gay</div>
                    <div class="handle">Sorry</div>
                    <div class="title">
                        <span class="emoji">😊</span> Try<br/>
                        One More Time ,You Can Win
                    </div>
                </div>
                <div class="dots orange-dots"></div>
                <div class="dots pink-dots"></div>
            </div>`;
        }
    }
}

function getHint(){
    if(numberOfHints > 0){
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints;
    }
    if(numberOfHints === 0){
        getHintButton.disabled = true;
    }
    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    console.log(enabledInputs.length);
    const emptyEnableInputs = Array.from(enabledInputs).filter((input) => input.value === "");
    console.log(emptyEnableInputs.length);
    // هون رح خلي الكونسول دوت لوغ لحتى تشوف ليش ما استخدمنا الراندوم انديكس بدال ما نعمل متغير خاص بالانديكس البدنا نعبيه
    if(emptyEnableInputs.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyEnableInputs.length);
        console.log(randomIndex);
        const randomInput = emptyEnableInputs[randomIndex];
        console.log(randomInput);
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        console.log(indexToFill);
        if(indexToFill !== -1){
            randomInput.value = wordToGuess[indexToFill].toUpperCase();
        }
    }
}
function handleBackspace(event){
    if(event.key === "Backspace"){
        console.log(event);
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        const currentInput = inputs[currentIndex];
        console.log(currentIndex);
        // if(currentIndex > 0){
        //     const currentInput = inputs[currentIndex];
        //     const prevInput = inputs[currentIndex - 1];
        //     console.log(currentInput);
        //     currentInput.value = "";
        //     prevInput.focus();
        //     prevInput.value = "";
        // }
        if (currentInput && currentInput.value === "" && currentIndex > 0) {
            const prevInput = inputs[currentIndex - 1];
            prevInput.focus();
            prevInput.value = ""; // إذا بدك تمسح القيمة السابقة
            event.preventDefault(); // يمنع السلوك الافتراضي لباك سبيس (خاصة في Firefox)
        }
    }
}
document.addEventListener("keydown" , handleBackspace);

window.onload = function(){
    generateInput();
}