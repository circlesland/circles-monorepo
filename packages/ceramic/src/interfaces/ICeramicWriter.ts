import type { CeramicDataType } from "src/types";

export interface ICeramicWriter {
  updateData: (data: CeramicDataType) => void;
}
