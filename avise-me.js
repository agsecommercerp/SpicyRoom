function iniciarAviseMe() {
    // Procura por input ou button de esgotado/desabilitado na página
    const outOfStockInput = document.querySelector('input.js-prod-submit-form[disabled], button.js-prod-submit-form[disabled], input.nostock[disabled], button.nostock[disabled], .js-prod-submit-form[disabled]');

    if (outOfStockInput && !document.querySelector('#custom-avise-me')) {
        // Encontra a coluna pai para substituir ou inserir abaixo
        const colContainer = outOfStockInput.closest('.col-12') || outOfStockInput.parentElement;

        if (colContainer) {
            // Oculta o botão cinza original de "ESGOTADO"
            outOfStockInput.style.display = 'none';

            // Cria o bloco do formulário customizado com o design da loja
            const formHtml = `
                <div id="custom-avise-me" style="margin-top: 5px; padding: 15px; background: #fdfbfb; border: 1px solid #e0e0e0; border-radius: 6px; font-family: inherit;">
                    <p style="margin-bottom: 8px; font-weight: 600; font-size: 14px; color: #333;">Produto esgotado! Deseja ser avisado quando voltar?</p>
                    <input type="email" id="avise-email" placeholder="Digite seu melhor e-mail" style="width: 100%; padding: 10px; margin-bottom: 8px; box-sizing: border-box;">
                    <button id="avise-submit" style="width: 100%; padding: 10px; background: #5a1827; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Quero ser avisado</button>
                    <span id="avise-msg" style="display:block; margin-top:8px; font-size:12px; color:#2d6a4f; text-align:center;"></span>
                </div>
            `;

            colContainer.insertAdjacentHTML('beforebegin', formHtml);

            // Ação do botão de envio
            document.getElementById('avise-submit').addEventListener('click', function(e) {
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

// Executa assim que o script carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarAviseMe);
} else {
    iniciarAviseMe();
}