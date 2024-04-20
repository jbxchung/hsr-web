import { FC } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Friends: FC = () => {
  const { user } = useAuth();

  return (
    <div className="friends-page">
      Placeholder friends management for {user?.username}
    </div>
  );
};

export default Friends;