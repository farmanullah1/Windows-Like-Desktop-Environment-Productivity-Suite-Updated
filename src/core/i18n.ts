/**
 * Internationalization (i18n) Engine (Master Specification Section 47)
 * Implements English (en-US) and Urdu (ur-PK) with dynamic RTL/LTR support.
 */

export type LocaleCode = 'en-US' | 'ur-PK';

export interface TranslationDictionary {
  appName: string;
  start: string;
  search: string;
  searchPlaceholder: string;
  workspaces: string;
  workspaceGeneral: string;
  workspaceDev: string;
  workspaceComm: string;
  workspaceResearch: string;
  quickSettings: string;
  notifications: string;
  noNotifications: string;
  battery: string;
  volume: string;
  wifi: string;
  theme: string;
  performanceTier: string;
  soundMuted: string;
  soundUnmuted: string;
  power: string;
  restart: string;
  shutdown: string;
  sleep: string;
  commandPalette: string;
  fileExplorer: string;
  settings: string;
  notes: string;
  terminal: string;
  taskManager: string;
  systemInfo: string;
  calculator: string;
  clock: string;
  apiTester: string;
  jsonFormatter: string;
  devWorkspace: string;
  textEditor: string;
  appCatalog: string;
  eventViewer: string;
  mediaPlayer: string;
  gallery: string;
}

export const translations: Record<LocaleCode, TranslationDictionary> = {
  'en-US': {
    appName: 'MyOS Desktop Workspace',
    start: 'Start',
    search: 'Search',
    searchPlaceholder: 'Search apps, files, commands (Ctrl+Space)...',
    workspaces: 'Workspaces',
    workspaceGeneral: 'General',
    workspaceDev: 'Development',
    workspaceComm: 'Communication',
    workspaceResearch: 'Research',
    quickSettings: 'Quick Settings',
    notifications: 'Notifications',
    noNotifications: 'No new notifications',
    battery: 'Battery',
    volume: 'Volume',
    wifi: 'Wi-Fi',
    theme: 'Theme',
    performanceTier: 'Performance Tier',
    soundMuted: 'Muted',
    soundUnmuted: 'Sound Enabled',
    power: 'Power',
    restart: 'Restart',
    shutdown: 'Shut Down',
    sleep: 'Sleep',
    commandPalette: 'Command Palette',
    fileExplorer: 'File Explorer',
    settings: 'Settings',
    notes: 'Notes',
    terminal: 'Terminal',
    taskManager: 'Task Manager',
    systemInfo: 'System Information',
    calculator: 'Calculator',
    clock: 'Clock & Timer',
    apiTester: 'API Tester',
    jsonFormatter: 'JSON Formatter',
    devWorkspace: 'Dev Workspace',
    textEditor: 'Text Editor',
    appCatalog: 'App Catalog',
    eventViewer: 'Event Viewer',
    mediaPlayer: 'Media Player',
    gallery: 'Photo Studio',
  },
  'ur-PK': {
    appName: 'مائی او ایس ڈیسک ٹاپ ورک اسپیس',
    start: 'شروع',
    search: 'تلاش کریں',
    searchPlaceholder: 'ایپس، فائلیں، کمانڈز تلاش کریں (Ctrl+Space)...',
    workspaces: 'ورک اسپیسز',
    workspaceGeneral: 'عمومی',
    workspaceDev: 'ڈویلپمنٹ',
    workspaceComm: 'رابطہ',
    workspaceResearch: 'تحقیق',
    quickSettings: 'فوری ترتیبات',
    notifications: 'اطلاعات',
    noNotifications: 'کوئی نئی اطلاع نہیں ہے',
    battery: 'بیٹری',
    volume: 'آواز',
    wifi: 'وائی فائی',
    theme: 'تھیم',
    performanceTier: 'کارکردگی کا درجہ',
    soundMuted: 'آواز بند ہے',
    soundUnmuted: 'آواز چالو ہے',
    power: 'پاور',
    restart: 'دوبارہ شروع کریں',
    shutdown: 'بند کریں',
    sleep: 'سلیپ موڈ',
    commandPalette: 'کمانڈ پیلیٹ',
    fileExplorer: 'فائل مینیجر',
    settings: 'ترتیبات',
    notes: 'نوٹس',
    terminal: 'ٹرمینل',
    taskManager: 'ٹاسک مینیجر',
    systemInfo: 'سسٹم کی معلومات',
    calculator: 'کیلکولیٹر',
    clock: 'گھڑی اور ٹائمر',
    apiTester: 'اے پی آئی ٹیسٹر',
    jsonFormatter: 'جے ایس او این فارمیٹر',
    devWorkspace: 'ڈویلپر ورک اسپیس',
    textEditor: 'ٹیکسٹ ایڈیٹر',
    appCatalog: 'ایپ کیٹلاگ',
    eventViewer: 'ایونٹ ویور',
    mediaPlayer: 'میڈیا پلیئر',
    gallery: 'فوٹو اسٹوڈیو',
  },
};

/**
 * Returns text direction for a given locale
 */
export function getLocaleDirection(locale: LocaleCode): 'ltr' | 'rtl' {
  return locale === 'ur-PK' ? 'rtl' : 'ltr';
}
