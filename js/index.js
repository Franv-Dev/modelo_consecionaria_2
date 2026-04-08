/**
 * Script Principal para la página de Inicio (`index.html`)
 * Obtiene modelos mock, los renderiza en los destacados e implementa
 * interacción adicional.
 */

// Mock DB 
const featuredVehicles = [
    {
        id: "v001",
        brand: "Toyota",
        model: "SW4 Diamond",
        year: 2024,
        price: 65000,
        currency: "$",
        image: "./assets/sw4_exterior.png",
        description: "SUV de lujo, versátil y con capacidad todo terreno insuperable.",
        specs: {
            seats: "7 Asientos",
            fuel: "Diésel",
            transmission: "Automático"
        }
    },
    {
        id: "v002",
        brand: "Volkswagen",
        model: "Amarok V6 Extreme",
        year: 2024,
        price: 55000,
        currency: "$",
        image: "./assets/amarok_exterior.png",
        description: "Pick-up premium con la mayor potencia en su segmento V6.",
        specs: {
            acceleration: "7.4s 0-100",
            fuel: "Diésel",
            transmission: "Automático"
        }
    },
    {
        id: "v003",
        brand: "Ford",
        model: "Ranger Raptor",
        year: 2024,
        price: 75000,
        currency: "$",
        image: "./assets/ranger_exterior.png",
        description: "La pickup deportiva más extrema del mercado, lista para el off-road.",
        specs: {
            acceleration: "7.9s 0-100",
            fuel: "Gasolina",
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
                <span class="text-primary font-black text-lg shrink-0">${window.formatPrice(vehicle.price)}</span>
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

window.goToInventory = function() {
    const brand = document.getElementById('home-brand')?.value || '';
    const price = document.getElementById('home-price')?.value || '';
    let params = new URLSearchParams();
    if (brand) params.append('brand', brand);
    if (price) params.append('price', price);
    window.location.href = 'inventario.html?' + params.toString();
};
