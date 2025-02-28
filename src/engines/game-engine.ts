import EventDispatcher from "../event-dispatcher/event-dispatcher";
import { PlayerAcquireItemEvent } from "../events/game/player-acquire-item-event";
import { PlayerLevelUpEvent } from "../events/game/player-level-up-event";

class GameEngine {
	constructor(private eventDispatcher: EventDispatcher) {
		this.eventDispatcher = eventDispatcher;
	}

	playerLevelUp(playerId: string, level: number) {
		const event = new PlayerLevelUpEvent(playerId, 2);
		this.eventDispatcher.dispatchEvent(
			PlayerLevelUpEvent.EVENT_TYPE,
			event.toJSON()
		);
	}
	playerAcquireItem(playerId: string, itemId: string) {
		const event = new PlayerAcquireItemEvent(playerId, itemId);
		this.eventDispatcher.dispatchEvent(
			PlayerAcquireItemEvent.EVENT_TYPE,
			event.toJSON()
		);
	}
}

export default GameEngine;
