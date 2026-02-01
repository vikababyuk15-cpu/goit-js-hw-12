import{a as S,S as q,i as c}from"./assets/vendor-ClNNywv1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const B="54345335-b1d733af450328b2a25aaa978",M="https://pixabay.com/api/";async function u(r,t=1){const s={key:B,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15};return(await S.get(M,{params:s})).data}const f=document.querySelector(".gallery"),p=document.querySelector(".load-more"),m=document.querySelector(".loader");let $=new q(".gallery a",{captionsData:"alt",captionDelay:250});function y(r){const t=r.map(({webformatURL:s,largeImageURL:a,tags:e,likes:o,views:i,comments:v,downloads:w})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${a}">
        <img class="gallery-image" src="${s}" alt="${e}" />
        <div class="info">
          <p><b>Likes:</b> ${o}</p>
          <p><b>Views:</b> ${i}</p>
          <p><b>Comments:</b> ${v}</p>
          <p><b>Downloads:</b> ${w}</p>
        </div>
      </a>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",t),$.refresh()}function O(){f.innerHTML=""}function h(){m.classList.remove("hidden")}function g(){m.classList.add("hidden")}function b(){p.classList.remove("hidden")}function L(){p.classList.add("hidden")}let l="",n=1,d=0;const P=document.querySelector(".form"),x=document.querySelector(".load-more");P.addEventListener("submit",async r=>{if(r.preventDefault(),l=r.currentTarget.elements["search-text"].value.trim(),!!l){n=1,O(),L(),h();try{const t=await u(l,n);d=Math.ceil(t.totalHits/15),t.hits.length===0?c.error({message:"No images found!",position:"topRight"}):(y(t.hits),d>1?b():c.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"}))}catch(t){console.log(t)}finally{g()}}});x.addEventListener("click",async()=>{n+=1,L(),h();try{const r=await u(l,n);y(r.hits),n>=d?c.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"}):b();const t=document.querySelector(".gallery-item");t&&window.scrollBy({top:t.getBoundingClientRect().height*2,behavior:"smooth"})}finally{g()}});
//# sourceMappingURL=index.js.map
