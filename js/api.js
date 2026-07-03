// ==============================
// Configuração da API
// ==============================

const API_KEY = "e7e90ccea0d46b14f1c38e97c9e20c4f";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// ==============================
// Verifica se a API Key existe
// ==============================

function verificarApiKey() {

    if (!API_KEY) {

        throw new Error("Configure sua API Key.");

    }

}

// ==============================
// Verifica a resposta da API
// ==============================

function verificarResposta(resposta) {

    if (resposta.status === 401) {

        throw new Error("API Key inválida.");

    }

    if (resposta.status === 404) {

        throw new Error("Cidade não encontrada.");

    }

    if (!resposta.ok) {

        throw new Error("Não foi possível obter os dados do clima.");

    }

}

// ==============================
// Cria URL do clima por cidade
// ==============================

function criarUrlCidade(cidade) {

    return `${BASE_URL}/weather?q=${encodeURIComponent(cidade)}&appid=${API_KEY}&units=metric&lang=pt_br`;

}

// ==============================
// Cria URL da previsão
// ==============================

function criarUrlPrevisao(cidade) {

    return `${BASE_URL}/forecast?q=${encodeURIComponent(cidade)}&appid=${API_KEY}&units=metric&lang=pt_br`;

}

// ==============================
// Cria URL por coordenadas
// ==============================

function criarUrlCoordenadas(latitude, longitude) {

    return `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;

}

// ==============================
// Cria URL da previsão por coordenadas
// ==============================

function criarUrlPrevisaoCoordenadas(latitude, longitude) {

    return `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;

}

// ==============================
// Busca clima por cidade
// ==============================

export async function buscarClima(cidade) {

    verificarApiKey();

    const resposta = await fetch(criarUrlCidade(cidade));

    verificarResposta(resposta);

    return await resposta.json();

}

// ==============================
// Busca previsão por cidade
// ==============================

export async function buscarPrevisao(cidade) {

    verificarApiKey();

    const resposta = await fetch(criarUrlPrevisao(cidade));

    verificarResposta(resposta);

    return await resposta.json();

}

// ==============================
// Busca clima por coordenadas
// ==============================

export async function buscarClimaCoordenadas(latitude, longitude) {

    verificarApiKey();

    const resposta = await fetch(
        criarUrlCoordenadas(latitude, longitude)
    );

    verificarResposta(resposta);

    return await resposta.json();

}

// ==============================
// Busca previsão por coordenadas
// ==============================

export async function buscarPrevisaoCoordenadas(latitude, longitude) {

    verificarApiKey();

    const resposta = await fetch(
        criarUrlPrevisaoCoordenadas(latitude, longitude)
    );

    verificarResposta(resposta);

    return await resposta.json();

}