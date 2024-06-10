import { CSSProperties, ElementType, FC, ReactNode, useMemo } from "react";
import { useTheme } from "/context/ThemeContext";
import { Theme } from "/core/theme";
import useMediaQuery from "/hooks/useMediaQuery";

type TextVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "body3"
  | "body4"
  | "body5"
  | "body6"
  | "button"
  | "headerNav"
  | "card"
  | "productTitle";

type FontWeight = 300 | 400 | 500 | 600 | 700;

interface TextProps {
  variant?: TextVariants;
  className?: string;
  fontWeight?: FontWeight;
  multiline?: boolean;
  color?: string;
  html?: string;
  [otherProps: string]: unknown;
}

const variantMapping: Record<TextVariants, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "div",
  subtitle2: "div",
  body1: "div",
  body2: "div",
  body3: "div",
  body4: "div",
  body5: "div",
  body6: "div",
  button: "div",
  headerNav: "h4",
  card: "div",
  productTitle: "h5",
};

const getTextStyle = (
  variant: TextVariants,
  theme: Theme,
  fontWeight?: FontWeight,
  color?: string,
  isLg?: boolean,
  isMd?: boolean,
  isSm?: boolean
): CSSProperties => {
  const variantStyle = theme.typography[variant];
  const baseStyle: CSSProperties = {
    fontFamily: theme.typography.fontFamily,
    fontSize: variantStyle.fontSize,
    fontWeight: fontWeight || variantStyle.fontWeight,
    lineHeight: variantStyle.lineHeight,
    color: color || variantStyle.color,
  };

  if (variantStyle.lg && isLg) {
    baseStyle.fontSize = variantStyle.lg.fontSize || baseStyle.fontSize;
    baseStyle.lineHeight = variantStyle.lg.lineHeight || baseStyle.lineHeight;
  }

  if (variantStyle.md && isMd) {
    baseStyle.fontSize = variantStyle.md.fontSize || baseStyle.fontSize;
    baseStyle.lineHeight = variantStyle.md.lineHeight || baseStyle.lineHeight;
  }

  if (variantStyle.sm && isSm) {
    baseStyle.fontSize = variantStyle.sm.fontSize || baseStyle.fontSize;
    baseStyle.lineHeight = variantStyle.sm.lineHeight || baseStyle.lineHeight;
  }

  return baseStyle;
};

const convertNewLinesToBr = (text: string) => {
  return text.replace(/\r\n/g, "<br/>");
};

const Text: FC<TextProps> = ({
  children,
  variant = "h5",
  className,
  fontWeight,
  multiline,
  color,
  html,
  ...otherProps
}) => {
  const theme = useTheme();
  const isLg = useMediaQuery("(max-width: 1280px)");
  const isMd = useMediaQuery("(max-width: 991px)");
  const isSm = useMediaQuery("(max-width: 640px)");

  const textStyle: CSSProperties = useMemo(
    () => getTextStyle(variant, theme, fontWeight, color, isLg, isMd, isSm),
    [variant, theme, fontWeight, color, isLg, isMd, isSm]
  );

  const Component = variantMapping[variant] as ElementType;

  return (
    <Component className={className} style={textStyle} {...otherProps}>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: convertNewLinesToBr(html) }} />
      ) : (
        <>{children as ReactNode}</>
      )}
    </Component>
  );
};

export default Text;
