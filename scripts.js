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

    if (e.target.className === "notepad") {
        const newDiv = document.createElement("div");
        newDiv.style.position = "fixed";

        newDiv.style.left = e.clientX + 'px';
        newDiv.style.top = e.clientY + 'px';
        newDiv.style.width = '10px';
        newDiv.style.height = '10px';
        newDiv.style.backgroundColor = 'lightblue';
    
        notepad.appendChild(newDiv);
    }

})

notepad.addEventListener("mouseout", () => {

    isInside = false;

})