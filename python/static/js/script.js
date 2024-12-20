// Inicializa o Mapa
var map = L.map('mapid');

// Fazendo uma requisição para pegar as coordenadas de Lagarto
fetch('/api/lagarto')
    .then(response => response.json())
    .then(data => {
        // Centraliza o mapa com as coordenadas de Lagarto
        map.setView([data.latitude, data.longitude], data.zoom);

        // Define o limite da área de visualização (caixa que limita o movimento)
        var bounds = [[-10.975, -37.730], [-10.850, -37.590]]; // Ajuste conforme necessário
        map.setMaxBounds(bounds);

        // Define os Tiles do Mapa (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Colocando Marcadores
        fetch('/api/pontos')
            .then(response => response.json())
            .then(data => {
                data.forEach(ponto => {
                    var marker = L.marker([ponto.latitude, ponto.longitude]).addTo(map);
                    marker.bindPopup(`<b>${ponto.nome}</b><br>${ponto.descricao}`);
                });
            })
            .catch(error => console.error('Erro ao carregar pontos', error));
    })
    .catch(error => console.error('Erro ao carregar coordenadas de Lagarto', error));
