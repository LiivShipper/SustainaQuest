class QuizModal {
constructor(questions, energia, onComplete) {
  this.questions = questions;
  this.energia = energia;
  this.currentQuestion = 0;
  this.score = 0;
  this.onComplete = typeof onComplete === "function" ? onComplete : () => {};
  this.container = null;
  this.render();
}

  render() {
    const existing = document.getElementById('quiz-modal');
    if (existing) existing.remove();

    this.container = document.createElement('div');
    this.container.id = 'quiz-modal';

    this.container.style.position = 'absolute';
    this.container.style.top = '50%';
    this.container.style.left = '50%';
    this.container.style.transform = 'translate(-50%, -50%)';
    this.container.style.padding = '20px';
    this.container.style.background = 'rgba(0, 0, 0, 0.85)';
    this.container.style.border = '2px solid #fff';
    this.container.style.borderRadius = '10px';
    this.container.style.zIndex = '1000';
    this.container.style.width = '400px';
    this.container.style.textAlign = 'left';
    this.container.style.fontFamily = 'Arial, sans-serif';
    this.container.style.color = '#fff';
    this.container.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.3)';

    document.body.appendChild(this.container);
    this.renderQuestion();
  }

  renderQuestion() {
    const q = this.questions[this.currentQuestion];
    this.container.innerHTML = '';

    const questionEl = document.createElement('p');
    questionEl.innerText = `(${this.currentQuestion + 1}/${this.questions.length}) ${q.pergunta}`;
    questionEl.style.fontWeight = 'bold';
    questionEl.style.fontSize = '18px';
    questionEl.style.marginBottom = '15px';
    this.container.appendChild(questionEl);

    q.opcoes.forEach((opcao, index) => {
      const btn = document.createElement('button');
      btn.innerText = opcao;

      btn.style.display = 'block';
      btn.style.margin = '10px 0';
      btn.style.padding = '10px 15px';
      btn.style.width = '100%';
      btn.style.background = '#444';
      btn.style.color = '#fff';
      btn.style.border = 'none';
      btn.style.borderRadius = '6px';
      btn.style.cursor = 'pointer';
      btn.style.fontSize = '16px';
      btn.style.transition = 'background-color 0.3s ease';

      btn.onmouseenter = () => btn.style.background = '#666';
      btn.onmouseleave = () => btn.style.background = '#444';

      btn.onclick = () => this.handleAnswer(index);

      this.container.appendChild(btn);
    });
  }

  handleAnswer(selectedIndex) {
    const atual = this.questions[this.currentQuestion];
    if (selectedIndex === atual.correta) {
      this.score++;
    }

    this.currentQuestion++;

    if (this.currentQuestion < this.questions.length) {
      this.renderQuestion();
    } else {
      this.endQuiz();
    }
  }

  endQuiz() {
    alert(`Quiz finalizado! Você acertou ${this.score} de ${this.questions.length}`);

    this.container.remove();

    const userId = 1; 
    const score = this.score;
    const energia = this.energia;

    fetch('save_score.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `user_id=${userId}&score=${score}&energia=${encodeURIComponent(energia)}`
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(' Pontuação salva com sucesso!');
      } else {
        alert(' Erro ao salvar pontuação: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro de conexão ao salvar pontuação.');
    });

    this.onComplete();
  }
}

export { QuizModal };
