import {IUniqueEvent} from "interfaces/channels/src/IUniqueEvent";

export interface IRequest {
  timeout: Date;
  request: IUniqueEvent;
  response: (response: IUniqueEvent) => void;
  error: (error: Error) => void;
}