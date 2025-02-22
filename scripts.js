const notepad = document.querySelector(".notepad");


notepad.addEventListener("mouseover", () => {
    const newDiv = document.createElement("div");
    newDiv.style.backgroundColor = 'lightblue';
    newDiv.style.width = '50px';
    newDiv.style.height = '50px';
    notepad.appendChild(newDiv);
})