import React from 'react';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { soundEngine } from '../design-system/soundEngine';

interface CreateAccountLinkProps {
  isSignupMode: boolean;
  onToggle: () => void;
}

export const CreateAccountLink: React.FC<CreateAccountLinkProps> = ({
  isSignupMode,
  onToggle,
}) => {
  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-8 z-50">
      <motion.button
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={() => {
          soundEngine.play('click');
          onToggle();
        }}
        aria-label={isSignupMode ? 'Back to sign in' : 'Create a new workstation account'}
        className="group relative min-h-[44px] px-4.5 py-2.5 rounded-2xl bg-[#1E222A]/90 hover:bg-[#1E222A] active:bg-[#14171D] border border-[#2D333F] hover:border-[#E06C38]/50 backdrop-blur-3xl text-xs font-medium text-[#ECEFF4] flex items-center gap-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E06C38]/50 shadow-lg cursor-pointer overflow-hidden"
      >
        {/* Subtle hover specular sheen */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

        {isSignupMode ? (
          <>
            <motion.div
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#E06C38] group-hover:-translate-x-1 transition-transform" />
            </motion.div>
            <span className="font-semibold text-[#ECEFF4]">Back to sign in</span>
          </>
        ) : (
          <>
            <span className="text-[#8F96A3]">New to MyOS?</span>
            <span className="text-[#E06C38] font-semibold group-hover:text-[#F07D49] transition-colors">Create Account</span>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 rounded-full bg-[#E06C38]/15 flex items-center justify-center border border-[#E06C38]/30"
            >
              <UserPlus className="w-3 h-3 text-[#E06C38] group-hover:scale-110 transition-transform" />
            </motion.div>
          </>
        )}
      </motion.button>
    </div>
  );
};
