let fontsG = [
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
let selectionG = window.getSelection().getRangeAt(0)

function createFontList(fonts) {
    for(let font of fonts) {
        let fontItem = document.createElement("div")
        fontItem.setAttribute("class", "font-item")

        let fontName = document.createElement("p")
        fontName.style.fontFamily = font
        fontName.textContent = font

        fontItem.appendChild(fontName)

        fontItem.addEventListener("mousedown", 
            (e) => {
                e.preventDefault()
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
}

createFontList(fontsG)

let fontListBlur = document.getElementById("font-list")
fontListBlur.addEventListener("mouseleave", () => {
    document.execCommand("fontName", false, currentFont);
})


let inputContainer = document.getElementById("font-trigger")

inputContainer.addEventListener("dblclick", (e) => {
    if(inputContainer.children[0].nodeName === "P") {
        let input = document.createElement('input')
        input.value = inputContainer.children[0].textContent
        input.setAttribute("class", "input")

        input.addEventListener("blur", (e) => {
            let newP = document.createElement("p")
            newP.textContent = currentFont
            newP.style.fontFamily = currentFont
            inputContainer.replaceChild( 
                newP,
                inputContainer.children[0]
            )
            createFontList(fontsG)
        })

        input.addEventListener("input", (e) => {
            let lowerCaseValue = e.target.value.toLocaleLowerCase()

            let newList = fontsG.filter((item) => {
                let lowerCaseItem = item.toLocaleLowerCase()
                if(lowerCaseItem.indexOf(lowerCaseValue) == 0) {
                    return item
                }
            })

            document.getElementById("font-list").innerHTML = ""
            createFontList(newList)
        })

        inputContainer.replaceChild( 
            input,
            inputContainer.children[0]
        )
    }
})


let fontSize = document.getElementById("font-size")

fontSize.addEventListener('input', e => {

    document.execCommand("fontSize", false, e.target.value)
})