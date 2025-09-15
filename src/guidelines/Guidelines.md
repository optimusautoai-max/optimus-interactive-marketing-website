# Optimus Auto AI Development Guidelines

## General Development Rules

* Only use absolute positioning when necessary. Opt for responsive and well-structured layouts using flexbox and grid by default
* Refactor code as you go to keep code clean and maintainable
* Keep file sizes small and put helper functions and components in their own files
* Always use the established brand colors and design system tokens
* Maintain Apple-style premium aesthetic with glass morphism effects
* Ensure mobile-first responsive design for all components

## Brand System Guidelines

### Colors (Must Use Exact Values)
* **Primary Orange**: `--optimus-orange: #FF6B35` - Main brand color for CTAs and highlights
* **Primary Blue**: `--optimus-blue: #4A90E2` - Secondary brand color for accents
* **Dark Blue**: `--optimus-dark-blue: #2C3E50` - For headers and text
* **Light Blue**: `--optimus-light-blue: #87CEEB` - For subtle backgrounds
* **Copper**: `--optimus-copper: #B87333` - For premium elements
* **Gold**: `--optimus-gold: #FFD700` - For exclusive/beta features

### Typography
* **Base font-size**: 14px (never override unless specifically requested)
* **Font family**: Apple system fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
* **Font weights**: Use `--font-weight-medium: 500` and `--font-weight-normal: 400`
* **Line height**: 1.5 for all text elements
* **Never add Tailwind text size, weight, or line-height classes** unless explicitly requested

### Spacing & Layout
* Use 8px grid system for consistent spacing
* Border radius: `--radius: 0.625rem` (10px) for cards and buttons
* Use glass morphism effects: `.glass` and `.glass-dark` classes
* Maintain premium Apple-style aesthetics

## Figma Import Guidelines

### Component Organization Structure
```
📁 Page Sections
  ├── 🎯 hero-section (Hero/Landing)
  ├── 🎯 features-section (Product Features)
  ├── 🎯 pricing-section (5-tier pricing)
  ├── 🎯 testimonials-section (Social proof)
  ├── 🎯 faq-section (FAQ accordion)
  ├── 🎯 app-showcase-section (42+ apps display)
  └── 🎯 footer-section (Enhanced footer)

📁 Interactive Components
  ├── 🔘 cta-button-primary (Orange CTAs)
  ├── 🔘 cta-button-secondary (Blue accents)
  ├── 📝 brand-assessment-form (Lead capture)
  ├── 🎨 pricing-card-[tier] (5 pricing tiers)
  ├── ⏰ urgency-timer (48-hour countdown)
  └── 🎥 demo-video-player (Interactive demos)

📁 Navigation Elements
  ├── 🧭 main-navigation (Desktop nav)
  ├── 🧭 mobile-navigation (Mobile hamburger)
  ├── 🔗 quick-actions-sidebar (Floating actions)
  └── 🔗 footer-links (Footer navigation)
```

### Layer Naming Convention
**Use this exact format:**
```
✅ Correct Examples:
- "hero-headline-main"
- "cta-button-start-assessment"
- "pricing-card-business-empire"
- "testimonial-avatar-robert-parks"
- "app-showcase-grid-item-1"
- "urgency-timer-countdown"

❌ Avoid Generic Names:
- "Rectangle 147"
- "Group 23"
- "Button"
- "Text"
```

### Design System Compliance
* **Always use brand colors** from CSS variables (never hardcode hex values)
* **Maintain 14px base font** (respect existing typography system)
* **Use consistent spacing** (8px, 16px, 24px, 32px, 48px, 64px)
* **Apply glass morphism** where appropriate using existing CSS classes
* **Ensure mobile responsiveness** (mobile-first approach)

### Asset Preparation
* **Export images** as WebP for photos, PNG for screenshots
* **Use SVG** for all icons and simple illustrations
* **Optimize image sizes**: Max 1200px width for hero images, 600px for feature images
* **Name assets descriptively**: `hero-background-gradient.webp`, `pricing-icon-starter.svg`

## Component Integration Rules

### Existing Components to Respect
When importing Figma designs, ensure compatibility with:
- `MainContent.tsx` - Main layout container
- `HeroSection.tsx` - Current hero implementation
- `AppCreatorShowcase.tsx` - 42+ apps display
- `EnhancedTestimonials.tsx` - Social proof system
- `TeamShowcase.tsx` - Robert Parks & Lynn Markel profiles
- `UrgencyTimer.tsx` - 48-hour countdown system

### New Component Guidelines
* Place new components in `/components/` directory
* Import using: `import { ComponentName } from "./components/component-name.tsx"`
* Use ShadCN components where possible: `import { Button } from "./components/ui/button"`
* Follow existing state management patterns from `App.tsx`

### Performance Requirements
* Use lazy loading for heavy components
* Implement proper error boundaries
* Optimize animations for 60fps performance
* Use Suspense for code splitting

## Conversion Optimization Rules

### Required Elements (Alex Mehr Style)
* **FAQ Section**: Include schema markup for SEO
* **Social Proof**: Testimonials with photos and results
* **Urgency Elements**: 30 beta slots remaining, 48-hour timer
* **Interactive Demo**: Video presentations and live demos
* **5-Tier Pricing**: Clear value proposition hierarchy
* **Lead Capture**: Brand assessment questionnaire

### Call-to-Action Guidelines
* **Primary CTA**: Always orange (`--optimus-orange`) for main actions
* **Secondary CTA**: Blue (`--optimus-blue`) for supporting actions
* **CTA Copy**: Action-oriented, benefit-focused language
* **Placement**: Above fold, after value props, in pricing section

### Mobile-First Responsive Design
* Design for 320px minimum width first
* Use flexible layouts that adapt to larger screens
* Ensure touch targets are minimum 44px
* Test on iOS Safari and Chrome Android
* Optimize for thumb navigation patterns

## AI-Specific Instructions

### When Importing Figma Designs:
1. **Preserve exact visual fidelity** from Figma import
2. **Use provided brand colors** from CSS variables
3. **Maintain responsive behavior** for all screen sizes
4. **Integrate with existing state management** in App.tsx
5. **Follow established component patterns** from existing codebase

### Integration Priority:
1. Visual accuracy to Figma design
2. Brand system compliance  
3. Performance optimization
4. Accessibility standards
5. SEO optimization

## Button Components

### Primary Button
* **Purpose**: Main actions (Start Assessment, Get Started, Upgrade Now)
* **Visual Style**: Solid fill with `--optimus-orange` background
* **Usage**: One primary button per section maximum
* **States**: Hover (darker orange), Active, Disabled

### Secondary Button  
* **Purpose**: Supporting actions (Learn More, Watch Demo, View Features)
* **Visual Style**: Outlined with `--optimus-blue` border, transparent background
* **Usage**: Can appear alongside primary buttons
* **States**: Hover (blue background), Active, Disabled

### Tertiary Button
* **Purpose**: Least important actions (Back, Cancel, Secondary navigation)
* **Visual Style**: Text-only with `--optimus-blue` color, no border
* **Usage**: For subtle actions that shouldn't compete with primary CTAs
* **States**: Hover (underline), Active, Disabled