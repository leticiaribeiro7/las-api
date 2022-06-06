const usuariosMock = require("./usuariosMock.json");

class UsuarioRepositorio {
  listar() {
    return Promise.resolve(usuariosMock);
  }
  buscarPorId(id) {
    return Promise.resolve(usuariosMock.find((usuario) => usuario.id === id));
  }
  adicionar(usuario) {
    return Promise.resolve({ id: 99, ...usuario });
  }
  async isNomeUsuarioUtilizado(nome) {
    return Promise.resolve(
      !!usuariosMock.find((usuario) => usuario.nome === nome)
    );
  }
  
  alterar(valores, id) {
    const usuario = usuariosMock.find((user) => user.id === id);
    usuario.nome = valores.nome;
    return Promise.resolve(usuario);
    
  }

  excluir(id) {
    const usuariosFiltrados = usuariosMock.filter((user) => user.id !== id);
    return Promise.resolve(usuariosFiltrados);
  }
  
}
module.exports = new UsuarioRepositorio();
