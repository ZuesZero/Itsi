import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  TrendingUp, 
  Award, 
  Heart, 
  Users, 
  Target,
  BookOpen,
  Calendar,
  User,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from './App';

export default function BlogPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const t = {
    en: {
      back: "Back",
      tag: "STRATEGY & GROWTH",
      title: "Why Your Digital Strategy Needs a Dynamic Blog",
      subtitle: "Beyond simple text, a deliberate blogging platform acts as the central gear of modern web optimization, organic engagement, and brand authority.",
      sectionTitle: "Key reasons to include a blog on your website",
      readMore: "Read Strategy Guide",
      authorName: "Itsi Insights Team",
      publishedDate: "June 2026",
      reasons: [
        {
          id: "seo",
          title: "Boosts SEO and Traffic",
          desc: "Search engines reward websites that are updated regularly with relevant keywords. Every new blog post creates another indexable page, increasing the chances of appearing in search results.",
          icon: <TrendingUp className="text-emerald-500" size={24} />,
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20"
        },
        {
          id: "authority",
          title: "Establishes Authority",
          desc: "By sharing valuable insights, how-to guides, and industry news, you position your brand as an expert, building trust with visitors before they even make a purchase.",
          icon: <Award className="text-blue-500" size={24} />,
          bg: "bg-blue-500/10",
          border: "border-blue-500/20"
        },
        {
          id: "humanize",
          title: "Humanizes Your Brand",
          desc: "Blogs offer a platform to showcase your company's voice, culture, and the people behind the products, which builds stronger emotional connections with your audience.",
          icon: <Heart className="text-rose-500" size={24} />,
          bg: "bg-rose-500/10",
          border: "border-rose-500/20"
        },
        {
          id: "engagement",
          title: "Improves Audience Engagement",
          desc: "Providing informative, entertaining, or problem-solving content encourages users to stay on your site longer, share posts on social media, and interact through comments.",
          icon: <Users className="text-purple-500" size={24} />,
          bg: "bg-purple-500/10",
          border: "border-purple-500/20"
        },
        {
          id: "funnel",
          title: "Supports the Sales Funnel",
          desc: "Blogs allow you to educate consumers during the discovery stage, answering frequently asked questions (FAQs) and guiding them toward taking action.",
          icon: <Target className="text-[#ff5a00]" size={24} />,
          bg: "bg-[#ff5a00]/10",
          border: "border-[#ff5a00]/20"
        }
      ]
    },
    es: {
      back: "Regresar",
      tag: "ESTRATEGIA Y CRECIMIENTO",
      title: "Por qué tu estrategia digital necesita un blog activo",
      subtitle: "Más allá del texto simple, una plataforma de blog deliberada actúa como el motor central de la optimización web, el engagement orgánico y la autoridad de marca.",
      sectionTitle: "Razones clave para incluir un blog en tu sitio web",
      readMore: "Leer Guía Estratégica",
      authorName: "Equipo de Itsi Insights",
      publishedDate: "Junio de 2026",
      reasons: [
        {
          id: "seo",
          title: "Impulsa el SEO y el Tráfico",
          desc: "Los motores de búsqueda recompensan los sitios web que se actualizan regularmente con palabras clave de valor. Cada nueva publicación crea otra página indexable, aumentando las posibilidades de aparecer en los resultados de búsqueda.",
          icon: <TrendingUp className="text-emerald-500" size={24} />,
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20"
        },
        {
          id: "authority",
          title: "Establece Autoridad",
          desc: "Al compartir conocimientos valiosos, guías prácticas y noticias del sector, posicionas tu marca como experta, generando confianza con los visitantes incluso antes de que realicen una compra.",
          icon: <Award className="text-blue-500" size={24} />,
          bg: "bg-blue-500/10",
          border: "border-blue-500/20"
        },
        {
          id: "humanize",
          title: "Humaniza tu Marca",
          desc: "Los blogs ofrecen un medio para mostrar la voz, la cultura y las personas detrás de los productos, lo que construye lazos emocionales más fuertes con tu público.",
          icon: <Heart className="text-rose-500" size={24} />,
          bg: "bg-rose-500/10",
          border: "border-rose-500/20"
        },
        {
          id: "engagement",
          title: "Mejora el Compromiso del Público",
          desc: "Ofrecer contenido informativo, entretenido o que resuelva problemas motiva a los usuarios a permanecer más tiempo en tu sitio, compartir publicaciones en redes sociales e interactuar mediante comentarios.",
          icon: <Users className="text-purple-500" size={24} />,
          bg: "bg-purple-500/10",
          border: "border-purple-500/20"
        },
        {
          id: "funnel",
          title: "Soporta el Embudo de Ventas",
          desc: "Los blogs te permiten educar a los consumidores durante la etapa de descubrimiento, respondiendo preguntas frecuentes (FAQ) y guiándolos directamente a tomar acción comercial limpia.",
          icon: <Target className="text-[#ff5a00]" size={24} />,
          bg: "bg-[#ff5a00]/10",
          border: "border-[#ff5a00]/20"
        }
      ]
    }
  };

  const content = t[language];

  return (
    <main className="pt-32 pb-24 bg-slate-50 min-h-screen font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-primary-teal font-extrabold mb-8 hover:opacity-80 transition-opacity uppercase tracking-wider text-xs"
          id="blog-back-btn"
        >
          <ArrowLeft size={16} /> {content.back}
        </button>

        {/* Featured Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] bg-slate-900 text-white font-black tracking-[0.2em] px-3 py-1 rounded-full uppercase">
              {content.tag}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              {content.title}
            </h1>
            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
              {content.subtitle}
            </p>

            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-slate-500" />
                <span>{content.authorName}</span>
              </div>
              <span className="text-slate-350">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-500" />
                <span>{content.publishedDate}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden h-full flex flex-col justify-between border border-slate-800">
              <div className="absolute top-0 right-0 w-36 h-36 bg-primary-teal/10 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <BookOpen className="text-primary-teal mb-6" size={32} />
                <h3 className="font-display text-xl font-black mb-3 leading-tight">
                  {language === 'en' ? "Empower Your Digital Ecosystem" : "Potencia tu Ecosistema Digital"}
                </h3>
                <p className="text-xs text-slate-350 leading-relaxed font-medium mb-6">
                  {language === 'en' 
                    ? "Establishing a dedicated blog node unlocks continuous indexing pathways and converts cold search impressions into high-confidence consultations." 
                    : "Establecer un blog dedicado desbloquea vías de indexación continua y convierte impresiones frías de búsqueda en asesorías de alta confianza."}
                </p>
              </div>

              <div className="border-t border-slate-800 pt-6">
                <button 
                  onClick={() => navigate('/consultation')}
                  className="flex items-center gap-2 text-primary-teal text-xs font-black uppercase tracking-wider hover:text-white transition-colors"
                >
                  <span>{content.readMore}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Key Reasons Section */}
        <section className="mt-20">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff5a00] mb-2 block">
              {language === 'en' ? "GROWTH FRAMEWORK" : "MARCO DE CRECIMIENTO"}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-black text-slate-1000 tracking-tight">
              {content.sectionTitle}
            </h2>
          </div>

          {/* Symmetrical Bento Grid for the 5 reasons requested */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.reasons.map((reason, index) => {
              // Custom spanning of boxes for aesthetic asymmetry
              const isLarge = index === 0 || index === 4;
              return (
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  key={reason.id}
                  className={`bg-white border border-slate-200/80 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between transition-shadow hover:shadow-md ${
                    isLarge ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                  id={`reason-card-${reason.id}`}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${reason.bg} ${reason.border} border flex items-center justify-center mb-6`}>
                      {reason.icon}
                    </div>
                    <h3 className="font-display text-lg font-black text-slate-900 tracking-tight mb-4">
                      {reason.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-50 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    Itsi Hub • {`0${index + 1}`}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <div className="mt-24 bg-slate-900 text-white rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-primary-teal/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#ff5a00]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight">
              {language === 'en' ? "Ready to Launch Your Content Strategy?" : "¿Listo para lanzar tu estrategia de contenidos?"}
            </h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-md mx-auto">
              {language === 'en'
                ? "Let our expert tech architects construct a fully localized, custom integrated messaging board matched with professional analytics pipelines."
                : "Permite que nuestros arquitectos de tecnología construyan un blog optimizado y localizado, listo para integrarse con tus esquemas analíticos."}
            </p>
            <div className="pt-4">
              <button 
                onClick={() => navigate('/consultation')}
                className="bg-primary-teal hover:bg-teal-700 text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                {language === 'en' ? "Schedule Strategic Call" : "Agendar Llamada Estratégica"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
