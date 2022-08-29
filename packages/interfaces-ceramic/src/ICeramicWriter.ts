import type { CeramicDataType } from "./data-types";
import type { CeramicSchemas } from "./Schemas";

export interface ICeramicWriter {
  updateData: (schema: CeramicSchemas, data: CeramicDataType) => void;
}
