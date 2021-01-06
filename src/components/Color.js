export const whiteColor = 'rgba(255, 255, 255, 0.6)';
export const darkColor = 'rgba(0, 0, 0, 0.87)';

const primaryColor = 'rgba(0, 82, 246, 0.6)';
const secondaryColor = 'rgba(244, 143, 177, 0.5)';

export const whiteBackground = 'rgb(255, 255, 255)';
export const darkBackground = 'rgba(0, 0, 0, 0.87)';

export const isDarkMode = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};
export const isWhiteMode = () => {
    return !isDarkMode();
}

const getDefaultColor = () => {
    if (isDarkMode()) return whiteColor;
    if (isWhiteMode()) return darkColor;

    return darkColor;
}

const getDefaultBackground = () => {
    if (isDarkMode()) return darkBackground;
    if (isWhiteMode()) return whiteBackground;

    return whiteColor;
}

export const DEFAULT = {
    color: getDefaultColor(),
    background: getDefaultBackground(),

    primaryColor: primaryColor,
    secondaryColor: secondaryColor,

    colorStyle: {
        color: `${getDefaultColor()}`,
        'border-color': `${getDefaultColor()}`
    },
    primaryColorStyle: {
        color: `${primaryColor}`,
        'border-color': `${primaryColor}`
    }
};