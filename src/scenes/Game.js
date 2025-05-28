import { Scene } from 'phaser';
import { quizData } from './quizData.js';
import { QuizModal } from './QuizModal.js';
import { atualizarXP } from './barraXP.js';

export class Game extends Scene {
    constructor() {
        super('Game');
        this.player = null;
        this.cursors = null;
        this.usuario = null;
    }

    preload() {
        this.load.image('tiles', 'assets/tilesets.png');
        this.load.tilemapTiledJSON('mapa', 'assets/sustainaQuest.json');
        this.load.spritesheet('player', 'assets/player.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    create() {
        this.input.setDefaultCursor('default');
        this.textures.get('tiles').setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.xpAtual = 0;
        this.energiasRespondidas = new Set();
        this.pontuacoesPorEnergia = {};
        this.totalPontuacao = 0;


        this.usuario = this.obterUsuario();

        const mapa = this.make.tilemap({ key: 'mapa' });
        mapa.setRenderOrder('right-down');
        const tileset = mapa.addTilesetImage('tilesets', 'tiles');

        const nomesCamadas = [
            'grama',
            'agua',
            'vila',
            'energiaEolica',
            'energiaHidreletrica',
            'energiaMaremotriz',
            'energiaBiomassa',
            'energiaHidrogenio',
            'energiaSolar',
            'energiaGeotermica',
            'porBaixo'
        ];

        const camadas = nomesCamadas.map(nome => mapa.createLayer(nome, tileset, 0, 0));
        const camadaPorBaixo = camadas.find(layer => layer.layer.name === 'porBaixo');
        if (camadaPorBaixo) camadaPorBaixo.setDepth(10);

        const spawnPoint = mapa.findObject('player', obj => obj.name === 'spawnPoint');
        this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player").setScale(2);
        this.player.body.setSize(14, 12);
        this.player.body.setOffset(9, 20);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        camadas.forEach(camada => {
            camada.setCollisionByProperty({ colider: true });
            this.physics.add.collider(this.player, camada);
        });

        this.criarAnimacoes();

        const camera = this.cameras.main;
        camera.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
        camera.startFollow(this.player);
        camera.setZoom(1.5);

        const energias = [
            'energiaEolica',
            'energiaHidreletrica',
            'energiaMaremotriz',
            'energiaBiomassa',
            'energiaHidrogenio',
            'energiaSolar',
            'energiaGeotermica',
        ];

        this.input.on('pointermove', pointer => {
            let encontrouTile = false;

            for (const nome of energias) {
                const camadaEnergia = camadas.find(layer => layer.layer.name === nome);
                if (!camadaEnergia) continue;

                const tile = camadaEnergia.getTileAtWorldXY(pointer.worldX, pointer.worldY);
                if (tile) {
                    encontrouTile = true;
                    break;
                }
            }

            if (encontrouTile) {
                this.input.setDefaultCursor('pointer');
            } else {
                this.input.setDefaultCursor('default');
            }
        });

        this.input.on('pointerdown', pointer => {
            for (const nome of energias) {
                const camadaEnergia = camadas.find(layer => layer.layer.name === nome);
                if (!camadaEnergia) continue;

                const tile = camadaEnergia.getTileAtWorldXY(pointer.worldX, pointer.worldY);
                if (tile) {
                    this.mostrarInfoEnergia(nome);
                    break;
                }
            }
        });

        atualizarXP(this.xpAtual);
        this.acertouPergunta();
    }

    obterUsuario() {
        let usuario = localStorage.getItem('usuarioId');
        if (!usuario) {
            usuario = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
            localStorage.setItem('usuarioId', usuario);
        }
        return usuario;
    }

    acertouPergunta() {
        this.xpAtual += 0;
        if (this.xpAtual > 100) this.xpAtual = 100;
        atualizarXP(this.xpAtual);
    }

    update() {
        if (!this.cursors || !this.player || !this.keys) return;

        const prevVelocity = this.player.body.velocity.clone();
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown || this.keys.left.isDown) {
            this.player.body.setVelocityX(-150);
            this.player.anims.play('esquerda', true);
            this.player.setFlipX(false);
        } else if (this.cursors.right.isDown || this.keys.right.isDown) {
            this.player.body.setVelocityX(150);
            this.player.anims.play('direita', true);
            this.player.setFlipX(false);
        }
        else if (this.cursors.up.isDown || this.keys.up.isDown) {
            this.player.body.setVelocityY(-150);
            this.player.anims.play('tras', true);
        } else if (this.cursors.down.isDown || this.keys.down.isDown) {
            this.player.body.setVelocityY(150);
            this.player.anims.play('frente', true);
        } else {
            this.player.anims.stop();
            this.definirFrameParado(prevVelocity);
        }
    }

    criarAnimacoes() {
        this.anims.create({
            key: 'frente',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'tras',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'direita',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'esquerda',
            frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23 }),
            frameRate: 10,
            repeat: -1
        });
    }

    definirFrameParado(velocidade) {
        if (velocidade.x < 0) {
            this.player.setFrame(21);
        } else if (velocidade.x > 0) {
            this.player.setFrame(14);
        } else if (velocidade.y < 0) {
            this.player.setFrame(8);
        } else if (velocidade.y > 0) {
            this.player.setFrame(5);
        }
    }

    mostrarInfoEnergia(nome) {
        const chaveQuiz = {
            energiaEolica: 'eolica',
            energiaHidreletrica: 'hidreletrica',
            energiaMaremotriz: 'maremotriz',
            energiaBiomassa: 'biomassa',
            energiaHidrogenio: 'hidrogenio',
            energiaSolar: 'solar',
            energiaGeotermica: 'geotermica'
        }[nome];

        if (this.energiasRespondidas.has(chaveQuiz)) {
            const existingModal = document.getElementById('quiz-modal');
            if (existingModal) existingModal.remove();

            const container = document.createElement('div');
            container.id = 'quiz-modal';
            container.style.position = 'absolute';
            container.style.top = '50%';
            container.style.left = '50%';
            container.style.transform = 'translate(-50%, -50%)';
            container.style.padding = '20px';
            container.style.background = '#ffc979';
            container.style.border = '4px solid #b14e05';
            container.style.borderRadius = '10px';
            container.style.zIndex = '1000';
            container.style.width = '400px';
            container.style.textAlign = 'center';
            container.style.fontFamily = 'Poppins, sans-serif';
            container.style.color = '#56160c';
            container.style.boxShadow = '0 0 15px #d68f54';

            const mensagem = document.createElement('p');
            mensagem.innerText = 'Você já respondeu essa energia!';
            mensagem.style.fontWeight = 'bold';
            mensagem.style.fontSize = '18px';
            mensagem.style.marginBottom = '20px';

            const fecharBtn = document.createElement('button');
            fecharBtn.innerText = 'Fechar';
            fecharBtn.style.padding = '10px 20px';
            fecharBtn.style.background = '#b14e05';
            fecharBtn.style.color = '#fff';
            fecharBtn.style.border = 'none';
            fecharBtn.style.borderRadius = '6px';
            fecharBtn.style.cursor = 'pointer';
            fecharBtn.onclick = () => container.remove();

            container.appendChild(mensagem);
            container.appendChild(fecharBtn);
            document.body.appendChild(container);

            return;
        }

        const perguntas = quizData[chaveQuiz];
        if (!perguntas) return;

        new QuizModal(perguntas, chaveQuiz, (pontuacaoQuiz) => {
            this.energiasRespondidas.add(chaveQuiz);
            this.pontuacoesPorEnergia[chaveQuiz] = pontuacaoQuiz;
            this.totalPontuacao += pontuacaoQuiz;

            this.xpAtual += (pontuacaoQuiz / 21) * 100;
            if (this.xpAtual > 100) this.xpAtual = 100;

            atualizarXP(this.xpAtual);

            if (this.energiasRespondidas.size === 7) {
                this.mostrarResultadoFinal();
                this.enviarPontuacaoFinal();
            }
        });
    }

    mostrarResultadoFinal() {
        const totalPerguntas = 21;
        const acertadas = this.totalPontuacao || 0;
        const percentual = ((acertadas / totalPerguntas) * 100).toFixed(2);

        let mensagem = '';
        if (percentual >= 80) {
            mensagem = '🎉 Aprender sobre energia renovável, te enche de determinação!';
        } else if (percentual >= 50) {
            mensagem = '👍 Muito bem! Continue assim!';
        } else {
            mensagem = '💡 Não desista do seu aprendizado! Você pode melhorar!';
        }

        const final = document.createElement('div');
        final.id = 'resultado-final';

        final.style.position = 'absolute';
        final.style.top = '50%';
        final.style.left = '50%';
        final.style.transform = 'translate(-50%, -50%)';
        final.style.padding = '20px';
        final.style.background = '#ffc979';
        final.style.border = '4px solid #b14e05';
        final.style.borderRadius = '10px';
        final.style.zIndex = '1000';
        final.style.width = '450px';
        final.style.textAlign = 'center';
        final.style.fontFamily = 'Poppins, sans-serif';
        final.style.color = '#56160c';
        final.style.boxShadow = '0 0 15px #d68f54';

        final.innerHTML = `
  <div style="text-align: center; font-family: Poppins, sans-serif; color: #56160c;">
    <h2 style="margin-bottom: 10px;">Fim do jogo!</h2>
    <p style="font-size: 18px; margin: 8px 0;">Você completou o jogo com <strong>${percentual}%</strong> de acertos.</p>
    <p style="font-size: 18px; margin: 8px 0;">Você acertou <strong>${acertadas}</strong> de <strong>${totalPerguntas}</strong> perguntas.</p>
    <p style="font-size: 18px; margin: 15px 0;">${mensagem}</p>
    <button id="fechar-final" 
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
      ">
      Fechar
    </button>
  </div>
`;

        document.body.appendChild(final);

        document.getElementById('fechar-final').onclick = () => {
            final.remove();
            this.scene.start('FeedbackScene');
        };
    }

    enviarPontuacaoFinal() {
        const usuario = this.usuario;
        const pontuacoes = this.pontuacoesPorEnergia;
        const pontuacao_total = this.totalPontuacao;

        fetch('http://localhost:8081/sustainaquest/backend/salvar_pontuacao.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, pontuacoes, pontuacao_total }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log('Pontuações salvas corretamente');
                } else {
                    console.error('Erro ao salvar pontuações', data.message);
                }
            })
            .catch(err => console.error('Erro na solicitação:', err));
    }
}
