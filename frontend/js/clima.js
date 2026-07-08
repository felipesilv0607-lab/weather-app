import {
    obterNomePais,
    formatarHora
} from "./utilitarios.js";

// ==============================
// Atualiza o fundo conforme clima e temperatura
// ==============================

export function atualizarFundo(clima, temperatura) {

    const body = document.body;

    let fundo = "";

    switch (clima) {

        case "Clear":

            if (temperatura >= 35) {

                fundo = "linear-gradient(135deg, #ff7e5f, #feb47b, #ffd56b)";

            } else if (temperatura >= 25) {

                fundo = "linear-gradient(135deg, #4facfe, #00c6fb, #6dd5fa)";

            } else {

                fundo = "linear-gradient(135deg, #74ebd5, #ACB6E5)";

            }

            break;

        case "Clouds":

            fundo = "linear-gradient(135deg, #8e9eab, #eef2f3)";
            break;

        case "Rain":
        case "Drizzle":

            fundo = "linear-gradient(135deg, #355c7d, #6c5b7b, #355c7d)";
            break;

        case "Thunderstorm":

            fundo = "linear-gradient(135deg, #232526, #414345, #1e3c72)";
            break;

        case "Snow":

            fundo = "linear-gradient(135deg, #eef2f3, #d9e4f5, #ffffff)";
            break;

        case "Mist":
        case "Fog":
        case "Haze":

            fundo = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
            break;

        default:

            fundo = "linear-gradient(135deg, #4facfe, #00c6fb)";
    }

    body.style.background = fundo;

}

// ==============================
// Atualiza a tela
// ==============================

export function atualizarTela(dados) {

    atualizarFundo(dados.weather[0].main, dados.main.temp);

    document.getElementById("nome-cidade").textContent =
        `${dados.name} - ${obterNomePais(dados.sys.country)}`;

    document.getElementById("temperatura").textContent =
        `${Math.round(dados.main.temp)}°C`;

    document.getElementById("descricao").textContent =
        dados.weather[0].description;

    document.getElementById("sensacao").textContent =
        `${Math.round(dados.main.feels_like)}°C`;

    document.getElementById("umidade").textContent =
        `${dados.main.humidity}%`;

    document.getElementById("vento").textContent =
        `${Math.round(dados.wind.speed * 3.6)} km/h`;

    document.getElementById("maxima").textContent =
        `${Math.round(dados.main.temp_max)}°C`;

    document.getElementById("minima").textContent =
        `${Math.round(dados.main.temp_min)}°C`;

    document.getElementById("nascer-sol").textContent =
        formatarHora(dados.sys.sunrise);

    document.getElementById("por-sol").textContent =
        formatarHora(dados.sys.sunset);

    // ==============================
    // Ícone do clima
    // ==============================

    const icone = document.getElementById("icone-clima");

    icone.src =
        `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`;

    icone.alt =
        dados.weather[0].description;

    icone.style.visibility = "visible";

}