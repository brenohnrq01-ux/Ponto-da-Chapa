const formulario = document.querySelector("#formulario-contato");
const botaoContato = document.querySelector("#botao-contato");
const retornoContato = document.querySelector("#retorno-contato");

if (formulario && botaoContato && retornoContato) {
  const nome = formulario.querySelector("#nome");
  const mensagem = formulario.querySelector("#mensagem");

  formulario.addEventListener("input", () => {
    nome.setCustomValidity("");
    mensagem.setCustomValidity("");
    retornoContato.textContent = "";
  });

  formulario.addEventListener("submit", (evento) => {
    // Impede o envio e o recarregamento da página.
    evento.preventDefault();

    nome.setCustomValidity(
      nome.value.trim().length < 2
        ? "Digite um nome com pelo menos 2 caracteres."
        : ""
    );

    mensagem.setCustomValidity(
      mensagem.value.trim().length < 10
        ? "Escreva uma mensagem com pelo menos 10 caracteres."
        : ""
    );

    if (!formulario.reportValidity()) {
      return;
    }

    retornoContato.textContent =
      "Teste concluído! Os campos estão válidos. " +
      "Nenhuma mensagem foi enviada ou armazenada.";
  });

  // Habilita o botão após configurar o comportamento de demonstração.
  botaoContato.disabled = false;
}
const avisoDemonstracao = document.querySelector("#aviso-demonstracao");
const textoDemonstracao = document.querySelector("#texto-demonstracao");
const botoesRedes = document.querySelectorAll("[data-rede]");

function mostrarDemonstracao(canal) {
  if (!avisoDemonstracao || !textoDemonstracao) {
    return;
  }

  textoDemonstracao.textContent =
  `O canal ${canal} ainda não está conectado. ` +
  "A Ponto da Chapa é uma empresa fictícia criada para este portfólio.";

  avisoDemonstracao.showModal();
}

botoesRedes.forEach((botao) => {
  botao.addEventListener("click", () => {
    mostrarDemonstracao(botao.dataset.rede);
  });
});

// Menu móvel
const botaoMenu = document.querySelector("#botao-menu");
const menuPrincipal = document.querySelector("#menu-principal");
const telaMovel = window.matchMedia("(max-width: 900px)");

if (botaoMenu && menuPrincipal) {
  function definirMenu(aberto) {
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    botaoMenu.textContent = aberto ? "Fechar menu" : "Menu";

    menuPrincipal.hidden = telaMovel.matches && !aberto;
  }

  function ajustarMenuParaTela() {
    const focoAtual = document.activeElement;

    botaoMenu.hidden = !telaMovel.matches;

    // No celular, começa fechado; no computador, fica visível.
    definirMenu(!telaMovel.matches);

    // Evita deixar o foco em um elemento que acabou de ser ocultado.
    if (telaMovel.matches && menuPrincipal.contains(focoAtual)) {
      botaoMenu.focus();
    } else if (!telaMovel.matches && focoAtual === botaoMenu) {
      menuPrincipal.querySelector("a").focus();
    }
  }

  botaoMenu.addEventListener("click", () => {
    const estaAberto =
      botaoMenu.getAttribute("aria-expanded") === "true";

    definirMenu(!estaAberto);
  });

  menuPrincipal.addEventListener("click", (evento) => {
    const link = evento.target.closest("a");

    if (!link || !telaMovel.matches) {
      return;
    }

    definirMenu(false);

    // Leva o foco para a seção escolhida.
    const destino = document.querySelector(link.getAttribute("href"));

    if (destino) {
      destino.setAttribute("tabindex", "-1");
      destino.focus({ preventScroll: true });
    }
  });

  document.addEventListener("keydown", (evento) => {
    const estaAberto =
      botaoMenu.getAttribute("aria-expanded") === "true";

    if (
      evento.key === "Escape" &&
      telaMovel.matches &&
      estaAberto
    ) {
      definirMenu(false);
      botaoMenu.focus();
    }
  });

  telaMovel.addEventListener("change", ajustarMenuParaTela);

  ajustarMenuParaTela();
}