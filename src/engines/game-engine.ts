import { GameEventNameEnum } from "../common/enums";
import EventDispatcher from "../event-dispatcher/event-dispatcher";
import { GameEvent } from "../events/game/base/game-event";

class GameEngine {
	constructor(private eventDispatcher: EventDispatcher) {
		this.eventDispatcher = eventDispatcher;
	}

	playerLevelUp(playerId: string, level: number) {
		const event = new GameEvent(GameEventNameEnum.PlayerLevelUp, {
			playerId,
			level,
		});
		this.eventDispatcher.dispatchEvent(GameEvent.EVENT_TYPE, event);
	}
	playerAcquireItem(playerId: string, itemId: string) {
		const event = new GameEvent(GameEventNameEnum.PlayerAcquireItem, {
			playerId,
			itemId,
		});
		this.eventDispatcher.dispatchEvent(
			GameEvent.EVENT_TYPE,
			event
		);
	}
	playerCompleteQuest(playerId: string, questId: string) {
		const event = new GameEvent(GameEventNameEnum.PlayerCompleteQuest, {
			playerId,
			questId,
		});
		this.eventDispatcher.dispatchEvent(GameEvent.EVENT_TYPE, event);
	}
	playerCompleteAchievement(playerId: string, achievementId: string) {
		const event = new GameEvent(GameEventNameEnum.PlayerCompleteAchievement, {
			playerId,
			achievementId,
		});
		this.eventDispatcher.dispatchEvent(GameEvent.EVENT_TYPE, event);
	}
}

export default GameEngine;
