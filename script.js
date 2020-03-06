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
let range = null

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


let editor = document.getElementById("editor")

editor.addEventListener("blur", (e) => {
    let selection = window.getSelection()
    range = selection.getRangeAt(0)
})

let fontSize = document.getElementById("font-size")

fontSize.addEventListener('input', (e) => {
    e.preventDefault()
    let n = 38
    if( range != null){
        editor.focus()
        selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)


        let docFragment = range.extractContents()
        console.log(docFragment)
        let elements = docFragment.querySelectorAll("*")
        
        for(ele of elements) {
            let span = document.createElement('span')
            span.style.fontSize = `${n}px`
            span.textContent = ele.textContent
            
            ele.textContent = ""
            ele.appendChild(span)

        }
        editor.innerHTML = ""
        editor.appendChild(docFragment)

        let afterEditRange = new Range()
        afterEditRange.setStart(elements[0], 0)
        afterEditRange.setEnd(elements[elements.length - 1], 0)

        range = afterEditRange
        
        editor.focus()
        selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(afterEditRange)
    }
})

fontSize.addEventListener('mousedown', (e) => {
    let selection = window.getSelection()
    range = selection.getRangeAt(0)
})

fontSize.addEventListener('focusin', (e) => {
    let selection = window.getSelection()
    selection.addRange(range)
})


let copy = document.getElementById("copy")
copy.addEventListener('mousedown', e => {
    document.execCommand('copy')
})

let paste = document.getElementById("paste")
paste.addEventListener('mousedown', (e) => {
    let selection = window.getSelection()
    let myRange = selection.getRangeAt(0)
    navigator.clipboard.readText().then(text =>{
        let htmlText = text.split('\n')
        let el = document.createElement('div')
        for(hText of htmlText){
            el.append(hText)
            el.append(document.createElement('br'))
        }
        myRange.insertNode(el)
    })
})

let sel = document.getElementById("sel")
sel.addEventListener("mousedown", e => {
    console.log(range)
    e.preventDefault()
    editor.focus()
    let selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
})
// \n