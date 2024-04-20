export interface Friendship {
    sender: string;
    receiver: string;
    status: FriendshipStatus;
}

export enum FriendshipStatus {
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    REQUESTED = 'REQUESTED',
}
