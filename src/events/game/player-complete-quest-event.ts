import { GameEvent } from "./base/game-event";
import { GameEventNameEnum } from "../../common/enums";

export class PlayerCompleteQuestEvent extends GameEvent {
	constructor(
		private readonly playerId: string,
		private readonly questId: string
	) {
		super(GameEventNameEnum.PlayerCompleteQuest);
	}

	public getPlayerId(): string {
		return this.playerId;
	}

	public getQuestId(): string {
		return this.questId;
	}
}
