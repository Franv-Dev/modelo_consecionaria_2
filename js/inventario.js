/**
 * Script Principal para la página de Inventario (`inventario.html`)
 * Obtiene modelos mock completos y maneja lógica de filtros y renderizado.
 */

// Extended Mock DB para Inventario
const inventoryVehicles = [
    {
        id: "v001", brand: "Toyota", model: "SW4 Diamond", bodyType: "SUV", year: 2024, price: 65000, currency: "$", mileage: 1200,
        image: "./assets/sw4_exterior.png", description: "SUV de lujo, versátil y con capacidad todo terreno insuperable.",
        specs: { fuel: "Diésel", transmission: "Automática" }, tags: ["Premium"]
    },
    {
        id: "v002", brand: "Volkswagen", model: "Amarok V6 Extreme", bodyType: "Pick-up", year: 2024, price: 55000, currency: "$", mileage: 0,
        image: "./assets/amarok_exterior.png", description: "Pick-up premium con la mayor potencia en su segmento V6.",
        specs: { fuel: "Diésel", transmission: "Automática" }, tags: ["Nuevo"]
    },
    {
        id: "v003", brand: "Ford", model: "Ranger Raptor", bodyType: "Pick-up", year: 2024, price: 75000, currency: "$", mileage: 500,
        image: "./assets/ranger_exterior.png", description: "La pickup deportiva más extrema del mercado, lista para el off-road.",
        specs: { fuel: "Gasolina", transmission: "Automática" }, tags: ["Premium"]
    },
    {
        id: "v004", brand: "Peugeot", model: "208 GT", bodyType: "Hatchback", year: 2024, price: 29000, currency: "$", mileage: 15000,
        image: "./assets/peugeot208_exterior.png", description: "El hatchback tope de gama con diseño súper deportivo y tecnológico.",
        specs: { fuel: "Gasolina", transmission: "Automática" }, tags: ["Eco"]
    },
    {
        id: "v005", brand: "Volkswagen", model: "Vento GLI", bodyType: "Sedán", year: 2023, price: 42000, currency: "$", mileage: 22000,
        image: "./assets/vento_exterior.png", description: "Sedán deportivo por excelencia, equilibrio perfecto entre confort y performance.",
        specs: { fuel: "Gasolina", transmission: "Automática" }, tags: ["Oferta"]
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
    const emptyEl = document.getElementById('inventory-empty');

    if (!gridEl) return;

    // Aplicar Filtros (And/Or logic básica)
    let filtered = vehicles.filter(v => {
        // Body Type
        if (currentFilters.bodyType.length > 0 && !currentFilters.bodyType.includes(v.bodyType)) return false;
        
        // Price Max/Min
        if (currentFilters.minPrice !== null && v.price < currentFilters.minPrice) return false;
        if (currentFilters.maxPrice !== null && v.price > currentFilters.maxPrice) return false;
        
        // Fuel
        if (currentFilters.fuel.length > 0 && !currentFilters.fuel.includes(v.specs.fuel)) return false;
        
        // Transmission
        if (currentFilters.transmission && currentFilters.transmission !== 'Cualquiera' && v.specs.transmission !== currentFilters.transmission) return false;
        
        // Search Term (brand, model, description)
        if (currentFilters.searchTerm) {
            const term = currentFilters.searchTerm.toLowerCase();
            const searchStr = `${v.brand} ${v.model} ${v.description}`.toLowerCase();
            if (!searchStr.includes(term)) return false;
        }

        return true;
    });

    // Actualizar count UI
    if (countEl) countEl.textContent = `${filtered.length} Vehículos Encontrados`;

    // Empty State
    if (filtered.length === 0) {
        gridEl.innerHTML = '';
        if (emptyEl) emptyEl.classList.remove('hidden');
        return;
    } else {
        if (emptyEl) emptyEl.classList.add('hidden');
    }

    // Render HTML
    let cardsHtml = '';
    filtered.forEach(v => {
        let tagHtml = '';
        if (v.tags && v.tags.length > 0) {
            let colorClass = 'bg-primary text-white'; // Default Premium
            if (v.tags[0] === 'Eco') colorClass = 'bg-green-500 text-white';
            if (v.tags[0] === 'Oferta') colorClass = 'bg-red-500 text-white';
            if (v.tags[0] === 'Nuevo') colorClass = 'bg-slate-900 text-white dark:bg-white dark:text-slate-900';
            
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
                    <span class="text-xl font-black text-primary">${window.formatPrice(v.price)}</span>
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
    const minPriceStr = document.getElementById('filter-price-min')?.value;
    const maxPriceStr = document.getElementById('filter-price-max')?.value;
    currentFilters.minPrice = minPriceStr ? parseInt(minPriceStr) : null;
    currentFilters.maxPrice = maxPriceStr ? parseInt(maxPriceStr) : null;

    // Transmission
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
    // Read URL parameters for filters
    const params = new URLSearchParams(window.location.search);
    const brandParam = params.get('brand');
    const priceParam = params.get('price');

    if (brandParam) {
        currentFilters.searchTerm = brandParam;
        const searchInput = document.getElementById('search-inventory');
        if(searchInput) searchInput.value = brandParam;
    }

    if (priceParam) {
        let min = null, max = null;
        if (priceParam === '$20k - $50k') { min = 20000; max = 50000; }
        else if (priceParam === '$50k - $100k') { min = 50000; max = 100000; }
        else if (priceParam === '+$100k') { min = 100000; }
        
        currentFilters.minPrice = min;
        currentFilters.maxPrice = max;
        
        if (min) {
            const minEl = document.getElementById('filter-price-min');
            if (minEl) minEl.value = min;
        }
        if (max) {
            const maxEl = document.getElementById('filter-price-max');
            if (maxEl) maxEl.value = max;
        }
    }

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
