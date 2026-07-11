import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Sliders, 
  Smartphone, 
  Info,
  Droplets,
  HardDrive,
  Activity,
  Award,
  Zap,
  Check,
  X,
  ZoomIn
} from 'lucide-react';
import { useLanguage } from './App';

interface ProductData {
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  icon: React.ComponentType<any>;
  badge: string;
  characteristics: string[];
  specs: { label: string; value: string }[];
  description: string;
  whySpecial: string;
  boxContents: string[];
}

const productCatalog: Record<string, { en: ProductData; es: ProductData }> = {
  "aquacore-v2": {
    en: {
      title: "Diivoo Module",
      subtitle: "Smart Wi-Fi Water Timer with Hub",
      tagline: "Smart irrigation timer with up to 20 separate watering schedules, Alexa & Google Home compatible.",
      category: "Controllers & Processors",
      icon: Cpu,
      badge: "Smart Irrigation",
      characteristics: [
        "Remote & Voice Control: Manage your irrigation from up to 60m away using the HomGar App via 2.4 GHz WiFi gateway",
        "Voice Assistant Integration: Fully compatible with Amazon Alexa and Google Assistant voice commands",
        "Custom Scheduled & Cyclic Modes: Program up to 20 separate watering schedules with fully adjustable duration and frequency",
        "Robust & Upgraded Build: 30% reinforced nylon construction withstands 7.25 to 116 psi with IPX5 waterproofing"
      ],
      specs: [
        { label: "Brand / Manufacturer", value: "Diivoo" },
        { label: "Model Number", value: "WT-03/WG02" },
        { label: "Style Name", value: "1-Outlet" },
        { label: "Material Construction", value: "30% Reinforced Nylon with UV-Coating & Acid Rustproof Metal" },
        { label: "Pressure Range Support", value: "7.25 psi to 116 psi Operations" },
        { label: "Waterproof Protection", value: "IPX5 Certified" },
        { label: "Product Dimensions", value: "14.7 x 12.4 x 5.1 cm" },
        { label: "Product Weight", value: "370 Grams" },
        { label: "ASIN", value: "B09PYGRM3H" }
      ],
      description: "The Diivoo Module integrates the Diivoo Smart Wi-Fi Water Timer to deliver effortless watering schedules for lawns and gardens. Connect it to the HomGar app through the included Wi-Fi Gateway to monitor real-time irrigation logs, trigger rain delays, or invoke hands-free Google Assistant and Alexa commands.",
      whySpecial: "Featuring a 30% reinforced nylon body with UV-coating and waterproof protection, the smart timer can handle extremely high pressures ranging from 7.25 psi up to 116 psi. With support for 20 autonomous watering schedules and cyclic loops, it avoids over-watering and automates water distribution tailored to precise seasonal constraints.",
      boxContents: ["Diivoo Smart Wi-Fi Water Timer (1-Outlet)", "Smart Wi-Fi Gateway Hub", "Quick-Connect Hose Fittings", "HomGar App Setup Guide & User Manual"]
    },
    es: {
      title: "Módulo Diivoo",
      subtitle: "Temporizador de agua WiFi inteligente con hub",
      tagline: "Temporizador inteligente con hub, hasta 20 horarios de riego separados, compatible con Alexa y Google Home.",
      category: "Controladores y Procesadores",
      icon: Cpu,
      badge: "Riego Inteligente",
      characteristics: [
        "Control remoto y por voz: Añade el temporizador a tu puerta de enlace WiFi mediante la aplicación HomGar y contrólalo hasta a 60 m",
        "Control de voz inteligente: Compatible con Alexa y Google Assistant para manejarlo con simples comandos de voz",
        "Modo de riego programado y cíclico: Programable con duración e inicio específico en hasta 20 horarios separados",
        "Estructura mejorada, confiable y resistente: Hecho de nylon reforzado al 30%, soporta presiones de 7.25 a 116 psi con clasificación IPX5"
      ],
      specs: [
        { label: "Marca", value: "Diivoo" },
        { label: "Modelo", value: "WT-03/WG02" },
        { label: "Nombre del Estilo", value: "1-Outlet" },
        { label: "Tipo de Material", value: "Nylon reforzado al 30% con revestimiento anti-UV y metal antioxidante a los ácidos" },
        { label: "Rango de Presión", value: "7.25 psi hasta 116 psi" },
        { label: "Impermeabilidad", value: "Clasificación IPX5 de resistencia al agua" },
        { label: "Dimensiones del Artículo", value: "14.7 x 12.4 x 5.1 cm" },
        { label: "Peso del Artículo", value: "370 Gramos" },
        { label: "ASIN", value: "B09PYGRM3H" }
      ],
      description: "El módulo Diivoo incorpora el temporizador de agua WiFi inteligente Diivoo con hub. Permite un control absoluto a través de la aplicación móvil HomGar, facilitando la programación automatizada de hasta 20 ciclos de irrigación. Integra comando por voz para delegar el cuidado del césped y jardín sin esfuerzo.",
      whySpecial: "Su diseño mejorado de nylon reforzado al 30% tolera variaciones extremas de presión (desde 7.25 psi hasta 116 psi) y cuenta con acabados anti-UV que lo hacen ideal para la intemperie. La función de retraso de lluvia evita el desperdicio al pausar ciclos automáticamente durante 24, 48 o 72 horas.",
      boxContents: ["Temporizador de Riego Inteligente Diivoo (1-Outlet)", "Puerta de enlace WiFi (Hub)", "Adaptadores rápidos de mangueras", "Guía interactiva de configuración de la app HomGar"]
    }
  },
  "sprinkler-array": {
    en: {
      title: "4 Sprinkler Array",
      subtitle: "High-Efficiency Kqcibz Spray System",
      tagline: "Applicable to green belts, flower beds, and lawn watering. Easy to handle and comfortable to use.",
      category: "Hydraulics & Outlets",
      icon: Droplets,
      badge: "Precision Flow",
      characteristics: [
        "Easy to handle and comfortable/convenient to use",
        "Applicable to green belts, flower beds, lawn watering, and nozzle atomization",
        "Corrosion-resistant custom high-durability plastic construction",
        "Engineered for agricultural, industrial, and decorative garden irrigation"
      ],
      specs: [
        { label: "Brand", value: "Kqcibz" },
        { label: "Manufacturer Part Number", value: "515907" },
        { label: "Flow Rate (Caudal)", value: "0.4 - 1.5 m³/h" },
        { label: "Size (D x H)", value: "15 x 1.94 cm" },
        { label: "Package Dimensions", value: "26 x 15 x 12 cm" },
        { label: "Color / Material", value: "Black / Plastic (900 Grams)" },
        { label: "ASIN", value: "B0CVTJGYLD" }
      ],
      description: "Our selected 4 Sprinkler Array features the robust Kqcibz high-efficiency irrigation nozzles. Designed with hard-wearing premium polymer plastics, these watering heads produce dual-mode atomization and micro-droplet flow. Perfect for flower beds, green belts, and lawns, they deliver stable fluid mechanics under variable water source quality.",
      whySpecial: "These premium nozzles bypass common wear issues, offering a flow rate from 0.4 to 1.5 m³/h per unit. They prevent clogging and deliver the optimal drop size to avoid soil runoff, protecting delicate roots while preserving landscaping health.",
      boxContents: ["10x Kqcibz High-Efficiency Watering Sprayers", "Silt-removal filter modules", "Quick-connect manual adapters", "Installation layout blueprint"]
    },
    es: {
      title: "Matriz de 4 Aspersores",
      subtitle: "Sistema de Aspersión Kqcibz de Alta Eficiencia",
      tagline: "Aplicable a cinturón verde, cama de flores y riego de césped y jardín. Fácil de manejar y cómodo de usar.",
      category: "Hidráulica y Difusión",
      icon: Droplets,
      badge: "Flujo de Precisión",
      characteristics: [
        "Kqcibz fácil de manejar y cómodo de usar",
        "Aplicable a cinturón verde, cama de flores, riego de césped y atomización de boquilla",
        "Fabricado en plástico duradero de alta resiliencia",
        "Ideal para riego agrícola, industrial y doméstico"
      ],
      specs: [
        { label: "Marca", value: "Kqcibz" },
        { label: "Número de Pieza del Fabricante", value: "515907" },
        { label: "Caudal", value: "0,4-1,5 m³/h" },
        { label: "Tamaño", value: "15 x 1,94 cm" },
        { label: "Dimensiones del Artículo", value: "26 x 15 x 12 cm" },
        { label: "Color / Material", value: "Negro / Plástico (900 Gramos)" },
        { label: "ASIN", value: "B0CVTJGYLD" }
      ],
      description: "La matriz de aspersores de alto rendimiento integra los espolvoreadores Kqcibz originales con un caudal regulable de 0,4 a 1,5 m³/h. Su construcción plástica de alta resistencia técnica asegura que las boquillas individuales sean inmunes a la acumulación de sedimentos e ideales ante variaciones químicas del agua.",
      whySpecial: "Evita la evaporación innecesaria gracias a una atomización graduada. Su rango de presión es idóneo tanto para camas de flores sensibles como para grandes áreas agrícolas.",
      boxContents: ["10x Espolvoreadores de Riego Kqcibz", "Mallas de filtrado de sedimentos", "Adaptadores mecánicos rápidos", "Guía de alineación de boquillas"]
    }
  },
  "infrastructure-installation": {
    en: {
      title: "Infrastructure Installation",
      subtitle: "Professional Grade Plumbing & Trenching",
      tagline: "Certified subterranean layout for heavy-duty long-term service.",
      category: "On-site Integration",
      icon: Layers,
      badge: "Full Service",
      characteristics: [
        "Heavy-duty underground plumbing architecture using premium HDPE line",
        "Sub-grade dual check backflow preventers meeting municipal safety standards",
        "Clean 12-inch mechanical surgical trenching with full sod restoration",
        "Moisture barrier shielding protects wiring runs from structural faults"
      ],
      specs: [
        { label: "Trench Line Depth", value: "12 Inches (30.5 cm) Sub-Grade" },
        { label: "Main Valve Spec", value: "Commercial Standard SDR-21 PVC" },
        { label: "Compliance Model", value: "Double Check Assembly (Backflow)" },
        { label: "Wire Harness", value: "Direct Burial UV-Shielded 18AWG" },
        { label: "Completion Time", value: "4 to 8 Hours on Average" }
      ],
      description: "Our complete physical installation transforms your modern system into an invisible asset. We deploy fully trained and licensed technical crews who map your lawn with sonar, dig cleanly with light tools, lay robust lines, connect high-precision solenoids, and seal soil layouts without leaving scars.",
      whySpecial: "Incorrectly scheduled runs or cheap plumbing fittings split under freeze stress or thermal changes. We stand behind our connections using double-walled master valve chambers and thick structural joints configured to resist winter soil moves.",
      boxContents: ["SDR-21 Commercial High-Density PVC Run", "Heavy-Duty Dual Check Backflow Valve Assembly", "Commercial Underground Valve Enclosure Box", "Precision Soil & Line Trenching Labor and Warranty"]
    },
    es: {
      title: "Instalación de Infraestructura",
      subtitle: "Plomería y Zanjado de Nivel Profesional",
      tagline: "Configuración subterránea con diseño certificado para resistir décadas de servicio.",
      category: "Integración In-situ",
      icon: Layers,
      badge: "Servicio Profesional Complete",
      characteristics: [
        "Tubería subterránea utilizando materiales de alta densidad SDR-21",
        "Válvulas antirretorno dobles para cumplir normativas de protección de agua",
        "Zanjado mecánico quirúrgico de 12 pulgadas de profundidad con restauración",
        "Canalizaciones protegidas con barrera física contra corrientes galvánicas"
      ],
      specs: [
        { label: "Profundidad de Zanja", value: "12 Pulgadas (30.5 cm) Subterráneo" },
        { label: "Especificación de Tubos", value: "PVC Alta Presión SDR-21" },
        { label: "Prevención de Retorno", value: "Certificación de Válvula Doble" },
        { label: "Arnés Eléctrico", value: "埋 18AWG Directo con Alambre Blindado UV" },
        { label: "Tiempo de Obra", value: "Promedio de 4 a 8 Horas" }
      ],
      description: "Nuestra instalación física completa integra la red hidráulica en su jardín de forma completamente invisible. Equipos de campo entrenados realizan un mapeo previo del subsuelo, excavan de manera limpia y compactan de nuevo para asegurar que su césped vuelva a su estado original.",
      whySpecial: "Las instalaciones deficientes colapsan ante cambios térmicos o raíces. Implementamos bridas flexibles de amortiguación en cada codo y cajas de válvulas reforzadas para aislar la red de tensiones del suelo.",
      boxContents: ["Tubería de Alta Densidad SDR-21 PVC", "Válvula de Caudal Antirretorno Certificada", "Caja Registradora Subterránea Blindada de Doble Pared", "Mano de Obra Autorizada de Ingeniería Hidráulica y Garantía Integral"]
    }
  },
  "standard-mobile-app": {
    en: {
      title: "Standard Mobile App",
      subtitle: "Seamless Localized Operations Control",
      tagline: "Modern intuitive interface rendering total garden authority directly in your hand.",
      category: "Software & Telemetry",
      icon: Smartphone,
      badge: "Cloud Connected",
      characteristics: [
        "Real-time instant status updates and single-tap valve switching",
        "Automated personalized schedules with intuitive step sliders",
        "Comprehensive localized soil moisture logging over 7-day intervals",
        "Secure over-the-air firmware update checks on startup"
      ],
      specs: [
        { label: "Operating System", value: "iOS 15.0+ / Android 10.0+" },
        { label: "Telemetry Delay", value: "Under 1.5 seconds local latency" },
        { label: "History Window", value: "7 Days Rolling Logs" },
        { label: "Encryption Mode", value: "AES-256 TLS 1.3 Communication" },
        { label: "Push Notification", value: "Enabled for critical water alerts" }
      ],
      description: "The Itsi companion application brings a beautifully reactive dashboard to your smartphone. With fluid animations, clean visualizations, and instantaneous Bluetooth/Wi-Fi response times, you can audit valve performance, schedule group sequences, and track actual soil moisture levels from your room or on the go.",
      whySpecial: "Unlike outdated utility software, our dashboard prioritizes clarity. We omit confusing acronyms, replacing them with live visual status representations, simple dial adjustments, and proactive recommendations tailored to your local environment.",
      boxContents: ["App Download Access Card with Unique Hardware Token", "Exclusive Lifetime Application Software License Key", "Step-by-Step Interactive App User Setup Guide", "Free Push-Notification Gateway Support"]
    },
    es: {
      title: "App Móvil Estándar",
      subtitle: "Control Modular y Telemetría al Instante",
      tagline: "Interfaz intuitiva para gobernar la hidratación de su jardín desde su bolsillo.",
      category: "Software y Control",
      icon: Smartphone,
      badge: "Conectado a la Nube",
      characteristics: [
        "Actualizaciones de estado en tiempo real y disparo manual directo",
        "Horarios automáticos optimizados mediante selectores fluidos",
        "Registros históricos de humedad con gráfica rodante de 7 días",
        "Actualizaciones automáticas vía WiFi del controlador (OTA)"
      ],
      specs: [
        { label: "Sistema Operativo", value: "iOS 15.0+ / Android 10.0+" },
        { label: "Latencia de Señal", value: "Menor a 1.5 Segundos en Red Local" },
        { label: "Historial de Datos", value: "7 Días de Registro Rodante" },
        { label: "Cifrado de Datos", value: "AES-256 sobre protocolo TLS 1.3" },
        { label: "Alertas Críticas", value: "Mensajes Push sobre Válvulas Abiertas" }
      ],
      description: "Nuestra aplicación móvil combina una interfaz fluida con controles inmediatos. Al conectarse en microsegundos con el hardware Diivoo, le permite supervisar sectores, programar ciclos periódicos o forzar un riego inmediato de manera intuitiva y visualmente atractiva.",
      whySpecial: "A diferencia de las aplicaciones industriales confusas, eliminamos terminología oscura de ingeniería y la reemplazamos con gráficos legibles, esferas de colores dinámicos y recomendaciones en su idioma local.",
      boxContents: ["Tarjeta de Registro y Licencia Digital", "Licencia de Por Vida para dos Dispositivos Móviles", "Manual Interactivo de Configuración Inicial", "Soporte Técnico de Notificaciones Integrado"]
    }
  },
  // FALLBACK PRO / ESTATE FEATURES FOR ULTIMATE INTEGRITY
  "pro-processor": {
    en: {
      title: "Enhanced Logic Processor",
      subtitle: "High-Core Edge Computing Engine",
      tagline: "More cores. Advanced predictive models. Complete local automation.",
      category: "Controllers & Processors",
      icon: Cpu,
      badge: "Pro Level Hardware",
      characteristics: [
        "Quad-Core ARM Cortex-M7 floating-point computing chip",
        "Autonomous matrix calculus models mapping humidity change speeds"
      ],
      specs: [
        { label: "Processor Cores", value: "Quad-Core ARM Cortex @ 400 MHz" },
        { label: "Valves Supported", value: "8 Zones (Expandable)" }
      ],
      description: "An advanced state-machine computer executing prediction equations directly on the physical module, bypassing external cloud computation during internet pauses.",
      whySpecial: "It executes math matrices in real time, calculating evapotranspiration coefficients on board.",
      boxContents: ["Enhanced Edge Logic Unit v3", "Technical Spec Papers"]
    },
    es: {
      title: "Procesador de Lógica Mejorado",
      subtitle: "Motor Informático de Vanguardia",
      tagline: "Mayor capacidad de cómputo local con modelos predictivos integrados.",
      category: "Controladores y Procesadores",
      icon: Cpu,
      badge: "Línea Pro",
      characteristics: [
        "Microprocesador Quad-Core ARM Cortex-M7 de alto desempeño",
        "Matriz local de cómputo para deducir coeficientes de humedad autónomamente"
      ],
      specs: [
        { label: "Núcleos de Cómputo", value: "Quad-Core @ 400 MHz" },
        { label: "Compatibilidad", value: "Hasta 8 Válvulas" }
      ],
       description: "Computadora avanzada que calcula modelos de evapotranspiración directamente sin conexión satelital.",
      whySpecial: "Evita depender de nubes externas procesando el clima biológico a nivel local.",
      boxContents: ["Unidad Pro de Lógica Avanzada v3", "Documentación del Hardware"]
    }
  },
  "custom-controller": {
    en: {
      title: "Your Custom Controller",
      subtitle: "Bespoke Logic Architecture",
      tagline: "Unlimit your hardware. Custom microcontrollers tuned precisely for unique layouts.",
      category: "Controllers & Processors",
      icon: Cpu,
      badge: "Tailored Series",
      characteristics: [
        "Specifically mapped zone count matching your actual property requirements",
        "Unique Wi-Fi and direct satellite fallback transceiver module support",
        "Bespoke solid-state high-voltage circuits preventing thermal throttling",
        "Premium anodized aluminum casing finished with micro-engraving"
      ],
      specs: [
        { label: "Hardware Config", value: "Fully custom zone terminals" },
        { label: "Casing Finish", value: "Satin-finished premium aluminum" },
        { label: "Solenoids Supported", value: "Custom capacity (Unlimited)" },
        { label: "Processor Class", value: "RISC-V High Precision Master Controller" }
      ],
      description: "A customized micro-electronic controller created by hand around your land parameters. We bypass traditional pre-configured zone structures to construct exactly the terminals and relays needed to govern your entire botanical system.",
      whySpecial: "Perfect gardens rarely fit inside predefined steps. This tailored logic engine enables us to map complex hydraulic schemes directly onto active terminals with custom protection features.",
      boxContents: ["Handcrafted custom controller unit", "Engineered wall mounting plates", "Personalized calibration guide", "Solder testing validation report"]
    },
    es: {
      title: "Controlador a Medida",
      subtitle: "Arquitectura de Lógica Personalizada",
      tagline: "Sin límites de hardware. Microcontroladores sintonizados para esquemas únicos.",
      category: "Controladores y Procesadores",
      icon: Cpu,
      badge: "Serie Personalizada",
      characteristics: [
        "Número de zonas diseñado específicamente para los límites de su predio",
        "Transceptor opcional con soporte de redundancia satelital directa",
        "Relés de estado sólido reforzados contra picos de voltaje térmico",
        "Gabinete de aluminio anodizado satinado de alta gama con grabado láser"
      ],
      specs: [
        { label: "Disposición Física", value: "Terminales de zona hechas a mano" },
        { label: "Acabado de Chasis", value: "Aluminio cepillado de grado premium" },
        { label: "Solenoides Soportados", value: "Capacidad modular (Sin Límite)" },
        { label: "Microcontrolador", value: "Arquitectura RISC-V de alta precisión" }
      ],
      description: "Un controlador físico creado a mano bajo especificaciones exactas para su jardín. Evitamos las limitaciones de zonas comerciales preestablecidas para que tenga exactamente la capacidad hidráulica que su flora necesita.",
      whySpecial: "Las grandes propiedades raramente se adaptan a configuraciones industriales predefinidas. Este procesador le confiere el control absoluto de sus aspersores con total fiabilidad.",
      boxContents: ["Gabinete de control a medida terminado a mano", "Placa de anclaje de acero inoxidable", "Planos esquemáticos del microcontrolador", "Certificado de pruebas mecánicas"]
    }
  },
  "tailored-sprinklers": {
    en: {
      title: "Tailored Sprinkler Count",
      subtitle: "Surgically Arranged Nozzles",
      tagline: "Exactly the right amount of nozzles to achieve total soil equilibrium.",
      category: "Hydraulics & Outlets",
      icon: Sliders,
      badge: "Custom Placements",
      characteristics: [
        "Optimized count of fine rotors matching actual slope topology",
        "Dynamic precipitation rate adjusted for specific plant categories",
        "No waste layout ensuring zero runoff into concrete structures",
        "Heavy-duty stainless steel spring retractors"
      ],
      specs: [
        { label: "Nozzle Density", value: "Derived specifically for your soil curves" },
        { label: "Retraction Force", value: "Premium 304 Stainless Steel Spring" },
        { label: "Angle Flexibility", value: "True 0 to 360 Degree Continuous Tuning" },
        { label: "Inlet Fitting", value: "Varying 1/2 inch to 3/4 inch adapters Included" }
      ],
      description: "A modular, hand-picked selection of high-pressure fluid outlets calibrated to create a unified precipitation index. Instead of forcing your landscape into default packages, we supply the exact quantities and spray styles required by your botanist.",
      whySpecial: "Standard kits either leave parts dry or flood the edges. A tailored sprinkler scheme adapts to the gradient curves of your hillsides, trees, and paths, protecting roots while saving significant water.",
      boxContents: ["Bespoke mix of rotary and misting spray nozzles", "Adjustment tool key ring", "Silt-removal filter accessories", "Zoned placement mapping blueprint"]
    },
    es: {
      title: "Cantidad de Aspersores Adaptada",
      subtitle: "Boquillas con Distribución Quirúrgica",
      tagline: "La cantidad justa de boquillas para alcanzar la máxima homogeneidad del suelo.",
      category: "Hidráulica y Difusión",
      icon: Sliders,
      badge: "Sectores Adaptados",
      characteristics: [
        "Selección exacta de rotores según la topografía de su terreno",
        "Caudales equilibrados según los requerimientos fitosanitarios de cada planta",
        "Distribución perimetral optimizada para evitar escurrimientos en concreto",
        "Deflector de acero inoxidable de ajuste micrométrico"
      ],
      specs: [
        { label: "Densidad de Aspersión", value: "Calculada según la tasa de absorción" },
        { label: "Material de Retracción", value: "Resorte reforzado de acero inoxidable 304" },
        { label: "Ajuste de Arco", value: "De 0 a 360 grados de giro continuo" },
        { label: "Tomas de Entrada", value: "Adaptadores de 1/2 y 3/4 de pulgada" }
      ],
      description: "Una cantidad personalizada de boquillas y difusores seleccionada por ingenieros hidráulicos. En lugar de limitarse a packs estáticos, reciba una cobertura fluida que protege las flores delicadas sin descuidar el césped extenso.",
      whySpecial: "Los paquetes cerrados suelen dejar zonas secas o inundar el pavimento. Una matriz adaptada respeta la vegetación ornamental logrando una eficiencia hídrica soberbia.",
      boxContents: ["Combinación personalizada de difusores rotativos y fijos", "Herramientas de reglaje de radio y arco", "Filtros de grava antibloqueo", "Mapa hidráulico digitalizado de colocación"]
    }
  },
  "bespoke-fit": {
    en: {
      title: "Aesthetic Bespoke Fit",
      subtitle: "Pristine Minimalist Outflow",
      tagline: "Zero mechanical noise. Seamless blend with elite landscape designs.",
      category: "On-site Integration",
      icon: Award,
      badge: "Bespoke Grade",
      characteristics: [
        "Fully recessed flush-to-sod casings that completely disappear when off",
        "Custom-shaded hardware matching natural soil and gravel pathways",
        "Whisper-quiet pneumatic popup operations avoiding garden disruption",
        "Corrosion resistance in extreme water acidity scales"
      ],
      specs: [
        { label: "Elevation Style", value: "Flush-mount absolute concealment" },
        { label: "Mechanical Sound", value: "Under 15 dBA during full deployment" },
        { label: "External Shade", value: "Bespoke Forest Green / Earthy Stone" },
        { label: "Joint Hardness", value: "Reinforced military polymer casing" }
      ],
      description: "The Bespoke Fit system makes irrigation completely invisible until active. Every casing, valve box, and head cover is customized to seamlessly blend into elite high-end landscapes, botanical collections, and private golf lawns.",
      whySpecial: "Most default components feature bright or black plastics that disrupt aesthetic harmony. Our bespoke casings integrate directly into the terrain, maintaining the pure focus of your garden.",
      boxContents: ["Architectural flush-mount heads", "Camouflaged valve enclosure caps", "Specialized low-impact soil sleeves", "Pristine alignment validation tools"]
    },
    es: {
      title: "Ajuste Estético Personalizado",
      subtitle: "Integración Sutil y Sofisticada",
      tagline: "Sin ruido visual ni sonoro. Fusión absoluta con el paisajismo de élite.",
      category: "Integración In-situ",
      icon: Award,
      badge: "Gama Bespoke",
      characteristics: [
        "Carcasas empotradas a ras de suelo que desaparecen por completo al apagarse",
        "Tapas de conectores entintadas en tonalidades tierra para camuflaje total",
        "Pistones neumáticos de elevación ultrasilenciosos",
        "Elevadísima resiliencia química frente a fertilizantes y dureza del agua"
      ],
      specs: [
        { label: "Tipo de Acople", value: "Montaje oculto de bajo perfil" },
        { label: "Nivel de Sonido", value: "Menor a 15 dBA en despliegue completo" },
        { label: "Gama Cromática", value: "Verde Bosque / Piedra / Arena" },
        { label: "Carcasa Externa", value: "Polímero militar reforzado con fibra de vidrio" }
      ],
      description: "El sistema de ajuste estético superior oculta todo el hardware mecánico debajo de la superficie. Cada aspersor sale suavemente cuando se inicia el programa y vuelve a su posición de descanso oculta sin afectar la línea visual de su césped.",
      whySpecial: "Los aspersores comunes degradan el diseño paisajístico con plásticos invasivos. Nuestra línea Bespoke preserva el diseño vegetal original de forma armónica.",
      boxContents: ["Boquillas arquitectónicas de embutir", "Tapas camufladas para cámaras de paso", "Camisas de sujeción para raíces de césped", "Guías ópticas de nivelación estética"]
    }
  },
  "custom-code": {
    en: {
      title: "Priority Setup & Custom Code",
      subtitle: "Bespoke API & Cloud Automation",
      tagline: "Tailored smart routines engineered dynamically by professional developers.",
      category: "Software & Telemetry",
      icon: Zap,
      badge: "Elite Access",
      characteristics: [
        "Unique customized scripts mapping actual water rights and seasonal restrictions",
        "Direct integration with proprietary enterprise platforms or garden databases",
        "VIP dedicated assistance from system coding specialists",
        "Ongoing dynamic routine adjustments over a 12-month period"
      ],
      specs: [
        { label: "Developer Time Area", value: "Direct engineering contact (Slack & Phone)" },
        { label: "Software Alliance", value: "Open Webhooks & REST API support" },
        { label: "Calibration Speed", value: "24-hour turnaround on code adjustments" },
        { label: "Integration Class", value: "Private cloud routing and priority logs" }
      ],
      description: "Get more than standard apps. Our elite software architects work directly with your garden managers to implement custom routines, parse private moisture databases, or hook up your local weather stations directly to secure webhooks.",
      whySpecial: "Unlike flat schedules, custom integrations accommodate complex factors like municipal water restrictions and microclimates. We write personalized code that keeps your garden thriving.",
      boxContents: ["1-Year Dedicated Developer Consultation Voucher", "Custom Webhooks Integration License", "Priority Cloud Log Storage Pack", "Private API Key & Integration Documentation Paper"]
    },
    es: {
      title: "Instalación de Código y Soporte Prioritario",
      subtitle: "Automatización de Código y API Premium",
      tagline: "Rutinas inteligentes programadas a la medida por arquitectos de software.",
      category: "Software y Control",
      icon: Zap,
      badge: "Acceso Élite",
      characteristics: [
        "Scripts de riego adaptados a vedas locales y derechos de agua municipales",
        "Integración directa con sistemas domóticos personalizados o bases de datos",
        "Línea de comunicación de soporte directo con desarrolladores de software",
        "Ajustes periódicos de rutinas dinámicas gratis durante un año"
      ],
      specs: [
        { label: "Acceso de Ingeniería", value: "Contacto directo vía Slack y Teléfono" },
        { label: "Protocolos Soportados", value: "Webhooks dedicados, REST API y MQTT" },
        { label: "Tiempo de Respuesta", value: "Menor a 24 horas para ajustes lógicos" },
        { label: "Alojamiento de Datos", value: "Historial ilimitado en servidor dedicado" }
      ],
      description: "Vaya más allá de los temporizadores con un servicio de desarrollo a la medida. Nuestros ingenieros configuran webhooks para leer datos específicos de sensores de pozo, o escriben integraciones inteligentes para su plataforma local.",
      whySpecial: "Las aplicaciones sencillas ignoran normativas de riego estatales o microclimas. Programamos código propietario que cuida su propiedad de forma inteligente y automatizada.",
      boxContents: ["Voucher de un año de consultoría técnica de desarrollo", "Licencia para integraciones y Webhooks", "Acceso priorizado a nube de telemetría de alta frecuencia", "Kit de llaves API y manual de desarrollo"]
    }
  }
};

const defaultProduct: ProductData = {
  title: "Premium Irrigation Asset",
  subtitle: "High-performance System Component",
  tagline: "Pristine execution engineering healthy landscapes with zero fluid waste.",
  category: "Itsi System Component",
  icon: Award,
  badge: "Engineering Spec",
  characteristics: [
    "Surgically crafted component engineered for exact landscape irrigation",
    "Continuous durability tested under high thermal and chemical changes",
    "Universal interface links beautifully with modern control units",
    "Protected by standard industry technical coverage and quality guarantees"
  ],
  specs: [
    { label: "System Alliance", value: "Itsi Ecosystem Compatible" },
    { label: "Material Spec", value: "Corrosion-proof Reinforced Polymer" },
    { label: "Testing Rating", value: "Standard ISO 9001 Audited Production" },
    { label: "Regulatory Group", value: "ASAE Certified Resource Allocation" }
  ],
  description: "A professional system asset configured to sustain absolute horticultural vitality. Every corner utilizes verified tolerances to operate at extreme energy and pressure limits, giving homeowners an elegant irrigation tool.",
  whySpecial: "Itsi components prioritize absolute integration, forming a unified mesh network that monitors and responds to water levels dynamically, guaranteeing pristine resource conservation.",
  boxContents: ["Itsi System Component", "Security Placement Spacers", "Warranty Document & Installation Setup Paper"]
};

const sprinklerImages = [
  "https://m.media-amazon.com/images/I/711F4zKXPSL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81Jn6cb-aUL._AC_SL1500_.jpg",
  "/src/assets/images/sprinkler_active_spray_1780029383435.png"
];

const sprinklerCaptionsEn = [
  "Fully Extended Kqcibz High-Riser Sprinkler Models",
  "Four Kqcibz Compact Closed Sprinkler Housings",
  "Uniform Fine Mist Sprayer In Active Deployment"
];

const sprinklerCaptionsEs = [
  "Modelos con Elevación Completa Kqcibz de Alto Perfil",
  "Cuerpos de Aspersores Kqcibz Cerrados de Bajo Perfil",
  "Aspersor de Riego Activo con Atomización Graduada"
];

const diivooImages = [
  "https://m.media-amazon.com/images/I/613qtyohhRL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/71PjYCzPz2L._AC_SX679_.jpg"
];

const diivooCaptionsEn = [
  "Diivoo Smart Wi-Fi Water Timer & Gateway Hub Kit",
  "Smart Timer Connected to Outdoor Brass Garden Faucet"
];

const diivooCaptionsEs = [
  "Kit de Temporizador de Agua Diivoo y Puerta de Enlace WiFi",
  "Temporizador Inteligente Conectado a un Grifo de Jardín"
];

const infrastructureImages = [
  "/src/assets/images/planner_banner_mockup_1780280684941.png",
  "/src/assets/images/lawn_canvas_grid_1780280702250.png",
  "/src/assets/images/pressure_metrics_dashboard_1780280718966.png"
];

const infrastructureCaptionsEn = [
  "Lawn Irrigation Planner - 100% DIY Layout Blueprint & Walkthrough",
  "Lawn Blueprint Design Canvas - 2D Grid turf with interactive sprinkler zones and heads",
  "Performance Analytics Dashboard - Live water pressure GPM, coverage index & flow test controls"
];

const infrastructureCaptionsEs = [
  "Planificador de Riego de Jardín - Plano de diseño interactivo 100% DIY",
  "Lienzo de Diseño - Cuadrícula de terreno 2D interactiva con zonas de aspersores y caudal",
  "Panel de Métricas de Rendimiento - Presión de agua GPM, índice de cobertura y controles en vivo"
];

const mobileAppImages = [
  "/src/assets/images/Screenshot_20260530_124017_SmartLife.jpeg",
  "/src/assets/images/Screenshot_20260530_124002_SmartLife.jpeg"
];

const mobileAppCaptionsEn = [
  "Active Valve Controller - Custom live manual spray, timer countdown, and smart valve analytics",
  "Smart Home Favorites Dashboard - Connected device list, outdoor metrics, and bluetooth valve controller shortcuts"
];

const mobileAppCaptionsEs = [
  "Controlador de Válvula Activo - Temporizador de riego independiente, cuenta regresiva en vivo y estadísticas",
  "Panel de Favoritos de Casa Inteligente - Vista de dispositivos vinculados, telemetría de humedad y accesos rápidos"
];

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'characteristics' | 'specs'>('overview');
  const [testWater, setTestWater] = useState(false);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [zoomCaption, setZoomCaption] = useState<string>('');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openZoom = (img: string, desc: string) => {
    setZoomImage(img);
    setZoomCaption(desc);
  };

  const isSprinkler = productId === 'sprinkler-array';
  const isAquaCore = productId === 'aquacore-v2';
  const isInfrastructure = productId === 'infrastructure-installation';
  const isMobileApp = productId === 'standard-mobile-app';

  const currentImages = isSprinkler 
    ? sprinklerImages 
    : isAquaCore 
      ? diivooImages 
      : isInfrastructure
        ? infrastructureImages
        : isMobileApp
          ? mobileAppImages
          : null;

  const currentCaptionsEn = isSprinkler 
    ? sprinklerCaptionsEn 
    : isAquaCore 
      ? diivooCaptionsEn 
      : isInfrastructure
        ? infrastructureCaptionsEn
        : isMobileApp
          ? mobileAppCaptionsEn
          : null;

  const currentCaptionsEs = isSprinkler 
    ? sprinklerCaptionsEs 
    : isAquaCore 
      ? diivooCaptionsEs 
      : isInfrastructure
        ? infrastructureCaptionsEs
        : isMobileApp
          ? mobileAppCaptionsEs
          : null;

  const handleBack = () => {
    navigate(-1);
  };

  // Retrieve matching catalog entry or compile a fallback based on the normalized name
  const entry = productCatalog[productId || ""] || {
    en: { 
      ...defaultProduct, 
      title: (productId || "Product Asset").replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) 
    },
    es: { 
      ...defaultProduct, 
      title: (productId || "Componente del Sistema").replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) 
    }
  };

  const p = language === 'en' ? entry.en : entry.es;
  const ProductIcon = p.icon || Info;

  return (
    <main className="pt-32 pb-24 bg-background-paper min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Back navigation Row */}
        <button 
          onClick={handleBack} 
          className="inline-flex items-center gap-2 text-primary-teal font-black uppercase tracking-widest text-xs mb-10 group hover:gap-3 transition-all"
        >
          <ArrowLeft size={16} /> 
          <span>{language === 'en' ? 'Back to System Packages' : 'Volver a Planes'}</span>
        </button>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Asset Display */}
          <div className="lg:col-span-5 space-y-6">
            {currentImages ? (
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-surface-container rounded-[2.5rem] p-4 border border-surface-container/60 shadow-xl relative overflow-hidden flex flex-col items-center justify-between min-h-[380px] group"
                >
                  <div className="absolute top-6 left-6 z-10">
                    <span className="px-3 py-1 bg-primary-teal text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                      {p.badge}
                    </span>
                  </div>

                  {/* Decorative radial gradients background */}
                  <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-primary-teal/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -left-16 -top-16 w-56 h-56 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Active Sprinkler Image Frame */}
                  <div className="w-full h-64 relative z-10 flex items-center justify-center overflow-hidden rounded-2xl bg-white mt-8 cursor-zoom-in group/mainimg">
                    <motion.img 
                      key={activeImgIdx}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      src={currentImages[activeImgIdx]} 
                      alt={language === 'en' ? currentCaptionsEn[activeImgIdx] : currentCaptionsEs[activeImgIdx]}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain p-2 hover:scale-[1.08] transition-transform duration-500"
                      onDoubleClick={() => openZoom(currentImages[activeImgIdx], language === 'en' ? currentCaptionsEn[activeImgIdx] : currentCaptionsEs[activeImgIdx])}
                      title={language === 'en' ? 'Double click to zoom' : 'Doble clic para ampliar'}
                    />
                  </div>

                  {/* Active Slide Caption */}
                  <div className="w-full text-center relative z-10 mt-4 px-2">
                    <p className="text-[10px] font-black tracking-widest uppercase text-primary-teal mb-1">
                      {language === 'en' ? `Spec Image ${activeImgIdx + 1} of ${currentImages.length}` : `Imagen de Ficha ${activeImgIdx + 1} de ${currentImages.length}`}
                    </p>
                    <p className="text-xs text-on-surface font-semibold line-clamp-2 min-h-[32px]">
                      {language === 'en' ? currentCaptionsEn[activeImgIdx] : currentCaptionsEs[activeImgIdx]}
                    </p>
                    <div className="text-[9px] mt-1 text-primary-teal/70 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                      <span>🔍 {language === 'en' ? 'Double-click image to zoom' : 'Doble clic para ampliar'}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Thumbnails row */}
                <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${currentImages.length}, minmax(0, 1fr))` }}>
                  {currentImages.map((img, idx) => (
                    <button
                      key={idx}
                      id={`thumbnail-zoom-${idx}`}
                      onClick={() => setActiveImgIdx(idx)}
                      onDoubleClick={() => openZoom(img, language === 'en' ? currentCaptionsEn[idx] : currentCaptionsEs[idx])}
                      title={language === 'en' ? 'Double click to zoom directly' : 'Doble clic para ampliar directamente'}
                      className={`relative aspect-square rounded-2xl border-2 overflow-hidden bg-white p-1 hover:brightness-95 transition-all cursor-zoom-in ${
                        activeImgIdx === idx ? 'border-primary-teal ring-2 ring-primary-teal/20 scale-95' : 'border-surface-container'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`thumbnail ${idx}`} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-surface-container rounded-[2.5rem] p-8 border border-surface-container/60 shadow-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[350px]"
              >
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-primary-teal/10 text-primary-teal rounded-full text-[10px] font-black uppercase tracking-widest">
                    {p.badge}
                  </span>
                </div>

                {/* Decorative radial gradients background */}
                <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-primary-teal/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-16 -top-16 w-56 h-56 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Interactive Dynamic Graphic */}
                <motion.div 
                  animate={testWater ? { y: [0, -12, 0] } : { y: 0 }}
                  transition={{ duration: 0.6, repeat: testWater ? Infinity : 0, repeatType: "reverse" }}
                  className="w-32 h-32 bg-white dark:bg-slate-900 rounded-[2rem] border border-surface-container/60 shadow-lg flex items-center justify-center relative z-10"
                >
                  <div className="p-6 bg-teal-50 dark:bg-teal-950/40 rounded-2xl">
                    <ProductIcon className="text-primary-teal animate-pulse" size={48} />
                  </div>
                </motion.div>

                <div className="mt-8 text-center relative z-10">
                  <p className="text-[10px] font-black tracking-widest uppercase text-on-surface-variant mb-1">{p.category}</p>
                  <h4 className="font-display text-xl font-bold">{p.title}</h4>
                  <p className="text-xs text-on-surface-variant font-medium mt-1">{p.subtitle}</p>
                </div>

                {/* Interactive test trigger to delight users */}
                <button 
                  onClick={() => {
                    setTestWater(true);
                    setTimeout(() => setTestWater(false), 3000);
                  }}
                  disabled={testWater}
                  className="mt-6 px-4 py-2 bg-background-paper hover:bg-surface-container text-xs font-bold text-primary-teal rounded-xl border border-surface-container/80 shadow-sm transition-all flex items-center gap-2 relative z-10"
                >
                  <Zap size={12} className={testWater ? 'text-amber-500 animate-bounce' : ''} />
                  <span>{testWater ? (language === 'en' ? 'Simulating Active...' : 'Simulando Activo...') : (language === 'en' ? 'Diagnostics Test' : 'Test Diagnóstico')}</span>
                </button>
              </motion.div>
            )}

            {/* Quick Specs Overview list */}
            <div className="bg-surface-container/40 rounded-3xl p-6 border border-surface-container/40">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2">
                <ShieldCheck size={14} className="text-secondary-green" />
                <span>{language === 'en' ? 'Certified Integration Specs' : 'Normas de Integración'}</span>
              </h5>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-background-paper/60 rounded-2xl border border-surface-container/40">
                  <p className="text-[9px] font-bold uppercase text-on-surface-variant tracking-wider">{language === 'en' ? 'Warranty' : 'Garantía'}</p>
                  <p className="text-xs font-black text-on-surface mt-1">{language === 'en' ? '3 Years Premium' : '3 Años Premium'}</p>
                </div>
                <div className="p-4 bg-background-paper/60 rounded-2xl border border-surface-container/40">
                  <p className="text-[9px] font-bold uppercase text-on-surface-variant tracking-wider">{language === 'en' ? 'Setup' : 'Montaje'}</p>
                  <p className="text-xs font-black text-on-surface mt-1">{language === 'en' ? 'Certified Crew' : 'Técnico Homologado'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full Specifications and descriptions */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="font-label text-primary-teal uppercase tracking-[0.2em] text-[10px] font-black bg-teal-50 dark:bg-teal-950/40 px-3 py-1 rounded-full inline-block mb-3">
                {p.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-on-surface">{p.title}</h1>
              <p className="text-sm md:text-base font-bold text-on-surface-variant mt-2">{p.subtitle}</p>
              <p className="text-lg font-medium text-primary-teal italic tracking-tight mt-4 leading-normal">{p.tagline}</p>
            </div>

            {/* Segment Tabs Controller */}
            <div className="flex border-b border-surface-container/80 pb-px">
              {[
                { id: 'overview', label: language === 'en' ? 'Detailed Overview' : 'Descripción General' },
                { id: 'characteristics', label: language === 'en' ? 'Core Capabilities' : 'Características Clave' },
                { id: 'specs', label: language === 'en' ? 'Technical Spec Sheet' : 'Ficha Técnica' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-6 text-xs uppercase font-black tracking-widest border-b-2 -mb-px transition-all relative ${
                    activeTab === tab.id 
                      ? 'border-primary-teal text-primary-teal font-black' 
                      : 'border-transparent text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1 Content: Detailed Overview */}
            {activeTab === 'overview' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase text-on-surface-variant tracking-[0.15em]">{language === 'en' ? 'Product Description' : 'Descripción del Producto'}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-sans">{p.description}</p>
                </div>
                
                <div className="p-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 rounded-2xl relative">
                  <h4 className="text-xs font-black uppercase text-on-surface tracking-[0.12em] mb-2">{language === 'en' ? 'Why it matters' : 'Por qué marca la diferencia'}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed font-sans">{p.whySpecial}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-black uppercase text-on-surface-variant tracking-[0.15em]">{language === 'en' ? "What's in the box" : 'Contenido del Empaque'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {p.boxContents.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 bg-surface-container/30 border border-surface-container/40 rounded-xl">
                        <div className="w-5 h-5 bg-teal-50 dark:bg-teal-950/30 rounded-full flex items-center justify-center shrink-0">
                          <Check className="text-primary-teal" size={10} />
                        </div>
                        <span className="text-xs text-on-surface font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2 Content: Characteristics */}
            {activeTab === 'characteristics' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-sm font-black uppercase text-on-surface-variant tracking-[0.15em]">{language === 'en' ? 'Operational Advantages' : 'Ventajas Operativas'}</h3>
                <div className="space-y-3">
                  {p.characteristics.map((char, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-4 p-5 bg-surface-container/20 rounded-[1.5rem] border border-surface-container/40 transition-all hover:bg-surface-container/30"
                    >
                      <div className="w-6 h-6 bg-secondary-container rounded-full flex items-center justify-center mt-0.5 shrink-0">
                        <CheckCircle2 className="text-secondary-green" size={14} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-on-surface mb-1">{char.split(' - ')[0] || char}</h4>
                        {char.includes(' - ') && (
                          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{char.split(' - ')[1]}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 3 Content: Real Specifications Sheet */}
            {activeTab === 'specs' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-sm font-black uppercase text-on-surface-variant tracking-[0.15em]">{language === 'en' ? 'Detailed Technical Spec Sheet' : 'Ficha Técnica de Detalle'}</h3>
                <div className="border border-surface-container rounded-3xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-surface-container/60 font-black uppercase tracking-wider text-on-surface border-b border-surface-container text-[10px]">
                        <th className="p-4 pl-6">{language === 'en' ? 'Parameter Metric' : 'Métrica de Parámetro'}</th>
                        <th className="p-4 pr-6">{language === 'en' ? 'Rating Value' : 'Valor Homologado'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                      {p.specs.map((spec, idx) => (
                        <tr key={idx} className="hover:bg-surface-container/20 transition-all">
                          <td className="p-4 pl-6 text-on-surface-variant font-bold uppercase tracking-wider text-[10px]">{spec.label}</td>
                          <td className="p-4 pr-6 text-on-surface font-black">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {currentImages && (
                  <div className="space-y-4 pt-4 border-t border-surface-container/60">
                    <h4 className="text-xs font-black uppercase text-on-surface tracking-[0.15em] mb-2">{language === 'en' ? 'Visual Hardware Specifications' : 'Especificaciones Visuales de Hardware'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {currentImages.map((img, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-surface-container p-3 flex flex-col items-center shadow-sm">
                          <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-xl bg-slate-50 mb-3">
                            <img 
                              src={img} 
                              alt={language === 'en' ? currentCaptionsEn[idx] : currentCaptionsEs[idx]} 
                              referrerPolicy="no-referrer"
                              className="max-w-full max-h-full object-contain p-2 hover:scale-[1.05] transition-transform duration-300 cursor-zoom-in"
                              onDoubleClick={() => openZoom(img, language === 'en' ? currentCaptionsEn[idx] : currentCaptionsEs[idx])}
                              title={language === 'en' ? 'Double click to zoom' : 'Doble clic para ampliar'}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-on-surface text-center line-clamp-2 leading-tight">
                            {language === 'en' ? currentCaptionsEn[idx] : currentCaptionsEs[idx]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* CTA action bottom box panel */}
            <div className="pt-6 border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
              <div>
                <p className="text-xs text-on-surface-variant font-bold">{language === 'en' ? 'Ready to choose? All plans are completely customizable.' : '¿Listo para decidir? Todos los planes son personalizables.'}</p>
              </div>
              <button 
                onClick={() => navigate('/checkout', { state: { package: 'Essential' } })}
                className="w-full md:w-auto px-8 py-4 bg-primary-teal text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-teal/20 hover:scale-105 active:scale-95 transition-all text-center"
              >
                {language === 'en' ? 'Get Started with Essential' : 'Contratar Plan Essential'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Temporary Image Zoom Modal Page */}
      {zoomImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          id="temporary-zoom-backdrop-overlay"
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 md:p-8 cursor-zoom-out select-none"
        >
          {/* Close button with high visible contrast */}
          <button 
            id="temporary-zoom-close-button"
            onClick={(e) => {
              e.stopPropagation();
              setZoomImage(null);
            }}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-lg hover:scale-110 transition-all cursor-pointer z-50 duration-200"
            title={language === 'en' ? 'Close Zoom (Esc)' : 'Cerrar Zoom (Esc)'}
          >
            <X size={24} />
          </button>

          {/* Fully centered zoom image container */}
          <div className="relative max-w-5xl max-h-[80vh] flex items-center justify-center pointer-events-none p-2 mb-4">
            <motion.img 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              id="temporary-zoom-display-image"
              src={zoomImage} 
              alt={zoomCaption} 
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10 pointer-events-auto cursor-zoom-out"
              onClick={(e) => {
                e.stopPropagation();
                setZoomImage(null);
              }}
              onDoubleClick={() => setZoomImage(null)}
            />
          </div>

          {/* Caption and interactive navigation guides */}
          <div className="text-center max-w-2xl px-6 pointer-events-none">
            {zoomCaption && (
              <p id="temporary-zoom-image-caption" className="text-sm md:text-base font-bold text-white mb-2 leading-snug">
                {zoomCaption}
              </p>
            )}
            <p id="temporary-zoom-user-hint" className="text-[10px] md:text-xs text-teal-400 font-extrabold uppercase tracking-widest leading-normal animate-pulse">
              {language === 'en' 
                ? '💡 Double-click or click outside to exit zoom view' 
                : '💡 Doble clic o clic afuera para salir del zoom'}
            </p>
          </div>
        </motion.div>
      )}
    </main>
  );
};
