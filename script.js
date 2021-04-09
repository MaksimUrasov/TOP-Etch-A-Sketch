const mainDivNode = document.querySelector("#main");
const divNode = document.createElement("div");
const inputNode = document.querySelector("input");
let inputColor = "black";
inputNode.addEventListener("input", updateColor, false);  //color picker 

function updateColor(event) {
    inputColor = event.target.value;
}


// operations with cells:

let allNewDivNodes = 0;

function addDivs(sideLength) {
    let numberOfCells = Math.pow(sideLength,2)
    for (i=0 ; i<numberOfCells ; i++) {
        newDiv = mainDivNode.appendChild(divNode.cloneNode(true));
        // console.log(newDiv)
    }
}


function setTheCells() { 
    allNewDivNodes = mainDivNode.querySelectorAll("div");
    allNewDivNodes.forEach( (e)=> { e.addEventListener("mouseover", onMouseOverEvent ); e.style.opacity = "0" } )
    allNewDivNodes.forEach( (e)=> { e.addEventListener("touchmove", onMouseOverEvent ); e.style.opacity = "0" } )
}


function onMouseOverEvent(eventOfDiv) {
    let currentCellOpacity = window.getComputedStyle(eventOfDiv.target, null).opacity;
    let newCellOpacity = parseFloat(currentCellOpacity) + 0.1
    // console.log(currentCellOpacity)
    // console.log(newCellOpacity)
    eventOfDiv.target.style.opacity = `${newCellOpacity}` ;
    eventOfDiv.target.style.backgroundColor = inputColor; 
    eventOfDiv.target.style.borderColor = inputColor;
}

addDivs(20)   // is triggered on loading and by setNewGrid()
setTheCells()  // is triggered on loading and by setNewGrid()

function setNewGrid() {  // is triggered by button
    let gridSideLength = parseInt(prompt("Please type the table side length in numbers. \n F.e. '50' will create a table 50x50. \nMaximum is 100x100, because more can crash your Browser.", "50") );

    if (gridSideLength > 100) {
        alert("Ok, lets try, \nbut first please save your job, browser/PC may crah")
    }
    allNewDivNodes.forEach( (e)=> e.remove() ) // delete all old divs
    
    addDivs(gridSideLength)
    setTheCells()
    mainDivNode.style.gridTemplateColumns = `repeat(${gridSideLength}, 1fr)`;
    mainDivNode.style.gridTemplateRows= `repeat(${gridSideLength}, 1fr)`;
};



function changeSquereToFit() {  // is triggered by input id="sliderInput" 
    const sliderValue = document.querySelector("#sliderInput").checked ? changeMainSquare() : changeeMainFit() 
}


function changeMainSquare() {
    const currentWidth = parseInt(window.getComputedStyle(mainDivNode, null).width);
    const currentHeight = parseInt(window.getComputedStyle(mainDivNode, null).height);
    // console.log(currentWidth, currentHeight  )
    if (currentWidth > currentHeight) {
        mainDivNode.style.width = `${currentHeight}px`
     } else {
        mainDivNode.style.height = `${currentWidth}px`
    }
}


function changeeMainFit() {
        mainDivNode.style.width = `auto`
        mainDivNode.style.height = `7calc(80vh - 50px)`
}
