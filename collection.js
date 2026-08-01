/* ===========================
      URL CATEGORY
=========================== */

const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "flower";

/* ===========================
      COLLECTION DATA
=========================== */

const collectionInfo = {
    phonecharms:{
        title:"Phone Charms",
        desc:"Cute handmade crochet charms to brighten your phone.",
        banner:"Assets/banner.png"
    },
    keychain:{
        title:"Keychains",
        desc:"Tiny crochet companions made with love.",
        banner:"Assets/banner.png"
    },
    amigurumi:{
        title:"Amigurumi",
        desc:"Adorable handmade crochet friends.",
        banner:"Assets/banner.png"
    },
    bracelet:{
        title:"Bracelets",
        desc:"Elegant crochet bracelets for every occasion.",
        banner:"Assets/banner.png"
    },
    hair:{
        title:"Hair Accessories",
        desc:"Soft crochet accessories for every hairstyle.",
        banner:"Assets/banner.png"
    },
    bag:{
        title:"Bags",
        desc:"Handcrafted crochet bags you'll love carrying.",
        banner:"Assets/banner.png"
    },
    flower:{
        title:"Flowers",
        desc:"Forever blooming handmade crochet flowers.",
        banner:"Assets/banner.png"
    },
    combo:{
        title:"Gift Combos",
        desc:"Beautiful handmade gift sets.",
        banner:"Assets/banner.png"
    },
    rakhi:{
        title:"Rakhi Collection",
        desc:"Celebrate with handmade crochet rakhis.",
        banner:"Assets/banner.png"
    }
};

/* ===========================
      CHANGE HERO
=========================== */

const hero = document.querySelector(".collection-hero");
if (hero && collectionInfo[category]) {
    hero.style.backgroundImage = `url(${collectionInfo[category].banner})`;
    document.getElementById("collectionTitle").textContent = collectionInfo[category].title;
    document.getElementById("collectionDescription").textContent = collectionInfo[category].desc;
}

/* ===========================
      GOOGLE SHEET
=========================== */

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTaDF8jn6Kl76pzQYbrFFRERaGYz3kfjaHtJrNWMc9aYSRRdrO00SuDPOirvGVL3f5p3TjMWspi54NQ/pub?output=csv";

loadProducts();

async function loadProducts(){

    const response = await fetch(SHEET_URL);
    const csv = await response.text();
    const rows = csv.trim().split("\n");

    const headers = rows[0].split(",").map(h => h.trim());

    const products = rows.slice(1).map(row => {
        const values = row.split(",").map(v => v.trim());
        const obj = {};
        headers.forEach((header, i) => {
            obj[header] = values[i];
        });
        return obj;
    });

    /* ===========================
          FILTER PRODUCTS
    =========================== */

    const filteredProducts = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
    );

    /* ===========================
          PRODUCT COUNT
    =========================== */

    const totalEl = document.getElementById("totalProducts");
    if(totalEl) totalEl.textContent = `${filteredProducts.length} Products`;

    const productGrid = document.getElementById("productGrid");

    /* ===========================
          EMPTY STATE
    =========================== */

    if(filteredProducts.length === 0){
        productGrid.innerHTML = `
            <div class="empty-state">
                <h2>No products found.</h2>
                <p>We're working on this collection.</p>
            </div>
        `;
        return;
    }

    /* ===========================
          PRODUCT CARDS (SWIPER WRAPPER)
    =========================== */

    // Wraps elements in swiper structure
    productGrid.innerHTML = `
        <div class="swiper myProductSwiper">
            <div class="swiper-wrapper">
                ${filteredProducts.map(p => `
                    <div class="swiper-slide">
                        <div class="product-card">
                            <img src="${p.image}" alt="${p.name}">
                            <div class="product-info">
                                <h3>${p.name}</h3>
                                <p class="price">₹${p.price}</p>
                                <a href="https://wa.me/919152368605?text=Hi! I'm interested in the *${p.name}*."
                                   target="_blank" class="card-btn">
                                    Order Now
                                </a>
                            </div>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `;

    /* ===========================
          INITIALIZE SWIPER
    =========================== */
    initSwiper();
}

function initSwiper() {
    new Swiper('.myProductSwiper', {
        slidesPerView: 1.15,     // Screen par 1 main card + side pe chhota peek
        centeredSlides: true,    // Main card ko horizontal center rakhta hai
        loop: false,             // First item se overflow cut hone se bachata hai
        spaceBetween: 16,        // Cards ke beech ka gap
        grabCursor: true,

        navigation: {
            nextEl: '#nextBtn',
        },

        breakpoints: {
            640: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 24,
            }
        }
    });
}