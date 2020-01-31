let fonts = [
    "Arial", 
    "Times New Roman",
    "Comic Sans MS", 
    "Impact",
    "Calibri",
    "Courier",
    "Courier New",
    "MS Gothic"
]

let currentFont = "Times New Roman"

for(let font of fonts) {
    let fontItem = document.createElement("div")
    fontItem.setAttribute("class", "font-item")

    let fontName = document.createElement("p")
    fontName.style.fontFamily = font
    fontName.textContent = font

    fontItem.appendChild(fontName)

    fontItem.addEventListener("mousedown", 
        () => {
            let fontTrigger = document.getElementById("font-trigger")
            fontTrigger.children[0].textContent = font
            fontTrigger.children[0].style.fontFamily = font
            currentFont = font;
            document.execCommand("fontName", false, font);        
        }
    )

    fontItem.addEventListener(
        "mouseover", 
        () => {
            document.execCommand("fontName", false, font); 
        }
    )


    let fontList = document.getElementById("font-list")
    fontList.appendChild(fontItem)
}

let fontListBlur = document.getElementById("font-list")
fontListBlur.addEventListener("mouseleave", () => {
    document.execCommand("fontName", false, currentFont);
})