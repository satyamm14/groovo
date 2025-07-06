// Animation Constants for Groovo Music Player
// This file centralizes all animation settings for consistent feel across the app

export const ANIMATIONS = {
  // Button hover animations
  BUTTON: {
    HOVER_SCALE: 1.05,
    TAP_SCALE: 0.98,
    HOVER_X: 5,
    HOVER_Y: -2,
    BOUNCE: {
      SCALE: 1.02,
      TAP_SCALE: 0.98,
    },
    GLOW: {
      SHADOW: "0 0 20px rgba(168, 85, 247, 0.5)",
      INTENSITY: 0.6,
    },
  },

  // Card animations
  CARD: {
    HOVER_SCALE: 1.02,
    HOVER_Y: -5,
    GLOW: {
      SHADOW: "0 10px 25px rgba(0, 0, 0, 0.3)",
      PURPLE: "0 0 30px rgba(168, 85, 247, 0.3)",
    },
  },

  // Sidebar animations
  SIDEBAR: {
    INITIAL_X: -300,
    ANIMATE_X: 0,
    HOVER_X: 5,
    STAGGER_DELAY: 0.1,
  },

  // Modal animations
  MODAL: {
    OVERLAY: {
      INITIAL_OPACITY: 0,
      ANIMATE_OPACITY: 1,
      EXIT_OPACITY: 0,
    },
    CONTENT: {
      INITIAL_SCALE: 0.8,
      INITIAL_OPACITY: 0,
      ANIMATE_SCALE: 1,
      ANIMATE_OPACITY: 1,
      EXIT_SCALE: 0.8,
      EXIT_OPACITY: 0,
    },
  },

  // TitleBar animations
  TITLEBAR: {
    INITIAL_Y: -50,
    ANIMATE_Y: 0,
    BUTTON_HOVER_SCALE: 1.1,
    BUTTON_TAP_SCALE: 0.9,
  },

  // Player controls animations
  PLAYER: {
    INITIAL_Y: 100,
    ANIMATE_Y: 0,
    BUTTON_HOVER_SCALE: 1.1,
    BUTTON_TAP_SCALE: 0.9,
    PROGRESS_ANIMATION_DURATION: 0.5,
  },

  // List item animations
  LIST_ITEM: {
    HOVER_X: 5,
    HOVER_BG: "rgba(255, 255, 255, 0.05)",
    STAGGER_DELAY: 0.05,
  },

  // Equalizer animations
  EQUALIZER: {
    SLIDER_HOVER_SCALE: 1.05,
    PRESET_HOVER_SCALE: 1.02,
    FREQUENCY_BARS: {
      MIN_HEIGHT: 0.1,
      MAX_HEIGHT: 1,
      ANIMATION_DURATION: 0.3,
    },
  },

  // Page transitions
  PAGE: {
    INITIAL_OPACITY: 0,
    INITIAL_Y: 20,
    ANIMATE_OPACITY: 1,
    ANIMATE_Y: 0,
    EXIT_OPACITY: 0,
    EXIT_Y: -20,
  },

  // Loading animations
  LOADING: {
    SPIN_DURATION: 1,
    PULSE_DURATION: 2,
    FADE_DURATION: 0.5,
  },

  // Floating animations
  FLOAT: {
    DURATION: 3,
    EASE: "ease-in-out",
    Y_DISTANCE: 10,
  },

  // Glow effects
  GLOW: {
    PURPLE: "0 0 20px rgba(168, 85, 247, 0.5)",
    PINK: "0 0 20px rgba(236, 72, 153, 0.5)",
    WHITE: "0 0 20px rgba(255, 255, 255, 0.3)",
    STRONG_PURPLE: "0 0 30px rgba(168, 85, 247, 0.8)",
    STRONG_PINK: "0 0 30px rgba(236, 72, 153, 0.8)",
  },

  // Transition durations
  DURATION: {
    FAST: 0.15,
    NORMAL: 0.2,
    SLOW: 0.3,
    VERY_SLOW: 0.5,
    EXTRA_SLOW: 1,
  },

  // Easing functions
  EASE: {
    SMOOTH: "easeInOut",
    BOUNCE: "easeOut",
    ELASTIC: "easeInOut",
    LINEAR: "linear",
  },

  // Stagger delays for list animations
  STAGGER: {
    FAST: 0.05,
    NORMAL: 0.1,
    SLOW: 0.15,
  },

  // Hover states
  HOVER: {
    BRIGHTNESS: 1.1,
    SATURATION: 1.1,
    CONTRAST: 1.05,
  },

  // Focus states
  FOCUS: {
    RING_WIDTH: 2,
    RING_OFFSET: 2,
    RING_COLOR: "#a855f7",
  },

  // Scale values
  SCALE: {
    TINY: 0.95,
    SMALL: 0.98,
    NORMAL: 1.05,
    LARGE: 1.1,
    XLARGE: 1.2,
  },

  // Opacity values
  OPACITY: {
    TRANSPARENT: 0,
    VERY_LOW: 0.1,
    LOW: 0.3,
    MEDIUM: 0.5,
    HIGH: 0.8,
    FULL: 1,
  },

  // Transform values
  TRANSFORM: {
    ROTATE_SMALL: 5,
    ROTATE_MEDIUM: 15,
    ROTATE_LARGE: 45,
    SKEW_SMALL: 2,
    SKEW_MEDIUM: 5,
  },

  // Shadow values
  SHADOW: {
    SMALL: "0 2px 4px rgba(0, 0, 0, 0.1)",
    MEDIUM: "0 4px 8px rgba(0, 0, 0, 0.15)",
    LARGE: "0 8px 16px rgba(0, 0, 0, 0.2)",
    XLARGE: "0 16px 32px rgba(0, 0, 0, 0.25)",
    GLOW_PURPLE: "0 0 20px rgba(168, 85, 247, 0.4)",
    GLOW_PINK: "0 0 20px rgba(236, 72, 153, 0.4)",
  },

  // Border radius values
  BORDER_RADIUS: {
    SMALL: 4,
    MEDIUM: 8,
    LARGE: 12,
    XLARGE: 16,
    FULL: 9999,
  },

  // Z-index values
  Z_INDEX: {
    BASE: 0,
    DROPDOWN: 10,
    STICKY: 20,
    FIXED: 30,
    MODAL: 40,
    POPOVER: 50,
    TOOLTIP: 60,
    TOAST: 70,
  },
} as const;

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  // Button variants
  button: {
    hover: {
      scale: ANIMATIONS.BUTTON.HOVER_SCALE,
      x: ANIMATIONS.BUTTON.HOVER_X,
      transition: {
        duration: ANIMATIONS.DURATION.NORMAL,
        ease: ANIMATIONS.EASE.SMOOTH,
      },
    },
    tap: {
      scale: ANIMATIONS.BUTTON.TAP_SCALE,
      transition: {
        duration: ANIMATIONS.DURATION.FAST,
        ease: ANIMATIONS.EASE.BOUNCE,
      },
    },
  },

  // Card variants
  card: {
    hover: {
      scale: ANIMATIONS.CARD.HOVER_SCALE,
      y: ANIMATIONS.CARD.HOVER_Y,
      boxShadow: ANIMATIONS.CARD.GLOW.SHADOW,
      transition: {
        duration: ANIMATIONS.DURATION.NORMAL,
        ease: ANIMATIONS.EASE.SMOOTH,
      },
    },
  },

  // List item variants
  listItem: {
    hover: {
      x: ANIMATIONS.LIST_ITEM.HOVER_X,
      backgroundColor: ANIMATIONS.LIST_ITEM.HOVER_BG,
      transition: {
        duration: ANIMATIONS.DURATION.NORMAL,
        ease: ANIMATIONS.EASE.SMOOTH,
      },
    },
  },

  // Modal variants
  modal: {
    hidden: {
      opacity: ANIMATIONS.MODAL.OVERLAY.INITIAL_OPACITY,
    },
    visible: {
      opacity: ANIMATIONS.MODAL.OVERLAY.ANIMATE_OPACITY,
      transition: {
        duration: ANIMATIONS.DURATION.NORMAL,
        ease: ANIMATIONS.EASE.SMOOTH,
      },
    },
  },

  modalContent: {
    hidden: {
      scale: ANIMATIONS.MODAL.CONTENT.INITIAL_SCALE,
      opacity: ANIMATIONS.MODAL.CONTENT.INITIAL_OPACITY,
    },
    visible: {
      scale: ANIMATIONS.MODAL.CONTENT.ANIMATE_SCALE,
      opacity: ANIMATIONS.MODAL.CONTENT.ANIMATE_OPACITY,
      transition: {
        duration: ANIMATIONS.DURATION.SLOW,
        ease: ANIMATIONS.EASE.ELASTIC,
      },
    },
  },

  // Page variants
  page: {
    hidden: {
      opacity: ANIMATIONS.PAGE.INITIAL_OPACITY,
      y: ANIMATIONS.PAGE.INITIAL_Y,
    },
    visible: {
      opacity: ANIMATIONS.PAGE.ANIMATE_OPACITY,
      y: ANIMATIONS.PAGE.ANIMATE_Y,
      transition: {
        duration: ANIMATIONS.DURATION.NORMAL,
        ease: ANIMATIONS.EASE.SMOOTH,
      },
    },
    exit: {
      opacity: ANIMATIONS.PAGE.EXIT_OPACITY,
      y: ANIMATIONS.PAGE.EXIT_Y,
      transition: {
        duration: ANIMATIONS.DURATION.FAST,
        ease: ANIMATIONS.EASE.SMOOTH,
      },
    },
  },

  // Stagger container variants
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATIONS.STAGGER.NORMAL,
        delayChildren: 0.1,
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATIONS.DURATION.NORMAL,
        ease: ANIMATIONS.EASE.SMOOTH,
      },
    },
  },
} as const;

// Helper functions for common animations
export const createHoverAnimation = (
  scale: number = ANIMATIONS.BUTTON.HOVER_SCALE
) => ({
  scale,
  transition: {
    duration: ANIMATIONS.DURATION.NORMAL,
    ease: ANIMATIONS.EASE.SMOOTH,
  },
});

export const createTapAnimation = (
  scale: number = ANIMATIONS.BUTTON.TAP_SCALE
) => ({
  scale,
  transition: {
    duration: ANIMATIONS.DURATION.FAST,
    ease: ANIMATIONS.EASE.BOUNCE,
  },
});

export const createGlowEffect = (
  color: "purple" | "pink" | "white" = "purple"
) => ({
  boxShadow:
    ANIMATIONS.GLOW[color.toUpperCase() as keyof typeof ANIMATIONS.GLOW],
  transition: {
    duration: ANIMATIONS.DURATION.NORMAL,
    ease: ANIMATIONS.EASE.SMOOTH,
  },
});

// Export types for better TypeScript support
export type AnimationConfig = typeof ANIMATIONS;
export type AnimationVariants = typeof ANIMATION_VARIANTS;
