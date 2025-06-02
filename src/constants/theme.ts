export const COLORS = {
    primary: '#128C7E', // WhatsApp green
    secondary: '#25D366', // WhatsApp light green
    background: '#FFFFFF',
    backgroundDark: '#111B21',
    text: '#111B21',
    textDark: '#E9EDEF',
    gray: '#667781',
    lightGray: '#E9EDEF',
    darkGray: '#202C33',
    white: '#FFFFFF',
    black: '#000000',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FFCC00',
};

export const FONTS = {
    regular: 'System',
    medium: 'System',
    bold: 'System',
};

export const SIZES = {
    // Global sizes
    base: 8,
    small: 12,
    font: 14,
    medium: 16,
    large: 18,
    extraLarge: 24,

    // Font sizes
    h1: 30,
    h2: 24,
    h3: 20,
    h4: 18,
    h5: 16,
    h6: 14,

    // App dimensions
    width: '100%',
    height: '100%',
};

export const SHADOWS = {
    light: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    medium: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
}; 