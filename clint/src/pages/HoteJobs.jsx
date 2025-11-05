import { use } from 'react';
import JobCard from '../shared/JobCard';

const HoteJobs = ({ jobsPromise }) => {
  const jobs = use(jobsPromise);
  console.log(jobs);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10 w-11/12 mx-auto'>
      {
        jobs.map(job=><JobCard job={job} key={job._id}></JobCard>)
      }
    </div>
  );
};

export default HoteJobs;
