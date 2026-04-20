# JobFaster Design System & Theme

This document outlines the core visual identity and frontend styling patterns for the JobFaster project.

## 🎨 Color Palette

### 1. Brand Colors (Primary)
Used for main actions, buttons, and brand-level highlights.
- **Primary Orange**: `#f17e27` (Main action buttons, primary icons)
- **Primary Hover**: `#e16d16` (Button hover states)
- **Primary Light**: `#feb053` (Secondary highlights, folder icons)
- **Primary Tint**: `#fff7ed` (Selected backgrounds, light hover areas)

### 2. Neutral Palette
Used for backgrounds, borders, and text hierarchy.
- **Background Main**: `#f3f5f7` (Page-level background)
- **Background Sidebar**: `#f8f8f8` / `white`
- **Text Primary**: `text-slate-900` (#0f172a)
- **Text Secondary**: `text-slate-500` / `text-slate-600`
- **Text Placeholder**: `text-slate-400`
- **Border Default**: `#e2e8f0` (border-slate-200) / `border-gray-100`

### 3. Functional Colors
- **Success**: `#22c55e` (Green-500)
- **Error**: `#ef4444` (Red-500)
- **Info/Blue**: `#3b82f6` (Used sparingly for non-brand specific actions)

## 🔠 Typography
The project uses several modern high-quality fonts via Google Fonts:
- **Heading**: `IBM Plex Sans` (Main title font, used via `font-IBM`)
- **Body**: `Inter` or `Satoshi` (Modern, clean sans-serif)
- **Interface**: `Roboto` (Fallback for interface elements)

## 📐 Spacing & Layout
- **Containers**: Max-width usually set to `max-w-6xl` or `max-w-4xl`.
- **Spacing**: Follows the 4px Tailwind grid. Common values: `p-10`, `px-15`, `mt-25`.
- **Rounding**: 
  - Large containers: `rounded-3xl`
  - Standard cards/modals: `rounded-2xl`
  - Pills/Buttons: `rounded-full`

## ✨ Visual Effects
- **Shadows**:
  - Soft: `shadow-sm`
  - Medium/Interactive: `shadow-lg`
  - Brand Shadow: `shadow-orange-100` (Used with orange buttons)
- **Glassmorphism**: 
  - `backdrop-blur-sm` with `bg-white/70` or `bg-[#e0e4e582]`
- **Interactions**:
  - Scale down on click: `active:scale-95` or `active:scale-[0.98]`
  - Smooth transitions: `transition-all duration-300`

## 🛠 Component Patterns
- **Buttons**: Pill-shaped or rounded-2xl, usually featuring `#f17e27` with white text.
- **Inputs**: Transparent or white background, defined border, focus states use the brand color.
- **Modals**: Glassmorphism overlays and center-aligned content cards.
