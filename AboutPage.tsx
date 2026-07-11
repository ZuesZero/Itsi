import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Leaf, 
  Waves, 
  Award, 
  Users, 
  ShieldCheck, 
  Target,
  Sparkles
} from 'lucide-react';
import { useLanguage } from './App';

export default function AboutPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const content = {
    en: {
      title: "ABOUT US",
      subtitle: "The pioneers of next-generation botanical automation",
      storyTitle: "Our Story",
      storyP1: "Itsi was founded in 2024 to tackle one of humanity's of greatest engineering challenges: blending premium landscape design with absolute resource conservation. We set out to change how water is utilized across residential gardens, corporate estates, and large-scale agricultural projects.",
      storyP2: "By layering IoT sensor connectivity, advanced weather intelligence, and elegant mechanical designs, we have created a dynamic framework that preserves every precious droplet while nurturing breathtaking botanical spaces.",
      missionTitle: "Our Mission",
      missionDesc: "To forge a future where lush green architecture and water resource conservation live in perfect harmony through cutting-edge, automated botanical technology.",
      metricsTitle: "By the Numbers",
      metric1Val: "40M+",
      metric1Lbl: "Liters of Water Saved",
      metric2Val: "10,000+",
      metric2Lbl: "Active Intelligent Zones",
      metric3Val: "99.8%",
      metric3Lbl: "Uplink Signal Reliability",
      ceoTitle: "A Message from Our CEO & Owner",
      ceoName: "Luis De La Rosa",
      ceoRole: "CEO & Owner, Itsi Inc.",
      ceoMessage: "Welcome to Itsi. When we started this journey, we realized that irrigation was stuck in the past—relying on static timers and wasteful schedules. Together with our engineering and botanical teams, we built a system that actively listens to the heartbeat of your soil, adapting in real time to atmospheric changes.\n\nOur commitment as a company is not just to build incredible hardware and software, but to safeguard the environment we share. Every product, custom zone layout, and professional service is delivered with unmatched dedication to quality, precision, and sustainability.\n\nThank you for trusting us with your green spaces. We are excited to cultivate a smarter, greener tomorrow with you.",
      backBtn: "Return to Home",
      coreValues: "Core Values",
      val1Title: "Precision",
      val1Desc: "Targeted delivery down to the milliliter, custom-designed for every individual plant species.",
      val2Title: "Conservation",
      val2Desc: "Protecting our planet's most critical resource through smart automation and conscious design.",
      val3Title: "Innovation",
      val3Desc: "Constantly pushing the boundaries of IoT, weather telemetry, and cloud command centers."
    },
    es: {
      title: "SOBRE NOSOTROS",
      subtitle: "Los pioneros de la automatización botánica de última generación",
      storyTitle: "Nuestra Historia",
      storyP1: "Itsi fue fundada en 2024 para abordar uno de los mayores desafíos de ingeniería de la humanidad: combinar el diseño de paisajes premium con la conservación absoluta de recursos. Nos propusimos cambiar la forma en que se utiliza el agua en jardines residenciales, fincas corporativas y proyectos agrícolas a gran escala.",
      storyP2: "Al integrar conectividad de sensores IoT, inteligencia meteorológica avanzada y diseños mecánicos elegantes, creamos una estructura dinámica que preserva cada gota preciosa mientras nutre espacios botánicos espectaculares.",
      missionTitle: "Nuestra Misión",
      missionDesc: "Forjar un futuro donde la arquitectura verde exuberante y la conservación del recurso hídrico convivan en perfecta armonía mediante tecnología botánica automatizada de vanguardia.",
      metricsTitle: "En Números",
      metric1Val: "40M+",
      metric1Lbl: "Litros de Agua Ahorrados",
      metric2Val: "10,000+",
      metric2Lbl: "Zonas Inteligentes Activas",
      metric3Val: "99.8%",
      metric3Lbl: "Fiabilidad de Señal de Enlace",
      ceoTitle: "Mensaje de Nuestro Director Ejecutivo",
      ceoName: "Luis De La Rosa",
      ceoRole: "CEO y Propietario, Itsi Inc.",
      ceoMessage: "Bienvenidos a Itsi. Cuando comenzamos este viaje, nos dimos cuenta de que el riego estaba atrapado en el pasado: dependía de temporizadores estáticos y programaciones ineficientes. Junto con nuestros equipos de ingeniería y botánica, creamos un sistema que escucha activamente el latido de la tierra y se adapta en tiempo real a los cambios de la atmósfera.\n\nNuestro compromiso como empresa no es solo construir hardware y software increíbles, sino salvaguardar el medio ambiente que compartimos. Cada producto, diseño de zona personalizado y servicio profesional se entrega con una dedicación inigualable a la calidad, precisión y sustentabilidad.\n\nGracias por confiarnos sus áreas verdes. Estamos entusiasmados de cultivar un mañana más inteligente y ecológico junto a usted.",
      backBtn: "Volver al Inicio",
      coreValues: "Valores Fundamentales",
      val1Title: "Precisión",
      val1Desc: "Suministro dirigido al mililitro, diseñado a medida para cada especie vegetal individual.",
      val2Title: "Conservación",
      val2Desc: "Proteger el recurso más crítico de nuestro planeta mediante la automatización inteligente.",
      val3Title: "Innovación",
      val3Desc: "Superar constantemente los límites del IoT, la telemetría climática y el software en la nube."
    }
  };

  const t = content[language];

  return (
    <main className="pt-32 pb-24 px-4 bg-slate-50 min-h-screen font-sans transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Return Button */}
        <div className="mb-10">
          <button 
            id="about-back-to-home-btn"
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-primary-teal font-bold hover:opacity-85 transition-all cursor-pointer text-sm"
          >
            <ArrowLeft size={18} /> 
            {t.backBtn}
          </button>
        </div>

        {/* Hero Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary-teal/5 rounded-full blur-3xl pointer-events-none" />
          <span className="font-label text-primary-teal uppercase tracking-[0.25em] text-xs font-black mb-4 block">
            {t.title}
          </span>
          <h1 id="about-main-headline" className="font-display text-4xl md:text-5xl font-black text-slate-900 tracking-tight max-w-2xl mx-auto leading-tight">
            Itsi Inc.
          </h1>
          <p className="text-lg text-slate-500 font-medium mt-4 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column A: Company Details - 7 Columns depth */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Brief Summary Box */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-100/50 space-y-6"
            >
              <div className="flex items-center gap-3 text-primary-teal">
                <Waves size={24} />
                <h2 className="font-display text-2xl font-bold text-slate-900">
                  {t.storyTitle}
                </h2>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base">
                {t.storyP1}
              </p>
              <p className="text-slate-600 font-medium leading-relaxed text-sm">
                {t.storyP2}
              </p>
            </motion.section>

            {/* Core Values */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-100/50 space-y-6"
            >
              <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-3">
                <Leaf size={20} className="text-primary-teal" />
                {t.coreValues}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-bold inline-block border border-emerald-100">
                    {t.val1Title}
                  </div>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                    {t.val1Desc}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md font-bold inline-block border border-indigo-100">
                    {t.val2Title}
                  </div>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                    {t.val2Desc}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-bold inline-block border border-amber-100">
                    {t.val3Title}
                  </div>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                    {t.val3Desc}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Metrics Achievements */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 text-center shadow-lg">
                <div className="font-display text-2xl font-black text-primary-teal">{t.metric1Val}</div>
                <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 mt-2 leading-tight">{t.metric1Lbl}</div>
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 text-center shadow-lg">
                <div className="font-display text-2xl font-black text-[#0284c7]">{t.metric2Val}</div>
                <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 mt-2 leading-tight">{t.metric2Lbl}</div>
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 text-center shadow-lg">
                <div className="font-display text-2xl font-black text-teal-400">{t.metric3Val}</div>
                <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 mt-2 leading-tight">{t.metric3Lbl}</div>
              </div>
            </div>

          </div>

          {/* Column B: Message From CEO (Luis De La Rosa) - 5 Columns depth */}
          <div className="lg:col-span-5">
            <motion.section 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white rounded-[2rem] border border-slate-800 p-8 shadow-2xl relative overflow-hidden group"
            >
              {/* Highlight effects */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-teal/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative space-y-6">
                
                {/* Visual badge */}
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-primary-teal rounded-full animate-ping" />
                  <span className="text-[10px] font-black uppercase text-white tracking-[0.2em]">{t.ceoTitle}</span>
                </div>

                {/* Main signature block quote styled message */}
                <blockquote className="space-y-4">
                  <p className="text-sm text-slate-300 font-medium leading-relaxed italic whitespace-pre-line">
                    "{t.ceoMessage}"
                  </p>
                </blockquote>

                {/* Divider lines */}
                <div className="border-t border-slate-800 pt-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-lg text-white tracking-wide">
                      {t.ceoName}
                    </h3>
                    <p className="text-xs text-white font-extrabold tracking-wider uppercase">
                      {t.ceoRole}
                    </p>
                  </div>
                  
                  {/* Styled initial graphics marker */}
                  <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center font-display font-black tracking-widest text-white italic text-sm">
                    DLR
                  </div>
                </div>

                {/* Certification badge */}
                <div className="pt-3 flex items-center gap-3 opacity-60 text-xs font-semibold text-slate-400">
                  <ShieldCheck size={16} className="text-primary-teal" />
                  <span>Verified Corporate Representative Signature</span>
                </div>

              </div>
            </motion.section>
          </div>

        </div>

      </div>
    </main>
  );
}
