/**
 * Central Motion Engine — Version 9.0
 * Unified typed motion API, easing curves, and duration tokens for MyOS.
 *
 * Motion profiles:
 * - 'off': remove spatial transitions; instant or short fades only
 * - 'minimal': quick fades and small focus cues
 * - 'balanced': (DEFAULT) restrained, polished common interactions
 * - 'expressive': richer spring motion and accent transitions
 * - 'cinematic': optional startup/workspace moments
 * - 'performance_saver': disables loops, parallax, and non-essential blurs
 */

export type MotionProfile =
  | 'off'
  | 'minimal'
  | 'balanced'
  | 'expressive'
  | 'cinematic'
  | 'performance_saver';

export interface MotionConfig {
  profile: MotionProfile;
  durationInstant: number;    // 0-80ms
  durationFast: number;       // 100-160ms
  durationStandard: number;   // 160-240ms
  durationEmphasis: number;   // 240-360ms
  durationCinematic: number;  // 360-650ms
  durationStagger: number;    // 20-45ms
  easingStandard: string;
  easingDecelerate: string;
  easingAccelerate: string;
  easingSpring: string;
  enableAmbientLoops: boolean;
  enableParallax: boolean;
  enableParticles: boolean;
}

export const MOTION_PROFILES: Record<MotionProfile, MotionConfig> = {
  off: {
    profile: 'off',
    durationInstant: 0,
    durationFast: 0,
    durationStandard: 0,
    durationEmphasis: 0,
    durationCinematic: 0,
    durationStagger: 0,
    easingStandard: 'linear',
    easingDecelerate: 'linear',
    easingAccelerate: 'linear',
    easingSpring: 'linear',
    enableAmbientLoops: false,
    enableParallax: false,
    enableParticles: false,
  },
  minimal: {
    profile: 'minimal',
    durationInstant: 40,
    durationFast: 80,
    durationStandard: 120,
    durationEmphasis: 160,
    durationCinematic: 200,
    durationStagger: 15,
    easingStandard: 'cubic-bezier(0.2, 0, 0, 1)',
    easingDecelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    easingAccelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    easingSpring: 'cubic-bezier(0.2, 0, 0, 1)',
    enableAmbientLoops: false,
    enableParallax: false,
    enableParticles: false,
  },
  balanced: {
    profile: 'balanced',
    durationInstant: 60,
    durationFast: 140,
    durationStandard: 200,
    durationEmphasis: 280,
    durationCinematic: 450,
    durationStagger: 30,
    easingStandard: 'cubic-bezier(0.2, 0, 0, 1)',
    easingDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    easingAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
    easingSpring: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
    enableAmbientLoops: true,
    enableParallax: false,
    enableParticles: true,
  },
  expressive: {
    profile: 'expressive',
    durationInstant: 80,
    durationFast: 160,
    durationStandard: 240,
    durationEmphasis: 340,
    durationCinematic: 550,
    durationStagger: 40,
    easingStandard: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easingDecelerate: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
    easingAccelerate: 'cubic-bezier(0.4, 0, 0.9, 0.2)',
    easingSpring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    enableAmbientLoops: true,
    enableParallax: true,
    enableParticles: true,
  },
  cinematic: {
    profile: 'cinematic',
    durationInstant: 80,
    durationFast: 180,
    durationStandard: 280,
    durationEmphasis: 420,
    durationCinematic: 650,
    durationStagger: 45,
    easingStandard: 'cubic-bezier(0.19, 1, 0.22, 1)',
    easingDecelerate: 'cubic-bezier(0.05, 0.9, 0.1, 1)',
    easingAccelerate: 'cubic-bezier(0.35, 0, 0.85, 0.2)',
    easingSpring: 'cubic-bezier(0.25, 1.4, 0.5, 1)',
    enableAmbientLoops: true,
    enableParallax: true,
    enableParticles: true,
  },
  performance_saver: {
    profile: 'performance_saver',
    durationInstant: 0,
    durationFast: 70,
    durationStandard: 100,
    durationEmphasis: 140,
    durationCinematic: 180,
    durationStagger: 0,
    easingStandard: 'ease-out',
    easingDecelerate: 'ease-out',
    easingAccelerate: 'ease-in',
    easingSpring: 'ease-out',
    enableAmbientLoops: false,
    enableParallax: false,
    enableParticles: false,
  },
};

/**
 * Returns the active motion configuration, automatically respecting prefers-reduced-motion.
 */
export function getMotionConfig(
  profile: MotionProfile = 'balanced',
  prefersReducedMotion = false
): MotionConfig {
  if (prefersReducedMotion) {
    return MOTION_PROFILES.off;
  }
  return MOTION_PROFILES[profile] || MOTION_PROFILES.balanced;
}

/**
 * Applies motion attributes and variables to the document root element.
 */
export function applyMotionToDocument(config: MotionConfig): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-motion-profile', config.profile);
  root.style.setProperty('--motion-instant', `${config.durationInstant}ms`);
  root.style.setProperty('--motion-fast', `${config.durationFast}ms`);
  root.style.setProperty('--motion-standard', `${config.durationStandard}ms`);
  root.style.setProperty('--motion-emphasis', `${config.durationEmphasis}ms`);
  root.style.setProperty('--motion-cinematic', `${config.durationCinematic}ms`);
  root.style.setProperty('--motion-easing-standard', config.easingStandard);
  root.style.setProperty('--motion-easing-spring', config.easingSpring);
}
