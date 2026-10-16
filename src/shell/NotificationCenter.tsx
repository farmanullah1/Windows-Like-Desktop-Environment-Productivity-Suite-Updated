import React from 'react';
import { Bell, X, Trash2, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useDesktop } from '../core/desktopStore';
import { soundEngine } from '../design-system/soundEngine';

export const NotificationCenter: React.FC = () => {
  const {
    isNotificationCenterOpen,
    notifications,
    dismissNotification,
    clearAllNotifications,
  } = useDesktop();

  if (!isNotificationCenterOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-[#2D9C5E]" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-[#D9822B]" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-[#E05252]" />;
      default:
        return <Info className="w-4 h-4 text-[#E06C38]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-16 right-4 w-80 sm:w-88 rounded-3xl bg-[#1E222A]/95 border border-[#2D333F] shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl z-[var(--z-notification-center)] flex flex-col max-h-[500px] overflow-hidden select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-[#2D333F] bg-[#14171D]">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#E06C38]" />
          <span className="text-xs font-bold text-[#ECEFF4]">Notifications</span>
          {notifications.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#E06C38] text-white text-[10px] font-bold">
              {notifications.length}
            </span>
          )}
        </div>

        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="flex items-center gap-1 text-[11px] text-[#8F96A3] hover:text-[#ECEFF4] transition-colors cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[var(--text-muted)] gap-2">
            <Bell className="w-8 h-8 opacity-30 stroke-[1.2]" />
            <p className="text-xs">No notifications right now</p>
          </div>
        ) : (
          <AnimatePresence>
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.18 }}
                className="p-3.5 rounded-2xl border border-[#2D333F] bg-[#14171D] hover:border-[#E06C38]/50 transition-all flex flex-col gap-1.5 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(notif.type)}
                    <span className="text-xs font-semibold text-[#ECEFF4]">{notif.title}</span>
                  </div>
                  <button
                    onClick={() => {
                      soundEngine.play('click');
                      dismissNotification(notif.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-[#8F96A3] hover:text-[#ECEFF4] transition-all rounded cursor-pointer"
                    title="Dismiss"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-[11px] text-[#8F96A3] leading-relaxed">{notif.message}</p>

                <div className="flex items-center justify-between text-[10px] text-[#687182] pt-1">
                  <span>{notif.source}</span>
                  <span>{notif.timestamp}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};
