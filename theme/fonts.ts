export const fontFamilies = {
  poppins: "Poppins-Regular",
  poppinsMedium: "Poppins-Medium",
  poppinsSemiBold: "Poppins-SemiBold",
  poppinsBold: "Poppins-Bold",
} as const;

export const fontAssets = {
  [fontFamilies.poppins]: require("../assets/fonts/Poppins-Regular.ttf"),
  [fontFamilies.poppinsMedium]: require("../assets/fonts/Poppins-Medium.ttf"),
  [fontFamilies.poppinsSemiBold]: require("../assets/fonts/Poppins-SemiBold.ttf"),
  [fontFamilies.poppinsBold]: require("../assets/fonts/Poppins-Bold.ttf"),
} as const;
