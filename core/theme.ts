export interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Palette {
  primary: {
    main: string;
    dark: string;
  };
  text: {
    black: string;
    white: string;
    grey: string;
    brown: string;
  };
  background: {
    paper: string;
    default: string;
  };
}

export interface TypographyVariant {
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  color?: string;
  lg?: Partial<TypographyVariant>;
  md?: Partial<TypographyVariant>;
  sm?: Partial<TypographyVariant>;
}

export interface Typography {
  fontFamily: string;
  h1: TypographyVariant;
  h2: TypographyVariant;
  h3: TypographyVariant;
  h4: TypographyVariant;
  h5: TypographyVariant;
  h6: TypographyVariant;
  subtitle1: TypographyVariant;
  subtitle2: TypographyVariant;
  body1: TypographyVariant;
  body2: TypographyVariant;
  body3: TypographyVariant;
  body4: TypographyVariant;
  body5: TypographyVariant;
  body6: TypographyVariant;
  button: TypographyVariant;
  headerNav: TypographyVariant;
  card: TypographyVariant;
  productTitle: TypographyVariant;
}

export interface Theme {
  breakpoints: Breakpoints;
  palette: Palette;
  typography: Typography;
}

export const theme: Theme = {
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 991,
    lg: 1280,
    xl: 1921,
  },
  palette: {
    primary: {
      main: "#000000",
      dark: '#6E8061'
    },
    text: {
      black: '#1B1B1B',
      white: '#FFF',
      grey: "#F6F6F6",
      brown: "#472115"
    },
    background: {
      paper: '#B43131',
      default: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: "64px",
      fontWeight: 700,
      lineHeight: "64px",
      lg: {
        fontSize: "48px",
        lineHeight: "48px",
      },
      md: {
        fontSize: "32px",
        lineHeight: "32px",
      },
      sm: {
        fontSize: "24px",
        lineHeight: "130%",
      },
    },
    h2: {
      fontSize: "48px",
      fontWeight: 700,
      lineHeight: "130%",
      color: '#472115',
      lg: {
        fontSize: "32px",
        lineHeight: "32px",
      },
      sm: {
        fontSize: "20px",
        lineHeight: "160%",
      },
    },
    h3: {
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: "32px",
      lg: {
        fontSize: "28px",
        lineHeight: "28px",
      },
      md: {
        fontSize: "24px",
        lineHeight: "24px",
      },
      sm: {
        fontSize: "16px",
        lineHeight: "160%",
      },
    },
    h4: {
      fontSize: "24px",
      fontWeight: 400,
      lineHeight: "130%",
      md: {
        fontSize: "20px",
      },
      sm: {
        fontSize: "18px",
      },
    },
    h5: {
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: "130%",
      md: {
        fontSize: "16px",
      },
      sm: {
        fontSize: "12px",
      },
    },
    h6: {
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: "32px",
      lg: {
        fontSize: "28px",
        lineHeight: "28px",
      },
      md: {
        fontSize: "24px",
        lineHeight: "24px",
      },
      sm: {
        fontSize: "14px",
        lineHeight: "160%",
      },
    },
    subtitle1: {
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '130%',
      md: {
        fontSize: "16px",
      },
      sm: {
        fontSize: "14px",
      },
    },
    subtitle2: {
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: "130%",
      md: {
        fontSize: "16px",
      },
      sm: {
        fontSize: "14px",
      },
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "130%",
      sm: {
        fontSize: "14px",
      },
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "130%",
      sm: {
        fontSize: "12px",
      },
    },
    body3: {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "130%",
      md: {
        fontSize: "16px",
      },
      sm: {
        fontSize: "10px",
      },
    },
    body4: {
      fontSize: "24px",
      fontWeight: 400,
      lineHeight: "130%",
      md: {
        fontSize: "16px",
      },
      sm: {
        fontSize: "14px",
      },
    },
    body5: {
      fontSize: "22px",
      fontWeight: 500,
      lineHeight: "100%",
      md: {
        fontSize: "18px",
      },
      sm: {
        fontSize: "14px",
      },
    },
    body6: {
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: "130%",
      md: {
        fontSize: "16px",
      },
      sm: {
        fontSize: "12px",
      },
    },
    button: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "130%",
    },
    headerNav: {
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: "130%",
    },
    card: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "130%",
      sm: {
        fontSize: "12px",
      },
    },
    productTitle: {
      fontSize: "40px",
      fontWeight: 500,
      lineHeight: "130%",
      md: {
        fontSize: "28px",
      },
      sm: {
        fontSize: "20px",
      },
    },
  }
};
