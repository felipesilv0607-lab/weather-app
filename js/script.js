import {
    buscarClima,
    buscarPrevisao,
    buscarClimaCoordenadas,
    buscarPrevisaoCoordenadas
} from "./api.js";

import { atualizarTela } from "./clima.js";

import { renderizarPrevisao } from "./previsao.js";

//==============================
// Elementos do HTML
// ==============================

const inputCidade = document.getElementById("cidade");
const botaoBuscar = document.getElementById("buscar");
const botaoLocalizacao = document.getElementById("localizacao");
const loading = document.getElementById("loading");

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
// Busca por cidade
// ==============================

async function pesquisarCidade() {

    const cidade = inputCidade.value.trim();

    if (cidade === "") {

        alert("Digite uma cidade.");

        return;

    }

    mostrarLoading();

    try {

        const dadosClima = await buscarClima(cidade);

        atualizarTela(dadosClima);

        const dadosPrevisao = await buscarPrevisao(cidade);

        renderizarPrevisao(dadosPrevisao);

    } catch (erro) {

     console.error(erro);

        alert(erro.message);

    } finally {

        esconderLoading();

    }

}

// ==============================
// Busca por localização
// ==============================

function pesquisarLocalizacao() {

    if (!navigator.geolocation) {

        alert("Seu navegador não suporta geolocalização.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        async (posicao) => {

            mostrarLoading();

            try {

                const latitude = posicao.coords.latitude;
                const longitude = posicao.coords.longitude;

                const dadosClima =
                    await buscarClimaCoordenadas(latitude, longitude);

                atualizarTela(dadosClima);

                const dadosPrevisao =
                    await buscarPrevisaoCoordenadas(latitude, longitude);

                renderizarPrevisao(dadosPrevisao);

            } catch (erro) {

                alert(erro.message);

            } finally {

                esconderLoading();

            }

        },

        () => {

            alert("Não foi possível obter sua localização.");

        }

    );

}

// ==============================
// Eventos
// ==============================

botaoBuscar.addEventListener("click", pesquisarCidade);

inputCidade.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        pesquisarCidade();

    }

});

botaoLocalizacao.addEventListener("click", pesquisarLocalizacao);