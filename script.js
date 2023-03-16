const texto = document.querySelector('input')
const btnInsert = document.querySelector('.input-sequence button') 
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')

let itemsDB = []
// POR QUE COLOCAR OS EVENTOS ANTES E AS FUNÇÕES DEPOIS?
// O EVENTO btnDeleteAll.onclick é PARA eu DELETAR todos os itens de uma vez só?
btnDeleteAll.onclick = () => {
  itemsDB = []
  updateDB()
}

texto.addEventListener("keypress", e => {
  // console.log ('tecla pressionada')
  if (e.key === "Enter" && texto.value !== "") {
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
    alert("Limite máximo de 20 itens atingido!")
    return
  }
  // O QUE É O texto.value?
  itemsDB.push({ item: texto.value, 'status': ''})
}

function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itemsDB))
  loadItems()
}
// O QUE SIGNIFICA ?? []  ?
function loadItems() {
  ul.innerHTML = ""
  itemsDB = JSON.parse(localStorage, getItem('todolist')) ?? []
  // NO forEach (item, i) você quis fazer ele ler todos os itens de forma ordenada ou não tem nada a ver?
  itemsDB.forEach((item, i) => {
    // No insertItemTela você colocou um .item e um .status por que mesmo?
    insertItemTela(item.item, item.status, i)
  })
}

function insertItemTela(text, status, i) {
  const li = document.createElement('li')
// VOCÊ COPIOU ESSE BANCO DE DADOS INTEIRO?
  li.innerHTML = `
<div class="divLi">
    <input type = "checkbox" ${status} data-i = ${i} onchange="done(this, ${i})" />
    <span data-si=${i}>${text}</span>
    <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
   </div>
   `
  //  O QUE É appendChild?
  ul.appendChild(li)

  if (status) {
    newFunction()
  } else {
    // NÃO ENTENDI ESSE else com document.queryselector e classList
    document.querySelector(`[data-si="${i}"]`).classList.remove("line-through")
  }

  texto.value = ''

    function newFunction() {
        document.querySelector(`[data-si="${i}"]`).classList.add("line-through")
    }
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
