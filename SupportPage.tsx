import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  HelpCircle, 
  Wrench, 
  DollarSign, 
  CreditCard,
  UserCheck, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  Clock, 
  MessageSquare,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useLanguage } from './App';

export default function SupportPage() {
  const navigate = useNavigate();
  const { language, isLoggedIn, loggedInUser } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'setup' | 'hardware' | 'billing'>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Quick contact form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactArea, setContactArea] = useState('tech');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isOwner = isLoggedIn && loggedInUser?.email?.toLowerCase().trim() === 'luis.delarosacosio@gmail.com';

  const t = {
    en: {
      back: "Back",
      title: "How we can help you?",
      searchPl: "Search our knowledge base, FAQs, and guides...",
      faqTitle: "Frequently Asked Questions",
      noFaqs: "No questions match your search query.",
      contactTitle: "Area Contacts",
      contactSubtitle: "Get in touch directly with the appropriate department for rapid resolution.",
      formTitle: "Send a Message",
      formSubtitle: "Our integrated systems Route messages instantly to on-duty administrators.",
      formName: "Full Name",
      formEmail: "Email Address",
      formArea: "Select Area",
      formMsg: "Detailed Message",
      formSend: "Submit Support Request",
      formSuccess: "Support request dispatched successfully! A department coordinator will reach out shortly.",
      areas: {
        tech: "Technical & Device Support",
        sales: "Sales & Solution Consulting",
        billing: "Billing, Contracts & Install Costs",
        ceo: "CEO & Owner Direct Feedback"
      },
      roles: {
        techHeaded: "Headed by: Alex Torres, Chief Support Engineer",
        salesHeaded: "Headed by: Elena Varela, System Architecture Director",
        billingHeaded: "Headed by: Mateo Ruiz, Executive Comptroller",
        ceoHeaded: "Direct Oversight: Luis De La Rosa, CEO & Owner"
      }
    },
    es: {
      back: "Regresar",
      title: "¿Cómo podemos ayudarte?",
      searchPl: "Busca en nuestra base de conocimientos, preguntas frecuentes y guías...",
      faqTitle: "Preguntas Frecuentes",
      noFaqs: "Ninguna pregunta coincide con tu búsqueda.",
      contactTitle: "Contactos por Área",
      contactSubtitle: "Ponte en contacto directamente con el departamento adecuado para una resolución rápida.",
      formTitle: "Enviar un Mensaje",
      formSubtitle: "Nuestros sistemas integrados envían mensajes instantáneamente a los administradores de guardia.",
      formName: "Nombre Completo",
      formEmail: "Correo Electrónico",
      formArea: "Seleccionar Área",
      formMsg: "Mensaje Detallado",
      formSend: "Enviar Solicitud de Soporte",
      formSuccess: "¡Solicitud de soporte despachada con éxito! Un coordinador de departamento se comunicará pronto.",
      areas: {
        tech: "Soporte Técnico y de Dispositivos",
        sales: "Ventas y Consultoría de Soluciones",
        billing: "Facturación, Contratos y Costos",
        ceo: "Retroalimentación Directa al CEO"
      },
      roles: {
        techHeaded: "Liderado por: Alex Torres, Ingeniero Jefe de Soporte",
        salesHeaded: "Liderado por: Elena Varela, Directora de Arquitectura de Sistemas",
        billingHeaded: "Liderado por: Mateo Ruiz, Contralor Ejecutivo",
        ceoHeaded: "Supervisión Directa: Luis De La Rosa, CEO y Propietario"
      }
    }
  };

  const currentContent = t[language];

  // FAQ List
  const faqs = [
    {
      id: 1,
      category: 'hardware',
      icon: <Wrench size={16} />,
      q: {
        en: "How does Itsi save water on my estate?",
        es: "¿Cómo ahorra agua Itsi en mi terreno?"
      },
      a: {
        en: "Itsi integrates real-time local weather reports, evapotranspiration indices, and high-frequency soil moisture sensors. It actively optimizes municipal inputs and only executes irrigation cycles when absolutely necessary, reducing water utility costs by up to 50%.",
        es: "Itsi integra reportes climáticos locales en tiempo real, índices de evapotranspiración y sensores de humedad de alta frecuencia. Optimiza los consumos y solo ejecuta los ciclos de irrigación que sean indispensables, reduciendo gastos de agua hasta un 50%."
      }
    },
    {
      id: 2,
      category: 'setup',
      icon: <HelpCircle size={16} />,
      q: {
        en: "Can I manage cycles manually from the client command panel?",
        es: "¿Puedo administrar ciclos manualmente desde el panel de control?"
      },
      a: {
        en: "Yes. In addition to our fully autonomous smart schedules, you can instantly turn on, suspend, or configure manual watering sessions for any specific zones right from your central user dashboard.",
        es: "Sí. Además de los esquemas autónomos inteligentes, puedes iniciar, pausar o configurar rápidamente riegos manuales para zonas específicas directamente desde tu panel de usuario central."
      }
    },
    {
      id: 3,
      category: 'billing',
      icon: <DollarSign size={16} />,
      q: {
        en: "What elements are included in the installation costs calculations?",
        es: "¿Qué componentes se contemplan en el cálculo de costos de instalación?"
      },
      a: {
        en: "Installation quotes cover high-precision valve calibrations, Itsi master unit mounting, local moisture transceivers placement, water flow restrictor tunings, routing set-up, and full on-site testing.",
        es: "Las cotizaciones de instalación contemplan el montaje de unidad maestra Itsi, calibres de válvulas de alta precisión, colocación de transceptores locales, restrictor de flujo automático, ruteo y pruebas completas en sitio."
      }
    },
    {
      id: 4,
      category: 'hardware',
      icon: <Wrench size={16} />,
      q: {
        en: "Who engineers the Itsi software and controllers?",
        es: "¿Quién diseña el software y controladores de Itsi?"
      },
      a: {
        en: "All smart controllers, scheduling algorithms, and responsive interfaces are engineered in-house under the precise oversight of CEO and Owner Luis De La Rosa to ensure top-tier performance.",
        es: "Todos los controladores inteligentes, algoritmos de programación y pantallas responsivas son diseñados internamente bajo la rigurosa supervisión del CEO Luis De La Rosa para asegurar el más alto rendimiento."
      }
    },
    {
      id: 5,
      category: 'setup',
      icon: <HelpCircle size={16} />,
      q: {
        en: "How long does a standard residential installation take?",
        es: "¿Cuánto toma una instalación doméstica estándar?"
      },
      a: {
        en: "A standard layout typically takes 1 to 2 business days from initial layout check to system deployment. Large architectural custom landscapes or properties might require supplementary coordinate plotting during design consulting.",
        es: "Generalmente toma de 1 a 2 días hábiles desde la revisión inicial hasta el despliegue del sistema. Fincas más complejas o diseños empresariales pueden requerir ajustes de coordenadas adicionales durante la consultoría."
      }
    },
    {
      id: 6,
      category: 'billing',
      icon: <CreditCard size={16} />,
      q: {
        en: "Are corporate solutions subject to payment installments?",
        es: "¿Las soluciones corporativas cuentan con facilidades de pago?"
      },
      a: {
        en: "Yes. For our enterprise, land irrigation, and company packages, we offer customized installment agreements and leasing options. Reach out to Elena Varela in Sales or Mateo Ruiz in Billing to configure a suitable payment track.",
        es: "Sí. Para nuestros paquetes para empresas, terrenos y sistemas corporativos, ofrecemos esquemas de pagos diferidos y arrendamiento. Ponte en contacto con Elena Varela de Ventas o Mateo Ruiz de Facturación para estructurar un plan a la medida."
      }
    }
  ];

  // Filters faqs based on search query and active tab
  const filteredFaqs = faqs.filter(faq => {
    const qText = faq.q[language].toLowerCase();
    const aText = faq.a[language].toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = qText.includes(query) || aText.includes(query);
    const matchesTab = activeTab === 'all' || faq.category === activeTab;
    return matchesSearch && matchesTab;
  });

  // Handle support message submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setFormSubmitted(false);
    }, 4500);
  };

  return (
    <main className="pt-32 pb-24 bg-slate-50 min-h-screen font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-primary-teal font-extrabold mb-8 hover:opacity-80 transition-opacity uppercase tracking-wider text-xs"
        >
          <ArrowLeft size={16} /> {currentContent.back}
        </button>

        {/* Dynamic header centering the prompt "How we can help you?" */}
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary-teal/5 rounded-full blur-3xl pointer-events-none" />
          
          <h1 className="font-display text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xs text-primary-teal font-extrabold uppercase tracking-widest mb-8">
            {language === 'en' ? "Itsi Support Command Hub" : "Centro de Comando de Soporte Itsi"}
          </p>

          {/* Search bar specifically below the main question */}
          <div className="relative max-w-xl mx-auto shadow-lg rounded-2xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-primary-teal/50">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentContent.searchPl}
              className="w-full bg-white text-slate-800 placeholder-slate-400 pl-14 pr-6 py-4 outline-none font-medium text-sm border border-slate-100"
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={20} />
            </div>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* FAQ SECTION */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-200/60 pb-6">
            <h2 className="font-display text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary-teal/10 flex items-center justify-center text-primary-teal">
                <HelpCircle size={18} />
              </span>
              {currentContent.faqTitle}
            </h2>

            {/* Tags / Tabs for dynamic categorization */}
            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
              {(['all', 'setup', 'hardware', 'billing'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-slate-900 text-white border-transparent shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {tab === 'all' ? (language === 'en' ? "All" : "Todo") : ''}
                  {tab === 'setup' ? (language === 'en' ? "Setup" : "Configuración") : ''}
                  {tab === 'hardware' ? (language === 'en' ? "Hardware & App" : "Dispositivos") : ''}
                  {tab === 'billing' ? (language === 'en' ? "Billing & Costs" : "Facturación") : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Collapsible FAQ Accordion with clean layout */}
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4 max-w-4xl mx-auto">
              {filteredFaqs.map((faq, index) => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <motion.div 
                    layout 
                    key={faq.id}
                    className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors hover:bg-slate-50/50"
                    >
                      <div className="flex items-start gap-4 pr-4">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0 mt-0.5">
                          {faq.icon}
                        </div>
                        <span className="font-display font-bold text-slate-900 text-sm md:text-base leading-tight">
                          {faq.q[language]}
                        </span>
                      </div>
                      <div className="text-slate-400 shrink-0">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-6 pb-6 pt-0 ml-12 text-xs md:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100/80">
                            <p className="mt-4">{faq.a[language]}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 font-semibold bg-white border border-dashed border-slate-200 rounded-3xl max-w-lg mx-auto">
              <p className="text-sm mb-1">{currentContent.noFaqs}</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }} 
                className="text-xs text-primary-teal hover:underline mt-2 font-bold cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </section>

        {/* TWO COLUMN SUMMARY: CONTACT INFO + QUICK FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 items-stretch">
          
          {/* AREA CONTACTS */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-primary-teal/10 flex items-center justify-center text-primary-teal">
                  <UserCheck size={18} />
                </span>
                {currentContent.contactTitle}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed mb-8">
                {currentContent.contactSubtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Technical Support */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-50 border border-blue-100 text-blue-500 rounded-xl flex items-center justify-center">
                        <Wrench size={20} />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-xs text-slate-900 tracking-wide uppercase">
                          {currentContent.areas.tech}
                        </h4>
                        <p className="text-[10px] text-blue-500 font-black tracking-widest uppercase">
                          TECHNICAL STAFF
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold mb-4">
                      {currentContent.roles.techHeaded}
                    </p>
                  </div>
                  <div className="space-y-2 border-t border-slate-50 pt-3 text-[11px] font-semibold text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail size={12} className="text-slate-400" />
                      <span>engineering@itsi.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-slate-400" />
                      <span>+1 (800) 555-0190</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-slate-400" />
                      <span>Mon-Fri: 8:00 AM - 6:00 PM EST</span>
                    </div>
                  </div>
                </div>

                {/* 2. Sales / Quotes */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-teal-50 border border-teal-100 text-primary-teal rounded-xl flex items-center justify-center">
                        <HelpCircle size={20} />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-xs text-slate-900 tracking-wide uppercase">
                          {currentContent.areas.sales}
                        </h4>
                        <p className="text-[10px] text-primary-teal font-black tracking-widest uppercase">
                          DEVELOPMENTS
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold mb-4">
                      {currentContent.roles.salesHeaded}
                    </p>
                  </div>
                  <div className="space-y-2 border-t border-slate-50 pt-3 text-[11px] font-semibold text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail size={12} className="text-slate-400" />
                      <span>sales@itsi.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-slate-400" />
                      <span>+1 (800) 555-0195</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-slate-400" />
                      <span>Mon-Sat: 9:00 AM - 5:00 PM EST</span>
                    </div>
                  </div>
                </div>

                {/* 3. Billing & Invoices */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                        <DollarSign size={20} />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-xs text-slate-900 tracking-wide uppercase">
                          {currentContent.areas.billing}
                        </h4>
                        <p className="text-[10px] text-amber-600 font-black tracking-widest uppercase">
                          COMPTROLLER
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold mb-4">
                      {currentContent.roles.billingHeaded}
                    </p>
                  </div>
                  <div className="space-y-2 border-t border-slate-50 pt-3 text-[11px] font-semibold text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail size={12} className="text-slate-400" />
                      <span>billing@itsi.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-slate-400" />
                      <span>+1 (800) 555-0199</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-slate-400" />
                      <span>Mon-Fri: 9:00 AM - 4:00 PM EST</span>
                    </div>
                  </div>
                </div>

                {/* 4. Owner & CEO Hot-esc */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md relative flex flex-col justify-between">
                  <div className="absolute top-4 right-4 text-[#ff5a00]">
                    <Lock size={14} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-white/10 border border-white/10 text-white rounded-xl flex items-center justify-center">
                        <UserCheck size={20} className="text-primary-teal" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-xs text-white tracking-wide uppercase">
                          {currentContent.areas.ceo}
                        </h4>
                        <p className="text-[10px] text-primary-teal font-black tracking-widest uppercase">
                          EXECUTIVE NODE
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-300 font-bold mb-4">
                      {currentContent.roles.ceoHeaded}
                    </p>
                  </div>
                  <div className="space-y-2 border-t border-white/5 pt-3 text-[11px] font-semibold text-slate-300">
                    <div className="flex items-center gap-2">
                      <Mail size={12} className="text-slate-500" />
                      <span>owner@itsi.com</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] bg-slate-850 px-2 py-0.5 rounded text-[#ff5a00] font-black tracking-widest uppercase">
                        {isOwner ? "VERIFIED OWNER" : "CEO ESCALATIONS"}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Visual reassurance footer */}
            <div className="mt-8 bg-slate-100 border border-slate-200/50 p-4 rounded-xl text-[11px] font-bold text-slate-500 text-center tracking-wide leading-relaxed uppercase">
              {language === 'en' 
                ? "All communications are encrypted and tracked under active Luis De La Rosa admin oversight." 
                : "Todas las comunicaciones están encriptadas y monitoreadas bajo supervisión del administrador Luis De La Rosa."}
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 shadow-lg relative h-full flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-black text-slate-900 tracking-tight mb-2">
                  {currentContent.formTitle}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                  {currentContent.formSubtitle}
                </p>

                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-emerald-800 my-8 shadow-sm flex flex-col items-center justify-center"
                    >
                      <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-4 shadow">
                        <CheckCircle2 size={24} />
                      </div>
                      <p className="text-xs font-black tracking-widest uppercase text-emerald-600 mb-2">
                        {language === 'en' ? "REQUEST RECEIVED" : "SOLICITUD RECIBIDA"}
                      </p>
                      <p className="text-xs font-semibold leading-relaxed">
                        {currentContent.formSuccess}
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2">
                          {currentContent.formName}
                        </label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Luis De La Rosa"
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-teal/40 font-semibold text-xs text-on-surface"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2">
                          {currentContent.formEmail}
                        </label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="client@itsi.com"
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-teal/40 font-semibold text-xs text-on-surface"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2">
                          {currentContent.formArea}
                        </label>
                        <select
                          value={contactArea}
                          onChange={(e) => setContactArea(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-teal/40 font-bold text-xs pr-8"
                        >
                          <option value="tech">{currentContent.areas.tech}</option>
                          <option value="sales">{currentContent.areas.sales}</option>
                          <option value="billing">{currentContent.areas.billing}</option>
                          <option value="ceo">{currentContent.areas.ceo}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2">
                          {currentContent.formMsg}
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="How can our coordinators help elevate your irrigation architecture?"
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary-teal/40 font-semibold text-xs text-on-surface resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-primary-teal hover:bg-teal-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer mt-2"
                      >
                        {currentContent.formSend}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl mt-6">
                <MessageSquare className="text-primary-teal shrink-0" size={18} />
                <p className="text-[10px] text-slate-500 font-bold leading-normal">
                  {language === 'en'
                    ? "In urgent situations, you may also engage with our real-time smart botanical AI chat advisor."
                    : "En situaciones urgentes, también puedes interactuar con nuestro asesor virtual por chat de IA botánica en tiempo real."}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
