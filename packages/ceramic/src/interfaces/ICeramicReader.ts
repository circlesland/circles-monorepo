import type { CeramicDataType } from "src/types";

export interface ICeramicReader {
  getData: () => Promise<CeramicDataType | null>;
}
