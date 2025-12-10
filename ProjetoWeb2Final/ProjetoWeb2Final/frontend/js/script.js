// Endereço servidor (Backend)
const API_URL = "http://localhost:3000";

const ENDPOINT_USUARIOS = `${API_URL}/api/usuarios`;

// Elementos do HTML que será manipulado
const form = document.getElementById("form-transacao");
const tabelaCorpo = document.getElementById("tabela-corpo");
const saldoTexto = document.getElementById("saldo-texto");

// 1. Função para carregar a lista e o saldo
async function atualizarTela() {
  try {
    // Busca as transações (GET /api/usuarios)
    const respostaLista = await fetch(ENDPOINT_USUARIOS);
    const transacoes = await respostaLista.json(); // Busca o saldo (GET /api/usuarios/saldo)

    const respostaSaldo = await fetch(`${ENDPOINT_USUARIOS}/saldo`);
    const dadosSaldo = await respostaSaldo.json(); // Atualiza o HTML

    renderizarTabela(transacoes);
    saldoTexto.innerText = formatarMoeda(dadosSaldo.saldo); // Estilização do Saldo

    if (dadosSaldo.saldo >= 0) {
      saldoTexto.style.color = "#F0DB4F";
    } else {
      saldoTexto.style.color = "#ff6b6b";
    }
  } catch (erro) {
    console.error("Erro ao buscar dados:", erro); // Remove a mensagem de erro que ficava aparecendo
  }
}

// 2. Função para desenhar a tabela
function renderizarTabela(transacoes) {
  tabelaCorpo.innerHTML = "";

  transacoes.forEach((t) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `<td>${t.descricao}</td>
         <td>${formatarMoeda(t.valor)}</td>
         <td class="${t.tipo === "entrada" ? "tipo-entrada" : "tipo-saida"}">
      ${t.tipo.toUpperCase()}
        </td>
        <td>${formatarData(t.data)}</td>
        <td>
            <button class="btn-delete" onclick="deletarTransacao(${
              t.id
            })">Remover</button>
       </td>`;

    tabelaCorpo.appendChild(linha);
  });
}

// 3. Função para Adicionar (POST)
form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const novaTransacao = {
    descricao: document.getElementById("descricao").value,
    valor: document.getElementById("valor").value,
    tipo: document.getElementById("tipo").value,
    data: document.getElementById("data").value,
  };

  try {
    const resposta = await fetch(ENDPOINT_USUARIOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaTransacao),
    });

    if (resposta.ok) {
      form.reset();
      atualizarTela();
    } else {
      alert("Erro ao salvar transação.");
    }
  } catch (erro) {
    console.error(erro);
  }
});

// 4. Função para Remover (DELETE)
window.deletarTransacao = async (id) => {
  if (confirm("Tem certeza que deseja excluir?")) {
    try {
      await fetch(`${ENDPOINT_USUARIOS}/${id}`, {
        method: "DELETE",
      });
      atualizarTela();
    } catch (erro) {
      console.error("Erro ao deletar:", erro);
    }
  }
};

// Utilitários de Formatação
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function formatarData(dataISO) {
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

// Inicializa ao abrir a página
atualizarTela();
