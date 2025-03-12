export class FriendshipEntity {
  id: number;
  isAccepted: boolean;

  senderId: number;
  receiverId: number;
  createdAt: Date;
}
