/**
 * Script Principal para la página de Inicio (`inicio.html`)
 * Obtiene modelos mock, los renderiza en los destacados e implementa
 * interacción adicional.
 */

// Mock DB 
const featuredVehicles = [
    {
        id: "v001",
        brand: "Porsche",
        model: "911 Carrera",
        year: 2023,
        price: 114000,
        currency: "$",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmTqkrf-Squ01psj3yABM6FDKVNQhcJwk4ZYOLpyQkmSFfu7rg8x7irWYarpbQHavpTAgk2GMa5Z67IVDnR2x3n7mvyqCw1vWa6SDWdWj3Nxd16uX3gry5t_LlOw27D_5orgqzY1o0zIblNP-qG6J6fRqHgs-zZQgpaotXSwXYzwgVC8orfuE9X3dIuXmRD4He9gj7f5tCv4Xhkp2pZnLurOyZhhKbf46ByrjDyMleiOJdGnBfdndo0Toram-4fxG6rYYxiQ_TCg4",
        description: "Icónico diseño deportivo con motor biturbo de seis cilindros.",
        specs: {
            acceleration: "3.8s 0-100",
            fuel: "Gasolina",
            transmission: "Automático"
        }
    },
    {
        id: "v002",
        brand: "Mercedes-Benz",
        model: "GLE",
        year: 2024,
        price: 89500,
        currency: "$",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCosf9rnA5JVC77_0Mr0_yXVeTqnO1r7mkdDkpQ8n1pYyx5AebFp6pFEBDNqS7So1I_zhTuMelPprqXsFsfX1Ot4f6PDNinrm8FR2kJAdKPRearMF7UvphALuJY_aH0xvNvOVr3-e-0_Nlpe31uBRnFHku-a0fZymbqyTXWHlsWR_3zdPuT-AAKqXAqp03Z2UpwIaHtPhQs2cGrc2yI3r-rfJaJf-7eODV4yTJc6P09wEKhtBMHhEnt9z0WtyvQA_Px7_PRBPFyUJM",
        description: "SUV de lujo que combina elegancia, tecnología y capacidad todo terreno.",
        specs: {
            seats: "7 Asientos",
            fuel: "Híbrido",
            transmission: "Automático"
        }
    },
    {
        id: "v003",
        brand: "Audi",
        model: "RS e-tron GT",
        year: 2023,
        price: 140000,
        currency: "$",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHZjxaOb6uWRX6ATKBXIcMzA975A0u7cu7pN-cnaTn3k5UxhYQXOIc6-aSOYENIU7jjlxcEtdHnKvG9QyBaYgiVdm59gPkW5qmr_yaUEOmpVRsfkWoPigkOK5KFQx0xxrpZb1QcaaZKbV4akbe6s3KYqMd_aZxahM52bhjPEDMUZRSy94v2ccwdu6sonUG73i-jZ84vzahLZXDCwK9mr1Ha5KIJSmvs46oWIH3bQs3kZcfaWnbRkhBxnej3MP6kNmf4dkzxPlwrw0",
        description: "El futuro es eléctrico. Potencia pura con un diseño aerodinámico revolucionario.",
        specs: {
            fuel: "Electric",
            acceleration: "3.3s 0-100",
            transmission: "Automático"
        }
    }
];

// Helper para crear HTML de Specs dinámico (varía si tiene seats vs acceleration)
const generateSpecsHTML = (specs) => {
    let html = '';
    
    // Iteramos Object Entries o hacemos manual según lo que hay
    if (specs.acceleration) {
        html += `
        <div class="flex flex-col items-center gap-1 text-center">
            <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg group-hover:text-primary transition-colors">speed</span>
            <span class="text-xs font-medium text-slate-600 dark:text-slate-300">
                ${specs.acceleration}
            </span>
        </div>`;
    }
    
    if (specs.seats) {
        html += `
        <div class="flex flex-col items-center gap-1 text-center border-l-0">
            <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg group-hover:text-primary transition-colors">airline_seat_recline_extra</span>
            <span class="text-xs font-medium text-slate-600 dark:text-slate-300">${specs.seats}</span>
        </div>`;
    }

    // Fuel
    html += `
        <div class="flex flex-col items-center gap-1 text-center border-l dark:border-slate-700 border-slate-100">
            <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg group-hover:text-primary transition-colors">
                ${specs.fuel.toLowerCase() === 'electric' ? 'bolt' : (specs.fuel.toLowerCase() === 'híbrido' ? 'ev_station' : 'local_gas_station')}
            </span>
            <span class="text-xs font-medium text-slate-600 dark:text-slate-300">${specs.fuel}</span>
        </div>`;
        
    // Transmission
    if (specs.transmission) {
        html += `
        <div class="flex flex-col items-center gap-1 text-center border-l dark:border-slate-700 border-slate-100">
            <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg group-hover:text-primary transition-colors">settings</span>
            <span class="text-xs font-medium text-slate-600 dark:text-slate-300">${specs.transmission}</span>
        </div>`;
    }

    return html;
}

// Generador de Tarjeta
const createVehicleCardHTML = (vehicle) => {
    return `
    <div class="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col hover:-translate-y-1">
        <div class="relative h-64 overflow-hidden">
            <img class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                 src="${vehicle.image}" 
                 alt="${vehicle.brand} ${vehicle.model} front view"/>
            <div class="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white shadow-sm border border-white/20">
                ${vehicle.year}
            </div>
        </div>
        <div class="p-6 flex flex-col flex-1">
            <div class="flex justify-between items-start mb-2 gap-2">
                <h3 class="text-xl font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors cursor-pointer" onclick="window.location.href='detalles_vehiculos.html?id=${vehicle.id}'">
                    ${vehicle.brand} ${vehicle.model}
                </h3>
                <span class="text-primary font-black text-lg shrink-0">${vehicle.currency}${vehicle.price.toLocaleString()}</span>
            </div>
            
            <p class="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                ${vehicle.description}
            </p>
            
            <div class="grid grid-cols-3 gap-2 py-4 border-t border-slate-100 dark:border-slate-700 mb-4 mt-auto">
                ${generateSpecsHTML(vehicle.specs)}
            </div>
            
            <button onclick="window.location.href='detalles_vehiculos.html?id=${vehicle.id}'" class="w-full mt-auto py-3 rounded-lg border-2 border-primary text-primary dark:text-white dark:border-primary font-bold hover:bg-primary hover:text-white transition-colors text-sm shadow-sm flex items-center justify-center gap-2 group-hover:shadow-md">
                Ver Detalles
                <span class="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
        </div>
    </div>
    `;
};

// Renderizado Incial
document.addEventListener('DOMContentLoaded', () => {
    const gridEl = document.getElementById('featured-vehicles-grid');
    if (gridEl) {
        let cardsHtml = '';
        featuredVehicles.forEach(vehicle => {
            cardsHtml += createVehicleCardHTML(vehicle);
        });
        gridEl.innerHTML = cardsHtml;
    }
});
