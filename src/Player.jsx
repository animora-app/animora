import React,{useEffect,useState}from'react';
import {demoUrl,isDirectVideo,saveStream,streams,sourceForReader} from '../lib/players';

export default function Player({anime,episode}){
  const [reader,setReader]=useState(1),[urls,setUrls]=useState(()=>streams(anime.id,episode)),[editing,setEditing]=useState(false);
  useEffect(()=>setUrls(streams(anime.id,episode)),[anime.id,episode]);
  const url=urls[reader-1];
  const official=sourceForReader(reader);
  const save=()=>setUrls(saveStream(anime.id,episode,reader,urls[reader-1]));
  const openOfficial=()=>window.open(official.url,'_blank','noopener,noreferrer');

  return <section className="player">
    <div className="player-top">
      <div><b>Lecteurs Animora</b><small>Épisode {episode}</small></div>
      <div className="reader-tabs">{[1,2,3].map(n=><button key={n} className={reader===n?'active':''} onClick={()=>setReader(n)}>Lecteur {n}</button>)}</div>
    </div>

    <div className="screen">
      {url ? (
        isDirectVideo(url)
          ? <video src={url} controls playsInline/>
          : <iframe src={url} title={'Animora Lecteur '+reader} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen/>
      ) : (
        <div className="player-empty">
          <div className="play">▶</div>
          <h3>Lecteur {reader} · {official.name}</h3>
          <p>Source officielle disponible pour cet épisode. Si la plateforme bloque l’intégration, ouvre-la directement.</p>
          <button onClick={openOfficial}>Ouvrir {official.name}</button>
          <button onClick={()=>{const n=[...urls];n[reader-1]=demoUrl();setUrls(n);saveStream(anime.id,episode,reader,n[reader-1])}}>Tester le lecteur</button>
        </div>
      )}
    </div>

    <div className="player-tools">
      <button onClick={()=>setEditing(!editing)}>{editing?'Fermer':'Configurer les lecteurs'}</button>
      {editing&&<div className="stream-form">
        <input value={urls[reader-1]} onChange={e=>{const n=[...urls];n[reader-1]=e.target.value;setUrls(n)}} placeholder="URL MP4 / HLS / iframe que tu as le droit de diffuser"/>
        <button className="primary" onClick={save}>Enregistrer Lecteur {reader}</button>
      </div>}
    </div>
    <small className="legal-note">Les trois lecteurs proposent des sources officielles. Les URLs vidéo personnalisées doivent être autorisées à la diffusion.</small>
  </section>
}
