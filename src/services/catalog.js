const API = 'https://api.jikan.moe/v4';
const cache = new Map();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function get(path) {
if (cache.has(path)) {
return cache.get(path);
}

const promise = (async () => {
const res = await fetch(API + path, {
headers: {
accept: 'application/json',
},
});

if (!res.ok) {
throw new Error(`Catalogue indisponible (${res.status})`);
}

const json = await res.json();
return json.data;
})();

cache.set(path, promise);
return promise;
}

export const catalog = {
search: (q) =>
get(
`/anime?q=${encodeURIComponent(
q
)}&limit=24&sfw=true&order_by=popularity&sort=asc`
),

top: () => get('/top/anime?limit=24&sfw=true'),

seasonal: () => {
const date = new Date();
const month = date.getUTCMonth() + 1;

const season =
month <= 3
? 'winter'
: month <= 6
? 'spring'
: month <= 9
? 'summer'
: 'fall';

return get(`/seasons/${date.getUTCFullYear()}/${season}?limit=24`);
},

detail: (id) => get(`/anime/${id}/full`),

episodes: async (id) => {
let page = 1;
const output = [];

while (page <= 25) {
const data = await get(`/anime/${id}/episodes?page=${page}`);

if (!data || !data.length) {
break;
}

output.push(...data);

if (data.length < 100) {
break;
}

page++;

await wait(80);
}

return output;
},

videos: (id) => get(`/anime/${id}/videos`),
};

export function normalize(a) {
return {
id: a.mal_id,
title: a.title || 'Sans titre',
english: a.title_english || '',
cover:
a.images?.webp?.large_image_url ||
a.images?.jpg?.large_image_url ||
'',
year: a.year || a.aired?.from?.slice(0, 4) || '',
score: a.score || 0,
episodes: a.episodes || 0,
status: a.status || '',
type: a.type || '',
synopsis: a.synopsis || '',
genres: (a.genres || []).map((genre) => genre.name),
relations: a.relations || [],
trailer: a.trailer?.embed_url || null,
url: a.url || '',
season: a.season || '',
seasonYear: a.year || '',
};
}

export function seasonName() {
const month = new Date().getUTCMonth() + 1;

return month <= 3
? 'Hiver'
: month <= 6
? 'Printemps'
: month <= 9
? 'Été'
: 'Automne';
}
