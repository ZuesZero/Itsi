import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook,
  Sparkles,
  ShieldAlert,
  Database,
  CloudLightning,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from './App';
import { submitContactMessage, isSupabaseConfigured } from './supabase';

export default function ContactPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Clean states for simplified contact form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSource, setSaveSource] = useState<'supabase' | 'local' | null>(null);
  const [errorText, setErrorText] = useState('');

  const hasSupabase = isSupabaseConfigured();

  const t = {
    en: {
      back: "Back",
      title: "Get in touch",
      subtitle: "Whether configuring dynamic agricultural fields or scaling corporate solutions, our curators are standing by.",
      formName: "Full Name",
      formEmail: "Email Address",
      formMsg: "Your Message",
      formSend: "Send Message",
      formSendActive: "Dispatching...",
      formSuccessHeader: "MESSAGE DISPATCHED",
      formSuccessDescSupabase: "Successfully saved to Live Supabase DB! Our routing coordinators will review your query within 24 hours.",
      formSuccessDescLocal: "Message cached locally in Sandbox browser storage. To persist in cloud, plug in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your settings.",
      bizTitle: "Corporate Offices",
      addressLabel: "Physical Address",
      addressText: "440 N Barranca Ave #3471, Covina, CA 91723",
      emailLabel: "Customer Support Email",
      phoneLabel: "Phone Number",
      hoursTitle: "Hours of Operation",
      hoursWeekday: "Monday - Friday: 8:00 AM - 6:00 PM EST",
      hoursWeekend: "Saturday: 9:00 AM - 3:00 PM EST",
      hoursSunday: "Sunday: Closed (Monitoring systems online)",
      responseTimeTitle: "Response Turnaround",
      responseTimeText: "We reply within 24 hours",
      responseTimeDesc: "High-priority status inquiries usually receive an assessment diagnostic code much faster.",
      socialTitle: "Connect on Social Media"
    },
    es: {
      back: "Regresar",
      title: "Ponte en contacto",
      subtitle: "Ya sea configurando campos agrícolas dinámicos o escalando soluciones corporativas, nuestros curadores están listos.",
      formName: "Nombre Completo",
      formEmail: "Correo Electrónico",
      formMsg: "Tu Mensaje",
      formSend: "Enviar Mensaje",
      formSendActive: "Despachando...",
      formSuccessHeader: "MENSAJE ENVIADO",
      formSuccessDescSupabase: "¡Guardado exitosamente en la base de datos de Supabase en vivo! El equipo revisará tu consulta en menos de 24 horas.",
      formSuccessDescLocal: "Mensaje guardado localmente en Sandbox. Para persistir en la nube, ingresa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en la configuración.",
      bizTitle: "Oficinas Corporativas",
      addressLabel: "Dirección Física",
      addressText: "440 N Barranca Ave #3471, Covina, CA 91723",
      emailLabel: "Correo Electrónico de Soporte",
      phoneLabel: "Número Telefónico",
      hoursTitle: "Horario de Operaciones",
      hoursWeekday: "Lunes a Viernes: 8:00 AM - 6:00 PM EST",
      hoursWeekend: "Sábado: 9:00 AM - 3:00 PM EST",
      hoursSunday: "Domingo: Cerrado (Monitoreo de sistemas activo)",
      responseTimeTitle: "Tiempo de Respuesta",
      responseTimeText: "Respondemos en menos de 24 horas",
      responseTimeDesc: "Las consultas de estado con alta prioridad usualmente reciben un diagnóstico mucho más rápido.",
      socialTitle: "Conéctate en Redes Sociales"
    }
  };

  const currentContent = t[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);
    setErrorText('');

    try {
      const response = await submitContactMessage({
        name,
        email,
        subject: 'General Inquiry via Web Contact Form',
        message
      });
      setSaveSource(response.source as 'supabase' | 'local');
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      
      setTimeout(() => {
        setSubmitted(false);
        setSaveSource(null);
      }, 7000);
    } catch (err: any) {
      console.error(err);
      setErrorText(language === 'en' ? 'Submission error. Please try again.' : 'Error al enviar. Intente de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-24 bg-slate-50 min-h-screen font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Back navigation link hook */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-primary-teal font-extrabold mb-8 hover:opacity-80 transition-opacity uppercase tracking-wider text-xs"
        >
          <ArrowLeft size={16} /> {currentContent.back}
        </button>

        {/* Dynamic header centering the prompt */}
        <div className="max-w-3xl mb-16 relative">
          <div className="absolute -top-12 left-0 w-40 h-40 bg-primary-teal/5 rounded-full blur-3xl pointer-events-none" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ff5a00] mb-3 block">
            {language === 'en' ? "SECURE CHANNELS" : "CANALES DE COMUNICACIÓN SEGUROS"}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            {currentContent.title}
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-2xl">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Two column grid block containing form on left and business details on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* CONTACT FORM (Left side) */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-teal/5 rounded-full blur-2xl pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center text-emerald-800 my-12 flex flex-col items-center justify-center"
                  >
                    <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow shadow-emerald-500/20">
                      <CheckCircle2 size={26} />
                    </div>
                    <span className="text-xs font-black tracking-[0.15em] text-emerald-600 mb-2">
                      {currentContent.formSuccessHeader}
                    </span>
                    <p className="text-xs font-medium leading-relaxed text-slate-600">
                      {saveSource === 'supabase' ? currentContent.formSuccessDescSupabase : currentContent.formSuccessDescLocal}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Connection Status Badge inside form card */}
                    <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                      hasSupabase 
                        ? 'bg-blue-50/50 border-blue-100 text-blue-800' 
                        : 'bg-amber-50/50 border-amber-100 text-amber-800'
                    }`}>
                      <div className={`p-1.5 rounded-lg mt-0.5 ${hasSupabase ? 'bg-blue-100' : 'bg-amber-100'}`}>
                        {hasSupabase ? <Database size={14} /> : <AlertCircle size={14} />}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black uppercase tracking-wider">
                          {hasSupabase ? "Supabase Live Connection Active" : "Sandbox Mode Pre-configured"}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
                          {hasSupabase 
                            ? "Data is being written in real-time to your custom Supabase PostgreSQL backend schema." 
                            : "Local Storage holds form caching. Plug in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to stream to the cloud."}
                        </p>
                      </div>
                    </div>

                    {/* Name input */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2">
                        {currentContent.formName}
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Luis De La Rosa"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-teal/40 font-semibold text-xs"
                      />
                    </div>

                    {/* Email input */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2">
                        {currentContent.formEmail}
                      </label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="luis@itsi.com"
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-teal/40 font-semibold text-xs"
                      />
                    </div>

                    {/* Message body */}
                    <div>
                      <label className="block text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2">
                        {currentContent.formMsg}
                      </label>
                      <textarea
                        required
                        rows={5}
                        disabled={isSubmitting}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your secure inquiry or configuration detail..."
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary-teal/40 font-semibold text-xs resize-none"
                      />
                    </div>

                    {errorText && (
                      <p className="text-xs text-rose-500 font-extrabold text-left bg-rose-50 p-3 rounded-lg border border-rose-100 flex items-center gap-2">
                        <AlertCircle size={14} /> {errorText}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary-teal hover:bg-teal-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <span>{isSubmitting ? currentContent.formSendActive : currentContent.formSend}</span>
                      <Send size={12} className={isSubmitting ? "animate-pulse" : ""} />
                    </button>
                    
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* BUSINESS INFO & EXPECTATIONS (Right side) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 1. Business Info Node */}
            <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="font-display text-lg font-black text-slate-900 tracking-tight mb-6 uppercase flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="w-6 h-6 rounded-md bg-primary-teal/10 flex items-center justify-center text-primary-teal"><MapPin size={14} /></span>
                {currentContent.bizTitle}
              </h3>
              
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 text-slate-500 rounded-xl">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-0.5">{currentContent.addressLabel}</h4>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">{currentContent.addressText}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 text-slate-500 rounded-xl">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-0.5">{currentContent.emailLabel}</h4>
                    <p className="text-xs font-semibold text-primary-teal hover:underline"><a href="mailto:support@itsi.com">support@itsi.com</a></p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 text-slate-500 rounded-xl">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-0.5">{currentContent.phoneLabel}</h4>
                    <p className="text-xs font-semibold text-slate-855"><a href="tel:+18005550190">+1 (800) 555-0190</a></p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Response Time & Hours Node */}
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-md relative overflow-hidden">
              <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-[#ff5a00]/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Guarantee Banner (Response times) */}
              <div className="bg-gradient-to-r from-[#ff5a00] to-orange-500 text-white px-5 py-3 rounded-2xl flex items-center justify-between mb-6 shadow-md border-t border-white/20">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} />
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">{currentContent.responseTimeText}</span>
                </div>
                <span className="text-[9px] bg-slate-950/20 px-2.5 py-0.5 rounded text-white/90 font-bold uppercase tracking-widest">
                  GUARANTEED
                </span>
              </div>

              {/* Hours of Operation List */}
              <h3 className="font-display text-xs font-black text-white tracking-widest mb-4 uppercase flex items-center gap-2">
                <Clock size={12} className="text-primary-teal" />
                {currentContent.hoursTitle}
              </h3>
              
              <div className="space-y-2 text-xs font-semibold text-slate-300">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400">Weekdays (L-V)</span>
                  <span className="text-white">8:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400">Saturday (Sáb)</span>
                  <span className="text-white">9:00 AM - 3:00 PM EST</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400">Sunday (Dom)</span>
                  <span className="text-rose-400 font-extrabold text-[11px] uppercase tracking-wider">{language === 'en' ? "Closed" : "Cerrado"}</span>
                </div>
              </div>
              
              <p className="text-[10px] text-slate-400 italic mt-4 font-medium sm:leading-relaxed">
                {currentContent.responseTimeDesc}
              </p>
            </div>

            {/* 3. Social Media Connections */}
            <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 shadow-sm">
              <h3 className="font-display text-sm font-black text-slate-900 tracking-wider mb-4 uppercase text-center md:text-left">
                {currentContent.socialTitle}
              </h3>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-600 hover:text-blue-600 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 bg-slate-50 hover:bg-slate-900 border border-slate-200 hover:border-slate-900 text-slate-600 hover:text-white px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer"
                >
                  <Twitter size={14} />
                  <span>X / Twitter</span>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 bg-slate-50 hover:bg-blue-600 border border-slate-200 hover:border-blue-600 text-slate-600 hover:text-white px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer"
                >
                  <Facebook size={14} />
                  <span>Facebook</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 bg-slate-50 hover:bg-rose-550 border border-slate-200 hover:border-rose-550 text-slate-600 hover:text-white px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer"
                >
                  <Instagram size={14} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
