/**
 * Process-Local Cold-Boot & Launch-Session Detection Hook
 * Compliant with Master Specification Section 2 (Cold Start Only Directive)
 * and New-Updates.md Section 5 (Launch-Session vs Refresh Architecture)
 * 
 * Guarantees:
 * 1. A new launcher-created session displays the startup animation.
 * 2. A normal browser refresh (F5 / reload) does NOT replay the startup animation.
 * 3. React rerenders and HMR do NOT replay the startup animation.
 * 4. Navigation between Login and Registration does NOT replay startup.
 * 5. Logout returns to Login without replaying startup.
 */

import { useState, useEffect } from 'react';

// Module-level in-memory flag: per-renderer process lifetime (resets on F5)
let clientConsumedSignal = false;

export function useColdBoot() {
  const [state, setState] = useState<'checking' | 'cold' | 'warm'>('checking');

  useEffect(() => {
    let cancelled = false;

    // 1. In-memory guard: if already consumed in this React runtime, it's warm
    if (clientConsumedSignal) {
      setState('warm');
      return;
    }

    clientConsumedSignal = true;

    // 2. Resolve active launch session
    const resolveLaunchSession = async () => {
      try {
        // A. Check for explicit launchSession query parameter in URL (e.g. ?launchSession=...)
        const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
        let launchId = urlParams?.get('launchSession');

        // B. Electron contextBridge support
        if (!launchId && typeof window !== 'undefined' && (window as any).boot?.consumeColdSignal) {
          const res = await (window as any).boot.consumeColdSignal();
          if (!cancelled) setState(res?.isColdBoot ? 'cold' : 'warm');
          return;
        }

        // C. If no URL param, query development server launch-session endpoint
        if (!launchId) {
          try {
            const res = await fetch('/api/v1/boot/launch-session');
            if (res.ok) {
              const json = await res.json();
              launchId = json?.data?.launchSessionId;
            }
          } catch (_e) {
            // Server offline or standalone
          }
        }

        // D. If a launch session ID was established:
        if (launchId) {
          const storageKey = `myos_boot_completed_${launchId}`;
          const alreadyCompleted = localStorage.getItem(storageKey);

          if (alreadyCompleted === 'true') {
            // REFRESH of existing launcher session: Skip boot animation!
            if (!cancelled) setState('warm');
            return;
          }

          // First run of this fresh launcher session: Play boot animation!
          localStorage.setItem(storageKey, 'true');
          if (!cancelled) setState('cold');
          return;
        }

        // E. Fallback when opened directly in browser without launcher session:
        // Use sessionStorage: plays once per browser tab, skips on refresh
        const sessionConsumed = sessionStorage.getItem('myos_tab_boot_consumed');
        if (sessionConsumed === 'true') {
          if (!cancelled) setState('warm');
          return;
        }

        sessionStorage.setItem('myos_tab_boot_consumed', 'true');
        if (!cancelled) setState('cold');
      } catch (_e) {
        if (!cancelled) setState('warm');
      }
    };

    resolveLaunchSession();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
