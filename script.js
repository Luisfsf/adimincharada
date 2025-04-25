let charadas = [];
let idAtual = 1;
let idEditando = null;

function atualizarLista() {
  const lista = document.getElementById('listaCharadas');
  lista.innerHTML = '';

  charadas.forEach(charada => {
    const div = document.createElement('div');
    div.className = 'charada-item';
    div.innerHTML = `
      <p><strong>Pergunta:</strong> ${charada.pergunta}</p>
      <p><strong>Resposta:</strong> ${charada.resposta}</p>
      <p><strong>Id:</strong> ${charada.id}</p>
      <div class="botoes">
        <button class="orange" onclick="editar(${charada.id})">Editar</button>
        <button class="red" onclick="excluir(${charada.id})">Excluir</button>
      </div>
    `;
    lista.appendChild(div);
  });

  document.getElementById('totalCharadas').textContent = charadas.length;
}

function adicionar() {
  const pergunta = document.getElementById('pergunta').value.trim();
  const resposta = document.getElementById('resposta').value.trim();

  if (!pergunta || !resposta) {
    alert('Preencha todos os campos.');
    return;
  }

  const novaCharada = {
    id: idAtual++,
    pergunta,
    resposta
  };

  charadas.push(novaCharada);
  document.getElementById('pergunta').value = '';
  document.getElementById('resposta').value = '';

  atualizarLista();
}

function editar(id) {
  const charada = charadas.find(c => c.id === id);
  if (!charada) return;

  idEditando = id;

  document.getElementById('editarPergunta').value = charada.pergunta;
  document.getElementById('editarResposta').value = charada.resposta;

  document.getElementById('adicionarCharada').classList.add('hidden');
  document.getElementById('editarCharada').classList.remove('hidden');
}

function salvarEdicao() {
  const pergunta = document.getElementById('editarPergunta').value.trim();
  const resposta = document.getElementById('editarResposta').value.trim();

  if (!pergunta || !resposta) {
    alert('Preencha todos os campos.');
    return;
  }

  const index = charadas.findIndex(c => c.id === idEditando);
  if (index === -1) return;

  charadas[index].pergunta = pergunta;
  charadas[index].resposta = resposta;

  idEditando = null;

  document.getElementById('editarCharada').classList.add('hidden');
  document.getElementById('adicionarCharada').classList.remove('hidden');

  atualizarLista();
}

function cancelarEdicao() {
  idEditando = null;
  document.getElementById('editarCharada').classList.add('hidden');
  document.getElementById('adicionarCharada').classList.remove('hidden');
}

function excluir(id) {
  charadas = charadas.filter(c => c.id !== id);
  atualizarLista();
}
