import type { CeramicDataType } from "./data-types";

export interface ICeramicReader {
  getData: () => Promise<CeramicDataType | null>;
}
