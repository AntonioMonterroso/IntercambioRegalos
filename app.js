const SB_URL = "https://gwgdlfjpigsbrkctuxzp.supabase.co";
const SB_KEY = "sb_publishable_B4V1l83FGM3J6_yJ9PTaBQ_WkaWoMXB";
const BUCKET = "convivio-fotos";

const TEMAS = {
  navidad: {n: 'Navidad clásica', p: '#1E3A2B', a: '#7B2232', o: '#A57A2E', f: '#F5EEE1'},
  dorado: {n: 'Dorado y negro', p: '#1F1C18', a: '#8A6829', o: '#B08838', f: '#F3EEE4'},
  invierno: {n: 'Azul invierno', p: '#1D3354', a: '#3A6588', o: '#7D8899', f: '#EDF1F5'},
  rosa: {n: 'Rosa y oro', p: '#6E2943', a: '#A84A6D', o: '#AE8746', f: '#F8EEEC'},
  vino: {n: 'Vino y crema', p: '#5A1B28', a: '#94394A', o: '#A57A2E', f: '#F5ECE2'},
  bosque: {n: 'Bosque y canela', p: '#2E4636', a: '#A14B28', o: '#A57A2E', f: '#F2EEE3'}
};

const ACTIVIDADES = [
  {k: 'asistencia', n: 'Confirmar asistencia', d: 'Cada invitado confirma si asiste y con cuántos acompañantes.', i: 'check'},
  {k: 'intercambio', n: 'Intercambio de regalos', d: 'Sorteo confidencial, lista de deseos y presupuesto.', i: 'regalo'},
  {k: 'llevar', n: 'Quién lleva qué', d: 'Alimentos, bebidas y artículos; cada invitado se inscribe.', i: 'comida'},
  {k: 'cuota_act', n: 'Cooperación', d: 'Monto por persona y control de pagos.', i: 'billete'},
  {k: 'programa', n: 'Programa del día', d: 'Horario de las actividades.', i: 'reloj'},
  {k: 'rifa', n: 'Rifa', d: 'Premios sorteados entre los asistentes.', i: 'boleto'},
  {k: 'votos', n: 'Votaciones', d: 'Mejor atuendo, mejor decoración u otras categorías.', i: 'trofeo'},
  {k: 'fotos', n: 'Álbum de fotos', d: 'Los invitados comparten sus fotografías.', i: 'camara'}
];

const I = {
  regalo: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  llave: '<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>',
  gente: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  fecha: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  lugar: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  billete: '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  mensaje: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  copiar: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  lapiz: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
  basura: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  sortear: '<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-7.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"/><path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  recargar: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  salir: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
  mas: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  menos: '<path d="M5 12h14"/>',
  bolsa: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  lupa: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  atras: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  lista: '<path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/>',
  reloj: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  comida: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  trofeo: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  boleto: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
  camara: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  ajustes: '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
  casa: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  paleta: '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  subir: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  candado: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  abierto: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  arriba: '<path d="m18 15-6-6-6 6"/>',
  abajo: '<path d="m6 9 6 6 6-6"/>',
  ojo: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
};
const ESTRELLA = '<path d="M12 1.5 13.9 10.1 22.5 12 13.9 13.9 12 22.5 10.1 13.9 1.5 12 10.1 10.1Z"/>';
const ic = (n, c = '') => `<svg class="svg ${c}" viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;
const estrella = () => `<svg class="estrella" viewBox="0 0 24 24" aria-hidden="true">${ESTRELLA}</svg>`;
const adorno = (c = '') => `<div class="adorno ${c}" aria-hidden="true">${estrella()}</div>`;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const limpiarCodigo = s => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
const verCodigo = c => c && c.length === 8 ? c.slice(0, 4) + '-' + c.slice(4) : (c || '');
const quetzales = n => 'Q ' + Number(n || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
const $ = s => document.querySelector(s);
const app = $('#app');
const LS = {
  leer(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  poner(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  quitar(k) { try { localStorage.removeItem(k); } catch {} }
};
const configurado = SB_URL.startsWith('http') && SB_KEY.length > 20;

let E = {vista: 'inicio', codigo: null, datos: null, tab: null};
let relojes = [];
let cajaAbierta = false;
let cajaReciente = false;
let progBorrador = null;
let filtroInv = '';
let deseosSucio = false;

function encabezados(extra = {}) {
  const h = {'apikey': SB_KEY, ...extra};
  if (SB_KEY.startsWith('eyJ')) h.Authorization = 'Bearer ' + SB_KEY;
  return h;
}
async function rpc(fn, args) {
  if (!configurado) throw new Error('La base de datos aún no está conectada.');
  let r;
  try {
    r = await fetch(SB_URL + '/rest/v1/rpc/' + fn, {method: 'POST', headers: encabezados({'Content-Type': 'application/json'}), body: JSON.stringify(args || {})});
  } catch {
    throw new Error('Sin conexión. Revise su internet e intente de nuevo.');
  }
  const t = await r.text();
  let d = null;
  try { d = t ? JSON.parse(t) : null; } catch { d = t; }
  if (!r.ok) throw new Error((d && d.message) || 'No se pudo completar. Intente de nuevo.');
  return d;
}

function hexARgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function rgbAHex(r) { return '#' + r.map(x => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, '0')).join(''); }
function mezclar(a, b, t) { const x = hexARgb(a), y = hexARgb(b); return rgbAHex(x.map((v, i) => v + (y[i] - v) * t)); }
function luz(h) { return hexARgb(h).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }).reduce((s, v, i) => s + v * [.2126, .7152, .0722][i], 0); }
function contraste(a, b) { const x = luz(a), y = luz(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
function oscurecerHasta(h, min = 4.8) { let c = h, n = 0; while (contraste(c, '#FFFCF5') < min && n < 20) { c = mezclar(c, '#000000', .12); n++; } return c; }
function paleta(tema, color) {
  if (tema === 'propio' && /^#[0-9a-f]{6}$/i.test(color || '')) {
    const p = oscurecerHasta(color);
    return {p, a: oscurecerHasta(mezclar(p, '#8E2A2A', .45)), o: '#A57A2E', f: mezclar(color, '#FBF7EF', .91)};
  }
  return TEMAS[tema] || TEMAS.navidad;
}
function aplicarTema(tema, color) {
  const t = paleta(tema, color);
  const r = document.documentElement.style;
  r.setProperty('--p', t.p); r.setProperty('--a', t.a); r.setProperty('--o', t.o); r.setProperty('--f', t.f);
  const m = document.querySelector('meta[name=theme-color]');
  if (m) m.content = t.p;
}

function rama(cls) {
  const P0 = [14, 168], C = [120, 60], P1 = [286, 34];
  const pt = t => [(1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * C[0] + t * t * P1[0], (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * C[1] + t * t * P1[1]];
  const tg = t => { const x = 2 * (1 - t) * (C[0] - P0[0]) + 2 * t * (P1[0] - C[0]), y = 2 * (1 - t) * (C[1] - P0[1]) + 2 * t * (P1[1] - C[1]); const l = Math.hypot(x, y); return [x / l, y / l]; };
  let ag = '';
  for (let i = 0; i <= 46; i++) {
    const t = .04 + i * .02, [x, y] = pt(t), [dx, dy] = tg(t);
    const largo = 22 - Math.abs(t - .45) * 14 + (i % 3) * 1.6;
    for (const s of [-1, 1]) {
      const ang = s * (0.95 + (i % 4) * .07);
      const nx = dx * Math.cos(ang) - dy * Math.sin(ang), ny = dx * Math.sin(ang) + dy * Math.cos(ang);
      ag += `M${x.toFixed(1)} ${y.toFixed(1)}L${(x + nx * largo).toFixed(1)} ${(y + ny * largo).toFixed(1)}`;
    }
  }
  const [bx, by] = pt(.2);
  return `<svg class="rama ${cls}" viewBox="0 0 300 200" aria-hidden="true"><path class="tallo" d="M${P0}Q${C} ${P1}"/><path class="aguja" d="${ag}"/><circle class="baya" cx="${bx + 4}" cy="${by + 20}" r="7"/><circle class="baya" cx="${bx + 18}" cy="${by + 26}" r="6"/><circle class="baya" cx="${bx - 6}" cy="${by + 30}" r="5.5"/><circle class="brillo" cx="${bx + 2}" cy="${by + 17}" r="1.8"/><circle class="brillo" cx="${bx + 16}" cy="${by + 23}" r="1.5"/></svg>`;
}

let toastT;
function aviso(msg, error = false) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.toggle('error', error);
  t.classList.add('ver');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('ver'), error ? 4500 : 2600);
}

function abrirDialogo(html, alAbrir, ancho = false) {
  const d = $('#dlg');
  d.classList.toggle('ancho', ancho);
  d.innerHTML = `<div class="caja">${html}</div>`;
  if (!d.open) d.showModal();
  d.querySelectorAll('[data-cerrar]').forEach(b => b.addEventListener('click', () => d.close()));
  if (alAbrir) alAbrir(d);
  return d;
}
$('#dlg').addEventListener('click', e => { if (e.target.id === 'dlg') e.target.close(); });

function confirmar({titulo, texto, si = 'Sí, continuar', tipo = 'prim'}) {
  return new Promise(res => {
    let hecho = false;
    const fin = v => { if (hecho) return; hecho = true; d.removeEventListener('click', fuera); d.removeEventListener('cancel', cancelar); res(v); };
    const fuera = e => { if (e.target === d) fin(false); };
    const cancelar = () => fin(false);
    const d = abrirDialogo(`<h2 id="dlgTitulo">${esc(titulo)}</h2><p class="texto">${texto}</p>
      <div class="pie"><button class="btn sec" data-cerrar title="Cerrar sin hacer nada">Cancelar</button><button class="btn ${tipo}" id="dlgSi">${esc(si)}</button></div>`,
      dd => {
        dd.querySelector('#dlgSi').addEventListener('click', () => { dd.close(); fin(true); });
        dd.querySelector('[data-cerrar]').addEventListener('click', () => fin(false));
      });
    d.addEventListener('click', fuera);
    d.addEventListener('cancel', cancelar);
  });
}

async function copiar(texto, msg = 'Copiado') {
  try { await navigator.clipboard.writeText(texto); aviso(msg); }
  catch {
    const ta = document.createElement('textarea');
    ta.value = texto; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); aviso(msg); } catch { aviso('No se pudo copiar', true); }
    ta.remove();
  }
}

function cargando(btn, si) {
  if (!btn) return;
  if (si) { btn.dataset.txt = btn.innerHTML; btn.disabled = true; btn.innerHTML = '<span class="giro" style="width:18px;height:18px;border-width:2px"></span>'; }
  else { btn.disabled = false; if (btn.dataset.txt) btn.innerHTML = btn.dataset.txt; }
}
async function conCarga(btn, fn) {
  cargando(btn, true);
  try { return await fn(); }
  catch (e) { aviso(e.message, true); }
  finally { if (btn && btn.isConnected) cargando(btn, false); }
}

function fechaLarga(iso, mayus = true) {
  if (!iso) return '';
  const d = new Date(iso);
  const f = d.toLocaleDateString('es-GT', {weekday: 'long', day: 'numeric', month: 'long'});
  const h = d.toLocaleTimeString('es-GT', {hour: 'numeric', minute: '2-digit'});
  return (mayus ? f.charAt(0).toUpperCase() + f.slice(1) : f) + ', ' + h;
}
function aLocal(iso) {
  if (!iso) return '';
  const d = new Date(iso), p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}
const enlaces = t => esc(t).replace(/https?:\/\/[^\s<]+/g, u => `<a href="${u}" target="_blank" rel="noopener noreferrer">${u.length > 48 ? u.slice(0, 45) + '…' : u}</a>`);
const lineas = t => String(t || '').split(/\n+/).map(s => s.trim()).filter(Boolean);
const enlaceBase = () => location.origin + location.pathname;
const urlFoto = ruta => `${SB_URL}/storage/v1/object/public/${BUCKET}/${ruta.split('/').map(encodeURIComponent).join('/')}`;
const primerNombre = n => String(n || '').split(' ')[0];

function mensajeWhats(p, conv) {
  return `Estimado(a) ${p.nombre}:\n\nLe invitamos a «${conv.nombre}».${conv.fecha ? `\n${fechaLarga(conv.fecha)}` : ''}${conv.lugar ? `\n${conv.lugar}` : ''}\n\nSu código personal es: ${p.codigo}\n\nIngrese aquí para confirmar su asistencia y consultar los detalles:\n${enlaceBase()}#c=${p.codigo}${p.es_organizador ? '\n\nCon este mismo código también puede administrar el convivio como organizador.' : ''}\n\nEl código es personal; le rogamos no compartirlo.`;
}

function guardarReciente(r) {
  const l = LS.leer('cv_recientes', []).filter(x => x.codigo !== r.codigo);
  l.unshift(r);
  LS.poner('cv_recientes', l.slice(0, 8));
}
const quitarReciente = c => LS.poner('cv_recientes', LS.leer('cv_recientes', []).filter(x => x.codigo !== c));

function detenerRelojes() { relojes.forEach(clearInterval); relojes = []; }

function pintarSesion() {
  const s = $('#sesion');
  const salir = `<button class="btn fantasma chico" data-acc="salir" title="Cerrar la sesión de este convivio en este equipo">${ic('salir', 's')}Salir</button>`;
  if (E.vista === 'organizador' && E.datos) s.innerHTML = E.datos.yo
    ? `<span class="quien">${esc(E.datos.yo.nombre)}</span><button class="btn fantasma chico" data-acc="cambiar-vista" title="Ver su parte como invitado: asistencia, su regalo y lo que lleva" aria-label="Mi parte de invitado">${ic('regalo', 's')}<span class="largo">Mi parte de invitado</span><span class="corto">Invitado</span></button>${salir}`
    : `<span class="quien">Organizador</span>${salir}`;
  else if (E.vista === 'invitado' && E.datos) s.innerHTML = `<span class="quien">${esc(E.datos.yo.nombre)}</span>${E.datos.yo.es_organizador ? `<button class="btn fantasma chico" data-acc="cambiar-vista" title="Abrir el panel para administrar el convivio" aria-label="Panel del organizador">${ic('llave', 's')}<span class="largo">Panel del organizador</span><span class="corto">Panel</span></button>` : ''}${salir}`;
  else s.innerHTML = '';
}

function ir(vista, extra = {}) {
  detenerRelojes();
  E = {vista, codigo: extra.codigo || null, datos: extra.datos || null, tab: extra.tab || null};
  cajaAbierta = false; progBorrador = null; filtroInv = ''; deseosSucio = false;
  if (vista === 'inicio' || vista === 'crear') aplicarTema('navidad');
  else aplicarTema(E.datos.convivio.tema, E.datos.convivio.color);
  if (vista === 'inicio') pintarInicio();
  if (vista === 'crear') pintarCrear();
  if (vista === 'organizador') { pintarPanel(); relojes.push(setInterval(() => { if (!document.hidden) refrescar(); }, 20000)); }
  if (vista === 'invitado') { pintarPanel(); relojes.push(setInterval(() => { if (!document.hidden) refrescar(); }, 25000)); }
  if (vista === 'organizador' || vista === 'invitado') relojes.push(setInterval(pintarCuenta, 30000));
  pintarSesion();
  window.scrollTo(0, 0);
}

async function entrarCon(codigo, btn) {
  const c = limpiarCodigo(codigo);
  if (c.length < 6) { aviso('Escriba su código completo', true); return; }
  cargando(btn, true);
  try {
    const r = await rpc('entrar', {p_codigo: c});
    if (r.tipo === 'organizador') {
      const datos = await rpc('admin_ver', {p_codigo: c});
      LS.poner('cv_sesion', {codigo: c});
      guardarReciente({codigo: c, tipo: 'organizador', nombre: datos.convivio.nombre});
      ir('organizador', {codigo: c, datos, tab: 'invitados'});
    } else {
      const datos = await rpc('yo_ver', {p_codigo: c});
      LS.poner('cv_sesion', {codigo: c});
      guardarReciente({codigo: c, tipo: 'invitado', nombre: datos.convivio.nombre, quien: datos.yo.nombre});
      ir('invitado', {codigo: c, datos, tab: 'inicio'});
    }
  } catch (e) {
    aviso(e.message, true);
    cargando(btn, false);
  }
}

function pintarInicio() {
  const rec = LS.leer('cv_recientes', []);
  app.innerHTML = `<div class="vista">
    ${configurado ? '' : '<div class="aviso-config">Falta conectar la base de datos.</div>'}
    <section class="portada">
      ${rama('r1')}
      <div>
        <p class="eyebrow">${estrella()} Intercambio y más</p>
        <h1>Nuestro <em>convivio</em></h1>
        ${adorno('corto')}
        <button class="btn crear" data-acc="ir-crear" title="Crear un convivio nuevo">${ic('mas')}Crear un convivio</button>
      </div>
      <form class="panel entrar" data-form="entrar" autocomplete="off">
        <h2>Ingresar con su código</h2>
        <div class="campo">
          <label for="cod">Código personal</label>
          <input id="cod" class="codigo-in" autocapitalize="characters" autocorrect="off" spellcheck="false" maxlength="12" placeholder="K7MP2Q">
        </div>
        <button class="btn prim ancho" type="submit" title="Ingresar al convivio con este código (Enter)">${ic('llave')}Ingresar</button>
      </form>
    </section>
    ${rec.length ? `<section class="recientes">${adorno()}<p class="eyebrow" style="margin-bottom:14px">Continuar en este equipo</p><div class="chips">${rec.map(r => `<button class="chip" data-acc="reciente" data-cod="${esc(r.codigo)}" title="Abrir ${esc(r.nombre)} ${r.tipo === 'organizador' ? 'como organizador' : 'como ' + esc(r.quien || 'invitado')}">${ic(r.tipo === 'organizador' ? 'llave' : 'regalo', 's')}${esc(r.nombre)}<small>${r.tipo === 'organizador' ? 'organizador' : esc(r.quien || '')}</small></button>`).join('')}</div></section>` : ''}
  </div>`;
}

function formConvivio(v = {}) {
  const act = v.act || {asistencia: true, intercambio: true};
  const tema = v.tema || 'navidad';
  const color = v.color || '#2F5D8A';
  const marcada = k => k === 'cuota_act' ? act.cuota : act[k];
  return `
    <section class="panel" style="margin-bottom:20px">
      <div class="paso-t"><b>1</b><h2>Los datos</h2></div>
      <div class="campo"><label for="cNombre">Nombre del convivio</label><input id="cNombre" maxlength="80" required placeholder="Convivio navideño de la empresa" value="${esc(v.nombre || '')}"></div>
      <div class="dos">
        <div class="campo"><label for="cFecha">Fecha y hora</label><input id="cFecha" type="datetime-local" value="${esc(aLocal(v.fecha))}"></div>
        <div class="campo"><label for="cLugar">Lugar</label><input id="cLugar" maxlength="160" placeholder="Salón, residencia, restaurante…" value="${esc(v.lugar || '')}"></div>
      </div>
      <div class="campo" style="margin-bottom:0"><label for="cNota">Mensaje o indicaciones <span style="font-weight:500;color:var(--tenue)">(opcional)</span></label><textarea id="cNota" maxlength="800" placeholder="Ej. vestimenta formal; presentar el regalo envuelto con el nombre del destinatario">${esc(v.nota || '')}</textarea></div>
    </section>
    <section class="panel" style="margin-bottom:20px">
      <div class="paso-t"><b>2</b><h2>Los colores</h2></div>
      <div class="muestras" role="group" aria-label="Colores del convivio">
        ${Object.entries(TEMAS).map(([k, t]) => `<button type="button" class="muestra" data-acc="tema" data-tema="${k}" aria-pressed="${tema === k}" title="Usar ${t.n}"><span class="bandas"><i style="background:${t.p}"></i><i style="background:${t.a}"></i><i style="background:${t.o}"></i><i style="background:${t.f}"></i></span>${t.n}</button>`).join('')}
      </div>
      <label class="propio" for="cColor">
        <input id="cColor" type="color" value="${esc(color)}" data-cambio="color">
        <span><b style="display:block;font-size:.92rem">Color personalizado</b><span class="ayuda" style="margin:0">${tema === 'propio' ? 'En uso. Si el color es muy claro, se ajusta para conservar la legibilidad.' : 'Seleccione el recuadro para elegir un color.'}</span></span>
      </label>
    </section>
    <section class="panel" style="margin-bottom:20px">
      <div class="paso-t"><b>3</b><h2>Las actividades</h2></div>
      <div class="opciones">
        ${ACTIVIDADES.map(a => `<label class="opcion"><input type="checkbox" name="act" value="${a.k}" ${marcada(a.k) ? 'checked' : ''} data-cambio="act"><span class="marca-op">${ic('check', 's')}</span><span><b>${ic(a.i, 's')}${a.n}</b><small>${a.d}</small></span></label>`).join('')}
      </div>
      <div class="dos extra">
        <div class="campo" id="campoPresu" ${act.intercambio ? '' : 'hidden'}><label for="cPresu">Presupuesto del regalo</label><div class="prefijo"><span>Q</span><input id="cPresu" type="number" inputmode="decimal" min="1" step="0.01" value="${esc(v.presupuesto ?? 100)}"></div></div>
        <div class="campo" id="campoCuota" ${act.cuota ? '' : 'hidden'}><label for="cCuota">Cooperación por persona</label><div class="prefijo"><span>Q</span><input id="cCuota" type="number" inputmode="decimal" min="0" step="0.01" value="${esc(v.cuota && Number(v.cuota) > 0 ? v.cuota : 50)}"></div></div>
      </div>
    </section>`;
}
let temaElegido = {tema: 'navidad', color: null};
function leerConvivio() {
  const n = id => { const x = parseFloat($(id)?.value); return isFinite(x) && x >= 0 ? Math.round(x * 100) / 100 : null; };
  const acts = new Set([...document.querySelectorAll('input[name=act]:checked')].map(x => x.value));
  const d = {
    nombre: $('#cNombre').value.trim(),
    fecha: $('#cFecha').value ? new Date($('#cFecha').value).toISOString() : '',
    lugar: $('#cLugar').value.trim(),
    nota: $('#cNota').value.trim(),
    tema: temaElegido.tema,
    color: temaElegido.tema === 'propio' ? temaElegido.color : ''
  };
  ACTIVIDADES.forEach(a => { d[a.k] = acts.has(a.k); });
  const p = n('#cPresu'); if (p && p > 0) d.presupuesto = String(p);
  const c = n('#cCuota'); if (c !== null) d.cuota = String(acts.has('cuota_act') ? c : 0);
  return d;
}
function marcarTema() {
  document.querySelectorAll('.muestra').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tema === temaElegido.tema)));
  const ay = document.querySelector('.propio .ayuda');
  if (ay) ay.textContent = temaElegido.tema === 'propio' ? 'En uso. Si el color es muy claro, se ajusta para conservar la legibilidad.' : 'Seleccione el recuadro para elegir un color.';
  aplicarTema(temaElegido.tema, temaElegido.color);
}
function pintarVistaPrevia() {
  const vp = $('#vistaPrevia');
  if (!vp) return;
  const nombre = $('#cNombre')?.value.trim() || 'Su convivio';
  const acts = [...document.querySelectorAll('input[name=act]:checked')].map(x => ACTIVIDADES.find(a => a.k === x.value));
  vp.innerHTML = `<div class="vp-top"><small>Vista previa</small><h3>${esc(nombre)}</h3></div><div class="vp-cuerpo"><div class="vp-btns"><span></span><span></span></div>${acts.length ? acts.map(a => `<span style="display:flex;align-items:center;gap:8px">${ic(a.i, 's')}${a.n}</span>`).join('') : '<span>Sin actividades seleccionadas</span>'}</div>`;
}

function pintarCrear() {
  temaElegido = {tema: 'navidad', color: null};
  app.innerHTML = `<div class="vista">
    <a href="#" class="volver" data-acc="ir-inicio">${ic('atras', 's')}Volver</a>
    <p class="eyebrow">${estrella()} Nuevo convivio</p>
    <h1 style="font-size:clamp(2.2rem,1.4rem + 3vw,3.6rem);margin:12px 0 28px;font-weight:500">Crear un convivio</h1>
    <form data-form="crear" class="crear-grid">
      <div>${formConvivio()}</div>
      <aside class="lado">
        <div class="vista-previa" id="vistaPrevia"></div>
        <button class="btn prim ancho" type="submit" title="Crear el convivio y recibir el código de organizador">${ic('regalo')}Crear convivio</button>
        <p class="ayuda" style="text-align:center;margin:0">Todo puede modificarse después.</p>
      </aside>
    </form>
  </div>`;
  pintarVistaPrevia();
  $('#cNombre').addEventListener('input', pintarVistaPrevia);
  $('#cNombre').focus();
}

function pestanasDe() {
  const c = E.datos.convivio, a = c.act;
  if (E.vista === 'organizador') {
    const inv = E.datos.invitados;
    return [
      ['invitados', 'gente', 'Invitados', inv.length],
      a.intercambio && ['intercambio', 'regalo', 'Intercambio'],
      a.llevar && ['comida', 'comida', 'Alimentos', E.datos.llevar.length],
      a.programa && ['programa', 'reloj', 'Programa'],
      (a.rifa || a.votos) && ['juegos', 'trofeo', a.rifa && a.votos ? 'Rifa y votaciones' : a.rifa ? 'Rifa' : 'Votaciones'],
      a.fotos && ['fotos', 'camara', 'Fotografías', E.datos.fotos.length],
      ['ajustes', 'ajustes', 'Ajustes']
    ].filter(Boolean);
  }
  return [
    ['inicio', 'casa', 'Inicio'],
    a.intercambio && ['intercambio', 'regalo', 'Intercambio'],
    a.llevar && ['comida', 'comida', 'Alimentos'],
    (a.rifa || a.votos) && ['juegos', 'trofeo', a.rifa && a.votos ? 'Rifa y votaciones' : a.rifa ? 'Rifa' : 'Votaciones'],
    a.fotos && ['fotos', 'camara', 'Fotografías', E.datos.fotos.length]
  ].filter(Boolean);
}

function pintarPanel() {
  const tabs = pestanasDe();
  if (!tabs.some(t => t[0] === E.tab)) E.tab = tabs[0][0];
  app.innerHTML = `<div class="vista"><div id="enc"></div>
    <div class="pestanas" role="tablist" aria-label="Secciones">${tabs.map(t => `<button class="pestana" role="tab" data-acc="tab" data-tab="${t[0]}" aria-selected="${E.tab === t[0]}" title="Ver ${t[2]}">${ic(t[1], 's')}${t[2]}${t[3] !== undefined ? `<span class="num" ${t[3] ? '' : 'hidden'}>${t[3]}</span>` : ''}</button>`).join('')}</div>
    <div id="contenido"></div></div>`;
  pintarEncabezado();
  pintarContenido();
}

function pintarEncabezado() {
  const c = E.datos.convivio;
  const org = E.vista === 'organizador';
  $('#enc').innerHTML = `<header class="encabezado">${rama('')}
    <div class="fila-enc">
      <div style="min-width:0;flex:1 1 320px">
        <p class="eyebrow">${estrella()} ${org ? 'Panel del organizador' : `Bienvenido(a), ${esc(E.datos.yo.nombre)}`}</p>
        <h1>${esc(c.nombre)}</h1>
        <div class="datos-ev">
          ${c.fecha ? `<span>${ic('fecha', 's')}${esc(fechaLarga(c.fecha))}</span>` : ''}
          ${c.lugar ? `<span>${ic('lugar', 's')}${esc(c.lugar)}</span>` : ''}
          ${c.act.intercambio ? `<span>${ic('regalo', 's')}Regalo de ${quetzales(c.presupuesto)}</span>` : ''}
        </div>
      </div>
      <div id="cuentaEnc"></div>
    </div>
    ${c.nota ? `<p class="nota">${esc(c.nota)}</p>` : ''}
  </header>`;
  pintarCuenta();
}

function pintarCuenta() {
  const caja = $('#cuentaEnc');
  if (!caja || !E.datos) return;
  const c = E.datos.convivio;
  if (!c.fecha) { caja.innerHTML = ''; return; }
  const ms = new Date(c.fecha) - Date.now();
  if (ms <= 0) { caja.innerHTML = ms > -86400000 ? `<p class="eyebrow">${estrella()} El convivio es hoy</p>` : ''; return; }
  const d = Math.floor(ms / 86400000), h = Math.floor(ms % 86400000 / 3600000), m = Math.floor(ms % 3600000 / 60000);
  caja.innerHTML = `<div class="cuenta" role="timer" aria-label="Faltan ${d} días, ${h} horas y ${m} minutos"><div><b>${d}</b><span>${d === 1 ? 'día' : 'días'}</span></div><div><b>${h}</b><span>horas</span></div><div><b>${m}</b><span>min</span></div></div>`;
}

function pintarContenido() {
  const cont = $('#contenido');
  if (!cont) return;
  const f = (E.vista === 'organizador' ? VISTAS_ORG : VISTAS_INV)[E.tab];
  cont.innerHTML = f ? f() : '';
  if (E.vista === 'invitado' && E.tab === 'intercambio') {
    const ta = $('#yDeseos');
    if (ta) ta.value = E.datos.yo.deseos || '';
  }
  ajustarAltos();
}

function ajustarAltos() {
  document.querySelectorAll('textarea[data-crece]').forEach(ta => { ta.style.height = '48px'; ta.style.height = Math.min(ta.scrollHeight + 2, 200) + 'px'; });
}

async function refrescar(forzar = false) {
  try {
    const d = E.vista === 'organizador' ? await rpc('admin_ver', {p_codigo: E.codigo}) : await rpc('yo_ver', {p_codigo: E.codigo});
    if (!E.datos || (E.vista !== 'organizador' && E.vista !== 'invitado')) return;
    const antes = JSON.stringify(E.datos);
    E.datos = d;
    if (antes === JSON.stringify(d) && !forzar) return;
    if (E.tab !== 'ajustes') aplicarTema(d.convivio.tema, d.convivio.color);
    const activo = document.activeElement;
    const escribiendo = activo && $('#contenido')?.contains(activo) && /INPUT|TEXTAREA|SELECT/.test(activo.tagName) && activo.type !== 'checkbox';
    const tabs = pestanasDe().map(t => t[0]).join();
    const tabsAntes = [...document.querySelectorAll('.pestana')].map(b => b.dataset.tab).join();
    if (tabs !== tabsAntes) { pintarPanel(); return; }
    document.querySelectorAll('.pestana').forEach(b => { const t = pestanasDe().find(x => x[0] === b.dataset.tab); const n = b.querySelector('.num'); if (n && t) { n.textContent = t[3]; n.hidden = !t[3]; } });
    pintarEncabezado();
    if (!escribiendo && !deseosSucio && !progBorrador && E.tab !== 'ajustes') pintarContenido();
    pintarSesion();
  } catch (e) {
    if (/no válido|No encontramos/.test(e.message) && E.vista === 'organizador' && E.datos.yo) {
      try { const d = await rpc('yo_ver', {p_codigo: E.codigo}); guardarReciente({codigo: E.codigo, tipo: 'invitado', nombre: d.convivio.nombre, quien: d.yo.nombre}); ir('invitado', {codigo: E.codigo, datos: d, tab: 'inicio'}); aviso('Ya no tiene acceso al panel del organizador'); return; } catch {}
    }
    if (/no válido|No encontramos/.test(e.message)) {
      quitarReciente(E.codigo); LS.quitar('cv_sesion'); ir('inicio');
      aviso(E.vista === 'organizador' ? 'Este convivio ya no existe' : 'Su código ya no es válido. Solicite uno nuevo al organizador.', true);
    } else if (forzar) aviso(e.message, true);
  }
}

function etiquetaAsistencia(i) {
  if (i.asistencia === 'si') return `<span class="insignia si">${ic('check', 's')}Asiste${i.acompanantes ? ` +${i.acompanantes}` : ''}</span>`;
  if (i.asistencia === 'no') return `<span class="insignia no">No asiste</span>`;
  if (i.asistencia === 'tal_vez') return `<span class="insignia oro">Por confirmar</span>`;
  return `<span class="insignia">Sin respuesta</span>`;
}
function resumenAsistencia(lista) {
  const si = lista.filter(i => i.asistencia === 'si');
  return {
    van: si.length,
    personas: si.reduce((s, i) => s + 1 + (i.acompanantes || 0), 0),
    no: lista.filter(i => i.asistencia === 'no').length,
    talvez: lista.filter(i => i.asistencia === 'tal_vez').length,
    falta: lista.filter(i => !i.asistencia).length
  };
}

const VISTAS_ORG = {
  invitados() {
    const {convivio: c, invitados: inv} = E.datos;
    const f = filtroInv.trim().toLowerCase();
    const vis = f ? inv.filter(p => p.nombre.toLowerCase().includes(f) || p.codigo.toLowerCase().includes(f)) : inv;
    const r = resumenAsistencia(inv);
    const pagaron = inv.filter(i => i.cuota_pagada).length;
    return `<div class="rejilla">
      <div class="columna">
        <section class="panel">
          <div class="titulo-sec"><div><h2>Invitados</h2><p>Agregue a los invitados y envíe a cada uno su código.</p></div></div>
          <form class="agregar" data-form="agregar">
            <div><label for="nNombres">Agregar nombres</label><textarea id="nNombres" data-crece rows="1" maxlength="6000" placeholder="Escriba un nombre y presione Enter"></textarea></div>
            <button class="btn prim" type="submit" title="Agregar a la lista (Enter)">${ic('mas')}Agregar</button>
          </form>
          <p class="ayuda" style="margin-bottom:18px">Puede pegar varios nombres a la vez, uno por línea o separados por coma.</p>
          ${inv.length > 12 ? `<div class="buscar">${ic('lupa', 's')}<label class="sr" for="fInv">Buscar invitado</label><input id="fInv" data-cambio="filtro" placeholder="Buscar por nombre o código" value="${esc(filtroInv)}"></div>` : ''}
          <ul class="lista" id="listaInv">${!inv.length ? '<li class="vacio">Aún no hay invitados registrados.</li>' : !vis.length ? `<li class="vacio">No hay resultados para «${esc(filtroInv)}».</li>` : vis.map(p => `
            <li class="fila" data-id="${p.id}">
              <div style="min-width:0">
                <div class="nombre">${esc(p.nombre)}</div>
                <div class="datos">
                  <span class="mono" title="Código de ${esc(p.nombre)}">${esc(p.codigo)}</span>
                  ${p.es_organizador ? `<span class="insignia oro" title="Puede administrar el convivio con su código">${ic('llave', 's')}Organizador</span>` : ''}
                  ${c.act.asistencia ? etiquetaAsistencia(p) : ''}
                  ${c.act.cuota ? `<button class="insignia ${p.cuota_pagada ? 'si' : 'oro'}" data-acc="cuota" title="${p.cuota_pagada ? 'Marcar como pendiente de pago' : 'Registrar el pago de ' + quetzales(c.cuota)}">${ic('billete', 's')}${p.cuota_pagada ? 'Pagado' : 'Pendiente ' + quetzales(c.cuota)}</button>` : ''}
                  ${c.act.intercambio ? `<button class="insignia ${p.en_intercambio ? 'si' : ''}" data-acc="en-intercambio" title="${p.en_intercambio ? 'Sacar del intercambio' : 'Meter al intercambio'}">${ic('regalo', 's')}${p.en_intercambio ? 'En intercambio' : 'Sin intercambio'}</button>` : ''}
                </div>
              </div>
              <div class="botones">
                <a class="icono wa" href="https://wa.me/?text=${encodeURIComponent(mensajeWhats(p, c))}" target="_blank" rel="noopener" title="Enviar a ${esc(p.nombre)} su código por WhatsApp" aria-label="Enviar código por WhatsApp a ${esc(p.nombre)}">${ic('mensaje')}</a>
                <button class="icono" data-acc="copiar-inv" title="Copiar la invitación con el código de ${esc(p.nombre)}" aria-label="Copiar invitación de ${esc(p.nombre)}">${ic('copiar')}</button>
                <button class="icono" data-acc="editar-inv" title="Editar el nombre, generar otro código o retirar a ${esc(p.nombre)}" aria-label="Editar a ${esc(p.nombre)}">${ic('lapiz')}</button>
              </div>
            </li>`).join('')}</ul>
        </section>
      </div>
      <div class="columna">
        ${c.act.asistencia ? `<section class="panel">
          <div class="titulo-sec"><h2>Asistencia</h2></div>
          <div class="cifras cuatro"><div><b>${r.personas}</b><span>personas en total</span></div><div><b>${r.van}</b><span>confirmados</span></div><div><b>${r.talvez}</b><span>por confirmar</span></div><div><b>${r.no}</b><span>no asisten</span></div></div>
          <p class="ayuda" style="margin-top:12px">${r.falta ? `${r.falta} sin respuesta.` : inv.length ? 'Todos han respondido.' : ''} El total incluye acompañantes.</p>
        </section>` : ''}
        ${c.act.cuota ? `<section class="panel">
          <div class="titulo-sec"><h2>Cooperación</h2><p>${quetzales(c.cuota)} por persona</p></div>
          <div class="cifras"><div><b>${quetzales(pagaron * c.cuota).replace('.00', '')}</b><span>recaudado</span></div><div><b>${quetzales((inv.length - pagaron) * c.cuota).replace('.00', '')}</b><span>pendiente</span></div></div>
          <div class="barra" role="progressbar" aria-label="Cooperación recogida" aria-valuenow="${inv.length ? Math.round(pagaron / inv.length * 100) : 0}" aria-valuemin="0" aria-valuemax="100"><i style="width:${inv.length ? pagaron / inv.length * 100 : 0}%"></i></div>
          <p class="ayuda">${pagaron} de ${inv.length} han pagado. Use «Pendiente» o «Pagado» en cada invitado para actualizarlo.</p>
        </section>` : ''}
        <section class="panel">
          <div class="titulo-sec"><h2>Organizadores</h2></div>
          ${E.datos.principal ? `<div class="clave-org"><span class="mono">${esc(verCodigo(c.codigo_admin))}</span><button class="btn salida chico" data-acc="copiar-clave" title="Copiar el código de organizador principal">${ic('copiar', 's')}Copiar</button></div>
          <p class="ayuda">Código del organizador principal. Con él puede ingresar desde otro equipo. Es confidencial.</p>` : `<p class="ayuda" style="margin-top:0">Usted administra este convivio con su código personal.</p>`}
          ${inv.some(i => i.es_organizador) ? `<div class="quienes-van" style="margin-top:12px">${inv.filter(i => i.es_organizador).map(i => `<span class="insignia oro">${ic('llave', 's')}${esc(i.nombre)}</span>`).join('')}</div>` : ''}
          ${E.datos.principal ? `<p class="ayuda">Para que otra persona le ayude a organizar, seleccione el lápiz junto a su nombre y elija «Nombrar organizador». Ingresará con su propio código.</p>` : ''}
          ${inv.length ? `<div class="acciones"><button class="btn salida chico" data-acc="copiar-todos" title="Copiar la lista de nombres con su código">${ic('lista', 's')}Copiar todos los códigos</button></div>` : ''}
        </section>
      </div>
    </div>`;
  },

  intercambio() {
    const {convivio: c, invitados: inv} = E.datos;
    const en = inv.filter(i => i.en_intercambio);
    const faltan = Math.max(0, 3 - en.length);
    const conDeseos = en.filter(p => p.tiene_deseos).length, compraron = en.filter(p => p.ya_compro).length;
    const pct = en.length ? Math.round(compraron / en.length * 100) : 0;
    return `<div class="rejilla">
      <div class="columna">
        <section class="panel">
          <div class="titulo-sec"><div><h2>Sorteo</h2><p>Presupuesto por regalo: ${quetzales(c.presupuesto)}. Las asignaciones son confidenciales, incluso para el organizador.</p></div></div>
          ${c.sorteado
            ? `<div class="estado-ok">${ic('check', 's')}Sorteo hecho el ${esc(fechaLarga(c.sorteado_en, false))}</div>`
            : `<div class="estado-falta">${faltan ? `Se requiere${faltan === 1 ? '' : 'n'} ${faltan === 1 ? '1 participante más' : faltan + ' participantes más'} para realizar el sorteo.` : 'Cuando estén todos los participantes, realice el sorteo. Los invitados pueden incorporarse o retirarse hasta ese momento.'}</div>`}
          <div class="acciones">
            ${c.sorteado
              ? `<button class="btn sec" data-acc="sortear" data-otra="1" title="Realizar un nuevo sorteo; el anterior se anula">${ic('sortear', 's')}Volver a sortear</button><button class="btn peligro" data-acc="deshacer-sorteo" title="Anular el sorteo para modificar a los participantes">Anular sorteo</button>`
              : `<button class="btn acen" data-acc="sortear" ${faltan ? `disabled title="Se requieren al menos 3 participantes; faltan ${faltan}"` : 'title="Asignar a cada participante a quién regala"'}>${ic('sortear')}Realizar el sorteo</button>`}
          </div>
        </section>
        <section class="panel">
          <div class="titulo-sec"><div><h2>Participantes</h2><p>${en.length} de ${inv.length} invitados</p></div></div>
          <ul class="lista">${en.length ? en.map(p => `<li class="fila"><div><div class="nombre">${esc(p.nombre)}</div><div class="datos"><span class="insignia ${p.tiene_deseos ? 'si' : ''}">${ic(p.tiene_deseos ? 'check' : 'lista', 's')}${p.tiene_deseos ? 'Con lista de deseos' : 'Sin lista de deseos'}</span>${c.sorteado ? `<span class="insignia ${p.ya_compro ? 'si' : ''}">${ic('bolsa', 's')}${p.ya_compro ? 'Regalo adquirido' : 'Regalo pendiente'}</span>` : ''}</div></div></li>`).join('') : '<li class="vacio">Aún no hay participantes.</li>'}</ul>
        </section>
      </div>
      <div class="columna">
        <section class="panel">
          <div class="titulo-sec"><h2>Avance</h2></div>
          <div class="cifras"><div><b>${en.length}</b><span>participantes</span></div><div><b>${conDeseos}</b><span>con lista</span></div><div><b>${compraron}</b><span>regalos listos</span></div></div>
          <div class="barra" role="progressbar" aria-label="Regalos comprados" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>
          <p class="ayuda">${c.sorteado ? (compraron === en.length && en.length ? 'Todos los regalos están listos.' : `${en.length - compraron} regalo${en.length - compraron === 1 ? '' : 's'} pendiente${en.length - compraron === 1 ? '' : 's'}.`) : 'Disponible después del sorteo.'}</p>
        </section>
      </div>
    </div>`;
  },

  comida() {
    const ll = E.datos.llevar, inv = E.datos.invitados;
    const porPersona = inv.map(p => ({p, cosas: ll.filter(l => l.quienes.some(q => q.id === p.id))}));
    const con = porPersona.filter(x => x.cosas.length), sin = porPersona.filter(x => !x.cosas.length);
    return `<div class="rejilla"><div class="columna"><section class="panel">
      <div class="titulo-sec"><div><h2>Alimentos y artículos</h2><p>Registre lo necesario y asigne a quién le corresponde. Los invitados también pueden inscribirse en lo que quede libre.</p></div></div>
      <form class="agregar tres" data-form="llevar">
        <div><label for="lQue">Artículo</label><input id="lQue" maxlength="80" placeholder="Bebidas, tamales, vajilla…"></div>
        <div><label for="lCuantos">Cupo</label><input id="lCuantos" type="number" min="1" max="50" value="1" title="Cuántas personas pueden inscribirse"></div>
        <button class="btn prim" type="submit" title="Agregar a la lista">${ic('mas')}Agregar</button>
      </form>
      <p class="ayuda" style="margin-bottom:18px">El cupo indica cuántas personas pueden inscribirse en cada artículo.</p>
      <ul class="cosas">${ll.length ? ll.map(l => { const libres = inv.filter(p => !l.quienes.some(q => q.id === p.id)); return `<li class="cosa ${l.quienes.length >= l.cuantos ? 'completa' : ''}" data-id="${l.id}"><div style="min-width:0"><div class="que">${esc(l.que)}<span class="cupo">${l.quienes.length}/${l.cuantos}</span></div>
        <div class="asignados">${l.quienes.map(q => `<span class="insignia ${q.asignado ? 'si' : ''}" title="${q.asignado ? 'Asignado por el organizador' : 'Se inscribió por su cuenta'}">${esc(q.nombre)}<button class="quitar-chip" data-acc="desasignar" data-inv="${q.id}" title="Quitar a ${esc(q.nombre)} de «${esc(l.que)}»" aria-label="Quitar a ${esc(q.nombre)} de ${esc(l.que)}">${ic('x', 's')}</button></span>`).join('')}
          ${libres.length ? `<label class="sr" for="as-${l.id}">Asignar ${esc(l.que)} a</label><select id="as-${l.id}" class="asignar" data-cambio="asignar" title="Elegir quién lleva «${esc(l.que)}»"><option value="">Asignar a…</option>${libres.map(p => `<option value="${p.id}">${esc(p.nombre)}</option>`).join('')}</select>` : ''}
          ${!l.quienes.length && !inv.length ? '<span class="ayuda" style="margin:0">Agregue invitados para poder asignarlo.</span>' : ''}</div></div>
        <button class="icono" data-acc="llevar-quitar" title="Quitar «${esc(l.que)}» de la lista" aria-label="Quitar ${esc(l.que)}">${ic('basura')}</button></li>`; }).join('') : '<li class="vacio">Aún no hay artículos registrados.</li>'}</ul>
    </section></div>
    <div class="columna"><section class="panel"><div class="titulo-sec"><h2>Resumen</h2></div>
      <div class="cifras"><div><b>${ll.length}</b><span>artículos</span></div><div><b>${ll.filter(l => l.quienes.length >= l.cuantos).length}</b><span>cubiertos</span></div><div><b>${ll.filter(l => !l.quienes.length).length}</b><span>sin asignar</span></div></div>
    </section>
    <section class="panel"><div class="titulo-sec"><div><h2>Por persona</h2><p>${con.length} de ${inv.length} ${inv.length === 1 ? 'invitado lleva' : 'invitados llevan'} algo.</p></div></div>
      ${con.length ? `<ul class="por-persona">${con.map(x => `<li><b>${esc(x.p.nombre)}</b><span>${x.cosas.map(l => esc(l.que)).join(', ')}</span></li>`).join('')}</ul>` : '<p class="vacio">Aún no hay asignaciones.</p>'}
      ${sin.length && con.length ? `<p class="ayuda" style="margin-top:14px">Sin artículo: ${sin.map(x => esc(x.p.nombre)).join(', ')}.</p>` : ''}
    </section></div></div>`;
  },

  programa() {
    const items = progBorrador || E.datos.programa.map(p => ({hora: p.hora || '', titulo: p.titulo, detalle: p.detalle || ''}));
    return `<div class="rejilla"><div class="columna"><section class="panel">
      <div class="titulo-sec"><div><h2>Programa del día</h2><p>Indique la hora y la actividad. Use las flechas para ordenarlas.</p></div></div>
      <div class="prog-edit" id="progEdit">${items.map((it, i) => `<div class="prog-fila" data-i="${i}">
        <input class="p-hora" maxlength="20" placeholder="7:00 p. m." value="${esc(it.hora)}" data-cambio="prog" aria-label="Hora">
        <input class="p-tit" maxlength="80" placeholder="Actividad (ej. Cena)" value="${esc(it.titulo)}" data-cambio="prog" aria-label="Actividad">
        <input class="p-det" maxlength="200" placeholder="Detalle (opcional)" value="${esc(it.detalle)}" data-cambio="prog" aria-label="Detalle">
        <div class="mover"><button type="button" class="icono" data-acc="prog-arriba" title="Subir" aria-label="Subir" ${i ? '' : 'disabled'}>${ic('arriba', 's')}</button><button type="button" class="icono" data-acc="prog-abajo" title="Bajar" aria-label="Bajar" ${i < items.length - 1 ? '' : 'disabled'}>${ic('abajo', 's')}</button><button type="button" class="icono" data-acc="prog-quitar" title="Quitar esta actividad" aria-label="Quitar">${ic('x', 's')}</button></div>
      </div>`).join('') || '<p class="vacio">Aún no hay programa.</p>'}</div>
      <div class="acciones" style="justify-content:space-between">
        <button class="btn sec" data-acc="prog-agregar" title="Agregar una actividad al programa">${ic('mas', 's')}Agregar actividad</button>
        <span style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="estado-guardado">${progBorrador ? 'Cambios sin guardar' : ''}</span>${progBorrador ? `<button class="btn fantasma" data-acc="prog-descartar" title="Volver a la versión guardada">Descartar</button>` : ''}<button class="btn prim" data-acc="prog-guardar" ${progBorrador ? '' : 'disabled title="No hay cambios"'} title="Guardar el programa">${ic('check', 's')}Guardar programa</button></span>
      </div>
    </section></div>
    <div class="columna"><section class="panel"><div class="titulo-sec"><h2>Vista de los invitados</h2></div>${listaPrograma(E.datos.programa)}</section></div></div>`;
  },

  juegos() {
    const {convivio: c, premios, votaciones} = E.datos;
    return `<div class="rejilla">
      ${c.act.rifa ? `<div class="columna"><section class="panel">
        <div class="titulo-sec"><div><h2>Rifa</h2><p>${c.act.asistencia ? 'Participan los invitados con asistencia confirmada.' : 'Participan todos los invitados.'} Cada persona puede ganar un solo premio.</p></div></div>
        <form class="agregar" data-form="premio"><div><label for="pPremio">Premio</label><input id="pPremio" maxlength="80" placeholder="Canasta navideña, tarjeta de regalo…"></div><button class="btn prim" type="submit" title="Agregar premio">${ic('mas')}Agregar</button></form>
        <ul class="lista" style="margin-top:18px">${premios.length ? premios.map(p => `<li class="premio" data-id="${p.id}"><span class="ico">${ic(p.ganador ? 'trofeo' : 'boleto')}</span><div style="min-width:0"><b>${esc(p.premio)}</b>${p.ganador ? `<span class="ganador">${esc(p.ganador)}</span>` : '<span class="ayuda" style="margin:0">Sin rifar</span>'}</div><div class="botones" style="display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end"><button class="btn ${p.ganador ? 'sec' : 'acen'} chico" data-acc="rifar" title="${p.ganador ? 'Volver a rifar este premio' : 'Sortear el ganador de este premio'}">${ic('sortear', 's')}${p.ganador ? 'Repetir' : 'Rifar'}</button><button class="icono" data-acc="premio-quitar" title="Quitar premio" aria-label="Quitar ${esc(p.premio)}">${ic('basura', 's')}</button></div></li>`).join('') : '<li class="vacio">Agregue los premios para rifarlos el día del convivio.</li>'}</ul>
      </section></div>` : ''}
      ${c.act.votos ? `<div class="columna"><section class="panel">
        <div class="titulo-sec"><div><h2>Votaciones</h2><p>Cada invitado vota desde su teléfono. Los resultados se publican al cerrar la votación.</p></div></div>
        <form class="agregar" data-form="votacion"><div><label for="vTitulo">Categoría</label><input id="vTitulo" maxlength="80" placeholder="Mejor atuendo, mejor decoración…"></div><button class="btn prim" type="submit" title="Crear votación">${ic('mas')}Crear</button></form>
        <div style="display:grid;gap:12px;margin-top:18px">${votaciones.length ? votaciones.map(v => `<div class="votacion" data-id="${v.id}">
          <h3>${esc(v.titulo)} <span class="insignia ${v.estado === 'abierta' ? 'si' : ''}">${ic(v.estado === 'abierta' ? 'abierto' : 'candado', 's')}${v.estado === 'abierta' ? 'Abierta' : 'Cerrada'}</span></h3>
          <p class="ayuda">${v.total} ${v.total === 1 ? 'voto' : 'votos'}</p>
          ${resultadosHTML(v.resultados, v.total)}
          <div class="acciones"><button class="btn ${v.estado === 'abierta' ? 'acen' : 'sec'} chico" data-acc="votacion-estado" title="${v.estado === 'abierta' ? 'Cerrar la votación y publicar resultados' : 'Reabrir la votación'}">${ic(v.estado === 'abierta' ? 'candado' : 'abierto', 's')}${v.estado === 'abierta' ? 'Cerrar y publicar' : 'Reabrir'}</button><button class="btn peligro chico" data-acc="votacion-quitar" title="Eliminar esta votación">${ic('basura', 's')}Eliminar</button></div>
        </div>`).join('') : '<p class="vacio">Cree una categoría para iniciar la votación.</p>'}</div>
      </section></div>` : ''}
    </div>`;
  },

  fotos() {
    const fotos = E.datos.fotos;
    return `<section class="panel"><div class="titulo-sec"><div><h2>Álbum</h2><p>Los invitados comparten sus fotografías con su código. Usted puede retirar las que no correspondan.</p></div></div>
      ${galeriaHTML(fotos, true)}</section>`;
  },

  ajustes() {
    const c = E.datos.convivio;
    temaElegido = {tema: c.tema, color: c.color};
    return `<form data-form="ajustes">${formConvivio(c)}
      <div class="acciones" style="justify-content:flex-end;margin-top:0;margin-bottom:24px"><button class="btn prim" type="submit" title="Guardar los cambios del convivio">${ic('check', 's')}Guardar cambios</button></div></form>
      ${E.datos.principal ? `<section class="panel"><div class="titulo-sec"><div><h2>Eliminar el convivio</h2><p>Se eliminan los invitados, sus códigos, los alimentos, la rifa, las votaciones y las fotografías.</p></div></div>
      <button class="btn peligro" data-acc="borrar-convivio" title="Eliminar este convivio de forma permanente">${ic('basura', 's')}Eliminar el convivio</button></section>` : ''}`;
  }
};

function listaPrograma(prog) {
  return prog.length ? `<ol class="programa">${prog.map(p => `<li><span class="hora">${esc(p.hora || '')}</span><div class="punto"><b>${esc(p.titulo)}</b>${p.detalle ? `<small>${esc(p.detalle)}</small>` : ''}</div></li>`).join('')}</ol>` : '<p class="vacio">Aún no hay programa.</p>';
}
function resultadosHTML(res, total) {
  if (!res || !res.length) return '';
  const max = res[0].votos;
  return `<div class="resultados">${res.slice(0, 8).map(r => `<div class="resultado ${r.votos === max ? 'gana' : ''}"><b>${r.votos === max ? estrella() + ' ' : ''}${esc(r.nombre)}</b><span>${r.votos}</span><span class="riel"><i style="width:${total ? r.votos / total * 100 : 0}%"></i></span></div>`).join('')}</div>`;
}
function galeriaHTML(fotos, org) {
  return fotos.length ? `<div class="galeria">${fotos.map(f => `<button class="foto" data-acc="ver-foto" data-id="${f.id}" title="Ver fotografía${f.autor ? ' de ' + esc(f.autor) : ''}"><img src="${urlFoto(f.ruta)}" alt="Foto${f.autor ? ' de ' + esc(f.autor) : ''} en el convivio" loading="lazy"><span class="autor">${esc(f.autor || '')}</span></button>`).join('')}</div>` : `<p class="vacio">${org ? 'Aún no hay fotografías.' : 'Aún no hay fotografías. Puede compartir la primera.'}</p>`;
}

const VISTAS_INV = {
  inicio() {
    const {convivio: c, yo, invitados: inv} = E.datos;
    const r = resumenAsistencia(inv);
    const van = inv.filter(i => i.asistencia === 'si');
    return `<div class="rejilla">
      <div class="columna">
        ${c.act.asistencia ? `<section class="panel">
          <div class="titulo-sec"><div><h2>Confirmación de asistencia</h2><p>${yo.asistencia ? 'Puede modificar su respuesta en cualquier momento.' : 'Le agradecemos confirmar su asistencia.'}</p></div></div>
          <div class="respuesta" role="group" aria-label="Su respuesta">
            <button data-acc="asistir" data-v="si" aria-pressed="${yo.asistencia === 'si'}" title="Confirmar asistencia">${ic('check', 's')}Asistiré</button>
            <button class="r-tv" data-acc="asistir" data-v="tal_vez" aria-pressed="${yo.asistencia === 'tal_vez'}" title="Aún no puede confirmar">Por confirmar</button>
            <button class="r-no" data-acc="asistir" data-v="no" aria-pressed="${yo.asistencia === 'no'}" title="Informar que no podrá asistir">No asistiré</button>
          </div>
          ${yo.asistencia && yo.asistencia !== 'no' ? `<div class="contador"><span class="etiqueta" style="margin:0">Acompañantes</span><button class="icono" data-acc="acomp" data-d="-1" title="Restar un acompañante" aria-label="Restar un acompañante" ${yo.acompanantes ? '' : 'disabled'}>${ic('menos', 's')}</button><b aria-live="polite">${yo.acompanantes}</b><button class="icono" data-acc="acomp" data-d="1" title="Sumar un acompañante" aria-label="Sumar un acompañante">${ic('mas', 's')}</button><span class="ayuda" style="margin:0">Sin incluirle a usted.</span></div>` : ''}
        </section>` : ''}
        ${c.act.programa ? `<section class="panel"><div class="titulo-sec"><h2>Programa</h2></div>${listaPrograma(E.datos.programa)}</section>` : ''}
        ${!c.act.asistencia && !c.act.programa ? `<section class="panel"><div class="titulo-sec"><div><h2>Bienvenido(a)</h2><p>Consulte la información del convivio en las secciones superiores.</p></div></div></section>` : ''}
      </div>
      <div class="columna">
        ${c.act.intercambio && c.sorteado && yo.en_intercambio ? `<section class="panel"><p class="eyebrow">${estrella()} Intercambio</p><h2 style="font-size:1.5rem;margin:10px 0 8px">Su asignación está lista</h2><p class="ayuda" style="margin:0 0 16px">Abra la caja para conocer a quién le corresponde regalar.</p><button class="btn acen" data-acc="tab" data-tab="intercambio" title="Ir al intercambio">${ic('regalo', 's')}Ver mi asignación</button></section>` : ''}
        ${c.act.cuota ? `<section class="panel"><div class="titulo-sec"><div><h2>Cooperación</h2><p>${quetzales(c.cuota)} por persona</p></div></div>${yo.cuota_pagada ? `<div class="estado-ok">${ic('check', 's')}Pago registrado. Gracias.</div>` : `<div class="estado-falta">Pendiente. Puede entregarla al organizador, quien registrará el pago.</div>`}</section>` : ''}
        ${c.act.asistencia ? `<section class="panel"><div class="titulo-sec"><div><h2>Asistentes confirmados</h2><p>${r.personas} ${r.personas === 1 ? 'persona' : 'personas'} con acompañantes · ${r.falta} sin respuesta</p></div></div>
          <div class="quienes-van">${van.length ? van.map(i => `<span class="insignia si">${esc(i.nombre)}${i.acompanantes ? ` +${i.acompanantes}` : ''}</span>`).join('') : '<span class="ayuda">Aún no hay confirmaciones.</span>'}</div></section>` : ''}
      </div>
    </div>`;
  },

  intercambio() {
    const {convivio: c, yo, amigo, intercambio: ix} = E.datos;
    let principal;
    if (!yo.en_intercambio) {
      principal = `<section class="regalo-zona"><p class="eyebrow">${estrella()} Intercambio</p><h2 style="font-size:2rem;margin:14px 0 10px">No participa en el intercambio</h2><p>${c.sorteado ? 'El sorteo ya se realizó. Para participar, comuníquese con el organizador.' : 'Si desea participar, actívelo antes del sorteo.'}</p></section>`;
    } else if (!amigo) {
      principal = `<section class="regalo-zona"><p class="eyebrow">${estrella()} Intercambio de regalos</p><div class="escena" aria-hidden="true">${cajaHTML(false)}</div><h2 style="font-size:1.8rem;margin:4px 0 8px">Sorteo pendiente</h2><p>Cuando el organizador realice el sorteo, aquí conocerá su asignación. Mientras tanto, puede preparar su lista de deseos.</p></section>`;
    } else {
      principal = `<section class="regalo-zona"><p class="eyebrow">${estrella()} Intercambio de regalos</p>
        <div class="escena ${cajaAbierta ? 'abierta' : ''}" id="escena">${cajaHTML(true, amigo.nombre)}</div>
        <p>${cajaAbierta ? `Presupuesto: hasta ${quetzales(c.presupuesto)}. Le rogamos mantener la reserva.` : 'Seleccione la caja para abrirla.'}</p>
        ${cajaAbierta ? `<button class="btn" data-acc="caja" title="Cerrar la caja para mantener la reserva">${ic('ojo', 's')}Cerrar la caja</button>` : ''}
      </section>`;
    }
    const ds = amigo ? lineas(amigo.deseos) : [];
    return `<div class="rejilla">
      <div class="columna">
        ${principal}
        ${amigo && cajaAbierta ? `<section class="panel"><div class="titulo-sec"><h2>Lista de deseos de ${esc(amigo.nombre)}</h2></div>${ds.length ? `<ul class="deseos-amigo">${ds.map(x => `<li>${estrella()}<span>${enlaces(x)}</span></li>`).join('')}</ul>` : '<p class="vacio">Aún no ha registrado su lista. Puede consultarla más adelante.</p>'}</section>` : ''}
      </div>
      <div class="columna">
        ${!c.sorteado ? `<section class="panel"><label class="interruptor" title="${yo.en_intercambio ? 'Retirarse del intercambio' : 'Participar en el intercambio'}"><span><b>Participo en el intercambio</b><span class="ayuda" style="margin:0">${ix.total} ${ix.total === 1 ? 'participante' : 'participantes'} · presupuesto de ${quetzales(c.presupuesto)}</span></span><input type="checkbox" data-cambio="participo" ${yo.en_intercambio ? 'checked' : ''}><span class="riel"></span></label></section>` : ''}
        ${yo.en_intercambio ? `<section class="panel">
          <div class="titulo-sec"><div><h2>Mi lista de deseos</h2><p>Una sugerencia por línea: talla, colores o un enlace. Solo la verá la persona que le regala.</p></div></div>
          <label class="sr" for="yDeseos">Mi lista de deseos</label>
          <textarea id="yDeseos" maxlength="1500" rows="6" data-cambio="deseos" placeholder="Taza para café&#10;Libro de recetas&#10;Talla M, colores oscuros"></textarea>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;flex-wrap:wrap">
            <span class="estado-guardado" id="yEstado">${deseosSucio ? 'Cambios sin guardar' : ''}</span>
            <button class="btn prim" data-acc="guardar-deseos" title="Guardar su lista de deseos">${ic('check', 's')}Guardar lista</button>
          </div>
        </section>
        <section class="panel"><label class="interruptor" title="${amigo ? 'Indique cuando tenga el regalo listo' : 'Disponible después del sorteo'}"><span><b>Regalo adquirido</b><span class="ayuda" style="margin:0">${ix.compraron} de ${ix.total} regalos listos</span></span><input type="checkbox" data-cambio="compre" ${yo.ya_compro ? 'checked' : ''} ${amigo ? '' : 'disabled'}><span class="riel"></span></label></section>` : ''}
      </div>
    </div>`;
  },

  comida() {
    const {llevar: ll, yo} = E.datos;
    const mias = ll.filter(l => l.quienes.some(q => q.id === yo.id));
    return `<div class="rejilla"><div class="columna"><section class="panel">
      <div class="titulo-sec"><div><h2>Alimentos y artículos</h2><p>Inscríbase en lo que llevará para coordinar sin repeticiones.</p></div></div>
      <ul class="cosas">${ll.length ? ll.map(l => { const mia = l.quienes.some(q => q.id === yo.id), llena = l.quienes.length >= l.cuantos; const asignada = l.quienes.some(q => q.id === yo.id && q.asignado); return `<li class="cosa ${llena ? 'completa' : ''} ${mia ? 'mia' : ''}" data-id="${l.id}"><div style="min-width:0"><div class="que">${esc(l.que)}<span class="cupo">${l.quienes.length}/${l.cuantos}</span></div><div class="quienes">${l.quienes.length ? 'A cargo de: ' + l.quienes.map(q => q.id === yo.id ? '<b>usted</b>' : esc(q.nombre)).join(', ') : 'Sin inscritos'}</div></div>${asignada ? `<span class="insignia oro" title="El organizador le asignó este artículo">${ic('llave', 's')}Asignado</span>` : mia ? `<button class="btn sec chico" data-acc="llevar" data-v="0" title="Cancelar su inscripción">Cancelar</button>` : llena ? `<span class="insignia si">${ic('check', 's')}Cubierto</span>` : `<button class="btn prim chico" data-acc="llevar" data-v="1" title="Inscribirse para llevar ${esc(l.que)}">${ic('check', 's')}Me inscribo</button>`}</li>`; }).join('') : '<li class="vacio">El organizador aún no registra artículos. Puede agregar lo que llevará.</li>'}</ul>
    </section></div>
    <div class="columna">
      <section class="panel"><div class="titulo-sec"><div><h2>Agregar un artículo</h2><p>Si lo que llevará no está en la lista, puede agregarlo.</p></div></div>
        <form class="agregar" data-form="llevar-mio"><div><label for="lMio">Artículo</label><input id="lMio" maxlength="80" placeholder="Postre, hielo, servilletas…"></div><button class="btn prim" type="submit" title="Agregar e inscribirse">${ic('mas')}Agregar</button></form>
      </section>
      <section class="panel"><div class="titulo-sec"><h2>Sus artículos</h2></div>${mias.length ? `<ul class="deseos-amigo">${mias.map(l => `<li>${estrella()}<span>${esc(l.que)}${l.quienes.some(q => q.id === yo.id && q.asignado) ? ' <small class="ayuda" style="display:inline">(asignado por el organizador)</small>' : ''}</span></li>`).join('')}</ul>` : '<p class="ayuda" style="margin:0">Aún no tiene inscripciones.</p>'}</section>
    </div></div>`;
  },

  juegos() {
    const {convivio: c, premios, votaciones, invitados, yo} = E.datos;
    const opciones = invitados.filter(i => i.id !== yo.id);
    return `<div class="rejilla">
      ${c.act.votos ? `<div class="columna"><section class="panel">
        <div class="titulo-sec"><div><h2>Votaciones</h2><p>Seleccione un nombre para votar. Puede cambiar su voto mientras la votación esté abierta.</p></div></div>
        <div style="display:grid;gap:12px">${votaciones.length ? votaciones.map(v => `<div class="votacion" data-id="${v.id}">
          <h3>${esc(v.titulo)} <span class="insignia ${v.estado === 'abierta' ? 'si' : ''}">${v.estado === 'abierta' ? 'Abierta' : 'Cerrada'}</span></h3>
          ${v.estado === 'abierta' ? `<div class="opciones-voto">${opciones.map(o => `<button data-acc="votar" data-el="${o.id}" aria-pressed="${v.mi_voto === o.id}" title="Votar por ${esc(o.nombre)}">${esc(o.nombre)}</button>`).join('')}</div><p class="ayuda">${v.mi_voto ? 'Su voto fue registrado.' : 'Aún no ha votado.'} Los resultados se publicarán al cerrar.</p>` : `${resultadosHTML(v.resultados, v.total) || '<p class="ayuda">No se registraron votos.</p>'}`}
        </div>`).join('') : '<p class="vacio">Aún no hay votaciones.</p>'}</div>
      </section></div>` : ''}
      ${c.act.rifa ? `<div class="columna"><section class="panel">
        <div class="titulo-sec"><div><h2>Rifa</h2><p>${c.act.asistencia ? 'Participan los invitados con asistencia confirmada.' : 'Participan todos los invitados.'}</p></div></div>
        <ul class="lista">${premios.length ? premios.map(p => `<li class="premio"><span class="ico">${ic(p.ganador ? 'trofeo' : 'boleto')}</span><div style="min-width:0"><b>${esc(p.premio)}</b>${p.ganador ? `<span class="ganador">${p.ganador_id === yo.id ? 'Usted ganó este premio' : esc(p.ganador)}</span>` : '<span class="ayuda" style="margin:0">Se rifará durante el convivio</span>'}</div><span></span></li>`).join('') : '<li class="vacio">Aún no hay premios.</li>'}</ul>
      </section></div>` : ''}
    </div>`;
  },

  fotos() {
    return `<section class="panel"><div class="titulo-sec"><div><h2>Álbum del convivio</h2><p>Comparta sus fotografías; todos los invitados podrán verlas.</p></div></div>
      <label class="subir" title="Seleccionar fotografías para compartir">${ic('subir')}<span id="subirTxt">Compartir fotografías</span><input type="file" accept="image/*" multiple data-cambio="fotos"></label>
      ${galeriaHTML(E.datos.fotos, false)}</section>`;
  }
};

function cajaHTML(activa, nombre = '') {
  const dest = Array.from({length: 12}, (_, i) => { const ang = i / 12 * Math.PI * 2, r = 80 + (i % 3) * 18; return `<i style="left:${112 + Math.cos(ang) * 30}px;top:${100 + Math.sin(ang) * 20}px;--dx:${Math.round(Math.cos(ang) * r)}px;--dy:${Math.round(Math.sin(ang) * r - 30)}px;animation-delay:${.25 + (i % 4) * .05}s"><svg viewBox="0 0 24 24">${ESTRELLA}</svg></i>`; }).join('');
  const inner = `<span class="tapa"><span class="lazo"></span><span class="nudo"></span></span><span class="cuerpo"></span>`;
  if (!activa) return `<div class="caja-regalo" style="cursor:default">${inner}</div>`;
  return `<div class="tarjeta-nombre" ${cajaAbierta ? '' : 'aria-hidden="true"'}><small>Usted regala a</small><b>${cajaAbierta ? esc(nombre) : ''}</b></div>
    <button class="caja-regalo" data-acc="caja" aria-label="${cajaAbierta ? 'Cerrar la caja' : 'Abrir la caja para conocer su asignación'}" title="${cajaAbierta ? 'Cerrar la caja' : 'Abrir la caja'}">${inner}</button>
    ${cajaReciente ? `<div class="destellos">${dest}</div>` : ''}`;
}

async function comprimir(file) {
  let fuente;
  try { fuente = await createImageBitmap(file); }
  catch {
    fuente = await new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => rej(new Error('No se pudo leer la fotografía «' + file.name + '». Intente con formato JPG o PNG.')); im.src = URL.createObjectURL(file); });
  }
  const w = fuente.width, h = fuente.height, k = Math.min(1, 1600 / Math.max(w, h));
  const cv = document.createElement('canvas');
  cv.width = Math.round(w * k); cv.height = Math.round(h * k);
  cv.getContext('2d').drawImage(fuente, 0, 0, cv.width, cv.height);
  return await new Promise((res, rej) => cv.toBlob(b => b ? res(b) : rej(new Error('No se pudo preparar la fotografía')), 'image/jpeg', .84));
}
const nuevoId = () => (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16; return (c === 'x' ? r : (r & 3 | 8)).toString(16); }));

async function subirFotos(files) {
  const lista = [...files].slice(0, 20);
  const txt = $('#subirTxt');
  let hechas = 0;
  for (const f of lista) {
    if (txt) txt.textContent = `Subiendo ${hechas + 1} de ${lista.length}…`;
    try {
      const blob = await comprimir(f);
      const ruta = `${E.datos.convivio.id}/${nuevoId()}.jpg`;
      const r = await fetch(`${SB_URL}/storage/v1/object/${BUCKET}/${ruta}`, {method: 'POST', headers: encabezados({'Content-Type': 'image/jpeg', 'x-upsert': 'false'}), body: blob});
      if (!r.ok) { const t = await r.text(); throw new Error('No se pudo subir la fotografía' + (/size|large/i.test(t) ? ': el archivo es demasiado grande' : '')); }
      await rpc('yo_foto', {p_codigo: E.codigo, p_ruta: ruta});
      hechas++;
    } catch (e) { aviso(e.message, true); }
  }
  if (hechas) aviso(hechas === 1 ? 'Fotografía compartida' : `${hechas} fotografías compartidas`);
  await refrescar(true);
}

function verFoto(id) {
  const f = E.datos.fotos.find(x => x.id === id);
  if (!f) return;
  const org = E.vista === 'organizador';
  const mia = !org && f.autor_id === E.datos.yo.id;
  abrirDialogo(`<h2 id="dlgTitulo" class="sr">Foto${f.autor ? ' de ' + esc(f.autor) : ''}</h2><img class="foto-grande" src="${urlFoto(f.ruta)}" alt="Foto${f.autor ? ' de ' + esc(f.autor) : ''}">
    <div class="pie" style="justify-content:space-between;align-items:center"><span class="ayuda" style="margin:0">${f.autor ? 'Subida por ' + esc(f.autor) : ''}</span><span style="display:flex;gap:10px;flex-wrap:wrap">${org || mia ? `<button class="btn peligro" id="fQuitar" title="Retirar esta fotografía del álbum">${ic('basura', 's')}Retirar</button>` : ''}<a class="btn salida" href="${urlFoto(f.ruta)}" target="_blank" rel="noopener" download title="Abrir la fotografía en tamaño completo">${ic('subir', 's')}Abrir</a><button class="btn sec" data-cerrar title="Cerrar">Cerrar</button></span></div>`,
    d => {
      const q = d.querySelector('#fQuitar');
      if (q) q.addEventListener('click', async () => {
        d.close();
        if (!await confirmar({titulo: '¿Retirar esta fotografía?', texto: 'Dejará de aparecer en el álbum.', si: 'Retirar', tipo: 'acen'})) return;
        try { await rpc(org ? 'admin_foto_quitar' : 'yo_foto_quitar', {p_codigo: E.codigo, p_id: f.id}); aviso('Fotografía retirada'); await refrescar(true); } catch (e) { aviso(e.message, true); }
      });
    }, true);
}

function editarInvitado(p) {
  abrirDialogo(`<h2 id="dlgTitulo">${esc(p.nombre)}</h2>
    <form id="fPersona" style="margin-top:16px">
      <div class="campo"><label for="pNombre">Nombre</label><input id="pNombre" maxlength="60" value="${esc(p.nombre)}"></div>
      <div class="pie" style="margin-top:0"><button class="btn prim" type="submit" title="Guardar el nombre">Guardar nombre</button></div>
    </form>
    ${E.datos.principal || !p.es_organizador ? `<div class="menu" style="margin-top:20px;padding-top:16px;border-top:1px solid var(--linea)">
      ${E.datos.principal ? `<button class="btn sec" id="pOrg" title="${p.es_organizador ? `Quitar a ${esc(p.nombre)} la administración del convivio` : `Permitir que ${esc(p.nombre)} administre el convivio con su propio código`}">${ic('llave', 's')}${p.es_organizador ? 'Quitar como organizador' : 'Nombrar organizador'}</button>` : ''}
      <button class="btn sec" id="pCodigo" title="Si su código fue visto por otra persona, genere uno nuevo; el anterior queda anulado">${ic('recargar', 's')}Generar un código nuevo</button>
      <button class="btn peligro" id="pQuitar" title="Retirar a ${esc(p.nombre)} del convivio">${ic('basura', 's')}Retirar del convivio</button>
    </div>` : `<p class="ayuda" style="margin-top:20px;padding-top:16px;border-top:1px solid var(--linea)">${esc(p.nombre)} es organizador. Solo el organizador principal puede cambiar su código o retirarlo.</p>`}
    <div class="pie"><button class="btn fantasma" data-cerrar title="Cerrar">Cerrar</button></div>`,
    d => {
      d.querySelector('#fPersona').addEventListener('submit', async e => {
        e.preventDefault();
        await conCarga(d.querySelector('#fPersona button'), async () => {
          await rpc('admin_renombrar', {p_codigo: E.codigo, p_id: p.id, p_nombre: d.querySelector('#pNombre').value});
          d.close(); await refrescar(true); aviso('Nombre guardado');
        });
      });
      d.querySelector('#pOrg')?.addEventListener('click', async () => {
        d.close();
        const nombrar = !p.es_organizador;
        if (!await confirmar(nombrar
          ? {titulo: `¿Nombrar organizador a ${p.nombre}?`, texto: 'Con su mismo código podrá administrar todo el convivio: invitados, sorteo, alimentos, programa, rifa, votaciones, fotografías y ajustes. No podrá eliminar el convivio ni nombrar a otros organizadores.', si: 'Nombrar organizador'}
          : {titulo: `¿Quitar a ${p.nombre} como organizador?`, texto: 'Seguirá como invitado, pero ya no podrá administrar el convivio.', si: 'Quitar', tipo: 'acen'})) return;
        try { await rpc('admin_organizador', {p_codigo: E.codigo, p_id: p.id, p_valor: nombrar}); await refrescar(true); aviso(nombrar ? `${p.nombre} ya puede administrar el convivio con su código` : `${p.nombre} ya no es organizador`); } catch (e) { aviso(e.message, true); }
      });
      d.querySelector('#pCodigo')?.addEventListener('click', async () => {
        d.close();
        if (!await confirmar({titulo: `¿Código nuevo para ${p.nombre}?`, texto: `El código <span class="mono">${esc(p.codigo)}</span> quedará anulado. Deberá enviarle el nuevo.`, si: 'Generar código'})) return;
        try { const n = await rpc('admin_nuevo_codigo', {p_codigo: E.codigo, p_id: p.id}); await refrescar(true); aviso(`Nuevo código de ${p.nombre}: ${n}`); } catch (e) { aviso(e.message, true); }
      });
      d.querySelector('#pQuitar')?.addEventListener('click', async () => {
        d.close();
        const s = E.datos.convivio.sorteado && p.en_intercambio;
        if (!await confirmar({titulo: `¿Retirar a ${p.nombre}?`, texto: (s ? 'El sorteo ya se realizó: al retirarlo se anula y deberá realizarse de nuevo. ' : '') + 'Se eliminan su código, su lista de deseos, sus votos y sus inscripciones.', si: 'Retirar', tipo: 'acen'})) return;
        try { await rpc('admin_quitar', {p_codigo: E.codigo, p_id: p.id}); await refrescar(true); aviso(`${p.nombre} fue retirado del convivio`); } catch (e) { aviso(e.message, true); }
      });
    });
}

const filaId = el => el.closest('[data-id]')?.dataset.id;
const ACC = {
  'salir'() { LS.quitar('cv_sesion'); ir('inicio'); },
  async 'cambiar-vista'(b) {
    await conCarga(b, async () => {
      if (E.vista === 'organizador') { const d = await rpc('yo_ver', {p_codigo: E.codigo}); ir('invitado', {codigo: E.codigo, datos: d, tab: 'inicio'}); }
      else { const d = await rpc('admin_ver', {p_codigo: E.codigo}); ir('organizador', {codigo: E.codigo, datos: d, tab: 'invitados'}); }
    });
  },
  async 'desasignar'(b) {
    const l = E.datos.llevar.find(x => x.id === filaId(b)), q = l.quienes.find(x => x.id === b.dataset.inv);
    await conCarga(b, async () => { await rpc('admin_llevar_asignar', {p_codigo: E.codigo, p_id: l.id, p_invitado: q.id, p_valor: false}); await refrescar(true); aviso(`${q.nombre} ya no lleva «${l.que}»`); });
  },
  'ir-inicio'() { ir('inicio'); },
  'ir-crear'() { ir('crear'); },
  'reciente'(b) { entrarCon(b.dataset.cod, b); },
  'tab'(b) {
    E.tab = b.dataset.tab;
    if (E.tab !== 'programa') progBorrador = null;
    aplicarTema(E.datos.convivio.tema, E.datos.convivio.color);
    const ps = document.querySelectorAll('.pestana');
    if (![...ps].some(x => x.dataset.tab === E.tab)) { pintarPanel(); return; }
    ps.forEach(x => x.setAttribute('aria-selected', String(x.dataset.tab === E.tab)));
    pintarContenido();
    const c = $('#contenido'); c.classList.remove('cambia'); void c.offsetWidth; c.classList.add('cambia');
    if (b.classList.contains('pestana') === false) $('.pestanas')?.scrollIntoView({block: 'start', behavior: 'smooth'});
  },
  'tema'(b) { temaElegido = {tema: b.dataset.tema, color: null}; marcarTema(); },
  'copiar-clave'() { copiar(verCodigo(E.datos.convivio.codigo_admin), 'Código de organizador copiado'); },
  'copiar-todos'() { const c = E.datos.convivio; copiar(`${c.nombre}\n${enlaceBase()}\n\n` + E.datos.invitados.map(p => `${p.nombre}: ${p.codigo}`).join('\n'), 'Lista de códigos copiada'); },
  'copiar-inv'(b) { const p = E.datos.invitados.find(x => x.id === filaId(b)); copiar(mensajeWhats(p, E.datos.convivio), `Invitación de ${p.nombre} copiada`); },
  'editar-inv'(b) { editarInvitado(E.datos.invitados.find(x => x.id === filaId(b))); },
  async 'cuota'(b) { const p = E.datos.invitados.find(x => x.id === filaId(b)); await conCarga(b, async () => { await rpc('admin_marcar', {p_codigo: E.codigo, p_id: p.id, p_campo: 'cuota_pagada', p_valor: !p.cuota_pagada}); await refrescar(true); }); },
  async 'en-intercambio'(b) {
    const p = E.datos.invitados.find(x => x.id === filaId(b));
    if (E.datos.convivio.sorteado && !await confirmar({titulo: 'El sorteo ya se realizó', texto: `Si ${p.en_intercambio ? 'retira' : 'incorpora'} a ${esc(p.nombre)}, el sorteo se anula y deberá realizarse de nuevo.`, si: 'Continuar', tipo: 'acen'})) return;
    await conCarga(b, async () => { await rpc('admin_marcar', {p_codigo: E.codigo, p_id: p.id, p_campo: 'en_intercambio', p_valor: !p.en_intercambio}); await refrescar(true); });
  },
  async 'sortear'(b) {
    const otra = !!b.dataset.otra, n = E.datos.invitados.filter(i => i.en_intercambio).length;
    if (!await confirmar({titulo: otra ? '¿Realizar un nuevo sorteo?' : `¿Realizar el sorteo entre ${n} participantes?`, texto: otra ? 'El sorteo anterior se anula y las asignaciones pueden cambiar. También se reinicia el registro de regalos adquiridos. Se recomienda informar a los participantes.' : 'Cada participante recibirá a otra persona, nunca a sí mismo. Si después se incorpora o retira alguien, el sorteo deberá repetirse.', si: otra ? 'Realizar nuevo sorteo' : 'Realizar sorteo', tipo: 'acen'})) return;
    await conCarga(b, async () => { await rpc('admin_sortear', {p_codigo: E.codigo}); await refrescar(true); aviso('Sorteo realizado. Los participantes ya pueden consultar su asignación'); });
  },
  async 'deshacer-sorteo'(b) {
    if (!await confirmar({titulo: '¿Anular el sorteo?', texto: 'Las asignaciones dejarán de estar visibles hasta que se realice un nuevo sorteo.', si: 'Anular', tipo: 'acen'})) return;
    await conCarga(b, async () => { await rpc('admin_deshacer_sorteo', {p_codigo: E.codigo}); await refrescar(true); aviso('Sorteo anulado'); });
  },
  async 'llevar-quitar'(b) {
    const l = E.datos.llevar.find(x => x.id === filaId(b));
    if (l.quienes.length && !await confirmar({titulo: `¿Quitar «${l.que}»?`, texto: `${l.quienes.map(q => esc(q.nombre)).join(', ')} ya estaba inscrito. Su inscripción también se eliminará.`, si: 'Quitar', tipo: 'acen'})) return;
    await conCarga(b, async () => { await rpc('admin_llevar_quitar', {p_codigo: E.codigo, p_id: l.id}); await refrescar(true); });
  },
  'prog-agregar'() { leerProg(); progBorrador.push({hora: '', titulo: '', detalle: ''}); pintarContenido(); const f = document.querySelectorAll('.prog-fila'); f[f.length - 1]?.querySelector('.p-hora').focus(); },
  'prog-quitar'(b) { leerProg(); progBorrador.splice(+b.closest('.prog-fila').dataset.i, 1); pintarContenido(); },
  'prog-arriba'(b) { leerProg(); const i = +b.closest('.prog-fila').dataset.i; [progBorrador[i - 1], progBorrador[i]] = [progBorrador[i], progBorrador[i - 1]]; pintarContenido(); },
  'prog-abajo'(b) { leerProg(); const i = +b.closest('.prog-fila').dataset.i; [progBorrador[i + 1], progBorrador[i]] = [progBorrador[i], progBorrador[i + 1]]; pintarContenido(); },
  'prog-descartar'() { progBorrador = null; pintarContenido(); },
  async 'prog-guardar'(b) { leerProg(); await conCarga(b, async () => { await rpc('admin_programa', {p_codigo: E.codigo, p_items: progBorrador}); progBorrador = null; await refrescar(true); aviso('Programa guardado'); }); },
  async 'rifar'(b) {
    const p = E.datos.premios.find(x => x.id === filaId(b));
    if (p.ganador && !await confirmar({titulo: `¿Volver a rifar «${p.premio}»?`, texto: `Actualmente corresponde a ${esc(p.ganador)}. Se realizará un nuevo sorteo.`, si: 'Volver a rifar', tipo: 'acen'})) return;
    await conCarga(b, async () => {
      const g = await rpc('admin_rifar', {p_codigo: E.codigo, p_id: p.id});
      await refrescar(true);
      abrirDialogo(`<p class="eyebrow" style="justify-content:center;display:flex">${estrella()} ${esc(p.premio)}</p><h2 id="dlgTitulo" style="text-align:center;font-size:2.4rem;margin:14px 0 6px">${esc(g)}</h2><p class="texto" style="text-align:center">Ganador(a) de la rifa</p><div class="pie" style="justify-content:center"><button class="btn prim" data-cerrar>Aceptar</button></div>`);
    });
  },
  async 'premio-quitar'(b) { const p = E.datos.premios.find(x => x.id === filaId(b)); if (!await confirmar({titulo: `¿Quitar «${p.premio}»?`, texto: p.ganador ? `Ya había sido asignado a ${esc(p.ganador)}.` : 'Se retirará de la rifa.', si: 'Quitar', tipo: 'acen'})) return; await conCarga(b, async () => { await rpc('admin_premio_quitar', {p_codigo: E.codigo, p_id: p.id}); await refrescar(true); }); },
  async 'votacion-estado'(b) { const v = E.datos.votaciones.find(x => x.id === filaId(b)); await conCarga(b, async () => { await rpc('admin_votacion_estado', {p_codigo: E.codigo, p_id: v.id, p_estado: v.estado === 'abierta' ? 'cerrada' : 'abierta'}); await refrescar(true); aviso(v.estado === 'abierta' ? 'Votación cerrada; los resultados están publicados' : 'Votación reabierta'); }); },
  async 'votacion-quitar'(b) { const v = E.datos.votaciones.find(x => x.id === filaId(b)); if (!await confirmar({titulo: `¿Eliminar «${v.titulo}»?`, texto: `Se eliminarán sus ${v.total} votos.`, si: 'Eliminar', tipo: 'acen'})) return; await conCarga(b, async () => { await rpc('admin_votacion_quitar', {p_codigo: E.codigo, p_id: v.id}); await refrescar(true); }); },
  'ver-foto'(b) { verFoto(b.dataset.id); },
  async 'borrar-convivio'(b) {
    const c = E.datos.convivio;
    if (!await confirmar({titulo: `¿Eliminar «${c.nombre}»?`, texto: `Se eliminarán los ${E.datos.invitados.length} invitados con sus códigos y toda la información del convivio. <b>Esta acción no se puede deshacer.</b>`, si: 'Eliminar definitivamente', tipo: 'acen'})) return;
    await conCarga(b, async () => { await rpc('admin_borrar', {p_codigo: E.codigo}); quitarReciente(E.codigo); LS.quitar('cv_sesion'); ir('inicio'); aviso('Convivio eliminado'); });
  },
  async 'asistir'(b) {
    const v = b.dataset.v, yo = E.datos.yo;
    await conCarga(b, async () => { await rpc('yo_asistencia', {p_codigo: E.codigo, p_estado: v, p_acompanantes: yo.acompanantes}); await refrescar(true); aviso(v === 'si' ? 'Asistencia confirmada. Gracias' : v === 'no' ? 'Respuesta registrada. Gracias por informar' : 'Respuesta registrada como por confirmar'); });
  },
  async 'acomp'(b) {
    const yo = E.datos.yo, n = Math.max(0, Math.min(20, yo.acompanantes + +b.dataset.d));
    await conCarga(b, async () => { await rpc('yo_asistencia', {p_codigo: E.codigo, p_estado: yo.asistencia, p_acompanantes: n}); await refrescar(true); });
  },
  'caja'() {
    cajaAbierta = !cajaAbierta;
    if (cajaAbierta) {
      const esc_ = $('#escena');
      if (esc_) {
        cajaReciente = true;
        esc_.innerHTML = cajaHTML(true, E.datos.amigo.nombre);
        cajaReciente = false;
        requestAnimationFrame(() => requestAnimationFrame(() => { esc_.classList.add('abierta'); setTimeout(pintarContenido, 1150); }));
        return;
      }
    }
    pintarContenido();
  },
  async 'guardar-deseos'(b) {
    const ta = $('#yDeseos');
    await conCarga(b, async () => { await rpc('yo_deseos', {p_codigo: E.codigo, p_deseos: ta.value}); E.datos.yo.deseos = ta.value.trim(); deseosSucio = false; $('#yEstado').textContent = 'Guardada'; aviso('Lista de deseos guardada'); });
  },
  async 'llevar'(b) { const id = filaId(b); await conCarga(b, async () => { await rpc('yo_llevar', {p_codigo: E.codigo, p_id: id, p_valor: b.dataset.v === '1'}); await refrescar(true); aviso(b.dataset.v === '1' ? 'Inscripción registrada' : 'Inscripción cancelada'); }); },
  async 'votar'(b) { const vid = filaId(b); await conCarga(b, async () => { await rpc('yo_votar', {p_codigo: E.codigo, p_votacion: vid, p_elegido: b.dataset.el}); await refrescar(true); aviso('Voto registrado'); }); }
};

function leerProg() {
  const filas = [...document.querySelectorAll('.prog-fila')];
  if (!filas.length && progBorrador) return;
  progBorrador = filas.map(f => ({hora: f.querySelector('.p-hora').value, titulo: f.querySelector('.p-tit').value, detalle: f.querySelector('.p-det').value}));
}

const FORMS = {
  entrar(f, btn) { entrarCon($('#cod').value, btn); },
  async crear(f, btn) {
    const d = leerConvivio();
    if (!d.nombre) { aviso('Escriba el nombre del convivio', true); $('#cNombre').focus(); return; }
    await conCarga(btn, async () => {
      const r = await rpc('crear_convivio', {p_datos: d});
      const c = r.codigo_admin;
      LS.poner('cv_sesion', {codigo: c});
      guardarReciente({codigo: c, tipo: 'organizador', nombre: d.nombre});
      const datos = await rpc('admin_ver', {p_codigo: c});
      ir('organizador', {codigo: c, datos, tab: 'invitados'});
      abrirDialogo(`<p class="eyebrow">${estrella()} Convivio creado</p><h2 id="dlgTitulo" style="margin-top:10px">Su código de organizador</h2>
        <p class="texto">Con este código administra el convivio desde cualquier teléfono o computadora. Consérvelo y no lo comparta: permite modificar toda la información.</p>
        <div class="codigo-grande">${esc(verCodigo(c))}</div>
        <div class="pie"><button class="btn salida" id="dCopiar" title="Copiar el código de organizador">${ic('copiar', 's')}Copiar código</button><button class="btn prim" data-cerrar title="Continuar para agregar a los invitados">Agregar invitados</button></div>`,
        dd => dd.querySelector('#dCopiar').addEventListener('click', () => copiar(verCodigo(c), 'Código copiado')));
    });
  },
  async agregar(f, btn) {
    const ta = $('#nNombres');
    const nombres = ta.value.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
    if (!nombres.length) { ta.focus(); return; }
    const c = E.datos.convivio;
    if (c.sorteado && c.act.intercambio && !await confirmar({titulo: 'El sorteo ya se realizó', texto: 'Los nuevos invitados se incorporan al intercambio, por lo que el sorteo se anulará y deberá repetirse. Los códigos existentes no cambian.', si: 'Agregar y anular sorteo', tipo: 'acen'})) return;
    await conCarga(btn, async () => {
      const r = await rpc('admin_agregar', {p_codigo: E.codigo, p_nombres: nombres});
      let m = r.agregados === 1 ? 'Se agregó 1 invitado' : `Se agregaron ${r.agregados} invitados`;
      if (r.repetidos?.length) m += ` · ya registrado${r.repetidos.length > 1 ? 's' : ''}: ${r.repetidos.join(', ')}`;
      await refrescar(true);
      aviso(m, r.agregados === 0);
      $('#nNombres')?.focus();
    });
  },
  async llevar(f, btn) {
    const que = $('#lQue').value.trim();
    if (!que) { $('#lQue').focus(); return; }
    await conCarga(btn, async () => { await rpc('admin_llevar_agregar', {p_codigo: E.codigo, p_que: que, p_cuantos: parseInt($('#lCuantos').value) || 1}); await refrescar(true); $('#lQue')?.focus(); });
  },
  async 'llevar-mio'(f, btn) {
    const que = $('#lMio').value.trim();
    if (!que) { $('#lMio').focus(); return; }
    await conCarga(btn, async () => { await rpc('yo_llevar_nuevo', {p_codigo: E.codigo, p_que: que}); await refrescar(true); aviso('Artículo agregado a su cargo'); });
  },
  async premio(f, btn) {
    const p = $('#pPremio').value.trim();
    if (!p) { $('#pPremio').focus(); return; }
    await conCarga(btn, async () => { await rpc('admin_premio_agregar', {p_codigo: E.codigo, p_premio: p}); await refrescar(true); $('#pPremio')?.focus(); });
  },
  async votacion(f, btn) {
    const t = $('#vTitulo').value.trim();
    if (!t) { $('#vTitulo').focus(); return; }
    await conCarga(btn, async () => { await rpc('admin_votacion_agregar', {p_codigo: E.codigo, p_titulo: t}); await refrescar(true); aviso('Votación abierta'); });
  },
  async ajustes(f, btn) {
    const d = leerConvivio();
    if (!d.nombre) { aviso('Escriba el nombre del convivio', true); return; }
    await conCarga(btn, async () => {
      await rpc('admin_editar', {p_codigo: E.codigo, p_datos: d});
      guardarReciente({codigo: E.codigo, tipo: 'organizador', nombre: d.nombre});
      E.datos = await rpc('admin_ver', {p_codigo: E.codigo});
      aplicarTema(E.datos.convivio.tema, E.datos.convivio.color);
      pintarPanel();
      aviso('Cambios guardados');
    });
  }
};

app.addEventListener('click', e => {
  const b = e.target.closest('[data-acc]');
  if (!b || b.disabled) return;
  const f = ACC[b.dataset.acc];
  if (!f) return;
  if (b.tagName === 'A' && b.getAttribute('href') === '#') e.preventDefault();
  f(b);
});
$('#sesion').addEventListener('click', e => { const b = e.target.closest('[data-acc]'); if (b && ACC[b.dataset.acc]) ACC[b.dataset.acc](b); });
app.addEventListener('submit', e => {
  const f = e.target.closest('[data-form]');
  if (!f) return;
  e.preventDefault();
  FORMS[f.dataset.form]?.(f, e.submitter || f.querySelector('[type=submit]'));
});
app.addEventListener('keydown', e => {
  if (e.target.id === 'nNombres' && e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.target.closest('form').requestSubmit(); }
});
app.addEventListener('input', e => {
  const t = e.target;
  if (t.matches('textarea[data-crece]')) { t.style.height = '48px'; t.style.height = Math.min(t.scrollHeight + 2, 200) + 'px'; }
  const k = t.dataset.cambio;
  if (k === 'filtro') { filtroInv = t.value; const pos = t.selectionStart; pintarContenido(); const n = $('#fInv'); if (n) { n.focus(); n.setSelectionRange(pos, pos); } }
  if (k === 'deseos') { deseosSucio = t.value !== (E.datos.yo.deseos || ''); $('#yEstado').textContent = deseosSucio ? 'Cambios sin guardar' : ''; }
  if (k === 'prog') { leerProg(); const s = document.querySelector('.estado-guardado'); if (s) s.textContent = 'Cambios sin guardar'; const g = document.querySelector('[data-acc=prog-guardar]'); if (g) { g.disabled = false; g.title = 'Guardar el programa'; } }
  if (k === 'color') { temaElegido = {tema: 'propio', color: t.value}; marcarTema(); }
  if (t.id === 'cNombre') pintarVistaPrevia();
});
app.addEventListener('change', async e => {
  const t = e.target, k = t.dataset.cambio;
  if (k === 'act') {
    const acts = new Set([...document.querySelectorAll('input[name=act]:checked')].map(x => x.value));
    const p = $('#campoPresu'), c = $('#campoCuota');
    if (p) p.hidden = !acts.has('intercambio');
    if (c) c.hidden = !acts.has('cuota_act');
    pintarVistaPrevia();
  }
  if (k === 'participo') {
    t.disabled = true;
    try { await rpc('yo_intercambio', {p_codigo: E.codigo, p_valor: t.checked}); await refrescar(true); aviso(t.checked ? 'Participación registrada' : 'Se retiró del intercambio'); }
    catch (err) { t.checked = !t.checked; t.disabled = false; aviso(err.message, true); }
  }
  if (k === 'compre') {
    t.disabled = true;
    try { await rpc('yo_compre', {p_codigo: E.codigo, p_valor: t.checked}); await refrescar(true); aviso(t.checked ? 'Regalo registrado como adquirido' : 'Regalo marcado como pendiente'); }
    catch (err) { t.checked = !t.checked; t.disabled = false; aviso(err.message, true); }
  }
  if (k === 'fotos' && t.files?.length) { await subirFotos(t.files); t.value = ''; }
  if (k === 'asignar' && t.value) {
    const l = E.datos.llevar.find(x => x.id === filaId(t)), p = E.datos.invitados.find(x => x.id === t.value);
    t.disabled = true;
    try { await rpc('admin_llevar_asignar', {p_codigo: E.codigo, p_id: l.id, p_invitado: p.id, p_valor: true}); t.blur(); await refrescar(true); aviso(`«${l.que}» asignado a ${p.nombre}`); }
    catch (err) { t.disabled = false; t.value = ''; aviso(err.message, true); }
  }
});

$('#irInicio').addEventListener('click', e => { e.preventDefault(); LS.quitar('cv_sesion'); ir('inicio'); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && (E.vista === 'organizador' || E.vista === 'invitado')) refrescar(); });

(async function arrancar() {
  const m = location.hash.match(/c=([A-Za-z0-9-]+)/);
  if (m) history.replaceState(null, '', location.pathname + location.search);
  const s = LS.leer('cv_sesion', null);
  const cod = m ? m[1] : (s && s.codigo && configurado ? s.codigo : null);
  if (cod) { await entrarCon(cod, null); if (E.vista !== 'inicio' || $('.portada')) return; }
  ir('inicio');
})();
