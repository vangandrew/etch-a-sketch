const notepad = document.querySelector(".notepad");
const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]")

let isInside = false;

function createGrid(input) {
    const gridInput = input;
    const desiredWidth = 800;
    const desiredHeight = 800;

    notepad.innerHTML = '';

    if (input > 100) {
        notepad.innerHTML = '';
        return alert("100 is the max grid amount... Try again!")
    }

    const gridAmount = input * input;
    const notepadWidth = notepad.style.width = `${desiredWidth}px`;
    const notepadHeight = notepad.style.height = `${desiredHeight}px`;
    const cellWidth = (desiredWidth / input) + 'px';
    const cellHeight = (desiredHeight / input) + 'px';

    for (let i = 0; i < gridAmount; i++) {
        const squareDiv = document.createElement("div");
        squareDiv.style.width = cellWidth;
        squareDiv.style.height = cellHeight;
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

menuIconButton.addEventListener("click", () => {
    // Open/close the sidebar
    sidebar.classList.toggle("open")
})