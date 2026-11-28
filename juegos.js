const CARTAS = [
  ["El pino", "<path d=\"m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z\" /><path d=\"M12 22v-3\" />"],
  ["El regalo", "<rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\" /><path d=\"M12 8v13\" /><path d=\"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7\" /><path d=\"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5\" />"],
  ["La campana", "<path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\" /><path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\" />"],
  ["La estrella", "<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\" />"],
  ["El copo de nieve", "<line x1=\"2\" x2=\"22\" y1=\"12\" y2=\"12\" /><line x1=\"12\" x2=\"12\" y1=\"2\" y2=\"22\" /><path d=\"m20 16-4-4 4-4\" /><path d=\"m4 8 4 4-4 4\" /><path d=\"m16 4-4 4-4-4\" /><path d=\"m8 20 4-4 4 4\" />"],
  ["El bastón de dulce", "<path d=\"M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2Z\" /><path d=\"M17.75 7 15 2.1\" /><path d=\"M10.9 4.8 13 9\" /><path d=\"m7.9 9.7 2 4.4\" /><path d=\"M4.9 14.7 7 18.9\" />"],
  ["La galleta", "<path d=\"M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5\" /><path d=\"M8.5 8.5v.01\" /><path d=\"M16 15.5v.01\" /><path d=\"M12 12v.01\" /><path d=\"M11 17v.01\" /><path d=\"M7 14v.01\" />"],
  ["La iglesia", "<path d=\"M10 9h4\" /><path d=\"M12 7v5\" /><path d=\"M14 22v-4a2 2 0 0 0-4 0v4\" /><path d=\"M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22\" /><path d=\"m18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7\" />"],
  ["La vela", "<path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\" />"],
  ["El ponche", "<path d=\"M2 12h20\" /><path d=\"M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8\" /><path d=\"m4 8 16-4\" /><path d=\"m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8\" />"],
  ["El chocolate", "<path d=\"M10 2v2\" /><path d=\"M14 2v2\" /><path d=\"M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1\" /><path d=\"M6 2v2\" />"],
  ["El villancico", "<path d=\"M9 18V5l12-2v13\" /><circle cx=\"6\" cy=\"18\" r=\"3\" /><circle cx=\"18\" cy=\"16\" r=\"3\" />"],
  ["La corona", "<path d=\"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z\" /><path d=\"M5 21h14\" />"],
  ["El pastel", "<circle cx=\"9\" cy=\"7\" r=\"2\" /><path d=\"M7.2 7.9 3 11v9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9c0-2-3-6-7-8l-3.6 2.6\" /><path d=\"M16 13H3\" /><path d=\"M16 17H3\" />"],
  ["La fiesta", "<path d=\"M5.8 11.3 2 22l10.7-3.79\" /><path d=\"M4 3h.01\" /><path d=\"M22 8h.01\" /><path d=\"M15 2h.01\" /><path d=\"M22 20h.01\" /><path d=\"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10\" /><path d=\"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17\" /><path d=\"m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7\" /><path d=\"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z\" />"],
  ["El cohete", "<path d=\"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z\" /><path d=\"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z\" /><path d=\"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0\" /><path d=\"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5\" />"],
  ["La luna", "<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9\" /><path d=\"M20 3v4\" /><path d=\"M22 5h-4\" />"],
  ["El Niño", "<path d=\"M9 12h.01\" /><path d=\"M15 12h.01\" /><path d=\"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5\" /><path d=\"M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1\" />"],
  ["La carta", "<rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\" /><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\" />"],
  ["La casa", "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />"],
  ["La guitarra", "<path d=\"m11.9 12.1 4.514-4.514\" /><path d=\"M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z\" /><path d=\"m6 16 2 2\" /><path d=\"M8.2 9.9C8.7 8.8 9.8 8 11 8c2.8 0 5 2.2 5 5 0 1.2-.8 2.3-1.9 2.8l-.9.4A2 2 0 0 0 12 18a4 4 0 0 1-4 4c-3.3 0-6-2.7-6-6a4 4 0 0 1 4-4 2 2 0 0 0 1.8-1.2z\" /><circle cx=\"11.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\" />"],
  ["El tambor", "<path d=\"m2 2 8 8\" /><path d=\"m22 2-8 8\" /><ellipse cx=\"12\" cy=\"9\" rx=\"10\" ry=\"5\" /><path d=\"M7 13.4v7.9\" /><path d=\"M12 14v8\" /><path d=\"M17 13.4v7.9\" /><path d=\"M2 9v8a10 5 0 0 0 20 0V9\" />"],
  ["La manzana", "<path d=\"M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z\" /><path d=\"M10 2c1 .5 2 2 2 5\" />"],
  ["La naranja", "<path d=\"M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z\" /><path d=\"M19.65 15.66A8 8 0 0 1 8.35 4.34\" /><path d=\"m14 10-5.5 5.5\" /><path d=\"M14 17.85V10H6.15\" />"],
  ["El dulce", "<path d=\"m9.5 7.5-2 2a4.95 4.95 0 1 0 7 7l2-2a4.95 4.95 0 1 0-7-7Z\" /><path d=\"M14 6.5v10\" /><path d=\"M10 7.5v10\" /><path d=\"m16 7 1-5 1.37.68A3 3 0 0 0 19.7 3H21v1.3c0 .46.1.92.32 1.33L22 7l-5 1\" /><path d=\"m8 17-1 5-1.37-.68A3 3 0 0 0 4.3 21H3v-1.3a3 3 0 0 0-.32-1.33L2 17l5-1\" />"],
  ["El moño", "<path d=\"M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22\" /><path d=\"m12 18 2.57-3.5\" /><path d=\"M6.243 9.016a7 7 0 0 1 11.507-.009\" /><path d=\"M9.35 14.53 12 11.22\" /><path d=\"M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z\" />"],
  ["El corazón", "<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\" />"],
  ["El pajarito", "<path d=\"M16 7h.01\" /><path d=\"M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20\" /><path d=\"m20 7 2 .5-2 .5\" /><path d=\"M10 18v3\" /><path d=\"M14 17.75V21\" /><path d=\"M7 18a6 6 0 0 0 3.84-10.61\" />"],
  ["El gato", "<path d=\"M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z\" /><path d=\"M8 14v.5\" /><path d=\"M16 14v.5\" /><path d=\"M11.25 16.25h1.5L12 17l-.75-.75Z\" />"],
  ["El perro", "<path d=\"M11.25 16.25h1.5L12 17z\" /><path d=\"M16 14v.5\" /><path d=\"M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309\" /><path d=\"M8 14v.5\" /><path d=\"M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5\" />"],
  ["Las doce", "<circle cx=\"12\" cy=\"12\" r=\"10\" /><polyline points=\"12 6 12 12 16 14\" />"],
  ["El suéter", "<path d=\"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z\" />"],
  ["La montaña", "<path d=\"m8 3 4 8 5-5 5 15H2L8 3z\" /><path d=\"M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19\" />"],
  ["El foco", "<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\" /><path d=\"M9 18h6\" /><path d=\"M10 22h4\" />"],
  ["El brindis", "<path d=\"M8 22h8\" /><path d=\"M7 10h10\" /><path d=\"M12 15v7\" /><path d=\"M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z\" />"],
  ["La Nochebuena", "<path d=\"M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1\" /><circle cx=\"12\" cy=\"8\" r=\"2\" /><path d=\"M12 10v12\" /><path d=\"M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z\" /><path d=\"M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z\" />"]
];

const PALABRAS = [
  ['Tamal', 'Platillo envuelto en hoja de maxán que no falta en Nochebuena'],
  ['Ponche', 'Bebida caliente de frutas que se sirve en diciembre'],
  ['Posada', 'Recorrido con los peregrinos en los días previos a la Navidad'],
  ['Nacimiento', 'Representación del pesebre que se arma en casa'],
  ['Cohetillo', 'Se truena por docenas a la medianoche del veinticuatro'],
  ['Manzanilla', 'Fruto pequeño y amarillo que adorna el nacimiento y el ponche'],
  ['Estrella', 'Guio a los Reyes Magos hasta Belén'],
  ['Villancico', 'Canción tradicional de la temporada'],
  ['Nochebuena', 'Flor roja de diciembre y también la noche del veinticuatro'],
  ['Pino', 'Árbol que se adorna con esferas y luces'],
  ['Esfera', 'Adorno redondo que cuelga del árbol'],
  ['Regalo', 'Se entrega en el intercambio'],
  ['Belén', 'Ciudad donde nació Jesús'],
  ['Pastores', 'Recibieron en el campo el anuncio del nacimiento'],
  ['Ángel', 'Mensajero que anunció la buena nueva'],
  ['Campana', 'Suena para anunciar la Navidad'],
  ['Reno', 'Tira del trineo de Santa Claus'],
  ['Trineo', 'Vehículo en el que viaja Santa Claus'],
  ['Adviento', 'Las cuatro semanas que preceden a la Navidad'],
  ['Aguinaldo', 'Pago adicional que se recibe en diciembre'],
  ['Galleta', 'De jengibre, con forma de muñeco'],
  ['Guirnalda', 'Adorno largo que se cuelga en puertas y paredes'],
  ['Chocolate', 'Bebida caliente para una noche fría'],
  ['Calcetín', 'Se cuelga de la chimenea para recibir sorpresas'],
  ['Nieve', 'Cubre de blanco los paisajes navideños'],
  ['Vela', 'Se enciende cada domingo en la corona de Adviento'],
  ['Magos', 'Reyes que llevaron oro, incienso y mirra'],
  ['Piñata', 'Se quiebra con un palo durante las posadas'],
  ['Marimba', 'Instrumento nacional que ameniza las fiestas'],
  ['Convivio', 'Reunión de fin de año como esta'],
  ['Buñuelos', 'Postre frito que se baña en miel'],
  ['Muérdago', 'Planta bajo la cual, según la costumbre, se da un beso'],
  ['Pesebre', 'Lugar donde fue recostado el Niño Jesús'],
  ['Diciembre', 'Último mes del año'],
  ['Brindis', 'Se hace con las copas en alto a la medianoche'],
  ['Abrazo', 'Se da a todos a las doce en punto']
];

const JUEGOS = {
  loteria: {n: 'Lotería navideña', i: 'dados', d: 'Usted canta las cartas desde su teléfono y cada invitado juega con su propio tablero.'},
  sopa: {n: 'Sopa de letras', i: 'cuadricula', d: 'Ocho palabras navideñas escondidas. Gana quien las encuentre todas primero.', ayuda: 'Toque la primera letra y después la última de cada palabra. Pueden estar al derecho, al revés o en diagonal.'},
  crucigrama: {n: 'Crucigrama', i: 'rompecabezas', d: 'Pistas navideñas. Gana quien lo complete primero.', ayuda: 'Toque una pista o una casilla y escriba. Las palabras van sin tildes.'},
  descifra: {n: 'Descifra la palabra', i: 'revolver', d: 'Palabras con las letras revueltas. Gana quien las ordene todas primero.', ayuda: 'Ordene las letras y escriba la palabra. Las tildes no son necesarias.'}
};

function azar(semilla) {
  let a = semilla >>> 0;
  return () => {
    a = a + 0x6D2B79F5 >>> 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function barajar(arr, r) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const normal = s => String(s || '').toUpperCase().replace(/Ñ/g, '\u0001').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\u0001/g, 'Ñ').replace(/[^A-ZÑ]/g, '');

function armarDescifra(semilla) {
  const r = azar(semilla);
  return barajar(PALABRAS, r).slice(0, 8).map(([p, pista]) => {
    const w = normal(p);
    let m = w, k = 0;
    while (m === w && k++ < 30) m = barajar([...w], r).join('');
    return {w, m, pista};
  });
}

function armarSopa(semilla) {
  const r = azar(semilla), N = 10, total = 8;
  const dirs = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [1, -1]];
  const g = Array.from({length: N}, () => Array(N).fill(''));
  const palabras = [];
  for (const [p] of barajar(PALABRAS.filter(([p]) => normal(p).length >= 4 && normal(p).length <= N), r)) {
    if (palabras.length === total) break;
    const w = normal(p);
    for (let t = 0; t < 300; t++) {
      const [dy, dx] = dirs[Math.floor(r() * dirs.length)];
      const y0 = Math.floor(r() * N), x0 = Math.floor(r() * N);
      const y1 = y0 + dy * (w.length - 1), x1 = x0 + dx * (w.length - 1);
      if (y1 < 0 || y1 >= N || x1 < 0 || x1 >= N) continue;
      let ok = true;
      for (let i = 0; i < w.length && ok; i++) { const c = g[y0 + dy * i][x0 + dx * i]; if (c && c !== w[i]) ok = false; }
      if (!ok) continue;
      for (let i = 0; i < w.length; i++) g[y0 + dy * i][x0 + dx * i] = w[i];
      palabras.push({w, y0, x0, dy, dx});
      break;
    }
  }
  const L = 'AAABCDEEEFGHIIILLMNNOOOPRRSSTTUUVZ';
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!g[y][x]) g[y][x] = L[Math.floor(r() * L.length)];
  palabras.sort((a, b) => a.w.localeCompare(b.w));
  return {N, g, palabras};
}

function armarCrucigrama(semilla) {
  const r = azar(semilla), MAX = 12;
  const lista = barajar(PALABRAS, r).map(([p, pista]) => ({w: normal(p), pista})).filter(x => x.w.length <= 10);
  const letras = new Map(), usos = new Map(), puestas = [];
  const k = (y, x) => y + ',' + x;
  let minY = 0, maxY = 0, minX = 0, maxX = 0;
  const poner = (o, y, x, dir) => {
    for (let i = 0; i < o.w.length; i++) {
      const yy = y + dir * i, xx = x + (1 - dir) * i;
      letras.set(k(yy, xx), o.w[i]);
      usos.set(k(yy, xx), (usos.get(k(yy, xx)) || 0) | (1 << dir));
      minY = Math.min(minY, yy); maxY = Math.max(maxY, yy); minX = Math.min(minX, xx); maxX = Math.max(maxX, xx);
    }
    puestas.push({...o, y, x, dir});
  };
  const cabe = (w, y, x, dir) => {
    const dy = dir, dx = 1 - dir;
    if (letras.has(k(y - dy, x - dx)) || letras.has(k(y + dy * w.length, x + dx * w.length))) return -1;
    if (Math.max(maxY, y + dy * (w.length - 1)) - Math.min(minY, y) >= MAX || Math.max(maxX, x + dx * (w.length - 1)) - Math.min(minX, x) >= MAX) return -1;
    let cruces = 0;
    for (let i = 0; i < w.length; i++) {
      const yy = y + dy * i, xx = x + dx * i, c = letras.get(k(yy, xx));
      if (c) {
        if (c !== w[i] || (usos.get(k(yy, xx)) & (1 << dir))) return -1;
        cruces++;
      } else if (letras.has(k(yy + dx, xx + dy)) || letras.has(k(yy - dx, xx - dy))) return -1;
    }
    return cruces;
  };
  poner(lista[0], 0, 0, 0);
  for (const o of lista.slice(1)) {
    if (puestas.length === 9) break;
    const cands = [];
    for (const [kk, l] of letras) {
      const [cy, cx] = kk.split(',').map(Number);
      for (let i = 0; i < o.w.length; i++) {
        if (o.w[i] !== l) continue;
        for (const dir of [0, 1]) {
          const y = cy - dir * i, x = cx - (1 - dir) * i, c = cabe(o.w, y, x, dir);
          if (c > 0) cands.push([c + r() * .9, y, x, dir]);
        }
      }
    }
    if (!cands.length) continue;
    cands.sort((a, b) => b[0] - a[0]);
    poner(o, cands[0][1], cands[0][2], cands[0][3]);
  }
  const final = new Map();
  for (const [kk, l] of letras) { const [y, x] = kk.split(',').map(Number); final.set(k(y - minY, x - minX), l); }
  const palabras = puestas.map(p => ({...p, y: p.y - minY, x: p.x - minX}));
  const inicios = [...new Set(palabras.map(p => k(p.y, p.x)))].sort((a, b) => { const [ay, ax] = a.split(',').map(Number), [by, bx] = b.split(',').map(Number); return ay - by || ax - bx; });
  const numeros = new Map(inicios.map((s, i) => [s, i + 1]));
  palabras.forEach(p => { p.num = numeros.get(k(p.y, p.x)); });
  palabras.sort((a, b) => a.num - b.num);
  return {alto: maxY - minY + 1, ancho: maxX - minX + 1, letras: final, palabras, numeros};
}

const armados = {};
function armar(p) {
  if (!armados[p.id]) armados[p.id] = p.juego === 'sopa' ? armarSopa(p.semilla) : p.juego === 'crucigrama' ? armarCrucigrama(p.semilla) : p.juego === 'descifra' ? armarDescifra(p.semilla) : null;
  return armados[p.id];
}
let progJuego = LS.leer('cv_juego', null);
function prog(p) {
  if (!progJuego || progJuego.id !== p.id) { progJuego = {id: p.id}; LS.poner('cv_juego', progJuego); }
  return progJuego;
}
const guardarJuego = () => LS.poner('cv_juego', progJuego);

let cartaVista = null, sopaIni = null, cruciDir = 0, modoLoteria = 'linea', juegoPidiendo = false, juegoPendiente = false, enviandoJuego = false;

const duracion = s => s < 60 ? `${s} s` : `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')} s`;
const svgCarta = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${CARTAS[n - 1][1]}</svg>`;
const cartaHTML = (n, cls = '') => `<div class="carta ${cls}"><span class="num">${n}</span>${svgCarta(n)}<span class="nom">${CARTAS[n - 1][0]}</span></div>`;

function escribiendoJuego() {
  const a = document.activeElement;
  return !!(a && $('#contenido')?.contains(a) && a.tagName === 'INPUT');
}
function repintarJuego() {
  const a = document.activeElement, id = a && $('#contenido')?.contains(a) ? a.id : '';
  pintarContenido();
  if (id) document.getElementById(id)?.focus({preventScroll: true});
}
async function refrescarJuego(forzar = false) {
  if (!E.datos || !E.datos.convivio.act.juegos || juegoPidiendo) return;
  juegoPidiendo = true;
  try {
    const p = await rpc('juego_ver', {p_codigo: E.codigo});
    if (!E.datos) return;
    const antes = E.datos.partida || null;
    const cambio = JSON.stringify(antes) !== JSON.stringify(p || null);
    E.datos.partida = p;
    if (cambio) juegoPendiente = true;
    if (E.tab !== 'jugar' || !juegoPendiente) return;
    const otro = !antes || !p || antes.id !== p.id || antes.estado !== p.estado;
    if (escribiendoJuego() && !otro && !forzar) return;
    juegoPendiente = false;
    repintarJuego();
  } catch (e) {
    if (forzar) aviso(e.message, true);
  } finally {
    juegoPidiendo = false;
  }
}
async function juegoListo(p) {
  if (p.termine || enviandoJuego) return;
  enviandoJuego = true;
  try {
    const puesto = await rpc('yo_juego_listo', {p_codigo: E.codigo, p_partida: p.id});
    aviso(puesto === 1 ? 'Completado. Usted terminó en primer lugar.' : `Completado. Usted terminó en el lugar ${puesto}.`);
    await refrescarJuego(true);
  } catch (e) {
    aviso(e.message, true);
  } finally {
    enviandoJuego = false;
  }
}

function sopaHTML(p) {
  const s = armar(p), h = new Set(prog(p).h || []), on = new Set();
  s.palabras.filter(w => h.has(w.w)).forEach(w => { for (let i = 0; i < w.w.length; i++) on.add((w.y0 + w.dy * i) + ',' + (w.x0 + w.dx * i)); });
  const ini = sopaIni && sopaIni.id === p.id ? sopaIni : null;
  return `<div class="sopa" style="--n:${s.N}" role="grid" aria-label="Sopa de letras">${s.g.map((fila, y) => fila.map((l, x) => `<button class="letra ${on.has(y + ',' + x) ? 'hallada' : ''} ${ini && ini.y === y && ini.x === x ? 'inicio' : ''}" id="sp-${y}-${x}" data-acc="sopa" data-y="${y}" data-x="${x}" aria-label="${l}, fila ${y + 1}, columna ${x + 1}${ini && ini.y === y && ini.x === x ? ', seleccionada' : ''}">${l}</button>`).join('')).join('')}</div>
    <p class="cuenta-juego">${h.size} de ${s.palabras.length} palabras</p>
    <ul class="palabras-sopa">${s.palabras.map(w => `<li class="${h.has(w.w) ? 'hallada' : ''}">${h.has(w.w) ? ic('check', 's') : ''}${w.w}</li>`).join('')}</ul>`;
}

function palabraEn(s, y, x, dir) {
  return s.palabras.find(w => w.dir === dir && (dir === 0 ? w.y === y && x >= w.x && x < w.x + w.w.length : w.x === x && y >= w.y && y < w.y + w.w.length));
}
function cruciHTML(p) {
  const s = armar(p), l = prog(p).l || {};
  const celdas = [];
  for (let y = 0; y < s.alto; y++) for (let x = 0; x < s.ancho; x++) {
    const kk = y + ',' + x, n = s.numeros.get(kk);
    celdas.push(s.letras.has(kk)
      ? `<div class="cc">${n ? `<span class="n">${n}</span>` : ''}<input class="cl" id="cl-${y}-${x}" data-cambio="cruci" data-y="${y}" data-x="${x}" maxlength="1" value="${esc(l[kk] || '')}" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" aria-label="${n ? 'Número ' + n + ', ' : ''}fila ${y + 1}, columna ${x + 1}"></div>`
      : '<div class="cv"></div>');
  }
  const lista = dir => s.palabras.filter(w => w.dir === dir).map(w => `<li><button class="pista" data-acc="pista" data-num="${w.num}" data-dir="${dir}" title="Ir a la palabra ${w.num}"><b>${w.num}</b><span>${esc(w.pista)} <small>(${w.w.length})</small></span></button></li>`).join('');
  return `<div class="cruci-marco"><div class="cruci" style="--cols:${s.ancho}">${celdas.join('')}</div></div>
    <div class="acciones"><button class="btn sec chico" data-acc="cruci-revisar" title="Marcar las letras que no corresponden">${ic('check', 's')}Revisar</button></div>
    <div class="pistas"><div><h3>Horizontales</h3><ol>${lista(0)}</ol></div><div><h3>Verticales</h3><ol>${lista(1)}</ol></div></div>`;
}

function descifraHTML(p) {
  const s = armar(p), r = prog(p).r || [];
  return `<div class="descifras">${s.map((o, i) => {
    const ok = r[i] === o.w;
    return `<div class="descifra ${ok ? 'bien' : ''}"><div class="revueltas" aria-hidden="true">${[...o.m].map(c => `<span>${c}</span>`).join('')}</div>
      <p class="ayuda" style="margin:0">${esc(o.pista)}</p>
      <label class="sr" for="dz${i}">Palabra ${i + 1}: letras ${[...o.m].join(' ')}</label>
      <div class="respuesta-dz"><input id="dz${i}" data-cambio="descifra" data-i="${i}" value="${ok ? o.w : ''}" ${ok ? 'readonly' : ''} autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" placeholder="Su respuesta">${ok ? `<span class="ok-dz">${ic('check', 's')}</span>` : ''}</div></div>`;
  }).join('')}</div>`;
}

function puzzleHTML(p) {
  const j = JUEGOS[p.juego];
  const cab = `<div class="titulo-sec"><div><h2>${j.n}</h2>${p.estado === 'abierta' && !p.termine ? `<p>${j.ayuda}</p>` : ''}</div></div>`;
  if (p.termine) return `<section class="panel">${cab}<div class="estado-ok">${ic('check', 's')}Usted completó este juego.</div></section>`;
  if (p.estado !== 'abierta') return `<section class="panel">${cab}<div class="estado-falta">Este juego terminó.</div></section>`;
  return `<section class="panel">${cab}${p.juego === 'sopa' ? sopaHTML(p) : p.juego === 'crucigrama' ? cruciHTML(p) : descifraHTML(p)}</section>`;
}

function resultadosJuego(p) {
  const r = p.resultados || [];
  return `<section class="panel"><div class="titulo-sec"><div><h2>Resultados</h2><p>${JUEGOS[p.juego].n}. ${p.estado === 'abierta' ? 'Se actualizan solos conforme terminan los participantes.' : 'Juego terminado.'}</p></div></div>
    ${r.length ? `<ol class="podio">${r.map((x, i) => `<li class="${i === 0 ? 'primero' : ''}"><span class="puesto">${i === 0 ? estrella() : i + 1}</span><b>${esc(x.nombre)}</b><span class="tiempo">${duracion(x.segundos)}</span></li>`).join('')}</ol>` : '<p class="vacio">Aún nadie ha terminado.</p>'}</section>`;
}

function loteriaHTML(p, org) {
  const ult = p.cartas[p.cartas.length - 1], nueva = ult && ult !== cartaVista;
  cartaVista = ult || null;
  const linea = p.modo === 'llena' ? 'Gana quien complete todo su tablero.' : 'Gana quien complete una línea horizontal, vertical o diagonal.';
  const aviso_ = p.ganador ? `<div class="ganador-juego">${estrella()}<span>${p.gane ? 'Usted ganó esta lotería.' : `Ganó ${esc(p.ganador)}.`}</span></div>` : p.estado !== 'abierta' ? '<div class="estado-falta">Este juego terminó.</div>' : '';
  const anteriores = p.cartas.slice(0, -1).reverse();
  const cantor = `<section class="panel"><div class="titulo-sec"><div><h2>${org ? 'Cantar la lotería' : 'Lotería navideña'}</h2><p>${linea}</p></div></div>
    ${aviso_}
    <div class="cantor">${ult ? cartaHTML(ult, 'grande' + (nueva ? ' entra' : '')) : `<div class="carta grande vacia"><span class="nom">${org ? 'Presione «Cantar carta» para comenzar' : 'Esperando la primera carta'}</span></div>`}
      <div class="cantor-info" aria-live="polite"><p class="cuenta-juego">${ult ? `Salió: <b>${CARTAS[ult - 1][0]}</b><br>` : ''}${p.cartas.length} de 36 cartas</p>
        ${org && p.estado === 'abierta' ? `<button class="btn acen" data-acc="cantar" ${p.cartas.length >= 36 ? 'disabled title="Ya salieron todas las cartas"' : 'title="Sacar la siguiente carta al azar"'}>${ic('revolver')}Cantar carta</button>` : ''}
        ${anteriores.length ? `<div class="cantadas"><p class="ayuda" style="margin:0 0 6px">Salieron antes</p><div>${anteriores.slice(0, org ? 36 : 10).map(n => `<span>${CARTAS[n - 1][0]}</span>`).join('')}</div></div>` : ''}
      </div></div></section>`;
  if (!p.tablero) return cantor;
  const m = new Set(p.id === progJuego?.id ? progJuego.m || [] : []);
  const casillas = `<div class="tablero">${p.tablero.map(n => `<button class="casilla ${m.has(n) ? 'marcada' : ''}" id="lt-${n}" data-acc="marcar" data-n="${n}" aria-pressed="${m.has(n)}" aria-label="${CARTAS[n - 1][0]}" ${p.estado === 'abierta' ? '' : 'disabled'}>${cartaHTML(n)}<span class="frijol" aria-hidden="true"></span></button>`).join('')}</div>
    ${p.estado === 'abierta' ? `<div class="acciones"><button class="btn acen" data-acc="loteria" title="Avisar que completó ${p.modo === 'llena' ? 'su tablero' : 'una línea'}; el sistema lo verifica">${estrella()}Lotería</button></div>` : ''}`;
  if (org) return cantor + `<section class="panel"><div class="titulo-sec"><div><h2>Su tablero</h2><p>Toque cada carta que salga para marcarla.</p></div></div>${casillas}</section>`;
  return `<section class="panel"><div class="titulo-sec"><div><h2>Lotería navideña</h2><p>${linea} Toque cada carta que salga para marcarla.</p></div></div>
    ${aviso_}
    <div class="salio" aria-live="polite">${ult ? cartaHTML(ult, 'media' + (nueva ? ' entra' : '')) : '<div class="carta media vacia"><span class="nom">Sin cartas</span></div>'}
      <div><p class="ayuda" style="margin:0">${ult ? 'Salió' : 'Aún no sale ninguna carta'}</p>${ult ? `<p class="salio-nom">${CARTAS[ult - 1][0]}</p>` : ''}<p class="ayuda" style="margin:4px 0 0">${p.cartas.length} de 36 cartas</p></div></div>
    ${casillas}
    ${anteriores.length ? `<div class="cantadas" style="margin-top:20px"><p class="ayuda" style="margin:0 0 6px">Salieron antes</p><div>${anteriores.map(n => `<span>${CARTAS[n - 1][0]}</span>`).join('')}</div></div>` : ''}</section>`;
}

function panelJuegosOrg(p) {
  const abierta = p && p.estado === 'abierta';
  return `<section class="panel"><div class="titulo-sec"><div><h2>Juegos</h2><p>Al iniciar un juego, todos lo ven en su teléfono. Si hay otro en curso, termina.</p></div></div>
    <div class="juegos-lista">${Object.entries(JUEGOS).map(([k, j]) => {
      const actual = abierta && p.juego === k;
      return `<div class="juego ${actual ? 'actual' : ''}"><span class="ico">${ic(j.i)}</span><div><b>${j.n}</b>${actual ? ' <span class="insignia si">En curso</span>' : ''}<p class="ayuda" style="margin:2px 0 0">${j.d}</p></div>
        <div class="botones-juego">${k === 'loteria' && !actual ? `<label class="sr" for="jModo">Forma de ganar</label><select id="jModo" class="asignar" data-cambio="modo-loteria"><option value="linea" ${modoLoteria === 'linea' ? 'selected' : ''}>Gana con una línea</option><option value="llena" ${modoLoteria === 'llena' ? 'selected' : ''}>Gana con tabla llena</option></select>` : ''}
        ${actual ? `<button class="btn peligro chico" data-acc="juego-terminar" title="Terminar el juego en curso">Terminar</button>` : `<button class="btn ${abierta ? 'sec' : 'acen'} chico" data-acc="juego-iniciar" data-j="${k}" title="Iniciar ${j.n}">${ic(j.i, 's')}Iniciar</button>`}</div></div>`;
    }).join('')}</div></section>`;
}

function vistaJugar(org) {
  const p = E.datos.partida;
  if (!p) {
    const vacio = `<section class="panel"><p class="vacio">${org ? 'Elija un juego para comenzar. Los invitados lo verán en su teléfono.' : 'El organizador iniciará los juegos durante el convivio. Esta pantalla se actualiza sola.'}</p></section>`;
    return org ? `<div class="rejilla"><div class="columna">${vacio}</div><div class="columna">${panelJuegosOrg(p)}</div></div>` : vacio;
  }
  const lot = p.juego === 'loteria';
  const principal = lot ? loteriaHTML(p, org) : (p.juego_yo ? puzzleHTML(p) : `<section class="panel"><div class="titulo-sec"><div><h2>${JUEGOS[p.juego].n}</h2><p>${p.estado === 'abierta' ? 'En curso. Los invitados lo están resolviendo en su teléfono.' : 'Juego terminado.'}</p></div></div></section>`);
  if (org) return `<div class="rejilla"><div class="columna">${principal}</div><div class="columna">${lot ? '' : resultadosJuego(p)}${panelJuegosOrg(p)}</div></div>`;
  return `<div class="columna juego-inv">${principal}${lot ? '' : resultadosJuego(p)}</div>`;
}

VISTAS_ORG.jugar = () => vistaJugar(true);
VISTAS_INV.jugar = () => vistaJugar(false);

Object.assign(ACC, {
  async 'juego-iniciar'(b) {
    const j = b.dataset.j, p = E.datos.partida;
    if (p && p.estado === 'abierta' && !await confirmar({titulo: `¿Iniciar ${JUEGOS[j].n}?`, texto: `Se terminará «${JUEGOS[p.juego].n}», que está en curso.`, si: 'Iniciar', tipo: 'acen'})) return;
    await conCarga(b, async () => {
      await rpc('admin_juego_iniciar', {p_codigo: E.codigo, p_juego: j, p_modo: j === 'loteria' ? modoLoteria : 'linea'});
      await refrescarJuego(true);
      aviso(`${JUEGOS[j].n}: juego iniciado`);
    });
  },
  async 'juego-terminar'(b) {
    if (!await confirmar({titulo: '¿Terminar el juego?', texto: 'Los participantes ya no podrán completarlo. Los resultados se conservan.', si: 'Terminar', tipo: 'acen'})) return;
    await conCarga(b, async () => { await rpc('admin_juego_terminar', {p_codigo: E.codigo}); await refrescarJuego(true); });
  },
  async 'cantar'(b) {
    await conCarga(b, async () => { await rpc('admin_loteria_cantar', {p_codigo: E.codigo}); await refrescarJuego(true); });
  },
  async 'loteria'(b) {
    await conCarga(b, async () => {
      await rpc('yo_loteria', {p_codigo: E.codigo});
      aviso('Lotería verificada. Usted ganó.');
      await refrescarJuego(true);
    });
  },
  'marcar'(b) {
    const p = E.datos.partida;
    if (!p || p.estado !== 'abierta') return;
    const n = +b.dataset.n;
    if (!p.cartas.includes(n)) { aviso('Esa carta todavía no ha salido', true); return; }
    const pr = prog(p);
    pr.m = pr.m || [];
    const i = pr.m.indexOf(n);
    if (i < 0) pr.m.push(n); else pr.m.splice(i, 1);
    guardarJuego();
    b.classList.toggle('marcada', i < 0);
    b.setAttribute('aria-pressed', String(i < 0));
  },
  'sopa'(b) {
    const p = E.datos.partida;
    if (!p || p.estado !== 'abierta' || p.termine) return;
    const y = +b.dataset.y, x = +b.dataset.x;
    if (!sopaIni || sopaIni.id !== p.id) { sopaIni = {id: p.id, y, x}; repintarJuego(); return; }
    const {y: y0, x: x0} = sopaIni;
    sopaIni = null;
    if (y0 === y && x0 === x) { repintarJuego(); return; }
    if (y !== y0 && x !== x0 && Math.abs(y - y0) !== Math.abs(x - x0)) { aviso('Seleccione letras en línea recta', true); repintarJuego(); return; }
    const s = armar(p), dy = Math.sign(y - y0), dx = Math.sign(x - x0), n = Math.max(Math.abs(y - y0), Math.abs(x - x0)) + 1;
    let t = '';
    for (let i = 0; i < n; i++) t += s.g[y0 + dy * i][x0 + dx * i];
    const pr = prog(p);
    pr.h = pr.h || [];
    const w = s.palabras.find(o => !pr.h.includes(o.w) && (o.w === t || o.w === [...t].reverse().join('')));
    if (w) { pr.h.push(w.w); guardarJuego(); }
    else aviso('Esa selección no corresponde a ninguna palabra pendiente', true);
    repintarJuego();
    if (w && s.palabras.every(o => pr.h.includes(o.w))) juegoListo(p);
  },
  'pista'(b) {
    const p = E.datos.partida, s = armar(p), dir = +b.dataset.dir;
    const w = s.palabras.find(o => o.num === +b.dataset.num && o.dir === dir);
    if (!w) return;
    cruciDir = dir;
    const l = prog(p).l || {};
    let i = 0;
    while (i < w.w.length - 1 && l[(w.y + dir * i) + ',' + (w.x + (1 - dir) * i)]) i++;
    document.getElementById(`cl-${w.y + dir * i}-${w.x + (1 - dir) * i}`)?.focus();
  },
  'cruci-revisar'() {
    const p = E.datos.partida, s = armar(p), l = prog(p).l || {};
    let mal = 0;
    document.querySelectorAll('.cl').forEach(e => {
      const kk = e.dataset.y + ',' + e.dataset.x, v = l[kk];
      const error = !!v && v !== s.letras.get(kk);
      e.classList.toggle('mal', error);
      if (error) mal++;
    });
    aviso(mal ? `${mal} ${mal === 1 ? 'letra no corresponde' : 'letras no corresponden'}` : 'Lo escrito hasta ahora es correcto', !!mal);
  }
});

function marcarActiva() {
  const a = document.activeElement;
  if (!a || !a.classList.contains('cl')) return;
  const s = armar(E.datos.partida), y = +a.dataset.y, x = +a.dataset.x;
  if (!palabraEn(s, y, x, cruciDir)) cruciDir = 1 - cruciDir;
  const w = palabraEn(s, y, x, cruciDir);
  document.querySelectorAll('.cl.activa').forEach(e => e.classList.remove('activa'));
  if (w) for (let i = 0; i < w.w.length; i++) document.getElementById(`cl-${w.y + w.dir * i}-${w.x + (1 - w.dir) * i}`)?.classList.add('activa');
}
function ponerLetra(t, v) {
  const p = E.datos.partida, pr = prog(p);
  pr.l = pr.l || {};
  t.value = v;
  pr.l[t.dataset.y + ',' + t.dataset.x] = v;
  t.classList.remove('mal');
  guardarJuego();
}
app.addEventListener('focusin', e => {
  if (e.target.classList?.contains('cl')) { marcarActiva(); e.target.select(); }
});
app.addEventListener('input', e => {
  const t = e.target, k = t.dataset.cambio;
  if (k === 'cruci') {
    const p = E.datos.partida, s = armar(p);
    const v = normal(t.value).slice(-1);
    ponerLetra(t, v);
    if (v) {
      const y = +t.dataset.y, x = +t.dataset.x, w = palabraEn(s, y, x, cruciDir) || palabraEn(s, y, x, 1 - cruciDir);
      if (w) { cruciDir = w.dir; document.getElementById(`cl-${y + w.dir}-${x + 1 - w.dir}`)?.focus(); }
    }
    const l = prog(p).l;
    if ([...s.letras].every(([kk, c]) => l[kk] === c)) { t.blur(); juegoListo(p); }
  }
  if (k === 'descifra') {
    const p = E.datos.partida, s = armar(p), i = +t.dataset.i;
    if (normal(t.value) !== s[i].w) return;
    const pr = prog(p);
    pr.r = pr.r || [];
    pr.r[i] = s[i].w;
    guardarJuego();
    if (s.every((o, j) => pr.r[j] === o.w)) { t.blur(); repintarJuego(); juegoListo(p); return; }
    t.blur();
    repintarJuego();
    const sig = [...document.querySelectorAll('.descifra:not(.bien) input')].find(x => +x.dataset.i > i) || document.querySelector('.descifra:not(.bien) input');
    sig?.focus();
  }
});
app.addEventListener('change', e => {
  if (e.target.dataset.cambio === 'modo-loteria') modoLoteria = e.target.value === 'llena' ? 'llena' : 'linea';
});
app.addEventListener('keydown', e => {
  const t = e.target;
  if (!t.classList || !t.classList.contains('cl')) return;
  const y = +t.dataset.y, x = +t.dataset.x, ir_ = (dy, dx) => document.getElementById(`cl-${y + dy}-${x + dx}`);
  if (e.key === 'Backspace' && !t.value) {
    const prev = cruciDir ? ir_(-1, 0) : ir_(0, -1);
    if (prev) { e.preventDefault(); prev.focus(); ponerLetra(prev, ''); }
    return;
  }
  const flechas = {ArrowRight: [0, 1, 0], ArrowLeft: [0, -1, 0], ArrowDown: [1, 0, 1], ArrowUp: [-1, 0, 1]}[e.key];
  if (flechas) {
    e.preventDefault();
    cruciDir = flechas[2];
    let yy = y + flechas[0], xx = x + flechas[1], n = 0, d;
    while (!(d = document.getElementById(`cl-${yy}-${xx}`)) && n++ < 14) { yy += flechas[0]; xx += flechas[1]; }
    d?.focus();
  }
});
