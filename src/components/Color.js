export const whiteColor = 'rgba(255, 255, 255, 0.85)';
export const darkColor = 'rgba(0, 0, 0, 0.87)';
export const disabledColor = 'rgba(255, 255, 255, 0.3)';

const defaultHover = 'rgba(255, 255, 255, 0.08)';
export const primaryColor = 'rgb(144,202,249)';
export const primaryHover = 'rgba(144, 202, 249, 0.08)';
export const secondaryColor = 'rgba(244, 143, 177, 0.5)';
export const secondaryHover = 'rgba(244, 143, 177, 0.08)';

export const whiteBackground = 'rgb(255, 255, 255)';
export const darkBackground = 'rgba(0, 0, 0, 0.87)';
export const disabledBackground = 'rgba(255, 255, 255, 0.12)';

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
    },
    primaryColorStyle: {
        color: `${primaryColor}`,
    },
    secondaryColorStyle: {
        color: `${secondaryColor}`,
    },
    disabledStyle: {
        color: `${disabledColor}`,
    }
};