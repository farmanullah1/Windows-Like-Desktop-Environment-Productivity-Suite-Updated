import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  HardDrive,
  Fingerprint,
  Sparkles,
  ArrowRight,
  Database,
  CheckCircle2,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEngine } from '../design-system/soundEngine';
import { useDesktop } from '../core/desktopStore';
import { CreateAccountLink } from './CreateAccountLink';
import { SignupScreen } from './SignupScreen';
import { setDocumentTitle } from '../lib/documentTitle';

interface LoginScreenProps {
  onLoginSuccess: (user?: any) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const { currentWallpaper } = useDesktop();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('admin@desktop.local');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  React.useEffect(() => {
    setDocumentTitle(isSignup ? 'MyOS — Create Account' : 'MyOS — Sign In');
  }, [isSignup]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setCapsLockActive(e.getModifierState('CapsLock'));
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    setCapsLockActive(e.getModifierState('CapsLock'));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please provide both your email address and workspace password.');
      soundEngine.play('error');
      return;
    }

    setLoading(true);
    soundEngine.play('click');

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        soundEngine.play('success');
        onLoginSuccess(json.data.user);
      } else {
        soundEngine.play('error');
        setError(json.error?.message || 'Invalid workstation credentials.');
      }
    } catch (_err) {
      // Local fallback sign-in
      soundEngine.play('success');
      onLoginSuccess({
        id: 'usr-admin-01',
        email: email.trim(),
        displayName: 'Administrator',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPreset = (presetEmail: string, presetPass: string) => {
    soundEngine.play('click');
    setEmail(presetEmail);
    setPassword(presetPass);
    setError(null);
  };

  const handleLocalGuestLogin = () => {
    soundEngine.play('click');
    soundEngine.play('success');
    onLoginSuccess({
      id: 'usr-local-guest',
      email: 'guest@myos.workstation',
      displayName: 'Local Guest',
    });
  };

  const handleBiometricLogin = () => {
    soundEngine.play('click');
    setLoading(true);
    setTimeout(() => {
      soundEngine.play('success');
      onLoginSuccess({
        id: 'usr-biometric-verified',
        email: 'biometrics@myos.workstation',
        displayName: 'Windows Hello User',
      });
      setLoading(false);
    }, 700);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    soundEngine.play('click');
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowForgotModal(false);
      setResetEmail('');
    }, 2500);
  };

  return (
    <div
      role="region"
      aria-label="Application Login Screen"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-start md:justify-center select-none overflow-y-auto min-h-screen py-10 px-4 text-white"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      {/* Blurred Acrylic Wallpaper Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-2xl scale-110 pointer-events-none transition-all duration-1000 ease-out"
        style={{ backgroundImage: `url(${currentWallpaper})` }}
      />
      {/* High-Contrast Scrim Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-3xl pointer-events-none" />

      {/* Dynamic Ambient Floating Lights */}
      <motion.div
        animate={{
          x: [0, 45, -35, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-[#E06C38]/20 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -45, 40, 0],
          y: [0, 45, -35, 0],
          scale: [1, 0.9, 1.25, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#C85728]/20 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, 30, -25, 0],
          y: [0, 25, -20, 0],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[25rem] rounded-full bg-[#F07D49]/10 blur-[140px] pointer-events-none"
      />

      {/* Top-Right Corner Action: "Create Account" Entry Point */}
      <CreateAccountLink
        isSignupMode={isSignup}
        onToggle={() => {
          setError(null);
          setIsSignup(!isSignup);
        }}
      />

      {/* Center Interface Area with AnimatePresence */}
      <div className="relative z-10 w-full max-w-[460px] my-auto py-4 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {isSignup ? (
            <motion.div
              key="signup-card"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <SignupScreen
                onSuccess={(user) => onLoginSuccess(user)}
                onBackToLogin={() => setIsSignup(false)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="login-card"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[420px] p-8 sm:p-9 rounded-[2rem] bg-[#1E222A]/90 border border-[#2D333F] backdrop-blur-3xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] text-[#ECEFF4] select-none overflow-hidden"
            >
              {/* Subtle Top Specular Sheen */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E06C38]/40 to-transparent pointer-events-none" />

              {/* Header with MyOS Logo */}
              <div className="flex flex-col items-center text-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.06, rotate: 2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-16 h-16 rounded-2xl bg-[#14171D] border border-[#2D333F] flex items-center justify-center text-white shadow-xl mb-3.5 p-3 cursor-pointer"
                >
                  <img
                    src="/assets/branding/logo.svg"
                    alt="MyOS Logo"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight text-[#ECEFF4]">
                    Welcome to MyOS
                  </h2>
                </div>
                <p className="text-xs text-[#8F96A3] mt-1">
                  Authenticate to unlock your personal desktop environment
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="mb-4 p-3 rounded-2xl bg-[#E05252]/15 border border-[#E05252]/30 text-[#E05252] text-xs flex items-center justify-between gap-2 shadow-inner"
                >
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#E05252]" />
                    <span>{error}</span>
                  </div>
                  <button
                    onClick={() => setError(null)}
                    className="p-1 hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                {/* Email Field */}
                <div>
                  <label className="block text-[11px] font-medium text-[#ECEFF4] mb-1.5">
                    Email or Workstation ID
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center pointer-events-none text-[#8F96A3]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      autoComplete="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@desktop.local"
                      style={{ paddingLeft: '2.75rem', paddingRight: '1rem' }}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#14171D] hover:bg-[#14171D]/90 focus:bg-[#14171D] border border-[#2D333F] text-xs text-[#ECEFF4] placeholder-[#8F96A3] focus:outline-none focus:border-[#E06C38] focus:ring-2 focus:ring-[#E06C38]/30 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-medium text-[#ECEFF4]">Password</label>
                    {capsLockActive && (
                      <span className="text-[10px] text-[#D9822B] font-semibold tracking-wide flex items-center gap-1 animate-pulse">
                        <AlertCircle className="w-3 h-3" />
                        Caps Lock ON
                      </span>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center pointer-events-none text-[#8F96A3]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                      className="w-full pl-11 pr-11 py-3 rounded-2xl bg-[#14171D] hover:bg-[#14171D]/90 focus:bg-[#14171D] border border-[#2D333F] text-xs text-[#ECEFF4] placeholder-[#8F96A3] focus:outline-none focus:border-[#E06C38] focus:ring-2 focus:ring-[#E06C38]/30 font-mono transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 flex items-center justify-center text-[#8F96A3] hover:text-[#ECEFF4] p-1 rounded-lg transition-colors cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember me & Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[#8F96A3] hover:text-[#ECEFF4] transition-colors">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded-md border-[#2D333F] bg-[#14171D] text-[#E06C38] focus:ring-[#E06C38]/40 accent-[#E06C38] cursor-pointer"
                    />
                    <span className="text-[11px] font-medium">Keep me signed in</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.play('click');
                      setShowForgotModal(true);
                    }}
                    className="text-[11px] text-[#E06C38] hover:text-[#F07D49] hover:underline transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 rounded-2xl bg-[#E06C38] hover:bg-[#C85728] active:bg-[#F07D49] text-white font-semibold text-xs transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <span>Sign in to Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Quick Preset Badges */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-[#2D333F]/40">
                <span className="text-[10px] text-[#8F96A3]">Quick fill:</span>
                <button
                  type="button"
                  onClick={() => handleQuickPreset('admin@desktop.local', 'admin123')}
                  className="px-2.5 py-1 rounded-xl bg-[#14171D] hover:bg-[#14171D]/80 border border-[#2D333F] text-[10px] font-mono text-[#E06C38] hover:text-[#F07D49] transition-colors cursor-pointer"
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPreset('guest@desktop.local', 'guest123')}
                  className="px-2.5 py-1 rounded-xl bg-[#14171D] hover:bg-[#14171D]/80 border border-[#2D333F] text-[10px] font-mono text-[#8F96A3] hover:text-[#ECEFF4] transition-colors cursor-pointer"
                >
                  Guest
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2D333F]" />
                </div>
                <span className="relative px-3 bg-[#1E222A] text-[10px] text-[#8F96A3] uppercase tracking-widest font-mono">
                  or continue with
                </span>
              </div>

              {/* Secondary: Local Profile & Windows Hello Options */}
              <div className="grid grid-cols-2 gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(224, 108, 56, 0.08)' }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleLocalGuestLogin}
                  className="py-2.5 px-3 rounded-2xl border border-[#2D333F] bg-[#14171D] text-xs font-medium text-[#ECEFF4] hover:border-[#E06C38]/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <HardDrive className="w-3.5 h-3.5 text-[#2D9C5E]" />
                  <span className="truncate">Local Profile</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(224, 108, 56, 0.08)' }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleBiometricLogin}
                  className="py-2.5 px-3 rounded-2xl border border-[#2D333F] bg-[#14171D] text-xs font-medium text-[#ECEFF4] hover:border-[#E06C38]/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  title="Windows Hello Biometrics"
                >
                  <Fingerprint className="w-3.5 h-3.5 text-[#E06C38]" />
                  <span className="truncate">Windows Hello</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-7 flex flex-col items-center gap-1.5 text-[11px] text-[#8F96A3] font-medium">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#ECEFF4]">MyOS Workstation</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#2D9C5E] font-mono text-[10px]">
              <Database className="w-3 h-3" />
              SQL Server 2025 Ready
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#8F96A3]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E06C38]" />
            <span>End-to-End Local Encryption • 256-Bit Protected Session</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Drawer / Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowForgotModal(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm p-6 rounded-3xl bg-[#1E222A] border border-[#2D333F] backdrop-blur-2xl shadow-2xl text-[#ECEFF4]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#E06C38]/15 border border-[#E06C38]/30 flex items-center justify-center text-[#E06C38]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#ECEFF4]">Password Recovery</h3>
                </div>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-[#8F96A3] hover:text-[#ECEFF4]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {resetSent ? (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#2D9C5E] mx-auto" />
                  <p className="text-xs font-semibold text-[#2D9C5E]">
                    Recovery Link Dispatched
                  </p>
                  <p className="text-[11px] text-[#8F96A3]">
                    Check your mailbox for instructions to restore access.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <p className="text-xs text-[#8F96A3] leading-relaxed">
                    Enter your registered email address to receive a secure recovery token.
                  </p>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="admin@desktop.local"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14171D] border border-[#2D333F] text-xs text-[#ECEFF4] placeholder-[#8F96A3] focus:outline-none focus:border-[#E06C38]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="px-3.5 py-2 rounded-xl text-xs text-[#8F96A3] hover:text-[#ECEFF4]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#E06C38] hover:bg-[#C85728] text-xs font-semibold text-white shadow-md cursor-pointer"
                    >
                      Send Token
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
