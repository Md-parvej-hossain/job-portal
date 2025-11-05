import React, { Suspense } from 'react';
import Banner from '../components/Banner';
import HoteJobs from './HoteJobs';

const Home = () => {
  const jobsPromise = fetch('http://localhost:5000/jobs').then(res =>
    res.json()
  );
  return (
    <div>
      <Banner></Banner>
      <Suspense fallback={<p>Loadig...</p>}>
        <HoteJobs jobsPromise={jobsPromise}></HoteJobs>
      </Suspense>
    </div>
  );
};

export default Home;
