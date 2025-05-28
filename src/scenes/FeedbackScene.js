import { Scene } from 'phaser';

export class FeedbackScene extends Scene {
    constructor() {
        super('FeedbackScene');
    }

    create() {
        const feedback = document.createElement('div');
        feedback.id = 'painel-feedback';

        feedback.style.position = 'absolute';
        feedback.style.top = '50%';
        feedback.style.left = '50%';
        feedback.style.transform = 'translate(-50%, -50%)';
        feedback.style.padding = '20px';
        feedback.style.background = '#ffc979';
        feedback.style.border = '4px solid #b14e05';
        feedback.style.borderRadius = '10px';
        feedback.style.zIndex = '1000';
        feedback.style.width = '600px';
        feedback.style.textAlign = 'left';
        feedback.style.fontFamily = 'Poppins, sans-serif';
        feedback.style.color = '#56160c';
        feedback.style.boxShadow = '0 0 15px #d68f54';
        feedback.style.overflowY = 'auto';
        feedback.style.maxHeight = '80vh';

        feedback.innerHTML = `
        <style>
        #painel-feedback::-webkit-scrollbar {
            width: 10px;
            border-radius: 8px;
        }

        #painel-feedback::-webkit-scrollbar-track {
            background: #ffd8a6; /* Cor do fundo */
            border-radius: 8px;
        }

        #painel-feedback::-webkit-scrollbar-thumb {
            background-color: #d68f54; /* Cor do thumb */
            border-radius: 8px;
            border: 2px solid #ffd8a6; /* Borda para destacar */
        }

        #painel-feedback::-webkit-scrollbar-thumb:hover {
            background-color: #b14e05; /* Cor mais escura no hover */
        }
        </style>

        <h2 style="text-align:center; margin-bottom: 20px;">✨ Avalie sua experiência com o jogo sobre energias renováveis! ✨</h2>

        <div style="margin-bottom: 10px;">
            <p><strong>1. Compreensão do conteúdo: Após utilizar o website, como você avaliaria seu entendimento sobre energia renovável?</strong></p>
            <label><input type="radio" name="pergunta1" value="Muito melhor."> Muito melhor.</label><br>
            <label><input type="radio" name="pergunta1" value="Um pouco melhor."> Um pouco melhor.</label><br>
            <label><input type="radio" name="pergunta1" value="Sem mudanças."> Sem mudanças.</label><br>
        </div>

        <div style="margin-bottom: 10px;">
            <p><strong>2. Experiência de uso: Como foi sua experiência ao navegar pelo website e utilizes os quizzes?</strong></p>
            <label><input type="radio" name="pergunta2" value="Muito fácil e intuitivo."> Muito fácil e intuitivo.</label><br>
            <label><input type="radio" name="pergunta2" value="Razoável com poucos problemas."> Razoável com poucos problemas.</label><br>
        </div>

        <div style="margin-bottom: 10px;">
            <p><strong>3. Qualidade de conteúdo: O quiz ajudou a fixar os conceitos de forma divertida e educativa?</strong></p>
            <label><input type="radio" name="pergunta3" value="Sim, totalmente."> Sim, totalmente.</label><br>
            <label><input type="radio" name="pergunta3" value="Pouco."> Pouco.</label><br>
            <label><input type="radio" name="pergunta3" value="Não muito."> Não muito.</label><br>
        </div>

        <div style="margin-bottom: 10px;">
            <p><strong>4. Aparência e design: O visual do site e do quiz foi atrativo para você?</strong></p>
            <label><input type="radio" name="pergunta4" value="Muito bonito e agradável."> Muito bonito e agradável.</label><br>
            <label><input type="radio" name="pergunta4" value="Simples, mas funciona."> Simples, mas funciona.</label><br>
            <label><input type="radio" name="pergunta4" value="Poderia melhorar o visual atrativo."> Poderia melhorar o visual atrativo.</label><br>
            <label><input type="radio" name="pergunta4" value="Visual confuso e sem graça.
"> Visual confuso e sem graça.
</label><br>
        </div>
        
        <div style="margin-bottom: 10px;">
            <p><strong>5. Você recomendaria esse website para outras pessoas (estudantes, familiares, amigos)? </strong></p>
            <label><input type="radio" name="pergunta5" value="Com certeza."> Com certeza.</label><br>
            <label><input type="radio" name="pergunta5" value="Talvez na próxima."> Talvez na próxima.</label><br>
            <label><input type="radio" name="pergunta5" value="Provavelmente não."> Provavelmente não.</label><br>
        </div>

        <button id="enviar-feedback" 
      style="
        margin-top: 15px; 
        padding: 10px 25px; 
        background: #d68f54; 
        border: none; 
        border-radius: 8px; 
        color: #56160c; 
        font-size: 16px; 
        cursor: pointer; 
        transition: background 0.3s;
        display: block;
        margin-left: auto;
        margin-right: auto;
      ">
      Enviar feedback
    </button>
        `
        document.body.appendChild(feedback);

        document.getElementById('enviar-feedback').onclick = () => {
            const painelFeedback = document.getElementById('painel-feedback');
            if (painelFeedback) {
                painelFeedback.remove();
            }
            this.scene.start('FinalJogo');
        };
    }
}