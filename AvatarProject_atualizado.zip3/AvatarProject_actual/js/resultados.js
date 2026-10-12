const API = 'http://localhost:3000';

const corpo = document.querySelector('#corpoTabela');
const modal = document.querySelector('#modalEditar');
const formEditar = document.querySelector('#formEditar');
const camposRespostas = document.querySelector('#camposRespostas');

let resultados = [];   // registros que vieram do banco
let idEditando = null; // id do registro que está sendo editado
const idDestaque = sessionStorage.getItem('resultadoId'); // registro recém-salvo pelo quiz

document.querySelector('#btnAtualizarLista').addEventListener('click', carregar);
document.querySelector('#btnCancelarEdicao').addEventListener('click', () => modal.close());
formEditar.addEventListener('submit', salvarEdicao);

// cria os 10 selects (q1..q10) da janela de edição
for (let i = 1; i <= 10; i++) {
    camposRespostas.innerHTML += `
        <label>Q${i}
            <select name="q${i}">
                <option value="">—</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
        </label>`;
}

carregar();

// listar/GET
async function carregar() {
    try {
        const resp = await fetch(API + '/resultado');
        resultados = await resp.json();
        desenhar();
    } catch (erro) {
        corpo.innerHTML = '<tr><td colspan="8">Não foi possível carregar. O servidor e o MySQL estão ligados?</td></tr>';
    }
}

function desenhar() {
    corpo.innerHTML = '';

    if (resultados.length === 0) {
        corpo.innerHTML = '<tr><td colspan="8">Nenhum resultado salvo ainda.</td></tr>';
        return;
    }

    for (const r of resultados) {
        corpo.innerHTML += `
            <tr class="${r.id == idDestaque ? 'destaque' : ''}">
                <td>${r.id}</td>
                <td>${r.nome}</td>
                <td>${r.email}</td>
                <td>${r.data_nascimento}</td>
                <td>${r.sexo}</td>
                <td>${r.resultado}</td>
                <td>${textoRespostas(r)}</td>
                <td>
                    <button class="btn-acao btn-editar" onclick="abrirEdicao(${r.id})">Editar</button>
                    <button class="btn-acao btn-excluir" onclick="excluir(${r.id})">Excluir</button>
                </td>
            </tr>`;
    }
}

// junta q1..q10 num texto: "q1:B q2:C ..."
function textoRespostas(r) {
    let texto = '';
    for (let i = 1; i <= 10; i++) {
        if (r['q' + i]) {
            texto += 'q' + i + ':' + r['q' + i] + ' ';
        }
    }
    return texto || '—';
}

// excluir/DELETE
async function excluir(id) {
    if (!confirm('Excluir o resultado ' + id + '?')) return;

    const resp = await fetch(API + '/resultado/' + id, { method: 'DELETE' });
    const dados = await resp.json();

    alert(dados.mensagem || dados.erro);
    carregar();
}

// editar/PUT abre a janela com os dados do registro
function abrirEdicao(id) {
    const r = resultados.find(x => x.id === id);
    idEditando = id;

    formEditar.nome.value = r.nome;
    formEditar.email.value = r.email;
    formEditar.data_nascimento.value = r.data_nascimento;
    formEditar.sexo.value = r.sexo;
    formEditar.resultado.value = r.resultado;

    for (let i = 1; i <= 10; i++) {
        formEditar['q' + i].value = r['q' + i] || '';
    }

    modal.showModal();
}

// editar/PUT, envia o que foi alterado
async function salvarEdicao(evento) {
    evento.preventDefault();

    const corpoReq = {
        nome: formEditar.nome.value,
        email: formEditar.email.value,
        data_nascimento: formEditar.data_nascimento.value,
        sexo: formEditar.sexo.value,
        resultado: formEditar.resultado.value
    };

    for (let i = 1; i <= 10; i++) {
        corpoReq['q' + i] = formEditar['q' + i].value || null;
    }

    const resp = await fetch(API + '/resultado/' + idEditando, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpoReq)
    });
    const dados = await resp.json();

    modal.close();
    alert(dados.mensagem || dados.erro);
    carregar();
}