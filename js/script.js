let cards = document.querySelector(".cards");
let overlay = document.getElementById("galeriaOverlay");
let fotoAtual = document.getElementById("fotoAtual");
let fecharOverlay = document.getElementById("fecharOverlay");
let indicadores = document.getElementById("indicadores");
let setaAnterior = document.getElementById("setaAnterior");
let setaProxima = document.getElementById("setaProxima");
let busca = document.getElementById("busca");
let naoEncontrado = document.querySelector(".nao-encontrado");

let galeriaAtual = [];
let indexAtual = 0;
let listaAtual = []; // Lista que será usada para manter os itens exibidos

let pecas = [
    {
        img: "imagens/pecas/tapete-azul-01.jpg",
        titulo: "Tapete oval azul-escuro",
        valor: "R$ 50,00",
        galeria: [
            "imagens/pecas/tapete-azul-01.jpg",
            "imagens/pecas/tapete-azul02.jpg",
            "imagens/pecas/tapete-azul03.jpg",
            "imagens/pecas/tapete-azul04.jpg",
            "imagens/pecas/tapete-azul05.jpg",
        ]
    },
    {
        img: "imagens/pecas/conjunto-tapete-rosa1.jpg",
        titulo: "Kit de tapete oval branco com rosa",
        valor: "R$ 150,00",
        galeria: [
            "imagens/pecas/conjunto-tapete-rosa1.jpg",
            "imagens/pecas/trio de tapete02.jpg",
            "imagens/pecas/trio de tapete 03.jpg"
        ]
    },
    {
        img: "imagens/pecas/1.jpg",
        titulo: "Trilho de mesa Azul-marinho",
        valor: "R$ 250,00",
        galeria: [
            "imagens/pecas/1.jpg",
            "imagens/pecas/2.jpg"
        ]
    },
    {
        img: "imagens/pecas/3.jpg",
        titulo: "Tapete oval azul-claro lindo",
        valor: "R$ 50,00",
        galeria: [
            "imagens/pecas/3.jpg"
        ]
    },
    {
        img: "imagens/pecas/tapete-rosa.jpg",
        titulo: "Tapete oval branco com rosa",
        valor: "R$ 50,00",
        galeria: [
            "imagens/pecas/tapete-rosa.jpg",
            "imagens/pecas/tapete-rosa02.jpg",
            "imagens/pecas/tapete-rosa03.jpg"
        ]
    },
    {
        img: "imagens/pecas/4.jpg",
        titulo: "Suplar 4 peças verde escuro",
        valor: "R$ 60,00",
        galeria: [
            "imagens/pecas/4.jpg",
            "imagens/pecas/5.jpg"
        ]
    }
];

// Função que cria os cards (usada para mostrar todos ou os filtrados)
function renderizarCards(lista) {
    listaAtual = lista; // Atualiza a lista exibida
    cards.innerHTML = "";
    lista.forEach((p, index) => {
        cards.innerHTML += `
            <div class="peca">
                <img src="${p.img}" alt="foto da peça de crochê" class="img-pecas">
                <div class="informacoes-da-peca">
                    <h3 class="titulo">${p.titulo}</h3>
                    <div class="valor-e-btn">
                        <span class="valor"><strong>${p.valor}</strong></span>
                        <button class="btn-link" data-index="${index}">Ver mais...</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Exibe todos os cards ao carregar
renderizarCards(pecas);

//  Filtro de busca
busca.addEventListener("input", () => {
    let termos = busca.value.toLowerCase().split(" ").filter(p => p !== "");

    let resultado = pecas.filter(p => {
        let titulo = p.titulo.toLowerCase();
        return termos.every(palavra => titulo.includes(palavra));
    });

    if (resultado.length > 0) {
        renderizarCards(resultado);
        naoEncontrado.innerHTML = "";
    } else {
        cards.innerHTML = "";
        naoEncontrado.innerHTML = "Nenhuma peça encontrada.";
    }
});


document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-link")) {
        let index = e.target.getAttribute("data-index");
        galeriaAtual = listaAtual[index].galeria;
        indexAtual = 0;
        atualizarGaleria();
        overlay.style.display = "flex";
    }
});


fecharOverlay.addEventListener("click", () => {
    overlay.style.display = "none";
});


function atualizarGaleria() {
    fotoAtual.src = galeriaAtual[indexAtual];
    indicadores.innerHTML = "";

    galeriaAtual.forEach((foto, i) => {
        let bolinha = document.createElement("span");
        bolinha.classList.toggle("ativo", i === indexAtual);
        bolinha.addEventListener("click", () => {
            indexAtual = i;
            atualizarGaleria();
        });
        indicadores.appendChild(bolinha);
    });
}

// Seta para próxima imagem
setaProxima.addEventListener("click", () => {
    indexAtual = (indexAtual + 1) % galeriaAtual.length;
    atualizarGaleria();
});

// Seta para imagem anterior
setaAnterior.addEventListener("click", () => {
    indexAtual = (indexAtual - 1 + galeriaAtual.length) % galeriaAtual.length;
    atualizarGaleria();
});
