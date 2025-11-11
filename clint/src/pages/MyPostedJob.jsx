import { Suspense } from 'react';
import MypostedList from '../components/MypostedList';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import { jobsCreatadeByPromise } from './../api/jobsApi';

const MyPostedJob = () => {
  const { user } = useAuth();
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <MypostedList
          jobsCreatadeByPromise={jobsCreatadeByPromise(user.email)}
        ></MypostedList>
      </Suspense>
    </div>
  );
};

export default MyPostedJob;
