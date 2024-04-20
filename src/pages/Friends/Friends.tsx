import { FC, useEffect, useState } from 'react';

import Loader from '../../components/Loader/Loader';

import { useAuth } from '../../hooks/useAuth';
import { useFriends } from '../../hooks/useFriends';
import { Friendship, FriendshipStatus } from '../../types/Friendship';

import './Friends.scss';
import FriendRow from './FriendRow';

const Friends: FC = () => {
  const { user } = useAuth();
  const { friends, isLoading } = useFriends();

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
      <p>todo: add friend search</p>
      <div className="friends-list">
        {isLoading && (
          <div className="loading-overlay">
            <Loader />
          </div>
        )}
        <table className="friends-table">
          <tbody>
            {sentRequests.map(f => <FriendRow currentUser={user} friendship={f} />)}
            {receivedRequests.map(f => <FriendRow currentUser={user} friendship={f} />)}
            {friendList.map(f => <FriendRow currentUser={user} friendship={f} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Friends;