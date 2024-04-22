import { FC } from 'react';

import { FriendAction } from './Friends';

interface FriendRowProps {
  displayName: string;
  actions: Array<FriendActionMap>;
  statusText: string;
}

interface FriendActionMap {
  action: FriendAction;
  call: Function;
  icon: FC;
}

const FriendRow: FC<FriendRowProps> = ({ displayName, statusText, actions }) => {
  return (
    <tr className={`friend-row`}>
      <td>
        {displayName}
      </td>
      <td>
        {statusText}
      </td>
      <td>
        <div className="action-icons">
        {actions.map((a) => (
          <span
            className={`action-icon ${a.action.toLowerCase()}`}
            title={a.action}
            onClick={() => a.call(displayName)}
          >
            <a.icon />
          </span>
        ))}
        </div>
      </td>
    </tr>
  );
}

export default FriendRow;
