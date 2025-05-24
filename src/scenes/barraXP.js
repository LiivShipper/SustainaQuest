export function atualizarXP(porcentagem) {
    const fill = document.getElementById('xp-fill');
    if (fill) {
        fill.style.width = `${porcentagem}%`;
    } else {
        console.warn('Elemento xp-fill não encontrado!');
    }
}