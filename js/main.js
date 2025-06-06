const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vStASxUcg86G4Tb9QeQ6JO8p9YalUY5qzxZ1ROH8U6lsRLnXssTBd7aAs3CuTEPbCYs1rVcyXU1hI0j/pub?gid=0&single=true&output=csv';

function csvToArray(str, delimiter = ",") {
  const rows = str.trim().split("\n");
  return rows.map(row => row.split(delimiter));
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
      // Ordena pelo score (supondo que a coluna 2 seja o score)
      data.sort((a, b) => b[1] - a[1]);
      renderTable(data);
    });
}

// Atualiza a cada 30 segundos
fetchAndRender();
setInterval(fetchAndRender, 30000);
