# Animation Constants

This directory contains centralized animation settings for the Groovo Music Player app.

## Usage

### Import the constants

```typescript
import { ANIMATIONS, ANIMATION_VARIANTS } from "./constants/animations";
```

### Using ANIMATIONS object

```typescript
// Button hover scale
whileHover={{ scale: ANIMATIONS.BUTTON.HOVER_SCALE }}

// Sidebar initial position
initial={{ x: ANIMATIONS.SIDEBAR.INITIAL_X }}

// Modal overlay opacity
initial={{ opacity: ANIMATIONS.MODAL.OVERLAY.INITIAL_OPACITY }}

// Transition duration
transition={{ duration: ANIMATIONS.DURATION.NORMAL }}

// Glow effect
boxShadow: ANIMATIONS.GLOW.PURPLE
```

### Using ANIMATION_VARIANTS

```typescript
// Pre-defined button variants
<motion.button variants={ANIMATION_VARIANTS.button}>
  Click me
</motion.button>

// Modal variants
<motion.div variants={ANIMATION_VARIANTS.modal}>
  Modal content
</motion.div>
```

### Helper Functions

```typescript
import { createHoverAnimation, createTapAnimation, createGlowEffect } from './constants/animations';

// Create custom hover animation
whileHover={createHoverAnimation(1.1)}

// Create custom tap animation
whileTap={createTapAnimation(0.9)}

// Create glow effect
whileHover={createGlowEffect('purple')}
```

## Available Constants

### Button Animations

- `HOVER_SCALE`: 1.05
- `TAP_SCALE`: 0.95
- `HOVER_X`: 5
- `GLOW.SHADOW`: Purple glow effect

### Sidebar Animations

- `INITIAL_X`: -300
- `ANIMATE_X`: 0
- `HOVER_X`: 5

### Modal Animations

- `OVERLAY.INITIAL_OPACITY`: 0
- `CONTENT.INITIAL_SCALE`: 0.8
- `CONTENT.ANIMATE_SCALE`: 1

### Duration Values

- `FAST`: 0.15s
- `NORMAL`: 0.2s
- `SLOW`: 0.3s
- `VERY_SLOW`: 0.5s

### Easing Functions

- `SMOOTH`: "ease"
- `BOUNCE`: "ease-out"
- `ELASTIC`: "ease-in-out"
- `LINEAR`: "linear"

### Glow Effects

- `PURPLE`: Purple glow
- `PINK`: Pink glow
- `WHITE`: White glow
- `STRONG_PURPLE`: Strong purple glow
- `STRONG_PINK`: Strong pink glow

## Benefits

1. **Consistency**: All animations use the same values across the app
2. **Maintainability**: Change animation values in one place
3. **Type Safety**: TypeScript support for all animation properties
4. **Reusability**: Pre-defined variants for common animations
5. **Performance**: Optimized animation values for smooth performance

## Customization

To modify animation values, simply update the constants in `animations.ts`. All components using these constants will automatically use the new values.
