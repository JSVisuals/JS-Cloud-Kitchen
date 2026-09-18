/* JS Cloud Kitchen website settings */
const CONFIG = {
  whatsappNumber: "916301865012", // Example: "919876543210" — digits only, country code included.
  phoneNumber: "+916301865012",     // Example: "+919876543210"
  businessName: "JS Cloud Kitchen"
};

const toast = document.getElementById("toast");
function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"), 2600);
}

function waUrl(message=""){
  if(!CONFIG.whatsappNumber){
    return null;
  }
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
function setContactLinks(){
  const phone = CONFIG.phoneNumber;
  const phoneHref = phone ? `tel:${phone}` : "#";
  ["phoneTop","phoneLink"].forEach(id=>{
    const el=document.getElementById(id);
    if(!el) return;
    el.href=phoneHref;
    if(id==="phoneLink") el.textContent=phone || "Add phone number";
  });
  ["whatsappTop","whatsappLink","stickyWhatsApp"].forEach(id=>{
    const el=document.getElementById(id);
    if(!el) return;
    const url=waUrl("Hi JS Cloud Kitchen, I would like to place an order.");
    el.href=url || "#";
    el.addEventListener("click",e=>{
      if(!url){e.preventDefault();showToast("Add your WhatsApp number in script.js first.");}
    });
  });
}
setContactLinks();

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const filter=btn.dataset.filter;
    document.querySelectorAll(".food-card").forEach(card=>{
      card.classList.toggle("is-hidden", filter!=="all" && card.dataset.category!==filter);
    });
  });
});

document.querySelectorAll(".order-item").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const item=btn.dataset.item;
    document.querySelector('select[name="item"]').value = item;
    document.getElementById("order").scrollIntoView({behavior:"smooth"});
    showToast(`${item} selected. Complete the order form.`);
  });
});

document.getElementById("orderForm").addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(e.target);
  const message =
`Hi JS Cloud Kitchen!%0A%0A`+
`*New Order Request*%0A`+
`Name: ${data.get("name")}%0A`+
`Phone: ${data.get("phone")}%0A`+
`Item: ${data.get("item")}%0A`+
`Quantity: ${data.get("quantity")}%0A`+
`Address: ${data.get("address")}%0A`+
`Special instructions: ${data.get("notes") || "None"}`;
  const url=waUrl(decodeURIComponent(message));
  if(!url){
    showToast("Add your WhatsApp number in script.js before taking orders.");
    return;
  }
  window.open(url,"_blank","noopener");
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const toggle=document.querySelector(".menu-toggle");
const nav=document.getElementById("nav");
toggle.addEventListener("click",()=>{
  const open=toggle.getAttribute("aria-expanded")==="true";
  toggle.setAttribute("aria-expanded",String(!open));
  nav.style.display=open?"none":"flex";
  if(!open){
    nav.style.position="absolute";nav.style.top="78px";nav.style.left="0";nav.style.right="0";
    nav.style.background="#fffaf3";nav.style.padding="20px 6%";nav.style.flexDirection="column";nav.style.gap="16px";
    nav.style.borderBottom="1px solid rgba(25,19,15,.12)";
  }
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  if(window.innerWidth<=900){nav.style.display="none";toggle.setAttribute("aria-expanded","false");}
}));
