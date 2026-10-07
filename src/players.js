const KEY='animora:streams';

const read=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch{return {}}};

// Sources officielles / légales. Les plateformes peuvent refuser l'intégration iframe :
// dans ce cas Animora ouvre simplement la page officielle.
export const OFFICIAL_SOURCES=[
  {id:'crunchyroll',name:'Crunchyroll',url:'https://www.crunchyroll.com/fr/videos/anime'},
  {id:'adn',name:'ADN',url:'https://animationdigitalnetwork.fr/video'},
  {id:'youtube',name:'YouTube officiel',url:'https://www.youtube.com/results?search_query=anime+officiel'}
];

export function streams(id,ep){
  const a=read();
  return [1,2,3].map(n=>a[`${id}:${ep}:${n}`]||'');
}

export function saveStream(id,ep,n,url){
  const a=read();
  a[`${id}:${ep}:${n}`]=url.trim();
  localStorage.setItem(KEY,JSON.stringify(a));
  return streams(id,ep);
}

export function sourceForReader(reader){
  return OFFICIAL_SOURCES[reader-1]||OFFICIAL_SOURCES[0];
}

export function demoUrl(){return 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'}
export function isDirectVideo(url=''){return /\.(mp4|webm|ogg|m3u8)(\?|#|$)/i.test(url)}
