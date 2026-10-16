# Internationalization Architecture (i18n)

**Product:** Windows-Like Desktop Environment & Productivity Suite  
**Specification Version:** 6.0  
**Standard:** Multi-Language & RTL Architectural Standard (Section 47, Section 121)

---

## 1. Core Principles & Initial Locales

Internationalization is designed directly into the desktop suite architecture:

| Locale Code | Language Name | Directionality | Support Tier | Primary Fonts |
| :--- | :--- | :--- | :--- | :--- |
| **`en-US`** | English (United States) | LTR (Left-to-Right) | Default Baseline | Inter, Segoe UI, system-ui |
| **`ur-PK`** | Urdu (Pakistan) | RTL (Right-to-Left) | Full Native Support | Jameel Noori Nastaleeq, Noto Nastaliq Urdu, Segoe UI |

---

## 2. Architectural Design

1. **Tokenized Translation Keys:** User-facing strings are decoupled from JSX templates into structured catalog objects.
2. **Dynamic Bi-Directional Layouts (RTL/LTR):**
   - The root document element dynamically toggles `dir="ltr"` or `dir="rtl"`.
   - CSS layout uses modern logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`) instead of hardcoded `left`/`right`.
3. **Locale-Aware Formatting:**
   - Dates and times use standard `Intl.DateTimeFormat(locale, options)`.
   - Numbers and metrics use `Intl.NumberFormat(locale)`.
4. **Pluralization & Substitution:**
   - Parameterized translation helper `t(key, params)` supports dynamic variable interpolation without string concatenation vulnerabilities.

---

## 3. Extensibility Roadmap

The i18n dictionary structure is decoupled to seamlessly support future locales without refactoring core components:
- Arabic (`ar-SA`)
- Spanish (`es-ES`)
- French (`fr-FR`)
- German (`de-DE`)
- Chinese (`zh-CN`)
