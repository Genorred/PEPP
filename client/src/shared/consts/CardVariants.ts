const CardVariantsObj = {
  subSection: "border-primary bg-black",
  section: "border-secondary bg-white"
};
export type CardVariantsEnum = keyof typeof CardVariantsObj
export const CardVariants = (variant: CardVariantsEnum) => {
  return CardVariantsObj[variant] + "rounded-sm border-2";
};