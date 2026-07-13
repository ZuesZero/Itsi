import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { ProductDetailsPage } from './ProductDetailsPage';
import LoginPage from './LoginPage';
import AboutPage from './AboutPage';
import SupportPage from './SupportPage';
import ContactPage from './ContactPage';
import BlogPage from './BlogPage';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate,
  useLocation
} from 'react-router-dom';
import { 
  Droplets, 
  Leaf, 
  Smartphone, 
  Timer, 
  ChevronRight, 
  CheckCircle2, 
  CloudRain, 
  Home, 
  Wrench, 
  ShoppingCart, 
  Plus,
  Play,
  Search,
  Quote,
  Layout,
  Cpu,
  BarChart3,
  Wifi,
  Waves,
  MessageSquare,
  Send,
  X,
  Thermometer,
  Wind,
  Settings,
  Bell,
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Package,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Download,
  Youtube,
  Upload,
  Link as LinkIcon,
  Info,
  Sun,
  Moon,
  History,
  ChevronDown,
  ChevronUp,
  Activity,
  Sparkles,
  Trash2,
  Globe,
  User,
  Lock,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight
} from 'lucide-react';
import { getGardenAdvice } from 'ai';
import { reservePackage, isSupabaseConfigured } from './services/supabase';

const translations = {
  en: {
    home: "Home",
    solutions: "Solutions",
    shop: "Shop",
    costs: "Costs",
    orderNow: "Order Now",
    languageButton: "Language",
    // Hero Section
    heroTitle: "Take your time and enjoy it",
    heroTitleItalic: "However you want.",
    heroSubtitle: "Think in the quantity of time and water spend taking care of your garden, now think how you can use the time and save water if your garden has an independent automated environment.",
    viewSolutions: "Find Your Perfect System",
    seeItInAction: "See it in action",
    // Zone Simulator Section
    dashboardTitle: "Interactive Smart Dashboard",
    dashboardSubtitle: "Real-time simulation of your property's environmental state. The Itsi network processes thousands of data points every minute.",
    viewBy: "View By",
    selectGroup: "Select Group",
    grid: "Grid",
    plant: "Plant",
    statusKey: "Status",
    groupsKey: "Groups",
    // Features Section
    featuresLabel: "INTELLIGENCE IN EVERY ACTION",
    featuresTitle: "Intelligence in every action.",
    featuresSubtitle: "Our technology bridges the gap between biological needs and digital precision, ensuring your landscape thrives.",
    feat1Title: "Hyper-local Weather Sync",
    feat1Desc: "Connects to global meteorological networks to skip watering before it rains. Save up to 50% on seasonal utility costs.",
    feat2Title: "Full Ecosystem Integration",
    feat2Desc: "Compatible with HomeKit, Google Home, and Alexa. Command your garden via voice or routine automation.",
    feat3Title: "Edge Connectivity",
    feat3Desc: "Dual-band Wi-Fi and proprietary long-range wireless protocols ensure connection in even the largest estates.",
    // Pricing Packages
    investmentPlans: "INVESTMENT PLANS",
    pricingTitle: "Select your precision package",
    pricingSubtitle: "Scalable solutions tailored to your unique architectural footprint.",
    mostPreferred: "Most Preferred",
    getStarted: "Get Started",
    // Packages details
    pkgEssential: "Essential",
    pkgPro: "Pro",
    pkgEstate: "Estate",
    pkgPersonalize: "Personalize Your Package",
    pkgEssentialCoverage: "4m² Coverage",
    pkgProCoverage: "6m² Coverage",
    pkgEstateCoverage: "10m² Coverage",
    pkgPersonalizeCoverage: "Full Custom Coverage",
    // Testimonial
    testimonialQuote: "\"Itsi completely transformed how we manage our landscaping. The ROI was immediate, and the lawn has never looked better.\"",
    testimonialAuthor: "Sarah Johnson",
    testimonialRole: "Homeowner, Arizona",
    // App Preview
    controlAnywhere: "CONTROL ANYWHERE",
    appPreviewTitle: "Your entire property",
    appPreviewTitleHighlight: "in your pocket.",
    appPreviewDesc: "The Itsi app provides hyper-granular control over every zone. Adjust schedules, monitor moisture, and receive maintenance alerts in real-time.",
    downloadAppStore: "Download on the",
    getGooglePlay: "Get it on",
    // Labor Costs
    professionalServices: "PROFESSIONAL SERVICES",
    laborTitle: "Certified installation",
    laborTitleHighlight: "for peace of mind.",
    laborSubtitle: "Our network of certified technicians ensures your system is perfectly calibrated for your local soil conditions and plant types.",
    avgInstallTime: "Average Professional Install Time",
    installHours: "2 - 4 Hours",
    installWalkthrough: "Full calibration and app walkthrough included in every service.",
    // Labor installs buttons
    setupResidential: "Residential Setup",
    setupStandard: "Standard Installation",
    setupCommercial: "Commercial Setup",
    setupMaintenance: "System Maintenance",
    // Smart Controller
    coreHardware: "CORE HARDWARE",
    hardwareTitle: "The brain of your irrigation.",
    hardwareSubtitle: "Our smart controller is designed for longevity and ease of use minimalist aesthetics meets industrial reliability.",
    telemetryTitle: "Real-time Telemetry",
    telemetryDesc: "Constant soil analysis delivered directly to your cloud dashboard.",
    weatherGuardTitle: "Weather Guard",
    weatherGuardDesc: "Auto-adjusts during frost or extreme heatwaves to protect plants.",
    remoteCommandTitle: "Remote Command.",
    remoteCommandDesc: "Override any zone instantly from the mobile app, no matter where you are.",
    ambient: "Ambient",
    // Maintenance Tools (Catalog)
    shopEssentials: "SHOP ESSENTIALS",
    maintenanceTitle: "Maintenance tools & accessories.",
    maintenanceSubtitle: "Keep your system in peak condition with our range of precision-engineered replacement parts and upkeep tools.",
    browseCatalog: "Browse Full Catalog",
    saw: "Precision Saw",
    spade: "Standard Spade",
    moistureMeter: "Moisture Meter",
    nozzle: "Replacement Nozzle",
    valveKey: "Valve Key",
    sensorProbe: "Sensor Probe",
    sealant: "Pipe Sealant",
    depthGauge: "Depth Gauge",
    // Tech Specs
    techSpecsTitle: "Technical Specifications",
    techSpecsSubtitle: "Built for resilience and reliability in even the most challenging climates.",
    processor: "Processor",
    connectivity: "Connectivity",
    weatherStation: "Weather Station",
    wateringZones: "Watering Zones",
    // CTA Section
    ctaTitle: "Ready to master your garden?",
    ctaSubtitle: "Join 10,000+ smart homeowners who have saved millions of gallons of water with Itsi. Professional installation in as little as 48 hours.",
    checkAvailability: "Check Availability",
    technicalDossier: "Technical Dossier",
    // Common / Buttons
    backToParadise: "Back to Paradise",
    // Search
    searchPlaceholder: "Search products, solutions, or guides...",
    trending: "Trending:",
    noResults: "No results found for",
    searchTitle: "Quick Navigation"
  },
  es: {
    home: "Inicio",
    solutions: "Soluciones",
    shop: "Tienda",
    costs: "Costos",
    orderNow: "Ordenar Ahora",
    languageButton: "Idioma",
    // Hero Section
    heroTitle: "Tóma tu tiempo y disfrútalo",
    heroTitleItalic: "Como quieras.",
    heroSubtitle: "Piensa en la cantidad de tiempo y agua que gastas cuidando tu jardín, ahora piensa cómo puedes usar el tiempo y ahorrar agua si tu jardín tiene un entorno automatizado independiente.",
    viewSolutions: "Encuentra Tu Sistema Perfecto",
    seeItInAction: "Ver en acción",
    // Zone Simulator Section
    dashboardTitle: "Panel de Control Inteligente Interactivo",
    dashboardSubtitle: "Simulación en tiempo real del estado ambiental de su propiedad. La red Itsi procesa miles de puntos de datos cada minuto.",
    viewBy: "Ver Por",
    selectGroup: "Seleccionar Grupo",
    grid: "Cuadrícula",
    plant: "Planta",
    statusKey: "Estado",
    groupsKey: "Grupos",
    // Features Section
    featuresLabel: "INTELIGENCIA EN CADA ACCION",
    featuresTitle: "Inteligencia en cada accion.",
    featuresSubtitle: "Nuestra tecnología cierra la brecha entre las necesidades biológicas y la precisión digital, asegurando que su paisaje prospere.",
    feat1Title: "Sincronización Climatológica Hiperlocal",
    feat1Desc: "Se conecta a redes meteorológicas globales para omitir el riego antes de que llueva. Ahorre hasta un 50% en costos estacionales de agua.",
    feat2Title: "Integración Completa del Ecosistema",
    feat2Desc: "Compatible con HomeKit, Google Home y Alexa. Controle su jardín mediante comandos de voz o automatizaciones.",
    feat3Title: "Conectividad de Vanguardia",
    feat3Desc: "Wi-Fi de doble banda y protocolos inalámbricos de largo alcance de diseño propio aseguran la conexión en grandes propiedades.",
    // Pricing Packages
    investmentPlans: "PLANES DE INVERSIÓN",
    pricingTitle: "Seleccione su paquete de precisión",
    pricingSubtitle: "Soluciones escalables adaptadas al diseño arquitectónico único de su propiedad.",
    mostPreferred: "Más Elegido",
    getStarted: "Comenzar",
    // Packages details
    pkgEssential: "Esencial",
    pkgPro: "Profesional",
    pkgEstate: "Finca / Residencia",
    pkgPersonalize: "Personaliza tu Paquete",
    pkgEssentialCoverage: "Cobertura de 4m²",
    pkgProCoverage: "Cobertura de 6m²",
    pkgEstateCoverage: "Cobertura de 10m²",
    pkgPersonalizeCoverage: "Cobertura Personalizada Completa",
    // Testimonial
    testimonialQuote: "\"Itsi transformó por completo la forma en que gestionamos nuestro jardín. El retorno de inversión fue inmediato y el césped nunca ha lucido mejor.\"",
    testimonialAuthor: "Sarah Johnson",
    testimonialRole: "Propietaria, Arizona",
    // App Preview
    controlAnywhere: "CONTROL EN CUALQUIER LUGAR",
    appPreviewTitle: "Toda tu propiedad",
    appPreviewTitleHighlight: "en tu bolsillo.",
    appPreviewDesc: "La aplicación Itsi ofrece un control hiperdetallado de cada zona. Ajuste horarios, monitoree la humedad y reciba alertas en tiempo real.",
    downloadAppStore: "Descargar en el",
    getGooglePlay: "Disponible en",
    // Labor Costs
    professionalServices: "SERVICIOS PROFESIONALES",
    laborTitle: "Instalación Certificada",
    laborTitleHighlight: "para tu tranquilidad.",
    laborSubtitle: "Nuestra red de técnicos certificados garantiza que su sistema esté perfectamente calibrado según el tipo del suelo y de las plantas.",
    avgInstallTime: "Tiempo Promedio de Instalación",
    installHours: "2 - 4 Horas",
    installWalkthrough: "Calibración completa y demostración de la app incluidas en el servicio.",
    // Labor installs buttons
    setupResidential: "Instalación Residencial",
    setupStandard: "Instalación Estándar",
    setupCommercial: "Instalación Comercial",
    setupMaintenance: "Mantenimiento del Sistema",
    // Smart Controller
    coreHardware: "HARDWARE CENTRAL",
    hardwareTitle: "El cerebro de su sistema de riego.",
    hardwareSubtitle: "Nuestro controlador inteligente está diseñado para una larga duración y sencillez: minimalismo unido a confiabilidad industrial.",
    telemetryTitle: "Telemetría en Tiempo Real",
    telemetryDesc: "Análisis constante del suelo enviado directamente al panel de control en la nube.",
    weatherGuardTitle: "Protección Climática",
    weatherGuardDesc: "Ajuste automático durante heladas u olas de calor extremas para proteger sus plantas.",
    remoteCommandTitle: "Control Remoto.",
    remoteCommandDesc: "Anule o active cualquier zona al instante desde la app móvil, sin importar dónde se encuentre.",
    ambient: "Ambiente",
    // Maintenance Tools (Catalog)
    shopEssentials: "TIENDA EN LÍNEA",
    maintenanceTitle: "Herramientas de mantenimiento.",
    maintenanceSubtitle: "Mantenga su sistema en óptimas condiciones con nuestra gama de repuestos y accesorios de ingeniería de precisión.",
    browseCatalog: "Ver Catálogo Completo",
    saw: "Sierra de Precisión",
    spade: "Pala Estándar",
    moistureMeter: "Medidor de Humedad",
    nozzle: "Boquilla de Repuesto",
    valveKey: "Llave de Válvula",
    sensorProbe: "Sonda de Sensor",
    sealant: "Sellador de Tuberías",
    depthGauge: "Medidor de Profundidad",
    // Tech Specs
    techSpecsTitle: "Especificaciones Técnicas",
    techSpecsSubtitle: "Diseñado para resistir y rendir en los climas más difíciles.",
    processor: "Procesador",
    connectivity: "Conectividad",
    weatherStation: "Estación Climática",
    wateringZones: "Zonas de Riego",
    // CTA Section
    ctaTitle: "¿Listo para dominar tu jardín?",
    ctaSubtitle: "Únete a más de 10,000 propietarios que han ahorrado millones de litros de agua. Instalación en menos de 48 horas.",
    checkAvailability: "Consultar Disponibilidad",
    technicalDossier: "Dosier Técnico",
    // Common / Buttons
    backToParadise: "Regresar al Paraíso",
    // Search
    searchPlaceholder: "Buscar productos, soluciones o guías...",
    trending: "Tendencias:",
    noResults: "No se encontraron resultados para",
    searchTitle: "Navegación Rápida"
  }
};

const LanguageContext = React.createContext<{
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  t: (key: string) => string;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUser: { name: string; email: string };
  setLoggedInUser: React.Dispatch<React.SetStateAction<{ name: string; email: string }>>;
}>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  loggedInUser: { name: '', email: '' },
  setLoggedInUser: () => {}
});

export const useLanguage = () => React.useContext(LanguageContext);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={langRef}>
      <button
        onClick={() => setLangOpen(!langOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:brightness-95 transition-all font-display text-xs font-semibold border border-surface-container shadow-sm select-none"
        aria-label="Select language"
      >
        <Globe size={14} className="text-primary-teal animate-pulse" />
        <span>{language === 'en' ? 'English' : 'Español'}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute right-0 mt-2 py-1.5 w-36 bg-background-paper rounded-xl shadow-xl border border-surface-container z-[100]"
          >
            <button
              onClick={() => {
                setLanguage('en');
                setLangOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors flex items-center justify-between ${language === 'en' ? 'text-primary-teal bg-primary-teal/5' : 'text-on-surface hover:bg-surface-container'}`}
            >
              <span>English</span>
              {language === 'en' && <CheckCircle2 size={12} className="text-primary-teal" />}
            </button>
            <button
              onClick={() => {
                setLanguage('es');
                setLangOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors flex items-center justify-between ${language === 'es' ? 'text-primary-teal bg-primary-teal/5' : 'text-on-surface hover:bg-surface-container'}`}
            >
              <span>Español</span>
              {language === 'es' && <CheckCircle2 size={12} className="text-primary-teal" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = ({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) => {
  const navigate = useNavigate();
  const { t, language, isLoggedIn, loggedInUser } = useLanguage();
  const isOwner = isLoggedIn && loggedInUser?.email?.toLowerCase().trim() === 'luis.delarosacosio@gmail.com';
  return (
    <nav className="fixed top-0 w-full z-50 bg-background-paper/95 backdrop-blur-md border-b border-surface-container transition-colors duration-300">
      <div className="flex justify-between items-center px-6 md:px-12 py-2.5 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity animate-fade-in">
          <div className="w-8 h-8 bg-primary-teal rounded-lg flex items-center justify-center text-white">
            <Waves size={20} />
          </div>
          <div className="text-2xl font-bold font-display tracking-tight text-primary-teal">Itsi</div>
        </Link>
        <div className="hidden md:flex items-center space-x-8 font-display">
          <Link to="/" className="text-on-surface-variant hover:text-primary-teal transition-colors font-medium">{t("home")}</Link>
          {isOwner && (
            <>
              <Link to="/solutions" className="text-on-surface-variant hover:text-primary-teal transition-colors font-medium">{t("solutions")}</Link>
              <Link to="/shop" className="text-on-surface-variant hover:text-primary-teal transition-colors font-medium">
                {t("shop")}
              </Link>
              <Link to="/costs" className="text-on-surface-variant hover:text-primary-teal transition-colors font-medium">
                {t("costs")}
              </Link>
            </>
          )}
          
          {/* Desktop Login registration item */}
          <Link 
            to="/login" 
            id="desktop-login-link" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface hover:text-primary-teal hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all font-semibold"
          >
            <User size={18} className="text-on-surface-variant" />
            <span className="text-[#0284c7] font-semibold">{language === 'en' ? 'Login' : 'Inicia Sesión'}</span>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSelector />
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-surface-container text-on-surface hover:brightness-90 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={() => navigate('/checkout')}
              className="bg-primary-teal text-white px-6 py-2 rounded-lg font-medium hover:brightness-110 shadow-sm transition-all"
            >
              {t("orderNow")}
            </button>
          </div>
        </div>
        {/* Mobile theme toggle & login link */}
        <div className="md:hidden flex items-center gap-3">
          <Link 
            to="/login" 
            id="mobile-login-link" 
            className="flex items-center gap-1 p-2 rounded-lg bg-surface-container text-on-surface hover:brightness-90 transition-all font-semibold text-xs"
          >
            <User size={15} className="text-on-surface-variant" />
            <span className="text-[#0284c7] font-semibold">{language === 'en' ? 'Login' : 'Entrar'}</span>
          </Link>
          <LanguageSelector />
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-surface-container text-on-surface hover:brightness-90 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const { t, language, isLoggedIn, loggedInUser } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [lockedSystemClicked, setLockedSystemClicked] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoId, setVideoId] = useState(() => {
    return localStorage.getItem("diivoo_custom_video_id") || "avUnP7mhRi0";
  });
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [newVideoInput, setNewVideoInput] = useState("");
  const [videoSourceType, setVideoSourceType] = useState<'youtube' | 'local_file' | 'direct_url'>(() => {
    return (localStorage.getItem("diivoo_video_source_type") as any) || 'youtube';
  });
  const [directVideoUrl, setDirectVideoUrl] = useState(() => {
    return localStorage.getItem("diivoo_custom_direct_url") || "https://assets.mixkit.co/videos/preview/mixkit-sprinkler-watering-a-green-lawn-43282-large.mp4";
  });
  const [localVideoFile, setLocalVideoFile] = useState<File | null>(null);
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const isOwner = isLoggedIn && loggedInUser?.email?.toLowerCase().trim() === 'luis.delarosacosio@gmail.com';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchableDocs = [
    // Showcase Projects in /solutions
    {
      name: language === 'en' ? "Irrigation House System" : "Sistema de Riego para Casa",
      category: language === 'en' ? "Featured Solutions" : "Soluciones Destacadas",
      desc: language === 'en' ? "Whisper-quiet automated hydration perfectly calibrated for home frontyards, patio gardens, florales & lawns." : "Hidratación automatizada ultrasilenciosa perfectamente calibrada para antejardines de casas, patios traseros y céspedes residenciales.",
      path: "/solutions",
      keywords: ["house", "resident", "suburban", "backyard", "yard", "residencial", "casa", "jardín", "patio", "césped", "lawn", "micro-drip", "goteo"],
      meta: language === 'en' ? "Residential" : "Residencial"
    },
    {
      name: language === 'en' ? "Company Irrigation System" : "Sistema de Riego para Empresas",
      category: language === 'en' ? "Featured Solutions" : "Soluciones Destacadas",
      desc: language === 'en' ? "High-volume, enterprise-tier watering grids designed for corporate offices, botanical parks, and business roofs." : "Redes de riego de alto volumen y nivel empresarial diseñadas para oficinas corporativas, parques botánicos y complejos comerciales.",
      path: "/solutions",
      keywords: ["corporate", "company", "office", "commercial", "park", "botanical", "empresa", "corporación", "comercial", "oficina", "tejado", "techo verde", "hotel", "empresariales"],
      meta: language === 'en' ? "Commercial" : "Comercial"
    },
    {
      name: language === 'en' ? "Land Irrigation System" : "Sistema de Riego para Terrenos",
      category: language === 'en' ? "Featured Solutions" : "Soluciones Destacadas",
      desc: language === 'en' ? "Robust, high-capacity broad-acreage layout crafted for agricultural fields, orchards, rustic terrains & rural estates." : "Esquemas robustos de gran capacidad diseñados para campos agrícolas, huertos de árboles frutales y terrenos de gran escala.",
      path: "/solutions",
      keywords: ["agriculture", "orchard", "farm", "land", "rural", "acreage", "agrícola", "granja", "hectáreas", "campo", "terreno", "tierra", "huertos", "lora"],
      meta: language === 'en' ? "Agricultural" : "Agrícola"
    },

    // Kits & Pricing Options in /solutions
    {
      name: language === 'en' ? "Essential Solution Kit" : "Kit de Solución Esencial",
      category: language === 'en' ? "Kits & Pricing" : "Kits y Precios",
      desc: language === 'en' ? "Perfect entry plan for suburban homes. Hydrates up to 8 discrete residential zones smart weather synced." : "Plan básico perfecto para casas suburbanas. Sincronización climática para hasta 8 zonas residenciales discretas.",
      path: "/solutions",
      keywords: ["essential", "basic", "entry", "starter", "single", "$199", "pricing", "precio", "costo", "barato", "inicial", "esencial"],
      meta: "$199.00"
    },
    {
      name: language === 'en' ? "Pro Precision Kit" : "Kit de Precisión Pro",
      category: language === 'en' ? "Kits & Pricing" : "Kits y Precios",
      desc: language === 'en' ? "Our most popular setup. Integrates with premium smart integrations (HomeKit, Alexa) supporting up to 16-32 zones." : "Nuestra configuración más popular. Integración premium con HomeKit y Alexa, soportando de 16 a 32 zonas residenciales.",
      path: "/solutions",
      keywords: ["pro", "precision", "professional", "standard", "medium", "$399", "pricing", "precio", "costo", "popular", "alexa", "homekit", "google home"],
      meta: "$399.00"
    },
    {
      name: language === 'en' ? "Estate Master Kit" : "Kit Maestro Estate",
      category: language === 'en' ? "Kits & Pricing" : "Kits y Precios",
      desc: language === 'en' ? "Commercial scale multi-mansion performance setup, priority expert API link, hyper-local ambient sensor array." : "Configuración a escala comercial para grandes propiedades, enlace de API de prioridad y sensores ambientales hiperlocales.",
      path: "/solutions",
      keywords: ["estate", "master", "premium", "luxury", "mansion", "complex", "$899", "pricing", "precio", "costo", "avanzado", "misión", "grandes propiedades"],
      meta: "$899.00"
    },

    // Interactive Demo in /demo
    {
      name: language === 'en' ? "Interactive Smart Zone Simulator" : "Controlador de Zonas Interactivo en Vivo",
      category: language === 'en' ? "Interactive Demo" : "Demo Interactiva",
      desc: language === 'en' ? "Run real-time hydration loops, monitor soil PH, sensor calibrations, and test smart weather triggers on custom zones." : "Inicia ciclos de hidratación en tiempo real, monitorea el PH del suelo, calibra sensores y prueba disparadores de clima inteligente.",
      path: "/demo",
      keywords: ["demo", "simulation", "play", "try", "live", "interactive", "zone", "hydrated", "peonies", "north garden", "control panels", "simulador", "interactivo", "probar", "en vivo", "testeo"],
      meta: language === 'en' ? "Live Simulation" : "Simulación En Vivo"
    },

    // Mobile downloads in /download
    {
      name: language === 'en' ? "iOS Companion Mobile Application" : "Aplicación de Control Móvil iOS",
      category: language === 'en' ? "Downloads & Apps" : "Descargas y Apps",
      desc: language === 'en' ? "Command your entire garden network in high fidelity from Apple devices. Native Apple HomeKit & Watch loops." : "Controla toda tu red de riego en alta fidelidad desde dispositivos Apple. Integración nativa con HomeKit y Watch.",
      path: "/download",
      keywords: ["app", "smartphone", "mobile", "command", "ios", "apple", "app store", "iphone", "companion", "descargar", "celular", "movil", "descarga"],
      meta: "iOS App"
    },
    {
      name: language === 'en' ? "Android Companion Mobile Application" : "Aplicación de Control Móvil Android",
      category: language === 'en' ? "Downloads & Apps" : "Descargas y Apps",
      desc: language === 'en' ? "Real-time notifications, local telemetry graphs, and quick automated triggers built specifically for Android tablets/phones." : "Notificaciones en tiempo real, gráficos de telemetría y disparadores automáticos integrados para dispositivos Android.",
      path: "/download",
      keywords: ["app", "smartphone", "mobile", "command", "android", "google play", "samsung", "companion", "descargar", "celular", "movil", "apk", "descarga"],
      meta: "Android App"
    },

    // Technical Whitepaper & Engineering docs in /technical
    {
      name: language === 'en' ? "The Technical Dossier & Whitepaper" : "El Dosier Técnico y Especificaciones",
      category: language === 'en' ? "Engineering Docs" : "Páginas Técnicas",
      desc: language === 'en' ? "Exhaustive review on Garden Mesh networking, aerospace grade housings, AI predictive weather grids, and fluid mechanics." : "Repaso exhaustivo sobre redes Mesh de jardín, carcasas de grado aeroespacial, IA de clima predictivo y física de fluidos.",
      path: "/technical",
      keywords: ["dossier", "whitepaper", "schema", "blueprint", "spec", "reference", "pdf", "network", "dual-band", "wifi", "aerospace", "hydraulic", "fluid", "physics", "pressure", "compensation", "zero-orbit", "esquemático", "técnico", "documentos"],
      meta: language === 'en' ? "Reference Guide" : "Guía de Referencia"
    },

    // Professional services & labor in /costs
    {
      name: language === 'en' ? "Certified On-Site Installation Service" : "Servicio de Instalación Certificada",
      category: language === 'en' ? "Professional Services" : "Servicios Profesionales",
      desc: language === 'en' ? "Complete physical setup by certified technicians. Custom 3D land layout mapping and zone piping alignment." : "Configuración física completa por técnicos calificados. Mapeo personalizado e instalación discreta de tuberías.",
      path: "/costs",
      keywords: ["installation", "setup", "labor", "costs", "hourly", "technician", "standard", "commercial", "maintenance", "instalador", "contratar", "técnico", "costo", "obra", "instalación", "servicio"],
      meta: "$500 - $1200"
    },
    {
      name: language === 'en' ? "System Annual Maintenance & Tuning Bookings" : "Mantenimiento Anual y Sintonización",
      category: language === 'en' ? "Professional Services" : "Servicios Profesionales",
      desc: language === 'en' ? "Includes soil probe diagnostic recalibration, valve clearing, winterization prep, and comprehensive system diagnostic coverage." : "Recalibración de sondas de suelo, limpieza de válvulas e inspección general de flujo preventivo.",
      path: "/costs",
      keywords: ["maintenance", "repair", "diagnostic", "checkup", "support", "support plan", "soporte", "ayuda", "reparación", "limpieza", "anual", "mantenimiento"],
      meta: "$150.00 / yr"
    },

    // Expert Consultations in /consultation
    {
      name: language === 'en' ? "Expert Landscape Topology & Soil Analysis Consultation" : "Consulta y Mapeo en Sitio de Suelo y Topología",
      category: language === 'en' ? "Assessments" : "Consultas Especializadas",
      desc: language === 'en' ? "Bespoke session with certified landscape curators and engineers detailing 3D topography and tailored nutrition micro-grids." : "Sesión personalizada con ingenieros de paisaje para analizar topología 3D detallada y estructurar redes de riego personalizadas.",
      path: "/consultation",
      keywords: ["consultation", "consult", "survey", "mapping", "topology", "soil", "curators", "schedule", "calendar", "cita", "asesoría", "experto", "estudio", "suelo", "topología", "reunión"],
      meta: language === 'en' ? "Certified Booking" : "Reserva Certificada"
    },

    // Catalogue items in /shop (and let's pass product state as well!!)
    {
      name: language === 'en' ? "Precision Saw Hardware Tool" : "Sierra de Precisión para PVC",
      category: language === 'en' ? "Hardware Shop" : "Tienda en Línea",
      desc: language === 'en' ? "Surgical clean cutter for plumbing conduits and PVC/PE pipe fittings. Ergonomic high-durability grip." : "Herramienta de precisión para cortes limpios en tuberías de PVC/PE. Mango ergonómico para alta durabilidad.",
      path: "/shop",
      state: { product: "Precision Saw" },
      keywords: ["tool", "saw", "precision", "cut", "hardware", "wood", "pipe", "pvc", "blade", "sierra", "corte", "herramienta", "tienda", "comprar", "shop"],
      meta: "$24.99"
    },
    {
      name: language === 'en' ? "Standard Spade Shovel Tool" : "Pala Tipo Espada Forjada Estándar",
      category: language === 'en' ? "Hardware Shop" : "Tienda en Línea",
      desc: language === 'en' ? "Heavy duty forged alloy steel blade optimized for trench digs, zone partitioning, and fast soil movement." : "Pala forjada de acero de alta resistencia, ideal para excavar trincheras y movimiento de tierra.",
      path: "/shop",
      state: { product: "Standard Spade" },
      keywords: ["tool", "spade", "shovel", "iron", "steel", "dig", "garden", "pala", "herramiento", "tierra", "cavar", "tienda", "comprar", "shop"],
      meta: "$35.99"
    },
    {
      name: language === 'en' ? "Digital Moisture Meter Device" : "Medidor de Humedad Digital",
      category: language === 'en' ? "Hardware Shop" : "Tienda en Línea",
      desc: language === 'en' ? "Precision soil hydration detector checking moisture content level up to 10cm depths. LCD backlit readouts." : "Detector instantáneo de hidratación del suelo que mide humedad hasta a 10 cm. Pantalla LCD retroiluminada.",
      path: "/shop",
      state: { product: "Moisture Meter" },
      keywords: ["device", "meter", "moisture", "sensor", "humidity", "probe", "medidor", "humedad", "tester", "digital", "soil", "comprar", "shop"],
      meta: "$18.99"
    },
    {
      name: language === 'en' ? "Replacement Spray Nozzle Pro" : "Boquilla de Aspersión de Repuesto Pro",
      category: language === 'en' ? "Hardware Shop" : "Tienda en Línea",
      desc: language === 'en' ? "Fully adjustable water sprinkler head with mist-to-stream variable spray layout. High coverage, anti-clogging." : "Cabezal ajustable con patrón variable de niebla a corriente. Alta cobertura de riego con filtro anti-obstrucción.",
      path: "/shop",
      state: { product: "Replacement Nozzle" },
      keywords: ["nozzle", "spray", "spray nozzle", "replacement", "hydration", "sprinkler", "head", "boquilla", "repuesto", "aspersor", "chorro", "aspersión", "comprar", "shop"],
      meta: "$12.99"
    },
    {
      name: language === 'en' ? "Heavy Duty Valve Key" : "Llave de Paso Reforzada para Válvulas",
      category: language === 'en' ? "Hardware Shop" : "Tienda en Línea",
      desc: language === 'en' ? "T-handle solid steel key designed to turn deep shutoff hydraulic systems valves and main water inlets." : "Herramienta con mango en T de acero sólido diseñada para el corte y apertura de válvulas profundas.",
      path: "/shop",
      state: { product: "Valve Key" },
      keywords: ["key", "valve", "wrench", "metal", "control", "shutdown", "shutoff", "llave", "válvula", "paso", "metálica", "herramienta", "comprar", "shop"],
      meta: "$8.99"
    },
    {
      name: language === 'en' ? "Advanced Wireless Sensor Probe" : "Acople de Sonda Inalámbrica Avanzada",
      category: language === 'en' ? "Hardware Shop" : "Tienda en Línea",
      desc: language === 'en' ? "Continuous soil diagnostic tool emitting PH, temperature, and depth moisture indices back to central controller link." : "Emisor de telemetría constante (PH, temperatura y humedad profunda) transmitido directamente al panel principal.",
      path: "/shop",
      state: { product: "Sensor Probe" },
      keywords: ["probe", "ground", "sensor", "wireless", "probe", "depth", "soil", "analysis", "sonda", "sensor", "profundo", "acople", "comprar", "shop"],
      meta: "$45.99"
    },
    {
      name: language === 'en' ? "Professional Waterproof Pipe Sealant" : "Pegamento Sellador Hermético para Tubería",
      category: language === 'en' ? "Hardware Shop" : "Tienda en Línea",
      desc: language === 'en' ? "Industrial quality fast-cure leak proof compound for plumbing connection. Resists up to 150 PSI fluid pressures." : "Pegamento de curado rápido de calidad industrial. Previene fugas en roscas y uniones de PVC expuestas a presión.",
      path: "/shop",
      state: { product: "Pipe Sealant" },
      keywords: ["sealant", "pipe", "glue", "waterproof", "tape", "leak", "patch", "pegamento", "sellador", "fuga", "tubo", "empaque", "comprar", "shop"],
      meta: "$15.99"
    },
    {
      name: language === 'en' ? "Trench Depth Calibrator Gauge" : "Calibrador Medidor de Profundidad",
      category: language === 'en' ? "Hardware Shop" : "Tienda en Línea",
      desc: language === 'en' ? "Anodized aluminum ruler scale designed for measuring pipeline sub-surface depths to secure frost-safe installations." : "Regla de aluminio anodizado diseñada para comprobar profundidades bajo el nivel térmico del suelo.",
      path: "/shop",
      state: { product: "Depth Gauge" },
      keywords: ["gauge", "depth", "measure", "meter", "length", "ruler", "calibrator", "medidor", "profundidad", "calibrador", "regla", "comprar", "shop"],
      meta: "$10.99"
    }
  ];

  const filtered = searchQuery.trim() === ""
    ? []
    : searchableDocs.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.keywords.some(k => k.toLowerCase().includes(query))
        );
      });

  return (
    <header className="relative pt-0 pb-8 px-6 md:px-12 overflow-hidden bg-background-paper">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 flex flex-col items-center pt-8 pb-2 w-full"
        >
          <h1 className="font-display text-1xl md:text-5xl text-on-surface mb-4 leading-[1.1] tracking-tight">
            {/* 
               MANUAL TEXT SIZE ADJUSTMENT: 
               - Change 'text-5xl' to adjust mobile size (e.g., text-3xl, text-4xl)
               - Change 'md:text-7xl' to adjust desktop size (e.g., md:text-5xl, md:text-6xl)
            */}
            {t("heroTitle")} <span className="text-primary-teal italic">{t("heroTitleItalic")}</span>
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-4xl mb-3 leading-relaxed font-medium">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-2">
            <button 
              onClick={() => navigate('/solutions')}
              className="bg-primary-teal text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-primary-teal/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              {t("viewSolutions")} <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => setShowVideoModal(true)}
              className="bg-background-paper border border-surface-container text-on-surface px-8 py-4 rounded-xl font-bold hover:bg-surface-container transition-all flex items-center gap-2"
            >
              <Play size={18} className="text-secondary-green" /> {t("seeItInAction")}
            </button>
          </div>

          {/* Elegant Search Bar Section */}
          <div ref={searchRef} className="relative w-full max-w-5xl mx-auto mt-6 z-30">
            <div className="relative group/search">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within/search:text-primary-teal transition-colors">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const lowercaseVal = searchQuery.toLowerCase();
                    if (lowercaseVal.includes("projects") || lowercaseVal.includes("proyectos")) {
                      navigate("/solutions");
                      setSearchQuery("");
                      setIsOpen(false);
                    } else if (filtered.length > 0) {
                      navigate(filtered[0].path, { state: filtered[0].state });
                      setSearchQuery("");
                      setIsOpen(false);
                    }
                  }
                }}
                onFocus={() => setIsOpen(true)}
                placeholder={t("searchPlaceholder")}
                className="w-full pl-11 pr-11 py-3 bg-white text-on-surface border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-teal/20 focus:border-primary-teal transition-all text-sm font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-on-surface transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Popular/Trending search quick filters */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-on-surface-variant font-medium justify-center">
              <span className="text-slate-400 text-[10px] font-semibold tracking-wider uppercase">{t("trending")}</span>
              {[
                { label: language === 'en' ? "Sensor Probe" : "Sonda de Sensor", value: "Sensor" },
                { label: language === 'en' ? "Pro Kit" : "Kit Pro", value: "Pro" },
                { label: language === 'en' ? "Installation" : "Instalación", value: "Install" }
              ].map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(pill.label);
                    setIsOpen(true);
                  }}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-primary-teal/10 hover:text-primary-teal text-slate-600 rounded-full transition-all text-[11px]"
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Dropdown Suggestions Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden z-40 max-h-80 overflow-y-auto text-left"
                >
                  {searchQuery.trim() === "" ? (
                    <div className="p-3">
                      <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2 px-2">{t("searchTitle")}</div>
                      <div className="space-y-0.5">
                        {searchableDocs.slice(0, 4).map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigate(item.path, { state: item.state });
                              setIsOpen(false);
                            }}
                            className="w-full flex justify-between items-center py-2 px-3 rounded-xl hover:bg-slate-50 transition-colors"
                          >
                            <span className="text-xs font-semibold text-slate-700">{item.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase tracking-wide">{item.category}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : filtered.length > 0 ? (
                    <div className="p-1.5">
                      {filtered.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            navigate(item.path, { state: item.state });
                            setIsOpen(false);
                          }}
                          className="w-full flex items-center justify-between py-3 px-4 rounded-xl hover:bg-primary-teal/5 transition-colors group/item border-b border-slate-50 last:border-0"
                        >
                          <div className="flex-1 pr-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-slate-800 group-hover/item:text-primary-teal transition-colors">{item.name}</span>
                              {item.meta && (
                                <span className="text-[9px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 font-bold rounded-lg shrink-0">{item.meta}</span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed max-w-xl line-clamp-1">{item.desc}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[9px] px-2 py-0.5 bg-slate-100 text-slate-500 font-bold rounded-full uppercase tracking-wider">{item.category}</span>
                            <ChevronRight size={14} className="text-slate-300 group-hover/item:text-primary-teal group-hover/item:translate-x-1 transition-all" />
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 px-4 text-center text-slate-500">
                      <p className="text-xs font-semibold">{t("noResults")} "{searchQuery}"</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Our Showcase Projects under the Search Bar */}
          <div className="w-full text-left mt-16 max-w-7xl mx-auto">
            <span className="font-label text-primary-teal uppercase tracking-widest text-[10px] font-black mb-1 block">
              {language === 'en' ? "FEATURED INSTANCES" : "PROYECTOS DESTACADOS"}
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-on-surface mb-2 tracking-tight font-bold">
              {language === 'en' ? "Our Showcase Projects" : "Nuestros Proyectos de Referencia"}
            </h2>
            <p className="text-lg text-on-surface-variant font-medium mb-6 max-w-3xl leading-relaxed">
              {language === 'en' 
                ? "Discover our core blueprints in action. From custom suburban homes to high-tech corporate environments and agricultural expansions, we engineer smart water solutions that elevate living ecosystems." 
                : "Descubre nuestros diseños en acción. Desde casas suburbanas personalizadas hasta entornos corporativos de alta tecnología y terrenos agrícolas, diseñamos sistemas inteligentes que elevan los entornos de vida."}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project 1: House System */}
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full text-left"
              >
                <div className="h-64 overflow-hidden relative group">
                  <img 
                    src="https://www.milleroutdoorsnola.com/wp-content/uploads/2024/11/irrigation-system.png" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Irrigation House System"
                  />
                  <div className="absolute top-4 left-4 bg-primary-teal text-white text-xs uppercase tracking-widest font-black py-2 px-4 rounded-full shadow-md">
                    {language === 'en' ? "Residential" : "Residencial"}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-on-surface mb-3">
                      {language === 'en' ? "Irrigation House System" : "Sistema de Riego para Casa"}
                    </h3>
                    <p className="text-on-surface-variant font-medium text-sm leading-relaxed mb-6">
                      {language === 'en' 
                        ? "Whisper-quiet automated hydration perfectly calibrated for home frontyards, backyard gardens, floral beds, and custom manicured lawns." 
                        : "Hidratación automatizada ultrasilenciosa perfectamente calibrada para antejardines de casas, patios traseros, jardineras florales y céspedes residenciales."}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {[
                        language === 'en' ? "Smart Soil Sensors Integration" : "Integración de Sensores de Suelo Inteligentes",
                        language === 'en' ? "Sub-surface Micro-drip Emitters" : "Emisores de Micro-goteo Subterráneo",
                        language === 'en' ? "Multi-zone Scheduling Options" : "Programación Multizona Personalizada"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs text-on-surface-variant font-semibold">
                          <CheckCircle2 size={16} className="text-primary-teal shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => navigate('/checkout', { state: { package: 'Essential' } })}
                    className="w-full bg-slate-50 border border-slate-150 text-primary-teal hover:bg-primary-teal hover:text-white hover:border-transparent py-3 px-6 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>{language === 'en' ? "Configure House System" : "Configurar Sistema de Casa"}</span>
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>

              {/* Project 2: Company System */}
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full relative text-left"
              >
                <div className="h-64 overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Company Irrigation System"
                  />
                  <div className="absolute top-4 left-4 bg-secondary-green text-white text-xs uppercase tracking-widest font-black py-2 px-4 rounded-full shadow-md">
                    {language === 'en' ? "Commercial" : "Comercial"}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-on-surface mb-3">
                      {language === 'en' ? "Company Irrigation System" : "Sistema de Riego para Empresas"}
                    </h3>
                    <p className="text-on-surface-variant font-medium text-sm leading-relaxed mb-6">
                      {language === 'en' 
                        ? "High-volume, enterprise-tier watering grids designed for corporate offices, botanical parks, green roofs, and hospitality landscapes." 
                        : "Redes de riego de alto volumen y nivel empresarial diseñadas para oficinas corporativas, parques botánicos, techos verdes y complejos comerciales."}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {[
                        language === 'en' ? "Central Cloud Management App" : "Gestor Central en la Nube",
                        language === 'en' ? "Heavy-Duty Climate Protection" : "Protección Climática de Alta Durabilidad",
                        language === 'en' ? "Automated Water Conservation" : "Conservación Automatizada del Agua"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs text-on-surface-variant font-semibold">
                          <CheckCircle2 size={16} className="text-secondary-green shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => {
                      if (!isOwner) {
                        setLockedSystemClicked('company');
                      } else {
                        navigate('/checkout', { state: { package: 'Pro' } });
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-150 text-secondary-green hover:bg-secondary-green hover:text-white hover:border-transparent py-3 px-6 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>{language === 'en' ? "Configure Company System" : "Configurar Sistema de Empresa"}</span>
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>

              {/* Project 3: Land Irrigation System */}
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full relative text-left"
              >
                <div className="h-64 overflow-hidden relative group">
                  <img 
                    src="https://www.i-vet.com.au/wp-content/uploads/2024/07/garden-irrigation-systems-1000x400.jpg" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Land Irrigation System"
                  />
                  <div className="absolute top-4 left-4 bg-primary-teal text-white text-xs uppercase tracking-widest font-black py-2 px-4 rounded-full shadow-md">
                    {language === 'en' ? "Agricultural" : "Agrícola"}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-on-surface mb-3">
                      {language === 'en' ? "Land Irrigation System" : "Sistema de Riego para Terrenos"}
                    </h3>
                    <p className="text-on-surface-variant font-medium text-sm leading-relaxed mb-6">
                      {language === 'en' 
                        ? "Robust, high-capacity broad-acreage layout crafted for agricultural fields, orchards, rustic terrains, and rural estate expansions." 
                        : "Esquemas robustos de gran capacidad diseñados para campos agrícolas, huertos de árboles frutales, predios rústicos y terrenos de gran escala."}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {[
                        language === 'en' ? "Long-range LoRa Wireless Control" : "Control Inalámbrico de Largo Alcance (LoRa)",
                        language === 'en' ? "High-volume Flow Management" : "Control de Flujo de Alto Volumen",
                        language === 'en' ? "Soil Nutrient & Pumping Sync" : "Sincronización de Bombeo y Nutrientes"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs text-on-surface-variant font-semibold">
                          <CheckCircle2 size={16} className="text-primary-teal shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => {
                      if (!isOwner) {
                        setLockedSystemClicked('land');
                      } else {
                        navigate('/checkout', { state: { package: 'Estate' } });
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-150 text-primary-teal hover:bg-primary-teal hover:text-white hover:border-transparent py-3 px-6 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>{language === 'en' ? "Configure Land System" : "Configurar Sistema de Terreno"}</span>
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Dynamic beautiful lock modal overlay inside Hero */}
          {lockedSystemClicked && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in text-center">
              <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 text-white relative shadow-2xl">
                <button 
                  onClick={() => setLockedSystemClicked(null)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer font-black"
                  id="close-lock-modal"
                >
                  ✕
                </button>
                <div className="w-16 h-16 bg-[#ff5a00]/10 border border-[#ff5a00]/20 text-[#ff5a00] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#ff5a00]/10">
                  <Lock size={28} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff5a00] mb-2 block">
                  {language === 'en' ? "Access Restricted" : "Acceso Restringido"}
                </span>
                <h3 className="font-display text-2xl font-black tracking-tight mb-4 text-white">
                  {lockedSystemClicked === 'company' 
                    ? (language === 'en' ? "Company Irrigation System" : "Sistema de Riego Comercial")
                    : (language === 'en' ? "Land Irrigation System" : "Sistema de Riego para Terrenos")}
                </h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed mb-8">
                  {language === 'en'
                    ? "This advanced design blueprint optimization tool is private. Access is limited specifically to CEO and Owner Luis De La Rosa."
                    : "Esta herramienta de optimización de diseños avanzados es privada. El acceso está limitado específicamente al CEO y Propietario Luis De La Rosa."}
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full py-3 px-6 rounded-xl bg-[#ff5a00] hover:bg-[#e04f00] text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer"
                  >
                    {language === 'en' ? "Login as Owner" : "Iniciar Sesión como Propietario"}
                  </button>
                  <button
                    onClick={() => setLockedSystemClicked(null)}
                    className="w-full py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 border border-slate-750 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                  >
                    {language === 'en' ? "Close" : "Cerrar"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* See It In Action Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6 font-sans overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-slate-900 border-x-0 sm:border border-slate-100 dark:border-slate-800 rounded-none sm:rounded-[2.5rem] w-full max-w-4xl shadow-2xl flex flex-col max-h-screen sm:max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-3rem)] overflow-y-auto my-auto"
            >
              {/* Modal Header */}
              <div className="px-4 sm:px-8 py-3 sm:py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850/50">
                <div className="text-left">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary-teal block mb-1">
                    {language === 'en' ? "Product Demonstration" : "Demostración del Producto"}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-black text-on-surface">
                    Diivoo WiFi Water Timer - {language === 'en' ? "See it in Action" : "Verlo en Acción"}
                  </h3>
                </div>
                <button 
                  onClick={() => {
                    setShowVideoModal(false);
                    setIsEditingVideo(false);
                  }}
                  className="p-2 sm:p-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white rounded-full transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow-md border border-slate-200/50 dark:border-slate-700/50"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Source Mode Tabs */}
              <div className="px-4 sm:px-8 py-2.5 sm:py-3 bg-slate-50 dark:bg-slate-950/30 border-b border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-1 bg-slate-200/60 dark:bg-slate-800/80 p-1 rounded-2xl overflow-x-auto max-w-full">
                  {[
                    { id: 'youtube', label: language === 'en' ? 'YouTube Stream' : 'Transmisión YouTube', icon: Youtube },
                    { id: 'local_file', label: language === 'en' ? 'Local Video File' : 'Archivo de Video Local', icon: Upload },
                    { id: 'direct_url', label: language === 'en' ? 'Direct MP4 Link' : 'Enlace Directo MP4', icon: LinkIcon }
                  ].map((mode) => {
                    const Icon = mode.icon;
                    const isActive = videoSourceType === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => {
                          setVideoSourceType(mode.id as any);
                          localStorage.setItem("diivoo_video_source_type", mode.id);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all uppercase tracking-wider cursor-pointer whitespace-nowrap ${
                          isActive 
                            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                        }`}
                      >
                        <Icon size={13} />
                        {mode.label}
                      </button>
                    );
                  })}
                </div>
                
                {/* Clear custom file if loaded */}
                {videoSourceType === 'local_file' && localVideoUrl && (
                  <button 
                    onClick={() => {
                      if (localVideoUrl) {
                        URL.revokeObjectURL(localVideoUrl);
                      }
                      setLocalVideoFile(null);
                      setLocalVideoUrl(null);
                    }}
                    className="text-xs text-rose-500 hover:text-rose-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {language === 'en' ? "Remove Selected Video" : "Quitar Video Seleccionado"}
                  </button>
                )}
              </div>

              {/* YouTube Playlist Sub-bar if in youtube source mode */}
              {videoSourceType === 'youtube' && (
                <div className="px-4 sm:px-8 py-2.5 sm:py-3 bg-slate-100/50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center justify-start text-left">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                    {language === 'en' ? "Select Video Guide:" : "Seleccionar Guía de Video:"}
                  </span>
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        const savedId = localStorage.getItem("diivoo_custom_video_id") || "avUnP7mhRi0";
                        setVideoId(savedId);
                      }}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all border ${
                        videoId !== '69moriBnSWA'
                          ? 'bg-primary-teal border-primary-teal text-white shadow-sm shadow-primary-teal/20'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                      } cursor-pointer`}
                    >
                      <Play size={11} className={videoId !== '69moriBnSWA' ? 'text-white' : 'text-primary-teal'} />
                      <span className="truncate">{language === 'en' ? "Video 1: Guide" : "Video 1: Guía"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoId('69moriBnSWA');
                      }}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all border ${
                        videoId === '69moriBnSWA'
                          ? 'bg-primary-teal border-primary-teal text-white shadow-sm shadow-primary-teal/20'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                      } cursor-pointer`}
                    >
                      <Play size={11} className={videoId === '69moriBnSWA' ? 'text-white' : 'text-primary-teal'} />
                      <span className="truncate">{language === 'en' ? "Video 2: Demo" : "Video 2: Demo"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Video Screen with higher min-height and aspect-ratio on mobile */}
              <div className="relative aspect-video bg-black w-full overflow-hidden min-h-[250px] xs:min-h-[290px] sm:min-h-0">
                {videoSourceType === 'youtube' ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`}
                    title="Diivoo WiFi Water Timer Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                ) : videoSourceType === 'direct_url' ? (
                  <div className="absolute inset-0 w-full h-full bg-slate-950 flex flex-col items-center justify-center">
                    <video
                      src={directVideoUrl}
                      controls
                      autoPlay
                      className="absolute inset-0 w-full h-full object-contain"
                      onError={() => {
                        // Handle error gracefully if URL fails to play
                      }}
                    />
                    
                    {/* Floating Info Overlay for changing URL */}
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 z-10">
                      <p className="text-white text-xs font-medium flex-1 text-left">
                        {language === 'en' 
                          ? "Reproducing from direct custom MP4 link." 
                          : "Reproduciendo desde enlace directo MP4 personalizado."}
                      </p>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <input 
                          type="text"
                          value={directVideoUrl}
                          onChange={(e) => {
                            setDirectVideoUrl(e.target.value);
                            localStorage.setItem("dioo_custom_direct_url", e.target.value);
                          }}
                          placeholder="Paste Direct Video link (e.g. .mp4)"
                          className="px-3 py-1.5 bg-slate-800 text-white border border-slate-700 rounded-xl text-xs flex-1 sm:w-64 focus:outline-none focus:ring-1 focus:ring-primary-teal"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // local_file mode
                  localVideoUrl ? (
                    <video
                      src={localVideoUrl}
                      controls
                      autoPlay
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  ) : (
                    /* Elegant Drop Zone with visual feedback */
                    <div 
                      onDragOver={(e) => { 
                        e.preventDefault(); 
                        setIsDragging(true); 
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          const file = e.dataTransfer.files[0];
                          if (file.type.startsWith('video/')) {
                            setLocalVideoFile(file);
                            const url = URL.createObjectURL(file);
                            setLocalVideoUrl(url);
                          }
                        }
                      }}
                      className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all ${
                        isDragging ? 'bg-primary-teal/20 border-4 border-dashed border-primary-teal' : 'bg-slate-900'
                      }`}
                    >
                      <div className="w-16 h-16 bg-white/5 dark:bg-white/10 rounded-3xl flex items-center justify-center mb-5 text-primary-teal shadow-xl">
                        <Upload size={32} className="animate-pulse" />
                      </div>
                      <h4 className="text-white font-display text-xl font-black mb-2">
                        {language === 'en' ? "Drag & Drop Your Video File Here" : "Arrastra y Suelta tu Video Aquí"}
                      </h4>
                      <p className="text-slate-400 text-xs max-w-md mb-6 leading-relaxed">
                        {language === 'en'
                          ? "Have the recorded video on your computer? Drag and drop your .mp4 or .mov file directly to play it instantly with full hardware support."
                          : "¿Tienes el video grabado en tu computadora? Arrástralo y suéltalo aquí en formato .mp4 o .mov para reproducirlo inmediatamente con soporte completo de hardware."}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <label className="px-6 py-3 bg-primary-teal hover:bg-primary-teal/90 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg active:scale-95">
                          {language === 'en' ? "Browse file" : "Examinar archivo"}
                          <input 
                            type="file" 
                            accept="video/*" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setLocalVideoFile(file);
                                const url = URL.createObjectURL(file);
                                setLocalVideoUrl(url);
                              }
                            }}
                            className="hidden" 
                          />
                        </label>
                        
                        <button
                          type="button"
                          onClick={() => {
                            setVideoSourceType('youtube');
                            localStorage.setItem("diivoo_video_source_type", "youtube");
                          }}
                          className="px-6 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                        >
                          {language === 'en' ? "Go Back to YouTube" : "Regresar a YouTube"}
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-850/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
                <div className="flex-1 text-left">
                  <p className="text-[11px] sm:text-xs text-on-surface-variant font-medium leading-normal sm:leading-relaxed max-w-xl">
                    {language === 'en' 
                      ? "If embedding is blocked inside this sandbox preview, use the 'Local Video File' tab to drag-and-drop your video directly, or configure a direct stream link."
                      : "Si la inserción está bloqueada dentro del visor, use la pestaña 'Archivo de Video Local' para arrastrar y soltar su video directamente."}
                  </p>
                  
                  {/* Owner Feature - Edit YouTube ID */}
                  {isOwner && videoSourceType === 'youtube' && (
                    <div className="mt-3">
                      {!isEditingVideo ? (
                        <button 
                          onClick={() => {
                            setIsEditingVideo(true);
                            setNewVideoInput(videoId);
                          }}
                          className="text-[10px] sm:text-[11px] text-[#0284c7] hover:underline font-bold flex items-center gap-1 cursor-pointer bg-transparent border-0"
                        >
                          <Settings size={12} /> {language === 'en' ? "Change YouTube Video ID (Owner Only)" : "Cambiar ID de YouTube (Solo Propietario)"}
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 max-w-md mt-2">
                          <input 
                            type="text"
                            value={newVideoInput}
                            onChange={(e) => setNewVideoInput(e.target.value)}
                            placeholder="Paste YouTube ID (e.g., jH8sIAtN76w)"
                            className="px-3 py-1.5 bg-white text-on-surface dark:bg-slate-805 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#0284c7] flex-1"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              let finalId = newVideoInput.trim();
                              // Parse standard YouTube URL if pasted
                              if (finalId.includes("v=")) {
                                finalId = finalId.split("v=")[1].split("&")[0];
                              } else if (finalId.includes("youtu.be/")) {
                                finalId = finalId.split("youtu.be/")[1].split("?")[0];
                              } else if (finalId.includes("embed/")) {
                                finalId = finalId.split("embed/")[1].split("?")[0];
                              }
                              
                              setVideoId(finalId);
                              localStorage.setItem("diivoo_custom_video_id", finalId);
                              setIsEditingVideo(false);
                            }}
                            className="px-3 py-1.5 bg-[#0284c7] hover:bg-[#0284c7]/90 text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
                          >
                            {language === 'en' ? "Save" : "Guardar"}
                          </button>
                          <button 
                            type="button"
                            onClick={() => setIsEditingVideo(false)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-500 font-bold rounded-xl text-xs uppercase cursor-pointer"
                          >
                            {language === 'en' ? "Cancel" : "Cancelar"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-3 shrink-0 justify-center">
                  <button 
                    onClick={() => {
                      setShowVideoModal(false);
                      navigate('/demo');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 bg-primary-teal hover:bg-primary-teal/90 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {language === 'en' ? "Launch Interactive Simulator" : "Lanzar Simulador Interactivo"}
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const ZoneSimulator = () => {
  const { t, language } = useLanguage();
  const [zones, setZones] = useState([
    { 
      id: 1, 
      name: "North Garden", 
      status: "Hydrated", 
      moisture: 82, 
      plant: "Peonies",
      lastWatered: "2h 15m ago",
      soilPh: 6.8,
      sunlight: "85%",
      nutrients: "Optimal",
      thresholds: { min: 65, max: 80 },
      schedule: { frequency: 'Daily', startTime: '05:30', duration: 15 },
      history: [
        { time: "Yesterday, 05:30", duration: 15, volume: 45 },
        { time: "2 days ago, 05:30", duration: 15, volume: 45 },
        { time: "3 days ago, 05:30", duration: 12, volume: 36 }
      ],
      moistureHistory: [
        { day: "6d ago", moisture: 70 },
        { day: "5d ago", moisture: 75 },
        { day: "4d ago", moisture: 68 },
        { day: "3d ago", moisture: 80 },
        { day: "2d ago", moisture: 72 },
        { day: "1d ago", moisture: 69 },
        { day: "Today", moisture: 82 }
      ]
    },
    { 
      id: 2, 
      name: "Front Lawn", 
      status: "Hydrated", 
      moisture: 65, 
      plant: "Bermuda Grass",
      lastWatered: "6h 40m ago",
      soilPh: 7.2,
      sunlight: "92%",
      nutrients: "Moderate",
      thresholds: { min: 60, max: 85 },
      schedule: { frequency: 'Weekly', startTime: '06:00', duration: 30 },
      history: [
        { time: "Last Monday, 06:00", duration: 30, volume: 90 },
        { time: "May 5, 06:00", duration: 30, volume: 90 }
      ],
      moistureHistory: [
        { day: "6d ago", moisture: 58 },
        { day: "5d ago", moisture: 62 },
        { day: "4d ago", moisture: 70 },
        { day: "3d ago", moisture: 64 },
        { day: "2d ago", moisture: 59 },
        { day: "1d ago", moisture: 68 },
        { day: "Today", moisture: 65 }
      ]
    },
    { 
      id: 3, 
      name: "Orchard", 
      status: "Watering", 
      moisture: 42, 
      plant: "Citrus Trees",
      lastWatered: "Running Now",
      soilPh: 6.5,
      sunlight: "78%",
      nutrients: "Critical",
      thresholds: { min: 50, max: 70 },
      schedule: { frequency: 'Specific Days', startTime: '04:00', duration: 45, days: ['Mon', 'Wed', 'Fri'] },
      history: [
        { time: "Monday, 04:00", duration: 45, volume: 135 },
        { time: "Sunday, 04:00", duration: 20, volume: 60 }
      ],
      moistureHistory: [
        { day: "6d ago", moisture: 65 },
        { day: "5d ago", moisture: 58 },
        { day: "4d ago", moisture: 52 },
        { day: "3d ago", moisture: 48 },
        { day: "2d ago", moisture: 44 },
        { day: "1d ago", moisture: 40 },
        { day: "Today", moisture: 42 }
      ]
    },
    { 
      id: 4, 
      name: "Side Walk", 
      status: "Hydrated", 
      moisture: 58, 
      plant: "Fescue",
      lastWatered: "1d ago",
      soilPh: 7.0,
      sunlight: "60%",
      nutrients: "Good",
      thresholds: { min: 55, max: 80 },
      schedule: { frequency: 'Daily', startTime: '21:00', duration: 10 },
      history: [
        { time: "Tuesday, 21:00", duration: 10, volume: 30 },
        { time: "Monday, 21:00", duration: 10, volume: 30 }
      ],
      moistureHistory: [
        { day: "6d ago", moisture: 72 },
        { day: "5d ago", moisture: 68 },
        { day: "4d ago", moisture: 64 },
        { day: "3d ago", moisture: 60 },
        { day: "2d ago", moisture: 57 },
        { day: "1d ago", moisture: 55 },
        { day: "Today", moisture: 58 }
      ]
    }
  ]);

  const [editingScheduleId, setEditingScheduleId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showHistoryId, setShowHistoryId] = useState<number | null>(null);
  const [selectedZoneIds, setSelectedZoneIds] = useState<number[]>([]);
  
  const [showBatchScheduleModal, setShowBatchScheduleModal] = useState(false);
  const [batchDuration, setBatchDuration] = useState(15);
  const [batchStartTime, setBatchStartTime] = useState("06:00");
  const [batchFrequency, setBatchFrequency] = useState("Daily");

  useEffect(() => {
    if (showBatchScheduleModal && selectedZoneIds.length > 0) {
      const firstSelectedZone = zones.find(z => z.id === selectedZoneIds[0]);
      if (firstSelectedZone && firstSelectedZone.schedule) {
        setBatchDuration(firstSelectedZone.schedule.duration || 15);
        setBatchStartTime(firstSelectedZone.schedule.startTime || "06:00");
        setBatchFrequency(firstSelectedZone.schedule.frequency || "Daily");
      }
    }
  }, [showBatchScheduleModal, selectedZoneIds]);

  const applyBatchSchedule = (newDuration: number, newStartTime: string, newFrequency?: string) => {
    setZones(prev => prev.map(z => {
      if (selectedZoneIds.includes(z.id)) {
        const updatedSchedule = { 
          ...z.schedule, 
          duration: newDuration, 
          startTime: newStartTime 
        };
        if (newFrequency) {
          updatedSchedule.frequency = newFrequency;
        }
        return {
          ...z,
          schedule: updatedSchedule
        };
      }
      return z;
    }));
    setSelectedZoneIds([]);
    setShowBatchScheduleModal(false);
  };
  const [groups, setGroups] = useState<{ name: string; ids: number[] }[]>([
    { name: "Front Yard", ids: [1, 2] },
    { name: "Back Garden", ids: [3, 4] }
  ]);
  const [isNamingGroup, setIsNamingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [presets, setPresets] = useState([
    { name: "Eco Hydration", schedule: { frequency: 'Daily', startTime: '05:00', duration: 8 }, thresholds: { min: 60, max: 75 } },
    { name: "Deep Soak", schedule: { frequency: 'Weekly', startTime: '04:00', duration: 45 }, thresholds: { min: 70, max: 90 } },
    { name: "Summer Grass", schedule: { frequency: 'Daily', startTime: '20:00', duration: 15 }, thresholds: { min: 65, max: 80 } }
  ]);
  const [showPresetsId, setShowPresetsId] = useState<number | null>(null);
  const [groupBy, setGroupBy] = useState<'none' | 'plant' | 'status' | 'custom'>('none');
  const [editingGroup, setEditingGroup] = useState<{ name: string; ids: number[] } | null>(null);
  const [alerts, setAlerts] = useState<{ id: string; type: string; title: string; message: string; severity: 'info' | 'warning' | 'critical' }[]>([]);
  const [recommendations, setRecommendations] = useState<Record<number, string>>({});
  const [loadingAdvice, setLoadingAdvice] = useState<number | null>(null);
  const [weather] = useState({ temp: 24, humidity: 62, wind: 5 });

  const toggleZoneSelection = (id: number) => {
    setSelectedZoneIds(prev => 
      prev.includes(id) ? prev.filter(zid => zid !== id) : [...prev, id]
    );
  };

  const deleteGroup = (name: string) => {
    setGroups(prev => prev.filter(g => g.name !== name));
  };

  const saveGroup = (group: { name: string; ids: number[] }) => {
    if (group.name.trim()) {
      setGroups(prev => {
        const filtered = prev.filter(g => g.name !== group.name);
        return [...filtered, group];
      });
      setEditingGroup(null);
    }
  };

  const saveCurrentSelectionAsGroup = () => {
    if (newGroupName.trim() && selectedZoneIds.length > 0) {
      saveGroup({ name: newGroupName, ids: [...selectedZoneIds] });
      setNewGroupName('');
      setIsNamingGroup(false);
      setSelectedZoneIds([]);
      setGroupBy('custom');
    }
  };

  const startBulkWatering = () => {
    setZones(prev => prev.map(z => 
      selectedZoneIds.includes(z.id) ? { ...z, status: 'Watering' } : z
    ));
    setSelectedZoneIds([]);
  };

  const stopBulkWatering = () => {
    setZones(prev => prev.map(z => 
      selectedZoneIds.includes(z.id) ? { ...z, status: 'Hydrated' } : z
    ));
    setSelectedZoneIds([]);
  };

  const adjustBulkSchedules = (duration: number) => {
    setZones(prev => prev.map(z => 
      selectedZoneIds.includes(z.id) ? { ...z, schedule: { ...z.schedule, duration } } : z
    ));
    setSelectedZoneIds([]);
  };
  
  const applyPresetToSelected = (preset: any) => {
    setZones(prev => prev.map(z => 
      selectedZoneIds.includes(z.id) ? { ...z, schedule: { ...preset.schedule }, thresholds: { ...preset.thresholds } } : z
    ));
    setSelectedZoneIds([]);
  };

  const applyPresetToZone = (zoneId: number, preset: any) => {
    setZones(prev => prev.map(z => 
      z.id === zoneId ? { ...z, schedule: { ...preset.schedule }, thresholds: { ...preset.thresholds } } : z
    ));
    setShowPresetsId(null);
  };

  const saveAsPreset = (zone: any) => {
    const name = `${zone.plant} Preset`;
    setPresets(prev => [...prev.filter(p => p.name !== name), { 
      name, 
      schedule: { ...zone.schedule }, 
      thresholds: { ...zone.thresholds } 
    }]);
  };

  useEffect(() => {
    if (expandedId !== null && !recommendations[expandedId]) {
      const zone = zones.find(z => z.id === expandedId);
      if (zone) {
        const fetchAdvice = async () => {
          setLoadingAdvice(expandedId);
          const advice = await getGardenAdvice(`Provide a specific, one-sentence gardening recommendation for a ${zone.plant} zone named "${zone.name}". Current metrics: ${zone.moisture}% moisture, ${zone.soilPh} soil pH, ${zone.sunlight} sunlight, and ${zone.nutrients} nutrients. Keep it professional, actionable, and under 150 characters.`);
          setRecommendations(prev => ({ ...prev, [zone.id]: advice }));
          setLoadingAdvice(null);
        };
        fetchAdvice();
      }
    }
  }, [expandedId, recommendations, zones]);
  const [reservoirRaw, setReservoirRaw] = useState(85);
  const [calibration, setCalibration] = useState({ min: 0, max: 100 });
  const [isCalibrating, setIsCalibrating] = useState(false);

  const reservoirLevel = Math.max(0, Math.min(100, Math.round(((reservoirRaw - calibration.min) / (calibration.max - calibration.min)) * 100)));

  const setFull = () => setCalibration(prev => ({ ...prev, max: reservoirRaw }));
  const setEmpty = () => setCalibration(prev => ({ ...prev, min: reservoirRaw }));
  const resetCalibration = () => setCalibration({ min: 0, max: 100 });

  const getNextWateringText = (schedule: any) => {
    if (!schedule) return "Not Scheduled";
    const { frequency, startTime, days } = schedule;
    if (frequency === 'Daily') return `Today at ${startTime}`;
    if (frequency === 'Weekly') return `In 4 days at ${startTime}`;
    if (frequency === 'Specific Days' && days) return `On ${days[0]} at ${startTime}`;
    return `Scheduled: ${startTime}`;
  };

  const updateSchedule = (id: number, field: string, value: any) => {
    setZones(prev => prev.map(z => z.id === id ? {
      ...z,
      schedule: { ...z.schedule, [field]: value }
    } : z));
  };

  const clearHistory = (id: number) => {
    setZones(prev => prev.map(z => z.id === id ? { ...z, history: [] } : z));
  };

  return (
    <section id="simulator" className="pt-16 pb-2 px-6 md:px-12 bg-surface-container relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="font-display text-4xl mb-4 tracking-tight">{t("dashboardTitle")}</h2>
            <p className="text-on-surface-variant font-medium max-w-xl">{t("dashboardSubtitle")}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 bg-background-paper p-1.5 rounded-2xl border border-surface-container shadow-sm mr-auto md:mr-0 min-w-max">
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-3 border-r border-surface-container">{t("viewBy")}</span>
              <div className="flex gap-1">
                {[
                  { label: t("grid"), value: 'none', icon: Layout },
                  { label: t("plant"), value: 'plant', icon: Leaf },
                  { label: t("statusKey"), value: 'status', icon: Droplets },
                  { label: t("groupsKey"), value: 'custom', icon: ShieldCheck }
                ].map((option) => (
                  <button 
                    key={option.value}
                    onClick={() => setGroupBy(option.value as any)}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all flex items-center gap-1.5 ${groupBy === option.value ? 'bg-primary-teal text-white shadow-md' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container/80'}`}
                  >
                    <option.icon size={10} /> {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-background-paper p-1.5 rounded-2xl border border-surface-container shadow-sm mr-auto md:mr-0 min-w-max">
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant px-3 border-r border-surface-container">{t("selectGroup")}</span>
              <div className="flex gap-1">
                {[
                  { label: language === 'en' ? 'All' : 'Todos', filter: () => true },
                  { label: language === 'en' ? 'Grass' : 'Césped', filter: (z: any) => z.plant.toLowerCase().includes('grass') },
                  { label: language === 'en' ? 'Active' : 'Activos', filter: (z: any) => z.status === 'Watering' },
                  ...groups.map(g => ({ label: g.name, filter: (z: any) => g.ids.includes(z.id), isCustom: true }))
                ].map((group: any) => (
                  <div key={group.label} className="flex items-center group/btn">
                    <button 
                      onClick={() => {
                        const ids = zones.filter(group.filter).map(z => z.id);
                        setSelectedZoneIds(ids);
                      }}
                      className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight bg-surface-container hover:bg-primary-teal hover:text-white transition-all whitespace-nowrap"
                    >
                      {group.label}
                    </button>
                    {group.isCustom && (
                      <div className="flex w-0 overflow-hidden group-hover/btn:w-auto group-hover/btn:ml-1 transition-all">
                        <button 
                          onClick={() => setEditingGroup(groups.find(g => g.name === group.label) || null)}
                          className="p-1 text-primary-teal hover:bg-primary-teal/10 rounded"
                        >
                          <Settings size={10} />
                        </button>
                        <button 
                          onClick={() => deleteGroup(group.label)}
                          className="p-1 text-rose-500 hover:bg-rose-500/10 rounded"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button 
                  onClick={() => setEditingGroup({ name: '', ids: [] })}
                  className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight border border-dashed border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white transition-all flex items-center gap-1"
                >
                  <Plus size={10} /> New
                </button>
              </div>
            </div>

            <div className="flex gap-4 p-2 bg-background-paper rounded-2xl shadow-sm border border-surface-container flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 border-r border-surface-container">
                <Thermometer size={18} className="text-orange-500" />
                <span className="font-bold">{weather.temp}°C</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border-r border-surface-container">
                <Droplets size={18} className="text-primary-teal" />
                <span className="font-bold">{weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border-r border-surface-container">
                <Wind size={18} className="text-blue-400" />
                <span className="font-bold">{weather.wind} km/h</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 relative">
                <Waves size={18} className="text-cyan-600" />
                <div className="flex flex-col">
                  <span className="font-bold text-cyan-600">Reservoir: {reservoirLevel}%</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsCalibrating(!isCalibrating)}
                      className="text-[9px] font-black uppercase tracking-tighter text-on-surface-variant/50 hover:text-primary-teal transition-colors flex items-center gap-1"
                    >
                      <Settings size={10} /> Calibrate
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isCalibrating && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute top-full right-0 mt-2 p-4 bg-background-paper rounded-2xl shadow-xl border border-surface-container z-50 w-48"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-on-surface-variant">Sensor Calibration</p>
                      <div className="space-y-2">
                        <button 
                          onClick={setFull}
                          className="w-full py-2 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-lg hover:bg-emerald-500/20 transition-colors"
                        >
                          Set Current as Full
                        </button>
                        <button 
                          onClick={setEmpty}
                          className="w-full py-2 bg-rose-500/10 text-rose-500 text-xs font-bold rounded-lg hover:bg-rose-500/20 transition-colors"
                        >
                          Set Current as Empty
                        </button>
                        <button 
                          onClick={resetCalibration}
                          className="w-full py-2 text-on-surface-variant text-[10px] font-bold hover:text-on-surface transition-colors"
                        >
                          Reset Defaults
                        </button>
                      </div>
                      <div className="mt-3 pt-3 border-t border-surface-container flex flex-col gap-2">
                         <p className="text-[10px] text-on-surface-variant font-medium">Simulate Level:</p>
                         <input 
                           type="range" 
                           value={reservoirRaw} 
                           onChange={(e) => setReservoirRaw(Number(e.target.value))}
                           className="w-full accent-primary-teal" 
                         />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <AnimatePresence>
            {editingGroup && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
              >
                <div className="bg-background-paper w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-surface-container">
                  <div className="p-8 bg-primary-teal text-white flex justify-between items-center shrink-0">
                    <div>
                      <h3 className="font-display text-2xl font-bold">Custom Zone Group</h3>
                      <p className="text-xs opacity-70 font-black uppercase tracking-widest mt-1">Configure bulk action target</p>
                    </div>
                    <button onClick={() => setEditingGroup(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="p-8 space-y-8 overflow-y-auto max-h-[60vh] scrollbar-thin">
                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant block">Group Name</label>
                      <input 
                        type="text" 
                        value={editingGroup.name}
                        onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
                        placeholder="e.g., Morning Mist Zones"
                        className="w-full bg-surface-container border border-surface-container rounded-2xl px-6 py-4 font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-teal/30 transition-all"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Assigned Zones</label>
                        <span className="text-[10px] font-bold text-primary-teal italic">{editingGroup.ids.length} zones selected</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {zones.map(zone => (
                          <button 
                            key={zone.id}
                            onClick={() => {
                              const newIds = editingGroup.ids.includes(zone.id)
                                ? editingGroup.ids.filter(id => id !== zone.id)
                                : [...editingGroup.ids, zone.id];
                              setEditingGroup({ ...editingGroup, ids: newIds });
                            }}
                            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                              editingGroup.ids.includes(zone.id) 
                                ? 'bg-primary-teal/5 border-primary-teal shadow-sm' 
                                : 'bg-background-paper border-surface-container hover:bg-surface-container'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-xl ${editingGroup.ids.includes(zone.id) ? 'bg-primary-teal text-white' : 'bg-surface-container text-on-surface-variant'}`}>
                                <Droplets size={16} />
                              </div>
                              <div>
                                <p className="font-bold text-sm tracking-tight">{zone.name}</p>
                                <p className="text-[10px] text-on-surface-variant font-bold uppercase">{zone.plant}</p>
                              </div>
                            </div>
                            {editingGroup.ids.includes(zone.id) ? (
                              <CheckCircle2 size={18} className="text-primary-teal" />
                            ) : (
                              <Plus size={18} className="text-on-surface-variant/30 group-hover:text-primary-teal transition-colors" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 bg-surface-container border-t border-background-paper flex gap-4 shrink-0">
                    <button 
                      onClick={() => setEditingGroup(null)}
                      className="flex-1 py-4 bg-background-paper text-on-surface rounded-2xl font-bold hover:bg-surface-container transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      disabled={!editingGroup.name.trim() || editingGroup.ids.length === 0}
                      onClick={() => saveGroup(editingGroup)}
                      className="flex-[2] py-4 bg-primary-teal text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary-teal/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                    >
                      Save Configuration
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showBatchScheduleModal && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-background-paper w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-surface-container"
                >
                  <div className="p-8 bg-gradient-to-tr from-primary-teal to-teal-500 text-white flex justify-between items-center shrink-0">
                    <div>
                      <h3 className="font-display text-2xl font-bold">Batch Schedule Zones</h3>
                      <p className="text-xs opacity-70 font-black uppercase tracking-widest mt-1 font-sans">Configure multiple zones simultaneously</p>
                    </div>
                    <button onClick={() => setShowBatchScheduleModal(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="p-8 space-y-6 overflow-y-auto max-h-[60vh] scrollbar-thin">
                    {/* Zones list overview */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant block font-sans">Target Zones ({selectedZoneIds.length})</label>
                      <div className="flex flex-wrap gap-2 p-3 bg-surface-container rounded-2xl border border-surface-container/40">
                        {zones.filter(z => selectedZoneIds.includes(z.id)).map(z => (
                          <div key={z.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background-paper rounded-xl text-xs font-bold border border-surface-container/60 shadow-sm text-on-surface">
                            <span className="w-2 h-2 rounded-full bg-primary-teal animate-pulse" />
                            <span>{z.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Duration Controller */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant font-sans">Watering Duration</label>
                        <span className="text-sm font-black text-primary-teal font-mono">{batchDuration} minutes</span>
                      </div>
                      <div className="flex items-center gap-4 bg-surface-container/40 p-4 rounded-2xl border border-surface-container">
                        <Timer size={18} className="text-primary-teal" />
                        <input 
                          type="range" 
                          min={5}
                          max={120}
                          step={5}
                          value={batchDuration} 
                          onChange={(e) => setBatchDuration(Number(e.target.value))}
                          className="flex-1 accent-primary-teal" 
                        />
                      </div>
                    </div>

                    {/* Start Time Controller */}
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant font-sansblock font-sans">Watering Start Time</label>
                      <div className="flex items-center gap-4 bg-surface-container/40 p-4 rounded-2xl border border-surface-container">
                        <Calendar size={18} className="text-primary-teal" />
                        <input 
                          type="time" 
                          value={batchStartTime} 
                          onChange={(e) => setBatchStartTime(e.target.value)}
                          className="flex-1 bg-transparent font-bold text-on-surface focus:outline-none focus:ring-0 text-sm font-sans" 
                        />
                      </div>
                    </div>

                    {/* Frequency Adjustment */}
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant font-sans">Watering Frequency</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Daily", "Weekly", "Specific Days"].map(freq => (
                          <button
                            key={freq}
                            type="button"
                            onClick={() => setBatchFrequency(freq)}
                            className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                              batchFrequency === freq 
                                ? 'bg-primary-teal text-white border-primary-teal shadow-md shadow-primary-teal/10' 
                                : 'bg-surface-container/40 border-surface-container hover:bg-surface-container/60 text-on-surface-variant'
                            }`}
                          >
                            {freq}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 bg-surface-container border-t border-background-paper flex gap-4 shrink-0">
                    <button 
                      onClick={() => setShowBatchScheduleModal(false)}
                      className="flex-1 py-4 bg-background-paper text-on-surface rounded-2xl font-bold hover:bg-surface-container transition-all text-sm"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => applyBatchSchedule(batchDuration, batchStartTime, batchFrequency)}
                      className="flex-[2] py-4 bg-primary-teal text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary-teal/20 hover:scale-105 active:scale-95 transition-all"
                    >
                      Apply Schedule
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {/* Alerts section removed as per user request */}
          </AnimatePresence>
          {Object.entries(zones.reduce((acc, zone) => {
            let keys: string[] = [];
            if (groupBy === 'none') keys = ['All Irrigation Zones'];
            else if (groupBy === 'plant') keys = [zone.plant];
            else if (groupBy === 'status') keys = [zone.status];
            else if (groupBy === 'custom') {
              const memberGroups = groups.filter(g => g.ids.includes(zone.id)).map(g => g.name);
              keys = memberGroups.length > 0 ? memberGroups : ['Unassigned'];
            }
            
            keys.forEach(key => {
              if (!acc[key]) acc[key] = [];
              if (!acc[key].some((z: any) => z.id === zone.id)) {
                acc[key].push(zone);
              }
            });
            return acc;
          }, {} as Record<string, any[]>)).map(([groupKey, groupZones]: [string, any[]], gIdx, arr) => {
            const isCustomGroup = groupBy === 'custom' && groups.some(g => g.name === groupKey);
            return (
              <div key={groupKey} className="space-y-6">
                {groupBy !== 'none' && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                  >
                    <h3 className="font-display text-2xl font-bold flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-primary-teal rounded-full" />
                      {groupKey}
                      {isCustomGroup && (
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-primary-teal/10 text-primary-teal px-2 py-1 rounded-full border border-primary-teal/20">
                          Custom Group
                        </span>
                      )}
                      <span className="text-xs font-black text-on-surface-variant/50 bg-surface-container px-2 py-1 rounded-lg tabular-nums">
                        {groupZones.length}
                      </span>
                    </h3>
                    <div className="h-px flex-1 bg-surface-container border-t border-dashed" />
                    <div className="flex gap-2">
                       {isCustomGroup && (
                         <button 
                           onClick={() => setEditingGroup(groups.find(g => g.name === groupKey) || null)}
                           className="text-[9px] font-black uppercase tracking-widest text-primary-teal hover:bg-primary-teal/5 px-4 py-2 rounded-xl transition-all border border-primary-teal/10 flex items-center gap-1.5"
                         >
                           <Settings size={10} /> Edit Group
                         </button>
                       )}
                       <button 
                         onClick={() => {
                           const ids = groupZones.map(z => z.id);
                           setSelectedZoneIds(prev => Array.from(new Set([...prev, ...ids])));
                         }}
                         className="text-[9px] font-black uppercase tracking-widest text-primary-teal hover:bg-primary-teal/5 px-4 py-2 rounded-xl transition-all border border-primary-teal/10"
                       >
                         {isCustomGroup ? 'Select All in Group' : 'Select Category'}
                       </button>
                    </div>
                  </motion.div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                    {groupZones.map((zone) => (
                      <motion.div 
                        key={zone.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={editingScheduleId || expandedId === zone.id ? {} : { y: -5, scale: 1.01 }}
                        className={`bg-background-paper p-6 rounded-[2.5rem] border transition-all flex flex-col h-full shadow-sm hover:shadow-md ${
                          zone.status === 'Watering'
                            ? 'watering-pulse ring-4 ring-emerald-500/10'
                            : selectedZoneIds.includes(zone.id)
                              ? 'border-primary-teal ring-4 ring-primary-teal/5'
                              : expandedId === zone.id
                                ? 'border-primary-teal/40'
                                : 'border-surface-container'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => toggleZoneSelection(zone.id)}
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${selectedZoneIds.includes(zone.id) ? 'bg-primary-teal border-primary-teal text-white' : 'border-surface-container hover:border-primary-teal/50'}`}
                            >
                              {selectedZoneIds.includes(zone.id) && <Plus size={14} className="rotate-45" />}
                            </button>
                            <div className={`p-3 rounded-2xl ${zone.status === 'Watering' ? 'bg-primary-teal text-white animate-pulse' : 'bg-secondary-container text-secondary-green'}`}>
                              {zone.status === 'Watering' ? <Activity size={24} /> : <Droplets size={24} />}
                            </div>
                          </div>
                          <div className="flex gap-2">
                             {/* Group Badges */}
                             <div className="flex -space-x-1 group/badges mr-2">
                               {groups.filter(g => g.ids.includes(zone.id)).slice(0, 2).map((g, gi) => (
                                 <div 
                                   key={gi} 
                                   className="w-4 h-4 rounded-full bg-primary-teal border-2 border-white flex items-center justify-center text-[6px] font-black text-white"
                                   title={g.name}
                                 >
                                   {g.name[0]}
                                 </div>
                               ))}
                               {groups.filter(g => g.ids.includes(zone.id)).length > 2 && (
                                 <div className="w-4 h-4 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[6px] font-black text-slate-500">
                                   +{groups.filter(g => g.ids.includes(zone.id)).length - 2}
                                 </div>
                               )}
                             </div>
                            <button 
                              onClick={() => setExpandedId(expandedId === zone.id ? null : zone.id)}
                              className={`p-2 rounded-lg transition-colors ${expandedId === zone.id ? 'bg-primary-teal/10 text-primary-teal' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}
                              title="Deep Insights"
                            >
                              <BarChart3 size={18} />
                            </button>
                            <button 
                              onClick={() => setEditingScheduleId(editingScheduleId === zone.id ? null : zone.id)}
                              className={`p-2 rounded-lg transition-colors ${editingScheduleId === zone.id ? 'bg-primary-teal text-white' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}
                            >
                              <Settings size={18} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                        <h3 className="font-display text-xl font-bold mb-1">{zone.name}</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">{zone.plant}</p>
                          <div className="w-1 h-1 bg-surface-container rounded-full" />
                          <div className="flex items-center gap-1 text-[10px] text-primary-teal font-black uppercase tracking-tighter">
                             <Calendar size={10} /> Next: {getNextWateringText(zone.schedule)}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 flex-1">
                        <AnimatePresence mode="wait">
                          {editingScheduleId === zone.id ? (
                            <motion.div
                              key="edit"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-4 overflow-hidden pt-2"
                            >
                              <div className="p-4 bg-surface-container rounded-2xl border border-background-paper space-y-4">
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Frequency</label>
                                    <select 
                                      value={zone.schedule.frequency}
                                      onChange={(e) => updateSchedule(zone.id, 'frequency', e.target.value)}
                                      className="text-xs bg-transparent font-bold text-primary-teal focus:outline-none"
                                    >
                                      <option>Daily</option>
                                      <option>Weekly</option>
                                      <option>Specific Days</option>
                                    </select>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Starts At</label>
                                    <input 
                                      type="time"
                                      value={zone.schedule.startTime}
                                      onChange={(e) => updateSchedule(zone.id, 'startTime', e.target.value)}
                                      className="text-xs bg-transparent font-bold text-primary-teal focus:outline-none"
                                    />
                                  </div>
                                  <div className="flex justify-between items-center border-b border-background-paper/50 pb-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Duration</label>
                                    <div className="flex items-center gap-2">
                                      <input 
                                        type="number"
                                        value={zone.schedule.duration}
                                        onChange={(e) => updateSchedule(zone.id, 'duration', Number(e.target.value))}
                                        className="w-10 text-xs bg-transparent font-bold text-primary-teal focus:outline-none text-right"
                                      />
                                      <span className="text-[10px] font-bold text-on-surface-variant">mins</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">Moisture Thresholds</p>
                                  <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-bold text-on-surface-variant">Min Target</label>
                                    <div className="flex items-center gap-2">
                                      <input 
                                        type="number"
                                        value={zone.thresholds?.min || 60}
                                        onChange={(e) => setZones(prev => prev.map(z => z.id === zone.id ? { ...z, thresholds: { ...z.thresholds, min: Number(e.target.value) } } : z))}
                                        className="w-8 text-xs bg-transparent font-bold text-primary-teal focus:outline-none text-right"
                                      />
                                      <span className="text-[10px] font-bold text-on-surface-variant">%</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-bold text-on-surface-variant">Max Limit</label>
                                    <div className="flex items-center gap-2">
                                      <input 
                                        type="number"
                                        value={zone.thresholds?.max || 80}
                                        onChange={(e) => setZones(prev => prev.map(z => z.id === zone.id ? { ...z, thresholds: { ...z.thresholds, max: Number(e.target.value) } } : z))}
                                        className="w-8 text-xs bg-transparent font-bold text-primary-teal focus:outline-none text-right"
                                      />
                                      <span className="text-[10px] font-bold text-on-surface-variant">%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col gap-2">
                                <div className="relative">
                                  <button 
                                    onClick={() => setShowPresetsId(showPresetsId === zone.id ? null : zone.id)}
                                    className="w-full py-2.5 border border-primary-teal/20 text-primary-teal rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-teal/5 flex items-center justify-center gap-2 transition-all"
                                  >
                                    <Sparkles size={12} /> Apply Preset
                                  </button>
                                  <AnimatePresence>
                                    {showPresetsId === zone.id && (
                                      <motion.div 
                                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                        className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-background-paper rounded-2xl shadow-xl border border-surface-container z-50"
                                      >
                                        {presets.map(p => (
                                          <button 
                                            key={p.name}
                                            onClick={() => applyPresetToZone(zone.id, p)}
                                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-primary-teal hover:text-white transition-all flex justify-between items-center"
                                          >
                                            {p.name}
                                            <ChevronRight size={10} />
                                          </button>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                                
                                <button 
                                  onClick={() => saveAsPreset(zone)}
                                  className="w-full py-2.5 bg-surface-container text-on-surface-variant rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-background-paper hover:text-on-surface transition-all flex items-center justify-center gap-2"
                                >
                                  <Plus size={12} /> Save Current as Preset
                                </button>

                                <button 
                                  onClick={() => setEditingScheduleId(null)}
                                  className="w-full py-3 bg-primary-teal text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-primary-teal/20 mt-2"
                                >
                                  Save Routine
                                </button>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="view"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="space-y-4"
                            >
                              <div className="flex justify-between text-sm items-end">
                                <span className="text-sm font-bold text-on-surface-variant flex items-center gap-2">
                                  Moisture <span className="text-[10px] text-primary-teal opacity-60">(ideal {zone.thresholds?.min || 60}-{zone.thresholds?.max || 80}%)</span>
                                </span>
                                <span className={`font-display text-2xl font-black ${zone.moisture < (zone.thresholds?.min || 50) ? 'text-orange-500' : 'text-primary-teal'}`}>{zone.moisture}%</span>
                              </div>
                              <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${zone.moisture}%` }}
                                  className={`h-full ${zone.moisture < (zone.thresholds?.min || 50) ? 'bg-orange-500' : 'bg-primary-teal'}`}
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3 py-2">
                                <div className="p-3 bg-surface-container rounded-xl">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant mb-1 flex items-center gap-1">
                                    <History size={10} /> Last Cycle
                                  </p>
                                  <p className="text-xs font-bold">{zone.lastWatered}</p>
                                </div>
                                <div className="p-3 bg-surface-container rounded-xl">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant mb-1 flex items-center gap-1">
                                    <Timer size={10} /> Runtime
                                  </p>
                                  <p className="text-xs font-bold">{zone.schedule.duration}m</p>
                                </div>
                              </div>

                              <AnimatePresence>
                                {expandedId === zone.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pt-2 space-y-3 overflow-hidden border-t border-surface-container"
                                  >
                                     <div className="flex justify-between items-center mb-2">
                                       <p className="text-[10px] font-black uppercase tracking-widest text-primary-teal">Botanical Metrics</p>
                                       <button 
                                         onClick={() => setShowHistoryId(showHistoryId === zone.id ? null : zone.id)}
                                         className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary-teal transition-colors flex items-center gap-1"
                                       >
                                         <BarChart3 size={10} /> {showHistoryId === zone.id ? 'Hide Trend' : 'Moisture Trend'}
                                       </button>
                                     </div>

                                     <AnimatePresence mode="wait">
                                       {showHistoryId === zone.id ? (
                                          <motion.div
                                            key="history"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-2 py-2"
                                          >
                                            <div className="flex justify-between items-center mb-1">
                                              <p className="text-[9px] font-black uppercase text-on-surface-variant">7-Day Soil Moisture (%)</p>
                                            </div>
                                            <div className="h-32 w-full pt-1">
                                              <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart
                                                  data={zone.moistureHistory || []}
                                                  margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                                                >
                                                  <defs>
                                                    <linearGradient id={`colorMoisture-${zone.id}`} x1="0" y1="0" x2="0" y2="1">
                                                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4}/>
                                                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0}/>
                                                    </linearGradient>
                                                  </defs>
                                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                  <XAxis 
                                                    dataKey="day" 
                                                    tickLine={false} 
                                                    axisLine={false} 
                                                    tick={{ fontSize: 8, fill: '#64748b', fontWeight: 'bold' }}
                                                  />
                                                  <YAxis 
                                                    domain={[0, 100]} 
                                                    tickLine={false} 
                                                    axisLine={false} 
                                                    tick={{ fontSize: 8, fill: '#64748b', fontWeight: 'bold' }}
                                                  />
                                                  <Tooltip 
                                                    contentStyle={{ 
                                                      backgroundColor: '#ffffff', 
                                                      border: '1px solid #e2e8f0', 
                                                      borderRadius: '8px',
                                                      fontSize: '9px',
                                                      fontWeight: 'bold',
                                                      padding: '4px 8px',
                                                      boxShadow: '0 2px 4px -1px rgb(0 0 0 / 0.05)'
                                                    }}
                                                    labelStyle={{ color: '#0f172a' }}
                                                    itemStyle={{ color: '#0d9488', padding: 0 }}
                                                  />
                                                  <Area 
                                                    type="monotone" 
                                                    dataKey="moisture" 
                                                    name="Moisture"
                                                    stroke="#0d9488" 
                                                    strokeWidth={2} 
                                                    fillOpacity={1} 
                                                    fill={`url(#colorMoisture-${zone.id})`} 
                                                  />
                                                </AreaChart>
                                              </ResponsiveContainer>
                                            </div>
                                          </motion.div>
                                       ) : (
                                         <motion.div
                                           key="metrics"
                                           initial={{ opacity: 0, x: -20 }}
                                           animate={{ opacity: 1, x: 0 }}
                                           exit={{ opacity: 0, x: 20 }}
                                           className="space-y-2"
                                         >
                                           <div className="flex justify-between items-center text-xs">
                                             <span className="text-on-surface-variant font-medium">Soil pH Level</span>
                                             <span className="font-bold text-emerald-600">{zone.soilPh} pH</span>
                                           </div>
                                           <div className="flex justify-between items-center text-xs">
                                             <span className="text-on-surface-variant font-medium">Sunlight Exposure</span>
                                             <span className="font-bold text-orange-500">{zone.sunlight}</span>
                                           </div>
                                           <div className="flex justify-between items-center text-xs">
                                             <span className="text-on-surface-variant font-medium">Nutrient Density</span>
                                             <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                                               zone.nutrients === 'Optimal' ? 'bg-emerald-500/10 text-emerald-600' :
                                               zone.nutrients === 'Moderate' ? 'bg-orange-500/10 text-orange-600' :
                                               'bg-rose-500/10 text-rose-600'
                                             }`}>{zone.nutrients}</span>
                                           </div>
                                         </motion.div>
                                       )}
                                     </AnimatePresence>
                                     <div className="mt-4 p-3 bg-primary-teal/5 rounded-xl border border-primary-teal/10 relative overflow-hidden">
                                       <p className="text-[8px] font-black uppercase text-primary-teal mb-1 flex items-center gap-1">
                                         <Sparkles size={8} /> AI Recommendation
                                       </p>
                                       <div className="text-[10px] text-on-surface-variant leading-tight min-h-[1.5em]">
                                         {loadingAdvice === zone.id ? (
                                           <div className="flex items-center gap-2 text-primary-teal/50 animate-pulse bg-primary-teal/10 rounded px-2 py-1 w-fit">
                                             <Activity size={10} className="animate-spin" /> Analyzing root data...
                                           </div>
                                         ) : (
                                           recommendations[zone.id] || (zone.moisture < 50 ? 'Soil tension rising. Consider adding moisture-retaining mulch.' : 'Hydration levels optimal for current evaporation rate.')
                                         )}
                                       </div>
                                     </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                                  <div className={`w-2 h-2 rounded-full ${zone.status === 'Watering' ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`} />
                                  {zone.status}
                                </div>
                                <button 
                                  onClick={() => setExpandedId(expandedId === zone.id ? null : zone.id)}
                                  className="text-[10px] font-black uppercase tracking-widest text-primary-teal flex items-center gap-1 hover:brightness-90"
                                >
                                  {expandedId === zone.id ? 'Close' : 'Analysis'} {expandedId === zone.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {gIdx === arr.length - 1 && (
                  <motion.button 
                    whileHover={{ scale: 0.98 }}
                    className="border-2 border-dashed border-surface-container rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 text-on-surface-variant/50 hover:border-primary-teal hover:text-primary-teal transition-all group min-h-[300px]"
                  >
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-teal group-hover:text-white transition-all">
                      <Plus size={24} />
                    </div>
                    <span className="font-bold text-sm">Add New Zone</span>
                  </motion.button>
                )}
              </div>
            </div>
          )})}
        </div>

        <AnimatePresence>
          {selectedZoneIds.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6"
            >
              <div className="bg-primary-teal text-white p-4 md:p-6 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-white/20 backdrop-blur-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-xl">
                    {selectedZoneIds.length}
                  </div>
                  <div>
                    <h4 className="font-bold">Zones Selected</h4>
                    <p className="text-xs opacity-70">Bulk actions will apply to all highlighted areas.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  {isNamingGroup ? (
                    <motion.div 
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <input 
                        type="text"
                        placeholder="Group Name"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder:text-white/50"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && saveCurrentSelectionAsGroup()}
                      />
                      <button 
                        onClick={saveCurrentSelectionAsGroup}
                        className="px-4 py-2 bg-white text-primary-teal rounded-xl font-bold text-xs hover:bg-opacity-90"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => setIsNamingGroup(false)}
                        className="text-white/70 text-xs px-2"
                      >
                        Cancel
                      </button>
                    </motion.div>
                  ) : (
                    <button 
                      onClick={() => setIsNamingGroup(true)}
                      className="flex-1 md:flex-none px-4 py-3 bg-white/10 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={14} /> Save Group
                    </button>
                  )}

                  <button 
                    onClick={startBulkWatering}
                    className="flex-1 md:flex-none px-6 py-3 bg-white text-primary-teal rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <Activity size={14} /> Start
                  </button>
                  <button 
                    onClick={stopBulkWatering}
                    className="flex-1 md:flex-none px-6 py-3 bg-rose-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={14} /> Stop
                  </button>
                  <button 
                    onClick={() => adjustBulkSchedules(15)}
                    className="flex-1 md:flex-none px-6 py-3 bg-white/10 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Timer size={14} /> Sync 15m
                  </button>

                  <button 
                    onClick={() => setShowBatchScheduleModal(true)}
                    className="flex-1 md:flex-none px-6 py-3 bg-white text-primary-teal rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar size={14} /> Batch Schedule
                  </button>

                  <div className="relative">
                    <button 
                      onClick={() => setShowPresetsId(showPresetsId === -1 ? null : -1)}
                      className="flex-1 md:flex-none px-6 py-3 bg-white/10 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles size={14} /> Presets
                    </button>
                    <AnimatePresence>
                      {showPresetsId === -1 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full right-0 mb-2 p-2 bg-background-paper rounded-2xl shadow-xl border border-surface-container w-48 text-on-surface"
                        >
                          <p className="text-[10px] font-black uppercase tracking-widest p-2 text-on-surface-variant">Apply Preset</p>
                          {presets.map(p => (
                            <button 
                              key={p.name}
                              onClick={() => {
                                applyPresetToSelected(p);
                                setShowPresetsId(null);
                              }}
                              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-primary-teal hover:text-white transition-all flex justify-between items-center group"
                            >
                              {p.name}
                              <ChevronRight size={10} className="opacity-0 group-hover:opacity-100" />
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button 
                    onClick={() => setSelectedZoneIds([])}
                    className="p-3 bg-white/10 rounded-xl hover:bg-white/20"
                    title="Cancel Selection"
                  >
                    <Plus size={18} className="translate-x-[1px] rotate-45" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', id?: string, content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsOpenLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0 || (messages.length === 1 && messages[0].id === 'greeting')) {
      setMessages([
        {
          id: 'greeting',
          role: 'assistant',
          content: language === 'es'
            ? '¡Hola! Soy tu experto en jardinería de Itsi. Pregúntame lo que quieras sobre el cuidado de plantas, programas de riego u optimización del jardín.'
            : 'Hi! I am your Itsi Garden Expert. Ask me anything about plant care, irrigation schedules, or yard optimization.'
        }
      ]);
    }
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsOpenLoading(true);

    const advice = await getGardenAdvice(userMsg, language);
    setMessages(prev => [...prev, { role: 'assistant', content: advice }]);
    setIsOpenLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-primary-teal text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[60] group"
      >
        <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl z-[60] flex flex-col overflow-hidden border border-slate-200"
          >
            <div className="bg-primary-teal p-6 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <Leaf size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold">AQ-Assistant</h3>
                  <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold">
                    {language === 'es' ? "Conocimiento Científico" : "Expert Plant Knowledge"}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-primary-teal text-white rounded-tr-none' 
                      : 'bg-slate-100 text-on-surface rounded-tl-none font-medium'
                    }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-surface-container border-t border-background-paper flex gap-2 shrink-0">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'es' ? "Pregunta sobre tus plantas..." : "Ask about your plants..."}
                className="flex-1 bg-background-paper border border-surface-container rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-teal/20 transition-all font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="w-12 h-12 bg-primary-teal text-white rounded-xl flex items-center justify-center hover:brightness-110 disabled:grayscale transition-all"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Features = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: CloudRain,
      title: t("feat1Title"),
      desc: t("feat1Desc"),
      color: "bg-emerald-500/10"
    },
    {
      icon: Home,
      title: t("feat2Title"),
      desc: t("feat2Desc"),
      color: "bg-blue-500/10"
    },
    {
      icon: Wifi,
      title: t("feat3Title"),
      desc: t("feat3Desc"),
      color: "bg-purple-500/10"
    }
  ];

  return (
    <section className="pt-8 pb-10 bg-background-paper px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl mb-6 tracking-tight">{t("featuresTitle")}</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            {t("featuresSubtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-[2.5rem] bg-surface-container hover:bg-background-paper hover:shadow-2xl hover:shadow-primary-teal/5 transition-all duration-500 border border-transparent hover:border-surface-container flex flex-col"
            >
              <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <f.icon className="text-primary-teal" size={32} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-on-surface-variant leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const getProductKey = (name: string) => {
  const norm = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (norm.includes("aquacore") || norm.includes("diivo")) return "aquacore-v2";
  if (norm.includes("sprinkler array") || norm.includes("matriz de 4")) return "sprinkler-array";
  if (norm.includes("infrastructure") || norm.includes("instalacion")) return "infrastructure-installation";
  if (norm.includes("mobile app") || norm.includes("app movil")) return "standard-mobile-app";
  
  if (norm.includes("logic processor") || norm.includes("procesador de logica")) return "pro-processor";
  if (norm.includes("pressure heads") || norm.includes("cabezales de alta")) return "pro-heads";
  if (norm.includes("sense probe") || norm.includes("sonda sensor")) return "pro-probe";
  if (norm.includes("network sync") || norm.includes("sincronia de red")) return "pro-sync";
  
  if (norm.includes("pump") || norm.includes("bomba")) return "estate-pump";
  if (norm.includes("sprayer") || norm.includes("aspersor")) return "estate-sprayers";
  if (norm.includes("probe mesh") || norm.includes("malla sonda")) return "estate-mesh";
  if (norm.includes("api access") || norm.includes("acceso prioritario")) return "estate-api";

  if (norm.includes("custom controller") || norm.includes("controlador a medida")) return "custom-controller";
  if (norm.includes("tailored sprinkler") || norm.includes("cantidad de aspersores")) return "tailored-sprinklers";
  if (norm.includes("bespoke fit") || norm.includes("ajuste estetico")) return "bespoke-fit";
  if (norm.includes("custom code") || norm.includes("soporte prioritario")) return "custom-code";
  
  return null;
};

const PricingPackagesFeatureItem = ({ feat, index }: { feat: string; index: number; key?: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const productKey = getProductKey(feat);

  return (
    <li 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (productKey) {
          navigate(`/product/${productKey}`);
        }
      }}
      className={`flex items-center gap-2.5 p-1.5 -mx-1.5 rounded-xl transition-all ${
        productKey ? 'cursor-pointer hover:bg-teal-50/60 dark:hover:bg-slate-800/40' : ''
      }`}
    >
      <div className="w-5 h-5 bg-secondary-container rounded-full flex items-center justify-center shrink-0">
        <CheckCircle2 className="text-secondary-green" size={12} />
      </div>
      <span className="text-xs text-on-surface font-semibold">{feat}</span>
      
      {productKey && (
        <AnimatePresence>
          {isHovered && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.9, x: -4 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -4 }}
              transition={{ duration: 0.15 }}
              className="text-[8px] font-black text-primary-teal uppercase tracking-widest flex items-center gap-1 shrink-0 bg-teal-50/80 dark:bg-slate-800/80 px-1.5 py-0.5 rounded border border-primary-teal/20 ml-1"
            >
              See more details
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </li>
  );
};

const PricingPackages = ({ 
  showCostsLink = false, 
  onSelectPackage, 
  isCheckout = false, 
  highlightedPackage 
}: { 
  showCostsLink?: boolean; 
  onSelectPackage?: (pkgName: string) => void; 
  isCheckout?: boolean;
  highlightedPackage?: string;
}) => {
  const navigate = useNavigate();
  const { t, language, isLoggedIn, loggedInUser } = useLanguage();
  const isOwner = isLoggedIn && loggedInUser?.email?.toLowerCase().trim() === 'luis.delarosacosio@gmail.com';
  const packages = [
    { 
      title: language === 'en' ? "Essential" : t("pkgEssential"), 
      coverage: language === 'en' ? "4m² Coverage" : t("pkgEssentialCoverage"), 
      price: "3,031", 
      features: language === 'en' 
        ? ["Diivoo Module", "4 Sprinkler Array", "Infrastructure Installation", "Standard Mobile App"]
        : ["Módulo Diivoo", "Matriz de 4 Aspersores", "Instalacion De Infraestructura", "App Móvil Estándar"]
    },
    { 
      title: language === 'en' ? "Pro" : t("pkgPro"), 
      coverage: language === 'en' ? "6m² Coverage" : t("pkgProCoverage"), 
      price: "3,313", 
      features: language === 'en'
        ? ["Enhanced Logic Processor", "6 Sprinkler Array", "Infrastructure Installation", "Standard Mobile App"]
        : ["Procesador de Lógica Mejorado", "Matriz de 6 Aspersores", "Instalacion De Infraestructura", "App Móvil Estándar"], 
      popular: true 
    },
    { 
      title: language === 'en' ? "Estate" : t("pkgEstate"), 
      coverage: language === 'en' ? "10m² Coverage" : t("pkgEstateCoverage"), 
      price: "3,877", 
      features: language === 'en'
        ? ["Commercial Grade Pump", "8 - 10 Sprinkler Array", "Infrastructure Installation", "Standard Mobile App"]
        : ["Bomba de Grado Comercial", "Matriz de 8 - 10 Aspersores", "Instalacion De Infraestructura", "App Móvil Estándar"]
    },
    { 
      title: language === 'en' ? "Personalize Your Package" : t("pkgPersonalize"), 
      coverage: language === 'en' ? "Full Custom Coverage" : t("pkgPersonalizeCoverage"), 
      price: "4,299", 
      features: language === 'en'
        ? ["Your Custom Controller", "Personalize Qty Sprinkler Array", "Infrastructure Installation", "Standard Mobile App"]
        : ["Controlador a Medida", "Matriz de Cantidad Personalizada de Aspersores", "Instalacion De Infraestructura", "App Móvil Estándar"]
    }
  ];

  const activePackages = (isOwner || isCheckout) 
    ? packages 
    : packages.filter(p => !p.title.toLowerCase().includes('pro') && !p.title.toLowerCase().includes('estate') && !p.title.toLowerCase().includes('personalize') && !p.title.toLowerCase().includes('personaliza'));

  const content = (
    <div>
      {!isCheckout && (
        <div className="text-center mb-20">
          <span className="font-label text-primary-teal uppercase tracking-[0.2em] text-[10px] font-black mb-4 block">{t("investmentPlans")}</span>
          <h2 className="font-display text-4xl md:text-5xl mb-6 tracking-tight">{t("pricingTitle")}</h2>
          <p className="text-on-surface-variant font-medium">{t("pricingSubtitle")}</p>
        </div>
      )}
      <div className={`grid grid-cols-1 ${(isOwner || isCheckout) ? 'sm:grid-cols-2 lg:grid-cols-4' : 'max-w-sm mx-auto'} gap-6`}>
        {activePackages.map((p, i) => {
          const isSelected = highlightedPackage ? p.title.toLowerCase() === highlightedPackage.toLowerCase() : p.popular;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[2.5rem] border ${isSelected ? 'border-primary-teal shadow-2xl relative bg-background-paper ring-2 ring-primary-teal/20' : 'border-surface-container bg-background-paper hover:shadow-xl'} transition-all group flex flex-col h-full`}
            >
              {isSelected && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-teal text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                  {highlightedPackage ? (language === 'en' ? "Selected" : "Seleccionado") : t("mostPreferred")}
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-primary-teal mb-1">{p.title}</h3>
                <p className="text-sm md:text-base font-black text-on-surface-variant uppercase tracking-wide mt-1">{p.coverage}</p>
              </div>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="font-display text-4xl font-black">${p.price}</span>
                <span className="text-sm text-on-surface-variant font-bold">.99</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {p.features.map((feat, fi) => (
                  <PricingPackagesFeatureItem key={fi} feat={feat} index={fi} />
                ))}
              </ul>
              <button 
                onClick={() => {
                  if (onSelectPackage) {
                    onSelectPackage(p.title);
                  } else {
                    navigate('/checkout', { state: { package: p.title } });
                  }
                }}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${isSelected ? 'bg-primary-teal text-white shadow-lg shadow-primary-teal/20' : 'bg-surface-container text-primary-teal hover:bg-primary-teal hover:text-white'}`}
              >
                {onSelectPackage ? (language === 'en' ? `Select ${p.title}` : `Seleccionar ${p.title}`) : t("getStarted")}
              </button>
            </motion.div>
          );
        })}
      </div>
      {showCostsLink && !isCheckout && isOwner && (
        <div className="text-center mt-12 bg-slate-50 border border-slate-100 p-6 rounded-3xl max-w-2xl mx-auto">
          <p className="text-on-surface-variant font-medium text-sm">
            {language === 'en' 
              ? "All hardware-only packages require installation. " 
              : "Todos los paquetes de hardware requieren instalación. "}
            <Link to="/costs" className="text-primary-teal font-bold hover:underline">
              {language === 'en' ? "View Certified Installation Costs" : "Ver Costos de Instalación Certificada"}
            </Link> 
            {" →"}
          </p>
        </div>
      )}
    </div>
  );

  if (isCheckout) {
    return content;
  }

  return (
    <section id="kits" className="py-24 px-6 md:px-12 bg-background-paper relative">
      <div className="max-w-7xl mx-auto">
        {content}
      </div>
    </section>
  );
};

const Testimonial = () => {
  const { t } = useLanguage();
  return (
    <section className="py-12 bg-primary-teal text-white px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Quote className="text-secondary-container opacity-20 mx-auto mb-4" size={40} />
        <p className="font-display text-2xl md:text-3xl font-bold mb-6 leading-snug">
          {t("testimonialQuote")}
        </p>
        <div className="flex flex-col items-center">
          <img 
            src="https://i.pravatar.cc/150?u=sarah" 
            alt="Sarah Johnson" 
            className="w-12 h-12 rounded-full border-4 border-white/20 mb-2" 
          />
          <p className="font-display font-bold text-lg">{t("testimonialAuthor")}</p>
          <p className="text-xs text-secondary-container font-black uppercase tracking-widest">{t("testimonialRole")}</p>
        </div>
      </div>
    </section>
  );
};

const AppPreview = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <section className="pt-8 pb-6 px-6 md:px-12 bg-background-paper overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <span className="font-label text-primary-teal uppercase tracking-widest text-xs font-black mb-4 block">{t("controlAnywhere")}</span>
          <h2 className="font-display text-4xl md:text-5xl text-on-surface mb-8 leading-tight">{t("appPreviewTitle")} <br /><span className="text-primary-teal">{t("appPreviewTitleHighlight")}</span></h2>
          <p className="text-lg text-on-surface-variant font-medium mb-12 leading-relaxed max-w-lg">
            {t("appPreviewDesc")}
          </p>
          <div className="flex flex-wrap gap-6">
            <button 
              onClick={() => window.open('https://play.google.com/store/games?hl=es_MX', '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-4 bg-on-surface text-white px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl cursor-pointer"
            >
              <Smartphone size={24} />
              <div className="text-left">
                <p className="text-[10px] uppercase opacity-50 font-black">{t("downloadAppStore")}</p>
                <p className="text-lg font-bold -mt-1">App Store</p>
              </div>
            </button>
            <button 
              onClick={() => window.open('https://play.google.com/store/games?hl=es_MX', '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-4 bg-on-surface text-white px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl cursor-pointer"
            >
              <Play size={24} fill="currentColor" />
              <div className="text-left">
                <p className="text-[10px] uppercase opacity-50 font-black">{t("getGooglePlay")}</p>
                <p className="text-lg font-bold -mt-1">Google Play</p>
              </div>
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 relative group">
          <div className="absolute inset-0 bg-secondary-container/30 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative mx-auto w-72 h-[600px] bg-slate-900 rounded-[3rem] p-3 border-8 border-slate-900 shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&q=80&w=800" 
              alt="Itsi Integrated Garden App Control" 
              className="w-full h-full object-cover rounded-[2.5rem] opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return (
    <footer className="bg-background-paper border-t border-surface-container py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row flex-wrap gap-12 md:gap-x-24 lg:gap-x-32 mb-16">
          <div className="w-full md:max-w-xs lg:max-w-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary-teal rounded-lg flex items-center justify-center text-white">
                <Waves size={20} />
              </div>
              <div className="text-xl font-bold font-display tracking-tight text-primary-teal">Itsi</div>
            </div>
            <p className="text-on-surface-variant font-medium leading-relaxed mb-6">
              {language === 'en' 
                ? "The next generation of smart irrigation. Pure precision, ecological impact." 
                : "La próxima generación de riego inteligente. Pura precisión, impacto ecológico."}
            </p>
            <div className="flex gap-4 items-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-100 hover:bg-primary-teal text-slate-600 hover:text-white rounded-full transition-all text-on-surface-variant cursor-pointer hover:scale-110 flex items-center justify-center shadow-sm" id="footer-fb-icon">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-100 hover:bg-primary-teal text-slate-600 hover:text-white rounded-full transition-all text-on-surface-variant cursor-pointer hover:scale-110 flex items-center justify-center shadow-sm" id="footer-ig-icon">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-100 hover:bg-primary-teal text-slate-600 hover:text-white rounded-full transition-all text-on-surface-variant cursor-pointer hover:scale-110 flex items-center justify-center shadow-sm" id="footer-tw-icon">
                <Twitter size={18} />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-100 hover:bg-primary-teal text-slate-600 hover:text-white rounded-full transition-all text-on-surface-variant cursor-pointer hover:scale-110 flex items-center justify-center shadow-sm" id="footer-tg-icon">
                <Send size={18} />
              </a>
            </div>
          </div>
          <div className="min-w-[120px]">
            <h4 className="font-display font-bold mb-6">{language === 'en' ? "Company" : "Compañía"}</h4>
            <ul className="space-y-4 font-semibold text-sm text-on-surface-variant">
              <li><Link to="/about" className="hover:text-primary-teal transition-colors" id="footer-about-link">{language === 'en' ? "About Us" : "Sobre Nosotros"}</Link></li>
              <li><Link to="/technical" className="hover:text-primary-teal transition-colors">{language === 'en' ? "Sustainability" : "Sostenibilidad"}</Link></li>
              <li><Link to="/blog" className="hover:text-primary-teal transition-colors">{language === 'en' ? "Blog" : "Blog"}</Link></li>
            </ul>
          </div>
          <div className="min-w-[120px]">
            <h4 className="font-display font-bold mb-6">{language === 'en' ? "Connect" : "Conectar"}</h4>
            <ul className="space-y-4 font-semibold text-sm text-on-surface-variant">
              <li><Link to="/support" className="hover:text-primary-teal transition-colors">{language === 'en' ? "Support" : "Soporte"}</Link></li>
              <li><Link to="/contact" className="hover:text-primary-teal transition-colors">{language === 'en' ? "Contact" : "Contacto"}</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-on-surface-variant font-bold">
            {language === 'en' ? "© 2026 Itsi Inc. All rights reserved." : "© 2026 Itsi Inc. Todos los derechos reservados."} <span className="mx-2 text-slate-300">|</span> <span className="text-primary-teal">{language === 'en' ? "CEO & Owner Luis De La Rosa" : "CEO y Propietario Luis De La Rosa"}</span>
          </p>
          <div className="flex gap-8 text-xs font-bold text-on-surface-variant">
            <Link to="/technical" className="hover:text-primary-teal">{language === 'en' ? "Privacy Policy" : "Política de Privacidad"}</Link>
            <Link to="/technical" className="hover:text-primary-teal">{language === 'en' ? "Terms of Service" : "Términos de Servicio"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LaborCostsPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const installs = [
    { title: language === 'en' ? "Residential Setup" : t("setupResidential"), price: "400.00" },
    { title: language === 'en' ? "Standard Installation" : t("setupStandard"), price: "500.00" },
    { title: language === 'en' ? "Commercial Setup" : t("setupCommercial"), price: "1,200.00" },
    { title: language === 'en' ? "System Maintenance" : t("setupMaintenance"), price: "150.00" }
  ];

  return (
    <main className="pt-32 pb-24 bg-white min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-primary-teal font-bold mb-8 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={20} /> {language === 'en' ? "Back" : "Regresar"}
        </button>
      </div>

      {/* Hardware Precision Packages Section */}
      <PricingPackages showCostsLink={false} />

      {/* Decorative Elegant Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 my-12">
        <div className="h-px bg-surface-container" />
      </div>

      {/* Professional Certified Installation Services */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <span className="font-label text-primary-teal uppercase tracking-widest text-xs font-black mb-4 block">{t("professionalServices")}</span>
            <h2 className="font-display text-4xl md:text-5xl mb-8 tracking-tight font-bold">
              {t("laborTitle")} <br />
              <span className="text-secondary-green italic">{t("laborTitleHighlight")}</span>
            </h2>
            <p className="text-lg text-on-surface-variant mb-10 leading-relaxed font-medium">
              {t("laborSubtitle")}
            </p>
            <div className="p-8 bg-on-surface text-white rounded-[2.5rem] shadow-xl relative overflow-hidden group">
              <Waves className="absolute -right-16 -bottom-16 opacity-10 group-hover:scale-110 transition-transform duration-700" size={200} />
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-2">{t("avgInstallTime")}</p>
              <p className="font-display text-4xl mb-4 font-bold">{t("installHours")}</p>
              <div className="h-px bg-white/10 mb-4" />
              <p className="text-xs font-semibold opacity-70 italic">{t("installWalkthrough")}</p>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {installs.map((ins, i) => (
              <button 
                key={i} 
                onClick={() => navigate('/consultation', { state: { service: ins.title } })}
                className="p-8 bg-slate-50 rounded-3xl border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all group text-left"
              >
                <h4 className="font-display font-bold text-lg mb-2">{ins.title}</h4>
                <p className="text-primary-teal font-black text-2xl group-hover:scale-105 transition-transform tracking-tight">${ins.price}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Elegant Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 my-12">
        <div className="h-px bg-surface-container" />
      </div>

      {/* Maintenance Tools and Accessories */}
      <MaintenanceTools />
    </main>
  );
};

const SmartControllerSection = () => {
  const { t } = useLanguage();
  return (
    <section className="pt-10 pb-10 bg-slate-50 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-label text-primary-teal uppercase tracking-widest text-[10px] font-black mb-4 block">{t("coreHardware")}</span>
          <h2 className="font-display text-4xl md:text-5xl mb-8 tracking-tight">{t("hardwareTitle")}</h2>
          <p className="text-lg text-on-surface-variant mb-12 font-medium leading-relaxed">{t("hardwareSubtitle")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-[2rem] bg-white shadow-sm border border-slate-100 hover:shadow-xl transition-all">
              <BarChart3 className="text-primary-teal mb-4" size={28} />
              <h4 className="font-display font-bold text-xl mb-2">{t("telemetryTitle")}</h4>
              <p className="text-sm text-on-surface-variant font-medium">{t("telemetryDesc")}</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-white shadow-sm border border-slate-100 hover:shadow-xl transition-all">
              <CloudRain className="text-primary-teal mb-4" size={28} />
              <h4 className="font-display font-bold text-xl mb-2">{t("weatherGuardTitle")}</h4>
              <p className="text-sm text-on-surface-variant font-medium">{t("weatherGuardDesc")}</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-primary-teal text-white shadow-xl col-span-1 sm:col-span-2 relative overflow-hidden">
              <Wifi className="absolute -right-4 -bottom-4 opacity-10" size={120} />
              <div className="relative z-10">
                <Smartphone className="text-secondary-container mb-4" size={28} />
                <h4 className="font-display font-bold text-2xl mb-2 italic">{t("remoteCommandTitle")}</h4>
                <p className="text-sm opacity-80 font-medium max-w-sm">{t("remoteCommandDesc")}</p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img 
            src="https://raintech.ca/wp-content/uploads/2021/03/Raintech-Irrigation-slider-v1.jpg" 
            alt="Technical installation of Itsi hardware" 
            className="rounded-[3rem] shadow-2xl"
          />
          <div className="absolute -top-4 -right-4 w-4 h-4 bg-white rounded-full flex flex-col items-center justify-center border-4 border-slate-50 shadow-xl">
            <CloudRain className="text-primary-teal mb-1" size={12} />
            <span className="font-display font-black text-2xl">24°C</span>
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{t("ambient")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MaintenanceTools = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const tools = [
    { title: language === 'en' ? "Precision Saw" : t("saw"), price: "24", icon: Wrench },
    { title: language === 'en' ? "Standard Spade" : t("spade"), price: "35", icon: Layout },
    { title: language === 'en' ? "Moisture Meter" : t("moistureMeter"), price: "18", icon: Timer },
    { title: language === 'en' ? "Replacement Nozzle" : t("nozzle"), icon: Cpu, price: "12" },
    { title: language === 'en' ? "Valve Key" : t("valveKey"), price: "8", icon: Wrench },
    { title: language === 'en' ? "Sensor Probe" : t("sensorProbe"), price: "45", icon: Cpu },
    { title: language === 'en' ? "Pipe Sealant" : t("sealant"), icon: Droplets, price: "15" },
    { title: language === 'en' ? "Depth Gauge" : t("depthGauge"), price: "10", icon: Layout }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="font-label text-primary-teal uppercase tracking-widest text-xs font-black mb-4 block text-center">{t("shopEssentials")}</span>
          <h2 className="font-display text-4xl md:text-5xl mb-6 tracking-tight text-center">{t("maintenanceTitle")}</h2>
          <p className="text-lg text-on-surface-variant font-medium text-center max-w-2xl mx-auto">{t("maintenanceSubtitle")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tools.map((t, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/shop', { state: { product: t.title } })}
              className="bg-slate-50 p-8 rounded-[2rem] border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm group-hover:bg-primary-teal group-hover:text-white transition-all">
                <t.icon size={24} />
              </div>
              <h4 className="font-display font-bold text-md mb-1">{t.title}</h4>
              <p className="text-primary-teal font-black text-xl tracking-tight">${t.price}.99</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
           <button 
             onClick={() => navigate('/shop')}
             className="px-8 py-3 bg-secondary-container text-secondary-green font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-all"
           >
             {t("browseCatalog")}
           </button>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <section className="pt-2 pb-8 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto bg-primary-teal rounded-3xl p-6 md:py-10 md:px-12 text-center text-white relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
        <div className="relative z-10 leading-tight">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 tracking-tight">{t("ctaTitle")}</h2>
          <p className="text-sm md:text-base opacity-85 mb-6 max-w-lg mx-auto leading-relaxed font-semibold">
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button 
              onClick={() => navigate('/consultation')}
              className="bg-secondary-container text-secondary-green px-6 py-3 rounded-lg font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              {t("checkAvailability")}
            </button>
            <button 
              onClick={() => navigate('/technical')}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all"
            >
              {t("technicalDossier")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FullWidthBanner = () => (
  <section className="w-full aspect-[21/9] md:aspect-[3/1] max-h-[450px] overflow-hidden pt-16">
     <motion.img 
       initial={{ scale: 1.1, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       transition={{ duration: 1.5 }}
       src="https://lirp.cdn-website.com/4e6d5c82/dms3rep/multi/opt/midwest-turf-Sprinkler-2880w.jpg"
       className="w-full h-full object-cover"
       alt="Lush green grass being hydrated by a smart irrigation system"
     />
  </section>
);

// --- MAIN PAGE COMPONENTS ---

const HomePage = () => (
  <main>
    <FullWidthBanner />
    <Hero />
    <AppPreview />
  </main>
);

const SolutionsPage = () => {
  const navigate = useNavigate();
  const { language, isLoggedIn, loggedInUser } = useLanguage();
  const [lockedSystemClicked, setLockedSystemClicked] = React.useState<string | null>(null);
  
  const isOwner = isLoggedIn && loggedInUser?.email?.toLowerCase().trim() === 'luis.delarosacosio@gmail.com';
  
  return (
    <main className="pt-14 sm:pt-16 pb-0 bg-background-paper min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-teal font-bold mb-3 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Paradise
        </button>

        {/* Dynamic Three Projects Showcase Section */}
        <div className="mb-6">
          <span className="font-label text-primary-teal uppercase tracking-widest text-[10px] font-black mb-1 block">
            {language === 'en' ? "FEATURED INSTANCES" : "PROYECTOS DESTACADOS"}
          </span>
          <h2 className="font-display text-2xl md:text-3xl text-on-surface mb-2 tracking-tight font-bold">
            {language === 'en' ? "Our Showcase Projects" : "Nuestros Proyectos de Referencia"}
          </h2>
          <p className="text-lg text-on-surface-variant font-medium mb-6 max-w-3xl leading-relaxed">
            {language === 'en' 
              ? "Discover our core blueprints in action. From custom suburban homes to high-tech corporate environments and agricultural expansions, we engineer smart water solutions that elevate living ecosystems." 
              : "Descubre nuestros diseños en acción. Desde casas suburbanas personalizadas hasta entornos corporativos de alta tecnología y terrenos agrícolas, diseñamos sistemas inteligentes que elevan los entornos de vida."}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project 1: House System */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full"
            >
              <div className="h-64 overflow-hidden relative group">
                <img 
                  src="https://www.milleroutdoorsnola.com/wp-content/uploads/2024/11/irrigation-system.png" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Irrigation House System"
                />
                <div className="absolute top-4 left-4 bg-primary-teal text-white text-xs uppercase tracking-widest font-black py-2 px-4 rounded-full shadow-md">
                  {language === 'en' ? "Residential" : "Residencial"}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-on-surface mb-3">
                    {language === 'en' ? "Irrigation House System" : "Sistema de Riego para Casa"}
                  </h3>
                  <p className="text-on-surface-variant font-medium text-sm leading-relaxed mb-6">
                    {language === 'en' 
                      ? "Whisper-quiet automated hydration perfectly calibrated for home frontyards, backyard gardens, floral beds, and custom manicured lawns." 
                      : "Hidratación automatizada ultrasilenciosa perfectamente calibrada para antejardines de casas, patios traseros, jardineras florales y céspedes residenciales."}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      language === 'en' ? "Smart Soil Sensors Integration" : "Integración de Sensores de Suelo Inteligentes",
                      language === 'en' ? "Sub-surface Micro-drip Emitters" : "Emisores de Micro-goteo Subterráneo",
                      language === 'en' ? "Multi-zone Scheduling Options" : "Programación Multizona Personalizada"
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-on-surface-variant font-semibold">
                        <CheckCircle2 size={16} className="text-primary-teal shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => navigate('/checkout', { state: { package: 'Essential' } })}
                  className="w-full bg-slate-50 border border-slate-150 text-primary-teal hover:bg-primary-teal hover:text-white hover:border-transparent py-3 px-6 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 group/btn"
                >
                  <span>{language === 'en' ? "Configure House System" : "Configurar Sistema de Casa"}</span>
                  <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Project 2: Company System */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full relative"
            >
              <div className="h-64 overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Company Irrigation System"
                />
                <div className="absolute top-4 left-4 bg-secondary-green text-white text-xs uppercase tracking-widest font-black py-2 px-4 rounded-full shadow-md">
                  {language === 'en' ? "Commercial" : "Comercial"}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-on-surface mb-3">
                    {language === 'en' ? "Company Irrigation System" : "Sistema de Riego para Empresas"}
                  </h3>
                  <p className="text-on-surface-variant font-medium text-sm leading-relaxed mb-6">
                    {language === 'en' 
                      ? "High-volume, enterprise-tier watering grids designed for corporate offices, botanical parks, green roofs, and hospitality landscapes." 
                      : "Redes de riego de alto volumen y nivel empresarial diseñadas para oficinas corporativas, parques botánicos, techos verdes y complejos comerciales."}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      language === 'en' ? "Central Cloud Management App" : "Gestor Central en la Nube",
                      language === 'en' ? "Heavy-Duty Climate Protection" : "Protección Climática de Alta Durabilidad",
                      language === 'en' ? "Automated Water Conservation" : "Conservación Automatizada del Agua"
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-on-surface-variant font-semibold">
                        <CheckCircle2 size={16} className="text-secondary-green shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    if (!isOwner) {
                      setLockedSystemClicked('company');
                    } else {
                      navigate('/checkout', { state: { package: 'Pro' } });
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-150 text-secondary-green hover:bg-secondary-green hover:text-white hover:border-transparent py-3 px-6 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <span>{language === 'en' ? "Configure Company System" : "Configurar Sistema de Empresa"}</span>
                  <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Project 3: Land Irrigation System */}
            <motion.div 
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full relative"
            >
              <div className="h-64 overflow-hidden relative group">
                <img 
                  src="https://www.i-vet.com.au/wp-content/uploads/2024/07/garden-irrigation-systems-1000x400.jpg" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Land Irrigation System"
                />
                <div className="absolute top-4 left-4 bg-primary-teal text-white text-xs uppercase tracking-widest font-black py-2 px-4 rounded-full shadow-md">
                  {language === 'en' ? "Agricultural" : "Agrícola"}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold text-on-surface mb-3">
                    {language === 'en' ? "Land Irrigation System" : "Sistema de Riego para Terrenos"}
                  </h3>
                  <p className="text-on-surface-variant font-medium text-sm leading-relaxed mb-6">
                    {language === 'en' 
                      ? "Robust, high-capacity broad-acreage layout crafted for agricultural fields, orchards, rustic terrains, and rural estate expansions." 
                      : "Esquemas robustos de gran capacidad diseñados para campos agrícolas, huertos de árboles frutales, predios rústicos y terrenos de gran escala."}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      language === 'en' ? "Long-range LoRa Wireless Control" : "Control Inalámbrico de Largo Alcance (LoRa)",
                      language === 'en' ? "High-volume Flow Management" : "Control de Flujo de Alto Volumen",
                      language === 'en' ? "Soil Nutrient & Pumping Sync" : "Sincronización de Bombeo y Nutrientes"
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-on-surface-variant font-semibold">
                        <CheckCircle2 size={16} className="text-primary-teal shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => {
                    if (!isOwner) {
                      setLockedSystemClicked('land');
                    } else {
                      navigate('/checkout', { state: { package: 'Estate' } });
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-150 text-primary-teal hover:bg-primary-teal hover:text-white hover:border-transparent py-3 px-6 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <span>{language === 'en' ? "Configure Land System" : "Configurar Sistema de Terreno"}</span>
                  <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic beautiful lock modal overlay that triggers when normal user wants to access */}
        {lockedSystemClicked && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 text-center text-white relative shadow-2xl">
              <button 
                onClick={() => setLockedSystemClicked(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer font-black"
                id="close-lock-modal"
              >
                ✕
              </button>
              <div className="w-16 h-16 bg-[#ff5a00]/10 border border-[#ff5a00]/20 text-[#ff5a00] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#ff5a00]/10">
                <Lock size={28} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff5a00] mb-2 block">
                {language === 'en' ? "Access Restricted" : "Acceso Restringido"}
              </span>
              <h3 className="font-display text-2xl font-black tracking-tight mb-4 text-white">
                {lockedSystemClicked === 'company' 
                  ? (language === 'en' ? "Company Irrigation System" : "Sistema de Riego Comercial")
                  : (language === 'en' ? "Land Irrigation System" : "Sistema de Riego para Terrenos")}
              </h3>
              <p className="text-xs text-slate-300 font-medium leading-relaxed mb-8">
                {language === 'en'
                  ? "This advanced design blueprint optimization tool is private. Access is limited specifically to CEO and Owner Luis De La Rosa."
                  : "Esta herramienta de optimización de diseños avanzados es privada. El acceso está limitado específicamente al CEO y Propietario Luis De La Rosa."}
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-3 px-6 rounded-xl bg-[#ff5a00] hover:bg-[#e04f00] text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  {language === 'en' ? "Login as Owner" : "Iniciar Sesión como Propietario"}
                </button>
                <button
                  onClick={() => setLockedSystemClicked(null)}
                  className="w-full py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 border border-slate-750 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                >
                  {language === 'en' ? "Close" : "Cerrar"}
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </main>
  );
};

const SuccessCheckmark = () => {
  return (
    <div className="relative flex items-center justify-center w-36 h-36 mx-auto mb-8">
      {/* Radiating circle expansions */}
      <motion.div
        initial={{ opacity: 0.6, scale: 0.8 }}
        animate={{ opacity: 0, scale: 1.8 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        className="absolute w-28 h-28 bg-emerald-100/70 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0.4, scale: 0.8 }}
        animate={{ opacity: 0, scale: 2.2 }}
        transition={{ duration: 1.6, delay: 0.4, repeat: Infinity, ease: "easeOut" }}
        className="absolute w-28 h-28 bg-emerald-50/50 rounded-full"
      />
      
      {/* Tiny dancing highlight particles */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 360) / 8;
        const rad = (angle * Math.PI) / 180;
        const dist = 64;
        const x = Math.cos(rad) * dist;
        const y = Math.sin(rad) * dist;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.3, 0.8, 0], x, y }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
            className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400"
          />
        );
      })}

      {/* Main core circle */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
        className="relative z-10 w-28 h-28 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/30 border border-emerald-300"
      >
        <svg
          className="w-14 h-14 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3.5}
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>
    </div>
  );
};

const getPackageBreakdown = (pkgName: string, lang: 'en' | 'es') => {
  const normName = pkgName.toLowerCase().trim();
  if (normName.includes('essential') || normName.includes('esencial') || normName.includes('basic')) {
    return [
      {
        item: lang === 'en' ? "Diivoo Module" : "Módulo Diivoo",
        price: "$850.00",
        details: lang === 'en' 
          ? "High-performance smart irrigation controller with real-time zone scheduling."
          : "Módulo de control de riego inteligente con programación de zonas en tiempo real."
      },
      {
        item: lang === 'en' ? "4 Sprinkler Array" : "Matriz de 4 Aspersores",
        price: "$620.00",
        details: lang === 'en'
          ? "4 professional adjustable-angle sprinkler heads covering up to 4 meters each."
          : "4 cabezales profesionales de ángulo ajustable con cobertura de hasta 4 metros cada uno."
      },
      {
        item: lang === 'en' ? "Infrastructure Installation" : "Instalación de Infraestructura",
        price: "$1,150.00",
        details: lang === 'en'
          ? "Professional onsite assessment, underground piping layout, and pressure calibrated assembly."
          : "Evaluación profesional en sitio, trazado de tuberías subterráneas y ensamblaje calibrado de presión."
      },
      {
        item: lang === 'en' ? "Standard Mobile App" : "App Móvil Estándar",
        price: "$411.99",
        details: lang === 'en'
          ? "Complete control of your watering cycles, history tracking, and mobile updates."
          : "Control total de tus ciclos de riego, historial de seguimiento y actualizaciones móviles."
      }
    ];
  }
  if (normName.includes('pro') || normName.includes('profesional')) {
    return [
      {
        item: lang === 'en' ? "Enhanced Logic Processor" : "Procesador de Lógica Mejorado",
        price: "$950.00",
        details: lang === 'en'
          ? "Next-gen AI processor for dynamic scheduling based on real-time soil feedback."
          : "Procesador de IA de última generación para programación dinámica basada en la humedad en tiempo real."
      },
      {
        item: lang === 'en' ? "6 Sprinkler Array" : "Matriz de 6 Aspersores",
        price: "$800.00",
        details: lang === 'en'
          ? "6 high-head precision sprinkler array for optimal water propagation."
          : "Matriz de 6 aspersores de precisión para una propagación óptima del agua."
      },
      {
        item: lang === 'en' ? "Infrastructure Installation" : "Instalación de Infraestructura",
        price: "$1,150.00",
        details: lang === 'en'
          ? "Complete professional site plumbing, trenching, and certified technical assembly."
          : "Plomería profesional del sitio, excavación de zanjas y ensamblaje técnico certificado."
      },
      {
        item: lang === 'en' ? "Standard Mobile App" : "App Móvil Estándar",
        price: "$413.99",
        details: lang === 'en'
          ? "Advanced multi-zone mobile control, custom threshold notifications, and stats."
          : "Control móvil multizona avanzado, notificaciones de umbral personalizadas y estadísticas."
      }
    ];
  }
  if (normName.includes('estate') || normName.includes('finca') || normName.includes('land') || normName.includes('terreno')) {
    return [
      {
        item: lang === 'en' ? "Commercial Grade Pump" : "Bomba de Grado Comercial",
        price: "$1,350.00",
        details: lang === 'en'
          ? "Industrial pressure-booster pump with heavy duty continuous throughput limits."
          : "Bomba impulsora de presión industrial con límites de flujo continuo para trabajo pesado."
      },
      {
        item: lang === 'en' ? "8 - 10 Sprinkler Array" : "Matriz de 8 - 10 Aspersores",
        price: "$960.00",
        details: lang === 'en'
          ? "Premium array of up to 10 high-efficiency sprinklers with multi-angle calibration."
          : "Conjunto premium de hasta 10 aspersores de alta eficiencia con calibración multiangular."
      },
      {
        item: lang === 'en' ? "Infrastructure Installation" : "Instalación de Infraestructura",
        price: "$1,150.00",
        details: lang === 'en'
          ? "High-capacity commercial plumbing, trenching, soil mapping, and layout assembly."
          : "Plomería comercial de alta capacidad, excavación, mapeo de suelo y ensamblaje de diseño."
      },
      {
        item: lang === 'en' ? "Standard Mobile App" : "App Móvil Estándar",
        price: "$417.99",
        details: lang === 'en'
          ? "Real-time remote cloud monitoring, historical reports, and priority firmware updates."
          : "Monitoreo remoto en la nube en tiempo real, reportes históricos y actualizaciones de firmware."
      }
    ];
  }
  // Personalize Your Package
  return [
    {
      item: lang === 'en' ? "Your Custom Controller" : "Controlador a Medida",
      price: "$1,500.00",
      details: lang === 'en'
        ? "Custom hand-crafted luxury panel with specific modular zone expansions."
        : "Panel de lujo diseñado a mano con expansiones de zona modulares específicas."
    },
    {
      item: lang === 'en' ? "Personalize Qty Sprinkler Array" : "Cantidad Personalizada de Aspersores",
      price: "$1,100.00",
      details: lang === 'en'
        ? "Tailored layout pattern of personalized sprinklers designed for custom landscape curves."
        : "Diseño hecho a medida con aspersores personalizados para las curvas de su paisaje."
    },
    {
      item: lang === 'en' ? "Infrastructure Installation" : "Instalación de Infraestructura",
      price: "$1,150.00",
      details: lang === 'en'
        ? "Complete turnkey estate installation, custom zone calibration, and custom hydraulic test."
        : "Instalación llave en mano completa, calibración personalizada de zonas y prueba hidráulica."
    },
    {
      item: lang === 'en' ? "Standard Mobile App" : "App Móvil Estándar",
      price: "$549.99",
      details: lang === 'en'
        ? "Bespoke localized control suite, custom dashboard API integrations, and premium support."
        : "Suite de control localizado a medida, integración de API personalizada y soporte de primer nivel."
    }
  ];
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t, isLoggedIn, loggedInUser } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState(location.state?.package || "Pro");

  const isOwner = isLoggedIn && loggedInUser?.email?.toLowerCase().trim() === 'luis.delarosacosio@gmail.com';

  const [step, setStep] = useState(1);
  const [shippingName, setShippingName] = useState("");
  const [shippingEmail, setShippingEmail] = useState("");
  const [addressLine, setAddressLine] = useState("");
  
  const [bankAccount, setBankAccount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'spei' | 'wallet'>('card');
  const [speiReference] = useState(() => {
    const randomSuffix = Math.floor(1000000000 + Math.random() * 9000000000);
    return `6461 8011 5504 ${randomSuffix}`;
  });
  const [walletProvider, setWalletProvider] = useState<'paypal' | 'applepay' | 'googlepay'>('paypal');

  useEffect(() => {
    if (isLoggedIn && loggedInUser) {
      if (loggedInUser.name) setShippingName(prev => prev || loggedInUser.name);
      if (loggedInUser.email) setShippingEmail(prev => prev || loggedInUser.email);
    }
  }, [isLoggedIn, loggedInUser]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleBankAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setBankAccount(value);
    setPaymentError("");
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
    setExpiryDate(digits);
    setPaymentError("");
  };

  const formatExpiry = (val: string) => {
    if (val.length <= 2) return val;
    return `${val.slice(0, 2)}/${val.slice(2, 4)}`;
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvc(value);
    setPaymentError("");
  };

  const handleCompletePurchase = async () => {
    if (paymentMethod === 'card') {
      if (bankAccount.length !== 16) {
        setPaymentError(language === 'en' ? 'Bank Account must be exactly 16 digits.' : 'La cuenta bancaria debe tener exactamente 16 dígitos.');
        return;
      }
      if (expiryDate.length !== 4) {
        setPaymentError(language === 'en' ? 'Expiration date must be 4 digits (MM/YY).' : 'La fecha de vencimiento debe tener 4 dígitos (MM/AA).');
        return;
      }
      if (cvc.length !== 3) {
        setPaymentError(language === 'en' ? 'CVC must be exactly 3 digits.' : 'El CVC debe tener exactamente 3 dígitos.');
        return;
      }
    }
    setPaymentError("");
    
    try {
      await reservePackage({
        email: shippingEmail || "owner@itsi.com",
        package_name: selectedPackage,
      });
    } catch (e) {
      console.error("Failed to persist reservation in backend database:", e);
    }

    setStep(5);
  };
  const [systemType, setSystemType] = useState<string>(() => {
    const initialPkg = (location.state?.package || "Pro").toLowerCase();
    if (initialPkg.includes('essential') || initialPkg.includes('esencial') || initialPkg.includes('basic')) {
      return 'house';
    } else if (initialPkg.includes('pro') || initialPkg.includes('professional') || initialPkg.includes('profesional') || initialPkg.includes('company') || initialPkg.includes('empresa') || initialPkg.includes('comercial') || initialPkg.includes('commercial')) {
      return 'company';
    } else if (initialPkg.includes('estate') || initialPkg.includes('finca') || initialPkg.includes('land') || initialPkg.includes('terreno') || initialPkg.includes('residencia') || initialPkg.includes('agrícola') || initialPkg.includes('agricultural')) {
      return 'land';
    }
    return 'house';
  });

  useEffect(() => {
    if (location.state?.package) {
      const pkg = location.state.package;
      setSelectedPackage(pkg);
      const pkgLower = pkg.toLowerCase();
      if (pkgLower.includes('essential') || pkgLower.includes('esencial') || pkgLower.includes('basic')) {
        setSystemType('house');
      } else if (pkgLower.includes('pro') || pkgLower.includes('professional') || pkgLower.includes('profesional') || pkgLower.includes('company') || pkgLower.includes('empresa') || pkgLower.includes('comercial') || pkgLower.includes('commercial')) {
        setSystemType('company');
      } else if (pkgLower.includes('estate') || pkgLower.includes('finca') || pkgLower.includes('land') || pkgLower.includes('terreno') || pkgLower.includes('residencia') || pkgLower.includes('agrícola') || pkgLower.includes('agricultural')) {
        setSystemType('land');
      }
    }
  }, [location.state?.package]);

  const handleReturn = () => {
    if (step > 1 && step <= 4) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const getSystemTypeName = () => {
    if (systemType === 'house') {
      return language === 'en' ? "Configure House System" : "Configurar Sistema de Casa";
    }
    if (systemType === 'company') {
      return language === 'en' ? "Configure Company System" : "Configurar Sistema de Empresa";
    }
    if (systemType === 'land') {
      return language === 'en' ? "Configure Land System" : "Configurar Sistema de Terreno";
    }
    return language === 'en' ? "Configure House System" : "Configurar Sistema de Casa";
  };

  const isProtectedPackage = systemType !== 'house' && (
                             selectedPackage.toLowerCase().includes('pro') || 
                             selectedPackage.toLowerCase().includes('estate') || 
                             selectedPackage.toLowerCase().includes('finca') || 
                             selectedPackage.toLowerCase().includes('land') || 
                             selectedPackage.toLowerCase().includes('company') || 
                             selectedPackage.toLowerCase().includes('empresa') || 
                             selectedPackage.toLowerCase().includes('comercial') || 
                             selectedPackage.toLowerCase().includes('commercial')
                             );

  if (isProtectedPackage && !isOwner) {
    return <OwnerProtectedRoute>{null}</OwnerProtectedRoute>;
  }

  return (
    <main className="pt-[56px] sm:pt-[64px] pb-16 px-2 sm:px-4 bg-surface-container min-h-screen transition-colors duration-300">
      <div className={`${(step === 1 || step === 2) ? 'w-full max-w-[98%] lg:max-w-[98%] xl:max-w-[98%] 2xl:max-w-[98%]' : 'max-w-4xl'} mx-auto transition-all duration-500`}>
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button 
              type="button"
              onClick={() => navigate('/')} 
              className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary-teal dark:hover:border-primary-teal text-slate-700 hover:text-primary-teal dark:text-slate-300 dark:hover:text-primary-teal font-black text-[10px] sm:text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Home size={13} />
              {language === 'en' ? 'RETURN TO LANDING PAGE' : 'VOLVER AL INICIO'}
            </button>
            <span className="text-slate-300 dark:text-slate-700 font-light select-none">|</span>
            <button 
              onClick={handleReturn} 
              className="flex items-center gap-1.5 text-primary-teal font-bold hover:opacity-85 transition-all cursor-pointer text-xs sm:text-sm bg-transparent border-0 py-1"
            >
              <ArrowLeft size={16} /> {language === 'en' ? 'Return to Store' : 'Volver a la Tienda'}
            </button>
          </div>
        </div>
        
        <div className="bg-background-paper rounded-[1rem] shadow-2xl overflow-hidden border border-surface-container">
          <div className="bg-primary-teal py-3 px-6 text-white">
            <h1 className="font-display text-2xl font-bold mb-0.5 tracking-tight">
              {getSystemTypeName()}
            </h1>
            <p className="opacity-80 text-xs font-medium">
              {language === 'en' 
                ? `Configure your ${selectedPackage} Kit for delivery and priority calibration.` 
                : `Configura tu Kit ${selectedPackage} para el envío y calibración prioritaria.`}
            </p>
          </div>
          
          <div className="p-4 sm:p-5">
            {step <= 4 && (
              <div className="flex gap-4 mb-4">
                {[1, 2, 3, 4].map(s => {
                  let stepLabel = "";
                  if (s === 1) stepLabel = language === 'en' ? "Select Package" : "Seleccionar Paquete";
                  else if (s === 2) stepLabel = language === 'en' ? "Summary Items" : "Resumen de Artículos";
                  else if (s === 3) stepLabel = language === 'en' ? "Shipping" : "Envío";
                  else if (s === 4) stepLabel = language === 'en' ? "Payment" : "Pago";
                  return (
                    <div key={s} className="flex-1 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all shrink-0 ${step >= s ? 'bg-primary-teal border-primary-teal text-white' : 'border-surface-container text-on-surface-variant/30'}`}>
                        {s}
                      </div>
                      <span className="text-xs font-bold text-on-surface-variant hidden sm:inline">{stepLabel}</span>
                      <div className={`h-1 flex-1 rounded-full ${step > s ? 'bg-primary-teal' : 'bg-surface-container'}`} />
                    </div>
                  );
                })}
              </div>
            )}

            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="text-center mb-2">
                  <h2 className="text-2xl font-bold mb-2">
                    {language === 'en' ? 'Select Your Precision Package' : 'Selecciona tu Paquete de Precisión'}
                  </h2>
                  <p className="text-sm text-on-surface-variant font-medium">
                    {language === 'en'
                      ? 'Choose a professional hardware configuration built to suit your landscape perfectly.'
                      : 'Elige una configuración de hardware profesional diseñada para adaptarse perfectamente a tu jardín.'}
                  </p>
                </div>
                
                <PricingPackages 
                  isCheckout={true} 
                  highlightedPackage={selectedPackage} 
                  onSelectPackage={(pkgName) => {
                    setSelectedPackage(pkgName);
                    setStep(2);
                  }} 
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {language === 'en' ? 'Summary Items' : 'Resumen de Artículos'}
                  </h2>
                  <p className="text-sm text-on-surface-variant font-medium">
                    {language === 'en' 
                      ? `Detailed breakdown of the items included in your selected ${selectedPackage} kit.`
                      : `Desglose detallado de los artículos incluidos en tu kit ${selectedPackage} seleccionado.`}
                  </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/50">
                  <table className="w-full text-slate-800 text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-100/80 text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">
                        <th className="py-2.5 pl-6 pr-4 w-1/3">{language === 'en' ? "Item" : "Artículo"}</th>
                        <th className="py-2.5 px-4">{language === 'en' ? "Details" : "Detalles"}</th>
                        <th className="py-2.5 pl-4 pr-6 text-right w-28">{language === 'en' ? "Price" : "Precio"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs md:text-sm">
                      {getPackageBreakdown(selectedPackage, language).map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/80 transition-colors">
                          <td className="py-2.5 pl-6 pr-4 font-bold text-slate-900">{row.item}</td>
                          <td className="py-2.5 px-4 text-slate-500 font-medium leading-relaxed">{row.details}</td>
                          <td className="py-2.5 pl-4 pr-6 text-right font-mono font-bold text-primary-teal">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t border-slate-300">
                      <tr className="bg-slate-100/50">
                        <td colSpan={2} className="py-1.5 pl-6 pr-4 text-right font-bold text-slate-900 text-xs md:text-sm">
                          {language === 'en' ? "Total:" : "Total:"}
                        </td>
                        <td className="py-1.5 pl-4 pr-6 text-right font-mono font-black text-sm md:text-base text-primary-teal">
                          {selectedPackage.toLowerCase().includes('essential') || selectedPackage.toLowerCase().includes('esencial') 
                            ? "$3,031.99" 
                            : selectedPackage.toLowerCase().includes('pro') 
                              ? "$3,313.99" 
                              : selectedPackage.toLowerCase().includes('estate') || selectedPackage.toLowerCase().includes('finca') 
                                ? "$3,877.99" 
                                : "$4,299.99"}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="flex gap-4 pt-1">
                  <button 
                    id="summary-back-btn"
                    onClick={() => setStep(1)} 
                    className="flex-1 py-3 bg-surface-container text-primary-teal rounded-xl font-bold text-base hover:opacity-90 transition-opacity"
                  >
                    {language === 'en' ? 'Back' : 'Volver'}
                  </button>
                  <button 
                    id="summary-continue-btn"
                    onClick={() => setStep(3)} 
                    className="flex-[2] py-3 bg-primary-teal text-white rounded-xl font-bold text-base shadow-xl shadow-primary-teal/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{language === 'en' ? 'Continue to Shipping' : 'Continuar al Envío'}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="text-2xl font-bold mb-8">
                  {language === 'en' ? 'Shipping Information' : 'Información de Envío'}
                </h2>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                       {language === 'en' ? 'Full Name' : 'Nombre Completo'}
                     </label>
                     <input 
                       id="shipping-name-input"
                       type="text" 
                       value={shippingName}
                       onChange={(e) => setShippingName(e.target.value)}
                       className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 ring-primary-teal/20 outline-none" 
                       placeholder={language === 'en' ? 'John Doe' : 'John Doe'} 
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                       {language === 'en' ? 'Email Address' : 'Correo Electrónico'}
                     </label>
                     <input 
                       id="shipping-email-input"
                       type="email" 
                       value={shippingEmail}
                       onChange={(e) => setShippingEmail(e.target.value)}
                       className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 ring-primary-teal/20 outline-none" 
                       placeholder={language === 'en' ? "john@example.com" : "john@example.com"} 
                     />
                   </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                    {language === 'en' ? 'Address Line 1' : 'Dirección Línea 1'}
                  </label>
                  <input 
                    id="shipping-address-input"
                    type="text" 
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 ring-primary-teal/20 outline-none" 
                    placeholder={language === 'en' ? '123 Estate Drive' : '123 Estate Drive'} 
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    id="shipping-back-btn"
                    onClick={() => setStep(2)} 
                    className="flex-1 py-3 bg-surface-container text-primary-teal rounded-xl font-bold text-base hover:opacity-90 transition-opacity"
                  >
                    {language === 'en' ? 'Back' : 'Volver'}
                  </button>
                  <button 
                    id="shipping-continue-btn"
                    onClick={() => setStep(4)} 
                    className="flex-[2] py-3 bg-primary-teal text-white rounded-xl font-bold text-base shadow-xl shadow-primary-teal/20 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    {language === 'en' ? 'Continue to Payment' : 'Continuar al Pago'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-center py-2">
                <CreditCard size={48} className="mx-auto text-primary-teal mb-3" />
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-on-surface">
                  {language === 'en' ? 'Secure Transaction' : 'Transacción Segura'}
                </h2>
                <p className="text-on-surface-variant max-w-md mx-auto mb-5 text-sm">
                  {language === 'en' 
                    ? 'Choose your preferred secure payment method below to complete authorization.'
                    : 'Selecciona tu método de pago preferido a continuación para completar la autorización.'}
                </p>

                {/* Payment Method Tabs */}
                <div className="max-w-md mx-auto grid grid-cols-3 gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => { setPaymentMethod('card'); setPaymentError(""); }}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${paymentMethod === 'card' ? 'bg-white text-primary-teal shadow-md shadow-slate-200/50' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    <CreditCard size={18} />
                    <span>{language === 'en' ? 'Card' : 'Tarjeta'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPaymentMethod('spei'); setPaymentError(""); }}
                    className={`py-2.5 px-2 rounded-xl font-bold text-xs transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${paymentMethod === 'spei' ? 'bg-white text-primary-teal shadow-md shadow-slate-200/50' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    <Send size={18} className="translate-x-0.5 -translate-y-0.5" />
                    <span>{language === 'en' ? 'SPEI Transfer' : 'SPEI / Bancaria'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPaymentMethod('wallet'); setPaymentError(""); }}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${paymentMethod === 'wallet' ? 'bg-white text-primary-teal shadow-md shadow-slate-200/50' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    <Smartphone size={18} />
                    <span>{language === 'en' ? 'Digital Wallet' : 'Billetera Digital'}</span>
                  </button>
                </div>

                {/* Elegant payment input form or details based on paymentMethod */}
                <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-4 shadow-sm">
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label id="payment-bank-account-label" className="text-xs font-black uppercase tracking-widest text-slate-500 block">
                          {language === 'en' ? 'Bank Account Card (16 Digits)' : 'Cuenta Bancaria de Tarjeta (16 Dígitos)'}
                        </label>
                        <input 
                          id="payment-bank-account-input"
                          type="text" 
                          inputMode="numeric"
                          value={bankAccount}
                          onChange={handleBankAccountChange}
                          className="w-full bg-white border border-slate-200 p-4 rounded-xl focus:ring-2 ring-primary-teal/20 outline-none font-mono tracking-wider text-base" 
                          placeholder="0000 0000 0000 0000" 
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label id="payment-expiry-label" className="text-xs font-black uppercase tracking-widest text-slate-500 block">
                            {language === 'en' ? 'Expiration Date (MM/YY)' : 'Vencimiento (MM/AA)'}
                          </label>
                          <input 
                            id="payment-expiry-input"
                            type="text" 
                            inputMode="numeric"
                            value={formatExpiry(expiryDate)}
                            onChange={handleExpiryChange}
                            className="w-full bg-white border border-slate-200 p-4 rounded-xl focus:ring-2 ring-primary-teal/20 outline-none font-mono text-base text-center" 
                            placeholder="MM/YY" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label id="payment-cvc-label" className="text-xs font-black uppercase tracking-widest text-slate-500 block">
                            {language === 'en' ? 'CVC (3 digits)' : 'CVC (3 dígitos)'}
                          </label>
                          <input 
                            id="payment-cvc-input"
                            type="password" 
                            inputMode="numeric"
                            value={cvc}
                            onChange={handleCvcChange}
                            className="w-full bg-white border border-slate-200 p-4 rounded-xl focus:ring-2 ring-primary-teal/20 outline-none font-mono text-base text-center" 
                            placeholder="•••" 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'spei' && (
                    <div className="space-y-4">
                      <div className="p-3.5 bg-teal-50 border border-teal-100 rounded-xl flex items-start gap-2.5">
                        <ShieldCheck className="text-primary-teal shrink-0 mt-0.5" size={20} />
                        <div>
                          <p className="font-bold text-xs text-slate-800">
                            {language === 'en' ? 'Instant Secure SPEI' : 'Transferencia Electrónica Segura'}
                          </p>
                          <p className="text-[11px] text-slate-500 leading-normal">
                            {language === 'en' 
                              ? 'Your order will be reserved instantly. Transfer to the CLABE below to activate physical shipping.' 
                              : 'Tu pedido será reservado al instante. Transfiere a la cuenta CLABE indicada para activar el envío.'}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-slate-100 space-y-3 font-mono text-xs">
                        <div className="flex justify-between items-center py-1 border-b border-dashed border-slate-100">
                          <span className="text-slate-400 font-sans tracking-wide">{language === 'en' ? 'Bank' : 'Banco'}</span>
                          <span className="font-bold text-slate-800 text-right">STP (Itsi)</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-dashed border-slate-100">
                          <span className="text-slate-400 font-sans tracking-wide">{language === 'en' ? 'CLABE' : 'CLABE'}</span>
                          <span className="font-bold tracking-wider text-slate-900 text-right">{speiReference}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-dashed border-slate-100">
                          <span className="text-slate-400 font-sans tracking-wide">{language === 'en' ? 'Beneficiary' : 'Beneficiario'}</span>
                          <span className="font-bold text-slate-800 text-right">Itsi S.A. de C.V.</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-slate-400 font-sans tracking-wide">{language === 'en' ? 'Concept' : 'Concepto'}</span>
                          <span className="font-bold text-slate-800 uppercase text-right">AQ-{selectedPackage.slice(0,3).toUpperCase()}</span>
                        </div>
                      </div>

                      <span className="text-[10px] text-slate-400 block text-center leading-normal italic">
                        {language === 'en' 
                          ? 'Transfer details have been sent to your shipping email address.' 
                          : 'Los detalles de transferencia se han enviado a tu cuenta de correo electrónico.'}
                      </span>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && (
                    <div className="space-y-4">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-500 block mb-2">
                        {language === 'en' ? 'Select Digital Provider' : 'Elige tu Proveedor Digital'}
                      </span>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setWalletProvider('paypal')}
                          className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all outline-none cursor-pointer ${walletProvider === 'paypal' ? 'bg-sky-50 border-sky-300 text-sky-800 ring-2 ring-sky-100' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                        >
                          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center font-black italic text-blue-800 text-sm">P</div>
                          <span>PayPal</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setWalletProvider('applepay')}
                          className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all outline-none cursor-pointer ${walletProvider === 'applepay' ? 'bg-slate-950 border-slate-800 text-white ring-2 ring-slate-200' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                        >
                          <div className="w-6 h-6 flex items-center justify-center font-bold text-sm"></div>
                          <span>Apple Pay</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setWalletProvider('googlepay')}
                          className={`p-3 rounded-xl border font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all outline-none cursor-pointer ${walletProvider === 'googlepay' ? 'bg-slate-50 border-slate-300 text-slate-800 ring-2 ring-slate-100' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                        >
                          <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center py-1 px-1.5 text-[9px] font-black text-slate-500 tracking-tighter">G Pay</div>
                          <span>Google Pay</span>
                        </button>
                      </div>

                      <div className="p-3 bg-white border border-slate-100 rounded-xl text-center">
                        <p className="text-xs font-medium text-slate-600 leading-normal">
                          {walletProvider === 'paypal' && (language === 'en' ? "You will be redirected safely to PayPal authorization portal." : "Serás redirigido de forma segura al portal de autorización de PayPal.")}
                          {walletProvider === 'applepay' && (language === 'en' ? "Authorize instantly with FaceID / TouchID security loops." : "Autoriza de forma instantánea con la seguridad de FaceID / TouchID.")}
                          {walletProvider === 'googlepay' && (language === 'en' ? "Quick checkout through your linked Google Pay profiles." : "Pago rápido a través de tus perfiles vinculados en Google Pay.")}
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentError && (
                    <p id="payment-error-message" className="text-sm font-bold text-rose-500 pt-1 text-center animate-bounce">
                      ⚠️ {paymentError}
                    </p>
                  )}
                </div>

                <div className="flex gap-4 max-w-md mx-auto pt-4">
                  <button onClick={() => setStep(3)} className="flex-1 py-3 bg-surface-container text-primary-teal rounded-xl font-bold text-base hover:opacity-90 transition-opacity">
                    {language === 'en' ? 'Back' : 'Volver'}
                  </button>
                  <button onClick={handleCompletePurchase} className="flex-[2] py-3 bg-primary-teal text-white rounded-xl font-bold text-base shadow-xl shadow-primary-teal/20 hover:scale-[1.01] active:scale-[0.99] transition-all">
                    {language === 'en' ? 'Complete Purchase' : 'Completar Compra'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center py-12">
                <SuccessCheckmark />
                <h2 className="text-4xl font-bold mb-4 text-on-surface tracking-tight">
                  {language === 'en' ? 'System Secured.' : 'Sistema Asegurado.'}
                </h2>
                <p className="text-on-surface-variant max-w-md mx-auto mb-12">
                  {language === 'en'
                    ? `Your Itsi ${selectedPackage} Kit has been reserved. A calibration technician will contact you shortly to schedule installation.`
                    : `Tu Kit Itsi ${selectedPackage} ha sido reservado. Un técnico de calibración se pondrá en contacto contigo muy pronto para programar la instalación.`}
                </p>
                <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    {language === 'en' ? 'Order Tracking ID' : 'ID de Seguimiento de Pedido'}
                  </p>
                  <p className="font-mono text-xl font-bold text-primary-teal uppercase">AQ-482-991-XP</p>
                </div>
                <button onClick={() => navigate('/')} className="mt-8 text-primary-teal font-bold flex items-center gap-2 mx-auto hover:gap-4 transition-all uppercase tracking-widest text-sm">
                  {language === 'en' ? 'Back to Dashboard' : 'Volver al Panel'} <ChevronRight size={18} />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const ConsultationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const service = location.state?.service || "General Inquiry";

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/2">
           <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-teal font-bold mb-12">
            <ArrowLeft size={20} /> Back
          </button>
          <span className="font-label text-primary-teal uppercase tracking-widest text-xs font-black mb-4 block">EXPERT CONSULTATION</span>
          <h1 className="font-display text-5xl mb-8 leading-tight">Elevate your <br /><span className="text-secondary-green italic">botanical standards.</span></h1>
          <p className="text-on-surface-variant font-medium text-lg leading-relaxed mb-12">
            Our landscape curators and technical architects provide one-on-one assessments for elite properties, commercial developments, and bespoke heritage gardens.
          </p>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
               <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="text-secondary-green" size={24} />
               </div>
               <div>
                 <p className="font-bold text-lg">In-Depth Site Mapping</p>
                 <p className="text-sm text-on-surface-variant font-medium">3D topology scanning and soil micro-nutrient analysis included.</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center shrink-0">
                  <Calendar className="text-secondary-green" size={24} />
               </div>
               <div>
                 <p className="font-bold text-lg">Preferred Scheduling</p>
                 <p className="text-sm text-on-surface-variant font-medium">Priority installation windows for certified consultations.</p>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-teal/5 rounded-full blur-3xl" />
            
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <CheckCircle2 size={64} className="mx-auto text-secondary-green mb-8" />
                <h2 className="text-3xl font-bold mb-4">Request Received</h2>
                <p className="text-on-surface-variant font-medium mb-8">A curation specialist will contact you within 24 hours to finalize your assessment window.</p>
                <button onClick={() => navigate('/')} className="bg-primary-teal text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary-teal/20">Return Home</button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-8">Schedule Assessment</h2>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Service Request</label>
                  <p className="p-4 bg-white rounded-xl border border-slate-200 font-bold text-primary-teal">{service}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" className="w-full bg-white border border-slate-200 p-4 rounded-xl outline-none focus:ring-2 ring-primary-teal/20" />
                  <input type="email" placeholder="Email" className="w-full bg-white border border-slate-200 p-4 rounded-xl outline-none focus:ring-2 ring-primary-teal/20" />
                </div>
                <input type="tel" placeholder="Phone Number" className="w-full bg-white border border-slate-200 p-4 rounded-xl outline-none focus:ring-2 ring-primary-teal/20" />
                <textarea rows={4} placeholder="Tell us about your landscape..." className="w-full bg-white border border-slate-200 p-4 rounded-xl outline-none focus:ring-2 ring-primary-teal/20"></textarea>
                <button onClick={() => setSubmitted(true)} className="w-full py-5 bg-on-surface text-white rounded-2xl font-bold text-lg hover:brightness-110 active:scale-95 transition-all shadow-xl">Confirm Request</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const TechDossierPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const categories = language === 'en' ? [
    { title: "Network Architecture", icon: Wifi, items: ["Dual-band Wi-Fi 6 Protocols", "Proprietary Garden Mesh", "AES-256 Cloud Link", "Latency Resilience"] },
    { title: "Hardware Dynamics", icon: Cpu, items: ["Aerospace Grade Housing", "Hydraulic Precision Valves", "Thermal Gradient Sensor", "Impact Resistant Lens"] },
    { title: "AI Intelligence", icon: BarChart3, items: ["Neural Weather Prediction", "Zone-Specific Learning", "Anomaly Detection", "Hyper-local Adaptation"] },
    { title: "Fluid Physics", icon: Droplets, items: ["Pressure Compensation", "Mist-to-Stream Variable", "Zero-Orbit Recoil", "Sub-Surface Compatibility"] }
  ] : [
    { title: "Arquitectura de Red", icon: Wifi, items: ["Protocolos de Banda Dual Wi-Fi 6", "Malla de Jardín Patentada", "Enlace de Nube AES-256", "Resiliencia ante la Latencia"] },
    { title: "Dinámica del Hardware", icon: Cpu, items: ["Carcasa de Grado Aeroespacial", "Válvulas Hidráulicas de Precisión", "Sensor de Gradiente Térmico", "Lente Resistente a Impactos"] },
    { title: "Inteligencia Artificial", icon: BarChart3, items: ["Predicción Meteorológica Neuronal", "Aprendizaje de Zonas Específicas", "Detección de Anomalías", "Adaptación Hiperlocal"] },
    { title: "Física de Fluidos", icon: Droplets, items: ["Compensación de Presión", "Variable de Niebla a Chorro", "Retroceso de Órbita Cero", "Compatibilidad Subterránea"] }
  ];

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-teal font-bold mb-12">
          <ArrowLeft size={20} /> {language === 'en' ? "Close Dossier" : "Cerrar Dosier"}
        </button>
        <div className="mb-20">
          <span className="font-label text-primary-teal uppercase tracking-widest text-xs font-black mb-4 block">
            {language === 'en' ? "INTERNAL SPECIFICATIONS" : "ESPECIFICACIONES INTERNAS"}
          </span>
          <h1 className="font-display text-5xl md:text-7xl mb-8 tracking-tighter">
            {language === 'en' ? (
              <>The Technical <br /><span className="text-secondary-green italic">Dossier.</span></>
            ) : (
              <>El Dosier <br /><span className="text-secondary-green italic">Técnico.</span></>
            )}
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl font-medium leading-relaxed">
            {language === 'en' 
              ? "Exhaustive documentation of the hardware architecture, software protocols, and environmental physics driving the Itsi network."
              : "Documentación exhaustiva de la arquitectura de hardware, los protocolos de software y la física ambiental que impulsan la red Itsi."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {categories.map((cat, i) => (
             <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col h-full">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                   <cat.icon className="text-primary-teal" size={24} />
                </div>
                <h3 className="font-display text-xl font-bold mb-6">{cat.title}</h3>
                <ul className="space-y-4 flex-1">
                  {cat.items.map((item, ii) => (
                    <li key={ii} className="flex gap-2 items-start text-sm font-semibold text-on-surface-variant">
                      <div className="w-1.5 h-1.5 bg-primary-teal rounded-full mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 text-xs font-black uppercase tracking-widest text-primary-teal border-b-2 border-primary-teal/20 pb-1 hover:border-primary-teal transition-all flex items-center gap-2 w-fit">
                  {language === 'en' ? "View Data Sheet" : "Ver Ficha Técnica"} <ExternalLink size={12} />
                </button>
             </div>
           ))}
        </div>

        <div className="mt-24 p-12 bg-on-surface text-white rounded-[4rem] relative overflow-hidden group">
          <Waves className="absolute -right-20 -bottom-20 opacity-10 group-hover:scale-110 transition-transform duration-[2s]" size={400} />
          <div className="relative z-10 max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 italic">
              {language === 'en' ? (
                <>Precision is not random. <br />It is engineered.</>
              ) : (
                <>La precisión no es aleatoria. <br />Está diseñada.</>
              )}
            </h2>
            <p className="text-lg opacity-70 mb-10 font-medium">
              {language === 'en'
                ? "Download the full Itsi Reference Guide (2026 Edition) for comprehensive integration diagrams and environmental case studies."
                : "Descargue la Guía de Referencia completa de Itsi (Edición 2026) para obtener diagramas integrales de integración y estudios de casos ambientales."}
            </p>
            <button className="flex items-center gap-4 bg-white text-on-surface px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all">
               {language === 'en' ? "Download Reference Guide" : "Descargar Guía de Referencia"} <Download size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

const DownloadsPage = () => {
  const navigate = useNavigate();
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-20 items-center h-full pt-12">
        <div className="md:w-1/2">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-teal font-bold mb-12">
            <ArrowLeft size={20} /> Back
          </button>
          <span className="font-label text-primary-teal uppercase tracking-widest text-xs font-black mb-4 block">MOBILE COMMAND</span>
          <h1 className="font-display text-5xl mb-8 leading-tight">Control your landscape <br /><span className="text-secondary-green italic">from anywhere.</span></h1>
          <p className="text-on-surface-variant font-medium text-lg leading-relaxed mb-12">
            The Itsi companion app provides an intuitive, powerful interface for monitoring soil health, adjusting zones, and managing AI optimization on the go.
          </p>
          <div className="space-y-4">
             <button onClick={() => window.open('https://play.google.com/store/games?hl=es_MX', '_blank', 'noopener,noreferrer')} className="flex items-center gap-6 bg-on-surface text-white w-full p-6 rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl cursor-pointer">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                   <Smartphone size={32} />
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase opacity-70 font-black">Download for iOS</p>
                  <p className="text-2xl font-bold">App Store</p>
                </div>
                <ExternalLink className="ml-auto opacity-30" />
             </button>
             <button onClick={() => window.open('https://play.google.com/store/games?hl=es_MX', '_blank', 'noopener,noreferrer')} className="flex items-center gap-6 bg-on-surface text-white w-full p-6 rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl cursor-pointer">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                   <Play size={32} />
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase opacity-70 font-black">Download for Android</p>
                  <p className="text-2xl font-bold">Google Play</p>
                </div>
                <ExternalLink className="ml-auto opacity-30" />
             </button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-primary-teal/20 rounded-full blur-[100px]" />
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
            className="w-80 h-[640px] mx-auto object-cover rounded-[3.5rem] border-[12px] border-slate-900 shadow-2xl relative z-10"
            alt="App Preview"
          />
          <div className="absolute top-1/2 -right-12 bg-white p-6 rounded-3xl shadow-2xl z-20 hidden lg:block animate-bounce-slow">
             <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-emerald-50 text-secondary-green rounded-full flex items-center justify-center">
                   <CheckCircle2 size={24} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase text-slate-400">Optimization</p>
                   <p className="font-bold">Sync Complete</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const MaintenanceShopPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState<string[]>([]);
  const highlightedProduct = location.state?.product;

  const tools = [
    { id: 1, title: "Precision Saw", price: "24.99", icon: Wrench, category: "Maintenance" },
    { id: 2, title: "Standard Spade", price: "35.99", icon: Layout, category: "Hardware" },
    { id: 3, title: "Moisture Meter", price: "18.99", icon: Timer, category: "Sensors" },
    { id: 4, title: "Replacement Nozzle", price: "12.99", icon: Cpu, category: "Parts" },
    { id: 5, title: "Valve Key", price: "8.99", icon: Wrench, category: "Tools" },
    { id: 6, title: "Sensor Probe", price: "45.99", icon: Cpu, category: "Sensors" },
    { id: 7, title: "Pipe Sealant", price: "15.99", icon: Droplets, category: "Parts" },
    { id: 8, title: "Depth Gauge", price: "10.99", icon: Layout, category: "Maintenance" }
  ];

  return (
    <main className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-16">
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-teal font-bold mb-8">
              <ArrowLeft size={20} /> Back
            </button>
            <h1 className="font-display text-5xl font-bold mb-4 tracking-tight text-on-surface">The Maintenance <span className="text-secondary-green italic">Shop.</span></h1>
            <p className="text-on-surface-variant font-medium text-lg">Acquire the instruments of care for your botanical network.</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">
             <div className="relative">
                <ShoppingCart className="text-on-surface" />
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary-teal text-white rounded-full flex items-center justify-center text-[10px] font-black">{cart.length}</div>
             </div>
             <div className="h-8 w-px bg-slate-200 mx-2" />
             <button disabled={cart.length === 0} className="font-black uppercase tracking-widest text-xs text-primary-teal disabled:opacity-30">Checkout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           <div className="md:col-span-1 space-y-8">
             <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Categories</h3>
                <div className="space-y-2">
                  {['All Items', 'Hardware', 'Sensors', 'Tools', 'Maintenance', 'Replacement Parts'].map(cat => (
                    <button key={cat} className="flex items-center justify-between w-full p-4 rounded-xl text-sm font-bold border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all text-on-surface-variant hover:text-primary-teal">
                       {cat} <ChevronRight size={14} className="opacity-30" />
                    </button>
                  ))}
                </div>
             </div>
             <div className="p-8 bg-secondary-container rounded-3xl text-secondary-green">
                <Info size={24} className="mb-4" />
                <p className="font-bold mb-2">Technical Support</p>
                <p className="text-sm font-medium opacity-80 mb-6">Need help selecting the correct replacement parts for your specific zone configuration?</p>
                <button onClick={() => navigate('/consultation')} className="text-xs font-black uppercase tracking-widest border-b-2 border-secondary-green/20 pb-1">Ask a Curator</button>
             </div>
           </div>

           <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {tools.map(t => (
               <motion.div 
                 key={t.id}
                 layout
                 className={`p-8 rounded-[2.5rem] border transition-all flex flex-col group ${highlightedProduct === t.title ? 'border-primary-teal shadow-xl ring-4 ring-primary-teal/5 bg-emerald-50/10' : 'border-slate-100 bg-white hover:shadow-2xl'}`}
               >
                 <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-primary-teal">
                   <t.icon size={28} />
                 </div>
                 <div className="flex-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{t.category}</p>
                   <h3 className="font-display font-bold text-xl mb-2">{t.title}</h3>
                   <p className="text-primary-teal font-black text-2xl mb-8">${t.price}</p>
                 </div>
                 <button 
                   onClick={() => setCart([...cart, t.title])}
                   className="w-full py-4 bg-on-surface text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                 >
                   <Plus size={16} /> Add to Cart
                 </button>
               </motion.div>
             ))}
           </div>
        </div>
      </div>
       <div className="mt-24">
         <Testimonial />
       </div>
    </main>
  );
};

const DemoPage = () => {
  const navigate = useNavigate();
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 bg-white min-h-screen">
       <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <div>
               <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-primary-teal font-bold mb-8">
                <ArrowLeft size={20} /> Close Simulator
               </button>
               <h1 className="font-display text-4xl font-bold tracking-tight">Full-Scale Simulator</h1>
            </div>
            <div className="flex gap-4">
               <button className="px-6 py-2 bg-slate-100 rounded-lg text-xs font-bold text-on-surface-variant flex items-center gap-2">
                  <Bell size={14} /> Alerts (2)
               </button>
               <button className="px-6 py-2 bg-primary-teal text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-primary-teal/20">
                  <Settings size={14} /> Global Setup
               </button>
            </div>
          </div>

          <div className="space-y-12">
            <ZoneSimulator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-12 bg-on-surface text-white rounded-[4rem] relative overflow-hidden group">
                  <Waves className="absolute -right-16 -bottom-16 opacity-10 group-hover:scale-110 transition-transform duration-[2s]" size={300} />
                  <div className="relative z-10">
                    <h3 className="font-display font-bold text-3xl mb-6 italic">Current Flow Logic</h3>
                    <p className="opacity-70 font-medium mb-12 max-w-sm">The simulator is currently running on "Desert Oasis" protocol, prioritizing hydration retention over standard schedules.</p>
                    <div className="flex gap-4">
                       <button className="px-8 py-3 bg-white text-on-surface rounded-xl font-black uppercase tracking-widest text-[10px]">Change Protocol</button>
                       <button className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-black uppercase tracking-widest text-[10px]">Pause Analytics</button>
                    </div>
                  </div>
               </div>
               <div className="p-12 bg-slate-50 rounded-[4rem] border border-slate-100">
                  <h3 className="font-display font-bold text-3xl mb-8">Telemetry Cloud</h3>
                  <div className="space-y-6">
                    {[
                      { l: "Soil pH Level", v: "6.8 (Optimal)", color: "bg-emerald-500" },
                      { l: "Evaporation Rate", v: "0.4ml / hr", color: "bg-blue-400" },
                      { l: "Uplink Signal", v: "98% Stable", color: "bg-primary-teal" }
                    ].map((stat, i) => (
                      <div key={i} className="flex justify-between items-center p-6 bg-white rounded-2xl shadow-sm">
                        <p className="font-bold text-on-surface-variant">{stat.l}</p>
                        <div className="flex items-center gap-3">
                           <span className="font-black text-on-surface">{stat.v}</span>
                           <div className={`w-3 h-3 rounded-full ${stat.color} animate-pulse`} />
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
       </div>
    </main>
  );
};

const OwnerProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { language, isLoggedIn, loggedInUser } = useLanguage();
  const navigate = useNavigate();

  const isOwner = isLoggedIn && loggedInUser?.email?.toLowerCase().trim() === 'luis.delarosacosio@gmail.com';

  if (!isOwner) {
    return (
      <main className="pt-32 pb-24 px-4 bg-slate-50 min-h-screen flex items-center justify-center font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 text-center relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-16 h-16 bg-rose-550/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-rose-100">
            <Lock size={28} />
          </div>

          <h1 className="font-display text-2xl font-black text-slate-900 tracking-tight mb-3">
            {language === 'en' ? "Access Denied" : "Acceso Denegado"}
          </h1>
          
          <p className="text-xs font-black text-rose-500 uppercase tracking-widest mb-4">
            {language === 'en' ? "CEO & OWNER ONLY" : "CREDENCIALES DE PROPIETARIO REQUERIDAS"}
          </p>

          <p className="text-xs text-slate-500 font-medium leading-relaxed mb-8">
            {language === 'en' 
              ? "Access to this node is restricted to owner luis.delarosacosio@gmail.com. Please log in with the administrator profile to unlock." 
              : "El acceso a este nodo está restringido al propietario luis.delarosacosio@gmail.com. Inicia sesión con el perfil de administrador para desbloquear."}
          </p>

          <div className="space-y-3">
            <button 
              onClick={() => navigate('/login')} 
              className="w-full py-3 px-6 rounded-xl bg-[#ff5a00] hover:bg-[#e04f00] text-white font-black uppercase tracking-wider text-xs transition-all active:scale-95 shadow-lg shadow-[#ff5a00]/20 cursor-pointer"
            >
              {language === 'en' ? "Log In as Owner" : "Iniciar Sesión como Propietario"}
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="w-full py-3 px-6 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold border border-slate-200 transition-all text-xs uppercase tracking-wider active:scale-95 cursor-pointer"
            >
              {language === 'en' ? "Return to Safety" : "Regresar al Inicio"}
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return <>{children}</>;
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aquasmart-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [language, setLanguage] = useState<'en' | 'es'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aquasmart-lang');
      if (saved === 'en' || saved === 'es') return saved;
    }
    return 'en';
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aquasmart-isLoggedIn') === 'true';
    }
    return false;
  });

  const [loggedInUser, setLoggedInUser] = useState<{ name: string; email: string }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aquasmart-user');
      try {
        return saved ? JSON.parse(saved) : { name: '', email: '' };
      } catch (e) {
        return { name: '', email: '' };
      }
    }
    return { name: '', email: '' };
  });

  useEffect(() => {
    localStorage.setItem('aquasmart-isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('aquasmart-user', JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('aquasmart-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('aquasmart-lang', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser }}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-background-paper text-on-surface transition-colors duration-300">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/technical" element={<TechDossierPage />} />
            <Route path="/download" element={<DownloadsPage />} />
            <Route path="/shop" element={<OwnerProtectedRoute><MaintenanceShopPage /></OwnerProtectedRoute>} />
            <Route path="/costs" element={<OwnerProtectedRoute><LaborCostsPage /></OwnerProtectedRoute>} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product/:productId" element={<OwnerProtectedRoute><ProductDetailsPage /></OwnerProtectedRoute>} />
          </Routes>
          <AIAssistant />
          <Footer />
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}
