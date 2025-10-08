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
        "id": 8, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Exfoliante Antioxidante de Frutos Rojos", // 🍓 Título que evoca frescura y el beneficio clave (Antioxidante)
        "category": "Belleza",
        "description": "Revitaliza tu piel con la dulce y potente acción de los frutos rojos. Este exfoliante de origen natural utiliza **microgránulos de azúcar (o sal)** para una renovación suave, mientras que los extractos de **fresa y arándano** infunden a tu piel antioxidantes y Vitamina C. La textura en gel se enjuaga fácilmente, dejando la piel increíblemente lisa, radiante y con un aroma a verano.", // Descripción enfocada en la sensación, el mecanismo de exfoliación y los ingredientes activos.
        "image": "../images/gel-frutosrojos.jpeg", // 🖼️ Ruta de la imagen cargada
        "featured": false, // 🌟 Ideal para destacar en la sección corporal
        "new": true,
        "bestseller": false,
        "available": true,
        "type": "Origen Natural", // Fijo: "Origen Natural"
        "variants": [
            "Fórmula de Azúcar (Exfoliación suave)",
            "Fórmula de Sal Marina (Exfoliación profunda)"
        ],
        "sizes": [
            {
                "label": "50 gr",
                "price": 120
            }
        ],
        "characteristics": [ // ⭐ Características clave
            "Rico en antioxidantes y Vitamina C",
            "Exfolia y promueve la renovación celular",
            "Apto para todo el cuerpo",
            "Fórmula vegana con emolientes naturales"
        ],
        "care": [ // 🛡️ Instrucciones de uso
            "Aplicar sobre la piel húmeda con movimientos circulares suaves, concentrándose en codos y rodillas.",
            "Enjuagar abundantemente con agua tibia.",
            "Usar 2 a 3 veces por semana.",
            "Para mejores resultados, finalizar con una crema o aceite corporal hidratante."
        ],
        "ingredients": [
            "Microgránulos de azúcar refinada 45%",
            "Extracto de Fresa y Arándano 20%",
            "Aceite de Jojoba 10%",
            "Emolientes y humectantes naturales 25%"
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
    },
    {
        "id": 10, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Susurro de Mar", // 🐚 Título elegante y evocador
        "category": "Vela",
        "description": "Una pieza artesanal que captura la calma del océano. Modelada a mano con cera de soya natural, su forma de concha marina y su suave color rosa pálido la convierten en un objeto decorativo exquisito. Enciéndela para transformar cualquier espacio en un santuario costero, liberando una fragancia fresca y ligera que transporta a la orilla del mar.", // Descripción enfocada en la estética y la sensación
        "image": "../images/vela-susurromar.png", // 🖼️ Ruta de la imagen cargada
        "featured": false, // 🌟 La forma y el color la hacen ideal para destacar
        "new": false, // 🆕 Perfecto para lanzar como novedad
        "bestseller": false,
        "available": true,
        "type": "Parafina", // Cera de soya para una combustión limpia
        "fragrances": [ // Opciones frescas y ligeras
            "Flores Hawaianas",
            "Coco",
            "Menta",
            "Sandalo"
        ],
        "sizes": [ // Por ser una vela de figura, se recomienda un solo tamaño/precio
            {
                "label": "150 gr",
                "price": 100
            }
        ],
        "characteristics": [ // ⭐ Características que resaltan su valor
            "Diseño escultural único (Concha Pecten)",
            "Cera de soya 100% biodegradable",
            "Ideal como elemento decorativo",
            "Aroma ligero que evoca tranquilidad"
        ],
        "care": [ // 🛡️ Cuidado especial para velas de figura
            "Colocar siempre sobre una base o plato resistente al calor para recoger la cera.",
            "Recortar mecha a 5mm antes de cada uso.",
            "No quemar más de 2 horas seguidas.",
            "Mantener lejos de corrientes de aire."
        ],
        "ingredients": [
            "Cera de soya natural premium 90%",
            "Fragancia de grado cosmético 8%",
            "Colorante mineral natural 2%"
        ]
    },
    {
        "id": 11, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Jardín de Luz", // 🪴 Título que combina naturaleza y luz
        "category": "Vela",
        "description": "Una pequeña joya de diseño artesanal que rinde homenaje a la resistencia de la naturaleza. Elaborada con cera de parafina premium para un color vibrante y una fragancia potente, esta vela con forma de suculenta en maceta de barro es perfecta para decorar cualquier rincón de estilo rústico o minimalista. Un acento de color y aroma que nunca necesita riego.", // Descripción enfocada en el diseño, el material (parafina) y el estilo decorativo.
        "image": "../images/vela-jardinluz.png", // 🖼️ Ruta de la imagen cargada
        "featured": false, // 🌟 La originalidad la hace destacar
        "new": true, // 🆕 Ideal como novedad
        "bestseller": false,
        "available": true,
        "type": "Parafina", // Especificación: Parafina para color y aroma intenso
        "fragrances": [ // Opciones terrosas o herbales que combinan con el diseño
            "Sándalo",
            "Menta",
            "Manzana-Canela", // Un toque especiado
            "Rosas Especiales"
        ],
        "sizes": [
            {
                "label": "80 gr",
                "price": 180
            }
        ],
        "characteristics": [ // ⭐ Características clave
            "Diseño botánico realista (Suculenta)",
            "Elaborada con cera de parafina de alta calidad",
            "Maceta de barro artesanal reutilizable",
            "Proyección de aroma potente y duradera"
        ],
        "care": [ // 🛡️ Cuidado para velas de figura y parafina
            "Al primer uso, dejar encendida hasta que la cera se derrita uniformemente.",
            "Recortar mecha a 5mm antes de cada encendido.",
            "Mantener la cera libre de residuos y recortes de mecha.",
            "No quemar más de 3 horas seguidas."
        ],
        "ingredients": [
            "Cera de parafina refinada 90%",
            "Aceites aromáticos de alta concentración 8%",
            "Colorante mineral 2%"
        ]
    },
    {
        "id": 12, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Escultura del Poder", // 🖤 Título que evoca misterio y fuerza
        "category": "Vela",
        "description": "Una celebración de la forma femenina y el poder interior. Esta vela escultórica, elaborada con parafina premium para un acabado intenso en negro profundo, lleva un sutil toque de pan de oro que la convierte en una pieza de arte. Su fragancia es rica y embriagadora, perfecta para ceremonias personales, decoración audaz o para encender la intención.", // Descripción enfocada en el arte, el lujo y la intención.
        "image": "../images/vela-diosa.jpeg", // 🖼️ Ruta de la imagen cargada
        "featured": true, // 🌟 Pieza de declaración, ideal para destacar
        "new": true,
        "bestseller": false,
        "available": true,
        "type": "Parafina", // Especificación: Parafina para color y detalle
        "fragrances": [ // Opciones ricas, sensuales y misteriosas
            "Sándalo",
            "Vainilla",
            "Rosas Especiales",
            "Canela"
        ],
        "sizes": [
            {
                "label": "180 gr",
                "price": 80
            }
        ],
        "characteristics": [ // ⭐ Características clave
            "Diseño escultórico moderno ('Body Positive')",
            "Acabado con sutil pan de oro decorativo",
            "Cera de parafina de alta calidad para detalles nítidos",
            "Aroma intenso, ideal para ambientes grandes"
        ],
        "care": [ // 🛡️ Cuidado especial para velas de figura
            "Colocar siempre sobre una base plana y resistente al calor. La cera puede derramarse.",
            "Recortar mecha a 5mm antes de cada encendido.",
            "Quemar en sesiones cortas (máximo 1-2 horas) si se busca preservar la forma.",
            "Mantener alejada de los niños y mascotas."
        ],
        "ingredients": [
            "Cera de parafina de alta pureza 90%",
            "Aceites esenciales o fragancia concentrada 8%",
            "Pigmento negro mineral y pan de oro 2%"
        ]
    },
    {
        "id": 13, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Mascarilla Piña Tropical Radiante", // 🍍 Título elegante que resalta el ingrediente activo (Enzyme/Bromelina)
        "category": "Belleza",
        "description": "Despierta la piel apagada con el poder de la enzima de Piña (Bromelina), un exfoliante natural que disuelve suavemente las células muertas. Esta mascarilla cremosa, de origen natural, ilumina, unifica el tono y deja una sensación de frescura inmediata. Ideal para recuperar el resplandor y preparar la piel para la hidratación. El secreto de un cutis vibrante y liso.", // Descripción enfocada en el beneficio (luminosidad, exfoliación enzimática) y la sensación.
        "image": "../images/mascarilla-pina.jpeg", // 🖼️ Ruta de la imagen cargada
        "featured": false, // 🌟 Producto con gran potencial de venta
        "new": false,
        "bestseller": true,
        "available": true,
        "type": "Origen Natural", // Fijo: "Origen Natural"
        "variants": [ // Si no hay variantes, se puede dejar el array vacío o especificar un solo tipo
            "Para todo tipo de piel"
        ],
        "sizes": [
            {
                "label": "50 gr",
                "price": 110 // Precio acorde a un tratamiento facial
            }
        ],
        "characteristics": [ // ⭐ Características clave
            "Exfoliación enzimática suave (sin gránulos)",
            "Rica en Vitamina C y antioxidantes",
            "Aroma tropical natural y energizante",
            "Fórmula vegana y 95% de origen vegetal"
        ],
        "care": [ // 🛡️ Instrucciones de uso para una mascarilla enzimática
            "Aplicar una capa uniforme sobre el rostro limpio y seco, evitando el área de los ojos.",
            "Dejar actuar de 10 a 15 minutos.",
            "Enjuagar con agua tibia y secar a toques.",
            "Usar 1 a 2 veces por semana para resultados óptimos."
        ],
        "ingredients": [
            "Extracto de Piña (Ananas comosus) 20%",
            "Glicerina vegetal 15%",
            "Arcilla Rosa (Kaolin) 10%",
            "Aceites hidratantes y emolientes 55%"
        ]
    }, {
        "id": 14, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Santuario de Lavanda", // Título que resalta el efecto y el ingrediente
        "category": "Vela",
        "description": "El ritual esencial para la relajación profunda. Nuestra vela clásica combina cera de soya natural, de quema limpia y lenta, con el aceite esencial de **Lavanda** pura. Diseñada para disolver el estrés y preparar tu mente para el descanso. El frasco de cristal y la elegante tapa metálica preservan el aroma y decoran cualquier espacio con sofisticación.", // Descripción enfocada en el bienestar, el ingrediente terapéutico y el diseño premium.
        "image": "../images/vela-lavanda-clasica.png", // 🖼️ Ruta de la imagen cargada
        "featured": true, // 🌟 Clásico, ideal para destacar en la portada
        "new": false,
        "bestseller": true, // 🏆 Perfecto para catalogar como Bestseller
        "available": true,
        "type": "Soya", // Especificación: Cera de Soya
        "fragrances": [ // Opciones clásicas y relajantes
            "Lavanda",
            "Vainilla",
            "Sándalo"
        ],
        "sizes": [
            {
                "label": "50 gr",
                "price": 75
            }
        ],
        "characteristics": [ // ⭐ Características que resaltan su valor y calidad
            "Cera 100% de soya de combustión limpia",
            "Aroma terapéutico de Lavanda natural",
            "Hasta 35 horas de quema lenta",
            "Frasco de cristal reutilizable con tapa de lujo"
        ],
        "care": [ // 🛡️ Instrucciones de cuidado
            "Recortar mecha a 5mm antes de cada encendido.",
            "Permitir que la cera derretida llegue al borde del frasco en el primer uso (para evitar túneles).",
            "No quemar más de 4 horas seguidas.",
            "Mantener lejos de materiales inflamables y fuera del alcance de niños y mascotas."
        ],
        "ingredients": [
            "Cera de soya natural premium 88%",
            "Aceite esencial de Lavanda 10%",
            "Mecha de algodón orgánico 2%"
        ]
    },
    {
        "id": 18, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Mascarilla Carbón Detox", // 🌑 Título que sugiere misterio y desintoxicación
        "category": "Belleza",
        "description": "Una fórmula magistral para la piel que necesita un reinicio. Nuestro Velo de Medianoche utiliza el poder del **Carbón Activado** para atraer y absorber impurezas, toxinas y exceso de grasa de los poros. Formulada con arcillas purificantes, esta mascarilla en polvo se activa con agua, dejando la piel visiblemente más limpia, matificada y preparada para la hidratación. El ritual semanal esencial para un rostro fresco.", // Descripción enfocada en el beneficio (desintoxicación, limpieza profunda) y el uso (polvo que se activa con agua).
        "image": "../images/mascarilla-carbon.jpg", // 🖼️ Ruta de la imagen cargada
        "featured": false, // 🌟 Ideal para la línea de tratamientos intensivos
        "new": true,
        "bestseller": true,
        "available": true,
        "type": "Origen Natural", // Fijo: "Origen Natural"
        "variants": [
            "Piel Mixta a Grasa" // Orientar a tipos de piel que más se benefician
        ],
        "sizes": [
            {
                "label": "50 gr (Polvo Activo)",
                "price": 150 // Precio acorde a un tratamiento facial de lujo
            }
        ],
        "characteristics": [ // ⭐ Características clave
            "Poderosa acción desintoxicante",
            "Controla el exceso de sebo (efecto matificante)",
            "Minimiza la apariencia de poros",
            "Fórmula pura, sin conservantes (se activa al momento de usar)"
        ],
        "care": [ // 🛡️ Instrucciones de uso para una mascarilla en polvo
            "Mezclar 1 cucharadita de polvo con unas gotas de agua o hidrolato hasta formar una pasta suave.",
            "Aplicar sobre el rostro, evitando el área de los ojos.",
            "Dejar actuar de 8 a 10 minutos (no dejar secar por completo).",
            "Enjuagar con agua tibia."
        ],
        "ingredients": [
            "Carbón Activado de coco 30%",
            "Arcilla Bentonita y Caolín 50%",
            "Polvo de raíz de Malvavisco (Althaea officinalis) 10%",
            "Extractos botánicos secos 10%"
        ]
    },
    {
        "id": 19, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Cosecha Silvestre: Frutos del Bosque", // Título que evoca frescura y naturaleza
        "category": "Vela",
        "description": "Una explosión de aroma dulce y ácido que inunda tu espacio con vitalidad. Formulada con cera de **parafina** de alta calidad, esta vela asegura una **potente y rápida difusión** de la fragancia. Su envase con cierre hermético no solo es decorativo, sino que garantiza que el aroma se conserve intacto hasta el último encendido. Ideal para energizar tu hogar.", // Descripción enfocada en la intensidad del aroma (por ser parafina) y el beneficio (vitalidad).
        "image": "../images/frutos-bosque.png", // 🖼️ Ruta de la imagen cargada
        "featured": false,
        "new": true,
        "bestseller": false,
        "available": true,
        "type": "Parafina", // Especificación: Cera de Parafina
        "fragrances": [
            "Frutos Rojos",
            "Fresa",
            "Cereza"
        ],
        "sizes": [
            {
                "label": "80 gr (Jarra con Cierre)",
                "price": 140
            }
        ],
        "characteristics": [ // ⭐ Características que resaltan su valor
            "Proyección de aroma fuerte e inmediata",
            "Aroma dulce y energizante de Frutos Rojos",
            "Envase de cristal estilo vintage con cierre hermético",
            "Excelente relación calidad-precio"
        ],
        "care": [ // 🛡️ Instrucciones de cuidado
            "Recortar mecha a 5mm antes de cada encendido.",
            "No quemar más de 3 horas seguidas para evitar el sobrecalentamiento del frasco.",
            "Mantener el frasco abierto durante la quema."
        ],
        "ingredients": [
            "Cera de parafina refinada 90%",
            "Aceites aromáticos concentrados de Frutos Rojos 8%",
            "Colorante mineral y aditivos 2%"
        ]
    },
    {
        "id": 20, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Minino de Ofrenda: Vela Catrina Artesanal", // Título que une el elemento (gato) con la tradición (ofrenda/catrina)
        "category": "Vela",
        "description": "Una pieza de arte única para honrar a quienes ya no están. Esta vela escultórica, con forma de gato sentado y decorada a mano con el estilo vibrante de la calavera de azúcar, es el acento perfecto para tu ofrenda o decoración de temporada. Fabricada con **parafina** para capturar todos sus detalles, enciende esta flama para dar la bienvenida a las almas con calidez y celebración.", // Descripción enfocada en el uso tradicional (ofrenda), el arte y la celebración.
        "image": "../images/vela-gato.png", // 🖼️ Ruta de la imagen cargada
        "featured": false, // 🌟 Pieza de temporada, ideal para destacar durante el otoño
        "new": true,
        "bestseller": true,
        "available": true,
        "type": "Parafina", // Especificación: Parafina para color y detalles artísticos
        "fragrances": [ // Opciones que evocan tradición, tierra y festividad
            "Canela",
            "Manzana-Canela",
            "Copal (si lo manejas, si no, usar Sándalo)",
            "Chocolate (si lo manejas)"
        ],
        "sizes": [
            {
                "label": "120 gr",
                "price": 85
            }
        ],
        "characteristics": [ // ⭐ Características clave
            "Diseño escultural temático (Día de Muertos)",
            "Decorada y pintada artesanalmente",
            "Ideal como elemento central de la ofrenda",
            "Aroma cálido y especiado de temporada"
        ],
        "care": [ // 🛡️ Cuidado especial para velas de figura y decoración
            "Colocar sobre una base resistente al calor para recoger la cera.",
            "Si se quema, la cera se derretirá de forma irregular debido a su forma.",
            "Guardar en un lugar fresco para preservar los colores y la pintura.",
            "Es un artículo principalmente decorativo."
        ],
        "ingredients": [
            "Cera de parafina refinada 95%",
            "Aceites aromáticos (Especias) 4%",
            "Pintura no tóxica y pigmentos de color 1%"
        ]
    },
    {
        "id": 21, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Fantasma y Calabaza de Travesuras", // 👻 Título que evoca la festividad y el diseño dual
        "category": "Vela",
        "description": "¡Añade un toque lúdico y festivo a tu decoración de otoño! Esta encantadora vela combina la clásica calabaza de Halloween con un fantasma juguetón, capturando la alegría de la temporada. Fabricada con **parafina** para un color vibrante y detalles precisos, enciende esta pieza para crear un ambiente divertido y misterioso, perfecto para tus fiestas de Noche de Brujas.", // Descripción enfocada en la decoración, la festividad y el espíritu lúdico.
        "image": "../images/vela-halloween-fantasma.png", // 🖼️ Ruta de la imagen cargada
        "featured": true, // 🌟 Pieza de temporada, ideal para destacar en octubre
        "new": true,
        "bestseller": false,
        "available": true,
        "type": "Parafina", // Especificación: Parafina para detalle artístico
        "fragrances": [ // Opciones que evocan el otoño, dulces o especias
            "Manzana-Canela",
            "Vainilla",
            "Canela",
            "Frutos Rojos"
        ],
        "sizes": [
            {
                "label": "90 gr",
                "price": 70
            }
        ],
        "characteristics": [ // ⭐ Características clave
            "Diseño temático (Halloween / Otoño)",
            "Colores vibrantes y detalles esculpidos a mano",
            "Ideal como centro de mesa o acento decorativo",
            "Aroma acogedor y especiado de temporada"
        ],
        "care": [ // 🛡️ Cuidado especial para velas de figura
            "Colocar siempre sobre una superficie plana y resistente al calor.",
            "La forma puede alterarse al quemarse; es un artículo principalmente decorativo.",
            "Recortar mecha a 5mm antes de encender por primera vez.",
            "Mantener lejos de corrientes de aire y fuera del alcance de niños."
        ],
        "ingredients": [
            "Cera de parafina de alta calidad 95%",
            "Aceites aromáticos (Especias y Vainilla) 4%",
            "Pigmentos de color 1%"
        ]
    },
    {
        "id": 22, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Jack Calavera: Calavera Festiva", // 💀 Título que resalta la expresión y la temática
        "category": "Vela",
        "description": "Una calavera artística que celebra la alegría de la temporada. Con un diseño suave y una sonrisa inconfundible, esta vela de **parafina** es el toque de diseño que tu decoración de Halloween o Día de Muertos necesita. Su acabado liso y sus detalles en color negro intenso le dan un aire sofisticado y lúdico a la vez. ¡Enciende la celebración!", // Descripción enfocada en el diseño, la expresión y el uso decorativo.
        "image": "../images/vela-calavera-sonriente.png", // 🖼️ Ruta de la imagen cargada
        "featured": false, // 🌟 Pieza de temporada, ideal para destacar
        "new": true,
        "bestseller": false,
        "available": true,
        "type": "Parafina", // Especificación: Parafina para detalle y acabado liso
        "fragrances": [ // Opciones que evocan festividad y calidez
            "Manzana-Canela",
            "Canela",
            "Vainilla",
            "Sándalo"
        ],
        "sizes": [
            {
                "label": "110 gr",
                "price": 110
            }
        ],
        "characteristics": [ // ⭐ Características clave
            "Diseño minimalista y expresivo (Calavera)",
            "Ideal para decoración temática de otoño/invierno",
            "Cera de parafina de alta calidad para un acabado impecable",
            "Aroma cálido y acogedor"
        ],
        "care": [ // 🛡️ Cuidado especial para velas de figura
            "Colocar siempre sobre una base plana y resistente al calor. La cera puede derramarse.",
            "Si se quema, la forma se alterará; se recomienda como artículo principalmente decorativo.",
            "Recortar mecha a 5mm antes de encender por primera vez.",
            "Mantener lejos de fuentes de calor directo."
        ],
        "ingredients": [
            "Cera de parafina refinada 90%",
            "Aceites aromáticos concentrados 8%",
            "Pigmentos de color negro y blanco 2%"
        ]
    },
    {
        "id": 24, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Esencia Botánica: Pastilla de Rosas y Especias", // Título que resalta el uso (esencia) y los elementos decorativos
        "category": "Vela", // Se clasifica en velas por su uso aromático (pero es sin flama)
        "description": "Una tablilla aromática decorativa infundida con fragancias y embellecida con elementos botánicos, como pétalos secos y una flor de cera. Perfecta para aromatizar espacios pequeños (armarios, cajones o baños) sin necesidad de encender una flama. Elaborada con parafina de alta concentración, libera un aroma sutil y continuo que perdura por semanas. También es ideal como detalle de regalo.", // Descripción enfocada en el uso (aromatizar sin fuego), la decoración y la larga duración del aroma.
        "image": "../images/pastilla-aromatica.png", // 🖼️ Ruta de la imagen cargada
        "featured": false,
        "new": true,
        "bestseller": true,
        "available": true,
        "type": "Parafina", // Especificación: Parafina (para retener el aroma)
        "fragrances": [ // Opciones florales y especiadas que complementan la decoración
            "Rosas Especiales",
            "Lavanda",
            "Sándalo",
            "Vainilla"
        ],
        "sizes": [
            {
                "label": "50 gr",
                "price": 40
            }
        ],
        "characteristics": [ // ⭐ Características clave
            "Aromatiza sin fuego (No es para quemar)",
            "Decorada con elementos botánicos reales",
            "Ideal para armarios y espacios cerrados",
            "Libera aroma constante por 4-6 semanas"
        ],
        "care": [ // 🛡️ Instrucciones de cuidado
            "NO ENCIENDA esta pastilla. Es solo para ambientar.",
            "Colocar en un plato o cuenco pequeño para evitar que manche superficies por el aceite.",
            "Mantener fuera del sol directo y de fuentes de calor (esto puede derretirla).",
            "Si el aroma disminuye, raspar ligeramente la parte posterior."
        ],
        "ingredients": [
            "Cera de parafina de alta concentración 90%",
            "Aceites aromáticos (Rosas/Lavanda) 8%",
            "Elementos botánicos secos (pétalos, hojas) 2%"
        ]
    },
    {
        "id": 25, // ⚠️ CAMBIAR: Asegúrate de que sea el siguiente ID disponible
        "title": "Crema Corporal de Almendras", // Título que evoca lujo y suavidad (Seda)
        "category": "Belleza",
        "description": "Envuélvete en una capa de hidratación exquisita. Nuestra crema corporal utiliza el poder nutritivo del **Aceite de Almendras dulces** y mantecas naturales para restaurar la barrera de humedad de la piel. Su textura ligera y de rápida absorción nutre profundamente sin dejar sensación grasosa. Ideal para el uso diario, deja la piel suave como la seda y delicadamente perfumada.", // Descripción enfocada en la sensación (rápida absorción, no grasosa) y el ingrediente nutritivo.
        "image": "../images/crema-almendras-dosificador.png", // 🖼️ Ruta de la imagen cargada
        "featured": true, // 🌟 Producto esencial y de uso diario
        "new": true,
        "bestseller": true, // 🏆 Perfecto para catalogar como Bestseller
        "available": true,
        "type": "Origen Natural", // Fijo: "Origen Natural"
        "variants": [
            "Aroma Clásico Almendras"
        ],
        "sizes": [
            {
                "label": "100 ml (Dosificador Práctico)",
                "price": 220
            }
        ],
        "characteristics": [ // ⭐ Características clave
            "Alto poder nutritivo e hidratante",
            "Rápida absorción (Acabado no graso)",
            "Formato con dosificador higiénico",
            "Aroma suave y reconfortante a Almendras"
        ],
        "care": [ // 🛡️ Instrucciones de uso
            "Aplicar generosamente sobre la piel limpia y seca, preferentemente después del baño.",
            "Masajear con movimientos circulares hasta su completa absorción.",
            "Ideal para usar en las zonas más secas (piernas, codos)."
        ],
        "ingredients": [
            "Aceite de Almendras Dulces (Prunus dulcis) 30%",
            "Manteca de Karité (Butyrospermum parkii) 15%",
            "Glicerina vegetal 10%",
            "Emolientes e ingredientes naturales 45%"
        ]
    }

];

/**
 * ========================================
 * PLANTILLA DE ADMINISTRADOR - NUEVO PRODUCTO
 * ========================================
 * 
 * 📝 INSTRUCCIONES DE USO:
 * 1. Copia la plantilla de abajo
 * 2. Pégala ANTES de esta sección de comentarios
 * 3. Modifica los valores según tu nuevo producto
 * 4. Incrementa el ID al siguiente número disponible
 * 5. Agrega una coma (,) al final del objeto anterior
 * 
 * 🏷️ CATEGORÍAS DISPONIBLES: "Vela", "Belleza"
 * 🏷️ TIPOS DE VELA: "Soya", "Parafina"
 * 🏷️ TIPOS DE BELLEZA: "Origen Natural"
 * 
 * ========================================
 */

/*
// PLANTILLA PARA VELA - Copia desde aquí ⬇️
{
    "id": 10, // ⚠️ CAMBIAR: Incrementar al siguiente número
    "title": "Nombre del Producto", // ✏️ CAMBIAR: Título del producto
    "category": "Vela", // 🏷️ OPCIONES: "Vela" o "Belleza"
    "description": "Descripción detallada del producto que capture su esencia y beneficios únicos.", // ✏️ CAMBIAR: Descripción completa
    "image": "../images/nombre-imagen.jpg", // 🖼️ CAMBIAR: Ruta de la imagen
    "featured": false, // 🌟 CAMBIAR: true si es producto destacado
    "new": false, // 🆕 CAMBIAR: true si es producto nuevo
    "bestseller": false, // 🏆 CAMBIAR: true si es bestseller
    "available": true, // ✅ CAMBIAR: false si no está disponible
    "type": "Soya", // 🏷️ OPCIONES VELA: "Soya" o "Parafina"
    "fragrances": [ // 🌸 CAMBIAR: Seleccionar fragancias disponibles
        "Lavanda",
        "Vainilla",
        "Canela"
        // Opciones completas: "Rosas Especiales", "Lavanda", "Vainilla", "Canela", 
        // "Fresa", "Frutos Rojos", "Blue Berry", "Cereza", "Manzana-Canela", 
        // "Pitaya", "Flores Hawaianas", "Citricos", "Coco", "Menta", "Sandalo"
    ],
    "sizes": [ // 💰 CAMBIAR: Tamaños y precios
        {
            "label": "50 gr",
            "price": 80
        },
        {
            "label": "100 gr",
            "price": 120
        }
    ],
    "characteristics": [ // ⭐ CAMBIAR: Características principales
        "Característica 1",
        "Característica 2",
        "Característica 3",
        "Característica 4"
    ],
    "care": [ // 🛡️ CAMBIAR: Instrucciones de cuidado
        "Nunca dejar encendida sin supervisión",
        "Recortar mecha a 5mm antes de encender",
        "Instrucción específica 1",
        "Instrucción específica 2"
    ],
    "ingredients": [ // 🧪 CAMBIAR: Ingredientes y porcentajes
        "Cera de soya premium 85%",
        "Aceites esenciales naturales 10%",
        "Mecha de algodón 5%"
    ]
},
// PLANTILLA PARA VELA - Hasta aquí ⬆️

// PLANTILLA PARA BELLEZA - Copia desde aquí ⬇️
{
    "id": 11, // ⚠️ CAMBIAR: Incrementar al siguiente número
    "title": "Nombre del Producto de Belleza", // ✏️ CAMBIAR: Título del producto
    "category": "Belleza", // 🏷️ FIJO: "Belleza"
    "description": "Descripción detallada del producto de belleza, sus beneficios y propiedades.", // ✏️ CAMBIAR: Descripción completa
    "image": "../images/nombre-imagen.jpg", // 🖼️ CAMBIAR: Ruta de la imagen
    "featured": false, // 🌟 CAMBIAR: true si es producto destacado
    "new": false, // 🆕 CAMBIAR: true si es producto nuevo
    "bestseller": false, // 🏆 CAMBIAR: true si es bestseller
    "available": true, // ✅ CAMBIAR: false si no está disponible
    "type": "Origen Natural", // 🏷️ FIJO: "Origen Natural" para belleza
    "variants": [ // 🎨 CAMBIAR: Variantes del producto
        "Variante 1",
        "Variante 2",
        "Variante 3"
    ],
    "sizes": [ // 💰 CAMBIAR: Tamaños y precios
        {
            "label": "30 ml",
            "price": 180
        },
        {
            "label": "60 ml",
            "price": 320
        }
    ],
    "characteristics": [ // ⭐ CAMBIAR: Características principales
        "Característica 1",
        "Característica 2",
        "Característica 3",
        "Característica 4"
    ],
    "care": [ // 🛡️ CAMBIAR: Instrucciones de uso
        "Aplicar sobre piel limpia",
        "Usar movimientos suaves",
        "Instrucción específica 1",
        "Instrucción específica 2"
    ],
    "ingredients": [ // 🧪 CAMBIAR: Ingredientes y porcentajes
        "Ingrediente principal 25%",
        "Ingrediente secundario 20%",
        "Otros ingredientes 55%"
    ]
}
// PLANTILLA PARA BELLEZA - Hasta aquí ⬆️
*/

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productosData;
}

// Hacer disponible globalmente para el navegador
if (typeof window !== 'undefined') {
    window.productosData = productosData;
}