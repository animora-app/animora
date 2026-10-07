const safe=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
export const store={get:(k,d)=>safe('animora:'+k,d),set:(k,v)=>localStorage.setItem('animora:'+k,JSON.stringify(v))};
export function users(){return store.get('users',[])}
export function signup(name,email,password){email=email.trim().toLowerCase();if(!name||!email||password.length<6)throw Error('Remplis tous les champs (mot de passe : 6 caractères minimum).');const us=users();if(us.some(u=>u.email===email))throw Error('Un compte existe déjà avec cet e-mail.');const u={id:crypto.randomUUID(),name,email,password};store.set('users',[...us,u]);store.set('session',{id:u.id,name:u.name,email:u.email});return u;}
export function login(email,password){const u=users().find(x=>x.email===email.trim().toLowerCase()&&x.password===password);if(!u)throw Error('E-mail ou mot de passe incorrect.');store.set('session',{id:u.id,name:u.name,email:u.email});return u;}
export function currentUser(){return store.get('session',null)}
export function logout(){localStorage.removeItem('animora:session')}
