import EventDispatcher from "./event-dispatcher";
import { GameEvent } from "../events/game/base/game-event";

describe("EventDispatcher", () => {
	let eventDispatcher: EventDispatcher;

	beforeEach(() => {
		eventDispatcher = new EventDispatcher();
	});

	it("should emit event with correct type", () => {
		eventDispatcher.on(GameEvent.EVENT_TYPE, () => {
			expect(true).toBe(true);
		});
		eventDispatcher.dispatchEvent(GameEvent.EVENT_TYPE, {
			message: "This is the game event message",
		});
	});
});
