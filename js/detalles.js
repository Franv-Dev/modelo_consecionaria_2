/**
 * Script para renderizar la vista de Detalles de Vehículos (`detalles_vehiculos.html`)
 * Obtiene el ID de la URL y puebla los campos.
 */

// Usamos el mismo Mock DB exportado / centralizado, pero por simplicidad
// lo replicamos o usamos el disponible. En producción vendría de fetch/API.
const getVehicleById = (id) => {
  // Redefiniendo simplificadamente por scope
  const vehicles = [
    {
      id: "v001", brand: "Toyota", model: "SW4 Diamond", year: 2024, price: 65000, currency: "$", mileage: 1200,
      image: "./assets/sw4_exterior.png", gallery: ["./assets/sw4_exterior.png", "./assets/sw4_interior.png"],
      description: "SUV de lujo, versátil y con capacidad todo terreno insuperable.",
      specsFull: { engine: "2.8L Turbodiesel", power: "204 HP", acceleration: "9.6s", transmission: "Automática 6-Vel", drive: "4x4", fuel: "10.5 L/100km" },
      features: ["Asientos de cuero con ventilación", "Sistema de audio JBL", "Cámara 360", 'Llantas de aleación de 18"']
    },
    {
      id: "v002", brand: "Volkswagen", model: "Amarok V6 Extreme", year: 2024, price: 55000, currency: "$", mileage: 0,
      image: "./assets/amarok_exterior.png", gallery: ["./assets/amarok_exterior.png", "./assets/amarok_interior.png"],
      description: "Pick-up premium con la mayor potencia en su segmento V6.",
      specsFull: { engine: "3.0L V6 Turbodiesel", power: "258 HP", acceleration: "7.4s", transmission: "Automática 8-Vel", drive: "4MOTION", fuel: "9.2 L/100km" },
      features: ["Asientos ErgoComfort", "Barra deportiva Extreme", "Estribos de aluminio", 'Llantas Talca 20"']
    },
    {
      id: "v003", brand: "Ford", model: "Ranger Raptor", year: 2024, price: 75000, currency: "$", mileage: 500,
      image: "./assets/ranger_exterior.png", gallery: ["./assets/ranger_exterior.png", "./assets/ranger_interior.png"],
      description: "La pickup deportiva más extrema del mercado, lista para el off-road.",
      specsFull: { engine: "3.0L V6 EcoBoost", power: "397 HP", acceleration: "7.9s", transmission: "Automática 10-Vel", drive: "4x4", fuel: "11.5 L/100km" },
      features: ["Amortiguadores FOX Racing", "Modos de manejo Baja", "Escape activo", 'Llantas 17" con neumáticos All-Terrain']
    },
    {
      id: "v004", brand: "Peugeot", model: "208 GT", year: 2024, price: 29000, currency: "$", mileage: 15000,
      image: "./assets/peugeot208_exterior.png", gallery: ["./assets/peugeot208_exterior.png", "./assets/peugeot208_interior.png"],
      description: "El hatchback tope de gama con diseño súper deportivo y tecnológico.",
      specsFull: { engine: "1.2L PureTech Turbo", power: "130 HP", acceleration: "8.7s", transmission: "Automática 6-Vel", drive: "FWD", fuel: "5.8 L/100km" },
      features: ["Faros Full LED", "Techo panorámico", "Tablero 3D i-Cockpit", "Frenado autónomo de emergencia"]
    },
    {
      id: "v005", brand: "Volkswagen", model: "Vento GLI", year: 2023, price: 42000, currency: "$", mileage: 22000,
      image: "./assets/vento_exterior.png", gallery: ["./assets/vento_exterior.png", "./assets/vento_interior.png"],
      description: "Sedán deportivo por excelencia, equilibrio perfecto entre confort y performance.",
      specsFull: { engine: "2.0L TSI Turbo", power: "230 HP", acceleration: "6.8s", transmission: "Automática DSG 7-Vel", drive: "FWD", fuel: "7.5 L/100km" },
      features: ["Suspensión deportiva multilink", "Tablero Digital Cockpit", "Iluminación interior ambiental", 'Llantas Polanko 18"']
    }
  ];
  return vehicles.find((v) => v.id === id) || vehicles[0]; // Retorna el fake si no existe el ID
};

/**
 * Función principal al cargar DOM
 */
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const vehicle = getVehicleById(id);

  renderVehicleDetails(vehicle);
  bindInteractionEvents(vehicle);
});

function renderVehicleDetails(v) {
  if (!v) return;

  // Breadcrumbs y Titulo Principal
  safelySetText("bc-model", `${v.brand} ${v.model}`);
  safelySetText("title-main", `${v.brand} ${v.model}`);
  safelySetText("price-main", `${window.formatPrice(v.price)}`);
  safelySetText("desc-main", v.description);

  // Tags
  safelySetText("tag-year", `Nuevo ${v.year}`);

  // Imagen Principal
  const mainImg = document.getElementById("main-image");
  if (mainImg) {
    mainImg.src = v.image;
    mainImg.alt = `${v.brand} ${v.model}`;
  }

  // Galería Thumbnails
  const galleryContainer = document.getElementById("gallery-thumbnails");
  if (galleryContainer && v.gallery) {
    galleryContainer.innerHTML = ""; // Limpiar
    v.gallery.forEach((imgUrl, index) => {
      const extraClass =
        index === 0
          ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900"
          : "opacity-70 hover:opacity-100";
      galleryContainer.innerHTML += `
                <div class="thumbnail-item aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all ${extraClass}" data-img="${imgUrl}">
                    <img src="${imgUrl}" class="w-full h-full object-cover" alt="Vista ${index + 1}">
                </div>
            `;
    });
  }

  // Specifications
  if (v.specsFull) {
    safelySetText("spec-engine", v.specsFull.engine);
    safelySetText("spec-power", v.specsFull.power);
    safelySetText("spec-accel", `0-100 en ${v.specsFull.acceleration}`);
    safelySetText("spec-trans", v.specsFull.transmission);
    safelySetText("spec-drive", v.specsFull.drive);
    safelySetText("spec-fuel", v.specsFull.fuel);
  }

  // Features List
  const featuresList = document.getElementById("features-list");
  if (featuresList && v.features) {
    featuresList.innerHTML = "";
    v.features.forEach((feat) => {
      featuresList.innerHTML += `
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-green-500 mt-0.5 text-lg">check_circle</span>
                <span class="text-slate-600 dark:text-slate-300 text-sm whitespace-normal break-words">${feat}</span>
            </li>`;
    });
  }

  setupCalculator(v);
}

function setupCalculator(v) {
  const engancheRange = document.getElementById("fin-enganche-range");
  const enganchePct = document.getElementById("fin-enganche-pct");
  const engancheVal = document.getElementById("fin-enganche-val");
  const mesesRange = document.getElementById("fin-meses-range");
  const mesesVal = document.getElementById("fin-meses-val");
  const cuotaRes = document.getElementById("fin-cuota");

  // Formula con Tasa de Interes Anual Promedio (APR 5.9%)
  const APR = 0.059;
  const montlyInterest = APR / 12;

  const calculateCuota = () => {
    if (!engancheRange || !mesesRange) return;

    const depositPct = parseInt(engancheRange.value) / 100;
    const months = parseInt(mesesRange.value);

    const depositAmt = v.price * depositPct;
    const principal = v.price - depositAmt;

    // Standard Amortization Formula: A = P(r(1+r)^n)/((1+r)^n - 1)
    const numerator = montlyInterest * Math.pow(1 + montlyInterest, months);
    const denominator = Math.pow(1 + montlyInterest, months) - 1;
    let cuota = principal * (numerator / denominator);

    // Si la tasa es 0, seria simple division
    if (APR === 0) cuota = principal / months;

    // Actualizar UI
    if (enganchePct) enganchePct.textContent = `${engancheRange.value}%`;
    if (engancheVal)
      engancheVal.textContent = `${window.formatPrice(depositAmt)}`;
    if (mesesVal) mesesVal.textContent = months;
    if (cuotaRes)
      cuotaRes.textContent = `${window.formatPrice(cuota)}`;
  };

  // Bind Events
  if (engancheRange) engancheRange.addEventListener("input", calculateCuota);
  if (mesesRange) mesesRange.addEventListener("input", calculateCuota);

  // Initial Calc
  calculateCuota();
}

function safelySetText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function bindInteractionEvents() {
  // Galeria interaccion
  const mainImg = document.getElementById("main-image");
  const thumbnails = document.querySelectorAll(".thumbnail-item");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      // Quitar activo
      thumbnails.forEach((t) => {
        t.classList.remove(
          "ring-2",
          "ring-primary",
          "ring-offset-2",
          "dark:ring-offset-slate-900",
        );
        t.classList.add("opacity-70");
      });

      // Poner activo al tocado
      thumb.classList.add(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "dark:ring-offset-slate-900",
      );
      thumb.classList.remove("opacity-70");

      // Cambiar imagen principal
      const newSrc = thumb.getAttribute("data-img");
      mainImg.classList.add("opacity-0"); // Transition
      setTimeout(() => {
        mainImg.src = newSrc;
        mainImg.classList.remove("opacity-0");
      }, 150);
    });
  });

  // Contact Form to WhatsApp
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name")?.value || "";
      const phone = document.getElementById("form-phone")?.value || "";
      const email = document.getElementById("form-email")?.value || "";
      const vehicle =
        document.getElementById("title-main")?.innerText || "un vehículo";

      const message = `Hola Exclusiv Motors, soy ${name}. Estoy interesado en el ${vehicle} que vi en su web.\n\nMis datos de contacto son:\nTeléfono: ${phone}\nCorreo: ${email}\n\nMe gustaría recibir más información.`;
      const waUrl = `https://wa.me/5492615340836?text=${encodeURIComponent(message)}`;

      window.open(waUrl, "_blank");
      form.reset();
    });
  }
}
