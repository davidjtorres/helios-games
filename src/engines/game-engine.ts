import { GameEvent, GameEventNameEnum } from './../events/game/GameEvent';
import EventDispatcher from "../managers/event-dispatcher";



class GameEngine {
	constructor(private eventDispatcher: EventDispatcher) {
		this.eventDispatcher = eventDispatcher;
	}

	playerLevelUp(playerId: string, level: number) {
		const event = new GameEvent(GameEventNameEnum.PlayerLevelUp, `Player ${playerId} has leveled up to ${level}`);
		this.eventDispatcher.dispatchEvent(event);
	}
	playerAcquireItem(playerId: string, itemId: string) {}
	playerCompleteQuest(playerId: string, questId: string) {}
	playerCompleteAchievement(playerId: string, achievementId: string) {}
}

export default GameEngine;
