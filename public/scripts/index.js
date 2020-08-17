const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

//.addEventListener() funciona em um elemento, não em uma lista, portanto, funciona com o retorno de querySelector(), mas não com o de querySelectorAll(b )

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})