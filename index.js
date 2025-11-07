const { performance } = require("perf_hooks");

function rallyStops(L, d, stops) {
  const points = [0, ...stops, L];
  const chosenStops = [];
  let current = 0;

  for (let i = 1; i < points.length; i++) {
    if (points[i] - points[current] > d) {
      if (i - 1 === current) {
        throw new Error("Impossível completar o rally com a distância máxima diária.");
      }
      chosenStops.push(points[i - 1]);
      current = i - 1;
    }
  }

  return chosenStops;
}

function gerarPontosAleatorios(L, n) {
  const stops = [];
  for (let i = 0; i < n; i++) {
    stops.push(Math.random() * L);
  }
  return stops.sort((a, b) => a - b);
}

function testarCenarios() {
  const cenarios = [
    { L: 100, d: 20, n: 10 },
    { L: 1000, d: 50, n: 100 },
    { L: 5000, d: 100, n: 500 },
    { L: 10000, d: 200, n: 1000 },
    { L: 50000, d: 500, n: 5000 },
    { L: 100000, d: 800, n: 10000 },
  ];

  console.log("Análise de Desempenho do Algoritmo das Paradas Mínimas\n");

  cenarios.forEach((cenario, idx) => {
    const { L, d, n } = cenario;
    const stops = gerarPontosAleatorios(L, n);

    const start = performance.now();
    const result = rallyStops(L, d, stops);
    const end = performance.now();

    const tempo = (end - start).toFixed(4);
    console.log(`Cenário ${idx + 1}:`);
    console.log(`  L = ${L}, d = ${d}, pontos = ${n}`);
    console.log(`  Paradas escolhidas: ${result.length}`);
    console.log(`  Tempo de execução: ${tempo} ms`);
    console.log("--------------------------------------------");
  });
}

testarCenarios();
