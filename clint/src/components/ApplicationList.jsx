import { use } from 'react';
const ApplicationList = ({ ayApplicationPromuse }) => {
  const applications = use(ayApplicationPromuse);
  return (
    <div>
      <h3 className="text-3xl ">
        {' '}
        Jobs Applied so for : {applications.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Logo</th>
              <th>Name</th>
              <th>Job</th>
              <th>company</th>
              <th>location</th>
              <th>Last Login</th>
              <th>Application Count</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, inx) => (
              <tr key={application._id}>
                <th>{inx + 1}</th>
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={application.company_logo}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <td>{application.name}</td>
                <td>{application.title}</td>
                <td>{application.company}</td>
                <td>{application.address}</td>
                <td>12/16/2020</td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationList;
