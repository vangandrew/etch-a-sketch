const notepad = document.querySelector(".notepad");


notepad.addEventListener("mouseover", (e) => {
    const newDiv = document.createElement("div");
    newDiv.style.position = "fixed";
    newDiv.style.left = e.clientX + 'px';
    newDiv.style.top = e.clientY + 'px';
    newDiv.style.width = '10px';
    newDiv.style.height = '10px';
    newDiv.style.backgroundColor = 'lightblue';

    notepad.appendChild(newDiv);
})

notepad.addEventListener("mouseout", () => {

})