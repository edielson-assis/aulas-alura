const formulario = document.querySelector("form");

const nome = document.querySelector("#nomesobrenome");
const email = document.querySelector("#email");
const telefone = document.querySelector("#telefone");
const mensagem = document.querySelector("#mensagem");
const horario = document.querySelector(".horario");

function verificar() {
	var receberNovidade = document.querySelector(".check");
	return receberNovidade.checked ? "Sim" : "Não";
}

function preferenciaContato() {
	var contato = document.querySelector('input[name="contato"]:checked').value;
	return contato == "email" ? "Email" : contato == "telefone" ? "Ligação" : "WhatsApp";
}

function cadastrar() {
    fetch("http://localhost:8080/usuarios",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                nomeSobrenome: nome.value,
                email: email.value,
                telefone: telefone.value,
                mensagem: mensagem.value,
				preferenciaContato: preferenciaContato(),
				horario: horario.value,
				receberNovidade: verificar()
            })
        }
    )
    .then (function(res) {console.log(res)})
    .catch (function(res) {console.log(res)})
};

function validaForm() {
    var campos = ["nomesobrenome", "email", "telefone", "mensagem"];
    var valores = [];

    for (var i = 0; i < campos.length; i++) valores.push(document.forms[0][campos[i]].value);
    valores.indexOf("") !== -1 ? alert("Por favor, preencha todos os campos") : alert("Dados enviados com sucesso!"); 
} 

function limpar() {
	nome.value = "";
	email.value = "";
	telefone.value = "";
	mensagem.value = "";
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
        
	validaForm();
    cadastrar(); 	
	limpar();
});