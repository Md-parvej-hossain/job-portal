import React from 'react';
import { use } from 'react';
import { Link } from 'react-router';

const MypostedList = ({ jobsCreatadeByPromise }) => {
  const data = use(jobsCreatadeByPromise);
  console.log(data);
  return (
    <div>
      <h1>My Posted by : {data.length}</h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Job Title</th>
              <th>Dadline</th>
              <th>View Application</th>
            </tr>
          </thead>
          <tbody>
            {data.map((itm, indx) => (
              <tr key={itm._id}>
                <th>{indx + 1}</th>
                <td>{itm.title}</td>
                <td>{itm.applicationDeadline}</td>
                <td>
                
                  <Link to={`/applications/${itm._id}`}>View Applications</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MypostedList;
