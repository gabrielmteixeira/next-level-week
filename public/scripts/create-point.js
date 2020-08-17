function populateUFs() {
    const ufsSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        for(let state of states) {
            ufsSelect.innerHTML = ufsSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(const city of cities) {
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// itens de coleta
// pegar todos os lis

const itemsToCollect = document.querySelectorAll(".itens-grid li")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //add or remove a class with JS
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id // .dataset.id está acessando o atributo id dentro do atributo data daquele elemento.

    //verificar se existem itens selecionados, se sim, pegar os itens selecionados
    
    const alreadySelected = selectedItems.findIndex( item => item == itemId) // faz um loop pelo array, recebe como parâmetro uma função que, por sua vez, recebe o item do array. Se o return da função for true, "findIndex" retorna o index de "item" no array. Se for falso, retorna -1.
    
    //se clicar em um já selecionado, remover

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

        console.log(filteredItems)
    } else {
        // se não estiver selecionado, adicionar
        selectedItems.push(itemId)
    }


    //atualizar o campo escondido com os campos selecionados
    collectedItems.value = selectedItems
}

