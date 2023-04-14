  
  new Sortable(list, {
    group: {
        name: 'shared',
    },
    animation: 150,

    onRemove: function (evt) { // evento disparado quando um item é removido da lista
        var item = evt.item; // o item removido
        var lista = evt.from; // a lista de origem
        var novoItem = item.cloneNode(true); // criar uma cópia do item removido
        novoItem.textContent = "Item " + Math.floor(Math.random() * 100); // atribuir um texto aleatório ao novo item
        lista.appendChild(novoItem); // adicionar o novo item ao final da lista de origem
      }
    
});

new Sortable(list2, {
    group: {
        name: 'shared',
    },
    animation: 150,

    sort: function (a, b) {
        // comparar o texto dos elementos
        return a.textContent.localeCompare(b.textContent);
      },

    emptyInsertThreshold: 0,
    
    filter: ".fixo", // desabilitar o arrastamento dos itens com a classe "fixo"
  store: {
    // Função para salvar a ordem dos itens na lista
    set: function (sortable) {
      var order = sortable.toArray(); // obter um array com os ids dos itens na ordem atual
      localStorage.setItem(sortable.options.group.name, order.join("|")); // salvar o array no armazenamento local usando o nome do grupo como chave
    },
    // Função para restaurar a ordem dos itens na lista
    get: function (sortable) {
      var order = localStorage.getItem(sortable.options.group.name); // obter o array salvo no armazenamento local usando o nome do grupo como chave
      return order ? order.split("|") : []; // retornar o array ou um array vazio se não houver nada salvo
    }
  },
  onAdd: function (evt) { // evento disparado quando um item é adicionado na lista
    var item = evt.item; // o item adicionado
    item.classList.add("fixo"); // adicionar a classe "fixo" ao item
  },

});
