// ==============================
// Configuração da API
// ==============================

const API_KEY = "SUA_CHAVE_DE_API_AQUI";

// ==============================
// Elementos do HTML
// ==============================

const inputCidade = document.getElementById("cidade");
const botaoBuscar = document.getElementById("buscar");
const botaoLocalizacao = document.getElementById("localizacao");

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

    return new Date(timestamp * 1000).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

}

// ==============================
// Atualiza o fundo
// ==============================

function atualizarFundo(clima) {

    switch (clima) {

        case "Clear":
            document.body.style.background =
                "linear-gradient(180deg, #4facfe, #00c6fb)";
            break;

        case "Clouds":
            document.body.style.background =
                "linear-gradient(180deg, #8e9eab, #eef2f3)";
            break;

        case "Rain":
        case "Drizzle":
            document.body.style.background =
                "linear-gradient(180deg, #4b79a1, #283e51)";
            break;

        case "Thunderstorm":
            document.body.style.background =
                "linear-gradient(180deg, #232526, #414345)";
            break;

        case "Snow":
            document.body.style.background =
                "linear-gradient(180deg, #ffffff, #d7e1ec)";
            break;

        case "Mist":
        case "Fog":
        case "Haze":
            document.body.style.background =
                "linear-gradient(180deg, #bdc3c7, #2c3e50)";
            break;

        default:
            document.body.style.background =
                "linear-gradient(180deg, #4facfe, #00c6fb)";
    }

}

// ==============================
// Atualiza a tela
// ==============================

function atualizarTela(dados) {

    atualizarFundo(dados.weather[0].main);

    nomeCidade.textContent =
        `${dados.name} - ${obterNomePais(dados.sys.country)}`;

    temperatura.textContent =
        `${Math.round(dados.main.temp)}°C`;

    descricao.textContent =
        dados.weather[0].description;

    sensacao.textContent =
        `${Math.round(dados.main.feels_like)}°C`;

    umidade.textContent =
        `${dados.main.humidity}%`;

    vento.textContent =
        `${dados.wind.speed} km/h`;

    maxima.textContent =
        `${Math.round(dados.main.temp_max)}°C`;

    minima.textContent =
        `${Math.round(dados.main.temp_min)}°C`;

    nascerSol.textContent =
        formatarHora(dados.sys.sunrise);

    porSol.textContent =
        formatarHora(dados.sys.sunset);

    const codigoIcone = dados.weather[0].icon;

    iconeClima.src =
        `https://openweathermap.org/img/wn/${codigoIcone}@2x.png`;

    iconeClima.alt =
        dados.weather[0].description;

    iconeClima.style.visibility = "visible";

}

// ==============================
// Cria URL por cidade
// ==============================

function criarUrl(cidade) {

    return `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;

}

// ==============================
// Cria URL por coordenadas
// ==============================

function criarUrlCoordenadas(latitude, longitude) {

    return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;

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
// Busca e atualiza clima
// ==============================

async function buscarClimaPorUrl(url) {

    mostrarLoading();

    iconeClima.style.visibility = "hidden";

    try {

        const resposta = await fetch(url);

        if (!resposta.ok) {

            throw new Error("Não foi possível obter os dados do clima.");

        }

        const dados = await resposta.json();

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
// Busca por cidade
// ==============================

function buscarClima() {

    const cidade = inputCidade.value.trim();

    if (cidade === "") {

        alert("Digite o nome de uma cidade.");
        return;

    }

    buscarClimaPorUrl(criarUrl(cidade));

}

// ==============================
// Busca por localização
// ==============================

function obterLocalizacao() {

    if (!navigator.geolocation) {

        alert("Seu navegador não suporta geolocalização.");
        return;

    }

    navigator.geolocation.getCurrentPosition(

        (posicao) => {

            const latitude = posicao.coords.latitude;
            const longitude = posicao.coords.longitude;

            buscarClimaPorUrl(
                criarUrlCoordenadas(latitude, longitude)
            );

        },

        () => {

            alert("Não foi possível obter sua localização.");

        }

    );

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

botaoLocalizacao.addEventListener("click", obterLocalizacao);