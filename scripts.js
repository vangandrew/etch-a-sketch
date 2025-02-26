const notepad = document.querySelector(".notepad");

let isInside = false;

function createGrid(input) {
    if (input > 100) {
        return prompt("100 is the max grid amount... Try again!")
    }
    const gridAmount = input * input;
    for (let i = 0; i < gridAmount + 1; i++) {
        const squareDiv = document.createElement("div");
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