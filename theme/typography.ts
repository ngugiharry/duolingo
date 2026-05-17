import { fontFamilies } from "./fonts";

export const typography = {
  h1: {
    fontFamily: fontFamilies.poppinsBold,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700" as const,
  },
  h2: {
    fontFamily: fontFamilies.poppinsSemiBold,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "600" as const,
  },
  h3: {
    fontFamily: fontFamilies.poppinsSemiBold,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "600" as const,
  },
  h4: {
    fontFamily: fontFamilies.poppinsMedium,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500" as const,
  },
  bodyLarge: {
    fontFamily: fontFamilies.poppins,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "400" as const,
  },
  bodyMedium: {
    fontFamily: fontFamilies.poppins,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400" as const,
  },
  bodySmall: {
    fontFamily: fontFamilies.poppins,
    fontSize: 13,
    lineHeight: 21,
    fontWeight: "400" as const,
  },
  caption: {
    fontFamily: fontFamilies.poppins,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "400" as const,
  },
} as const;
