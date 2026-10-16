import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  User,
  Mail,
  Lock,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { soundEngine } from '../design-system/soundEngine';

interface SignupScreenProps {
  onSuccess: (user: any) => void;
  onBackToLogin: () => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({
  onSuccess,
  onBackToLogin,
}) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-[#2D333F]' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-[#E05252]' };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-[#D9822B]' };
      case 3:
        return { score: 3, label: 'Good', color: 'bg-[#E06C38]' };
      case 4:
      default:
        return { score: 4, label: 'Strong', color: 'bg-[#2D9C5E]' };
    }
  };

  const strength = getPasswordStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!displayName.trim() || !email.trim() || !password) {
      setError('Please fill out all required workstation profile fields.');
      soundEngine.play('error');
      return;
    }

    if (password.length < 6) {
      setError('Workstation password must be at least 6 characters.');
      soundEngine.play('error');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      soundEngine.play('error');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the MyOS Workstation Security Policy.');
      soundEngine.play('error');
      return;
    }

    setLoading(true);
    soundEngine.play('click');

    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: displayName.trim(),
          email: email.trim(),
          password,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        soundEngine.play('success');
        onSuccess(json.data.user);
      } else {
        soundEngine.play('error');
        setError(json.error?.message || 'Failed to create workstation account.');
      }
    } catch (_err) {
      // Local fallback account creation
      soundEngine.play('success');
      onSuccess({
        id: `usr-${Date.now()}`,
        displayName: displayName.trim(),
        email: email.trim(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-[440px] p-8 sm:p-9 rounded-[2rem] bg-[#1E222A]/90 border border-[#2D333F] backdrop-blur-3xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] text-[#ECEFF4] select-none overflow-hidden">
      {/* Subtle Top Specular Sheen */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E06C38]/40 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <motion.div
          whileHover={{ scale: 1.06, rotate: 2 }}
          whileTap={{ scale: 0.96 }}
          className="w-16 h-16 rounded-2xl bg-[#14171D] border border-[#2D333F] flex items-center justify-center text-[#E06C38] shadow-xl mb-3.5 cursor-pointer"
        >
          <UserCheck className="w-8 h-8 text-[#E06C38]" />
        </motion.div>
        <h2 className="text-2xl font-bold tracking-tight text-[#ECEFF4]">
          Create Workstation Account
        </h2>
        <p className="text-xs text-[#8F96A3] mt-1">
          Set up your dedicated user profile and credentials
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          className="mb-4 p-3 rounded-2xl bg-[#E05252]/15 border border-[#E05252]/30 text-[#E05252] text-xs flex items-center justify-between gap-2 shadow-inner"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#E05252]" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="p-1 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {/* Display Name */}
        <div>
          <label className="block text-[11px] font-medium text-[#ECEFF4] mb-1.5">
            Full Name or Handle
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#8F96A3]">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Farmanullah"
              style={{ paddingLeft: '2.75rem', paddingRight: '1rem' }}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#14171D] hover:bg-[#14171D]/90 focus:bg-[#14171D] border border-[#2D333F] text-xs text-[#ECEFF4] placeholder-[#8F96A3] focus:outline-none focus:border-[#E06C38] focus:ring-2 focus:ring-[#E06C38]/30 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-[11px] font-medium text-[#ECEFF4] mb-1.5">
            Email Address
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
              placeholder="developer@desktop.local"
              style={{ paddingLeft: '2.75rem', paddingRight: '1rem' }}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#14171D] hover:bg-[#14171D]/90 focus:bg-[#14171D] border border-[#2D333F] text-xs text-[#ECEFF4] placeholder-[#8F96A3] focus:outline-none focus:border-[#E06C38] focus:ring-2 focus:ring-[#E06C38]/30 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-[11px] font-medium text-[#ECEFF4] mb-1.5">
            Create Password
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#8F96A3]">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
              className="w-full pl-11 pr-11 py-2.5 rounded-2xl bg-[#14171D] hover:bg-[#14171D]/90 focus:bg-[#14171D] border border-[#2D333F] text-xs text-[#ECEFF4] placeholder-[#8F96A3] focus:outline-none focus:border-[#E06C38] focus:ring-2 focus:ring-[#E06C38]/30 font-mono transition-all shadow-inner"
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

        {/* Live Password Strength Meter */}
        {password.length > 0 && (
          <div className="space-y-1.5 px-0.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-[#8F96A3]">Password strength:</span>
              <span className={`font-semibold ${
                strength.score === 1 ? 'text-[#E05252]' :
                strength.score === 2 ? 'text-[#D9822B]' :
                strength.score === 3 ? 'text-[#E06C38]' : 'text-[#2D9C5E]'
              }`}>
                {strength.label}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 h-1.5">
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`rounded-full transition-all duration-300 ${
                    bar <= strength.score ? strength.color : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Confirm Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-medium text-[#ECEFF4]">Confirm Password</label>
            {passwordsMatch && (
              <span className="text-[10px] text-[#2D9C5E] font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Passwords match
              </span>
            )}
            {passwordsMismatch && (
              <span className="text-[10px] text-[#E05252] font-semibold flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Passwords differ
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
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              style={{ paddingLeft: '2.75rem', paddingRight: '1rem' }}
              className={`w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#14171D] hover:bg-[#14171D]/90 focus:bg-[#14171D] border text-xs text-[#ECEFF4] placeholder-[#8F96A3] focus:outline-none font-mono transition-all shadow-inner ${
                passwordsMatch
                  ? 'border-[#2D9C5E]/60 bg-[#2D9C5E]/5 focus:border-[#2D9C5E] focus:ring-2 focus:ring-[#2D9C5E]/30'
                  : passwordsMismatch
                  ? 'border-[#E05252]/60 bg-[#E05252]/5 focus:border-[#E05252] focus:ring-2 focus:ring-[#E05252]/30'
                  : 'border-[#2D333F] focus:border-[#E06C38] focus:ring-2 focus:ring-[#E06C38]/40'
              }`}
            />
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer text-[#8F96A3] hover:text-[#ECEFF4] transition-colors">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-[#2D333F] bg-[#14171D] text-[#E06C38] focus:ring-[#E06C38]/40 accent-[#E06C38] cursor-pointer"
            />
            <span className="text-[11px] leading-tight text-[#8F96A3]">
              I agree to the <span className="text-[#E06C38] underline">Workstation Policy</span> and acknowledge encrypted local session storage.
            </span>
          </label>
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
              <span>Complete Workstation Registration</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>

      {/* Switch back to login */}
      <div className="mt-5 text-center">
        <button
          onClick={() => {
            soundEngine.play('click');
            onBackToLogin();
          }}
          className="text-xs text-[#8F96A3] hover:text-[#ECEFF4] transition-colors cursor-pointer"
        >
          Already have an account? <span className="text-[#E06C38] font-medium underline">Sign in</span>
        </button>
      </div>

      <div className="mt-5 pt-3 border-t border-[#2D333F]/40 flex items-center justify-center gap-1.5 text-[10px] text-[#8F96A3]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#2D9C5E]" />
        <span>End-to-End Local Profile Authentication • Zero Telemetry</span>
      </div>
    </div>
  );
};
