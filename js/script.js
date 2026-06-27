// Campo onde o usuário digita a cidade
const inputCidade = document.getElementById("cidade");

// Botão de busca
const botaoBuscar = document.getElementById("buscar");

// Função que será responsável pela busca
function buscarClima() {
    const cidade = inputCidade.value;

    console.log(`Buscando informações da cidade: ${cidade}`);
}

// Evento de clique no botão
botaoBuscar.addEventListener("click", buscarClima);

// Evento ao pressionar Enter
inputCidade.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        buscarClima();
    }
});