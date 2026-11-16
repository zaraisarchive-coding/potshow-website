/* POTSHOW — script.js (pemutar YouTube + share + footer + tampilkan lebih sedikit) */
const $=s=>$d.querySelector(s),$d=document,rnd=s=>()=>(s=(s*9301+49297)%233280)/233280;
const IMG={
 logo:"images/logo.png",
 hero:"images/background hero.jpg",
 pod:"images/close the door.png",
 host1:"images/gita wirjawan.jpg", host2:"images/ferry irwandi.png", host3:"images/gofar hilman.jpg",
 mix:"images/studio podcast.jpg",
 user1:"images/Rian Hidayat.jpg", user2:"images/Nadia Syahrani.jpg", user3:"images/Budi Wicaksono.jpg"
};
/* DAFTAR PODCAST — link: tempel link YouTube biasa (youtu.be/... atau youtube.com/watch?v=...) */
const EPISODES=[
 {judul:"Misteri Serangan Makhluk Halus di Asrama Angker Pondok Pesantren",kategori:"Horor",deskripsi:"Noice Midnight Story. Kisah horor misteri tentang serangan makhluk halus di asrama angker pondok pesantren.",cover:"",audio:"",durasi:"",link:"https://youtu.be/dF5up6EOu7M?si=W2Y9f5JMDdLGk3yK"},
 {judul:"Eps 119: Cara Mengatur Keuangan",kategori:"Bisnis",deskripsi:"Podcast Thirty Days of Lunch. Obrolan nyata tentang investasi dan finansial untuk anak muda bersama Fellexandro Ruby.",cover:"images/thirty days of lunch.jpg",audio:"",durasi:"",link:"https://youtu.be/lM26vQgr-rA?si=0DKc4_vO4hT9H1me"},
 {judul:"Misteri Kota Gaib Wentira",kategori:"Horor",deskripsi:"Podcast Meja Mongol. Sara Wijayanto dan Fajar Aditya menceritakan pengalaman merinding di kota gaib.",cover:"images/kota gaib wentira.jpg",audio:"",durasi:"",link:"https://youtu.be/-05AS7lWpEo?si=Y8cd9Suv5jgxKcoP"},
 {judul:"PWK: Obrolan Kosong Bikin Ngakak",kategori:"Komedi",deskripsi:"Podcast Warung Kopi (PWK). Praz Teguh ngobrol santai dan brutal bareng bintang tamu di set warung kopi.",cover:"images/pwk.jpg",audio:"",durasi:"",link:"https://youtu.be/yjBPhdeTBiw?si=cQviYgSixAWV4jE3"},
 {judul:"Jangan Bikin Startup Sebelum Nonton Ini",kategori:"Bisnis",deskripsi:"Podcast Raymond Chin. Membedah realita pahit dunia bisnis yang jarang diungkap ke publik.",cover:"images/raymond chin.jpg",audio:"",durasi:"",link:"https://youtu.be/hXOCjdtKiks?si=KpGJRqqpPnwJo7H1"},
 {judul:"Wapres mundur.. Ada yang mencoba makar!? Mahfud MD berbicara !!",kategori:"Politik",deskripsi:"Podcast Close The Door. Deddy Corbuzier berbincang dengan Mahfud MD membahas isu politik yang sedang ramai.",cover:"",audio:"",durasi:"",link:"https://youtu.be/pKmc_uJ0LwI?si=aH9R8M8x_tDm5ixi"}
];
/* =====================================================================
   DAFTAR TOPIK TREN (8 tombol "Masuk ke Topik yang Sedang Tren")
   link  : tempel link YouTube. Kalau diisi, tombol play langsung memutar video
           DAN topik ini otomatis ikut masuk ke daftar Episode Terpopuler.
   grup  : kategori filter di Episode Terpopuler: "Bisnis" | "Horor" | "Komedi"
   cover     : (boleh kosong) gambar sampul, kosong = thumbnail YouTube
   deskripsi : (boleh kosong) ringkasan singkat di kartu
   ===================================================================== */
const TOPIK=[
 {kategori:"Finansial",judul:"Obrolan Finansial Gen-Z",durasi:"54 m",grup:"Bisnis",link:"https://www.youtube.com/watch?v=FHpifiwwVxw"},
 {kategori:"Horor",judul:"Misteri Kota Lama",durasi:"60 mnt",grup:"Horor",link:"https://www.youtube.com/watch?v=1orguNVFATA"},
 {kategori:"Kesehatan",judul:"Mental Health 101",durasi:"13 mnt",grup:"Bisnis",link:"https://www.youtube.com/watch?v=SErzkpN1DZE"},
 {kategori:"Kuliner",judul:"Filosofi Kopi & Senja",durasi:"84 mnt",grup:"Komedi",link:"https://www.youtube.com/watch?v=cw83drDl7PU"},
 {kategori:"Hiburan",judul:"Bedah Buku Best Seller",durasi:"10 mnt",grup:"Komedi",link:"https://www.youtube.com/watch?v=a6LQIgzKRoY"},
 {kategori:"Karier",judul:"Karier Era AI",durasi:"100 mnt",grup:"Bisnis",link:"https://www.youtube.com/watch?v=FYOwRcJSueY"},
 {kategori:"Inspirasi",judul:"Kisah Diaspora",durasi:"96 mnt",grup:"Bisnis",link:"https://www.youtube.com/watch?v=ppmo71B-LEA"},
 {kategori:"Budaya",judul:"Musik Indie & Pop Culture",durasi:"2 mnt",grup:"Komedi",link:"https://www.youtube.com/watch?v=KKzink4cR4w"}
];
/* ---------- gambar contoh (placeholder) ---------- */
const U=s=>"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(s),NS='xmlns="http://www.w3.org/2000/svg"';
function person(x,y,s,h,mic){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-70 200c0-70 30-95 70-95s70 25 70 95z" fill="hsl(${h} 35% 14%)"/><circle cx="0" cy="62" r="34" fill="hsl(${h} 30% 20%)"/><path d="M-36 58a36 36 0 0172 0" fill="none" stroke="hsl(${h} 70% 60%)" stroke-width="6"/>${mic?`<rect x="-8" y="96" width="16" height="44" rx="8" fill="#1f0f3a" stroke="hsl(${h} 80% 65%)" stroke-width="2"/>`:""}</g>`}
function scene(h,seed,w,ht,ppl,tag){const r=rnd(seed);let b="";for(let i=0;i<16;i++)b+=`<circle cx="${r()*w}" cy="${r()*ht*.7}" r="${6+r()*26}" fill="hsl(${h+r()*70} 90% 60%)" opacity="${.07+r()*.18}"/>`;
return U(`<svg ${NS} viewBox="0 0 ${w} ${ht}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="hsl(${h} 55% 20%)"/><stop offset="1" stop-color="#1f0f3a"/></linearGradient></defs><rect width="${w}" height="${ht}" fill="url(#g)"/>${b}<rect x="0" y="${ht*.12}" width="${w}" height="3" fill="hsl(${h+30} 100% 65%)" opacity=".7"/>${ppl}${tag?`<text x="12" y="${ht-12}" font-family="sans-serif" font-size="${Math.max(11,w/28)}" fill="#94A3B8">${tag}</text>`:""}</svg>`)}
let mx="";for(let r=0;r<2;r++)for(let i=0;i<10;i++){const x=40+i*34,y=r?230:80;mx+=`<rect x="${x}" y="${y}" width="6" height="110" rx="3" fill="#43246b"/><rect x="${x-5}" y="${y+20+((i*37+r*23)%70)}" width="16" height="12" rx="3" fill="${i%3?'#f71a67':'#fcb53b'}"/>`}
for(let i=0;i<8;i++)mx+=`<circle cx="${60+i*40}" cy="46" r="11" fill="#1f0f3a" stroke="${i%2?'#f71a67':'#fcb53b'}" stroke-width="3"/>`;
const avatar=h=>U(`<svg ${NS} viewBox="0 0 64 64"><rect width="64" height="64" fill="hsl(${h} 45% 28%)"/><circle cx="32" cy="26" r="11" fill="hsl(${h} 60% 75%)"/><path d="M10 64c2-14 10-20 22-20s20 6 22 20z" fill="hsl(${h} 60% 75%)"/></svg>`);
const PH={hero:scene(300,7,1440,640,person(520,120,1.5,330,1)+person(920,140,1.4,20,1),"IMG.hero"),
 pod:scene(330,11,400,500,person(200,60,2.1,330,1),"IMG.pod"),
 mix:U(`<svg ${NS} viewBox="0 0 400 400"><rect width="400" height="400" fill="#1f0f3a"/><rect x="14" y="14" width="372" height="330" rx="14" fill="#2a1649" stroke="#5e3b8f"/>${mx}<text x="22" y="378" font-family="sans-serif" font-size="12" fill="#94A3B8">IMG.mix</text></svg>`)};
[335,25,300,10].forEach((h,i)=>PH["ep"+(i+1)]=scene(h,i+3,320,200,person(100,18,.62,h,1)+person(220,30,.58,h+40,1),""));
[335,25,285].forEach((h,i)=>PH["host"+(i+1)]=scene(h,20+i,300,400,person(150,90,1.35,h,0),"IMG.host"+(i+1)));
[335,25,285].forEach((h,i)=>PH["user"+(i+1)]=avatar(h));
function fill(){$d.querySelectorAll("img[data-slot]").forEach(im=>{const k=im.dataset.slot;im.onerror=()=>{im.onerror=null;im.src=PH[k]||""};im.src=IMG[k]||PH[k]||""})}

/* ---------- konten ---------- */
const yid=l=>{const m=String(l||"").match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/);return m?m[1]:""};
/* daftar episode final = EPISODES + topik tren yang sudah punya link YouTube */
const eps=[...EPISODES];
TOPIK.forEach(t=>{if(yid(t.link)){t.idx=eps.length;eps.push({judul:t.judul,kategori:t.grup||"Bisnis",deskripsi:t.deskripsi||("Topik tren "+t.kategori+". Dengarkan episodenya langsung di POTSHOW."),cover:t.cover||"",audio:"",durasi:"",link:t.link})}});
const lab={Bisnis:"Pengembangan Diri & Bisnis",Horor:"Horor & Misteri",Komedi:"Komedi & Tongkrongan",Politik:"Politik & Berita"};
const esc=t=>String(t==null?"":t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const heart='<svg class="i" viewBox="0 0 24 24"><path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/></svg>',share='<svg class="i" viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></svg>';
function renderEps(){$("#eps").innerHTML=eps.map((e,i)=>`<article class="card ep" data-c="${esc(e.kategori)}"><img class="cv" data-ep="${i}" alt="Sampul ${esc(e.judul)}"><div class="b"><small>${esc(lab[e.kategori]||e.kategori)}</small><h3>${esc(e.judul)}</h3><p>${esc(e.deskripsi)}</p><div class="ft"><button class="btn p s" data-i="${i}">▶ Putar Episode</button><button class="ib lk" aria-label="Suka">${heart}</button><button class="ib sh" aria-label="Bagikan">${share}</button></div></div></article>`).join("");
$d.querySelectorAll("img[data-ep]").forEach(im=>{const i=+im.dataset.ep,ph=PH["ep"+(i%4+1)],y=yid(eps[i].link);im.onerror=()=>{im.onerror=null;im.src=ph};im.src=eps[i].cover||(y?`https://img.youtube.com/vi/${y}/hqdefault.jpg`:ph)})}
renderEps();
$("#hs").innerHTML=[["Gita Wirjawan","Tech & Future","Teknologi dan masa depan."],["Ferry Irwandi","Sains & Budaya","Sains populer dan budaya."],["Gofar Hilman","Musik","Di balik industri musik."]].map((c,i)=>`<div class="card hc"><img data-slot="host${i+1}" alt="Foto ${c[0]}"><div><small>${c[1]}</small><h3>${c[0]}</h3><p>${c[2]}</p></div></div>`).join("");
const ac=[["#f71a67","Diskusi Menarik","M4 5h16v11H9l-5 4z","Obrolan segar bersama pendengar setia dan kreator di kanal Discord kami."],["#fcb53b","Sesi yang Dapat Diharapkan","M4 9h16v11H4zM12 9v11M4 13h16","Akses awal ke episode baru dan sesi tanya jawab bulanan bersama host."],["#b57bff","Komunitas & Koneksi","M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-4 3-6 6-6s6 2 6 6M16 14c3 0 5 1 5 5","Terhubung dengan 38.000+ pendengar aktif dan sesama kreator."]];
$("#ac").innerHTML=ac.map((a,i)=>`<div class="card ai${i?'':' o'}"><button aria-expanded="${!i}"><span class="ic" style="background:${a[0]}33;color:${a[0]}"><svg class="i" viewBox="0 0 24 24"><path d="${a[2]}"/></svg></span>${a[1]}<svg class="i ch" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button><div class="bd"><p>${a[3]}</p></div></div>`).join("");
$("#ac").onclick=e=>{const b=e.target.closest("button");if(!b)return;const it=b.parentElement,o=it.classList.contains("o");$d.querySelectorAll(".ai").forEach(x=>{x.classList.remove("o");x.querySelector("button").setAttribute("aria-expanded",false)});if(!o){it.classList.add("o");b.setAttribute("aria-expanded",true)}};
$("#tq").innerHTML=[["Sebagai penggemar berat podcast, kualitas audionya luar biasa dan topiknya selalu relevan.","Rian Hidayat","Tech Founder · Jakarta"],["Audio spasialnya memanjakan telinga. Pakai headphone rasanya seperti ada di studio.","Nadia Syahrani","Karyawan Swasta · Bandung"],["Tidak pernah membosankan dan selalu memberi inspirasi untuk memulai hari.","Budi Wicaksono","Content Creator · Surabaya"]].map((t,i)=>`<div class="card tc"><span class="stars">★★★★★</span><q>${t[0]}</q><div class="who"><img data-slot="user${i+1}" alt="Foto ${t[1]}"><div><b>${t[1]}</b><small>${t[2]}</small></div></div></div>`).join("");
$("#pl").innerHTML=TOPIK.map((t,i)=>`<a class="card pi" href="#podcast" data-t="${i}"><div><small>${esc(t.kategori)}</small><b>${esc(t.judul)}</b><span>${esc(t.durasi)}</span></div><i>▶</i></a>`).join("");
$("#eq").innerHTML=Array.from({length:22},(_,i)=>`<b style="animation-delay:${(i*.13)%1.2}s"></b>`).join("");
fill();

/* ---------- navigasi & filter ---------- */
$("#mb").onclick=()=>$("#nv").classList.toggle("o");
const nl=[...$d.querySelectorAll("nav a")],ns=nl.map(a=>$d.querySelector(a.getAttribute("href")));
nl.forEach(a=>a.onclick=()=>$("#nv").classList.remove("o"));
function spy(){let k=0;ns.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<=140)k=i});
 if(innerHeight+scrollY>=$d.documentElement.scrollHeight-4)k=ns.length-1;
 nl.forEach((a,i)=>a.classList.toggle("on",i===k))}
addEventListener("scroll",spy,{passive:true});addEventListener("resize",spy);spy();
$("#fl").onclick=e=>{const b=e.target.closest("button");if(!b)return;$d.querySelectorAll("#fl button").forEach(x=>x.classList.toggle("on",x===b));$d.querySelectorAll(".ep").forEach(x=>x.classList.toggle("h",b.dataset.c!=="all"&&x.dataset.c!==b.dataset.c));limit()};

/* ---------- tombol Tampilkan Lebih Sedikit / Lebih Banyak ---------- */
const LIM=4;let less=false;
$("#eps").insertAdjacentHTML("afterend",'<div id="mw" style="display:none;justify-content:center;margin-top:28px"><button class="btn" id="mt" type="button"></button></div>');
function limit(){
 const v=[...$d.querySelectorAll(".ep")].filter(x=>!x.classList.contains("h"));
 v.forEach((x,i)=>{x.style.display=(less&&i>=LIM)?"none":""});
 $("#mw").style.display=v.length>LIM?"flex":"none";
 $("#mt").textContent=less?"Tampilkan Lebih Banyak ▾":"Tampilkan Lebih Sedikit ▴";
 $("#mt").setAttribute("aria-expanded",!less)}
$("#mt").onclick=()=>{less=!less;limit();if(less)$("#podcast").scrollIntoView({behavior:"smooth",block:"start"})};
limit();

/* ---------- popup player + share ---------- */
$d.body.insertAdjacentHTML("beforeend",`
<div class="pm" id="pm" hidden><div class="pb"><button class="ib px" id="px" aria-label="Tutup">✕</button><div class="pv"><div id="ytp"></div></div>
<div class="pi2"><div><small id="pk"></small><h3 id="pt"></h3></div><button class="btn p s" id="pshare">Bagikan</button></div></div></div>
<div class="ss" id="ss" hidden><div class="sx"><button class="ib sxc" aria-label="Tutup">✕</button><h3>Bagikan Episode</h3><p id="st"></p><div class="sg" id="sg"></div><input id="su" readonly aria-label="Link episode"></div></div>
<div class="toast" id="ts"></div>`);
const toast=t=>{const e=$("#ts");e.textContent=t;e.classList.add("on");clearTimeout(e.t);e.t=setTimeout(()=>e.classList.remove("on"),2600)};
const surl=i=>location.href.split("#")[0].split("?")[0]+"?ep="+i+"#podcast";
const IC={
 wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
 x:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
 fb:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
 tg:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
 ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
 tt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
 cp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1.5 1.5M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1.5-1.5"/></svg>',
 more:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></svg>'
};
function openShare(i){const e=eps[i],u=surl(i),t=encodeURIComponent(e.judul+" — dengarkan di POTSHOW"),eu=encodeURIComponent(u);
 const L=[["WhatsApp","#25d366",IC.wa,"https://wa.me/?text="+t+"%20"+eu],["X","#111",IC.x,"https://twitter.com/intent/tweet?text="+t+"&url="+eu],["Facebook","#1877f2",IC.fb,"https://www.facebook.com/sharer/sharer.php?u="+eu],["Telegram","#26a5e4",IC.tg,"https://t.me/share/url?url="+eu+"&text="+t]];
 const C=[["Instagram","linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)",IC.ig],["TikTok","#000",IC.tt],["Salin Link","#6b4a9e",IC.cp]];
 $("#st").textContent=e.judul;$("#su").value=u;$("#ss").dataset.i=i;
 $("#sg").innerHTML=L.map(x=>`<a class="sgb" title="${x[0]}" aria-label="${x[0]}" href="${x[3]}" target="_blank" rel="noopener"><i style="--c:${x[1]}">${x[2]}</i><span>${x[0]}</span></a>`).join("")
 +C.map(x=>`<button class="sgb" data-n="${x[0]}" title="${x[0]}" aria-label="${x[0]}"><i style="--c:${x[1]}">${x[2]}</i><span>${x[0]}</span></button>`).join("")
 +(navigator.share?`<button class="sgb" data-nv title="Lainnya" aria-label="Lainnya"><i style="--c:#f71a67">${IC.more}</i><span>Lainnya</span></button>`:"");
 $("#ss").hidden=false}
$("#sg").onclick=e=>{const b=e.target.closest("button");if(!b)return;const i=+$("#ss").dataset.i,u=surl(i);
 if(b.dataset.nv!==undefined)return navigator.share({title:eps[i].judul,text:eps[i].judul+" — dengarkan di POTSHOW",url:u}).catch(()=>{});
 const n=b.dataset.n,ig=n==="Instagram"||n==="TikTok";
 (navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>toast(ig?"Link disalin. Tempel di "+n+" kamu.":"Link disalin!")).catch(()=>{$("#su").select();toast("Tekan Ctrl+C untuk menyalin")})};
$("#ss").onclick=e=>{if(e.target.id==="ss"||e.target.closest(".sxc"))$("#ss").hidden=true};
$("#pshare").onclick=()=>openShare(cur);

/* ---------- player ---------- */
const P='<svg class="i" viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>',PA='<svg class="i" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
const au=new Audio();au.preload="none";
let cur=0,play=false,sec=0,tm,loaded="",yt=null,ytId="",ytq=[];
const vid=i=>yid(eps[i].link);
const tot=()=>{const m=String(eps[cur].durasi||"").split(":").map(Number);return m.length>1&&!isNaN(m[0]+m[1])?m[0]*60+m[1]:2300};
function loadYT(cb){if(window.YT&&YT.Player)return cb();ytq.push(cb);if(!$d.getElementById("yta")){const s=$d.createElement("script");s.id="yta";s.src="https://www.youtube.com/iframe_api";$d.head.appendChild(s);window.onYouTubeIframeAPIReady=()=>{ytq.forEach(f=>f());ytq=[]}}}
function ytLoad(id){loadYT(()=>{
 if(!yt){ytId=id;yt=new YT.Player("ytp",{videoId:id,playerVars:{autoplay:1,rel:0,playsinline:1},events:{onStateChange:s=>{const d=s.data;
  if(d===1){play=true;clearInterval(tm);tm=setInterval(R,500)}else if(d===2){play=false;clearInterval(tm)}else if(d===0){clearInterval(tm);G(cur+1);return}R()}}})}
 else if(ytId!==id){ytId=id;yt.loadVideoById(id)}else yt.playVideo()})}
function showM(){const e=eps[cur];$("#pt").textContent=e.judul;$("#pk").textContent=lab[e.kategori]||e.kategori;$("#pm").hidden=false}
function hideM(){$("#pm").hidden=true}
function R(){const e=eps[cur],yy=ytId&&ytId===vid(cur)&&yt&&typeof yt.getDuration==="function",real=!!e.audio&&!vid(cur);
 const t=yy?(yt.getDuration()||tot()):real&&au.duration?au.duration:tot(),c=yy?(yt.getCurrentTime()||0):real?au.currentTime:sec;
 $("#pp").innerHTML=play?PA:P;$("#pr").style.width=Math.min(100,c/t*100)+"%";$("#now").textContent=String(e.judul)}
function stop(){play=false;clearInterval(tm);au.pause();if(yt&&typeof yt.pauseVideo==="function")yt.pauseVideo();R()}
function start(){const e=eps[cur];play=true;clearInterval(tm);
 if(vid(cur)){showM();ytLoad(vid(cur))}
 else{hideM();if(e.audio){if(loaded!==e.audio){au.src=e.audio;loaded=e.audio}au.play().catch(stop)}
 else{au.pause();tm=setInterval(()=>{sec=Math.min(tot(),sec+1);if(sec>=tot())stop();R()},1000)}}R()}
function G(i){stop();cur=(i+eps.length)%eps.length;sec=0;start()}
au.ontimeupdate=R;au.onended=()=>G(cur+1);
$("#pp").onclick=()=>play?stop():start();
$("#nx").onclick=()=>G(cur+1);$("#pv").onclick=()=>G(cur-1);
$("#vl").onclick=()=>{au.muted=!au.muted;if(yt&&yt.mute)au.muted?yt.mute():yt.unMute();$("#vl").style.opacity=au.muted?.4:1};
/* tombol "Putar" di bagian Headline Epik -> episode Deddy Corbuzier */
const HERO_ID="pKmc_uJ0LwI";
$("#pl2").onclick=()=>{const k=eps.findIndex(e=>yid(e.link)===HERO_ID);G(k>=0?k:cur)};
$("#px").onclick=()=>{stop();hideM()};
addEventListener("keydown",e=>{if(e.key==="Escape"){if(!$("#ss").hidden)$("#ss").hidden=true;else if(!$("#pm").hidden){stop();hideM()}}});

/* klik kartu episode: putar / suka / bagikan */
$("#eps").addEventListener("click",e=>{
 const l=e.target.closest(".lk");if(l){l.classList.toggle("on");return}
 const s=e.target.closest(".sh");if(s){openShare([...$d.querySelectorAll(".ep")].indexOf(s.closest(".ep")));return}
 const b=e.target.closest("[data-i]");if(!b)return;const i=+b.dataset.i,x=eps[i];
 if(!x.audio&&x.link&&!yid(x.link)){cur=i;stop();window.open(x.link,"_blank","noopener")}else G(i)});
/* klik tombol "Topik yang Sedang Tren": putar langsung di popup */
$("#pl").addEventListener("click",e=>{const a=e.target.closest("[data-t]");if(!a)return;e.preventDefault();
 const t=TOPIK[+a.dataset.t];
 if(t.idx!==undefined)G(t.idx);
 else if(t.link)window.open(t.link,"_blank","noopener");
 else toast("Link topik ini belum diisi.")});
R();
/* buka otomatis kalau ada link bagikan ?ep=0 */
const q=new URLSearchParams(location.search).get("ep");
if(q!==null&&eps[+q]&&vid(+q)){cur=+q;R();showM();ytLoad(vid(cur))}

/* ---------- form ---------- */
const ok=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),say=(el,t,g)=>{el.textContent=t;el.style.color=g?"#6ee7a8":"#ff8f8f"};
$("#nf").onsubmit=e=>{e.preventDefault();ok($("#ne").value)?(say($("#nm"),"Berhasil. Cek email Anda untuk konfirmasi.",1),$("#ne").value=""):say($("#nm"),"Masukkan alamat email yang valid.")};
$("#cf").onsubmit=e=>{e.preventDefault();if(!$("#cn").value.trim()||!ok($("#ce").value)||!$("#cm").value.trim())return say($("#cg"),"Isi nama, email yang valid, dan pesan Anda.");say($("#cg"),"Pesan terkirim. Kami membalas dalam 1×24 jam.",1);e.target.reset()};

/* ---------- FOOTER: Syarat Layanan, Kebijakan Privasi, FAQ (jendela popup) ---------- */
const INFO={
 syarat:["Syarat Layanan",`<p class="note">Contoh teks. Sesuaikan dengan ketentuan POTSHOW yang sebenarnya.</p><ol><li><b>Penggunaan situs.</b> Situs ini disediakan untuk mendengarkan, menonton, dan membagikan konten podcast secara pribadi.</li><li><b>Hak cipta.</b> Setiap episode dimiliki oleh kreator atau pemegang haknya. Dilarang menyalin atau menjual ulang tanpa izin tertulis.</li><li><b>Konten pihak ketiga.</b> Video diputar lewat YouTube dan mengikuti ketentuan platform tersebut.</li><li><b>Perilaku pengguna.</b> Dilarang mengirim pesan yang menyesatkan, melecehkan, atau melanggar hukum lewat formulir kontak.</li><li><b>Perubahan.</b> Syarat dapat diperbarui sewaktu-waktu. Pertanyaan: halo@potshow.id.</li></ol>`],
 privasi:["Kebijakan Privasi",`<p class="note">Contoh teks. Sesuaikan dengan praktik pengelolaan data yang sebenarnya.</p><ol><li><b>Data yang kamu berikan.</b> Alamat email saat berlangganan newsletter, serta nama, email, dan pesan lewat formulir Hubungi Kami.</li><li><b>Penggunaan data.</b> Hanya untuk mengirim newsletter dan membalas pesanmu.</li><li><b>Pihak ketiga.</b> Saat memutar video, YouTube dapat memasang cookie dan mengumpulkan data sesuai kebijakan privasi mereka.</li><li><b>Hapus data.</b> Kamu bisa meminta penghapusan data kapan saja lewat halo@potshow.id.</li></ol>`],
 faq:["FAQ — Pertanyaan Umum",`<details open><summary>Bagaimana cara memutar episode?</summary><p>Klik Putar Episode pada kartu di bagian Episode Terpopuler. Video diputar di jendela popup, dan kamu bisa memakai tombol play, jeda, sebelumnya, dan berikutnya di pemutar kecil.</p></details><details><summary>Bagaimana cara membagikan episode?</summary><p>Klik ikon bagikan pada kartu episode, lalu pilih WhatsApp, X, Facebook, atau Telegram. Untuk Instagram dan TikTok, link disalin dulu lalu kamu tempel di aplikasinya.</p></details><details><summary>Bagaimana cara berlangganan newsletter?</summary><p>Isi alamat email di bagian Apa Yang Ingin Anda Dengarkan Hari Ini?, lalu klik Berlangganan.</p></details><details><summary>Bagaimana cara menjadi sponsor?</summary><p>Klik Daftar Sekarang di bagian sponsor, atau kirim email ke sponsorship@potshow.id.</p></details><details><summary>Bagaimana menghubungi tim POTSHOW?</summary><p>Gunakan formulir di bagian Hubungi Kami. Tim membalas dalam 1×24 jam.</p></details>`]
};
$d.body.insertAdjacentHTML("beforeend",`<div class="ss inf" id="inf" hidden><div class="sx"><button class="ib sxc" aria-label="Tutup">✕</button><h3 id="inft"></h3><div id="infb"></div></div></div>`);
$d.querySelectorAll("[data-info]").forEach(b=>b.onclick=()=>{const k=INFO[b.dataset.info];$("#inft").textContent=k[0];$("#infb").innerHTML=k[1];$("#inf").hidden=false});
$("#inf").onclick=e=>{if(e.target.id==="inf"||e.target.closest(".sxc"))$("#inf").hidden=true};
addEventListener("keydown",e=>{if(e.key==="Escape")$("#inf").hidden=true});