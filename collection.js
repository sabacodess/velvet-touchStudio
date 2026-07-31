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
        banner:"Assets/Banners/phonecharms.jpg"
    },

    keychain:{
        title:"Keychains",
        desc:"Tiny crochet companions made with love.",
        banner:"Assets/Banners/keychain.jpg"
    },

    amigurumi:{
        title:"Amigurumi",
        desc:"Adorable handmade crochet friends.",
        banner:"Assets/Banners/amigurumi.jpg"
    },

    bracelet:{
        title:"Bracelets",
        desc:"Elegant crochet bracelets for every occasion.",
        banner:"Assets/Banners/bracelet.jpg"
    },

    hair:{
        title:"Hair Accessories",
        desc:"Soft crochet accessories for every hairstyle.",
        banner:"Assets/Banners/hair.jpg"
    },

    bag:{
        title:"Bags",
        desc:"Handcrafted crochet bags you'll love carrying.",
        banner:"Assets/Banners/bag.jpg"
    },

    flower:{
        title:"Flowers",
        desc:"Forever blooming handmade crochet flowers.",
        banner:"Assets/Banners/flower.jpg"
    },

    combo:{
        title:"Gift Combos",
        desc:"Beautiful handmade gift sets.",
        banner:"Assets/Banners/combo.jpg"
    },

    rakhi:{
        title:"Rakhi Collection",
        desc:"Celebrate with handmade crochet rakhis.",
        banner:"Assets/Banners/rakhi.jpg"
    }

};

/* ===========================
      CHANGE HERO
=========================== */

const hero=document.querySelector(".collection-hero");

hero.style.backgroundImage=
`url(${collectionInfo[category].banner})`;

document.getElementById("collectionTitle").textContent=
collectionInfo[category].title;

document.getElementById("collectionDescription").textContent=
collectionInfo[category].desc;


/* ===========================
      GOOGLE SHEET
=========================== */

const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vTaDF8jn6Kl76pzQYbrFFRERaGYz3kfjaHtJrNWMc9aYSRRdrO00SuDPOirvGVL3f5p3TjMWspi54NQ/pub?output=csv";


loadProducts();

async function loadProducts(){

    const response=await fetch(SHEET_URL);

    const csv=await response.text();

    const rows=csv.trim().split("\n");

    const headers=rows[0]
    .split(",")
    .map(h=>h.trim());

    const products=rows.slice(1).map(row=>{

        const values=row.split(",")
        .map(v=>v.trim());

        const obj={};

        headers.forEach((header,i)=>{

            obj[header]=values[i];

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

    document.getElementById("totalProducts").textContent =
        `${filteredProducts.length} Products`;

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
            PRODUCT CARDS
    =========================== */

    productGrid.innerHTML = filteredProducts.map(p => `

        <div class="product-card">

            <img src="${p.image}" alt="${p.name}">

            <div class="product-info">

                <h3>${p.name}</h3>

                <p class="price">
                    ₹${p.price}
                </p>

                <a
                href="https://wa.me/919152368605?text=Hi! I'm interested in the *${p.name}*."
                target="_blank"
                class="card-btn">

                    Order Now

                </a>

            </div>

        </div>

    `).join("");

}
