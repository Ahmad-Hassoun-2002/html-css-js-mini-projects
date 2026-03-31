let matchedCount = 0;
const totalPairs = 10;
let triesElement = document.querySelector(".tries span");
let topPlayers = JSON.parse(localStorage.getItem("topPlayers")) || [];
let time = 5 * 60; // 5 دقائق × 60 ثانية = 300 ثانية

updateLeaderboard();

let timerElement = document.getElementById("timer");
// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function(){
    triesElement.innerHTML = 0;
    matchedCount = 0;
    // Prompt Window To Ask For Name
    let yourName = prompt("Whats Your Name?");
    if(yourName == (null || "")){
        document.querySelector(".name span").innerHTML = "Unknown";
    }else{
        document.querySelector(".name span").innerHTML = yourName;
    }
    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();
    let countdown = setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        // نضيف صفر قبل الرقم إذا كان أقل من 10
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerElement.textContent = `${minutes}:${seconds}`;
        time--;
        // عند الوصول إلى الصفر نوقف التايمر
        if (time < 0) {
            clearInterval(countdown);
            timerElement.textContent = "00:00";
            if(timerElement.textContent == "00:00"){
                setTimeout(()=>{
                    blocksContainer.classList.add("no-clicking");
                    document.body.innerHTML = `<div class="time-end"><h2>The Time was end </h2> <p>You Should Start Again</p></div>`;
                } , 600)
                setTimeout(()=>{
                    window.location.reload();
                } , 8000);
            }
        }
    }, 1000);
    // document.getElementById("g-music").play();
}

// Effect Duration
let duration = 600;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

console.log(orderRange);
shuffle(orderRange);
console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block , index) => {
    // كمان هيك شغال بلا التابع بس بالتابع اصح
    // let rand = Math.floor(Math.random() * blocks.length);
    // block.style.order = orderRange[rand];
    block.style.order = orderRange[index];
    // Add click Event
    block.addEventListener("click" , function(){
        // Trigger The Flip Block Function
        flipBlock(block);
        // Collect All Flipped Cards
        let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
        // If There Two Selected Blocks
        if(allFlippedBlocks.length == 2){
            // Stop Clicking Function
            stopClicking();
            // Check Matched Block Function
            checkMatchedBlocks(allFlippedBlocks[0] , allFlippedBlocks[1]);
        }
    });
});

// Stop Clicking Function
function stopClicking(){
    // Add Class No Clicking on Main Container
    blocksContainer.classList.add("no-clicking");
    setTimeout(()=>{
        // Remove Class No Clicking After The Duration
        blocksContainer.classList.remove("no-clicking");
    }, duration)
}

// Check Matched Block
function checkMatchedBlocks(firstBlock , secondBlock){
    let triesElement = document.querySelector(".tries span");
    setTimeout(()=>{
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
    }, duration);
    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        document.getElementById("success").play();
        matchedCount++;
        if(matchedCount === totalPairs){
            let totalTries = parseInt(triesElement.innerHTML);
            let playerName = document.querySelector(".name span").textContent || "Unknown";
            topPlayers.push({ name: playerName, tries: totalTries });
            topPlayers.sort((a, b) => a.tries - b.tries);
            if(topPlayers.length > 3) topPlayers = topPlayers.slice(0, 3);
            localStorage.setItem("topPlayers", JSON.stringify(topPlayers));
            updateLeaderboard();
        }
    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        document.getElementById("fail").play();
    }
}

// Flip Block Function
function flipBlock(selectedBlock){
    selectedBlock.classList.add("is-flipped");
}

// Shuffle Function
function shuffle(array){
    // Settings Vars
    let current = array.length,
    temp,
    random;
    
    while(current > 0){
        // Get Random Number
        random = Math.floor(Math.random() * current);
        current--;
        // [1] Save Current Element in Stash
        temp = array[current];
        // [2] Current Element = Random Element
        array[current] = array[random];
        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array;
}

function updateLeaderboard() {
    const [first, second, third] = topPlayers;
    document.getElementById("first-place").textContent = first?.name || "---";
    document.getElementById("first-tries").textContent = first?.tries ?? "--";
    document.getElementById("second-place").textContent = second?.name || "---";
    document.getElementById("second-tries").textContent = second?.tries ?? "--";
    document.getElementById("third-place").textContent = third?.name || "---";
    document.getElementById("third-tries").textContent = third?.tries ?? "--";
}