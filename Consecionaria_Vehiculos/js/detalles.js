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
      id: "v001",
      brand: "Porsche",
      model: "911 Carrera",
      year: 2023,
      price: 114000,
      currency: "$",
      mileage: 8400,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAmTqkrf-Squ01psj3yABM6FDKVNQhcJwk4ZYOLpyQkmSFfu7rg8x7irWYarpbQHavpTAgk2GMa5Z67IVDnR2x3n7mvyqCw1vWa6SDWdWj3Nxd16uX3gry5t_LlOw27D_5orgqzY1o0zIblNP-qG6J6fRqHgs-zZQgpaotXSwXYzwgVC8orfuE9X3dIuXmRD4He9gj7f5tCv4Xhkp2pZnLurOyZhhKbf46ByrjDyMleiOJdGnBfdndo0Toram-4fxG6rYYxiQ_TCg4",
      gallery: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAmTqkrf-Squ01psj3yABM6FDKVNQhcJwk4ZYOLpyQkmSFfu7rg8x7irWYarpbQHavpTAgk2GMa5Z67IVDnR2x3n7mvyqCw1vWa6SDWdWj3Nxd16uX3gry5t_LlOw27D_5orgqzY1o0zIblNP-qG6J6fRqHgs-zZQgpaotXSwXYzwgVC8orfuE9X3dIuXmRD4He9gj7f5tCv4Xhkp2pZnLurOyZhhKbf46ByrjDyMleiOJdGnBfdndo0Toram-4fxG6rYYxiQ_TCg4",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAOR_AjPCpAOW9uf0PXV6c7ohTSVg0006AHzq6iqPA-BoC2GQUcw66UOhpPJRTq1G8-8WcV9urCXoGL4FRRA9ssb5SKZjonAxIa34YsZYxk0nH-GIPhQXDvLolPrTv1qggH3B_sVJFuyDuoc6u1PBmyu37rihzjydYmVpirSYXm3R1oLVoir-F4YhZpLireIK5bwpLzOQTZt3ytqqPcvkl4dHM7cv-tuXrnSdocoOHl9j09uAcSSmujDawXAlox-cFdTeC8Gk7e17I",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDp_WgZATm40t1jxiXX9C13h95gy7uT9C8LyTeV87BD5FyfojNnuDDNdfMLm_scAcqt37siS7r8olDtXZpQZGHsnhWK36eKafDlrDq-3XKprK5pxZ6AMNjELLKdQRkywfbsZtebEl1xC9DK8PlwWEUkLkNLK1xh-W-Hbs5ucqdLkxGen_V6clHn0c_5_smewKbDh7w3thXBgeUmTciaykLkbGeQRfVtrQYYm2v4XG7brKDzwfEq4b4jNwvRohZvhWhvO7mfZP0Lg9w",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCzFqppWj8Yu-08YoEbRdQn1PwnDaYubIz13BGqKSjDJkrGG9hxu0SrVDidCioub_M5GLRDMw4l_zkuFKPQbbsD89LbANffAKPggIxNxPCaWWO8IW2iuNYh_om2ABz_w7QiUPIzq8LYmEf1g35-Kk_Xg4sg71SC0iIoyE80EvKjxnAVor6-xyOwGMl5GpPRKB17kEni52B0ZPFe4arxgp5LmYxIkcTtVhhY3pAtkat8enm1-RKCT4mkKK4-UD8DGv1T2WwIk_nCnIg",
      ],
      description:
        "Icónico diseño deportivo con motor biturbo de seis cilindros.",
      specsFull: {
        engine: "3.0L Turbo V6",
        power: "385 HP",
        acceleration: "3.8s",
        transmission: "Automática 8-Vel",
        drive: "RWD",
        fuel: "8.5 km/l",
      },
      features: [
        "Techo panorámico Sky Lounge",
        "Sistema de sonido Harman Kardon",
        "Asientos de cuero con calefacción",
        'Llantas de aleación de 20"',
      ],
    },
    {
      id: "v002",
      brand: "Mercedes-Benz",
      model: "GLE",
      year: 2024,
      price: 89500,
      currency: "$",
      mileage: 0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCosf9rnA5JVC77_0Mr0_yXVeTqnO1r7mkdDkpQ8n1pYyx5AebFp6pFEBDNqS7So1I_zhTuMelPprqXsFsfX1Ot4f6PDNinrm8FR2kJAdKPRearMF7UvphALuJY_aH0xvNvOVr3-e-0_Nlpe31uBRnFHku-a0fZymbqyTXWHlsWR_3zdPuT-AAKqXAqp03Z2UpwIaHtPhQs2cGrc2yI3r-rfJaJf-7eODV4yTJc6P09wEKhtBMHhEnt9z0WtyvQA_Px7_PRBPFyUJM",
      gallery: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCosf9rnA5JVC77_0Mr0_yXVeTqnO1r7mkdDkpQ8n1pYyx5AebFp6pFEBDNqS7So1I_zhTuMelPprqXsFsfX1Ot4f6PDNinrm8FR2kJAdKPRearMF7UvphALuJY_aH0xvNvOVr3-e-0_Nlpe31uBRnFHku-a0fZymbqyTXWHlsWR_3zdPuT-AAKqXAqp03Z2UpwIaHtPhQs2cGrc2yI3r-rfJaJf-7eODV4yTJc6P09wEKhtBMHhEnt9z0WtyvQA_Px7_PRBPFyUJM",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAOR_AjPCpAOW9uf0PXV6c7ohTSVg0006AHzq6iqPA-BoC2GQUcw66UOhpPJRTq1G8-8WcV9urCXoGL4FRRA9ssb5SKZjonAxIa34YsZYxk0nH-GIPhQXDvLolPrTv1qggH3B_sVJFuyDuoc6u1PBmyu37rihzjydYmVpirSYXm3R1oLVoir-F4YhZpLireIK5bwpLzOQTZt3ytqqPcvkl4dHM7cv-tuXrnSdocoOHl9j09uAcSSmujDawXAlox-cFdTeC8Gk7e17I",
      ],
      description:
        "SUV de lujo que combina elegancia, tecnología y capacidad todo terreno.",
      specsFull: {
        engine: "3.0L Inline-6 Híbrido",
        power: "362 HP",
        acceleration: "5.5s",
        transmission: "Automática 9-Vel",
        drive: "AWD",
        fuel: "10.2 km/l",
      },
      features: [
        "MBUX con pantalla dual",
        "Suspensión neumática Airmatic",
        "Paquete Energizing Plus",
        'Llantas AMG 21"',
      ],
    },
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
  safelySetText("price-main", `${v.currency}${v.price.toLocaleString()} USD`);
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
                <span class="text-slate-700 dark:text-slate-300 font-medium">${feat}</span>
            </li>
            `;
    });
  }

  // Financiacion Calc
  safelySetText("fin-price", `${v.currency}${v.price.toLocaleString()}`);

  const engancheRange = document.getElementById("fin-enganche-range");
  const mesesRange = document.getElementById("fin-meses-range");
  const engancheVal = document.getElementById("fin-enganche-val");
  const enganchePct = document.getElementById("fin-enganche-pct");
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
      engancheVal.textContent = `${v.currency}${Math.round(depositAmt).toLocaleString()}`;
    if (mesesVal) mesesVal.textContent = months;
    if (cuotaRes)
      cuotaRes.textContent = `${v.currency}${Math.round(cuota).toLocaleString()}`;
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

      const message = `Hola AutoElite, soy ${name}. Estoy interesado en el ${vehicle} que vi en su web.\n\nMis datos de contacto son:\nTeléfono: ${phone}\nCorreo: ${email}\n\nMe gustaría recibir más información.`;
      const waUrl = `https://wa.me/15551234567?text=${encodeURIComponent(message)}`;

      window.open(waUrl, "_blank");
      form.reset();
    });
  }
}
