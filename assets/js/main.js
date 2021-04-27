const display = document.querySelector('[nome="display"]')
const updisplay = document.querySelector('[nome="up-display"]')
let [termA, termB, operation] = ['','','']
let keyBlocker = false




const math = (a, b, o) => {
    a = parseFloat(a)
    b = parseFloat(b)
    switch (o) {
        case '+':
            return b + a
        case '-':
            return a - b
        case 'x':
        case '*':
            return a * b
        case '/':
            return a / b
        default: console.log('erro função math')
    }
}


const printScreen = {        
    termAPrt(){display.value = termA},
    termBPrt(){display.value = termB},
    operationPrt() {
        display.value = 0        
        updisplay.value = [termA, operation, termB].join(' ')
    },
    resultPrt() {
        display.value = result
        updisplay.value = [termA, operation, termB].join(' ').concat(' = ', result)
        document.getElementById('content').innerHTML += `<p>${updisplay.value}<p>`
        termA = result
        result = termB = operation = ''
        keyBlocker = false
    }
}


const keyNumberEvent = key => {
    if (operation == '') {
        termA += key
        printScreen.termAPrt()

    } else {
        termB += key
        printScreen.termBPrt()
    }
}


const keyOperationEvent = key => {
    if (keyBlocker == false && termA != '') {
        operation = key
        printScreen.operationPrt()
        keyBlocker = true
    }
}


const keyResultEvent = () => {
    if (termB != '') {
        result = math(termA, termB, operation)
        printScreen.resultPrt()

    }
}


const reset = () => {
    termA = termB = operation = updisplay.value = ""
    display.value = 0
    keyBlocker = false
}

const keyBoardCheck = e => {
    const typedKey = e.key
    const characterList = {
        number: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        operation: ['+', '-', '*', '/', 'x']
    }
    if (characterList.number.indexOf(typedKey) != -1) {
        keyNumberEvent(typedKey)
    }
    if (characterList.operation.indexOf(typedKey) != -1) {
        keyOperationEvent(typedKey)
    }
}



document.addEventListener('keydown', e => {
    const code = e.keyCode
    code == 13 ? keyResultEvent(e.key) : keyBoardCheck(e)
})


document.querySelectorAll('[number]').forEach(e => {
    e.onclick = click => {
        keyNumberEvent(e.innerText)
    }
})


document.querySelectorAll('[operator]').forEach(e => {
    e.onclick = click => {
        keyOperationEvent(e.innerText)
    }
})

document.querySelectorAll('[result]').forEach(e => {
    e.onclick = click => {
        keyResultEvent()
    }
})





