// Função para ler o arquivo JSON e mostrar os dados no HTML
function mostrarDados() {
    // Ler o arquivo JSON usando o método fetch
    fetch("info.json")
      .then(res => res.json()) // Converter a resposta em um objeto JavaScript
      .then(data => { // Usar os dados do objeto
        // Gerar um número aleatório entre 0 e 2
        let random = Math.floor(Math.random() * 3);
        // Selecionar a entrada do array de objetos JSON com o índice igual ao número aleatório
        let filme = data[random];
        // Selecionar todos os elementos HTML que têm o atributo data-
        let elements = document.querySelectorAll("[data-]");
        // Percorrer os elementos HTML
        for (let element of elements) {
          // Obter o nome da propriedade do objeto JSON que corresponde ao elemento HTML
          let property = element.getAttribute("data-");
          // Verificar se o elemento HTML é a div com id "bg"
          if (element.id === "bg") {
            // Atribuir o valor da propriedade do objeto JSON ao estilo background-image do elemento HTML
            element.style.backgroundImage = `url("${filme[property]}")`;
          } else {
            // Atribuir o valor da propriedade do objeto JSON ao conteúdo do elemento HTML
            element.textContent = filme[property];
          }
        }
      })
      .catch(err => console.error(err)); // Tratar possíveis erros
  }


//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------


// Função para inicializar os Sortables
function init() {
    // Selecionar os elementos HTML das listas
    var list1 = document.getElementById("sortable1");
    var list2 = document.getElementById("sortable");
  
    // Criar as instâncias do SortableJS para cada lista
    // LISTA 01
    var sortable1 = new Sortable(list1, {
      group: "shared", // definir o nome do grupo compartilhado
      animation: 150, // definir a duração da animação em ms
      cursor: "grab", // definir o cursor para indicar que o item é arrastável
      ghostClass: "ui-placeholder", // definir a classe CSS para o item fantasma
      forceFallback: true, // forçar o uso do fallback em vez do HTML5 DnD
      draggable: ".card", // definir o seletor CSS para os itens arrastáveis

      onRemove: function (evt) {
        // função que é chamada quando um item é removido da lista
        var item = evt.item; // o item arrastado
        var toList = evt.to; // a lista de destino
        if (toList.id == "sortable2") { // se a lista de destino é a list2
          var clone = item.cloneNode(true); // criar uma cópia do item
          clone.setAttribute("id", "clone"); // alterar o id do clone
          list1.appendChild(clone); // inserir o clone na lista de origem
          list1.removeChild(item); // remover o item original da lista de origem
        }
      }

    });
  
    // LISTA 02
    var sortable2 = new Sortable(list2, {
      group: "shared", // definir o mesmo nome do grupo compartilhado
      animation: 150, // definir a mesma duração da animação
      cursor: "grab", // definir o mesmo cursor
      ghostClass: "ui-placeholder", // definir a mesma classe CSS
      forceFallback: true, // forçar o uso do mesmo fallback
      draggable: ".card", // definir o mesmo seletor CSS
      filter: ".no-drag", // definir a classe CSS para os itens que devem ser ignorados
    });
  }
  
  // Chamar a função init depois que o documento for carregado
  document.addEventListener("DOMContentLoaded", init);

  
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

  // Chamar a função mostrarDados depois que o código do SortableJS for executado
  mostrarDados();
