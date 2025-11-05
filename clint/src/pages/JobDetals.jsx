import { Link, useLoaderData } from 'react-router';
const JobDetals = () => {
  const data = useLoaderData();
  console.log(data);
  const { title, _id, company } = data;
  return (
    <div className="my-10 space-y-2">
      <h1 className="text-3xl font-bold"> Job Detala of {title}</h1>
      <p>Company : {company}</p>
      <Link to={`/jobApply/${_id}`}>
        <button className="btn btn-primary">Apply Now!</button>
      </Link>
    </div>
  );
};

export default JobDetals;
