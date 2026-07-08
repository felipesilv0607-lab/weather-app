// ==============================
// Converte o código do país
// ==============================

export function obterNomePais(codigoPais) {

    return new Intl.DisplayNames(
        ["pt-BR"],
        { type: "region" }
    ).of(codigoPais);

}

// ==============================
// Formata horário
// ==============================

export function formatarHora(timestamp) {

    return new Date(timestamp * 1000).toLocaleTimeString(
        "pt-BR",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}

// ==============================
// Formata o nome do dia
// ==============================

export function formatarDia(data) {

    const dias = [
        "Dom",
        "Seg",
        "Ter",
        "Qua",
        "Qui",
        "Sex",
        "Sáb"
    ];

    return dias[new Date(data).getDay()];

}