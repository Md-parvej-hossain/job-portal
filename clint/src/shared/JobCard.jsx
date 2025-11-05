import { IoLocationOutline } from 'react-icons/io5';
import { IoTimeOutline } from 'react-icons/io5';
import { MdWork } from 'react-icons/md';
import { Link } from 'react-router';
const JobCard = ({ job }) => {
  const {
    title,
    location,
    jobType,
    _id,
    description,
    company_logo,
    company,
    applicationDeadline,
    requirements,
  } = job;
  return (
    <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
      <div className="flex space-x-4">
        <img
          alt=""
          src={company_logo}
          className="object-cover w-12 h-12 rounded-full shadow"
        />
        <div className="flex flex-col space-y-1">
          <a
            rel="noopener noreferrer"
            href="#"
            className="text-sm font-semibold"
          >
            {company}
          </a>
          <span className="text-xs dark:text-gray-600 flex items-center gap-1">
            <IoLocationOutline /> {location}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <h2 className="mb-1 text-xl font-semibold">{title}</h2>

        <div className="flex gap-5">
          <div className="flex gap-2 items-center">
            <MdWork />
            <p>{jobType}</p>
          </div>
          <div className="flex gap-2 items-center">
            <IoTimeOutline />
            <p className="">{applicationDeadline}</p>
          </div>
        </div>

        <p className="text-sm dark:text-gray-600 py-5 flex-grow">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {requirements.map((skill, idx) => (
            <p key={idx} className="text-sm  px-2 py-1 rounded">
              {skill}
            </p>
          ))}
        </div>
        <div className="flex justify-end mt-5">
          <Link className="btn btn-primary" to={`/jobs/${_id}`}>
            Show Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
