// ==============================
// Configuração da API
// ==============================

const API_KEY = "e7e90ccea0d46b14f1c38e97c9e20c4f";

// ==============================
// Elementos do HTML
// ==============================

const inputCidade = document.getElementById("cidade");
const botaoBuscar = document.getElementById("buscar");

const nomeCidade = document.getElementById("nome-cidade");
const temperatura = document.getElementById("temperatura");
const descricao = document.getElementById("descricao");
const sensacao = document.getElementById("sensacao");
const umidade = document.getElementById("umidade");
const vento = document.getElementById("vento");
const maxima = document.getElementById("maxima");
const minima = document.getElementById("minima");
const nascerSol = document.getElementById("nascer-sol");
const porSol = document.getElementById("por-sol");
const iconeClima = document.getElementById("icone-clima");
const loading = document.getElementById("loading");

// ==============================
// Converte o código do país
// ==============================

function obterNomePais(codigoPais) {

    return new Intl.DisplayNames(
        ["pt-BR"],
        { type: "region" }
    ).of(codigoPais);

}

// ==============================
// Formata horário
// ==============================

function formatarHora(timestamp) {

    const data = new Date(timestamp * 1000);

    return data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

}

// ==============================
// Atualiza a interface
// ==============================

function atualizarTela(dados) {

    const codigoIcone = dados.weather[0].icon;

    const pais = obterNomePais(dados.sys.country);

nomeCidade.textContent = `${dados.name} - ${pais}`;
    temperatura.textContent = `${Math.round(dados.main.temp)}°C`;
    descricao.textContent = dados.weather[0].description;

    sensacao.textContent = `${Math.round(dados.main.feels_like)}°C`;
    umidade.textContent = `${dados.main.humidity}%`;
    vento.textContent = `${dados.wind.speed} km/h`;
    maxima.textContent = `${Math.round(dados.main.temp_max)}°C`;
    minima.textContent = `${Math.round(dados.main.temp_min)}°C`;
    nascerSol.textContent = formatarHora(dados.sys.sunrise);
    porSol.textContent = formatarHora(dados.sys.sunset);

    iconeClima.src = `https://openweathermap.org/img/wn/${codigoIcone}@2x.png`;
    iconeClima.alt = dados.weather[0].description;
    iconeClima.style.visibility = "visible";
}

// ==============================
// Cria a URL da API
// ==============================

function criarUrl(cidade) {

    return `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;

}

// ==============================
// Loading
// ==============================

function mostrarLoading() {
    loading.style.display = "block";
}

function esconderLoading() {
    loading.style.display = "none";
}

// ==============================
// Busca o clima
// ==============================

async function buscarClima() {

    const cidade = inputCidade.value.trim();

    if (cidade === "") {
        alert("Digite o nome de uma cidade.");
        return;
    }

    mostrarLoading();

    iconeClima.style.visibility = "hidden";

    try {

        const resposta = await fetch(criarUrl(cidade));

        if (!resposta.ok) {
            throw new Error("Cidade não encontrada.");
        }

        const dados = await resposta.json();

        console.log(dados);

        atualizarTela(dados);

    } catch (erro) {

        iconeClima.style.visibility = "hidden";
        iconeClima.src = "";

        alert(erro.message);

    } finally {

        esconderLoading();

    }

}

// ==============================
// Eventos
// ==============================

botaoBuscar.addEventListener("click", buscarClima);

inputCidade.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        buscarClima();
    }

});