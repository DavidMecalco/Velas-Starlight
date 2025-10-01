/**
* ========================================
* BASE DE DATOS DE PRODUCTOS REESTRUCTURADA
* Velas Starlight - Products Database
* ========================================
* 
* 📅 Actualizado: 2025-01-10
* 📊 Total productos: 18
* 🏷️ Categorías: Vela, Belleza
* 🏷️ Estados: NUEVO, DESTACADO, BESTSELLER, Disponibilidad
* ✅ Estructura simplificada y optimizada
* 
* ========================================
*/

const productosData = [
    {
        "id": 1,
        "title": "Flor en Cemento",
        "category": "Vela",
        "description": "El aroma del jardín y la calma de la tierra se encuentran en nuestra Vela Flor en Cemento. Cada pieza es una escultura de paz, con una delicada flor que emerge de su sólido recipiente de yeso. Más que una vela, es un momento de pausa, un pequeño refugio para el alma. Ideal para aquellos que aprecian la belleza en la quietud.",
        "image": "../images/vela-starlight-rosas.jpeg",
        "featured": false,
        "new": false,
        "bestseller": false,
        "available": true,
        "type": "Soya",
        "fragrances": [
            "Rosas Especiales",
            "Lavanda",
            "Vainilla",
            "Canela",
            "Fresa",
            "Frutos Rojos",
            "Blue Berry",
            "Cereza",
            "Manzana-Canela",
            "Pitaya",
            "Flores Hawaianas",
            "Citricos",
            "Coco",
            "Menta",
            "Sandalo"
        ],
        "sizes": [
            {
                "label": "45 gr",
                "price": 60
            }
        ],
        "characteristics": [
            "Cera natural de alta calidad",
            "Elaborada artesanalmente",
            "Ideal para crear atmósferas relajantes",
            "Combustión limpia y uniforme"
        ],
        "care": [
            "Nunca dejar encendida sin supervisión",
            "Recortar mecha a 5mm antes de encender",
            "Encender máximo 4 horas continuas",
            "Mantener alejada de corrientes de aire"
        ],
        "ingredients": [
            "Cera de soya premium 85%",
            "Aceites esenciales naturales 10%",
            "Mecha de algodón 5%"
        ],

    },
    {
        "id": 2,
        "title": "Suspiro de Ángel",
        "category": "Vela",
        "description": "Deja que un Suspiro de Ángel ilumine tus momentos. Esta exquisita vela artesanal, con su delicada forma de querubín acunado entre suaves alas, es una invitación a la calma y la serenidad. Más que una luz, es una presencia que infunde paz, consuelo y pureza en cualquier rincón.",
        "image": "../images/vela-starlight-angeles.jpeg",
        "featured": false,
        "new": false,
        "bestseller": false,
        "available": true,
        "type": "Parafina",
        "fragrances": [
            "Lavanda",
            "Vainilla",
            "Canela",
            "Fresa",
            "Frutos Rojos",
            "Blue Berry",
            "Cereza",
            "Manzana-Canela",
            "Pitaya",
            "Rosas Especiales",
            "Flores Hawaianas",
            "Citricos",
            "Coco",
            "Menta",
            "Sandalo"
        ],
        "sizes": [
            {
                "label": "120 gr",
                "price": 65
            }
        ],
        "characteristics": [
            "Diseño angelical que transmite paz",
            "Cera de parafina premium",
            "Elaborada con dedicación artesanal",
            "Fragancia duradera y envolvente"
        ],
        "care": [
            "Nunca dejar encendida sin supervisión",
            "Recortar mecha a 5mm antes de encender",
            "Colocar sobre superficie resistente al calor",
            "Mantener fuera del alcance de niños"
        ],
        "ingredients": [
            "Cera de parafina premium 88%",
            "Aceites de fragancia 10%",
            "Mecha de algodón 2%"
        ],

    },
    {
        "id": 3,
        "title": "Bosque Encantado",
        "category": "Vela",
        "description": "Trae la magia de las fiestas a tu hogar con nuestra Vela Bosque Encantado. Esta encantadora vela artesanal captura la esencia de la Navidad en un diseño exquisito: un pequeño árbol festivo que se alza majestuosamente dentro de un elegante vaso de cristal.",
        "image": "../images/vela-starlight-pino.jpeg",
        "featured": true,
        "new": false,
        "bestseller": false,
        "available": false,
        "type": "Soya",
        "fragrances": [
            "Pino Fresco",
            "Canela",
            "Manzana-Canela",
            "Menta",
            "Sándalo"
        ],
        "sizes": [
            {
                "label": "140 gr",
                "price": 120
            }
        ],
        "characteristics": [
            "Diseño navideño con árbol dentro de cristal",
            "Edición limitada para las fiestas",
            "Elaborada con técnicas tradicionales",
            "Fragancia festiva y acogedora"
        ],
        "care": [
            "Nunca dejar encendida sin supervisión",
            "Recortar mecha a 5mm antes de encender",
            "Encender máximo 4 horas continuas",
            "Proteger el cristal de golpes"
        ],
        "ingredients": [
            "Cera de soya premium 85%",
            "Cera de parafina 10%",
            "Aceites esenciales navideños 5%"
        ],

    },
    {
        "id": 4,
        "title": "Sonrisa Eterna",
        "category": "Vela",
        "description": "Ilumina tu espacio con un toque de originalidad y buen humor con nuestra Vela Sonrisa Eterna. Diseñada con una silueta impecable de muela, esta vela artesanal es el detalle perfecto para profesionales de la odontología, estudiantes, o cualquier persona que aprecie un diseño único y divertido.",
        "image": "../images/vela-starlight-muela.jpeg",
        "featured": false,
        "new": true,
        "bestseller": false,
        "available": true,
        "type": "Parafina",
        "fragrances": [
            "Menta",
            "Eucalipto",
            "Vainilla",
            "Lavanda",
            "Frutos Rojos"
        ],
        "sizes": [
            {
                "label": "120 gr",
                "price": 75
            }
        ],
        "characteristics": [
            "Forma de muela perfectamente detallada",
            "Ideal para odontólogos y estudiantes",
            "Diseño único que inicia conversaciones",
            "Fragancia refrescante y limpia"
        ],
        "care": [
            "Nunca dejar encendida sin supervisión",
            "Recortar mecha a 5mm antes de encender",
            "Encender máximo 4 horas continuas",
            "Mantener forma intacta durante uso"
        ],
        "ingredients": [
            "Cera de parafina 70%",
            "Cera de soya 25%",
            "Aceites esenciales mentolados 5%"
        ],

    },
    {
        "id": 5,
        "title": "Flor de Cempasúchil",
        "category": "Vela",
        "description": "Enciende la luz de la tradición con nuestra Vela Flor del Sol, una pieza artesanal que captura la esencia vibrante de la flor de Cempasúchil. Su diseño detallado, con cada pétalo cuidadosamente formado, evoca la calidez y el resplandor de los caminos que guían a nuestros seres queridos de regreso a casa.",
        "image": "../images/vela-flor-cempasuchil.jpeg",
        "featured": false,
        "new": false,
        "bestseller": true,
        "available": true,
        "type": "Parafina",
        "fragrances": [
            "Cempasúchil",
            "Incienso",
            "Copal"
        ],
        "sizes": [
            {
                "label": "90 gr",
                "price": 55
            }
        ],
        "characteristics": [
            "Forma de flor de cempasúchil auténtica",
            "Honra las tradiciones mexicanas",
            "Uno de nuestros productos más populares",
            "Fragancia tradicional y espiritual"
        ],
        "care": [
            "Nunca dejar encendida sin supervisión",
            "Recortar mecha a 5mm antes de encender",
            "Mantener alejada de corrientes de aire",
            "Ideal para altares y ceremonias"
        ],
        "ingredients": [
            "Cera de parafina premium 90%",
            "Esencia de cempasúchil 8%",
            "Colorante natural naranja 2%"
        ],

    },
    {
        "id": 6,
        "title": "Vela de Soya Premium",
        "category": "Vela",
        "description": "Sumérgete en un oasis de calma con nuestra Vela de Soya Premium. Diseñada para aquellos que buscan serenidad y un toque de naturaleza en su hogar, esta vela artesanal es la esencia pura de la relajación. Elaborada con cera de soya de alta calidad y fragancias auténticas.",
        "image": "../images/vela-soya.jpeg",
        "featured": true,
        "new": true,
        "bestseller": false,
        "available": true,
        "type": "Soya",
        "fragrances": [
            "Lavanda",
            "Vainilla",
            "Canela",
            "Fresa",
            "Frutos Rojos",
            "Blue Berry",
            "Cereza",
            "Manzana-Canela",
            "Pitaya",
            "Rosas Especiales",
            "Flores Hawaianas",
            "Citricos",
            "Coco",
            "Menta",
            "Sandalo"
        ],
        "sizes": [
            {
                "label": "50 gr",
                "price": 80
            },
            {
                "label": "100 gr",
                "price": 120
            },
            {
                "label": "150 gr",
                "price": 180
            },
            {
                "label": "200 gr",
                "price": 210
            }
        ],
        "characteristics": [
            "100% cera de soya natural",
            "Biodegradable y eco-friendly",
            "Combustión limpia hasta 60 horas",
            "Envase de vidrio con tapa de madera"
        ],
        "care": [
            "Nunca dejar encendida sin supervisión",
            "Recortar mecha a 5mm antes de encender",
            "Mantener alejada de fuentes de calor",
            "Limpiar envase para reutilizar"
        ],
        "ingredients": [
            "Cera de soya premium 95%",
            "Aceites esenciales naturales 5%"
        ],

    },
    {
        "id": 7,
        "title": "Vela de Parafina Clásica",
        "category": "Vela",
        "description": "Despierta tus sentidos con nuestra Vela de Parafina Clásica. Si buscas una fragancia que llene tu hogar de alegría y vitalidad, esta vela artesanal es la elección perfecta para ti. Elaborada con cera de parafina de alta calidad, ofrece una combustión constante y una liberación intensa de deliciosos aromas.",
        "image": "../images/vela-parafina.jpeg",
        "featured": true,
        "new": true,
        "bestseller": false,
        "available": true,
        "type": "Parafina",
        "fragrances": [
            "Lavanda",
            "Vainilla",
            "Canela",
            "Fresa",
            "Frutos Rojos",
            "Blue Berry",
            "Cereza",
            "Manzana-Canela",
            "Pitaya",
            "Rosas Especiales",
            "Flores Hawaianas",
            "Citricos",
            "Coco",
            "Menta",
            "Sandalo"
        ],
        "sizes": [
            {
                "label": "50 gr",
                "price": 80
            },
            {
                "label": "100 gr",
                "price": 120
            },
            {
                "label": "150 gr",
                "price": 180
            },
            {
                "label": "200 gr",
                "price": 210
            }
        ],
        "characteristics": [
            "Combustión intensa y duradera",
            "Liberación potente de fragancia",
            "Envase elegante de vidrio con tapa de madera",
            "Ideal para espacios amplios"
        ],
        "care": [
            "Nunca dejar encendida sin supervisión",
            "Recortar mecha a 5mm antes de encender",
            "Mantener alejada de fuentes de calor",
            "Ventilar bien el espacio durante uso"
        ],
        "ingredients": [
            "Cera de parafina premium 92%",
            "Aceites de fragancia concentrados 8%"
        ],

    },
    {
        "id": 8,
        "title": "Crema Facial Regeneradora",
        "category": "Belleza",
        "description": "Nuestra Crema Facial Regeneradora combina ingredientes naturales de la más alta calidad para brindar a tu piel la nutrición y regeneración que necesita. Formulada con extractos botánicos y aceites esenciales, esta crema proporciona hidratación profunda y ayuda a restaurar la elasticidad natural de la piel.",
        "image": "../images/crema-facial.jpeg",
        "featured": false,
        "new": true,
        "bestseller": false,
        "available": true,
        "type": "Origen Natural",
        "variants": [
            "Piel Seca",
            "Piel Grasa",
            "Piel Mixta",
            "Piel Sensible",
            "Anti-edad"
        ],
        "sizes": [
            {
                "label": "50 ml",
                "price": 180
            },
            {
                "label": "100 ml",
                "price": 320
            }
        ],
        "characteristics": [
            "Ingredientes 100% naturales",
            "Libre de parabenos y sulfatos",
            "Hidratación profunda de 24 horas",
            "Apta para todo tipo de piel"
        ],
        "care": [
            "Aplicar sobre piel limpia y seca",
            "Usar movimientos circulares suaves",
            "Evitar el contorno de los ojos",
            "Usar protector solar durante el día"
        ],
        "ingredients": [
            "Aceite de jojoba orgánico 25%",
            "Extracto de aloe vera 20%",
            "Manteca de karité 15%",
            "Vitamina E natural 10%",
            "Agua purificada y emulsificantes 30%"
        ]
    },
    {
        "id": 9,
        "title": "Serum Vitamina C",
        "category": "Belleza",
        "description": "Nuestro Serum de Vitamina C es un potente antioxidante que ayuda a iluminar, proteger y rejuvenecer tu piel. Formulado con vitamina C estabilizada y ácido hialurónico, este serum combate los signos del envejecimiento mientras proporciona una hidratación intensa.",
        "image": "../images/serum.jpeg",
        "featured": true,
        "new": false,
        "bestseller": true,
        "available": true,
        "type": "Origen Natural",
        "variants": [
            "Concentración 10%",
            "Concentración 15%",
            "Concentración 20%",
            "Con Ácido Hialurónico",
            "Con Niacinamida"
        ],
        "sizes": [
            {
                "label": "30 ml",
                "price": 250
            },
            {
                "label": "60 ml",
                "price": 450
            }
        ],
        "characteristics": [
            "Vitamina C estabilizada de alta potencia",
            "Acción antioxidante y anti-edad",
            "Ilumina y unifica el tono de piel",
            "Absorción rápida sin residuos grasos"
        ],
        "care": [
            "Aplicar por las mañanas sobre piel limpia",
            "Usar antes de la crema hidratante",
            "Obligatorio usar protector solar",
            "Conservar en lugar fresco y oscuro"
        ],
        "ingredients": [
            "Vitamina C (L-Ascórbico) 15%",
            "Ácido hialurónico 5%",
            "Vitamina E 3%",
            "Extracto de té verde 2%",
            "Base acuosa estabilizada 75%"
        ]
    }
];

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productosData;
}

// Hacer disponible globalmente para el navegador
if (typeof window !== 'undefined') {
    window.productosData = productosData;
}