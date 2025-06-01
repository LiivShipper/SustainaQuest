export function atualizarXP(porcentagem) {
    const fill = document.getElementById('xp-fill');
    if (fill) {
        fill.style.width = `${porcentagem}%`;
    } else {
        console.warn('Elemento xp-fill não encontrado!');
    }
}

export function atualizarVisibilidadeXP(cenaAtual) {
    const barra = document.getElementById('xp-bar');
    if (!barra) {
        console.warn('Elemento xp-bar não encontrado!');
        return;
    }

    if (cenaAtual === 'game') {
        barra.style.display = 'block';
    } else {
        barra.style.display = 'none';
    }
}