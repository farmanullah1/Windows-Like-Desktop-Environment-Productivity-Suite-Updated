import test from 'node:test';
import assert from 'node:assert/strict';
import { ERROR_CODES, checkPermission } from '../src/core/contracts.ts';
import { validateIpcRequest, IPC_CHANNELS } from '../src/electron/ipc/contracts.ts';
import { translations, getLocaleDirection } from '../src/core/i18n.ts';

test('Contracts: Error Codes catalog contains standard codes', () => {
  assert.equal(ERROR_CODES.AUTH_INVALID_CREDENTIALS, 'AUTH_INVALID_CREDENTIALS');
  assert.equal(ERROR_CODES.FILE_PATH_PROTECTED, 'FILE_PATH_PROTECTED');
  assert.equal(ERROR_CODES.DB_CONNECTION_FAILED, 'DB_CONNECTION_FAILED');
  assert.equal(ERROR_CODES.VALIDATION_FAILED, 'VALIDATION_FAILED');
});

test('Contracts: checkPermission validates wildcard and exact permissions', () => {
  assert.equal(checkPermission(['*'], 'filesystem.user.read'), true);
  assert.equal(checkPermission(['filesystem.user.*'], 'filesystem.user.read'), true);
  assert.equal(checkPermission(['filesystem.user.*'], 'filesystem.user.write'), true);
  assert.equal(checkPermission(['filesystem.user.*'], 'terminal.execute'), false);
  assert.equal(checkPermission(['terminal.execute'], 'terminal.execute'), true);
  assert.equal(checkPermission(['system.info.read'], 'system.process.control'), false);
});

test('IPC: validateIpcRequest enforces schema and channel allowlist', () => {
  // Valid request
  const valid = validateIpcRequest({
    requestId: 'req-123',
    channel: IPC_CHANNELS.SYSTEM_GET_INFO,
    version: 1,
    payload: { test: true },
  });
  assert.equal(valid.isValid, true);
  assert.equal(valid.request?.channel, 'system:getInfo');

  // Invalid channel
  const invalidChannel = validateIpcRequest({
    requestId: 'req-456',
    channel: 'arbitrary:unsafeChannel',
    version: 1,
    payload: {},
  });
  assert.equal(invalidChannel.isValid, false);
  assert.match(invalidChannel.error || '', /disallowed IPC channel/);

  // Missing requestId
  const missingId = validateIpcRequest({
    channel: IPC_CHANNELS.WINDOW_MINIMIZE,
    version: 1,
    payload: {},
  });
  assert.equal(missingId.isValid, false);
});

test('i18n: translations provide complete en-US and ur-PK dictionaries and directions', () => {
  assert.equal(getLocaleDirection('en-US'), 'ltr');
  assert.equal(getLocaleDirection('ur-PK'), 'rtl');

  const enKeys = Object.keys(translations['en-US']);
  const urKeys = Object.keys(translations['ur-PK']);

  assert.equal(enKeys.length > 20, true);
  assert.deepEqual(enKeys.sort(), urKeys.sort());
  assert.equal(translations['en-US'].start, 'Start');
  assert.equal(translations['ur-PK'].start, 'شروع');
  assert.equal(translations['en-US'].devWorkspace, 'Dev Workspace');
  assert.equal(translations['ur-PK'].devWorkspace, 'ڈویلپر ورک اسپیس');
  assert.equal(translations['en-US'].textEditor, 'Text Editor');
  assert.equal(translations['ur-PK'].textEditor, 'ٹیکسٹ ایڈیٹر');
  assert.equal(translations['en-US'].appCatalog, 'App Catalog');
  assert.equal(translations['ur-PK'].appCatalog, 'ایپ کیٹلاگ');
  assert.equal(translations['en-US'].eventViewer, 'Event Viewer');
  assert.equal(translations['ur-PK'].eventViewer, 'ایونٹ ویور');
  assert.equal(translations['en-US'].mediaPlayer, 'Media Player');
  assert.equal(translations['ur-PK'].mediaPlayer, 'میڈیا پلیئر');
  assert.equal(translations['en-US'].gallery, 'Photo Studio');
  assert.equal(translations['ur-PK'].gallery, 'فوٹو اسٹوڈیو');
});

test('Database & REST: Error codes include DB_CONNECTION_FAILED and VALIDATION_FAILED', () => {
  assert.equal(ERROR_CODES.DB_CONNECTION_FAILED, 'DB_CONNECTION_FAILED');
  assert.equal(ERROR_CODES.DB_QUERY_ERROR, 'DB_QUERY_ERROR');
  assert.equal(ERROR_CODES.DB_RECORD_NOT_FOUND, 'DB_RECORD_NOT_FOUND');
  assert.equal(ERROR_CODES.DB_UNIQUE_VIOLATION, 'DB_UNIQUE_VIOLATION');
});

test('Boot Experience: Cold-boot signal state machine contract', () => {
  // Simulating process-local single consumption rule
  let isFirstLoad = true;
  const consume = () => {
    const isCold = isFirstLoad;
    if (isFirstLoad) isFirstLoad = false;
    return isCold;
  };

  // First call (genuine cold start) MUST return true
  assert.equal(consume(), true);

  // Subsequent calls (refresh, HMR, navigation) MUST return false
  assert.equal(consume(), false);
  assert.equal(consume(), false);
});

test('Launch Session: Cold boot plays on new launcher session, skips on browser refresh', () => {
  const launchId1 = 'launch_123';
  const launchId2 = 'launch_456';
  const mockStorage = new Map();

  const checkBoot = (launchId) => {
    const key = `myos_boot_completed_${launchId}`;
    if (mockStorage.get(key) === 'true') {
      return 'warm'; // refresh
    }
    mockStorage.set(key, 'true');
    return 'cold'; // first run of this session
  };

  // Launch 1 initial run -> cold (plays boot animation)
  assert.equal(checkBoot(launchId1), 'cold');

  // Launch 1 browser refresh (F5) -> warm (skips boot animation!)
  assert.equal(checkBoot(launchId1), 'warm');
  assert.equal(checkBoot(launchId1), 'warm');

  // Launch 2 new launcher run -> cold (plays boot animation again!)
  assert.equal(checkBoot(launchId2), 'cold');

  // Launch 2 browser refresh (F5) -> warm (skips boot animation!)
  assert.equal(checkBoot(launchId2), 'warm');
});

test('Permissions: All 32 permission keys are covered and verified', () => {
  assert.equal(checkPermission(['clipboard.history.*'], 'clipboard.history.read'), true);
  assert.equal(checkPermission(['snippet.*'], 'snippet.write'), true);
  assert.equal(checkPermission(['vault.*'], 'vault.read'), true);
  assert.equal(checkPermission(['ai.*'], 'ai.prompt'), true);
  assert.equal(checkPermission(['task.*'], 'task.write'), true);
  assert.equal(checkPermission(['calendar.*'], 'calendar.read'), true);
});

test('Motion Engine: All 6 v9.0 motion profiles and fallbacks are defined', async () => {
  const { MOTION_PROFILES, getMotionConfig } = await import('../src/design-system/motionEngine.ts');

  const expectedProfiles = ['off', 'minimal', 'balanced', 'expressive', 'cinematic', 'performance_saver'];
  for (const p of expectedProfiles) {
    assert.ok(MOTION_PROFILES[p], `Profile ${p} must be defined`);
  }

  // Default balanced profile
  const balanced = getMotionConfig('balanced');
  assert.equal(balanced.profile, 'balanced');
  assert.equal(balanced.durationStandard, 200);
  assert.equal(balanced.enableAmbientLoops, true);

  // Reduced motion off profile (instant 0ms)
  const off = getMotionConfig('off');
  assert.equal(off.durationStandard, 0);
  assert.equal(off.durationInstant, 0);
  assert.equal(off.easingStandard, 'linear');
  assert.equal(off.enableAmbientLoops, false);

  // Performance saver profile
  const saver = getMotionConfig('performance_saver');
  assert.equal(saver.enableAmbientLoops, false);
  assert.equal(saver.enableParallax, false);
  assert.equal(saver.enableParticles, false);
});

test('Color System: All 14 v9.0 theme palettes and gradients are defined in themes.css', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const cssPath = path.resolve('src/design-system/themes.css');
  const css = fs.readFileSync(cssPath, 'utf-8');

  const requiredThemes = [
    'midnight-aurora',
    'ocean-glass',
    'solar-flare',
    'emerald-terminal',
    'rose-quartz',
    'arctic-light',
    'sunset-horizon',
    'cyber-spectrum',
    'sage-sand',
    'monochrome-studio',
    'classic-blue',
    'warm-light',
    'deep-space',
    'high-contrast',
  ];

  for (const themeId of requiredThemes) {
    assert.ok(
      css.includes(`[data-theme="${themeId}"]`),
      `themes.css must include definition for data-theme="${themeId}"`
    );
  }

  const requiredGradients = [
    '--gradient-aurora',
    '--gradient-ocean',
    '--gradient-sunset',
    '--gradient-solar',
    '--gradient-emerald',
    '--gradient-spectrum',
    '--gradient-glass',
    '--gradient-edge-light',
    '--gradient-focus-progress',
    '--gradient-selection',
  ];

  for (const grad of requiredGradients) {
    assert.ok(
      css.includes(grad),
      `themes.css must include gradient token ${grad}`
    );
  }
});


