import { GameEvent } from "./base/game-event";
import { GameEventNameEnum } from "../../common/enums";

export class PlayerCompleteAchievementEvent extends GameEvent {
    constructor(private readonly playerId: string, private readonly achievementId: string) {
        super(GameEventNameEnum.PlayerCompleteAchievement);
    }

    public getPlayerId(): string {
        return this.playerId;
    }

    public getAchievementId(): string {
        return this.achievementId;
    }
} 