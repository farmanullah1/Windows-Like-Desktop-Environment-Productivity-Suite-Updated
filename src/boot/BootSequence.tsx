import React, { useState, useEffect } from 'react';
import { useColdBoot } from './useColdBoot';
import { StageVoid } from './stages/StageVoid';
import { StageLogo } from './stages/StageLogo';
import { StageLoader } from './stages/StageLoader';
import { StageHandoff } from './stages/StageHandoff';
import { useTheme } from '../design-system/ThemeProvider';

import { setDocumentTitle } from '../lib/documentTitle';

export type BootStage = 'CHECKING' | 'VOID' | 'LOGO' | 'LOADER' | 'HANDOFF' | 'COMPLETE';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const coldState = useColdBoot();
  const { reducedMotion } = useTheme();
  const [currentStage, setCurrentStage] = useState<BootStage>('CHECKING');

  useEffect(() => {
    if (coldState === 'warm') {
      // Warm boot (F5 refresh, HMR, navigation): skip entire animation instantly!
      onComplete();
    } else if (coldState === 'cold') {
      // Cold boot: initiate deterministic state machine
      setDocumentTitle('Starting…');
      setCurrentStage('VOID');
    }
  }, [coldState, onComplete]);

  if (currentStage === 'CHECKING' || coldState === 'warm') {
    return null;
  }

  switch (currentStage) {
    case 'VOID':
      return (
        <StageVoid
          onComplete={() => setCurrentStage('LOGO')}
          reducedMotion={reducedMotion}
        />
      );

    case 'LOGO':
      return (
        <StageLogo
          onComplete={() => setCurrentStage('LOADER')}
          reducedMotion={reducedMotion}
        />
      );

    case 'LOADER':
      return (
        <StageLoader
          onComplete={() => setCurrentStage('HANDOFF')}
          reducedMotion={reducedMotion}
        />
      );

    case 'HANDOFF':
      return (
        <StageHandoff
          onComplete={() => {
            setCurrentStage('COMPLETE');
            onComplete();
          }}
          reducedMotion={reducedMotion}
        />
      );

    case 'COMPLETE':
    default:
      return null;
  }
};
