const form = document.getElementById("form-cliente");
const tabela = document.getElementById("tabela-clientes");
const modalEditar = document.getElementById("modal-editar");
const modalExcluir = document.getElementById("modal-excluir");

const inputNome = document.getElementById("nome");
const inputSobrenome = document.getElementById("sobrenome");
const inputCpf = document.getElementById("cpf");
const inputEmail = document.getElementById("email");

const inputEditNome = document.getElementById("edit-nome");
const inputEditSobrenome = document.getElementById("edit-sobrenome");
const inputEditCpf = document.getElementById("edit-cpf");
const inputEditEmail = document.getElementById("edit-email");

const formEdicao = document.getElementById("form-edicao");
const btnCancelarEdicao = document.getElementById("cancelar-edicao");
const btnConfirmarExclusao = document.getElementById("confirmar-exclusao");
const btnCancelarExclusao = document.getElementById("cancelar-exclusao");

let clientes = [];
let indexEditando = null;
let indexEcluindo = null;

console.log(inputNome);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = inputNome.value;
  const sobrenome = inputSobrenome.value;
  const cpf = inputCpf.value;
  const email = inputEmail.value;

  if (!nome || !sobrenome || !cpf || !email) {
    alert("Preencha todos os campos");
    return;
  }

  const cliente = {
    nome,
    sobrenome,
    cpf,
    email,
  };

  clientes.push(cliente);

  inputNome.value = "";
  inputSobrenome.value = "";
  inputCpf.value = "";
  inputEmail.value = "";

  localStorage.setItem("clientes", JSON.stringify(clientes));
  renderizarTabela();
});

function renderizarTabela() {
  tabela.innerHTML = "";

  clientes = JSON.parse(localStorage.getItem("clientes"));
  clientes.forEach((cliente, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.sobrenome}</td>
        <td>${cliente.cpf}</td>
        <td>${cliente.email}</td>
    `;

    const tdAcoes = document.createElement("td");
    tdAcoes.classList.add("acoes");

    const btnEditar = document.createElement("button");
    const btnExcluir = document.createElement("button");

    btnEditar.classList.add("editar");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => abrirModalEditar(cliente, index);

    btnExcluir.classList.add("excluir");
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = () => abrirModalExcluir(index);

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    tabela.appendChild(tr);
  });
}

function abrirModalEditar(cliente, index) {
  inputEditNome.value = cliente.nome;
  inputEditSobrenome.value = cliente.sobrenome;
  inputEditCpf.value = cliente.cpf;
  inputEditEmail.value = cliente.email;

  indexEditando = index;

  modalEditar.style.display = "flex";
}

function abrirModalExcluir(index) {
  indexEcluindo = index;
  modalExcluir.style.display = "flex";
}

formEdicao.addEventListener("submit", (event) => {
  event.preventDefault();

  const cliente = {
    nome: inputEditNome.value,
    sobrenome: inputEditSobrenome.value,
    cpf: inputEditCpf.value,
    email: inputEditEmail.value,
  };

  clientes[indexEditando] = cliente;

  localStorage.setItem("clientes", JSON.stringify(clientes));

  fecharModalEditar();

  renderizarTabela();
});

function fecharModalEditar() {
  indexEditando = null;
  modalEditar.style.display = "none";
}

function fecharModalExcluir() {
  indexEcluindo = null;
  modalExcluir.style.display = "none";
}

btnCancelarEdicao.addEventListener("click", fecharModalEditar);
btnCancelarExclusao.addEventListener("click", fecharModalExcluir);

function confirmarExclusao() {
  clientes.splice(indexEcluindo, 1);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  renderizarTabela();
  fecharModalExcluir();
}

btnConfirmarExclusao.addEventListener("click", confirmarExclusao);

renderizarTabela();
