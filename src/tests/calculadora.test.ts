
class Calculadora {
    public somar(x: number, y: number){
        return x + y; 
    }
}


describe("Testees da calculadora",() => {
    test("deve retornar 10 quando retornar 5 com 5", () => {
        //I - SUT
        const calculadora = new Calculadora();
        // II - chamar o metodo
        const result = calculadora.somar(5,5);

        // III - asserts
        expect(result).toBeDefined();
        expect(result).toBe(10);
        expect(result).toBeGreaterThan(0);
    })
})