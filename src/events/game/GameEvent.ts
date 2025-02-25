import { HeliosEvent } from "../base/HeliosEvent";

export class GameEvent extends HeliosEvent {
	constructor(eventName: string) {
		super(eventName);
	}
}
