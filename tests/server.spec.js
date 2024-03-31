const request = require("supertest");
const server = require("../index.js");

describe("Get /cafes", () => {
    it('should respond with status 200', async () => {
        const response = await request(server).get('/cafes').send();
        expect(response.status).toBe(200);
    });

    it('should respond with array', async () => {
        const response = await request(server).get('/cafes').send();
        expect(response.body).toBeInstanceOf(Array);
    });

});


describe("POST /cafes ", () => {
    describe('given a cafe', () => {
        const newCafe = {
            nombre: 'some name',
        };
        it('should respond with a 201 status', async () => {
            const response = await request(server).post('/cafes').send(newCafe);
            expect(response.status).toBe(201);
        });
    });
});


describe("PUT /cafes/:id", () => {
    it('should respond with a 400 status ', async () => {
        const existingId = 'existingId';
        const cafeToUpdate = {
            id: existingId, 
            nombre: 'new name',
        };
        const response = await request(server)
            .put('/cafes/-invalid-id')
            .send(cafeToUpdate);
        expect(response.status).toBe(400);
    });
});

describe("DELETE /cafes/:id", () => {
    it('should respond with a 404 ', async () => {
        const response = await request(server)
            .delete('/cafes/-invalid-id')
            .set('Authorization', 'test');
        expect(response.status).toBe(404);
    });
});