const UFMock = require("./UFMock.json");

class UfRepositorio {

  listar() {
    return Promise.resolve(UFMock);
  }
}

module.exports = new UfRepositorio();
