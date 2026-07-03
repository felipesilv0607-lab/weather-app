import {
    obterNomePais,
    formatarHora
} from "./utilitarios.js";

// ==============================
// Atualiza o fundo
// ==============================

export function atualizarFundo(clima) {

    const body = document.body;

    body.className = "";

    body.classList.add(clima.toLowerCase());

}

// ==============================
// Atualiza a tela
// ==============================

export function atualizarTela(dados) {

    atualizarFundo(dados.weather[0].main);

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