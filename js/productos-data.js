/**
* ========================================
* BASE DE DATOS DE PRODUCTOS
* Velas Starlight - Products Database
* ========================================
* 
* 📅 Generado: 2025-09-17 a las 2:20:23 p.m.
* 📊 Total productos: 18
* 🏷️ Categorías: Vela, Belleza
* 🌸 Fragancias únicas: 26
* 🎯 Temáticas: 1
* � PromocionAes activas: 5
* 
* ========================================
*/

// 🛍️ AQUÍ AGREGAS NUEVOS PRODUCTOS FÁCILMENTE
const productosData = [
    {
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
        "types": [
            "Soya",
            "Parafina"
        ],
        "sizes": [
            {
                "label": "140 gr",
                "price": 120
            }
        ],
        "fragrances": [
            "Pino Fresco",
            "Canela",
            "Manzana-Canela",
            "Menta",
            "Sándalo"
        ],
        "featured": true,
        "new": false,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
    },
    {
        "id": 4,
        "title": "Sonrisa Eterna",
        "category": "Vela",
        "description": "Ilumina tu espacio con un toque de originalidad y buen humor con nuestra Vela Sonrisa Eterna. Diseñada con una silueta impecable de muela, esta vela artesanal es el detalle perfecto para profesionales de la odontología, estudiantes, o cualquier persona que aprecie un diseño único y divertido. Colócala en tu consultorio, estudio o en tu hogar para añadir un punto focal inesperado que seguramente iniciará una conversación. Es el regalo ideal para graduaciones, aniversarios de práctica o simplemente para celebrar la pasión por una profesión que trae sonrisas al mundo. ",
        "image": "../images/vela-starlight-muela.jpeg",
        "types": [
            "Soya",
            "Parafina"
        ],
        "sizes": [
            {
                "label": "120 gr",
                "price": 75
            }
        ],
        "fragrances": [
            "Menta",
            "Eucalipto",
            "Vainilla",
            "Lavanda",
            "Frutos Rojos"
        ],
        "featured": false,
        "new": true,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
    },
    {
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
        "characteristics": [],
        "care": [],
        "theme": "Día de Muertos",
        "promotion2x1": true,
        "specialDiscount": null,
        "ingredients": [
            {
                "name": "Cera de Soya",
                "percentage": "100%",
                "description": "",
                "origin": "Natural"
            },
            {
                "name": "Fragancia de cempasúchil",
                "percentage": "5%",
                "description": "",
                "origin": "Sintético"
            }
        ]
    },
    {
        "id": 6,
        "title": "Vela de Soya",
        "category": "Vela",
        "description": " Sumérgete en un oasis de calma con nuestra Vela de Soya. Diseñada para aquellos que buscan serenidad y un toque de naturaleza en su hogar, esta vela artesanal es la esencia pura de la relajación. Elaborada con cera de soya de alta calidad y fragancias auténticas, cada encendido libera un aroma suave y reconfortante, ideal para aliviar el estrés, mejorar el sueño o simplemente crear un ambiente de paz. Su elegante envase de vidrio con tapa de madera complementa cualquier decoración, aportando calidez y un estilo minimalista.",
        "image": "../images/vela-soya.jpeg",
        "types": [
            "Soya"
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
        "featured": true,
        "new": true,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
    },
    {
        "id": 7,
        "title": "Vela de Parafina",
        "category": "Vela",
        "description": "Despierta tus sentidos con nuestra Vela de Parafina. Si buscas una fragancia que llene tu hogar de alegría y vitalidad, esta vela artesanal es la elección perfecta para ti. Elaborada con cera de parafina de alta calidad, esta vela ofrece una combustión constante y una liberación intensa de deliciosos aromas. El elegante envase de vidrio con tapa de madera complementa su diseño, haciéndola ideal para cualquier estilo decorativo.",
        "image": "../images/vela-parafina.jpeg",
        "types": [
            "Soya"
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
        "featured": true,
        "new": true,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
    },
    {
        "id": 8,
        "title": "Fantasma",
        "category": "Vela",
        "description": "Trae un toque de diversión y tradición a tus festividades con nuestra Vela Fantasma. Esta pieza artesanal, con su divertida y amigable forma de fantasma, es el detalle perfecto para celebrar el Día de Muertos y Halloween con un toque de encanto. Elaborada con cera de alta calidad, esta vela no solo ilumina, sino que también crea un ambiente mágico y acogedor. Su diseño único es ideal para decorar altares, mesas de fiesta o cualquier rincón de tu hogar que busque una chispa de alegría y originalidad. Es el regalo perfecto para quienes aman la temporada y valoran la creatividad artesanal.",
        "image": "../images/vela-fantasma.png",
        "types": [
            "Parafina"
        ],
        "sizes": [
            {
                "label": "50 gr",
                "price": 80
            }
        ],
        "fragrances": [
            "Cempasúchil",
            "Incienso",
            "Copal"
        ],
        "featured": false,
        "new": true,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
    },
    {
        "id": 9,
        "title": "Muñeco Calabaza",
        "category": "Vela",
        "description": "Celebra la magia de la temporada con una pieza única que fusiona dos íconos de las festividades: la calidez de la calabaza y la alegría de un muñeco. Nuestra Vela Muñeco Calabaza es una creación artesanal que llenará tu hogar de encanto y tradición. Con un diseño ingenioso y divertido, esta vela no solo ilumina, sino que se convierte en el centro de atención de cualquier decoración. Sus detalles, desde el simpático rostro hasta el pequeño sombrero de bruja, evocan la esencia del Día de Muertos y Halloween, mientras que el toque de color naranja y la ambientación festiva la hacen inolvidable.",
        "image": "../images/vela-calabza.png",
        "types": [
            "Parafina"
        ],
        "sizes": [
            {
                "label": "50 gr",
                "price": 80
            }
        ],
        "fragrances": [
            "Cempasúchil",
            "Incienso",
            "Copal"
        ],
        "featured": false,
        "new": true,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
    },
    {
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
        "characteristics": [],
        "care": [],
        "theme": "Día de Muertos",
        "promotion2x1": true,
        "specialDiscount": {
            "percentage": 0,
            "text": "Oferta especial"
        },
        "ingredients": [
            {
                "name": "Cera Parafina",
                "percentage": "100%",
                "description": "",
                "origin": "Sintético"
            },
            {
                "name": "Pintura Acrilica",
                "percentage": "10%",
                "description": "",
                "origin": "Natural"
            },
            {
                "name": "Francia",
                "percentage": "5%",
                "description": "",
                "origin": "Sintético"
            }
        ]
    },
    {
        "id": 11,
        "title": "Calaveras Encendidas",
        "category": "Vela",
        "description": "Celebra la vida, el recuerdo y la tradición con nuestras Calaveras Encendidas, un dúo de velas artesanales que rinde homenaje a la dualidad del Día de Muertos. Cada pieza, con su forma detallada de cráneo, está elaborada para simbolizar la alegría de recordar a quienes ya no están, transformando un motivo tradicional en un objeto de belleza y respeto. Elaboradas con cera de alta calidad y un acabado impecable, estas velas no solo iluminan tu espacio, sino que también cuentan una historia. Son el complemento perfecto para tu ofrenda, altar o como una pieza central en cualquier celebración.",
        "image": "../images/vela-doblecraneo.png",
        "types": [
            "Parafina"
        ],
        "sizes": [
            {
                "label": "40 gr",
                "price": 50
            }
        ],
        "fragrances": [
            "Cempasúchil",
            "Incienso",
            "Copal"
        ],
        "featured": false,
        "new": true,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
    },
    {
        "id": 12,
        "title": "Calavera de Chocolate",
        "category": "Vela",
        "description": "Honra la tradición del Día de Muertos con nuestra Calavera de Chocolate. Cada pieza artesanal es un vibrante tributo a la vida y el recuerdo, con un diseño que combina la festividad de los colores y la belleza de los detalles. Esta vela es más que un simple objeto decorativo: es un símbolo que evoca alegría, memoria y un profundo respeto por nuestros seres queridos. Perfecta para adornar tu ofrenda, crear un ambiente festivo en casa o para regalar un detalle lleno de significado y tradición.",
        "image": "../images/vela-calaverachocolate.png",
        "types": [
            "Parafina"
        ],
        "sizes": [
            {
                "label": "250 gr",
                "price": 90
            }
        ],
        "fragrances": [
            "Incienso",
            "Copal",
            "Cempasúchil",
            "Chocolate"
        ],
        "featured": true,
        "new": true,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
    },
    {
        "id": 13,
        "title": "Forma de Diosa",
        "category": "Vela",
        "description": "Rinde homenaje a la forma femenina con nuestra Vela Forma de Diosa. Esta pieza de arte, elegantemente esculpida en cera negra con sutiles destellos de pan de oro, es una poderosa declaración de belleza y empoderamiento. Más que una simple vela, es un recordatorio de la fuerza, la gracia y la divinidad que habita en cada una de nosotras. Perfecta para crear un ambiente de introspección, admiración y respeto en tu espacio. Su diseño minimalista y sofisticado la convierte en un punto focal único en cualquier habitación.",
        "image": "../images/vela-diosa.jpeg",
        "types": [
            "Parafina"
        ],
        "sizes": [
            {
                "label": "150 gr",
                "price": 65
            }
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
        "featured": true,
        "new": true,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
    },
    {
        "id": 14,
        "title": "Susurro de Mar",
        "category": "Vela",
        "description": "Deja que la brisa del océano invada tu hogar con nuestra Vela Susurro de Mar. Esta delicada vela artesanal, con su perfecta forma de concha en un suave tono rosa, es una invitación a la tranquilidad y la relajación. Colócala en tu baño, sala de estar o dormitorio para evocar la paz de la playa y el sonido de las olas. Es el regalo ideal para los amantes del mar o para quienes buscan un toque de calma en su decoración.",
        "image": "../images/vela-susurromar.png",
        "types": [
            "Parafina"
        ],
        "sizes": [
            {
                "label": "150 gr",
                "price": 60
            }
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
        "featured": false,
        "new": true,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
    },
    {
        "id": 15,
        "title": "Jardín de Luz",
        "category": "Vela",
        "description": "Añade un toque de naturaleza y serenidad a tu espacio con nuestra Vela Jardín de Luz. Con su diseño único en forma de suculenta, esta vela artesanal es perfecta para quienes aman la naturaleza y buscan un elemento decorativo que sea a la vez hermoso y relajante. El delicado recipiente de barro le da un toque rústico y orgánico, mientras que la llama suave ilumina sus pétalos de cera, creando una atmósfera de paz y tranquilidad. Es el detalle ideal para decorar tu escritorio, una mesa de noche o cualquier rincón que necesite un poco de luz y vida.",
        "image": "../images/vela-jardinluz.png",
        "types": [
            "Parafina"
        ],
        "sizes": [
            {
                "label": "75 gr",
                "price": 70
            }
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
        "featured": false,
        "new": false,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
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
        "specialDiscount": null
    },
    {
        "id": 17,
        "title": "Mascarilla de Piña",
        "category": "Belleza",
        "description": "(No apto para pieles sensibles) Transforma tu rutina de cuidado con nuestra Mascarilla de Piña Exfoliante. Inspirada en el brillo y frescura de esta fruta tropical, esta mascarilla es un verdadero despertar para tu piel, dejándola suave, luminosa y revitalizada.  Elaborada con extracto de piña natural, esta mascarilla utiliza las propiedades de la bromelina, una enzima natural, para exfoliar suavemente la piel, eliminando las células muertas y revelando una tez radiante. Su textura cremosa y el envase de color rosa pastel la convierten en un objeto de deseo en tu tocador, invitándote a un ritual de cuidado que es tan efectivo como placentero.",
        "image": "../images/mascarilla-pina.jpeg",
        "types": [
            "Origen Natural"
        ],
        "careType": "Facial",
        "sizes": [
            {
                "label": "De Bolsillo",
                "price": 55
            }
        ],
        "fragrances": [
            "Piña"
        ],
        "featured": true,
        "new": true,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
    },
    {
        "id": 18,
        "title": "Cosecha de Vitalidad",
        "category": "Belleza",
        "description": "Despierta la luminosidad de tu piel con nuestra Cosecha de Vitalidad. Este gel exfoliante, rico en la dulzura de los frutos rojos, es un festín de frescura y un ritual de belleza que revitaliza tu piel al instante. Elaborado con ingredientes naturales y un delicioso aroma frutal, este exfoliante elimina suavemente las impurezas y células muertas, dejando tu piel increíblemente suave, tersa y con un brillo saludable. Su textura, con partículas exfoliantes delicadas, es una experiencia sensorial que te transportará a un jardín lleno de fresas y arándanos.",
        "image": "../images/gel-frutosrojos.jpeg",
        "types": [
            "Origen Natural"
        ],
        "careType": "Corporal",
        "sizes": [
            {
                "label": "De Bolsillo",
                "price": 60
            }
        ],
        "fragrances": [
            "Frutos Rojos"
        ],
        "featured": true,
        "new": true,
        "available": true,
        "bestseller": false,
        "theme": null,
        "promotion2x1": false,
        "specialDiscount": null
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