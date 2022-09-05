export * from './StatefulEndpoint';
import type { ICeramicWriter } from '@circlesland/ceramic'
import { CeramicClient } from '@circlesland/ceramic';

const client = new CeramicClient();