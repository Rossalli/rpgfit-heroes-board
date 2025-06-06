const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQatPYj2GxcV--BhUSQ_IzOdnYCuPbNbOLXF-XmQgwwBQOv7eR9EabZ-cNG6lSZuw/pub?gid=242294829&single=true&output=csv';

// Defina aqui as colunas que você quer exibir
const CAMPOS_DESEJADOS = ["Nome", "Grupo", "Avatar", "Raça", "Classe", "Nível", "XP TOTAL"];

function csvToArray(str, delimiter = ",") {
  const rows = str.trim().split("\n");
  return rows.map(row => row.split(delimiter));
}

function filtrarColunas(data, campos) {
  const header = data[0];
  const indices = campos.map(campo => header.indexOf(campo));
  // Monta novo array só com as colunas desejadas
  const filtrado = data.map(row => indices.map(idx => row[idx]));
  return filtrado;
}

function renderTable(data) {
  let html = '<table><thead><tr>';
  data[0].forEach(col => html += `<th>${col}</th>`);
  html += '</tr></thead><tbody>';
  data.slice(1).forEach(row => {
    html += '<tr>';
    row.forEach(cell => html += `<td>${cell}</td>`);
    html += '</tr>';
  });
  html += '</tbody></table>';
  document.getElementById('ranking').innerHTML = html;
}

function fetchAndRender() {
  fetch(SHEET_URL)
    .then(res => res.text())
    .then(csv => {
      const data = csvToArray(csv);
      const filtrado = filtrarColunas(data, CAMPOS_DESEJADOS);
      // Ordena pelo campo "Pontuação" (ajuste o índice conforme necessário)
      const idxPontuacao = filtrado[0].indexOf("Pontuação");
      filtrado.sort((a, b) => b[idxPontuacao] - a[idxPontuacao]);
      renderTable(filtrado);
    });
}

fetchAndRender();
setInterval(fetchAndRender, 30000);
