import { FC } from 'react';

import Loader from '../../components/Loader/Loader';
import { useAddPull, usePullSummary, usePulls } from '../../hooks/usePulls';
import PullRecord from './PullRecord';

import './Pulls.scss';

const PullRecords: FC = () => {
  const { response: pullResponse, isLoading: pullsLoading } = usePulls();
  const { response: pullSummary} = usePullSummary();
  const { response: newPull, invoke: addPull } = useAddPull();

  return (
    <div className="main-content pull-records">
    {pullsLoading && 
      <Loader />
    }
    {pullSummary &&
      <div className="pull-summary">
        {JSON.stringify(pullSummary)}
      </div>
    }
    {pullResponse &&
      <div className="pull-list">
        {pullResponse.map(pull => (
          <PullRecord key={pull.timestamp} pullResult={pull} />
        ))}
      </div>
    }
    </div>
  );
}

export default PullRecords;