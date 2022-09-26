import type { PromptEventPayload, InteractionType } from "../types";

export interface IInteractionEvent {
    interactionType: InteractionType,
    payload?: PromptEventPayload | any;
}