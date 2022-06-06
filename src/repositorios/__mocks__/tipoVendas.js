const vendasMock = require("./tipoVendasMock.json");

class TipoVendasRepositorio {
  listar() {
    return Promise.resolve(vendasMock);
  }
  buscaPorId(id) {
    return Promise.resolve(vendasMock.find((venda) => venda.id === id));
  }
  adicionar(tipoVenda) {
    return Promise.resolve({id: 3, ...tipoVenda});
  }
  alterar(valores, id) {
    const tipoVenda = vendasMock.find((venda) => venda.id === id);
    tipoVenda.descricao = valores.descricao;
    return Promise.resolve(tipoVenda);
  }
  excluir(id) {
    const vendasFiltradas = vendasMock.filter((venda) => venda.id !== id);
    return Promise.resolve(vendasFiltradas);
  }
}

module.exports = new TipoVendasRepositorio();
