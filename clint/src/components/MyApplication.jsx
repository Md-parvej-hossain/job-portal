import { Suspense } from 'react';
// import { ayApplicationPromuse } from '../api/applicationApi';
import useAuth from '../hooks/useAuth';
import ApplicationList from './ApplicationList';
import ApplicationStat from './ApplicationStat';
import Loading from './Loading';

//defrent way to fetch promice
const ayApplicationPromuse = email => {
  return fetch(`http://localhost:5000/applications?email=${email}`).then(res =>
    res.json()
  );
};
const MyApplication = () => {
  const { user } = useAuth();
  return (
    <div>
      <ApplicationStat />
      <Suspense fallback={<Loading></Loading>}>
        <ApplicationList
          ayApplicationPromuse={ayApplicationPromuse(user?.email)}
        ></ApplicationList>
      </Suspense>
    </div>
  );
};

export default MyApplication;
