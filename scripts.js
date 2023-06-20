const buttonAddTask = document.querySelector(".button-add-task")
const input = document.querySelector(".input-task")
const listaCompleta = document.querySelector(".list-tasks")
const buttonAddDate = document.querySelector(".button-add-date")

var data = new Date();

var diaAtual = data.getDate()

var mesAtual = data.getMonth()

var anoAtual = data.getFullYear()

let diaDoPrazo
let mesDoPrazo
let anoDoPrazo


let minhaListaDeItens = []
let posicaoParaAlterar = 0
let date = ""
let dataFormatada = ""

/////////////////////////////////////////////////////////////////
/*                       Funções de adicionar                    */
////////////////////////////////////////////////////////////////

function adicionarNovaTarefa() {
        if(input.value){
            minhaListaDeItens.push({
                tarefa: input.value,
                concluida: false,
                date: dataFormatada
            })
        }


    input.value = ""
    mostrarTarefas()
}

function adicionarPrazo(e) {
    e.preventDefault();
    if(input.type == "text"){
        input.type = "Date"
        buttonAddTask.style.display = "none"
    } else {
        date = input.value
        formatandoData(date)
        input.value = ""
        input.type = "text"
        buttonAddTask.style.display = "inline"
        
    }
}

/////////////////////////////////////////////////////////////////
/*                       Funções de alterar                    */
////////////////////////////////////////////////////////////////

function alterarItem (posicao) {
    input.value = minhaListaDeItens[posicao].tarefa
    buttonAddTask.lastChild.data = "Alterar"
    
    buttonAddTask.removeEventListener("click", adicionarNovaTarefa)
    buttonAddTask.addEventListener("click", alterarTarefa)

    posicaoParaAlterar = posicao
}

function alterarTarefa () {
    minhaListaDeItens[posicaoParaAlterar].tarefa = input.value
    minhaListaDeItens[posicaoParaAlterar].concluida = false
    minhaListaDeItens[posicaoParaAlterar].date = dataFormatada
        
    mostrarTarefas()

    input.value = ""
    buttonAddTask.lastChild.data = "Adicionar"

    buttonAddTask.removeEventListener("click", alterarTarefa)
    buttonAddTask.addEventListener("click", adicionarNovaTarefa)
}
/////////////////////////////////////////////////////////////////
/*                       Funções de mostrar                    */
////////////////////////////////////////////////////////////////
function mostrarTarefas () {
    
    let novaLi = ""

    minhaListaDeItens.forEach((item, posicao) => {
        
        novaLi = novaLi + `
        
        <li class="task ${item.concluida && "done"}">
            <p>${item.date}</p>
            <img src="./img/checked.png" alt="Check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <div>
                <img src="./img/alterar.png" class="img-alterar" alt="alterar-tarefa" onclick="alterarItem(${posicao})">
                <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
            </div>
            
        </li>
        
        `
    })
    
    listaCompleta.innerHTML = novaLi

    localStorage.setItem("lista", JSON.stringify(minhaListaDeItens))
    deletarAutomatizado()
}

/////////////////////////////////////////////////////////////////
/*                       Funções de deletar                    */
////////////////////////////////////////////////////////////////

function deletarAutomatizado () {
    minhaListaDeItens.forEach(item => {
        diaDoPrazo = parseInt(item.date.split("/")[0])
        mesDoPrazo = parseInt(item.date.split("/")[1])
        anoDoPrazo = parseInt(item.date.split("/")[2])
    })
}

function deletarItem (posicao) {
    minhaListaDeItens.splice(posicao, 1)
    mostrarTarefas()
}   

/////////////////////////////////////////////////////////////////
/*                       Funções avulsas                       */
////////////////////////////////////////////////////////////////


function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()

}

function formatandoData(date) {
    dataFormatada = date.split("-")[2] + "/" + date.split("-")[1] + "/" + date.split("-")[0]
}



function recarregarTarefas () {
    const tarefasDoLocalStorage = localStorage.getItem("lista")

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()

buttonAddTask.addEventListener("click", adicionarNovaTarefa)
buttonAddDate.addEventListener("click", adicionarPrazo)
module.exports = {
    mostrarTarefas, 
    recarregarTarefas, 
    adicionarNovaTarefa, 
    adicionarPrazo, 
    alterarItem, 
    alterarTarefa,
    concluirTarefa,
    deletarItem
}