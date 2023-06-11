const button = document.querySelector(".button-add-task")
const input = document.querySelector(".input-task")
const listaCompleta = document.querySelector(".list-tasks")

let minhaListaDeItens = []
let posicaoParaAlterar = 0


function adicionarNovaTarefa() {
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    })

    input.value = ""
    mostrarTarefas()

    
}


function mostrarTarefas () {
    
    let novaLi = ""

    minhaListaDeItens.forEach((item, posicao) => {
        
        novaLi = novaLi + `
        
        <li class="task ${item.concluida && "done"}">
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
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()

}

function alterarItem (posicao) {
    input.value = minhaListaDeItens[posicao].tarefa
    button.lastChild.data = "Alterar"
    
    button.removeEventListener("click", adicionarNovaTarefa)
    button.addEventListener("click", alterarTarefa)

    posicaoParaAlterar = posicao
}

function alterarTarefa () {
    minhaListaDeItens[posicaoParaAlterar].tarefa = input.value
    minhaListaDeItens[posicaoParaAlterar].concluida = false
        
    mostrarTarefas()

    input.value = ""
    button.lastChild.data = "Adicionar"

    button.removeEventListener("click", alterarTarefa)
    button.addEventListener("click", adicionarNovaTarefa)
}

function deletarItem (posicao) {
    minhaListaDeItens.splice(posicao, 1)
    mostrarTarefas()
}   

function recarregarTarefas () {
    const tarefasDoLocalStorage = localStorage.getItem("lista")

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener("click", adicionarNovaTarefa)