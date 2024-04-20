export interface Friendship {
    sender: string;
    receiver: string;
    status: FriendshipStatus;
}

export enum FriendshipStatus {
    REQUESTED = 'REQUESTED',
    ACCEPTED = 'ACCEPTED',
}