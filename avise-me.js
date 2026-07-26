function iniciarAviseMe() {
    // Evita duplicar se já foi injetado
    if (document.querySelector('#custom-avise-me')) return;

    // Seletor cirúrgico baseado no HTML real da Nuvemshop
    const outOfStockInput = document.querySelector('input.nostock[disabled], input[data-store="product-buy-button"][disabled]');

    if (outOfStockInput) {
        // Encontra o container .col-12 pai do botão
        const colContainer = outOfStockInput.closest('.col-12');

        if (colContainer) {
            // Oculta completamente o botão "Esgotado" original
            outOfStockInput.style.display = 'none';

            // Cria o bloco do formulário customizado
            const formHtml = `
                <div id="custom-avise-me" style="margin-top: 5px; margin-bottom: 15px; padding: 15px; background: #fdfbfb; border: 1px solid #e0e0e0; border-radius: 6px; font-family: inherit;">
                    <p style="margin-bottom: 8px; font-weight: 600; font-size: 14px; color: #333;">Produto esgotado! Deseja ser avisado quando voltar?</p>
                    <input type="email" id="avise-email" placeholder="Digite seu melhor e-mail" style="width: 100%; padding: 10px; margin-bottom: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
                    <button id="avise-submit" style="width: 100%; padding: 10px; background: #5a1827; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Quero ser avisado</button>
                    <span id="avise-msg" style="display:block; margin-top:8px; font-size:12px; color:#2d6a4f; text-align:center;"></span>
                </div>
            `;

            // Insere o formulário logo acima do botão original
            colContainer.insertAdjacentHTML('beforebegin', formHtml);

            // Ação do botão de envio
            const submitBtn = document.getElementById('avise-submit');
            if (submitBtn) {
                submitBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const emailInput = document.getElementById('avise-email').value;
                    const msgSpan = document.getElementById('avise-msg');

                    if (emailInput && emailInput.includes('@')) {
                        msgSpan.style.color = '#2d6a4f';
                        msgSpan.innerText = 'E-mail cadastrado com sucesso! Avisaremos assim que repormos.';
                        document.getElementById('avise-email').value = '';
                    } else {
                        msgSpan.style.color = '#c9184a';
                        msgSpan.innerText = 'Por favor, insira um e-mail válido.';
                    }
                });
            }
        }
    }
}

// Observa mudanças dinâmicas na página (essencial para troca de variações)
const observer = new MutationObserver(() => {
    iniciarAviseMe();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Executa na carga inicial também
iniciarAviseMe();