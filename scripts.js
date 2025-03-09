const notepad = document.querySelector(".notepad");
const menuIconButton = document.querySelector("[data-menu-icon-btn]");
const sidebar = document.querySelector("[data-sidebar]");
const sidebarListItems = document.querySelectorAll(".sidebar-list-item");
const colorPicker = document.getElementById("input");
const colorPickerContainer = document.querySelector(".color-picker");

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
        e.target.style.backgroundColor = generateColor();
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

function generateColor() {
    const color = colorPicker.value;
    return color;
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

colorPicker.addEventListener("input", generateColor)

/* 
Add a dedicated event listener for document level to disable drawing
when color picker is popped up and allow drawing when color picker is disabled/not popped up
*/
document.addEventListener("click", (e) => {
    // If user clicks inside the element or clicks on "draw", do nothing
    if (e.target.closest(".color-picker") || (e.target.id === "draw")) {
        currentAction = null;
        return
    }
    // If user clicks outside the element, display none
    colorPickerContainer.classList.remove("active-color");
    
    const activeItem = document.querySelector(".sidebar-list-item.active");
    if (activeItem) {
        if (activeItem.id === "eraser") {
            currentAction = eraser;
        } else if (activeItem.id === "draw") {
            currentAction = draw;
        } else if (activeItem.id === "rgba") {
            currentAction = rgba;
        } else if (activeItem.id === "reset") {
            currentAction = reset;
        } else {
            currentAction = null;
        }
    }

})

sidebarListItems.forEach(li => {
    li.addEventListener("click", (e) => {
        /* If the list item contains the class "active", simply remove it */
        if (li.classList.contains("active")) {
            colorPickerContainer.classList.remove("active-color");
            li.classList.remove("active");
            currentAction = null;
        }
        /*  else if, it does not contain the class "active",
            check to see if any other li elements have class "active", and remove it from that li
            also remove "active-color"
            then add the class "active" to the clicked li
        */
        else if (!li.classList.contains("active")) {
            document.querySelector(".active")?.classList.remove("active");
            document.querySelector(".active-color")?.classList.remove("active-color");
            li.classList.add("active");

            if (e.target.tagName === "SPAN" && e.target.id === "add-grid" || e.target.tagName === "DIV" && e.target.id === "add-grid") {
                currentAction = null;
                createGrid();
            } else if (e.target.tagName === "SPAN" && e.target.id === "eraser" || e.target.tagName === "DIV" && e.target.id === "eraser") {
                currentAction = eraser;
            } else if (e.target.tagName === "SPAN" && e.target.id === "draw" || e.target.tagName === "DIV" && e.target.id === "draw") {
                colorPickerContainer.classList.add("active-color");
            } else if (e.target.tagName === "SPAN" && e.target.id === "rgba" || e.target.tagName === "DIV" && e.target.id === "rgba") {
                currentAction = rgba;
            } else if (e.target.tagName === "SPAN" && e.target.id === "reset" || e.target.tagName === "DIV" && e.target.id === "reset") {
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

initialGrid();

/* If a user clicks out of input field, remove "active-color" class
    If .color-picker is popped up and a user clicks on a different li, remove "active-color"
    disable draw() function until .color-picker is closed
*/