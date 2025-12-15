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

//CREATE
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
});
