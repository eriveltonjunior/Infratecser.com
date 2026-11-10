


const NUMERO_WHATSAPP = "5579991132770";

const form = document.getElementById("form-agendamento");

if (!form) {
    console.error('agendamento.js: não achei <form id="form-agendamento"> no HTML.');
} else {
  
    let aviso = document.getElementById("aviso");
    if (!aviso) {
        aviso = document.createElement("p");
        aviso.id = "aviso";
        aviso.setAttribute("role", "status");
        aviso.setAttribute("aria-live", "polite");
        form.append(aviso);
    }

    
    form.noValidate = true;

    
    const idsObrigatorios = ["nome", "telefone", "servico", "endereco", "data", "horario"];
    const faltando = idsObrigatorios.filter((id) => !document.getElementById(id));
    if (faltando.length) {
        console.error("agendamento.js: faltam estes ids no HTML:", faltando.join(", "));
    }

    const campoData = document.getElementById("data");

    
    function hojeIso() {
        const d = new Date();
        const mes = String(d.getMonth() + 1).padStart(2, "0");
        const dia = String(d.getDate()).padStart(2, "0");
        return `${d.getFullYear()}-${mes}-${dia}`;
    }
    if (campoData) campoData.min = hojeIso();

    
    function formatarData(valorIso) {
        const [ano, mes, dia] = valorIso.split("-").map(Number);
        return new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    
function mostrarErro(campo, texto) {
        const campos = form.querySelectorAll("input, select, textarea");
        campos.forEach(c => c.classList.remove("erro"));
        if (campo) {
            campo.classList.add("erro");
            campo.focus();
        }
        aviso.style.color = "#ff4d4d";
        aviso.textContent = texto;
    }

    const camposFormulario = form.querySelectorAll("input, select, textarea");
    camposFormulario.forEach((campo) => {
        campo.addEventListener("input", () => {
            campo.classList.remove("erro");
            if (aviso.textContent && !document.querySelector(".erro")) {
                aviso.textContent = "";
            }
        });
        
        campo.addEventListener("change", () => {
            campo.classList.remove("erro");
        });
    });

    const inputHora = document.getElementById('horario');

    inputHora.addEventListener('change', function() {
     const valor = this.value;  
      if (valor >= '12:00' && valor <= '13:00') {
       alert('Este horário está bloqueado para almoço.');
       this.value = '';
     }
    });
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nome = document.getElementById("nome");
        const telefone = document.getElementById("telefone");
        const servico = document.getElementById("servico");
        const endereco = document.getElementById("endereco");
        const horario = document.getElementById("horario");
        const observacoes = document.getElementById("observacoes");

        if (faltando.length) {
            return mostrarErro(null, "Formulário incompleto: faltam campos no HTML (veja o console).");
        }
        if (!nome.value.trim()) return mostrarErro(nome, "Informe o seu nome completo.");
        if (telefone.value.replace(/\D/g, "").length < 10) {
            return mostrarErro(telefone, "Informe um telefone com DDD.");
        }
        if (!servico.value) return mostrarErro(servico, "Escolha o tipo de serviço.");
        if (!endereco.value.trim()) return mostrarErro(endereco, "Informe o endereço do atendimento.");
        if (!campoData.value) return mostrarErro(campoData, "Escolha a data desejada.");
        if (campoData.value < hojeIso()) return mostrarErro(campoData, "Escolha uma data a partir de hoje.");
        if (!horario.value) return mostrarErro(horario, "Escolha o horário desejado.");

        const linhas = [
            "Olá! Quero solicitar um atendimento.",
            `Nome: ${nome.value.trim()}`,
            `Telefone: ${telefone.value.trim()}`,
            `Serviço: ${servico.value}`,
            `Endereço: ${endereco.value.trim()}`,
            `Data: ${formatarData(campoData.value)}`,
            `Horário: ${horario.value}`,
        ];
        if (observacoes && observacoes.value.trim()) {
            linhas.push(`Observações: ${observacoes.value.trim()}`);
        }

        const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(linhas.join("\n"))}`;

       
        const janela = window.open(url, "_blank");
        if (janela) {
            janela.opener = null;
            aviso.textContent = "Abrimos o WhatsApp com os seus dados. É só enviar a mensagem.";
            form.reset();
        } else {
            window.location.href = url;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const botaoMenu = document.getElementById("botao-menu");
    const menu = document.getElementById("menu");

    if (!botaoMenu || !menu) {
        console.error("Erro: Botão do menu ou elemento nav não encontrado no HTML!");
        return;
    }

    const icone = botaoMenu.querySelector("i");

    function definirMenu(aberto) {
        menu.classList.toggle("aberto", aberto);
        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        
        if (icone) {
            icone.classList.toggle("fa-bars", !aberto);
            icone.classList.toggle("fa-xmark", aberto);
        }
    }

    botaoMenu.addEventListener("click", () => {
        const estaAberto = menu.classList.contains("aberto");
        definirMenu(!estaAberto);
    });

    menu.addEventListener("click", (evento) => {
        if (evento.target.closest("a")) {
            definirMenu(false);
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            definirMenu(false);
        }
    });

    window.matchMedia("(min-width: 1101px)").addEventListener("change", (e) => {
        if (e.matches) {
            definirMenu(false);
        }
    });
});

const botaoAgendamentoSlider = document.getElementById("botao-agendamento");
if (botaoAgendamentoSlider) {
    botaoAgendamentoSlider.addEventListener("click", () => {
        const secaoAgendamento = document.getElementById("agendamento");
        if (secaoAgendamento) {
            secaoAgendamento.scrollIntoView({ behavior: "smooth" });
        }
    });
}

    function mostrarErro(campo, texto) {
        const campos = form.querySelectorAll("input, select, textarea");
        campos.forEach(c => c.classList.remove("erro"));

        if (campo) {
            campo.classList.add("erro");
            campo.focus();
        }

        aviso.style.color = "#ff4d4d";
        aviso.textContent = texto;
    }