import EventDispatcher from "../../event-dispatcher/event-dispatcher";
import SocialEvent from "./base/social-event";

export class FriendRequestAccepted extends SocialEvent {
    static readonly eventName: string = "friend.request.accepted";
    readonly eventName: string = FriendRequestAccepted.eventName;
  
    constructor(
      eventDispatcher: EventDispatcher,
      public readonly accepterId: string,
      public readonly requesterId: string
    ) {
      super(eventDispatcher);
    }
  }
  