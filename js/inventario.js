/**
 * Script Principal para la página de Inventario (`inventario.html`)
 * Obtiene modelos mock completos y maneja lógica de filtros y renderizado.
 */

// Extended Mock DB para Inventario
const inventoryVehicles = [
    {
        id: "v001",
        brand: "Porsche",
        model: "911 Carrera",
        bodyType: "Coupe",
        year: 2023,
        price: 114000,
        currency: "$",
        mileage: 8400,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmTqkrf-Squ01psj3yABM6FDKVNQhcJwk4ZYOLpyQkmSFfu7rg8x7irWYarpbQHavpTAgk2GMa5Z67IVDnR2x3n7mvyqCw1vWa6SDWdWj3Nxd16uX3gry5t_LlOw27D_5orgqzY1o0zIblNP-qG6J6fRqHgs-zZQgpaotXSwXYzwgVC8orfuE9X3dIuXmRD4He9gj7f5tCv4Xhkp2pZnLurOyZhhKbf46ByrjDyMleiOJdGnBfdndo0Toram-4fxG6rYYxiQ_TCg4",
        description: "Icónico diseño deportivo con motor biturbo de seis cilindros.",
        specs: {
            fuel: "Gasolina",
            transmission: "Automática"
        },
		tags: ["Premium"]
    },
    {
        id: "v002",
        brand: "Mercedes-Benz",
        model: "GLE",
        bodyType: "SUV",
        year: 2024,
        price: 89500,
        currency: "$",
        mileage: 0,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCosf9rnA5JVC77_0Mr0_yXVeTqnO1r7mkdDkpQ8n1pYyx5AebFp6pFEBDNqS7So1I_zhTuMelPprqXsFsfX1Ot4f6PDNinrm8FR2kJAdKPRearMF7UvphALuJY_aH0xvNvOVr3-e-0_Nlpe31uBRnFHku-a0fZymbqyTXWHlsWR_3zdPuT-AAKqXAqp03Z2UpwIaHtPhQs2cGrc2yI3r-rfJaJf-7eODV4yTJc6P09wEKhtBMHhEnt9z0WtyvQA_Px7_PRBPFyUJM",
        description: "SUV de lujo que combina elegancia, tecnología y capacidad todo terreno.",
        specs: {
            fuel: "Híbrido",
            transmission: "Automática"
        },
		tags: ["Nuevo"]
    },
    {
        id: "v003",
        brand: "Audi",
        model: "RS e-tron GT",
        bodyType: "Sedán",
        year: 2023,
        price: 140000,
        currency: "$",
        mileage: 5000,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHZjxaOb6uWRX6ATKBXIcMzA975A0u7cu7pN-cnaTn3k5UxhYQXOIc6-aSOYENIU7jjlxcEtdHnKvG9QyBaYgiVdm59gPkW5qmr_yaUEOmpVRsfkWoPigkOK5KFQx0xxrpZb1QcaaZKbV4akbe6s3KYqMd_aZxahM52bhjPEDMUZRSy94v2ccwdu6sonUG73i-jZ84vzahLZXDCwK9mr1Ha5KIJSmvs46oWIH3bQs3kZcfaWnbRkhBxnej3MP6kNmf4dkzxPlwrw0",
        description: "El futuro es eléctrico. Potencia pura con un diseño aerodinámico revolucionario.",
        specs: {
            fuel: "Eléctrico",
            transmission: "Automática"
        },
		tags: ["Eco"]
    },
	{
        id: "v004",
        brand: "Audi",
        model: "Q3 Sportback",
        bodyType: "SUV",
        year: 2023,
        price: 45900,
        currency: "$",
        mileage: 12500,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtd1wDgeRciv1LMaCxO1AhIEmMDw8Mj9OjxzSj0a7FLuQ-QliwCUY6rD6jp8u3zYqLMrsEGMCVegOxeJSVuUQp34okriVOdSQKSXonTdfSgTnQQcOtKI7JS5ubSrgqwVbO1u2hHqn6NhxMRi5CoUpkdpD5Jy1ALDmpBZAGSg8hkbCUvpOEXvdLtf6qSrw3WYVrY6sDXzrz11jh00iRkFFuINBvHqtZegqsYAmhECAAmzqhx9ZoACY9wPX1GNOoC72-9Ro3qUotGOI",
        description: "35 TFSI Black Line Edition.",
        specs: {
            fuel: "Gasolina",
            transmission: "Automática"
        },
		tags: ["Oferta"]
    },
	{
        id: "v005",
        brand: "Chevrolet",
        model: "Camaro",
        bodyType: "Coupe",
        year: 2022,
        price: 38500,
        currency: "$",
        mileage: 24000,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqyxXGp7t75t2BsC-CybRRuPkyGZM0veoePKxVyuQtjHGmsMgMurMv38NPQ-Ji8lbM1kb37r7uM5uiUQXIsgI30tFhaOw_58RdLFyLmkobvO8MMwIscWL8nyqTKfsQhCDZXgW3t734UscXDjf7uOROP06eRfJcmY6UwPN6wvErjtx2ruahvNmDD2kd6yoXO6gM6TjltP7KXsz3VBFTznzUMO4EYbzeksWmxbcoliQiR5PyIXbQW_rpxN4gXrVu7VNhnocqEkdE2ck",
        description: "V8 SS Coupe. Puro músculo americano.",
        specs: {
            fuel: "Gasolina",
            transmission: "Automática"
        },
		tags: []
    }
];

// Estado de Filtros Actual
let currentFilters = {
    bodyType: [],
    minPrice: null,
    maxPrice: null,
    fuel: [],
    transmission: null,
    searchTerm: ""
};

/**
 * Función para renderizar el grid basado en datos y filtros
 */
function renderInventory(vehicles) {
    const gridEl = document.getElementById('inventory-grid');
    const countEl = document.getElementById('inventory-count');
    
    if (!gridEl) return;
    
    // Filtrado
    const filteredVehicles = vehicles.filter(v => {
        // Body Type Match
        if (currentFilters.bodyType.length > 0 && !currentFilters.bodyType.includes(v.bodyType)) return false;
        
        // Price Match
        if (currentFilters.minPrice && v.price < currentFilters.minPrice) return false;
        if (currentFilters.maxPrice && v.price > currentFilters.maxPrice) return false;
        
        // Fuel Match
        if (currentFilters.fuel.length > 0 && !currentFilters.fuel.includes(v.specs.fuel)) return false;
        
        // Transmission Match
        if (currentFilters.transmission && v.specs.transmission !== currentFilters.transmission) return false;
        
        // Search Term Match
        if (currentFilters.searchTerm) {
            const search = currentFilters.searchTerm.toLowerCase();
            const fullName = `${v.brand} ${v.model}`.toLowerCase();
            if (!fullName.includes(search)) return false;
        }
        
        return true;
    });

    // Count Update
    if(countEl) countEl.textContent = `Mostrando ${filteredVehicles.length} vehículos`;

    // Render HTML
    if (filteredVehicles.length === 0) {
        gridEl.innerHTML = `
            <div class="col-span-full py-20 text-center flex flex-col items-center">
               <span class="material-symbols-outlined text-[64px] text-slate-300 dark:text-slate-600 mb-4">search_off</span>
               <h3 class="text-xl font-bold text-slate-700 dark:text-slate-200">No se encontraron vehículos</h3>
               <p class="text-slate-500 dark:text-slate-400 mt-2">Intenta ajustar o limpiar tus filtros actuales.</p>
               <button id="btn-clear-empty" class="mt-6 px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition">Limpiar Filtros</button>
            </div>
        `;
		
		const btn = document.getElementById('btn-clear-empty');
		if(btn) btn.addEventListener('click', clearFilters);
        return;
    }

    let cardsHtml = '';
    filteredVehicles.forEach(v => {
        // Tag especial HTML
        let tagHtml = '';
        if (v.tags && v.tags.length > 0) {
            const tagColors = {
                "Eco": "bg-green-500",
                "Oferta": "bg-red-500",
                "Nuevo": "bg-blue-500",
                "Premium": "bg-yellow-500 text-slate-900"
            };
            const colorClass = tagColors[v.tags[0]] || "bg-primary text-white";
            tagHtml = `
            <div class="absolute top-3 left-3 ${colorClass} px-2 py-1 rounded text-xs font-bold shadow-sm flex items-center gap-1">
                ${v.tags[0]}
            </div>`;
        }

        cardsHtml += `
        <div class="group flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div class="relative h-48 w-full overflow-hidden cursor-pointer" onclick="window.location.href='detalles_vehiculos.html?id=${v.id}'">
                <img class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                     src="${v.image}" 
                     alt="${v.brand} ${v.model}">
                
                <div class="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-text-main dark:text-white shadow-sm border border-white/10">
                    ${v.year}
                </div>
                ${tagHtml}
                <button class="absolute bottom-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-red-500 transition-colors" onclick="event.stopPropagation(); alert('¡Añadido a favoritos!')">
                    <span class="material-symbols-outlined text-[20px]">favorite</span>
                </button>
            </div>
            
            <div class="flex flex-col flex-1 p-4 bg-white dark:bg-slate-800">
                <div class="flex justify-between items-start mb-1">
                    <h3 class="text-lg font-bold text-text-main dark:text-white line-clamp-1 cursor-pointer group-hover:text-primary transition-colors" onclick="window.location.href='detalles_vehiculos.html?id=${v.id}'">${v.brand} ${v.model}</h3>
                </div>
                <p class="text-text-secondary text-sm mb-4 line-clamp-1 dark:text-slate-400">${v.description}</p>
                
                <div class="flex items-center gap-4 text-xs text-text-secondary dark:text-slate-400 mb-4 border-b border-border-light dark:border-border-dark pb-3">
                    <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">speed</span>
                        <span>${v.mileage.toLocaleString()} km</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">local_gas_station</span>
                        <span>${v.specs.fuel}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-[16px]">settings</span>
                        <span>${v.specs.transmission === 'Automática' ? 'Auto' : 'Man'}</span>
                    </div>
                </div>
                
                <div class="mt-auto flex items-center justify-between">
                    <span class="text-xl font-black text-primary">${v.currency}${v.price.toLocaleString()}</span>
                    <button onclick="window.location.href='detalles_vehiculos.html?id=${v.id}'" class="text-sm font-bold text-primary hover:text-blue-700 flex items-center gap-1 transition-colors">
                        Ver Detalles
                        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
        `;
    });

    gridEl.innerHTML = cardsHtml;
}

/**
 * Recopila valores de Checkboxes y Actualiza estado
 */
function updateFilters() {
    // BodyTypes
    const bodyChecks = document.querySelectorAll('.filter-bodyType:checked');
    currentFilters.bodyType = Array.from(bodyChecks).map(cb => cb.value);

    // Fuel Buttons (Active state)
    const fuelBtns = document.querySelectorAll('.filter-fuel.active');
    currentFilters.fuel = Array.from(fuelBtns).map(btn => btn.dataset.value);

    // Prices
    const minP = document.getElementById('filter-price-min').value;
    const maxP = document.getElementById('filter-price-max').value;
    currentFilters.minPrice = minP ? parseInt(minP, 10) : null;
    currentFilters.maxPrice = maxP ? parseInt(maxP, 10) : null;

    // Transmission Radio
    const transRadio = document.querySelector('.filter-transmission:checked');
    currentFilters.transmission = transRadio ? transRadio.value : null;

    // Ejecutamos render
    renderInventory(inventoryVehicles);
}

/**
 * Limpiar Filtros
 */
function clearFilters() {
    // Reset estado
    currentFilters = { bodyType: [], minPrice: null, maxPrice: null, fuel: [], transmission: null, searchTerm: "" };

    // Reset UI Checkboxes/Radios
    document.querySelectorAll('.filter-bodyType, .filter-transmission').forEach(el => el.checked = false);
    
    // Reset inputs
    document.getElementById('filter-price-min').value = '';
    document.getElementById('filter-price-max').value = '';
    document.getElementById('search-inventory').value = '';

    // Reset Fuel Buttons
    document.querySelectorAll('.filter-fuel').forEach(btn => updateFuelBtnState(btn, false));

    renderInventory(inventoryVehicles);
}

// Helpers Botones Fuel (Toggle UI)
function updateFuelBtnState(btn, isActive) {
    if (isActive) {
        btn.classList.add('active', 'bg-primary', 'text-white', 'border-primary');
        btn.classList.remove('bg-background-light', 'dark:bg-background-dark', 'text-text-secondary', 'border-transparent');
    } else {
        btn.classList.remove('active', 'bg-primary', 'text-white', 'border-primary');
        btn.classList.add('bg-background-light', 'dark:bg-background-dark', 'text-text-secondary', 'border-transparent');
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Evento de bddad inicial
    renderInventory(inventoryVehicles);

    // Watchers de Cambios en Filtros
    // Checkboxes y Inputs
    document.querySelectorAll('.filter-bodyType, .filter-transmission, #filter-price-min, #filter-price-max').forEach(el => {
        el.addEventListener('change', updateFilters);
    });

    // Búsqueda Textual
    const searchInput = document.getElementById('search-inventory');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.searchTerm = e.target.value;
            renderInventory(inventoryVehicles);
        });
    }

    // Botones Combustible
    document.querySelectorAll('.filter-fuel').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const isActive = e.target.classList.contains('active');
            updateFuelBtnState(e.target, !isActive);
            updateFilters();
        });
    });

    // Clear Button
    const clearBtn = document.getElementById('btn-clear-filters');
    if (clearBtn) clearBtn.addEventListener('click', clearFilters);
});
