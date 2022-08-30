import type { CeramicDataType } from "src/types";

export interface ICeramicReader {
  /**
   * Read data from the Ceramic Network
   */
  getData: () => Promise<CeramicDataType | null>;
}
