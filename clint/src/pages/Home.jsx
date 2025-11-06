import React, { Suspense } from 'react';
import Banner from '../components/Banner';
import HoteJobs from './HoteJobs';
import Loading from '../components/Loading';

const Home = () => {
  const jobsPromise = fetch('http://localhost:5000/jobs').then(res =>
    res.json()
  );
  return (
    <div>
      <Banner></Banner>
      <Suspense fallback={<Loading />}>
        <HoteJobs jobsPromise={jobsPromise}></HoteJobs>
      </Suspense>
    </div>
  );
};

export default Home;
