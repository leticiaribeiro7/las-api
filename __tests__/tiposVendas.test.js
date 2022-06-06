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

    test("Buscar venda por ID", async () => {
        const resp = await request.get("/tipos-vendas/1");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            "id": 1,
            "descricao": "bebida"
        });
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
        const alteracao = {
            descricao: "Ingresso"
        };
        const resp = await request.put("/eventos/2").send(alteracao);
        expect(resp.body).toEqual({
            fieldCount: 0,
            affectedRows: 1,
            insertId: 0,
            serverStatus: 2,
            warningCount: 0,
            message: "(Rows matched: 1  Changed: 0  Warnings: 0",
            protocol41: true,
            changedRows: 0
          });
    });

    test("Deletar venda", async () => {
        const resp = await request.delete("/tipos-vendas/1");
        expect(resp.statusCode).toBe(204);
    });
});