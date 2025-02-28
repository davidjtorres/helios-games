import EventDispatcher from "../../event-dispatcher/event-dispatcher";
import SocialEvent from "./base/social-event";

export class FriendRequest extends SocialEvent {
    static readonly eventName: string = "friend.request";
    readonly eventName: string = FriendRequest.eventName;

    constructor(
      eventDispatcher: EventDispatcher,
      public readonly requesterId: string,
      public readonly targetId: string
    ) {
      super(eventDispatcher);
    }
  }