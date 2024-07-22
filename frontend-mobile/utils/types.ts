import { PrintQuality } from "./enums";

export interface IPrintOptions {
  numberOfCopies: number;
  toLandScape: boolean;
  pages?: string;
  quality: keyof typeof PrintQuality;
}
