import type { CeramicDataType } from '../types';

export interface ICeramicWriter {
  /**
   * Update data on the Ceramic Network
   * @param {CeramicDataType} data - The data that you want to change on Ceramic
   */
  updateData: (data: CeramicDataType) => void;
}
