// ==============================
// Configuração da API
// ==============================

const API_KEY = "SUA_API_KEY";

// ==============================
// Elementos do HTML
// ==============================

// Campo onde o usuário digita a cidade
const inputCidade = document.getElementById("cidade");

// Botão de busca
const botaoBuscar = document.getElementById("buscar");

// Área onde serão exibidos os dados
const nomeCidade = document.getElementById("nome-cidade");
const temperatura = document.getElementById("temperatura");
const descricao = document.getElementById("descricao");
const sensacao = document.getElementById("sensacao");
const umidade = document.getElementById("umidade");
const vento = document.getElementById("vento");
const maxima = document.getElementById("maxima");
const minima = document.getElementById("minima");
const iconeClima = document.getElementById("icone-clima");

// ==============================
// Função para buscar o clima
// ==============================

async function buscarClima() {

    // Remove espaços em branco antes e depois do texto
    const cidade = inputCidade.value.trim();

    // Verifica se o usuário digitou alguma cidade
    if (cidade === "") {
        alert("Digite o nome de uma cidade.");
        return;
    }

    // URL da API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;

    try {

        // Faz a requisição para a API
        const resposta = await fetch(url);

        // Verifica se a resposta foi bem sucedida
        if (!resposta.ok) {
            throw new Error("Cidade não encontrada.");
        }

        // Converte a resposta para JSON
        const dados = await resposta.json();

        const codigoIcone = dados.weather[0].icon;

        iconeClima.src = `https://openweathermap.org/img/wn/${codigoIcone}@2x.png`;

        iconeClima.alt = dados.weather[0].description;

        iconeClima.style.visibility = "visible";

        // Apenas para desenvolvimento
        console.log(dados);

        // Atualiza os elementos da página
        nomeCidade.textContent = dados.name;
        temperatura.textContent = `${Math.round(dados.main.temp)}°C`;
        descricao.textContent = dados.weather[0].description;
        sensacao.textContent = `${Math.round(dados.main.feels_like)}°C`;
        umidade.textContent = `${dados.main.humidity}%`;
        vento.textContent = `${dados.wind.speed} m/s`;
        maxima.textContent = `${Math.round(dados.main.temp_max)}°C`;
        minima.textContent = `${Math.round(dados.main.temp_min)}°C`;

    } catch (erro) {

       iconeClima.style.visibility = "hidden";

        alert(erro.message);

    }

}

// ==============================
// Eventos
// ==============================

// Clique no botão
botaoBuscar.addEventListener("click", buscarClima);

// Pressionar Enter
inputCidade.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        buscarClima();

    }

});
