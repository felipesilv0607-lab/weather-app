const BASE_URL = "http://localhost:3000";

// ==============================
// Clima por cidade
// ==============================

export async function buscarClima(cidade) {

    const res = await fetch(`${BASE_URL}/weather?city=${cidade}`);

    const dados = await res.json();

    if (!res.ok) {
        throw new Error(dados.error || "Erro ao buscar clima.");
    }

    return dados;
}

// ==============================
// Previsão por cidade
// ==============================

export async function buscarPrevisao(cidade) {

    const res = await fetch(`${BASE_URL}/forecast?city=${cidade}`);

    const dados = await res.json();

    if (!res.ok) {
        throw new Error(dados.error || "Erro ao buscar previsão.");
    }

    return dados;
}

// ==============================
// Clima por coordenadas
// ==============================

export async function buscarClimaCoordenadas(lat, lon) {

    const res = await fetch(
        `${BASE_URL}/weather-coords?lat=${lat}&lon=${lon}`
    );

    const dados = await res.json();

    if (!res.ok) {
        throw new Error(dados.error || "Erro ao buscar localização.");
    }

    return dados;
}

// ==============================
// Previsão por coordenadas
// ==============================

export async function buscarPrevisaoCoordenadas(lat, lon) {

    const res = await fetch(
        `${BASE_URL}/forecast-coords?lat=${lat}&lon=${lon}`
    );

    const dados = await res.json();

    if (!res.ok) {
        throw new Error(dados.error || "Erro ao buscar previsão.");
    }

    return dados;
}