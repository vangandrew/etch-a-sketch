const notepad = document.querySelector(".notepad");
const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");
const sidebarListItems = document.querySelectorAll(".sidebar-list-item");

let isInside = false;
let currentAction = null;

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

function draw() {
    notepad.addEventListener("mousemove", (e) => {
        if (e.target.tagName === "DIV") {
            e.target.style.backgroundColor = 'lightblue';
        }
    })
}

function eraser () {
    notepad.addEventListener("mousemove", (e) => {
        if (e.target.tagName === "DIV") {
            e.target.style.backgroundColor = '';
        }
    })
}


notepad.addEventListener("mousemove", (e) => {

    isInside = true;

    if (e.target.tagName === "DIV" && currentAction) {
        // e.target.style.backgroundColor = 'lightblue';
        currentAction();
    }

})

notepad.addEventListener("mouseout", () => {

    isInside = false;

})

menuIconButton.addEventListener("click", () => {
    // Open/close the sidebar
    sidebar.classList.toggle("open");
})

sidebarListItems.forEach(li => {
    li.addEventListener("click", (e) => {
        /* If the list item contains the class "active", simply remove it */
        if (li.classList.contains("active")) {
            li.classList.remove("active");
        }
        /*  else if, it does not contain the class "active",
            check to see if any other li elements have class "active", and remove it from that li
            then add the class "active" to the clicked li
        */
        else if (!li.classList.contains("active")) {
            document.querySelector(".active")?.classList.remove("active");
            li.classList.add("active");
            console.log(e.target);
            if (e.target.tagName === "SPAN" && e.target.id === "add-grid" || e.target.tagName === "DIV" && e.target.id === "add-grid") {
                createGrid(50);
                currentAction = null;
            } else if (e.target.tagName === "SPAN" && e.target.id === "eraser") {
                currentAction = eraser();
            } else if (e.target.tagName === "SPAN" && e.target.id === "draw") {
                currentAction = draw();
            } else if (e.target.tagName === "SPAN" && e.target.id === "rgba") {
                currentAction = rgba();
            } else if (e.target.tagName === "SPAN" && e.target.id === "remove-rgba") {
                currentAction = rgbaRemove();
            }
        }
    })
})

/*  Click on Add new grid size
    A prompt will ask user to enter in grid size
    function createGrid, will create a new grid for the user
    automatically "active" class the draw mode and let the user draw on the new grid
*/

createGrid(16);