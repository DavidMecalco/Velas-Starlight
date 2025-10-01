/**
* ========================================
* BASE DE DATOS DE PRODUCTOS ESTANDARIZADA
* Velas Starlight - Products Database
* ========================================
* 
* 📅 Actualizado: 2025-01-10
* 📊 Total productos: 18
* 🏷️ Categorías: Vela, Belleza
* 🌸 Fragancias únicas: 26
* 🎯 Temáticas: Navidad, Día de Muertos
* 🎁 Promociones activas: 5
* ✅ Todos los productos estandarizados con información completa
* 
* ========================================
*/

// 🛍️ PRODUCTOS COMPLETAMENTE ESTANDARIZADOS
const productosData = [
    {
        "id": 1,
        "title": "Flor en Cemento",
        "category": "Vela",
        "description": "El aroma del jardín y la calma de la tierra se encuentran en nuestra Vela Flor en Cemento. Cada pieza es una escultura de paz, con una delicada flor que emerge de su sólido recipiente de yeso. Más que una vela, es un momento de pausa, un pequeño refugio para el alma. Ideal para aquellos que aprecian la belleza en la quietud.",
        "image": "../images/vela-starlight-rosas.jpeg",
        "imageData": null,
        "featured": false,
        "new": false,
        "bestseller": false,
        "available": true,
        "types": [
            "Soya",
            "Parafina"
        ],
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
            {
                "icon": "fas fa-leaf char-icon char-icon",
                "title": "Cera Natural",
                "description": "Elaborada con cera de alta calidad",
                "color": "text-green-500"
            },
            {
                "icon": "fas fa-hand-sparkles char-icon char-icon",
                "title": "Artesanal",
                "description": "Hecha a mano con dedicación",
                "color": "text-blue-500"
            },
            {
                "icon": "fas fa-home char-icon char-icon",
                "title": "Ambientador",
                "description": "Ideal para crear atmósferas",
                "color": "text-purple-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle care-icon care-icon",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors care-icon care-icon",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-clock care-icon care-icon",
                "title": "Tiempo",
                "description": "Encender máximo 4 horas continuas",
                "color": "text-blue-500"
            }
        ],
        "theme": null,
        "promotion2x1": true,
        "specialDiscount": null,
        "ingredients": []
    },
    {
        "id": 2,
        "title": "Suspiro de Ángel",
        "category": "Vela",
        "description": "Deja que un Suspiro de Ángel ilumine tus momentos. Esta exquisita vela artesanal, con su delicada forma de querubín acunado entre suaves alas, es una invitación a la calma y la serenidad. Más que una luz, es una presencia que infunde paz, consuelo y pureza en cualquier rincón. Perfecta para honrar un recuerdo, celebrar un nuevo comienzo o simplemente rodearte de una atmósfera celestial. ",
        "image": "../images/vela-starlight-angeles.jpeg",
        "imageData": null,
        "featured": false,
        "new": false,
        "bestseller": false,
        "available": true,
        "types": [
            "Soya",
            "Parafina"
        ],
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
            {
                "icon": "fas fa-heart char-icon",
                "title": "Serenidad",
                "description": "Diseño angelical que transmite paz",
                "color": "text-pink-500"
            },
            {
                "icon": "fas fa-leaf char-icon",
                "title": "Cera Premium",
                "description": "Soya y parafina de alta calidad",
                "color": "text-green-500"
            },
            {
                "icon": "fas fa-star char-icon",
                "title": "Artesanal",
                "description": "Elaborada con dedicación y amor",
                "color": "text-yellow-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle care-icon",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors care-icon",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-shield-alt care-icon",
                "title": "Superficie",
                "description": "Colocar sobre superficie resistente al calor",
                "color": "text-blue-500"
            }
        ],
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": {
            "percentage": 10,
            "text": "Oferta especial"
        },
        "ingredients": []
    },
    {
        "id": 3,
        "title": "Bosque Encantado",
        "category": "Vela",
        "description": "Trae la magia de las fiestas a tu hogar con nuestra Vela Bosque Encantado. Esta encantadora vela artesanal captura la esencia de la Navidad en un diseño exquisito: un pequeño árbol festivo que se alza majestuosamente dentro de un elegante vaso de cristal. Perfecta para evocar la alegría de la temporada, su sutil brillo y aroma (personalizable con fragancias navideñas) transformarán cualquier espacio en un refugio festivo.",
        "image": "../images/vela-starlight-pino.jpeg",
        "imageData": null,
        "featured": true,
        "new": false,
        "bestseller": false,
        "available": false,
        "types": [
            "Soya",
            "Parafina"
        ],
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
            {
                "icon": "fas fa-tree",
                "title": "Diseño Navideño",
                "description": "Árbol festivo dentro de vaso de cristal",
                "color": "text-green-500"
            },
            {
                "icon": "fas fa-snowflake",
                "title": "Temporada Especial",
                "description": "Edición limitada para las fiestas",
                "color": "text-blue-500"
            },
            {
                "icon": "fas fa-star",
                "title": "Artesanal Premium",
                "description": "Elaborada con técnicas tradicionales",
                "color": "text-yellow-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-clock",
                "title": "Tiempo",
                "description": "Encender máximo 4 horas continuas",
                "color": "text-blue-500"
            }
        ],
        "theme": "Navidad",
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Soya Premium",
                "percentage": "85%",
                "description": "Cera natural de alta calidad",
                "origin": "Natural"
            },
            {
                "name": "Cera de Parafina",
                "percentage": "10%",
                "description": "Para mejor proyección de fragancia",
                "origin": "Sintético"
            },
            {
                "name": "Fragancia Navideña",
                "percentage": "5%",
                "description": "Aceites esenciales festivos",
                "origin": "Natural"
            }
        ],
        "duration": "45-50 horas",
        "material": "Cera de soya y parafina",
        "colors": ["Verde", "Dorado", "Rojo"]
    },
    {
        "id": 4,
        "title": "Sonrisa Eterna",
        "category": "Vela",
        "description": "Ilumina tu espacio con un toque de originalidad y buen humor con nuestra Vela Sonrisa Eterna. Diseñada con una silueta impecable de muela, esta vela artesanal es el detalle perfecto para profesionales de la odontología, estudiantes, o cualquier persona que aprecie un diseño único y divertido. Colócala en tu consultorio, estudio o en tu hogar para añadir un punto focal inesperado que seguramente iniciará una conversación. Es el regalo ideal para graduaciones, aniversarios de práctica o simplemente para celebrar la pasión por una profesión que trae sonrisas al mundo.",
        "image": "../images/vela-starlight-muela.jpeg",
        "imageData": null,
        "featured": false,
        "new": true,
        "bestseller": false,
        "available": true,
        "types": [
            "Soya",
            "Parafina"
        ],
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
            {
                "icon": "fas fa-tooth",
                "title": "Diseño Único",
                "description": "Forma de muela perfectamente detallada",
                "color": "text-blue-500"
            },
            {
                "icon": "fas fa-graduation-cap",
                "title": "Regalo Profesional",
                "description": "Ideal para odontólogos y estudiantes",
                "color": "text-purple-500"
            },
            {
                "icon": "fas fa-smile",
                "title": "Conversación",
                "description": "Punto focal que inicia conversaciones",
                "color": "text-yellow-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-clock",
                "title": "Tiempo",
                "description": "Encender máximo 4 horas continuas",
                "color": "text-blue-500"
            }
        ],
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Soya",
                "percentage": "70%",
                "description": "Cera natural ecológica",
                "origin": "Natural"
            },
            {
                "name": "Cera de Parafina",
                "percentage": "25%",
                "description": "Para mejor definición de forma",
                "origin": "Sintético"
            },
            {
                "name": "Fragancia Mentolada",
                "percentage": "5%",
                "description": "Aceites esenciales refrescantes",
                "origin": "Natural"
            }
        ],
        "duration": "40-45 horas",
        "material": "Cera de soya y parafina",
        "colors": ["Blanco", "Azul claro"]
    },
    {
        "id": 5,
        "title": "Flor de Cempasúchil",
        "category": "Vela",
        "description": "Enciende la luz de la tradición con nuestra Vela Flor del Sol, una pieza artesanal que captura la esencia vibrante de la flor de Cempasúchil. Su diseño detallado, con cada pétalo cuidadosamente formado, evoca la calidez y el resplandor de los caminos que guían a nuestros seres queridos de regreso a casa.",
        "image": "../images/vela-flor-cempasuchil.jpeg",
        "imageData": null,
        "featured": false,
        "new": false,
        "bestseller": true,
        "available": true,
        "types": [
            "Parafina"
        ],
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
            {
                "icon": "fas fa-flower",
                "title": "Diseño Tradicional",
                "description": "Forma de flor de cempasúchil auténtica",
                "color": "text-orange-500"
            },
            {
                "icon": "fas fa-heart",
                "title": "Tradición Mexicana",
                "description": "Honra las costumbres del Día de Muertos",
                "color": "text-red-500"
            },
            {
                "icon": "fas fa-candle",
                "title": "Bestseller",
                "description": "Uno de nuestros productos más populares",
                "color": "text-yellow-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-wind",
                "title": "Corrientes de Aire",
                "description": "Mantener alejada de corrientes de aire",
                "color": "text-blue-500"
            }
        ],
        "theme": "Día de Muertos",
        "promotion2x1": true,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Parafina Premium",
                "percentage": "90%",
                "description": "Cera de alta calidad para mejor definición",
                "origin": "Sintético"
            },
            {
                "name": "Fragancia de Cempasúchil",
                "percentage": "8%",
                "description": "Esencia tradicional mexicana",
                "origin": "Natural"
            },
            {
                "name": "Colorante Naranja",
                "percentage": "2%",
                "description": "Pigmento natural para color vibrante",
                "origin": "Natural"
            }
        ],
        "duration": "35-40 horas",
        "material": "Cera de parafina premium",
        "colors": ["Naranja", "Amarillo"]
    },
    {
        "id": 6,
        "title": "Vela de Soya",
        "category": "Vela",
        "description": "Sumérgete en un oasis de calma con nuestra Vela de Soya. Diseñada para aquellos que buscan serenidad y un toque de naturaleza en su hogar, esta vela artesanal es la esencia pura de la relajación. Elaborada con cera de soya de alta calidad y fragancias auténticas, cada encendido libera un aroma suave y reconfortante, ideal para aliviar el estrés, mejorar el sueño o simplemente crear un ambiente de paz. Su elegante envase de vidrio con tapa de madera complementa cualquier decoración, aportando calidez y un estilo minimalista.",
        "image": "../images/vela-soya.jpeg",
        "imageData": null,
        "featured": true,
        "new": true,
        "bestseller": false,
        "available": true,
        "types": [
            "Soya"
        ],
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
            {
                "icon": "fas fa-leaf",
                "title": "100% Natural",
                "description": "Cera de soya pura sin aditivos químicos",
                "color": "text-green-500"
            },
            {
                "icon": "fas fa-recycle",
                "title": "Eco-Friendly",
                "description": "Biodegradable y respetuosa con el medio ambiente",
                "color": "text-green-600"
            },
            {
                "icon": "fas fa-clock",
                "title": "Larga Duración",
                "description": "Hasta 60 horas de combustión limpia",
                "color": "text-blue-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-thermometer-half",
                "title": "Temperatura",
                "description": "Mantener alejada de fuentes de calor",
                "color": "text-red-500"
            }
        ],
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Soya Premium",
                "percentage": "95%",
                "description": "Cera 100% natural de soya americana",
                "origin": "Natural"
            },
            {
                "name": "Aceites Esenciales",
                "percentage": "5%",
                "description": "Fragancias naturales concentradas",
                "origin": "Natural"
            }
        ],
        "duration": "50-60 horas",
        "material": "Cera de soya 100% natural",
        "colors": ["Blanco natural", "Crema"]
    },
    {
        "id": 7,
        "title": "Vela de Parafina",
        "category": "Vela",
        "description": "Despierta tus sentidos con nuestra Vela de Parafina. Si buscas una fragancia que llene tu hogar de alegría y vitalidad, esta vela artesanal es la elección perfecta para ti. Elaborada con cera de parafina de alta calidad, esta vela ofrece una combustión constante y una liberación intensa de deliciosos aromas. El elegante envase de vidrio con tapa de madera complementa su diseño, haciéndola ideal para cualquier estilo decorativo.",
        "image": "../images/vela-parafina.jpeg",
        "imageData": null,
        "featured": true,
        "new": true,
        "bestseller": false,
        "available": true,
        "types": [
            "Parafina"
        ],
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
            {
                "icon": "fas fa-fire",
                "title": "Combustión Intensa",
                "description": "Liberación potente de fragancia",
                "color": "text-orange-500"
            },
            {
                "icon": "fas fa-clock",
                "title": "Larga Duración",
                "description": "Hasta 55 horas de combustión",
                "color": "text-blue-500"
            },
            {
                "icon": "fas fa-gem",
                "title": "Elegante Diseño",
                "description": "Envase de vidrio con tapa de madera",
                "color": "text-purple-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-thermometer-half",
                "title": "Temperatura",
                "description": "Mantener alejada de fuentes de calor",
                "color": "text-red-500"
            }
        ],
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Parafina Premium",
                "percentage": "92%",
                "description": "Cera de alta calidad para combustión intensa",
                "origin": "Sintético"
            },
            {
                "name": "Aceites de Fragancia",
                "percentage": "8%",
                "description": "Fragancias concentradas de alta calidad",
                "origin": "Sintético"
            }
        ],
        "duration": "45-55 horas",
        "material": "Cera de parafina premium",
        "colors": ["Blanco", "Crema"]
    },
    {
        "id": 8,
        "title": "Fantasma",
        "category": "Vela",
        "description": "Trae un toque de diversión y tradición a tus festividades con nuestra Vela Fantasma. Esta pieza artesanal, con su divertida y amigable forma de fantasma, es el detalle perfecto para celebrar el Día de Muertos y Halloween con un toque de encanto. Elaborada con cera de alta calidad, esta vela no solo ilumina, sino que también crea un ambiente mágico y acogedor. Su diseño único es ideal para decorar altares, mesas de fiesta o cualquier rincón de tu hogar que busque una chispa de alegría y originalidad. Es el regalo perfecto para quienes aman la temporada y valoran la creatividad artesanal.",
        "image": "../images/vela-fantasma.png",
        "imageData": null,
        "featured": false,
        "new": true,
        "bestseller": false,
        "available": true,
        "types": [
            "Parafina"
        ],
        "fragrances": [
            "Cempasúchil",
            "Incienso",
            "Copal"
        ],
        "sizes": [
            {
                "label": "50 gr",
                "price": 80
            }
        ],
        "characteristics": [
            {
                "icon": "fas fa-ghost",
                "title": "Diseño Divertido",
                "description": "Forma amigable de fantasma artesanal",
                "color": "text-white"
            },
            {
                "icon": "fas fa-magic",
                "title": "Ambiente Mágico",
                "description": "Crea atmósfera encantadora",
                "color": "text-purple-500"
            },
            {
                "icon": "fas fa-gift",
                "title": "Regalo Perfecto",
                "description": "Ideal para temporada festiva",
                "color": "text-orange-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-wind",
                "title": "Corrientes de Aire",
                "description": "Mantener alejada de corrientes de aire",
                "color": "text-blue-500"
            }
        ],
        "theme": "Día de Muertos",
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Parafina",
                "percentage": "88%",
                "description": "Cera de alta calidad para formas detalladas",
                "origin": "Sintético"
            },
            {
                "name": "Fragancia Tradicional",
                "percentage": "10%",
                "description": "Esencias de temporada mexicana",
                "origin": "Natural"
            },
            {
                "name": "Colorante Blanco",
                "percentage": "2%",
                "description": "Pigmento para color fantasma",
                "origin": "Sintético"
            }
        ],
        "duration": "25-30 horas",
        "material": "Cera de parafina artesanal",
        "colors": ["Blanco", "Gris claro"]
    },
    {
        "id": 9,
        "title": "Muñeco Calabaza",
        "category": "Vela",
        "description": "Celebra la magia de la temporada con una pieza única que fusiona dos íconos de las festividades: la calidez de la calabaza y la alegría de un muñeco. Nuestra Vela Muñeco Calabaza es una creación artesanal que llenará tu hogar de encanto y tradición. Con un diseño ingenioso y divertido, esta vela no solo ilumina, sino que se convierte en el centro de atención de cualquier decoración. Sus detalles, desde el simpático rostro hasta el pequeño sombrero de bruja, evocan la esencia del Día de Muertos y Halloween, mientras que el toque de color naranja y la ambientación festiva la hacen inolvidable.",
        "image": "../images/vela-calabza.png",
        "imageData": null,
        "featured": false,
        "new": false,
        "bestseller": true,
        "available": true,
        "types": [
            "Parafina"
        ],
        "fragrances": [
            "Cempasúchil",
            "Incienso",
            "Copal"
        ],
        "sizes": [
            {
                "label": "50 gr",
                "price": 80.00
            }
        ],
        "characteristics": [
            {
                "icon": "fas fa-pumpkin-patch",
                "title": "Diseño Festivo",
                "description": "Calabaza con sombrero de bruja único",
                "color": "text-orange-500"
            },
            {
                "icon": "fas fa-heart",
                "title": "Tradición Mexicana",
                "description": "Celebra el Día de Muertos con encanto",
                "color": "text-red-500"
            },
            {
                "icon": "fas fa-star",
                "title": "Bestseller",
                "description": "Uno de nuestros favoritos de temporada",
                "color": "text-yellow-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-wind",
                "title": "Corrientes de Aire",
                "description": "Mantener alejada de corrientes de aire",
                "color": "text-blue-500"
            }
        ],
        "theme": "Día de Muertos",
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Parafina Premium",
                "percentage": "85%",
                "description": "Cera de alta calidad para detalles precisos",
                "origin": "Sintético"
            },
            {
                "name": "Fragancia de Temporada",
                "percentage": "12%",
                "description": "Esencias tradicionales mexicanas",
                "origin": "Natural"
            },
            {
                "name": "Colorante Naranja",
                "percentage": "3%",
                "description": "Pigmento natural para color calabaza",
                "origin": "Natural"
            }
        ],
        "duration": "25-30 horas",
        "material": "Cera de parafina artesanal",
        "colors": ["Naranja", "Verde", "Negro"]
    },
    {
        "id": 10,
        "title": "Jack Calavera",
        "category": "Vela",
        "description": "Celebra la tradición con un toque de encanto inesperado con nuestra Vela Jack Calavera. Inspirada en la icónica figura del cine, esta pieza artesanal captura la esencia del Día de Muertos con un diseño único y un aire de misterio. Cada vela está elaborada con cera de alta calidad y detalles que la hacen inconfundible. Su suave llama ilumina los espacios, creando un ambiente acogedor y un puente entre el recuerdo y la festividad. Es el detalle perfecto para decorar altares, mesas de celebración o simplemente para añadir un toque de originalidad a tu hogar.",
        "image": "../images/vela-jack.png",
        "imageData": null,
        "featured": true,
        "new": false,
        "bestseller": true,
        "available": true,
        "types": [
            "Parafina"
        ],
        "fragrances": [
            "Cempasúchil",
            "Incienso",
            "Copal"
        ],
        "sizes": [
            {
                "label": "50 gr",
                "price": 80
            }
        ],
        "characteristics": [
            {
                "icon": "fas fa-skull",
                "title": "Diseño Icónico",
                "description": "Inspirado en Jack Skellington del cine",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-magic",
                "title": "Misterio y Encanto",
                "description": "Aire único de elegancia gótica",
                "color": "text-purple-500"
            },
            {
                "icon": "fas fa-fire",
                "title": "Bestseller",
                "description": "Favorito de la temporada",
                "color": "text-orange-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-wind",
                "title": "Corrientes de Aire",
                "description": "Mantener alejada de corrientes de aire",
                "color": "text-blue-500"
            }
        ],
        "theme": "Día de Muertos",
        "promotion2x1": true,
        "specialDiscount": {
            "percentage": 15,
            "text": "Oferta especial de temporada"
        },
        "ingredients": [
            {
                "name": "Cera de Parafina Premium",
                "percentage": "80%",
                "description": "Cera de alta calidad para detalles precisos",
                "origin": "Sintético"
            },
            {
                "name": "Fragancia Tradicional",
                "percentage": "15%",
                "description": "Esencias de copal e incienso",
                "origin": "Natural"
            },
            {
                "name": "Pigmentos Artísticos",
                "percentage": "5%",
                "description": "Colorantes seguros para velas",
                "origin": "Sintético"
            }
        ],
        "duration": "25-30 horas",
        "material": "Cera de parafina artesanal",
        "colors": ["Negro", "Blanco", "Gris"]
    },
    {
        "id": 11,
        "title": "Calaveras Encendidas",
        "category": "Vela",
        "description": "Celebra la vida, el recuerdo y la tradición con nuestras Calaveras Encendidas, un dúo de velas artesanales que rinde homenaje a la dualidad del Día de Muertos. Cada pieza, con su forma detallada de cráneo, está elaborada para simbolizar la alegría de recordar a quienes ya no están, transformando un motivo tradicional en un objeto de belleza y respeto. Elaboradas con cera de alta calidad y un acabado impecable, estas velas no solo iluminan tu espacio, sino que también cuentan una historia. Son el complemento perfecto para tu ofrenda, altar o como una pieza central en cualquier celebración.",
        "image": "../images/vela-doblecraneo.png",
        "imageData": null,
        "featured": false,
        "new": true,
        "bestseller": false,
        "available": true,
        "types": [
            "Parafina"
        ],
        "fragrances": [
            "Cempasúchil",
            "Incienso",
            "Copal"
        ],
        "sizes": [
            {
                "label": "40 gr",
                "price": 50
            }
        ],
        "characteristics": [
            {
                "icon": "fas fa-skull-crossbones",
                "title": "Dúo Simbólico",
                "description": "Dos calaveras que representan la dualidad",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-heart",
                "title": "Tradición y Respeto",
                "description": "Honra la memoria con belleza",
                "color": "text-red-500"
            },
            {
                "icon": "fas fa-candle",
                "title": "Altar Perfecto",
                "description": "Complemento ideal para ofrendas",
                "color": "text-yellow-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-wind",
                "title": "Corrientes de Aire",
                "description": "Mantener alejada de corrientes de aire",
                "color": "text-blue-500"
            }
        ],
        "theme": "Día de Muertos",
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Parafina Premium",
                "percentage": "88%",
                "description": "Cera de alta calidad para detalles finos",
                "origin": "Sintético"
            },
            {
                "name": "Fragancia Tradicional",
                "percentage": "10%",
                "description": "Esencias mexicanas auténticas",
                "origin": "Natural"
            },
            {
                "name": "Colorante Natural",
                "percentage": "2%",
                "description": "Pigmentos seguros para velas",
                "origin": "Natural"
            }
        ],
        "duration": "20-25 horas",
        "material": "Cera de parafina artesanal",
        "colors": ["Blanco", "Hueso", "Gris claro"]
    },
    {
        "id": 12,
        "title": "Calavera de Chocolate",
        "category": "Vela",
        "description": "Honra la tradición del Día de Muertos con nuestra Calavera de Chocolate. Cada pieza artesanal es un vibrante tributo a la vida y el recuerdo, con un diseño que combina la festividad de los colores y la belleza de los detalles. Esta vela es más que un simple objeto decorativo: es un símbolo que evoca alegría, memoria y un profundo respeto por nuestros seres queridos. Perfecta para adornar tu ofrenda, crear un ambiente festivo en casa o para regalar un detalle lleno de significado y tradición.",
        "image": "../images/vela-calaverachocolate.png",
        "imageData": null,
        "featured": true,
        "new": true,
        "bestseller": false,
        "available": true,
        "types": [
            "Parafina"
        ],
        "fragrances": [
            "Incienso",
            "Copal",
            "Cempasúchil",
            "Chocolate"
        ],
        "sizes": [
            {
                "label": "250 gr",
                "price": 90
            }
        ],
        "characteristics": [
            {
                "icon": "fas fa-palette",
                "title": "Colores Vibrantes",
                "description": "Diseño festivo con detalles coloridos",
                "color": "text-pink-500"
            },
            {
                "icon": "fas fa-heart",
                "title": "Tributo a la Vida",
                "description": "Símbolo de alegría y memoria",
                "color": "text-red-500"
            },
            {
                "icon": "fas fa-gift",
                "title": "Regalo Significativo",
                "description": "Detalle lleno de tradición",
                "color": "text-purple-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-clock",
                "title": "Tiempo",
                "description": "Encender máximo 4 horas continuas",
                "color": "text-blue-500"
            }
        ],
        "theme": "Día de Muertos",
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Parafina Premium",
                "percentage": "82%",
                "description": "Cera de alta calidad para gran tamaño",
                "origin": "Sintético"
            },
            {
                "name": "Fragancia de Chocolate",
                "percentage": "12%",
                "description": "Esencia dulce y tradicional",
                "origin": "Natural"
            },
            {
                "name": "Colorantes Festivos",
                "percentage": "6%",
                "description": "Pigmentos vibrantes seguros",
                "origin": "Sintético"
            }
        ],
        "duration": "80-90 horas",
        "material": "Cera de parafina artesanal",
        "colors": ["Marrón chocolate", "Rosa", "Azul", "Verde", "Amarillo"]
    },
    {
        "id": 13,
        "title": "Forma de Diosa",
        "category": "Vela",
        "description": "Rinde homenaje a la forma femenina con nuestra Vela Forma de Diosa. Esta pieza de arte, elegantemente esculpida en cera negra con sutiles destellos de pan de oro, es una poderosa declaración de belleza y empoderamiento. Más que una simple vela, es un recordatorio de la fuerza, la gracia y la divinidad que habita en cada una de nosotras. Perfecta para crear un ambiente de introspección, admiración y respeto en tu espacio. Su diseño minimalista y sofisticado la convierte en un punto focal único en cualquier habitación.",
        "image": "../images/vela-diosa.jpeg",
        "imageData": null,
        "featured": true,
        "new": true,
        "bestseller": false,
        "available": true,
        "types": [
            "Parafina"
        ],
        "fragrances": [
            "Lavanda",
            "Vainilla",
            "Canela",
            "Frutos Rojos",
            "Fresa",
            "Blue Berry",
            "Cereza",
            "Manzana-Canela",
            "Pitaya",
            "Eucalipto",
            "Sandalo",
            "Coco",
            "Menta",
            "Citricos",
            "Flores Hawaianas",
            "Rosas Especiales"
        ],
        "sizes": [
            {
                "label": "150 gr",
                "price": 65
            }
        ],
        "characteristics": [
            {
                "icon": "fas fa-female",
                "title": "Empoderamiento",
                "description": "Celebra la fuerza y gracia femenina",
                "color": "text-purple-500"
            },
            {
                "icon": "fas fa-crown",
                "title": "Elegancia Artística",
                "description": "Escultura con destellos de oro",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-meditation",
                "title": "Introspección",
                "description": "Ambiente de reflexión y respeto",
                "color": "text-blue-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-hand-paper",
                "title": "Manipulación",
                "description": "Manejar con cuidado por su forma artística",
                "color": "text-red-500"
            }
        ],
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Parafina Negra",
                "percentage": "85%",
                "description": "Cera especial para formas artísticas",
                "origin": "Sintético"
            },
            {
                "name": "Aceites Esenciales",
                "percentage": "12%",
                "description": "Fragancias premium seleccionadas",
                "origin": "Natural"
            },
            {
                "name": "Destellos de Oro",
                "percentage": "3%",
                "description": "Mica dorada para acabado elegante",
                "origin": "Natural"
            }
        ],
        "duration": "50-60 horas",
        "material": "Cera de parafina artística",
        "colors": ["Negro", "Dorado"]
    },
    {
        "id": 14,
        "title": "Susurro de Mar",
        "category": "Vela",
        "description": "Deja que la brisa del océano invada tu hogar con nuestra Vela Susurro de Mar. Esta delicada vela artesanal, con su perfecta forma de concha en un suave tono rosa, es una invitación a la tranquilidad y la relajación. Colócala en tu baño, sala de estar o dormitorio para evocar la paz de la playa y el sonido de las olas. Es el regalo ideal para los amantes del mar o para quienes buscan un toque de calma en su decoración.",
        "image": "../images/vela-susurromar.png",
        "imageData": null,
        "featured": false,
        "new": true,
        "bestseller": false,
        "available": true,
        "types": [
            "Parafina"
        ],
        "fragrances": [
            "Lavanda",
            "Rosas Especiales",
            "Vainilla",
            "Flores Hawaianas",
            "Canela",
            "Fresa",
            "Citricos",
            "Frutos Rojos",
            "Coco",
            "Blue Berry",
            "Cereza",
            "Manzana-Canela",
            "Pitaya",
            "Menta",
            "Sandalo",
            "Eucalipto"
        ],
        "sizes": [
            {
                "label": "150 gr",
                "price": 60
            }
        ],
        "characteristics": [
            {
                "icon": "fas fa-water",
                "title": "Inspiración Marina",
                "description": "Forma de concha perfectamente detallada",
                "color": "text-blue-500"
            },
            {
                "icon": "fas fa-spa",
                "title": "Relajación Total",
                "description": "Evoca la paz de la playa",
                "color": "text-teal-500"
            },
            {
                "icon": "fas fa-heart",
                "title": "Tono Suave",
                "description": "Rosa delicado que calma",
                "color": "text-pink-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-droplet",
                "title": "Humedad",
                "description": "Ideal para baños, mantener seca",
                "color": "text-blue-500"
            }
        ],
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Parafina Rosa",
                "percentage": "88%",
                "description": "Cera especial con tinte rosa suave",
                "origin": "Sintético"
            },
            {
                "name": "Fragancias Marinas",
                "percentage": "10%",
                "description": "Esencias que evocan el océano",
                "origin": "Natural"
            },
            {
                "name": "Colorante Rosa",
                "percentage": "2%",
                "description": "Pigmento suave y relajante",
                "origin": "Natural"
            }
        ],
        "duration": "50-55 horas",
        "material": "Cera de parafina artesanal",
        "colors": ["Rosa suave", "Blanco perla"]
    },
    {
        "id": 15,
        "title": "Jardín de Luz",
        "category": "Vela",
        "description": "Añade un toque de naturaleza y serenidad a tu espacio con nuestra Vela Jardín de Luz. Con su diseño único en forma de suculenta, esta vela artesanal es perfecta para quienes aman la naturaleza y buscan un elemento decorativo que sea a la vez hermoso y relajante. El delicado recipiente de barro le da un toque rústico y orgánico, mientras que la llama suave ilumina sus pétalos de cera, creando una atmósfera de paz y tranquilidad. Es el detalle ideal para decorar tu escritorio, una mesa de noche o cualquier rincón que necesite un poco de luz y vida.",
        "image": "../images/vela-jardinluz.png",
        "imageData": null,
        "featured": false,
        "new": false,
        "bestseller": false,
        "available": true,
        "types": [
            "Parafina"
        ],
        "fragrances": [
            "Lavanda",
            "Vainilla",
            "Flores Hawaianas",
            "Citricos",
            "Menta",
            "Coco",
            "Sandalo",
            "Eucalipto"
        ],
        "sizes": [
            {
                "label": "75 gr",
                "price": 70
            }
        ],
        "characteristics": [
            {
                "icon": "fas fa-seedling",
                "title": "Diseño Natural",
                "description": "Forma de suculenta realista",
                "color": "text-green-500"
            },
            {
                "icon": "fas fa-leaf",
                "title": "Toque Rústico",
                "description": "Recipiente de barro orgánico",
                "color": "text-brown-500"
            },
            {
                "icon": "fas fa-home",
                "title": "Decorativo",
                "description": "Perfecto para cualquier espacio",
                "color": "text-blue-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Supervisión",
                "description": "Nunca dejar encendida sin supervisión",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-scissors",
                "title": "Mecha",
                "description": "Recortar mecha a 5mm antes de encender",
                "color": "text-gray-500"
            },
            {
                "icon": "fas fa-shield-alt",
                "title": "Superficie",
                "description": "Colocar sobre superficie resistente",
                "color": "text-red-500"
            }
        ],
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Parafina Verde",
                "percentage": "85%",
                "description": "Cera con tinte natural verde",
                "origin": "Sintético"
            },
            {
                "name": "Fragancias Naturales",
                "percentage": "12%",
                "description": "Esencias de plantas y flores",
                "origin": "Natural"
            },
            {
                "name": "Colorante Verde",
                "percentage": "3%",
                "description": "Pigmento natural de plantas",
                "origin": "Natural"
            }
        ],
        "duration": "30-35 horas",
        "material": "Cera de parafina en recipiente de barro",
        "colors": ["Verde natural", "Terracota"]
    },
    {
        "id": 16,
        "title": "Elixir Facial con Ácido Hialurónico",
        "category": "Belleza",
        "description": "Descubre la magia de la hidratación profunda con nuestro Dúo Revitalizante. Inspirados en la pureza de la naturaleza, estos dos sueros faciales de Ácido Hialurónico son tu secreto para una piel radiante, tersa y llena de vida. Elaborados con fórmulas ligeras de rápida absorción, este par de elixires trabaja en perfecta armonía para nutrir tu piel. El suero de tono dorado revitaliza y aporta luminosidad, mientras que el suero transparente hidrata intensamente, rellenando las líneas de expresión y mejorando la elasticidad. Su elegante envase de vidrio con detalles dorados no solo protege la fórmula, sino que añade un toque de lujo y sofisticación a tu rutina de cuidado personal.",
        "image": "../images/serum.jpeg",
        "types": [
            "Origen Natural"
        ],
        "careType": "Facial",
        "sizes": [
            {
                "label": "50 mL",
                "price": 200
            }
        ],
        "fragrances": [
            "Ácido Hialurónico (5%)",
            "Frutos Rojos",
            "Té Verde",
            "Vitamina E y C"
        ],
        "characteristics": [
            {
                "icon": "fas fa-droplet",
                "title": "Hidratación Profunda",
                "description": "Ácido hialurónico al 5%",
                "color": "text-blue-500"
            },
            {
                "icon": "fas fa-leaf",
                "title": "Ingredientes Naturales",
                "description": "Fórmula libre de químicos agresivos",
                "color": "text-green-500"
            },
            {
                "icon": "fas fa-gem",
                "title": "Absorción Rápida",
                "description": "Textura ligera que se absorbe al instante",
                "color": "text-purple-500"
            },
            {
                "icon": "fas fa-star",
                "title": "Anti-edad",
                "description": "Reduce líneas de expresión",
                "color": "text-yellow-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-hand-paper",
                "title": "Aplicación",
                "description": "Aplicar sobre piel limpia y seca",
                "color": "text-blue-500"
            },
            {
                "icon": "fas fa-eye",
                "title": "Evitar Ojos",
                "description": "No aplicar directamente en el contorno de ojos",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-thermometer-half",
                "title": "Conservación",
                "description": "Mantener en lugar fresco y seco",
                "color": "text-red-500"
            },
            {
                "icon": "fas fa-calendar",
                "title": "Caducidad",
                "description": "Usar dentro de 12 meses tras abrir",
                "color": "text-green-500"
            }
        ],
        "featured": true,
        "new": true,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Ácido Hialurónico",
                "percentage": "5%",
                "description": "Hidratación profunda y anti-edad",
                "origin": "Natural"
            },
            {
                "name": "Vitamina E",
                "percentage": "3%",
                "description": "Antioxidante y protector",
                "origin": "Natural"
            },
            {
                "name": "Vitamina C",
                "percentage": "2%",
                "description": "Luminosidad y firmeza",
                "origin": "Natural"
            },
            {
                "name": "Agua Purificada",
                "percentage": "85%",
                "description": "Base hidratante del suero",
                "origin": "Natural"
            },
            {
                "name": "Extracto de Frutos Rojos",
                "percentage": "5%",
                "description": "Antioxidantes naturales",
                "origin": "Natural"
            }
        ],
        "duration": "12 meses después de abierto",
        "material": "Suero facial líquido",
        "colors": ["Dorado transparente", "Transparente"]
    },
    {
        "id": 17,
        "title": "Mascarilla de Piña",
        "category": "Belleza",
        "description": "(No apto para pieles sensibles) Transforma tu rutina de cuidado con nuestra Mascarilla de Piña Exfoliante. Inspirada en el brillo y frescura de esta fruta tropical, esta mascarilla es un verdadero despertar para tu piel, dejándola suave, luminosa y revitalizada.  Elaborada con extracto de piña natural, esta mascarilla utiliza las propiedades de la bromelina, una enzima natural, para exfoliar suavemente la piel, eliminando las células muertas y revelando una tez radiante. Su textura cremosa y el envase de color rosa pastel la convierten en un objeto de deseo en tu tocador, invitándote a un ritual de cuidado que es tan efectivo como placentero.",
        "image": "../images/mascarilla-pina.jpeg",
        "imageData": null,
        "featured": true,
        "new": true,
        "bestseller": false,
        "available": true,
        "types": [
            "Origen Natural"
        ],
        "careType": "Facial",
        "fragrances": [
            "Piña"
        ],
        "sizes": [
            {
                "label": "De Bolsillo",
                "price": 55
            }
        ],
        "characteristics": [
            {
                "icon": "fas fa-leaf",
                "title": "Exfoliante Natural",
                "description": "Bromelina de piña para exfoliación suave",
                "color": "text-green-500"
            },
            {
                "icon": "fas fa-sun",
                "title": "Luminosidad",
                "description": "Revela una tez radiante y fresca",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-exclamation-triangle",
                "title": "Piel Normal",
                "description": "No recomendado para pieles sensibles",
                "color": "text-red-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-hand-paper",
                "title": "Aplicación",
                "description": "Aplicar sobre rostro limpio y seco",
                "color": "text-blue-500"
            },
            {
                "icon": "fas fa-clock",
                "title": "Tiempo",
                "description": "Dejar actuar 10-15 minutos",
                "color": "text-green-500"
            },
            {
                "icon": "fas fa-eye",
                "title": "Evitar Ojos",
                "description": "No aplicar en contorno de ojos",
                "color": "text-yellow-500"
            },
            {
                "icon": "fas fa-droplet",
                "title": "Enjuague",
                "description": "Retirar con agua tibia",
                "color": "text-blue-500"
            }
        ],
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Extracto de Piña",
                "percentage": "25%",
                "description": "Bromelina natural para exfoliación",
                "origin": "Natural"
            },
            {
                "name": "Arcilla Rosa",
                "percentage": "20%",
                "description": "Purifica y suaviza la piel",
                "origin": "Natural"
            },
            {
                "name": "Glicerina Vegetal",
                "percentage": "15%",
                "description": "Hidratación y suavidad",
                "origin": "Natural"
            },
            {
                "name": "Agua Purificada",
                "percentage": "35%",
                "description": "Base de la mascarilla",
                "origin": "Natural"
            },
            {
                "name": "Conservantes Naturales",
                "percentage": "5%",
                "description": "Mantiene la frescura del producto",
                "origin": "Natural"
            }
        ],
        "duration": "6 meses después de abierto",
        "material": "Mascarilla cremosa exfoliante",
        "colors": ["Rosa pastel"]
    },
    {
        "id": 18,
        "title": "Cosecha de Vitalidad",
        "category": "Belleza",
        "description": "Despierta la luminosidad de tu piel con nuestra Cosecha de Vitalidad. Este gel exfoliante, rico en la dulzura de los frutos rojos, es un festín de frescura y un ritual de belleza que revitaliza tu piel al instante. Elaborado con ingredientes naturales y un delicioso aroma frutal, este exfoliante elimina suavemente las impurezas y células muertas, dejando tu piel increíblemente suave, tersa y con un brillo saludable. Su textura, con partículas exfoliantes delicadas, es una experiencia sensorial que te transportará a un jardín lleno de fresas y arándanos.",
        "image": "../images/gel-frutosrojos.jpeg",
        "imageData": null,
        "featured": true,
        "new": true,
        "bestseller": false,
        "available": true,
        "types": [
            "Origen Natural"
        ],
        "careType": "Corporal",
        "fragrances": [
            "Frutos Rojos"
        ],
        "sizes": [
            {
                "label": "De Bolsillo",
                "price": 60
            }
        ],
        "characteristics": [
            {
                "icon": "fas fa-berry",
                "title": "Frutos Rojos",
                "description": "Rico en antioxidantes naturales",
                "color": "text-red-500"
            },
            {
                "icon": "fas fa-sparkles",
                "title": "Exfoliación Suave",
                "description": "Partículas delicadas que renuevan",
                "color": "text-pink-500"
            },
            {
                "icon": "fas fa-leaf",
                "title": "100% Natural",
                "description": "Ingredientes de origen vegetal",
                "color": "text-green-500"
            }
        ],
        "care": [
            {
                "icon": "fas fa-hand-sparkles",
                "title": "Aplicación",
                "description": "Masajear suavemente sobre piel húmeda",
                "color": "text-blue-500"
            },
            {
                "icon": "fas fa-clock",
                "title": "Frecuencia",
                "description": "Usar 2-3 veces por semana",
                "color": "text-green-500"
            },
            {
                "icon": "fas fa-droplet",
                "title": "Enjuague",
                "description": "Retirar completamente con agua",
                "color": "text-blue-500"
            },
            {
                "icon": "fas fa-thermometer-half",
                "title": "Conservación",
                "description": "Mantener en lugar fresco y seco",
                "color": "text-red-500"
            }
        ],
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Extracto de Fresas",
                "percentage": "20%",
                "description": "Antioxidantes y vitamina C natural",
                "origin": "Natural"
            },
            {
                "name": "Extracto de Arándanos",
                "percentage": "15%",
                "description": "Propiedades anti-edad y luminosidad",
                "origin": "Natural"
            },
            {
                "name": "Microesferas Naturales",
                "percentage": "10%",
                "description": "Exfoliación suave y efectiva",
                "origin": "Natural"
            },
            {
                "name": "Gel Base Natural",
                "percentage": "50%",
                "description": "Base hidratante del exfoliante",
                "origin": "Natural"
            },
            {
                "name": "Aceites Esenciales",
                "percentage": "5%",
                "description": "Fragancia natural de frutos rojos",
                "origin": "Natural"
            }
        ],
        "duration": "8 meses después de abierto",
        "material": "Gel exfoliante corporal",
        "colors": ["Rojo frambuesa"]
    }
];

// 🎨 CONFIGURACIÓN DE CATEGORÍAS
const categorias = [
    { id: "all", name: "Todos", icon: "fa-th-large" },
    { id: "Vela", name: "Velas", icon: "fa-fire" },
    { id: "Decoracion", name: "Decoración", icon: "fa-home" },
    { id: "Belleza", name: "Belleza", icon: "fa-spa" }
];

// 🌸 FRAGANCIAS POPULARES (para la sección especial)
const fraganciasPopulares = [
    { name: "Vainilla", emoji: "🍦", description: "Dulce y relajante" },
    { name: "Lavanda", emoji: "💜", description: "Calmante y floral" },
    { name: "Rosas Especiales", emoji: "🌹", description: "Romántico y elegante" },
    { name: "Canela", emoji: "🍂", description: "Cálido y acogedor" },
    { name: "Citricos", emoji: "🍊", description: "Fresco y energizante" }
];

// 🎭 TEMÁTICAS DISPONIBLES
const tematicasDisponibles = [
    { id: "Día de Muertos", name: "Día de Muertos", emoji: "🎃", season: "Otoño" },
    { id: "Navidad", name: "Navidad", emoji: "🎄", season: "Invierno" },
    { id: "Baby Shower", name: "Baby Shower", emoji: "👶", season: "Todo el año" },
    { id: "Boda", name: "Boda", emoji: "💒", season: "Todo el año" },
    { id: "San Valentín", name: "San Valentín", emoji: "💕", season: "Invierno" },
    { id: "Cumpleaños", name: "Cumpleaños", emoji: "🎂", season: "Todo el año" },
    { id: "Graduación", name: "Graduación", emoji: "🎓", season: "Primavera/Verano" },
    { id: "Aniversario", name: "Aniversario", emoji: "💍", season: "Todo el año" },
    { id: "Spa/Relajación", name: "Spa/Relajación", emoji: "🧘", season: "Todo el año" },
    { id: "Primavera", name: "Primavera", emoji: "🌸", season: "Primavera" },
    { id: "Verano", name: "Verano", emoji: "☀️", season: "Verano" },
    { id: "Otoño", name: "Otoño", emoji: "🍂", season: "Otoño" },
    { id: "Invierno", name: "Invierno", emoji: "❄️", season: "Invierno" }
];

// 📊 CONFIGURACIÓN GENERAL
const configuracion = {
    moneda: "MXN",
    simboloMoneda: "$",
    mostrarDescuentos: true,
    mostrarStock: false, // Cambiar a true si quieres mostrar disponibilidad
    animaciones: true
};

// 🔄 FUNCIÓN PARA OBTENER PRODUCTOS ACTUALES
function getCurrentProducts() {
    // Intentar cargar desde localStorage primero (datos del admin)
    const storedData = localStorage.getItem('adminProducts');
    if (storedData) {
        try {
            const parsed = JSON.parse(storedData);
            if (Array.isArray(parsed)) {
                console.log(`📦 Cargando ${parsed.length} productos desde localStorage (admin)`);
                return parsed;
            }
        } catch (error) {
            console.error('Error parsing stored products:', error);
            // Limpiar datos corruptos
            localStorage.removeItem('adminProducts');
        }
    }

    // Fallback a datos del archivo
    console.log(`📦 Cargando ${productosData.length} productos desde archivo base`);
    return [...productosData]; // Crear copia para evitar mutaciones
}

// 🚀 EXPORTAR DATOS
if (typeof window !== 'undefined') {
    // Obtener productos actuales (localStorage o archivo)
    const currentProducts = getCurrentProducts();

    window.productosData = currentProducts;
    window.categorias = categorias;
    window.fraganciasPopulares = fraganciasPopulares;
    window.configuracion = configuracion;
    window.getCurrentProducts = getCurrentProducts;

    console.log(`✅ Productos cargados: ${currentProducts.length} items`);
}

// Para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productosData,
        categorias,
        fraganciasPopulares,
        configuracion
    };
}