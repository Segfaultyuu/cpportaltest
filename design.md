# VT Markets — Design System Rules

> Derived from Figma design tokens (file: `si9AO68NyCLwbTXhkTd0WW`)  
> Stack: Vanilla HTML + CSS + JS · Font: Roboto (Google Fonts)  
> **Review this document before applying to any page.**

---

## 1. Colour Tokens

### 1.1 Brand — Primary

| Token | Light (default) | CSS variable suggestion |
|---|---|---|
| Dark Blue | `#031F45` | `--color-dark-blue` |
| Dark Blue 12% | `rgba(3,31,69,0.12)` | `--color-dark-blue-12` |
| Blue *(brand primary)* | `#0A36C7` | `--color-blue` |
| Blue 12% | `rgba(10,54,199,0.12)` | `--color-blue-12` |
| Cyan | `#00F0FF` | `--color-cyan` |
| Cyan 12% | `rgba(0,240,255,0.12)` | `--color-cyan-12` |

### 1.2 Brand — Secondary / Functional

| Token | Value | CSS variable suggestion |
|---|---|---|
| Green | `#00B565` | `--color-green` |
| Green 12% | `rgba(0,181,101,0.12)` | `--color-green-12` |
| Green 6% | `rgba(0,181,101,0.06)` | `--color-green-6` |
| Yellow | `#FAD000` | `--color-yellow` |
| Yellow 12% | `rgba(250,208,0,0.12)` | `--color-yellow-12` |
| YellowCoral | `#CFA500` | `--color-yellowcoral` |
| YellowCoral 12% | `rgba(207,165,0,0.12)` | `--color-yellowcoral-12` |
| Red | `#FF2C40` | `--color-red` |
| Red 12% | `rgba(255,44,64,0.12)` | `--color-red-12` |

### 1.3 Text / Icon

| Token | Light | Dark |
|---|---|---|
| Primary | `#282D34` | `#FFFFFF` |
| Secondary | `#7A8699` | `#C2C7D0` |
| Tertiary | `#C2C7D0` | `#7A8699` |
| Mid-Quaternary | `#D4D6DB` | `#515867` |
| Quaternary | `#E7E8EB` | `#272B34` |
| Text-reverse (on dark bg) | `#FFFFFF` | `#282D34` |
| Text-disable | `#DCDDE1` | `#323843` |
| Text-opacity button | `rgba(255,255,255,0.60)` | `rgba(255,255,255,0.12)` |

### 1.4 Background

| Token | Light | Dark |
|---|---|---|
| bg level 1 *(page base)* | `#FFFFFF` | `#121212` |
| bg level 2 *(subtle)* | `#F9F9F9` | `#1D1D21` |
| bg level 3 *(table header, input)* | `#F4F5F6` | `#26262B` |
| bg level 4 | `#E5E7EB` | `#2D2D33` |
| bg level 5 | `#D7D9DE` | `#34343B` |
| bg Blue *(secondary btn, info)* | `#E8F1FF` | `#031F45` |

### 1.5 Divider / Border

| Token | Light | Dark |
|---|---|---|
| Div line 1 — divider | `#F4F5F6` | `#1F2124` |
| Div line 2 — border | `#E8E9EA` | `#2D3033` |

---

## 2. Typography

Font family: **Roboto** (Google Fonts, preconnect required)  
All weights used: 400 Regular, 500 Medium, 600 SemiBold, 700 Bold

### 2.1 Scale

| Style name | Size | Line-height | Weight | Usage |
|---|---|---|---|---|
| Display Bold 64 | 64px | 72px | 700 | Hero headers |
| Display Bold 48 | 48px | 56px | 700 | Large display |
| Headline 1 Bold | 36px | 44px | 700 | Page-level headings |
| Headline 1 SemiBold | 36px | 44px | 600 | |
| Headline 2 Bold | 28px | 36px | 700 | Section headings, page titles |
| Headline 2 SemiBold | 28px | 36px | 600 | |
| Title 1 Bold | 24px | 32px | 700 | Card titles |
| Title 1 SemiBold | 24px | 32px | 600 | |
| Title 2 Bold | 20px | 28px | 700 | Sub-section titles |
| Title 2 SemiBold | 20px | 28px | 600 | |
| Title 3 Bold | 18px | 26px | 700 | Modal/drawer titles |
| Title 3 SemiBold | 18px | 26px | 600 | |
| Title 4 SemiBold | 16px | 24px | 600 | Labels, column headers |
| Body 1 Medium | 16px | 24px | 500 | Primary body text |
| Body 1 Regular | 16px | 24px | 400 | Body copy |
| Body 2 SemiBold | 14px | 22px | 600 | Table cells, highlights |
| Body 3 Medium | 14px | 22px | 500 | Secondary body text |
| Body 4 Regular | 14px | 22px | 400 | Secondary copy |
| Footnote Medium | 12px | 18px | 500 | Captions, labels |
| Footnote Regular | 12px | 18px | 400 | Helper text |
| Caption 1 Regular | 10px | 15px | 400 | Smallest labels |
| Caption 2 Medium | 10px | 15px | 500 | Smallest labels |

### 2.2 Rules

- **Page titles** → Headline 2 Bold, 28px / 36px
- **Card section labels** → Title 1 SemiBold, 24px / 32px
- **Table column headers** → Body 4 Regular, 14px, color: Text Secondary (`#7A8699`)
- **Table cell values** → Body 3 Medium, 14px, color: Text Primary (`#282D34`)
- **Status / tag text** → Body 4 Regular, 14px
- **Footnote / helper text** → Footnote Regular, 12px

---

## 3. Button System

Border radius: **8px** on all buttons  
Padding: **16px** horizontal  
Font family: Roboto on all buttons

### 3.1 Primary Button (Blue filled)

| State | Background | Text colour |
|---|---|---|
| Default | `#0A36C7` | `#FFFFFF` |
| Hover | `rgba(10,54,199,0.12)` | `#0A36C7` |
| Pressed | `#031F45` | `#FFFFFF` |
| Disabled | `#EEEEF0` | `#C2C7D0` |

### 3.2 Secondary Button (Blue ghost)

| State | Background | Text colour |
|---|---|---|
| Default | `#E8F1FF` | `#0A36C7` |
| Hover | `#B4CBF4` | `#FFFFFF` |
| Pressed | `#2F5AD2` | `#FFFFFF` |
| Disabled | `#EEEEF0` | `#DCDDE1` |

### 3.3 Primary-Gradient Button

- Background: `linear-gradient(-73.8deg, #0A36C7 3.78%, #1E68F6 105.28%, #4D8AFF 105.29%)`
- Text: `#FFFFFF`, SemiBold
- Use for: primary CTAs like **Deposit**

### 3.4 Button Sizes

| Size | Height | Font size | Font weight |
|---|---|---|---|
| Large | 48px | 16px | 700 Bold |
| Medium | 40px | 14px | 600 SemiBold |
| Small | 32px | 14px | 600 SemiBold |
| Mini | 28px | 12px | 500 Medium |
| Smallest | 24px | 12px | 500 Medium |

---

## 4. Status Tags

Used in tables (history, earn, transactions, deposits, withdrawals).

| Status | Text colour | Background | Style |
|---|---|---|---|
| Successful | `#00B565` | none | plain text |
| Processing / Pending | `#0A36C7` | none | plain text |
| Failed | `#FF2C40` | none | plain text |

- Font: Body 4 Regular, **14px**, `font-family: 'Roboto', sans-serif`
- Height: 20px · Padding: 0 8px · Border-radius: 2px
- **No background colour** — color-only, matching transaction history page convention

---

## 5. Dividers & Borders

| Usage | Value |
|---|---|
| Table row separator | `border-bottom: 0.5px solid rgba(30,30,30,0.08)` |
| Table header separator | `border-bottom: 0.5px solid rgba(30,30,30,0.15)` |
| Card border | `border: 1px solid #E8E9EA` |
| Section divider (horizontal line) | `background: #F4F5F6`, height 1px |

---

## 6. Spacing & Layout

| Token | Value |
|---|---|
| Sidebar width | 240px (collapsed: 64px) |
| Topbar height | 60px |
| Content padding | 40px 40px 60px |
| Max content width | 1440px |
| Card border-radius | 12px – 16px |
| Card padding | 24px – 40px |
| Card shadow | `0 4px 12px 0 rgba(168,195,206,0.20)` |
| Table row height | 52px – 60px |
| Table header height | 52px |

---

## 7. Component-Specific Rules

### Cards
- Background: bg level 1 (`#FFFFFF`)
- Border-radius: 16px (main balance card), 12px (asset/table cards), 10px (table wrap)
- Shadow: `0 4px 12px 0 rgba(168,195,206,0.20)`

### Tables
- Header background: bg level 3 (`#F4F5F6`)
- Header text: Body 4 Regular 14px, Text Secondary (`#7A8699`)
- Cell text: Body 3 Medium 14px, Text Primary (`#282D34`)
- Row hover: `#FAFBFC`
- Coin icon size: 20px, border-radius 50%

### Modals (Centered)
- Width: 480px · Border-radius: 16px · Padding: 28px 24px 24px
- Overlay: `rgba(0,0,0,0.45)`

### Drawers (Right-side)
- Width: 672px · Slides in from right · Overlay: `rgba(0,0,0,0.4)`

### Links / Action Text
- Color: `#0A36C7` (Blue)
- No underline
- Hover: `opacity: 0.75`

### Back Link
- Font: Body 4 Regular 14px, Text Secondary (`#7A8699`)
- Hover: Blue (`#0A36C7`)
- Icon: 16px chevron-left SVG

### Pagination
- Alignment: right-aligned (`justify-content: flex-end`)
- Active page: Bold, Text Primary
- Inactive pages: Text Tertiary (`#C2C7D0`)
- Arrow controls: Text Secondary (`#7A8699`)

### Eye Toggle (balance visibility)
- Icon: `images/Eye.png` / `images/Eye Hide.png`, 20×20px, opacity 0.6
- Hidden state: replaces value with `****`

---

## 8. Page Background

- Light mode: `linear-gradient(0deg, #FFFFFF 0%, #F0F6FF 100%)`
- This gradient is used consistently across all portal pages

---

## 9. What to Apply / Not Apply

| Rule | Apply to existing pages |
|---|---|
| Status tag style (14px, color-only, no bg) | ✅ All history/table pages |
| Button colours & states | ✅ All CTAs |
| Typography scale mapping | ✅ New pages; audit existing |
| Colour tokens as CSS variables | ✅ When refactoring `:root` |
| Table header bg (`#F4F5F6`) | ✅ All tables |
| Card border-radius & shadow | ✅ New cards |
| Right-side drawer width 672px | ✅ wallet.html |
| Page background gradient | ✅ All pages |
| Roboto font on all elements | ✅ Enforce on hash/code cells too |

---

*Generated from Figma nodes: 30:109, 30:110, 30:111, 30:16372, 30:8206 — file `si9AO68NyCLwbTXhkTd0WW`*
