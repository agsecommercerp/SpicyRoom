function iniciarAviseMe() {
    // Se o nosso formulário já existe na tela, não faz nada
    if (document.querySelector('#custom-avise-me')) return;

    const outOfStockInput = document.querySelector('input.nostock[disabled], input[data-store="product-buy-button"][disabled]');

    if (outOfStockInput) {
        const colContainer = outOfStockInput.closest('.col-12');

        if (colContainer) {
            // Oculta completamente o botão original de esgotado
            outOfStockInput.style.display = 'none';

            const formHtml = `
                <div id="custom-avise-me" style="margin-top: 5px; margin-bottom: 15px; padding: 15px; background: #fdfbfb; border: 1px solid #e0e0e0; border-radius: 6px; font-family: inherit;">
                    <p style="margin-bottom: 8px; font-weight: 600; font-size: 14px; color: #333;">Produto esgotado! Deseja ser avisado quando voltar?</p>
                    <input type="email" id="avise-email" placeholder="Digite seu melhor e-mail" style="width: 100%; padding: 10px; margin-bottom: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
                    <button id="avise-submit" style="width: 100%; padding: 10px; background: #5a1827; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Quero ser avisado</button>
                    <span id="avise-msg" style="display:block; margin-top:8px; font-size:12px; color:#2d6a4f; text-align:center;"></span>
                </div>
            `;

            colContainer.insertAdjacentHTML('beforebegin', formHtml);

            const submitBtn = document.getElementById('avise-submit');
            if (submitBtn) {
                submitBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const emailInput = document.getElementById('avise-email').value;
                    const msgSpan = document.getElementById('avise-msg');
                    // Pega o nome do produto dinamicamente na página
                    const productName = document.querySelector('h1, h2.h4, .js-product-name')?.innerText || 'Produto Esgotado';

                    if (emailInput && emailInput.includes('@')) {
                        submitBtn.disabled = true;
                        submitBtn.innerText = 'Enviando...';

                        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUAWUAbYOlFbj764p6tuf69S94mDADZLlwurz7vUambAVpzl7u8g0myikAJmE4JAg/exec';

                        fetch(GOOGLE_SCRIPT_URL, {
                            method: 'POST',
                            mode: 'no-cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email: emailInput,
                                product: productName
                            })
                        }).then(() => {
                            msgSpan.style.color = '#2d6a4f';
                            msgSpan.innerText = 'E-mail cadastrado com sucesso! Avisaremos assim que repormos.';
                            // Correção do fechamento do colchete feita aqui:
                            document.getElementById('avise-email').value = '';
                            submitBtn.disabled = false;
                            submitBtn.innerText = 'Quero ser avisado';
                        }).catch(() => {
                            msgSpan.style.color = '#c9184a';
                            msgSpan.innerText = 'Ocorreu um erro. Tente novamente.';
                            submitBtn.disabled = false;
                            submitBtn.innerText = 'Quero ser avisado';
                        });

                    } else {
                        msgSpan.style.color = '#c9184a';
                        msgSpan.innerText = 'Por favor, insira um e-mail válido.';
                    }
                });
            }
        }
    }
}

// Executa a função imediatamente ao carregar
iniciarAviseMe();

// Observa o corpo da página para reativar caso o tema recarregue os elementos
const observer = new MutationObserver(() => {
    iniciarAviseMe();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});