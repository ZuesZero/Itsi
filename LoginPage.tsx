import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  CheckCircle2, 
  Cpu, 
  Droplets, 
  ShieldCheck, 
  ChevronRight, 
  Activity, 
  LogOut,
  Database,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from './App';
import { isSupabaseConfigured, getMySubmissions } from './services/supabase';

export default function LoginPage() {
  const navigate = useNavigate();
  const { language, isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser } = useLanguage();

  // State management
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Real database audit records logged from Contact inputs / Package selections
  const [dbContacts, setDbContacts] = useState<any[]>([]);
  const [dbReservations, setDbReservations] = useState<any[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const hasSupabase = isSupabaseConfigured();

  // Load records whenever the logged-in user changes or mounts
  useEffect(() => {
    if (isLoggedIn && loggedInUser?.email) {
      const fetchRecords = async () => {
        setIsLoadingRecords(true);
        try {
          const records = await getMySubmissions(loggedInUser.email);
          setDbContacts(records.contacts);
          setDbReservations(records.reservations);
        } catch (err) {
          console.error("Error loading user submissions from data store:", err);
        } finally {
          setIsLoadingRecords(false);
        }
      };
      fetchRecords();
    }
  }, [isLoggedIn, loggedInUser?.email]);

  // Validation / interaction state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Translations
  const content = {
    en: {
      loginTitle: "LOGIN",
      registerTitle: "CREATE ACCOUNT",
      forgotTitle: "RESET PASSWORD",
      emailLabel: "Email",
      emailPl: "Your electronic mail address",
      passwordLabel: "Password",
      passwordPl: "Your secure password",
      nameLabel: "Full Name",
      namePl: "John Doe",
      confirmLabel: "Confirm Password",
      confirmPl: "Repeat secure password",
      signInBtn: "Sign in",
      signUpBtn: "Create account",
      resetBtn: "Send recovery link",
      newCustomer: "New Customer?",
      createAccount: "Create account",
      forgotPassword: "Forgot your password?",
      backToLogin: "Back to login",
      alreadyHaveAcc: "Already have an account?",
      loginBtnPl: "Sign in",
      welcomeBack: "Welcome back,",
      portalTitle: "Client Command Hub",
      portalSubtitle: "Your automated botanical architecture coordinates are live and calibrated.",
      activeStatus: "System Calibration Active",
      premiumTier: "Pro Tier System",
      irrigationStatus: "Hydration Status",
      zonesActive: "16 Automated Zones Connected",
      edgeUplink: "99.8% Uplink Recipient Connectivity",
      logout: "Disengage Session"
    },
    es: {
      loginTitle: "INICIAR SESIÓN",
      registerTitle: "CREAR CUENTA",
      forgotTitle: "RESTABLECER CONTRASEÑA",
      emailLabel: "Correo Electrónico",
      emailPl: "Tu dirección de correo electrónico",
      passwordLabel: "Contraseña",
      passwordPl: "Tu contraseña de seguridad",
      nameLabel: "Nombre Completo",
      namePl: "John Doe",
      confirmLabel: "Confirmar Contraseña",
      confirmPl: "Repite la contraseña de seguridad",
      signInBtn: "Iniciar sesión",
      signUpBtn: "Crear cuenta",
      resetBtn: "Enviar enlace de recuperación",
      newCustomer: "¿Nuevo Cliente?",
      createAccount: "Crear cuenta",
      forgotPassword: "¿Olvidaste tu contraseña?",
      backToLogin: "Volver al inicio de sesión",
      alreadyHaveAcc: "¿Ya tienes una cuenta?",
      loginBtnPl: "Entrar",
      welcomeBack: "Bienvenido de nuevo,",
      portalTitle: "Centro de Comando del Cliente",
      portalSubtitle: "Las coordenadas de tu arquitectura botánica automatizada están activas y calibradas.",
      activeStatus: "Calibración del Sistema Activa",
      premiumTier: "Sistema de Nivel Pro",
      irrigationStatus: "Estado de Hidratación",
      zonesActive: "16 Zonas Automatizadas Conectadas",
      edgeUplink: "Conectividad de Enlace del 99.8%",
      logout: "Terminar Sesión"
    }
  };

  const t = content[language];

  // Action handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError(language === 'en' ? 'Please enter a valid email address.' : 'Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (!password || password.length < 4) {
      setError(language === 'en' ? 'Password must be at least 4 characters.' : 'La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    // Success simulation
    setLoggedInUser({
      name: email.split('@')[0].toUpperCase(),
      email: email
    });
    setIsLoggedIn(true);
    setSuccess(language === 'en' ? 'Successfully authenticated!' : '¡Autenticado con éxito!');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name) {
      setError(language === 'en' ? 'Please provide your full name.' : 'Por favor proporciona tu nombre completo.');
      return;
    }
    if (!email) {
      setError(language === 'en' ? 'Please configure a valid email.' : 'Por favor configura un correo electrónico válido.');
      return;
    }
    if (password.length < 4) {
      setError(language === 'en' ? 'Password is too vulnerable.' : 'La contraseña es demasiado vulnerable.');
      return;
    }
    if (password !== confirmPassword) {
      setError(language === 'en' ? 'Passwords do not match.' : 'Las contraseñas no coinciden.');
      return;
    }

    setLoggedInUser({
      name: name.toUpperCase(),
      email: email
    });
    setIsLoggedIn(true);
    setSuccess(language === 'en' ? 'Account registered!' : '¡Cuenta registrada!');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError(language === 'en' ? 'Provide email for reset.' : 'Proporciona el correo para el restablecimiento.');
      return;
    }

    setSuccess(language === 'en' ? 'Recovery email dispatched.' : 'Correo electrónico de recuperación enviado.');
    setTimeout(() => {
      setView('login');
      setSuccess('');
    }, 2800);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setLoggedInUser({ name: '', email: '' });
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  return (
    <main className="pt-32 pb-24 px-4 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Return Link */}
        <div className="mb-8 max-w-lg mx-auto">
          <button 
            id="login-return-to-store-btn"
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-primary-teal font-bold hover:opacity-80 transition-all cursor-pointer"
          >
            <ArrowLeft size={18} /> 
            {language === 'en' ? 'Return to Store' : 'Volver a la Tienda'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div 
              key="auth-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-lg mx-auto bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 md:p-12 relative overflow-hidden"
            >
              {/* Distinctive accent circle overlay */}
              <div className="absolute -top-24 -right-24 w-52 h-52 bg-[#ff5a00]/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* LOGO Display */}
              <div className="flex flex-col items-center justify-center mb-10">
                <div className="w-12 h-12 bg-primary-teal text-white rounded-2xl flex items-center justify-center mb-4 shadow-md shadow-primary-teal/10">
                  <Lock size={22} className="animate-pulse" />
                </div>
                <h1 id="auth-main-title" className="font-display text-2xl md:text-3xl font-black text-slate-900 tracking-wider uppercase text-center">
                  {view === 'login' && t.loginTitle}
                  {view === 'register' && t.registerTitle}
                  {view === 'forgot' && t.forgotTitle}
                </h1>
                <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">
                  Itsi Corporate Secure Portal
                </p>
              </div>

              {/* Status information banners */}
              {error && (
                <div id="auth-error-banner" className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-xl text-rose-700 text-xs font-bold flex items-center gap-2 animate-bounce">
                  <span>⚠️ {error}</span>
                </div>
              )}
              {success && (
                <div id="auth-success-banner" className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-xl text-emerald-700 text-xs font-bold flex items-center gap-2 animate-pulse">
                  <CheckCircle2 size={16} />
                  <span>{success}</span>
                </div>
              )}

              {/* View 1: LOGIN (Matches the provided visual design layout) */}
              {view === 'login' && (
                <form id="auth-login-form" onSubmit={handleLoginSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <label id="login-email-label" className="text-xs font-black uppercase text-slate-500 tracking-widest block">
                      {t.emailLabel}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4.5 text-slate-400" size={18} />
                      <input 
                        id="login-email-input"
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-xl text-slate-800 focus:bg-white focus:ring-2 ring-[#ff5a00]/10 focus:border-[#ff5a00] outline-none text-sm transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label id="login-password-label" className="text-xs font-black uppercase text-slate-500 tracking-widest block">
                      {t.passwordLabel}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-4.5 text-slate-400" size={18} />
                      <input 
                        id="login-password-input"
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-xl text-slate-800 focus:bg-white focus:ring-2 ring-[#ff5a00]/10 focus:border-[#ff5a00] outline-none text-sm transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Submit buttons & Interactive Links */}
                  <div className="pt-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <button 
                        id="login-submit-btn"
                        type="submit"
                        className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#ff5a00] hover:bg-[#e04f00] text-white font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-[#ff5a00]/25 duration-200 cursor-pointer active:scale-95"
                      >
                        {t.signInBtn}
                      </button>

                      {/* Register Toggle Link: matches target design */}
                      <div className="text-xs font-semibold text-slate-600">
                        {t.newCustomer}{' '}
                        <button 
                          id="login-to-register-btn"
                          type="button" 
                          onClick={() => { setView('register'); setError(''); }}
                          className="text-[#ff5a00] hover:underline font-bold"
                        >
                          {t.createAccount}
                        </button>
                      </div>
                    </div>

                    {/* Forgot password */}
                    <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                      <button 
                        id="login-forgot-password-link"
                        type="button" 
                        onClick={() => { setView('forgot'); setError(''); }}
                        className="text-xs font-bold text-slate-400 hover:text-[#ff5a00] transition-colors"
                      >
                        {t.forgotPassword}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* View 2: REGISTER */}
              {view === 'register' && (
                <form id="auth-register-form" onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label id="register-name-label" className="text-xs font-black uppercase text-slate-500 tracking-widest block">
                      {t.nameLabel}
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-4 text-slate-400" size={18} />
                      <input 
                        id="register-name-input"
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.namePl}
                        className="w-full bg-slate-50 border border-slate-200 p-3.5 pl-12 rounded-xl text-slate-800 focus:bg-white focus:ring-2 ring-[#ff5a00]/10 focus:border-[#ff5a00] outline-none text-sm transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label id="register-email-label" className="text-xs font-black uppercase text-slate-500 tracking-widest block">
                      {t.emailLabel}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 text-slate-400" size={18} />
                      <input 
                        id="register-email-input"
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-200 p-3.5 pl-12 rounded-xl text-slate-800 focus:bg-white focus:ring-2 ring-[#ff5a00]/10 focus:border-[#ff5a00] outline-none text-sm transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label id="register-password-label" className="text-xs font-black uppercase text-slate-500 tracking-widest block">
                        {t.passwordLabel}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-4 text-slate-400" size={18} />
                        <input 
                          id="register-password-input"
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-slate-50 border border-slate-200 p-3.5 pl-12 rounded-xl text-slate-800 focus:bg-white focus:ring-2 ring-[#ff5a00]/10 focus:border-[#ff5a00] outline-none text-sm transition-all shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label id="register-confirm-label" className="text-xs font-black uppercase text-slate-500 tracking-widest block">
                        {t.confirmLabel}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-4 text-slate-400" size={18} />
                        <input 
                          id="register-confirm-input"
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-slate-50 border border-slate-200 p-3.5 pl-12 rounded-xl text-slate-800 focus:bg-white focus:ring-2 ring-[#ff5a00]/10 focus:border-[#ff5a00] outline-none text-sm transition-all shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <button 
                      id="register-submit-btn"
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#ff5a00] hover:bg-[#e04f00] text-white font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-[#ff5a00]/25 duration-200 cursor-pointer text-center block"
                    >
                      {t.signUpBtn}
                    </button>

                    <div className="text-center text-xs text-slate-500 font-semibold pt-1">
                      {t.alreadyHaveAcc}{' '}
                      <button 
                        id="register-to-login-btn"
                        type="button" 
                        onClick={() => { setView('login'); setError(''); }}
                        className="text-[#ff5a00] hover:underline font-bold"
                      >
                        {language === 'en' ? 'Sign in' : 'Inicia Sesión'}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* View 3: FORGOT PASSWORD */}
              {view === 'forgot' && (
                <form id="auth-forgot-form" onSubmit={handleForgotSubmit} className="space-y-6">
                  <p className="text-xs font-medium text-slate-500 leading-relaxed text-center max-w-sm mx-auto">
                    {language === 'en' 
                      ? 'Secure link to update password credentials will be dispatched to register coordinates.' 
                      : 'Se enviará un enlace de seguridad para actualizar la contraseña a sus coordenadas de registro.'}
                  </p>
                  
                  <div className="space-y-1">
                    <label id="forgot-email-label" className="text-xs font-black uppercase text-slate-500 tracking-widest block">
                      {t.emailLabel}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4.5 text-slate-400" size={18} />
                      <input 
                        id="forgot-email-input"
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-xl text-slate-800 focus:bg-white focus:ring-2 ring-[#ff5a00]/10 focus:border-[#ff5a00] outline-none text-sm transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-2 space-y-4">
                    <button 
                      id="forgot-submit-btn"
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#ff5a00] text-white font-black uppercase tracking-widest text-xs hover:brightness-110 shadow-lg shadow-[#ff5a00]/25 transition-all text-center block"
                    >
                      {t.resetBtn}
                    </button>
                    
                    <button 
                      id="forgot-back-to-login-btn"
                      type="button" 
                      onClick={() => setView('login')}
                      className="w-full text-center text-xs text-slate-400 hover:text-primary-teal font-black uppercase tracking-widest"
                    >
                      {t.backToLogin}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          ) : (
            
            // Logged In Simulated Workspace Screen
            <motion.div 
              key="logged-in-portal"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-emerald-50 text-[#0284c7] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-100 animate-pulse">
                      ● {t.activeStatus}
                    </span>
                    <span className="text-xs bg-indigo-50 text-indigo-700 font-extrabold px-3 py-1 rounded-full border border-indigo-100">
                      {t.premiumTier}
                    </span>
                  </div>
                  <h1 className="font-display text-3xl font-black text-slate-900 tracking-tight pt-2">
                    {t.welcomeBack} {loggedInUser.name}!
                  </h1>
                  <p className="text-sm font-medium text-slate-500">
                    {t.portalSubtitle} ({loggedInUser.email})
                  </p>
                </div>

                <button 
                  id="portal-logout-btn"
                  onClick={handleLogOut}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 active:scale-95 transition-all font-black uppercase tracking-wider text-xs cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>{t.logout}</span>
                </button>
              </div>

              {/* Connected devices grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                
                {/* Panel item 1 */}
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                  <div className="w-12 h-12 bg-[#0284c7]/10 text-[#0284c7] rounded-2xl flex items-center justify-center">
                    <Droplets size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">{t.irrigationStatus}</h3>
                    <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">CALIBRATED ZONE PROFILE</p>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    {t.zonesActive}
                  </p>
                </div>

                {/* Panel item 2 */}
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                  <div className="w-12 h-12 bg-primary-teal/10 text-primary-teal rounded-2xl flex items-center justify-center">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">Uplink Telemetry</h3>
                    <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">AMPLIFIED SIGNALS</p>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    {t.edgeUplink}
                  </p>
                </div>

                {/* Panel item 3 */}
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                  <div className="w-12 h-12 bg-indigo-100/60 text-indigo-700 rounded-2xl flex items-center justify-center">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">Network Matrix</h3>
                    <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">SECURITY CLEARANCE</p>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    AES-256 Cloud Tunnel fully locked.
                  </p>
                </div>

              </div>

              {/* Interactive simulated actions panel */}
              <div className="mt-8 p-6 bg-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-all" />
                <div>
                  <h4 className="font-display font-bold text-lg">Access Advanced Interactive Simulator</h4>
                  <p className="text-xs text-slate-400 font-medium mt-1">Experiment with real-time soil calibrations and moisture levels live.</p>
                </div>
                <button 
                  id="portal-demo-simulator-btn"
                  onClick={() => navigate('/demo')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-teal hover:bg-teal-600 font-black text-xs uppercase tracking-wider px-6 py-4 rounded-xl transition-all shadow-lg active:scale-95"
                >
                  Configure Zones <ChevronRight size={16} />
                </button>
              </div>

              {/* Dynamic Database Submissions inspector section */}
              <div className="mt-8 p-8 border border-slate-200/80 bg-slate-50/50 rounded-3xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-primary-teal/10 text-primary-teal rounded-xl flex items-center justify-center">
                      <Database size={18} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-display font-bold text-lg text-slate-900">Database Record Audit</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">SECURED ENDPOINT COUPLING</p>
                    </div>
                  </div>

                  <div className={`px-4 py-1.5 rounded-full border text-[11px] font-bold flex items-center gap-1.5 self-start ${
                    hasSupabase 
                      ? 'bg-blue-50 border-blue-200 text-blue-800' 
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${hasSupabase ? 'bg-blue-500' : 'bg-amber-500 animate-pulse'}`} />
                    {hasSupabase ? "Supabase Live Connected" : "Local Storage Cache"}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Submissions Section 1: contact request log */}
                  <div className="space-y-3 text-left">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Mail size={13} />
                      {language === 'en' ? "Contact Messages" : "Mensajes de Contacto"} ({dbContacts.length})
                    </h4>
                    
                    {isLoadingRecords ? (
                      <div className="py-8 text-center text-xs text-slate-400 font-medium animate-pulse">
                        {language === 'en' ? "Fetching database records..." : "Consultando registros..."}
                      </div>
                    ) : dbContacts.length === 0 ? (
                      <div className="p-6 bg-white border border-slate-200/60 rounded-2xl text-center text-xs text-slate-400 font-medium">
                        {language === 'en' ? "No contact messages logged for this email." : "No hay mensajes de contacto con este correo."}
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                        {dbContacts.map((contact, index) => (
                          <div key={contact.id || index} className="p-4 bg-white border border-slate-200/80 rounded-2xl hover:border-primary-teal transition-all space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                              <span className="flex items-center gap-1"><Calendar size={11} /> {new Date(contact.created_at).toLocaleDateString()}</span>
                              <span className="text-primary-teal">ID: {contact.id || index}</span>
                            </div>
                            <p className="text-xs font-black text-slate-800">{contact.subject}</p>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed italic">"{contact.message}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submissions Section 2: reservation request log */}
                  <div className="space-y-3 text-left">
                    <h4 className="text-xs font-black uppercase text-[#ff5a00] tracking-wider flex items-center gap-1.5">
                      <ShieldCheck size={13} />
                      {language === 'en' ? "Product Reservations" : "Reservaciones de Productos"} ({dbReservations.length})
                    </h4>

                    {isLoadingRecords ? (
                      <div className="py-8 text-center text-xs text-slate-400 font-medium animate-pulse">
                        {language === 'en' ? "Fetching database records..." : "Consultando registros..."}
                      </div>
                    ) : dbReservations.length === 0 ? (
                      <div className="p-6 bg-white border border-slate-200/60 rounded-2xl text-center text-xs text-slate-400 font-medium">
                        {language === 'en' ? "No product reservations logged yet." : "No hay reservaciones de equipos registradas."}
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                        {dbReservations.map((res, index) => (
                          <div key={res.id || index} className="p-4 bg-white border border-slate-250 rounded-2xl hover:border-[#ff5a00]/50 transition-all space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                              <span className="flex items-center gap-1"><Calendar size={11} /> {new Date(res.created_at).toLocaleDateString()}</span>
                              <span className="bg-[#ff5a00]/10 text-[#ff5a00] px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">RESERVED</span>
                            </div>
                            <p className="text-xs font-black text-slate-800">
                              Itsi <span className="text-[#ff5a00]">{res.package_name}</span> Kit
                            </p>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                              Calibration Technician Assignment Pending
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
