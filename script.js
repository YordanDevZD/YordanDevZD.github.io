const API_KEY = 'TU_CLAVE_DE_API'; // Reemplaza con tu clave de API de TMDb
const CATALOGO_ITEMS = [
    { nombre: "Kara Sevda", tipo: "tv", id: 66044 }, // Novela turca
    { nombre: "Avenida Brasil", tipo: "tv", id: 45858 }, // Novela brasileña
    { nombre: "Muhteşem Yüzyıl", tipo: "tv", id: 44857 }, // Novela turca
    { nombre: "La Reina del Sur", tipo: "tv", id: 34524 }, // Novela mexicana
    { nombre: "Breaking Bad", tipo: "tv", id: 1396 }, // Serie
    { nombre: "Inception", tipo: "movie", id: 27205 } // Película
];

const catalogoDiv = document.getElementById('catalogo');

async function fetchCatalogo() {
    for (const item of CATALOGO_ITEMS) {
        const response = await fetch(`https://api.themoviedb.org/3/${item.tipo}/${item.id}?api_key=${API_KEY}&language=es`);
        const data = await response.json();

        if (data.name || data.title) {
            mostrarItem(data);
        } else {
            console.error(`No se encontró: ${item.nombre}`);
        }
    }
}

function mostrarItem(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    const posterUrl = item.poster_path 
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=Imagen+no+disponible';

    itemDiv.innerHTML = `
        <img src="${posterUrl}" alt="${item.name || item.title}">
        <h2>${item.name || item.title}</h2>
        <p>${item.overview || "Descripción no disponible"}</p>
    `;

    catalogoDiv.appendChild(itemDiv);
}

fetchCatalogo();
