/* =========================
   NAVEGACIÓN PRINCIPAL
========================= */
function showRegister(){
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("registerScreen").style.display = "flex";
    document.getElementById("dashboardScreen").style.display = "none";
}

function goHome(){
    document.getElementById("homeScreen").style.display = "flex";
    document.getElementById("registerScreen").style.display = "none";
    document.getElementById("dashboardScreen").style.display = "none";
}

function triggerDefaultZone() {
    filterZone('estructuras', document.getElementById('btn-estructuras'));
}

/* =========================
   LÓGICA DEL REGISTRO
========================= */
const form = document.getElementById("registerForm");
if(form) {
    form.addEventListener("submit", function(e){
        e.preventDefault();
        let nombre = document.getElementById("nombre").value;
        let apellidos = document.getElementById("apellidos") ? document.getElementById("apellidos").value : "";
        localStorage.setItem("clienteConstruCosto", (nombre + " " + apellidos).trim());
        
        document.getElementById("successText").innerHTML = "Ingeniero(a) <b>" + nombre + "</b><br>Su cuenta corporativa ha sido validada.";
        openModal("successModal");
        form.reset();
    });
}

/* =========================
   CONTROLADOR DEL DASHBOARD
========================= */
function switchDashView(viewName) {
    const views = document.querySelectorAll('.dash-view');
    views.forEach(v => v.classList.remove('active-view'));
    
    if (viewName === 'planificacion') document.getElementById('view-planificacion').classList.add('active-view');
    else if (viewName === 'carrito') {
        document.getElementById('view-carrito').classList.add('active-view');
        if(typeof actualizarInterfazCarrito === 'function') actualizarInterfazCarrito();
    } 
    else if (viewName === 'nosotros') document.getElementById('view-nosotros').classList.add('active-view');
    else if (viewName === 'organizador') document.getElementById('view-organizador').classList.add('active-view');
}

function filterZone(zoneName, btnElement) {
    const sideButtons = document.querySelectorAll('.dash-sidebar .sidebar-btn');
    sideButtons.forEach(b => b.classList.remove('active-btn'));
    if(btnElement) btnElement.classList.add('active-btn');
    
    switchDashView('planificacion');
    
    const allCards = document.querySelectorAll('.grid-card');
    allCards.forEach(card => {
        if(card.classList.contains('zone-' + zoneName)) card.style.display = 'flex';
        else card.style.display = 'none';
    });
}

/* =========================
   MODALES AUTOMATIZADOS CON IMÁGENES DE PRODUCTOS
========================= */
function openModal(id) { 
    document.getElementById("dashboardScreen").style.display = "flex";
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("registerScreen").style.display = "none";
    document.getElementById(id).style.display = 'flex'; 
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

const dataModales = [
    // ESTRUCTURAS
    { id: 'modEst1', title: 'Cementos Pacasmayo', items: ['Cemento Extraforte', 'Cemento Antisalitre', 'Cemento MS'], imgs: ['img/cemento_extraforte.jpg', 'img/cemento_antisalitre.jpg', 'img/cemento_ms.png'] },
    { id: 'modEst2', title: 'Ladrillos Lark S.A.', items: ['King Kong 18 huecos', 'Ladrillo Techo 15x30', 'Pandereta a Rayas'], imgs: ['img/kingkong_18huecos.png', 'img/ladrillo_15x30.png', 'img/ladrillo_pandereta.jpg'] },
    { id: 'modEst3', title: 'Aceros Arequipa', items: ['Fierro Corrugado 1/2"', 'Fierro Corrugado 5/8"', 'Alambre de Amarre N° 8'], imgs: ['img/fierro_corrugado.jpg', 'img/fierro_corrugado5-8.jpg', 'img/alambre_amarre_8.jpg'] },
    { id: 'modEst4', title: 'Maderas y Encofrados', items: ['Tablón Madera Tornillo', 'Triplay Fenólico 18mm', 'Puntal Metálico Regulable'], imgs: ['img/tablon_madera.jpg', 'img/triplay_fenolico.jpg', 'img/puntal_metalico.jpeg'] },
    { id: 'modEst5', title: 'Concretera Sur', items: ['Concreto 210 kg/cm2 (m3)', 'Alquiler Bomba Concreto', 'Aditivo Acelerante'], imgs: ['img/concreto_210.png', 'img/bomba_de_concreto.jpg', 'img/aditivo_acelerante.png'] },
    { id: 'modEst6', title: 'Agregados San Juan', items: ['Arena Gruesa (m3)', 'Piedra Chancada 1/2" (m3)', 'Hormigón de Cantera (m3)'], imgs: ['img/arena_gruesam3.png', 'img/piedra_chancada.jpg', 'img/hormigon_cantera.jpg'] },
    
    // ACABADOS
    { id: 'modAca1', title: 'Cerámicos Celima', items: ['Cerámico 40x40 Tránsito Intenso', 'Pegamento Blanco Flexible', 'Fragua Impermeable (1kg)'], imgs: ['img/ceramica_4040.jpg', 'img/pegamento_blanco.jpg', 'img/fragua.jpg'] },
    { id: 'modAca2', title: 'Cassinelli Premium', items: ['Porcelanato Español 60x60', 'Zócalo de Madera Cedro', 'Pepelma para Piscina (m2)'], imgs: ['img/porcelanato_español6060.png', 'img/zocalo_madera.jpg', 'img/pepelma_piscina.jpg'] },
    { id: 'modAca3', title: 'Pinturas CPP', items: ['Balde Pintura Látex Premium', 'Galón Esmalte Sintético', 'Pasta Mural (3.5 GL)'], imgs: ['img/balde_pintura.jpg', 'img/galon_esmalte.jpg', 'img/pasta_fina_3.5GL.png'] },
    { id: 'modAca4', title: 'Vidriería Miyasato', items: ['Mampara Cristal Templado 8mm', 'Espejo Biselado 4mm', 'Ventana Sistema Nova 6mm'], imgs: ['img/mampara_vidrio_templado.jpg', 'img/espejo_biselado.jpg', 'img/ventana_sistema_nova.jpg'] },
    { id: 'modAca5', title: 'Decor Center Pisos', items: ['Piso Laminado Alemán (m2)', 'Cuarzo Estelar Cocina (ml)', 'Grifería Dorada Premium'], imgs: ['img/piso_laminado_aleman.jpg', 'img/cuarzo_estelar_cocina.jpg', 'img/griferia_dorada_premium.jpg'] },
    { id: 'modAca6', title: 'Drywall Pro', items: ['Plancha Yeso Standard 1/2"', 'Parante Metálico 65mm', 'Masilla para Drywall (Caja)'], imgs: ['img/plancha_yeso.jpg', 'img/parante_metalico.jpg', 'img/masilla_para_dryawall.jpg'] },

    // AGUA
    { id: 'modAgu1', title: 'Pavco Wavin', items: ['Tubo PVC 2" Agua Fria', 'Pegamento Oatey PVC (1/4 G)', 'Codo 90° PVC 2"'], imgs: ['img/tubo_pvc2.png', 'img/pegamento_oatey_pvc.jpg', 'img/codo90_pvc.png'] },
    { id: 'modAgu2', title: 'Tanques Rotoplas', items: ['Tanque Elevado 1100L', 'Cisterna Subterránea 2500L', 'Biodigestor 1300L'], imgs: ['img/tanque_elevado1100.jpg', 'img/cisterna_subterranea2500.jpg', 'img/biodigestor1300.png'] },
    { id: 'modAgu3', title: 'AquaTec Global', items: ['Filtro Pro-Serie Sand', 'Motobomba High-Flow 1.5 HP', 'Skimmer de Superficie PVC'], imgs: ['img/filtro_pro_serie_sand.png', 'img/motobomba.jpg', 'img/skimmer_superficie_pvc.jpg'] },
    { id: 'modAgu4', title: 'Bombas Hidrostal', items: ['Electrobomba Periférica 1HP', 'Bomba Sumergible Inox', 'Tablero Alternador de Bombas'], imgs: ['img/electrobomba_periferica.png', 'img/bomba_sumergible_inox.png', 'img/tablero_alternador.jpg'] },
    { id: 'modAgu5', title: 'Griferías Vainsa', items: ['Grifería Monocomando Acero', 'Mezcladora Ducha Cromo', 'Válvula Angular 1/2"'], imgs: ['img/griferia_monocomando.jpg', 'img/mezcladora_ducha_cromo.png', 'img/valvula_angular.jpg'] },
    { id: 'modAgu6', title: 'Sanitarios Trebol', items: ['Inodoro One Piece Dual Flush', 'Lavatorio de Pedestal Blanco', 'Urinario Blanco Institucional'], imgs: ['img/inodoro_one_piece.png', 'img/lavatorio_pedestal.jpg', 'img/Urinario_institucional.jpg'] },

    // SOCIAL
    { id: 'modSoc1', title: 'Decks WPC Premium', items: ['Piso Deck WPC Antideslizante', 'Bastidor WPC para Deck', 'Clip de Fijación Acero'], imgs: ['img/piso_deck_wpc.jpg', 'img/bastidor_deck_wpc.png', 'img/clip_fijacion.jpg'] },
    { id: 'modSoc2', title: 'Mr. Grill Parrillas', items: ['Parrilla Acero Inox a Medida', 'Caja China Premium Ahumador', 'Ladrillo Refractario (Millar)'], imgs: ['img/parrilla_acero.jpg', 'img/caja_china_ahumador.jpg', 'img/ladrillo_refractario.jpg'] },
    { id: 'modSoc3', title: 'Rattan Muebles', items: ['Set Muebles Terraza 4 piezas', 'Sombrilla Gigante Exterior 3m', 'Tumbona Ergonómica Piscina'], imgs: ['img/set_muebles_terrazas.png', 'img/sombrilla_gigante.jpg', 'img/tumbona_ergonomica.jpg'] },
    { id: 'modSoc4', title: 'Ilumina LED Exterior', items: ['Estaca LED Solar para Jardín', 'Tira LED Neón Exterior (5m)', 'Aplique Pared Bidireccional'], imgs: ['img/estaca_led_solar.jpg', 'img/tira_led_neon.jpg', 'img/aplique_pared_bidireccional.jpg'] },
    { id: 'modSoc5', title: 'Toldos y Sombras', items: ['Toldo Retráctil Motorizado 3x2m', 'Cobertura Policarbonato Alveolar', 'Malla Raschel 90% (Rollo 100m)'], imgs: ['img/toldo_retractil.jpg', 'img/cobertura_policarbonato.jpg', 'img/malla_raschel90.png'] },
    { id: 'modSoc6', title: 'Piscinas Prefabricadas', items: ['Piscina Fibra Vidrio 4x2m', 'Borde Atérmico Antideslizante', 'Escalera Acero Inoxidable 3p'], imgs: ['img/piscina_fibra_vidrio.jpg', 'img/borde_atermico_antideslizante.png', 'img/escalera_acero.jpg'] },

    // FACHADA
    { id: 'modFac1', title: 'Revestimientos Laja', items: ['Piedra Laja Arequipeña (m2)', 'Fachaleta Rústica Tipo Ladrillo', 'Sellador Protector de Piedra'], imgs: ['img/piedra_laja_arequipeña.jpg', 'img/fachaleta_rustica.jpg', 'img/sellador_protector_piedra.jpg'] },
    { id: 'modFac2', title: 'Puertas Seccionales', items: ['Panel Metálico Garaje (m2)', 'Motor Levadizo 1/2HP', 'Control Remoto Frecuencia'], imgs: ['img/panel_metalico.png', 'img/motor_levadizo_bv.png', 'img/control_remoto_frecuencia.png'] },
    { id: 'modFac3', title: 'Pintura Exteriores', items: ['Pintura Vencedor Fachada (Balde)', 'Imprimante Acrílico Exterior', 'Rodillo Antigota Microfibra'], imgs: ['img/pintura_vencedor.png', 'img/imprimante_acrilico.png', 'img/rodillo_antigota_microfibra.png'] },
    { id: 'modFac4', title: 'Aluminios Fachada', items: ['Celosía de Aluminio Maderado', 'Panel Alucobond Exterior (m2)', 'Silicona Estructural Neutra'], imgs: ['img/celosia_aluminio_maderado.jpg', 'img/panel_alucobond.jpg', 'img/silicona_estructural_neutra.jpg'] },
    { id: 'modFac5', title: 'Vidrios Exteriores', items: ['Cristal Reflejante Control Solar', 'Araña de Sujeción Acero Inox', 'Baranda de Cristal Templado (ml)'], imgs: ['img/cristal_reflejante.jpg', 'img/araña_sujecion_acero.jpg', 'img/baranda_cristal_templado.jpg'] },
    { id: 'modFac6', title: 'Iluminación Fachada', items: ['Proyector LED 50W Exterior', 'Farol Clásico Aluminio Fundido', 'Sensor de Movimiento 360°'], imgs: ['img/proyector_led_50w.jpg', 'img/farol_clasico.jpg', 'img/sensor_de_movimiento360.jpg'] },

    // INTERIORES
    { id: 'modInt1', title: 'Iluminación Interior', items: ['Panel LED Empotrable 18W', 'Lámpara Colgante Vintage', 'Dicroico LED Cálido (Caja x10)'], imgs: ['img/panel_led_18w.jpg', 'img/lampara_colgante_vintage.png', 'img/dicroico_led.png'] },
    { id: 'modInt2', title: 'Puertas Contraplacadas', items: ['Puerta MDF Blanca Ranurada', 'Chapa Pomo Acero Inoxidable', 'Bisagra Aluminio (Par)'], imgs: ['img/puerta_mdf.png', 'img/chapa_pomo_acero.png', 'img/bisagra_aluminio.png'] },
    { id: 'modInt3', title: 'Melamina Pelíkano', items: ['Plancha Melamina 18mm', 'Tapacanto PVC Grueso (Rollo)', 'Corredera Telescópica 45cm'], imgs: ['img/plancha_melamina.png', 'img/tapacanto_grueso.png', 'img/corredera_telescopica.png'] },
    { id: 'modInt4', title: 'Cortinas Hunter Douglas', items: ['Cortina Roller SunScreen', 'Cortina Blackout Motorizada', 'Motor Tubular para Persiana'], imgs: ['img/cortina_roller.jpg', 'img/cortina_blackout.jpg', 'img/motor_tubular.jpg'] },
    { id: 'modInt5', title: 'Alfombras y Tapices', items: ['Alfombra Alto Tránsito (m2)', 'Papel Tapiz Texturizado (Rollo)', 'Pegamento para Tapiz Interior'], imgs: ['img/alfombrea_alto_transito.jpg', 'img/papel_tapiz_texturizado.jpg', 'img/pegamento_tapiz.jpg'] },
    { id: 'modInt6', title: 'Climatización Total', items: ['Aire Acondicionado 12K BTU', 'Extractor de Aire Baño', 'Termostato Digital Smart'], imgs: ['img/aire_acondicionado.png', 'img/extractor_aire_baño.jpg', 'img/termostato_digital.jpg'] },

    // PROFESIONALES Y MANO DE OBRA
    { id: 'modProf1', title: 'Maestros de Obra y Albañilería', items: ['Maestro de Obra Calificado (x Día)', 'Cuadrilla Encofrado y Vaciado (x Día)', 'Operario Albañil Asentado (x Día)'], imgs: ['img/maestro_obra.jpg', 'img/cuadrilla_encofrado.jpg', 'img/operario_albanil.jpg'] },
    { id: 'modProf2', title: 'Ingenieros Residentes y PMO', items: ['Supervisión de Obra Colegiado (x Visita)', 'Elaboración de Metrados y Presupuesto', 'Firma Técnica Licencia Construcción'], imgs: ['img/supervision_obra.jpg', 'img/elaboracion_metrados.jpg', 'img/firma_tecnica.jpg'] },
    { id: 'modProf3', title: 'Especialistas Sanitarios y Eléctricos', items: ['Técnico Electricista Certificado (x Día)', 'Gasfitero Sanitario Especializado (x Día)', 'Pozo a Tierra: Protocolo y Medición'], imgs: ['img/tecnico_electricista.jpg', 'img/gasfitero_sanitario.jpg', 'img/pozo_tierra.jpg'] }
];

/* ==============================================================
   TABLA DE PRECIOS REALISTAS DEL MERCADO PERUANO (EN SOLES S/.)
============================================================== */
const productPrices = {
    // ESTRUCTURAS
    'Cemento Extraforte': 28.50,
    'Cemento Antisalitre': 31.50,
    'Cemento MS': 33.50,
    'King Kong 18 huecos': 620.00,
    'Ladrillo Techo 15x30': 2350.00,
    'Pandereta a Rayas': 480.00,
    'Fierro Corrugado 1/2"': 36.50,
    'Fierro Corrugado 5/8"': 58.00,
    'Alambre de Amarre N° 8': 6.50,
    'Tablón Madera Tornillo': 45.00,
    'Triplay Fenólico 18mm': 115.00,
    'Puntal Metálico Regulable': 55.00,
    'Concreto 210 kg/cm2 (m3)': 320.00,
    'Alquiler Bomba Concreto': 1200.00,
    'Aditivo Acelerante': 85.00,
    'Arena Gruesa (m3)': 45.00,
    'Piedra Chancada 1/2" (m3)': 65.00,
    'Hormigón de Cantera (m3)': 38.00,

    // ACABADOS
    'Cerámico 40x40 Tránsito Intenso': 28.90,
    'Pegamento Blanco Flexible': 38.50,
    'Fragua Impermeable (1kg)': 8.50,
    'Porcelanato Español 60x60': 68.00,
    'Zócalo de Madera Cedro': 24.00,
    'Pepelma para Piscina (m2)': 85.00,
    'Balde Pintura Látex Premium': 185.00,
    'Galón Esmalte Sintético': 46.00,
    'Pasta Mural (3.5 GL)': 65.00,
    'Mampara Cristal Templado 8mm': 220.00,
    'Espejo Biselado 4mm': 145.00,
    'Ventana Sistema Nova 6mm': 160.00,
    'Piso Laminado Alemán (m2)': 42.00,
    'Cuarzo Estelar Cocina (ml)': 380.00,
    'Grifería Dorada Premium': 320.00,
    'Plancha Yeso Standard 1/2"': 29.50,
    'Parante Metálico 65mm': 14.50,
    'Masilla para Drywall (Caja)': 52.00,

    // AGUA E INSTALACIONES
    'Tubo PVC 2" Agua Fria': 24.50,
    'Pegamento Oatey PVC (1/4 G)': 38.00,
    'Codo 90° PVC 2"': 4.50,
    'Tanque Elevado 1100L': 540.00,
    'Cisterna Subterránea 2500L': 1350.00,
    'Biodigestor 1300L': 1650.00,
    'Filtro Pro-Serie Sand': 890.00,
    'Motobomba High-Flow 1.5 HP': 1450.00,
    'Skimmer de Superficie PVC': 180.00,
    'Electrobomba Periférica 1HP': 280.00,
    'Bomba Sumergible Inox': 650.00,
    'Tablero Alternador de Bombas': 450.00,
    'Grifería Monocomando Acero': 165.00,
    'Mezcladora Ducha Cromo': 210.00,
    'Válvula Angular 1/2"': 18.50,
    'Inodoro One Piece Dual Flush': 480.00,
    'Lavatorio de Pedestal Blanco': 135.00,
    'Urinario Blanco Institucional': 220.00,

    // SOCIAL
    'Piso Deck WPC Antideslizante': 135.00,
    'Bastidor WPC para Deck': 32.00,
    'Clip de Fijación Acero': 45.00,
    'Parrilla Acero Inox a Medida': 1250.00,
    'Caja China Premium Ahumador': 890.00,
    'Ladrillo Refractario (Millar)': 1450.00,
    'Set Muebles Terraza 4 piezas': 1350.00,
    'Sombrilla Gigante Exterior 3m': 380.00,
    'Tumbona Ergonómica Piscina': 450.00,
    'Estaca LED Solar para Jardín': 35.00,
    'Tira LED Neón Exterior (5m)': 95.00,
    'Aplique Pared Bidireccional': 68.00,
    'Toldo Retráctil Motorizado 3x2m': 1550.00,
    'Cobertura Policarbonato Alveolar': 180.00,
    'Malla Raschel 90% (Rollo 100m)': 340.00,
    'Piscina Fibra Vidrio 4x2m': 8500.00,
    'Borde Atérmico Antideslizante': 65.00,
    'Escalera Acero Inoxidable 3p': 580.00,

    // FACHADA
    'Piedra Laja Arequipeña (m2)': 45.00,
    'Fachaleta Rústica Tipo Ladrillo': 55.00,
    'Sellador Protector de Piedra': 62.00,
    'Panel Metálico Garaje (m2)': 280.00,
    'Motor Levadizo 1/2HP': 850.00,
    'Control Remoto Frecuencia': 65.00,
    'Pintura Vencedor Fachada (Balde)': 210.00,
    'Imprimante Acrílico Exterior': 95.00,
    'Rodillo Antigota Microfibra': 22.00,
    'Celosía de Aluminio Maderado': 240.00,
    'Panel Alucobond Exterior (m2)': 185.00,
    'Silicona Estructural Neutra': 28.00,
    'Cristal Reflejante Control Solar': 190.00,
    'Araña de Sujeción Acero Inox': 115.00,
    'Baranda de Cristal Templado (ml)': 350.00,
    'Proyector LED 50W Exterior': 85.00,
    'Farol Clásico Aluminio Fundido': 120.00,
    'Sensor de Movimiento 360°': 45.00,

    // INTERIORES
    'Panel LED Empotrable 18W': 24.00,
    'Lámpara Colgante Vintage': 110.00,
    'Dicroico LED Cálido (Caja x10)': 65.00,
    'Puerta MDF Blanca Ranurada': 220.00,
    'Chapa Pomo Acero Inoxidable': 45.00,
    'Bisagra Aluminio (Par)': 14.00,
    'Plancha Melamina 18mm': 195.00,
    'Tapacanto PVC Grueso (Rollo)': 85.00,
    'Corredera Telescópica 45cm': 18.50,
    'Cortina Roller SunScreen': 180.00,
    'Cortina Blackout Motorizada': 650.00,
    'Motor Tubular para Persiana': 320.00,
    'Alfombra Alto Tránsito (m2)': 55.00,
    'Papel Tapiz Texturizado (Rollo)': 75.00,
    'Pegamento para Tapiz Interior': 32.00,
    'Aire Acondicionado 12K BTU': 1350.00,
    'Extractor de Aire Baño': 85.00,
    'Termostato Digital Smart': 190.00,

    // SERVICIOS PROFESIONALES
    'Maestro de Obra Calificado (x Día)': 180.00,
    'Cuadrilla Encofrado y Vaciado (x Día)': 450.00,
    'Operario Albañil Asentado (x Día)': 140.00,
    'Supervisión de Obra Colegiado (x Visita)': 350.00,
    'Elaboración de Metrados y Presupuesto': 1200.00,
    'Firma Técnica Licencia Construcción': 850.00,
    'Técnico Electricista Certificado (x Día)': 150.00,
    'Gasfitero Sanitario Especializado (x Día)': 150.00,
    'Pozo a Tierra: Protocolo y Medición': 480.00
};

/* INYECTAR MODALES EN EL HTML (Añadiendo Flex y Miniaturas) */
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('modals-container');
    let modalsHTML = '';

    dataModales.forEach(data => {
        let itemsHTML = data.items.map((itemName, idx) => {
            let price = productPrices[itemName] || 50.00;
            let itemImg = data.imgs[idx];
            return `
                <div class="quote-item" style="display:flex; align-items:center; gap:15px; margin-bottom:12px; border-bottom:1px solid #eee; padding-bottom:12px;">
                    <img src="${itemImg}" style="width:55px; height:55px; object-fit:cover; border-radius:6px;" class="product-thumb" alt="${itemName}">
                    <div class="item-details" style="flex:1; text-align:left;">
                        <span style="font-weight:600; font-size:14px; color:#333; display:block;">${itemName}</span>
                        <small style="color:#f26f21; font-weight:bold; font-size:12px; display:block; margin-top:2px;">Precio: S/ ${price.toFixed(2)}</small>
                    </div>
                    <div class="qty-control" style="display:flex; align-items:center; gap:8px;">
                        <button onclick="changeQty(this, -1)" style="width:25px; height:25px; cursor:pointer;">-</button>
                        <span data-name="${itemName}" data-price="${price}" style="font-weight:bold; min-width:15px; text-align:center;">0</span>
                        <button onclick="changeQty(this, 1)" style="width:25px; height:25px; cursor:pointer;">+</button>
                    </div>
                </div>
            `;
        }).join('');

        modalsHTML += `
            <div id="${data.id}" class="tech-modal">
                <div class="tech-box">
                    <div class="tech-header">
                        <h3>${data.title}</h3>
                        <button class="close-tech" onclick="closeModal('${data.id}')">×</button>
                    </div>
                    <div class="tech-body" style="max-height:300px; overflow-y:auto; padding:10px 5px;">
                        <div class="product-quote-list">${itemsHTML}</div>
                    </div>
                    <button class="success-btn" onclick="addToCart('${data.id}')">AGREGAR A TUS PRODUCTOS (♡)</button>
                </div>
            </div>
        `;
    });
    
    if(container) container.innerHTML = modalsHTML;
    goHome();
});

/* ==============================================================
   MOTOR INTELIGENTE DE CARRITO Y COMPRA
============================================================== */
let shoppingCart = [];

window.changeQty = function(btn, amount) {
    let span = btn.parentElement.querySelector('span');
    let current = parseInt(span.innerText);
    let newVal = current + amount;
    if(newVal < 0) newVal = 0;
    span.innerText = newVal;
}

window.addToCart = function(modalId) {
    const modal = document.getElementById(modalId);
    let addedCount = 0;

    modal.querySelectorAll('.qty-control span').forEach(qtySpan => {
        let qty = parseInt(qtySpan.innerText);
        if (qty > 0) {
            let name = qtySpan.getAttribute('data-name');
            let price = parseFloat(qtySpan.getAttribute('data-price'));
            let existe = shoppingCart.find(i => i.name === name);
            if(existe) existe.qty += qty;
            else shoppingCart.push({name, price, qty});
            
            qtySpan.innerText = "0"; 
            addedCount++;
        }
    });

    if (addedCount > 0) {
        closeModal(modalId); 
        actualizarInterfazCarrito();
        alert("¡Materiales agregados al carrito exitosamente!");
    } else {
        alert("Ajusta la cantidad con el botón (+) antes de agregar.");
    }
}

window.actualizarInterfazCarrito = function() {
    const tbody = document.querySelector("#view-carrito .cart-table tbody");
    if(!tbody) return;

    if (shoppingCart.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #888; padding: 20px;">Tu carrito está vacío. Cotiza en los catálogos.</td></tr>`;
        actualizarBotonDePago(0);
        return;
    }

    tbody.innerHTML = "";
    let totalAcumulado = 0;
    
    shoppingCart.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        totalAcumulado += subtotal;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="font-weight:bold; color:#1d0d92;">${item.qty}</td>
            <td style="font-weight:bold; color:#333;">${item.name}</td>
            <td>S/ ${item.price.toFixed(2)}</td>
            <td style="color:#f26f21; font-weight:bold;">S/ ${subtotal.toFixed(2)}</td>
            <td><button onclick="eliminarDelCarrito(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:16px;">❌</button></td>
        `;
        tbody.appendChild(row);
    });
    
    actualizarBotonDePago(totalAcumulado);
};

function actualizarBotonDePago(total) {
    const payBtn = document.querySelector("#view-carrito .success-btn");
    if(payBtn) {
        if(total > 0) {
            payBtn.innerText = `💳 PROCESAR PAGO (S/ ${total.toFixed(2)})`;
            payBtn.onclick = () => procesarCompraYBoleta(payBtn);
        } else {
            payBtn.innerText = `PROCESAR PAGO`;
            payBtn.onclick = null;
        }
    }
}

window.eliminarDelCarrito = function(index) {
    shoppingCart.splice(index, 1);
    actualizarInterfazCarrito();
};

window.procesarCompraYBoleta = function(btn) {

    if (shoppingCart.length === 0) return;

    let totalFinal = shoppingCart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

    btn.innerText = "⏳ PROCESANDO...";
    btn.style.backgroundColor = "#ffc107";
    btn.style.pointerEvents = "none";

    setTimeout(() => {

        btn.innerText = "✅ ¡PAGO APROBADO!";
        btn.style.backgroundColor = "#28a745";

        generarBoletaPDFAutomática(shoppingCart, totalFinal);

        shoppingCart = [];
        actualizarInterfazCarrito();

        const statusText = document.querySelector(".shipping-status h4");
        const mapa = document.getElementById("shipping-map");
        const googleMap = document.getElementById("googleMap");

        if(mapa){
            mapa.style.display = "block";
        }

        if(statusText){

            document.querySelectorAll(".step").forEach(s=>{
                s.classList.remove("active","done");
            });

            let steps = document.querySelectorAll(".step");

            statusText.innerHTML =
            `ESTADO DEL ENVÍO:
            <span class="blue">Alistando pedido...</span>`;

            if(steps[0]) steps[0].classList.add("active");

            if(googleMap){
                googleMap.src="https://maps.google.com/maps?q=-8.1116,-79.0287&z=14&output=embed";
            }

            // EN RUTA
            setTimeout(()=>{

                if(steps[0]) steps[0].classList.replace("active","done");
                if(steps[1]) steps[1].classList.add("active");

                statusText.innerHTML=
                `ESTADO DEL ENVÍO:
                <span class="blue">En ruta...</span>`;

                if(googleMap){
                    googleMap.src="https://maps.google.com/maps?q=-8.1085,-79.0300&z=15&output=embed";
                }

            },2500);

            // ENTREGADO
            setTimeout(()=>{

                if(steps[1]) steps[1].classList.replace("active","done");
                if(steps[2]) steps[2].classList.add("active");

                statusText.innerHTML=
                `ESTADO DEL ENVÍO:
                <span style="color:#28a745;">¡Entregado!</span>`;

                if(googleMap){
                    googleMap.src="https://maps.google.com/maps?q=-8.1040,-79.0320&z=17&output=embed";
                }

            },5500);

        }

        setTimeout(()=>{

            btn.style.backgroundColor="#1d0d92";
            btn.style.pointerEvents="auto";

        },3000);

    },1500);

};

function generarBoletaPDFAutomática(cart, total) {
    let nombreCliente = localStorage.getItem("clienteConstruCosto") || "Usuario Invitado";
    let fecha = new Date().toLocaleString('es-PE');
    let filas = cart.map(item => `
        <tr><td style="padding:10px; border-bottom:1px solid #ddd; text-align:center;">${item.qty}</td>
        <td style="padding:10px; border-bottom:1px solid #ddd;">${item.name}</td>
        <td style="padding:10px; border-bottom:1px solid #ddd;">S/ ${item.price.toFixed(2)}</td>
        <td style="padding:10px; border-bottom:1px solid #ddd; font-weight:bold;">S/ ${(item.price * item.qty).toFixed(2)}</td></tr>
    `).join('');

    let boletaHTML = `
        <html><head><title>Boleta</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        <style>
            body { font-family: 'Arial', sans-serif; padding:0; margin:0; background:#eee; }
            #boleta { padding:40px; color:#333; max-width:800px; margin:auto; background:#fff; }
            .header { text-align:center; border-bottom:3px solid #1d0d92; padding-bottom:20px; margin-bottom:30px; }
            .header h1 { color:#1d0d92; margin:0; font-size:32px; font-weight:800; }
            .info { margin-bottom:30px; font-size:14px; color:#555; line-height:1.6; }
            table { width:100%; border-collapse:collapse; margin-bottom:30px; font-size:14px; }
            th { background:#f4f4f4; text-align:left; padding:12px 10px; border-bottom:2px solid #ddd; color:#1d0d92; }
            .total { text-align:right; font-size:22px; font-weight:800; color:#f26f21; padding-top:20px; border-top:2px solid #ddd; }
        </style></head><body>
        <div id="boleta">
            <div class="header"><h1>CONSTRUCOSTO</h1><h2>Boleta Electrónica</h2></div>
            <div class="info"><strong>Fecha:</strong> ${fecha}<br><strong>Cliente:</strong> ${nombreCliente}</div>
            <table><thead><tr><th style="text-align:center;">CANT.</th><th>PRODUCTO</th><th>P. UNIT</th><th>SUBTOTAL</th></tr></thead>
            <tbody>${filas}</tbody></table>
            <div class="total">TOTAL: S/ ${total.toFixed(2)}</div>
        </div>
        <script>
            window.onload = function() { 
                html2pdf().set({ margin:0.5, filename:'Boleta_ConstruCosto.pdf', image:{type:'jpeg', quality:0.98}, html2canvas:{scale:2}, jsPDF:{unit:'in', format:'letter', orientation:'portrait'} })
                .from(document.getElementById('boleta')).save().then(() => setTimeout(() => window.close(), 1500));
            }
        </script></body></html>
    `;

    let printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(boletaHTML);
    printWindow.document.close();
}

/* ==============================================================
   ALGORITMO DE SEGURIDAD Y BLOQUEO DE REGISTRO
============================================================== */
document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password");
    const strengthBar = document.getElementById("strength-bar");
    const strengthText = document.getElementById("strength-text");
    const submitBtn = document.getElementById("submitBtn");

    if (passwordInput && submitBtn) {
        passwordInput.addEventListener("input", function() {
            const password = passwordInput.value;
            let score = 0;

            // Limpiar clases previas de color en el borde
            passwordInput.classList.remove("secure-weak", "secure-medium", "secure-strong");

            // Si está vacío, resetear todo al estado inicial
            if (password.length === 0) {
                strengthBar.style.width = "0%";
                strengthBar.style.background = "#ccc";
                strengthText.innerHTML = "Mínimo 8 caracteres corporativos.";
                strengthText.style.color = "#666";
                submitBtn.disabled = true;
                return;
            }

            // --- REGLAS TÉCNICAS DE COMPLEJIDAD ---
            if (password.length >= 8) score += 1; // Longitud base cumplida
            if (/\d/.test(password)) score += 1;  // Tiene números
            if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1; // Mezcla Mayús/Minús
            if (/[!@#$%^&*(),.?":{}|<>_]/.test(password)) score += 1; // Tiene símbolos especiales

            // --- EVALUACIÓN GENERAL DE SEGURIDAD ---
            if (password.length < 8) {
                // CONDICIÓN INCOMPLETA: Bloqueo absoluto del botón
                strengthBar.style.width = "25%";
                strengthBar.style.background = "#dc3545";
                strengthText.innerHTML = "❌ Insegura: Debe tener mínimo 8 caracteres.";
                strengthText.style.color = "#dc3545";
                passwordInput.classList.add("secure-weak");
                submitBtn.disabled = true; 
            } else if (score === 1 || score === 2) {
                // TIENE 8 CARACTERES PERO ES MUY SIMPLE (ej. solo letras minúsculas o solo números)
                strengthBar.style.width = "55%";
                strengthBar.style.background = "#ffc107";
                strengthText.innerHTML = "⚠️ Seguridad Regular: Combina números, mayúsculas o símbolos.";
                strengthText.style.color = "#b58100";
                passwordInput.classList.add("secure-medium");
                submitBtn.disabled = false; // Ya tiene los 8 exigidos, el navegador le permite avanzar
            } else if (score >= 3) {
                // COMPLEJIDAD ALTA EXCELENTE
                strengthBar.style.width = "100%";
                strengthBar.style.background = "#28a745";
                strengthText.innerHTML = "✅ Seguridad Alta: Clave óptima para tu cuenta de ingeniería.";
                strengthText.style.color = "#28a745";
                passwordInput.classList.add("secure-strong");
                submitBtn.disabled = false;
            }
        });
    }
});