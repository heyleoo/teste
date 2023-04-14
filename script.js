// Selecionando os elementos do HTML
const timeline = document.getElementById("timeline");
const card = document.getElementById("card");
const subject = document.getElementById("subject");
const date = document.getElementById("date");
const start = document.getElementById("start");
const score = document.getElementById("score");

// Criando uma variável para armazenar os dados do wikidata
let data = [];

// Criando uma variável para armazenar a pontuação do jogador
let points = 0;

// Criando uma variável para armazenar os erros do jogador
let errors = 0;

// Criando uma função para iniciar o jogo
function startGame() {
    // Escondendo o botão de iniciar
    start.style.display = "none";
    // Pegando os dados do wikidata usando uma API
    fetch("https://query.wikidata.org/sparql?query=SELECT%20%3Fitem%20%3FitemLabel%20%3Fdate%20WHERE%20%7B%0A%20%20%3Fitem%20wdt%3AP31%2Fwdt%3AP279*%20wd%3AQ1190554.%0A%20%20OPTIONAL%20%7B%20%3Fitem%20wdt%3AP571%20%3Fdate.%20%7D%0A%20%20SERVICE%20wikibase%3Alabel%20%7Bbd%3AserviceParamwikibase%3Alanguage\"pt-br\".%7D.%0AFILTER(%28BOUND(%3Fdate)%29AND(%28YEAR(%3Fdate)%3E-3000ANDYEAR(%3Fdate)%3C2022)%29)%0AORDERBYRAND()%0ALIMIT100&format=json")
    .then(response => response.json())
    .then(json => {
        // Armazenando os dados em um array
        data = json.results.bindings;
        // Gerando um cartão aleatório
        generateCard();
    })
    .catch(error => console.error(error));
}

// Criando uma função para gerar um cartão aleatório
function generateCard() {
    // Escolhendo um índice aleatório do array de dados
    let index = Math.floor(Math.random() * data.length);
    // Pegando o assunto e a data correspondentes ao índice
    let subjectText = data[index].itemLabel.value;
    let dateText = data[index].date.value.slice(0, 4);
    // Mostrando o assunto e a data no cartão
    subject.textContent = subjectText;
    date.textContent = dateText;
    // Adicionando um evento de arrastar ao cartão
    card.addEventListener("dragstart", dragStart);
}

// Criando uma função para verificar se o cartão está na posição correta
function checkCard(event) {
    // Removendo o evento de arrastar do cartão
    card.removeEventListener("dragstart", dragStart);
    // Pegando a data do cartão
    let cardDate = parseInt(date.textContent);
    // Pegando a data do evento anterior e posterior na linha do tempo
    let prevDate = event.target.previousElementSibling ? parseInt(event.target.previousElementSibling.textContent.slice(-4)) : -Infinity;
    let nextDate = event.target.nextElementSibling ? parseInt(event.target.nextElementSibling.textContent.slice(-4)) : Infinity;
    // Comparando as datas para ver se o cartão está na ordem cronológica correta
    if (cardDate > prevDate && cardDate < nextDate) {
        // Atualizando a pontuação e a linha do tempo
        updateScore();
        updateTimeline(event);
        // Gerando um novo cartão aleatório
        generateCard();
    } else {
        // Aumentando os erros do jogador
        errors++;
        // Verificando se o jogador ainda tem chances
        if (errors < 3) {
            // Mostrando uma mensagem de erro
            alert("Você errou! Tente novamente.");
            // Gerando um novo cartão aleatório
            generateCard();
        } else {
            // Chamando a função de fim de jogo
            endGame();
        }
    }
}

// Criando uma função para atualizar a pontuação do jogador
function updateScore() {
    // Aumentando os pontos do jogador
    points++;
    // Mostrando a pontuação no elemento <p>
    score.textContent = "Pontuação: " + points;
}

// Criando uma função para atualizar a linha do tempo
function updateTimeline(event) {
    // Criando um novo elemento <div> para o evento
    let newEvent = document.createElement("div");
    // Copiando o conteúdo do cartão para o novo elemento
    newEvent.innerHTML = card.innerHTML;
    // Inserindo o novo elemento na linha do tempo na posição correta
    timeline.insertBefore(newEvent, event.target);
}

// Criando uma função para mostrar uma mensagem de fim de jogo
function endGame() {
    // Removendo o cartão da tela
    card.style.display = "none";
    // Mostrando uma mensagem de parabéns ou de derrota dependendo da pontuação
    if (points > 0) {
        alert("Parabéns! Você acertou " + points + " eventos na ordem cronológica correta.");
    } else {
        alert("Que pena! Você não acertou nenhum evento na ordem cronológica correta.");
    }
}

// Criando uma função para iniciar o arrastar do cartão
function dragStart(event) {
    // Definindo o tipo e o valor dos dados que serão transferidos
    event.dataTransfer.setData("text/plain", event.target.id);
}

// Criando uma função para permitir o arrastar sobre a linha do tempo
function dragOver(event) {
    // Prevenindo o comportamento padrão do navegador
    event.preventDefault();
}

// Criando uma função para soltar o cartão na linha do tempo
function drop(event) {
    // Prevenindo o comportamento padrão do navegador
    event.preventDefault();
    // Pegando os dados transferidos pelo arrastar
    let data = event.dataTransfer.getData("text/plain");
    // Verificando se os dados são do cartão
    if (data === "card") {
        // Chamando a função para verificar se o cartão está na posição correta
        checkCard(event);
    }
}

// Adicionando um evento de clicar ao botão de iniciar
start.addEventListener("click", startGame);

// Adicionando um evento de arrastar sobre à linha do tempo
timeline.addEventListener("dragover", dragOver);

// Adicionando um evento de soltar à linha do tempo
timeline.addEventListener("drop", drop);
