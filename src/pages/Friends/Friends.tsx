import { FC, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useFriends } from '../../hooks/useFriends';
import { Friendship, FriendshipStatus } from '../../types/Friendship';

const Friends: FC = () => {
  const { user } = useAuth();

  const { friends } = useFriends();
  console.log(friends);

  const [sentRequests, setSentRequests] = useState<Array<Friendship>>([]);
  const [receivedRequests, setReceivedRequests] = useState<Array<Friendship>>([]);
  const [friendList, setFriendList] = useState<Array<Friendship>>([]);

  useEffect(() => {
    const sent: Array<Friendship> = [];
    const received: Array<Friendship> = [];
    const confirmed: Array<Friendship> = [];

    if (user && friends) {
      friends.forEach(friendship => {
        if (friendship.status === FriendshipStatus.REQUESTED) {
          if (friendship.sender === user.username) {
            sent.push(friendship);
          } else {
            received.push(friendship);
          }
        } else if (friendship.status === FriendshipStatus.ACCEPTED) {
          confirmed.push(friendship);
        }
      });

      setSentRequests(sent);
      setReceivedRequests(received);
      setFriendList(confirmed);
    }
  }, [friends, user]);
  return (
    <div className="friends-page">
      Placeholder friends management for {user?.username}
      <div className="friends-list">
        <p>sent requests</p>
        {sentRequests.map(f => JSON.stringify(f))}
        <p>receivced requests</p>
        {receivedRequests.map(f => JSON.stringify(f))}
        <p>friends</p>
        {friendList.map(f => JSON.stringify(f))}
      </div>
    </div>
  );
};

export default Friends;