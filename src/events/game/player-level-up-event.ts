import { GameEvent } from "./base/game-event";
import { GameEventNameEnum } from "../../common/enums";

export class PlayerLevelUpEvent extends GameEvent {
	readonly eventName = GameEventNameEnum.PlayerLevelUp;

	constructor(
		private readonly playerId: string,
		private readonly levelReached: number
	) {
		super(GameEventNameEnum.PlayerLevelUp);
	}

	public getPlayerId(): string {
		return this.playerId;
	}

	public getLevelReached(): number {
		return this.levelReached;
	}
}
