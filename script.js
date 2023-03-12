const texto = document.querySelector('input')
const btnInsert = document.querySelector('.input-sequence button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')

var itemsDB = []

btnDeleteAll.onclick = () => {
    itemsDB = []
    updateDB()
}


texto.addEventListener('keypress', text => {
    // console.log ('tecla pressionada')
    if (text.key === 'Enter' && texto.value !== '') {
        setItemDB()
    }
})

btnInsert.onclick = () => {
    //console.log ('aperta o botão direito')
    if (texto.value !== '') {
        setItemDB()
    }
}
function setItemDB() {
    if (itemsDB.length >= 20) {
        //console.log (alert)
        alert('Limite máximo de 20 itens atingido!')
        return
    }
    itemsDB.push({ 'item': texto.value, 'status': '' })
}

function updateDB() {
    localStorage.setItem('todolist', JSON.stringify(itemsDB))
    loadItems()
}



function loadItems() {
    ul.innerHTML = "";
    itemsDB = JSON.parse(localStorage, getItem('todoList')) ?? []
    itemsDB.forEach((item, i) => {
        insertItemTela(item.item, item.status, i)
    })
}

function insertItemTela(text, status, i) {
    const li = document.createElement('li')

    li.innerHTML = `
<div class="divLi">
    <input type = "checkbox" ${status} data-i = ${i} onchange="done(this, ${i});" />
    <span data-si=${i}>${text}</span>
    <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
   </div>
   `
    ul.appendChild(li)

    if (status) {
        document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
    } else {
        document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
    }

    texto.value = ''
}
function done(chk, i) {

    if (chk.checked) {
        itemsDB[i].status = 'checked'
    } else {
        itemsDB[i].status = ''
    }

    updateDB()
}

function removeItem(i) {
    itemsDB.splice(i, 1)
    updateDB()
}

loadItems()

