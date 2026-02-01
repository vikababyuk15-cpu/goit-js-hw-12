import{a as v,S,i as d}from"./assets/vendor-ClNNywv1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const q="54345335-b1d733af450328b2a25aaa978",w="https://pixabay.com/api/";async function f(r,t=1){const s={key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15};return(await v.get(w,{params:s})).data}const m=document.querySelector(".gallery");document.querySelector(".loader");const p=document.querySelector(".load-more");let B=new S(".gallery a",{captionsData:"alt",captionDelay:250});function y(r){const t=r.map(({webformatURL:s,largeImageURL:a,tags:e,likes:o,views:i,comments:b,downloads:L})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${a}">
        <img class="gallery-image" src="${s}" alt="${e}" />
        <div class="info">
          <p><b>Likes:</b> ${o}</p>
          <p><b>Views:</b> ${i}</p>
          <p><b>Comments:</b> ${b}</p>
          <p><b>Downloads:</b> ${L}</p>
        </div>
      </a>
    </li>
  `).join("");m.insertAdjacentHTML("beforeend",t),B.refresh()}function M(){m.innerHTML=""}function g(){p.classList.remove("hidden")}function h(){p.classList.add("hidden")}let l="",n=1,u=0;const $=document.querySelector(".form"),x=document.querySelector(".load-more"),c=document.querySelector(".loading-text");$.addEventListener("submit",async r=>{if(r.preventDefault(),l=r.currentTarget.elements["search-text"].value.trim(),!!l){n=1,M(),h(),c.classList.remove("hidden");try{const t=await f(l,n);u=Math.ceil(t.totalHits/15),t.hits.length===0?d.error({message:"No images found!",position:"topRight"}):(y(t.hits),u>1?g():d.info({message:"End of results",position:"topRight"}))}catch(t){console.log(t)}finally{c.classList.add("hidden")}}});x.addEventListener("click",async()=>{n+=1,h(),c.classList.remove("hidden");try{const r=await f(l,n);y(r.hits),n>=u?d.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"}):g();const t=document.querySelector(".gallery-item");t&&window.scrollBy({top:t.getBoundingClientRect().height*2,behavior:"smooth"})}finally{c.classList.add("hidden")}});
//# sourceMappingURL=index.js.map
