# Integrated Login Experience & Authentication UX

**Product:** Windows-Like Desktop Environment & Productivity Suite  
**Subsystem:** Integrated Login Screen & Corner Account Creation Flow  
**Version:** 1.0  
**Classification:** `REAL` (Authentication, Local Profile, Signup) / `WINDOWS-INTEGRATED` (Windows Hello simulation/hooks)

---

## 1. Overview & Vision

The Login Experience bridges the startup sequence into the desktop workspace. Designed with Windows 11 acrylic aesthetics and fluid motion, it provides:
- A centered, high-elevation acrylic authentication card
- Direct support for cloud and local workstation profiles
- A permanently visible, accessible **"Create account"** entry point in the top-right corner
- Complete keyboard accessibility, CapsLock detection, and zero layout-shift error handling

---

## 2. Layout & Visual Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                                                  [Create     │
│                                                   account] → │
│                                                              │
│                    ┌────────────────────┐                    │
│                    │     [Avatar]       │                    │
│                    │   Welcome back     │                    │
│                    │  Sign in to Antigrav│                   │
│                    │                    │                    │
│                    │   [Email field]    │                    │
│                    │   [Password field] │                    │
│                    │   [☐ Remember me]  │                    │
│                    │                    │                    │
│                    │   [   Sign in   ]  │                    │
│                    │                    │                    │
│                    │   ─── or ───       │                    │
│                    │                    │                    │
│                    │  [Local Profile]   │                    │
│                    │  [Windows Hello]   │                    │
│                    └────────────────────┘                    │
│                                                              │
│  v8.0.0 Enterprise                       Privacy • Terms     │
└──────────────────────────────────────────────────────────────┘
```

### 2.1 Acrylic Surface Specifications
- **Card Container:** Max-width 420 px, centered vertically and horizontally.
- **Surface Material:** Frosted acrylic glass with backdrop blur (24 px), subtle inner 1px border highlight (`rgba(255,255,255,0.12)`), and elevation drop shadow (`0 20px 40px -15px rgba(0,0,0,0.5)`).
- **Backdrop:** Active desktop wallpaper darkened with an intentional scrim layer to guarantee WCAG AA contrast for text elements.

---

## 3. Top-Right Corner Account Creation Entry (§8.6)

As specified in the core UX requirements:
- **Placement:** Fixed at the top-right corner (`top: 1.5rem; right: 2rem;`), high z-index overlay.
- **Visual Design:** Subtle acrylic pill container featuring a user-plus icon, responsive hover glow, and accent text ("Create account").
- **Touch & Accessibility Target:** Enforces a minimum bounding touch target of ≥ 44×44 px.
- **Focus Order:** Tab-accessible at the top of the document hierarchy.
- **Seamless Transition:** Activates the in-place `SignupScreen` without reloading the application window, unmounting the renderer, or triggering the cold-boot animation.

---

## 4. Input Fields & Form Interaction

### 4.1 Email Field
- `type="email"`, `autoComplete="username"`, `id="login-email"`.
- Associated semantic `<label>` and real-time validation indicator.
- Reserved error space to eliminate layout shifting when validation messages appear.

### 4.2 Password Field
- `type="password"`, `autoComplete="current-password"`, `id="login-password"`.
- **Show/Hide Toggle:** Accessible icon button with `aria-pressed` state and descriptive tooltip.
- **CapsLock Detection:** Monitored dynamically using `KeyboardEvent.getModifierState('CapsLock')`. Displays an ambient amber warning tag when CapsLock is engaged.

### 4.3 Remember Me & Privacy
- Accessible checkbox explaining that session tokens are stored securely in local app storage. Default state is unchecked (privacy-first).

### 4.4 Local Profile & Alternative Sign-In
- **Continue with Local Profile:** Bypasses external authentication for offline local workstation sessions, marked with "Your data stays on this device".
- **Windows Hello Sign-In:** Direct entry for biometrics/PIN authentication.

---

## 5. Account Registration Screen (`SignupScreen.tsx`)

The registration view provides:
- Full Name, Work Email, and Password creation fields.
- Password strength indicator (length ≥ 8, symbols, numbers).
- Terms and Privacy checkbox with semantic validation.
- Direct REST API integration with `POST /api/v1/auth/register` and automatic sign-in upon successful account provisioning.
- Dedicated "Already have an account? Sign in" back-link.

---

## 6. Keyboard & Screen Reader Accessibility (§12)

- **Form Submission:** Pressing <kbd>Enter</kbd> from any input field submits the form.
- **Escape Key:** Pressing <kbd>Esc</kbd> clears transient error cards.
- **Tab Cycle:** Follows logical document hierarchy: `[Create Account Corner Link]` -> `[Email Input]` -> `[Password Input]` -> `[Show/Hide Toggle]` -> `[Remember Me]` -> `[Sign In Button]` -> `[Local Profile Button]`.
- **Screen Reader Support:** Form containers use semantic `<form>`, inputs use explicit `<label>` connections, and live errors use `role="alert"` and `aria-live="assertive"`.
