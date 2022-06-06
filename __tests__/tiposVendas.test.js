const customExpress = require("../src/config/customExpress");
const supertest = require("supertest");
const request = supertest(customExpress());

jest.mock("../src/repositorios/tipoVendas");

describe("API de vendas", () => {
    test("Listar vendas", async () => {
        const resp = await request.get("/tipos-vendas");
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual([{
                "id": 1,
                "descricao": "bebida"
            },
            {
                "id": 2,
                "descricao": "alimentaçao"
            }
        ]);
    });

    test("Buscar venda por ID existente", async () => {
        const resp = await request.get("/tipos-vendas/1");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            "id": 1,
            "descricao": "bebida"
        });
    });


    test("Buscar venda por ID inexistente", async () => {
        const resp = await request.get("/tipos-vendas/5");
        expect(resp.statusCode).toBe(404);
    });


    test("Adicionar venda com dados válidos", async () => {
        const venda = {
            descricao: "ingresso"
        };
        const resp = await request.post("/tipos-vendas").send(venda);
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            id: 3,
            ...venda
        });
    });


    test("Alterar venda", async () => {
        const alteracao = {descricao: "Joaquim"};
        const resp = await request.put("/tipos-vendas/2").send(alteracao);
        expect(resp.statusCode).toBe(200);
      });


    test("Deletar venda", async () => {
        const resp = await request.delete("/tipos-vendas/1");
        expect(resp.statusCode).toBe(204);
    });
});