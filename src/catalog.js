const API='https://api.jikan.moe/v4';
const cache=new Map();
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function get(path){
  if(cache.has(path)) return cache.get(path);
  const p=(async()=>{
    const res=await fetch(API+path,{headers:{accept:'application/json'}});
    if(!res.ok) throw new Error(`Catalogue indisponible (${res.status})`);
    const json=await res.json();
    return json.data;
  })();
  cache.set(path,p); return p;
}
export const catalog={
  search:q=>get(`/anime?q=${encodeURIComponent(q)}&limit=24&sfw=true&order_by=popularity&sort=asc`),
  top:()=>get('/top/anime?limit=24&sfw=true'),
  seasonal:()=>{const d=new Date();const m=d.getUTCMonth()+1;const s=m<=3?'winter':m<=6?'spring':m<=9?'summer':'fall';return get(`/seasons/${d.getUTCFullYear()}/${s}?limit=24`);},
  detail:id=>get(`/anime/${id}/full`),
  episodes:async id=>{let page=1,out=[];while(page<=25){const data=await get(`/anime/${id}/episodes?page=${page}`);out.push(...data);const meta=cache.get(`/anime/${id}/episodes?page=${page}`);if(!meta) break; // page cache stores only data; continue until an empty page
    if(!data.length || data.length<100) break; page++; await wait(80);
  }return out;},
  videos:id=>get(`/anime/${id}/videos`)
};
export function normalize(a){return {id:a.mal_id,title:a.title||'Sans titre',english:a.title_english||'',cover:a.images?.webp?.large_image_url||a.images?.jpg?.large_image_url||'',year:a.year||a.aired?.from?.slice(0,4)||'',score:a.score||0,episodes:a.episodes||0,status:a.status||'',type:a.type||'',synopsis:a.synopsis||'',genres:(a.genres||[]).map(x=>x.name),relations:a.relations||[],trailer:a.trailer?.embed_url||null,url:a.url||'',season:a.season||'',seasonYear:a.year||''};}
export function seasonName(){const m=new Date().getUTCMonth()+1;return m<=3?'Hiver':m<=6?'Printemps':m<=9?'Été':'Automne';}
