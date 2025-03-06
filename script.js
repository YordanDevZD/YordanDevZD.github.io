import { CATALOGO_ITEMS } from './catalogo.js';

const API_KEY = '45ca66a85cc9f8f4d18c458bb6536092'; // Reemplazar con

async function buscarContenido(nombre, tipo) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/${tipo}?api_key=${API_KEY}&language=es&query=${encodeURIComponent(nombre)}`
        );
        const data = await response.json();
        return data.results[0];
    } catch (error) {
        console.error('Error buscando contenido:', error);
        return null;
    }
}

function acortarDescripcion(texto) {
    const maxCaracteres = 120;
    return texto.length > maxCaracteres 
        ? texto.substring(0, maxCaracteres) + '...' 
        : texto;
}

async function cargarCatalogo() {
    for (const item of CATALOGO_ITEMS) {
        const resultado = await buscarContenido(item.nombre, item.tipo);
        
        if (resultado) {
            mostrarItem({
                ...resultado,
                overview: acortarDescripcion(resultado.overview || 'Descripción no disponible')
            }, item.categoria);
        }
    }
}

function mostrarItem(item, categoria) {
    const seccion = document.querySelector(`[data-categoria="${categoria}"]`);
    
    const elemento = document.createElement('div');
    elemento.className = 'item';
    
    const posterUrl = item.poster_path 
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : 'https://via.placeholder.com/500x750?text=Imagen+no+disponible';

    elemento.innerHTML = `
        <img src="${posterUrl}" alt="${item.title || item.name}">
        <h2>${item.title || item.name}</h2>
        <p>${item.overview}</p>
    `;

    seccion.appendChild(elemento);
}

cargarCatalogo();
