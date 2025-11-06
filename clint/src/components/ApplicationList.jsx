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
              <th>Name</th>
              <th>Job</th>
              <th>company</th>
              <th>location</th>
              <th>Last Login</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, inx) => (
              <tr key={application._id}>
                <th>{inx + 1}</th>
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
