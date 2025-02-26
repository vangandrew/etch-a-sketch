const notepad = document.querySelector(".notepad");

let isInside = false;

function createGrid(input) {
    const cellSize = 25;
    const gridInput = input;

    notepad.innerHTML = '';

    if (input > 100) {
        return prompt("100 is the max grid amount... Try again!")
    }

    const gridAmount = input * input;
    notepad.style.width = `${gridInput} * ${cellSize}px`;
    notepad.style.height = `${gridInput} * ${cellSize}px`;

    for (let i = 0; i < gridAmount; i++) {
        const squareDiv = document.createElement("div");
        squareDiv.style.width = `${cellSize}px`;
        squareDiv.style.height = `${cellSize}px`;
        notepad.append(squareDiv);
    }
}

createGrid(16);



notepad.addEventListener("mousemove", (e) => {

    isInside = true;

    if (e.target.tagName === "DIV") {
        e.target.style.backgroundColor = 'lightblue';
    }

})

notepad.addEventListener("mouseout", () => {

    isInside = false;

})