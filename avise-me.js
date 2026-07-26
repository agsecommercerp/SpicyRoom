document.addEventListener("DOMContentLoaded", function() {
    // Localiza especificamente o input de esgotado do tema Rio
    const outOfStockInput = document.querySelector('input.js-prod-submit-form[disabled], input.nostock[disabled]');
    
    if (outOfStockInput && !document.querySelector('#custom-avise-me')) {
        // Encontra a div coluna pai para substituir ou inserir abaixo
        const colContainer = outOfStockInput.closest('.col-12');
        
        if (colContainer) {
            // Oculta o botão cinza original de "ESGOTADO"
            outOfStockInput.style.display = 'none';
            
            // Cria o bloco do formulário customizado com o design da loja
            const formHtml = `
                <div id="custom-avise-me" style="margin-top: 5px; padding: 15px; background: #fdfbfb; border: 1px solid #e0e0e0; border-radius: 6px; font-family: inherit; text-align: left;">
                    <p style="margin-bottom: 8px; font-weight: 600; font-size: 14px; color: #333;">Produto esgotado! Deseja ser avisado quando voltar?</p>
                    <input type="email" id="avise-email" placeholder="Digite seu melhor e-mail" style="width: 100%; padding: 10px; margin-bottom: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; font-size: 13px;">
                    <button id="avise-submit" style="width: 100%; padding: 10px; background: #5a1827; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Quero ser avisado</button>
                    <span id="avise-msg" style="display:block; margin-top:8px; font-size:12px; color:#2d6a4f; text-align:center;"></span>
                </div>
            `;
            
            colContainer.insertAdjacentHTML('beforeend', formHtml);
            
            // Ação do botão de envio
            document.getElementById('avise-submit').addEventListener('click', function(e) {
                e.preventDefault();
                const emailInput = document.getElementById('avise-email').value;
                const msgSpan = document.getElementById('avise-msg');
                
                if(emailInput && emailInput.includes('@')) {
                    // Feedback visual para o cliente
                    msgSpan.style.color = '#2d6a4f';
                    msgSpan.innerText = 'E-mail cadastrado com sucesso! Avisaremos assim que repormos.';
                    document.getElementById('avise-email').value = '';
                    
                    // Nota: Aqui é onde você plugará a URL do Webhook (Make/n8n/Planilha) para salvar o lead
                } else {
                    msgSpan.style.color = '#c9184a';
                    msgSpan.innerText = 'Por favor, insira um e-mail válido.';
                }
            });
        }
    }
});