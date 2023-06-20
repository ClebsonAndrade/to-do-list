
const scripts = require("./scripts")
const sum = require("./testando")

test("To have returned?", () => {
    expect(scripts.adicionarNovaTarefa()).toBe(2)
})

test("", ()=>{
    expect(sum(1, 2)).toBe(3)
})