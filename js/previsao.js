import { formatarDia } from "./utilitarios.js";

// ==============================
// Renderiza a previsão dos próximos dias
// ==============================

export function renderizarPrevisao(dados) {

    const container = document.getElementById("previsao-container");

    // Limpa a previsão anterior
    container.innerHTML = "";

    // Filtra apenas uma previsão por dia (12:00)
    const previsoes = dados.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
    );

    previsoes.forEach((item) => {

        const card = document.createElement("div");
        card.classList.add("card-previsao");

        const dia = document.createElement("h3");
        dia.textContent = formatarDia(item.dt_txt);

        const icone = document.createElement("img");
        icone.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        icone.alt = item.weather[0].description;

        const temperatura = document.createElement("p");
        temperatura.textContent = `${Math.round(item.main.temp)}°C`;

        const descricao = document.createElement("p");
        descricao.textContent = item.weather[0].description;

        card.appendChild(dia);
        card.appendChild(icone);
        card.appendChild(temperatura);
        card.appendChild(descricao);

        container.appendChild(card);

    });

}