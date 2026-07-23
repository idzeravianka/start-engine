export const FULL_AVAILABLE_HEIGHT = {
    height: 'calc(100% - 48px)',
}

export const VERTICAL_CENTERING = {
    ...FULL_AVAILABLE_HEIGHT,
    pb: 0,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
};

export const POINT_CUTTING = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}

export const SPIN_ANIMATION = {
    animation: 'spin 1.5s linear infinite',
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
};