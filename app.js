/* =========================================================
   go DC Tower — interactivity
   ========================================================= */

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const fmt = (n) => '€ ' + n.toFixed(2).replace('.', ',');

/* -------- menu data -------- */
const DISHES = [
  // LA MIAN
  { id:'lm-coco',   cat:'la-mian', name:'Kokoscurry La Mian',  desc:'Handgezogene Nudeln · Hühnchen · Kokos · Limettenblatt', price:14.90, tag:'spicy', tagText:'Mild scharf',
    img:'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=700&q=80&auto=format&fit=crop' },
  { id:'lm-bul',    cat:'la-mian', name:'Bulgogi Huhn La Mian', desc:'Mariniertes Huhn · Frühlingszwiebel · scharfe Brühe', price:14.50, tag:'spicy', tagText:'Scharf',
    img:'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=700&q=80&auto=format&fit=crop' },
  { id:'lm-beef',   cat:'la-mian', name:'Beef La Mian',          desc:'Geschmorte Rindfleischscheiben · Pak Choi · Sesam', price:15.90,
    img:'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=700&q=80&auto=format&fit=crop' },
  { id:'lm-veg',    cat:'la-mian', name:'Veggie La Mian',        desc:'Knackiges Marktgemüse · Misobrühe · Tofu',          price:12.90, tag:'veg', tagText:'Vegan',
    img:'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=700&q=80&auto=format&fit=crop' },

  // RAMEN
  { id:'ra-tonk',   cat:'ramen', name:'Tonkotsu Ramen', desc:'Cremige Schweineknochen-Brühe · Chashu · Ei · Nori', price:15.50, tag:'new', tagText:'Neu',
    img:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&q=80&auto=format&fit=crop' },
  { id:'ra-shoyu',  cat:'ramen', name:'Shoyu Ramen',    desc:'Klassische Sojasaucenbrühe · Hühnchen · Bambus',     price:14.50,
    img:'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=700&q=80&auto=format&fit=crop' },
  { id:'ra-miso',   cat:'ramen', name:'Miso Ramen',     desc:'Rote Miso-Brühe · Mais · Frühlingszwiebel · Sesam',   price:14.50,
    img:'https://images.unsplash.com/photo-1632709810780-b5a4343cefea?w=700&q=80&auto=format&fit=crop' },
  { id:'ra-veg',    cat:'ramen', name:'Veggie Shio Ramen', desc:'Klare Salzbrühe · Tofu · Spinat · Pilze',          price:13.50, tag:'veg', tagText:'Vegan',
    img:'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=700&q=80&auto=format&fit=crop' },

  // BOWLS
  { id:'bo-bulgo',  cat:'bowls', name:'Bulgogi Huhn Bowl', desc:'Jasminreis · mariniertes Huhn · Edamame · Sesam',  price:13.90,
    img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80&auto=format&fit=crop' },
  { id:'bo-lachs',  cat:'bowls', name:'Teriyaki Lachs Bowl', desc:'Lachs · Avocado · Edamame · Sushi-Reis',          price:15.90,
    img:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&q=80&auto=format&fit=crop' },
  { id:'bo-poke',   cat:'bowls', name:'Tuna Poke Bowl',     desc:'Thunfisch · Mango · Gurke · Wakame · Sesam',       price:15.50,
    img:'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=700&q=80&auto=format&fit=crop' },
  { id:'bo-buddha', cat:'bowls', name:'Buddha Bowl',        desc:'Quinoa · Süßkartoffel · Avocado · Hummus',         price:12.90, tag:'veg', tagText:'Vegan',
    img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=80&auto=format&fit=crop' },

  // WOK
  { id:'wo-beef',   cat:'wok', name:'Beef Wok',     desc:'Rindfleisch · Brokkoli · Cashew · Oystersauce',           price:14.50,
    img:'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=700&q=80&auto=format&fit=crop' },
  { id:'wo-huhn',   cat:'wok', name:'Cashew Huhn',  desc:'Huhn · Paprika · Cashew · süß-scharfe Sauce',             price:13.90, tag:'spicy', tagText:'Scharf',
    img:'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=700&q=80&auto=format&fit=crop' },
  { id:'wo-veg',    cat:'wok', name:'Veggie Wok',    desc:'Marktgemüse · Glasnudeln · Ingwer · Limette',             price:12.50, tag:'veg', tagText:'Vegan',
    img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700&q=80&auto=format&fit=crop' },

  // GYOZA
  { id:'gy-huhn',   cat:'gyoza', name:'Klassik Gyoza (6 St.)',  desc:'Hühnchenfüllung · Sojasauce · Sesamöl',         price:7.90,
    img:'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=700&q=80&auto=format&fit=crop' },
  { id:'gy-veg',    cat:'gyoza', name:'Veggie Gyoza (6 St.)',   desc:'Gemüsefüllung · Ponzu · Frühlingszwiebel',      price:7.50, tag:'veg', tagText:'Vegan',
    img:'https://images.unsplash.com/photo-1604908554049-01477be51b07?w=700&q=80&auto=format&fit=crop' },
  { id:'gy-sum',    cat:'gyoza', name:'Veggie Summerrolls',     desc:'Reispapier · Avocado · Glasnudeln · Erdnusssauce', price:6.90, tag:'veg', tagText:'Vegan',
    img:'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=700&q=80&auto=format&fit=crop' },

  // SUSHI
  { id:'su-mag',    cat:'sushi', name:'Maguro Sushi (4 St.)', desc:'Thunfisch · Sushi-Reis · Wasabi · Soja',          price:9.90,
    img:'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=700&q=80&auto=format&fit=crop' },
  { id:'su-thun',   cat:'sushi', name:'Thunfisch Maki (8 St.)', desc:'Klassische Maki-Rolle · Wasabi · Gari',          price:8.90,
    img:'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=700&q=80&auto=format&fit=crop' },
  { id:'su-lachs',  cat:'sushi', name:'Lachs Maki (8 St.)',     desc:'Frischer Lachs · Sushi-Reis · Nori',             price:8.50,
    img:'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=700&q=80&auto=format&fit=crop' },
  { id:'su-rain',   cat:'sushi', name:'Rainbow Roll (8 St.)',   desc:'Lachs · Thunfisch · Avocado · Surimi',           price:13.90, tag:'new', tagText:'Neu',
    img:'https://images.unsplash.com/photo-1553621042-f6e147245754?w=700&q=80&auto=format&fit=crop' },
];

/* -------- state -------- */
const cart = new Map(); // id -> qty
let activeCat = 'all';

/* -------- render dishes -------- */
function renderDishes(){
  const grid = $('#menuGrid');
  const filtered = activeCat === 'all' ? DISHES : DISHES.filter(d => d.cat === activeCat);

  grid.innerHTML = filtered.map(d => `
    <article class="dish" data-cat="${d.cat}">
      <div class="dish-photo" style="background-image:url('${d.img}')">
        ${d.tag ? `<span class="dish-tag ${d.tag}">${d.tagText}</span>` : ''}
      </div>
      <div class="dish-body">
        <h3 class="dish-name">${d.name}</h3>
        <p class="dish-desc">${d.desc}</p>
        <div class="dish-foot">
          <span class="dish-price"><span class="currency">€</span>${d.price.toFixed(2).replace('.', ',')}</span>
          <button class="add-btn" data-add="${d.id}" aria-label="${d.name} hinzufügen">+</button>
        </div>
      </div>
    </article>
  `).join('');
}

/* -------- tabs -------- */
$$('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.tab').forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    activeCat = tab.dataset.cat;
    renderDishes();
  });
});

/* -------- cart logic -------- */
function addToCart(id){
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
  // bump animation
  const btn = $(`.add-btn[data-add="${id}"]`);
  if(btn){
    btn.classList.remove('is-bumped');
    void btn.offsetWidth;
    btn.classList.add('is-bumped');
  }
}
function changeQty(id, delta){
  const next = (cart.get(id) || 0) + delta;
  if(next <= 0) cart.delete(id);
  else cart.set(id, next);
  renderCart();
}

function renderCart(){
  const list = $('#cartList');
  const items = [...cart.entries()].map(([id, qty]) => ({...DISHES.find(d=>d.id===id), qty}));
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  // simple delivery fee assumption
  const total = subtotal;

  if(items.length === 0){
    list.innerHTML = `<li class="cart-empty">Noch nichts ausgewählt.<br/>Tippe auf <span class="plus-mini">+</span>, um Gerichte hinzuzufügen.</li>`;
  } else {
    list.innerHTML = items.map(i => `
      <li class="cart-item">
        <div class="cart-thumb" style="background-image:url('${i.img}')"></div>
        <div class="cart-info">
          <div class="cart-name">${i.name}</div>
          <div class="cart-price-line">${fmt(i.price)} · Stk.</div>
        </div>
        <div class="qty">
          <button aria-label="Weniger" data-dec="${i.id}">−</button>
          <span class="qty-num">${i.qty}</span>
          <button aria-label="Mehr" data-inc="${i.id}">+</button>
        </div>
      </li>
    `).join('');
  }

  $('#cartSubtotal').textContent = fmt(subtotal);
  $('#cartTotal').textContent    = fmt(total);
  $('#cartBadge').textContent    = count;
  $('#cartBadgeJump').textContent = count;
  $('#stickyCount').textContent  = `${count} · ${fmt(total)}`;

  $('#checkoutBtn').disabled = items.length === 0;
}

/* delegated cart events */
document.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add]');
  if(add){ addToCart(add.dataset.add); return; }
  const inc = e.target.closest('[data-inc]');
  if(inc){ changeQty(inc.dataset.inc, +1); return; }
  const dec = e.target.closest('[data-dec]');
  if(dec){ changeQty(dec.dataset.dec, -1); return; }
});

/* -------- mobile nav toggle -------- */
const navToggle = $('#navToggle');
const navMobile = $('#navMobile');
navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  navMobile.hidden = open;
});
navMobile?.addEventListener('click', (e) => {
  if(e.target.matches('a')){
    navToggle.setAttribute('aria-expanded', 'false');
    navMobile.hidden = true;
  }
});

/* -------- reservation form -------- */
const resForm = $('#reserveForm');
resForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const status = $('#reserveStatus');
  const data = Object.fromEntries(new FormData(resForm).entries());
  if(!data.date || !data.time || !data.guests || !data.name || !data.email){
    status.textContent = 'Bitte fülle Datum, Uhrzeit, Personen, Name und E-Mail aus.';
    status.classList.add('is-error');
    return;
  }
  status.classList.remove('is-error');
  status.textContent = `Danke ${data.name.split(' ')[0]}! Reservierung für ${data.guests} Person(en) am ${data.date} um ${data.time} Uhr wird geprüft — Bestätigung kommt per E-Mail.`;
  resForm.reset();
});

/* prefill date today */
(() => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth()+1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateInput = $('#r-date');
  if(dateInput){
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
})();

/* -------- checkout modal -------- */
const modal = $('#checkoutModal');
$('#checkoutBtn')?.addEventListener('click', () => {
  if(cart.size === 0) return;
  modal.hidden = false;
});
modal?.addEventListener('click', (e) => {
  if(e.target.matches('[data-close]')){
    modal.hidden = true;
  }
});

/* -------- boot -------- */
renderDishes();
renderCart();
