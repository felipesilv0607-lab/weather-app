// ==============================
// Configuração da API
// ==============================

const API_KEY = "SUA_CHAVE_DE_API_AQUI"; // Substitua pela sua chave de API do OpenWeatherMap

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
// Atualiza o fundo conforme o clima
// ==============================

function atualizarFundo(clima) {

    const body = document.body;

    switch (clima) {

        case "Clear":
            body.style.background = "linear-gradient(180deg, #4facfe, #00c6fb)";
            break;

        case "Clouds":
            body.style.background = "linear-gradient(180deg, #8e9eab, #eef2f3)";
            break;

        case "Rain":
        case "Drizzle":
            body.style.background = "linear-gradient(180deg, #4b79a1, #283e51)";
            break;

        case "Thunderstorm":
            body.style.background = "linear-gradient(180deg, #232526, #414345)";
            break;

        case "Snow":
            body.style.background = "linear-gradient(180deg, #ffffff, #d7e1ec)";
            break;

        case "Mist":
        case "Fog":
        case "Haze":
            body.style.background = "linear-gradient(180deg, #bdc3c7, #2c3e50)";
            break;

        default:
            body.style.background = "linear-gradient(180deg, #4facfe, #00c6fb)";
    }

}

// ==============================
// Atualiza a interface
// ==============================

function atualizarTela(dados) {

    const codigoIcone = dados.weather[0].icon;
    const clima = dados.weather[0].main;

atualizarFundo(clima);

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