export const formatCount = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e12
        ? (Math.abs(Number(labelValue)) / 1.0e12).toFixed(1) + "T"
        : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e9
            ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(1) + "B"
            : // Six Zeroes for Millions
            Math.abs(Number(labelValue)) >= 1.0e6
                ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(1) + "M"
                : // Three Zeroes for Thousands
                Math.abs(Number(labelValue)) >= 1.0e3
                    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(1) + "K"
                    : Math.abs(Number(labelValue));
};