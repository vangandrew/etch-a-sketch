const notepad = document.querySelector(".notepad");
const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");
const sidebarListItems = document.querySelectorAll(".sidebar-list-item");

let currentAction = null;

function initialGrid() {
    const gridSize = 16 * 16;

    const desiredWidth = 800;
    const desiredHeight = 800;

    const notepadWidth = notepad.style.width = `${desiredWidth}px`;
    const notepadHeight = notepad.style.height = `${desiredHeight}px`;

    const cellWidth = ((desiredWidth - 4) / 16) + 'px';
    const cellHeight = ((desiredHeight - 4) / 16) + 'px';

    for (let i = 0; i < gridSize; i++) {
        const squareDiv = document.createElement("div");
        squareDiv.style.width = cellWidth;
        squareDiv.style.height = cellHeight;
        notepad.append(squareDiv);
    }

}

function createGrid() {
    notepad.innerHTML = '';

    let gridInput = prompt("Enter the number of squares per side (maximum 100): ");
    const desiredWidth = 800;
    const desiredHeight = 800;


    if (gridInput > 100) {
        notepad.innerHTML = '';
        return alert("100 is the max grid amount... Try again!")
    }

    const gridAmount = gridInput * gridInput;
    const notepadWidth = notepad.style.width = `${desiredWidth}px`;
    const notepadHeight = notepad.style.height = `${desiredHeight}px`;
    const cellWidth = ((desiredWidth - 4) / gridInput) + 'px';
    const cellHeight = ((desiredHeight - 4  ) / gridInput) + 'px';

    for (let i = 0; i < gridAmount; i++) {
        const squareDiv = document.createElement("div");
        squareDiv.style.width = cellWidth;
        squareDiv.style.height = cellHeight;
        notepad.append(squareDiv);
    }
}

function draw(e) {
    if (e.target.tagName === "DIV") {
        e.target.style.backgroundColor = 'lightblue';
    }
}

function eraser(e) {
    if (e.target.tagName === "DIV") {
        e.target.style.backgroundColor = '';
    }
}

function rgba(e) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random().toFixed(2)

    let rgba = (`${r}, ${g}, ${b}, ${a}`);

    if (e.target.tagName === "DIV") {
        e.target.style.backgroundColor = `rgba(${rgba})`;
    }
}

function reset() {
    const childDivs = document.querySelectorAll(".notepad > div");
    childDivs.forEach(div => {
        div.style.backgroundColor = '';
    });
}


notepad.addEventListener("mousemove", (e) => {

    if (e.target !== notepad && e.target.tagName === "DIV" && currentAction) {
        currentAction(e);
    }

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
            currentAction = null;
            console.log("Action cleared!")
            console.log(currentAction);
        }
        /*  else if, it does not contain the class "active",
            check to see if any other li elements have class "active", and remove it from that li
            then add the class "active" to the clicked li
        */
        else if (!li.classList.contains("active")) {
            document.querySelector(".active")?.classList.remove("active");
            li.classList.add("active");
            console.log(e.target);
            console.log(currentAction);
            if (e.target.tagName === "SPAN" && e.target.id === "add-grid" || e.target.tagName === "DIV" && e.target.id === "add-grid") {
                createGrid();
                currentAction = null;
            } else if (e.target.tagName === "SPAN" && e.target.id === "eraser") {
                currentAction = eraser;
                console.log(currentAction);
            } else if (e.target.tagName === "SPAN" && e.target.id === "draw") {
                currentAction = draw;
                console.log(currentAction);
            } else if (e.target.tagName === "SPAN" && e.target.id === "rgba") {
                currentAction = rgba;
                console.log(currentAction);
            } else if (e.target.tagName === "SPAN" && e.target.id === "reset") {
                currentAction = null;
                reset();
            }
        }
    })
})

/*  Click on Add new grid size
    A prompt will ask user to enter in grid size
    function createGrid, will create a new grid for the user
    automatically "active" class the draw mode and let the user draw on the new grid
*/

initialGrid()