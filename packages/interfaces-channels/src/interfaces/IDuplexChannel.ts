import {IEndpoint} from "./IEndpoint";

export interface IDuplexChannel {
  left: IEndpoint;
  right: IEndpoint;
}