import { useLoaderData, useParams } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
const ViewApplications = () => {
  const { id } = useParams();
  const application = useLoaderData();
  console.log(application);
  const handaleStatusChange = (e, application_id) => {
    console.log(e.target.value, application);
    axios
      .patch(`http://localhost:5000/application/${application_id}`, {
        status: e.target.value,
      })
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          toast.success('Status update Sussfully!');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>
        {application.length} Application candidad for {id}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {application.map((app, indx) => (
              <tr key={app._id}>
                <th>{indx + 1}</th>
                <td>Cy Ganderton</td>
                <td>{app.email}</td>
                <td>
                  <select
                    onChange={e => handaleStatusChange(e, app._id)}
                    defaultValue={app.status}
                    className="select w-56"
                  >
                    <option disabled={true}>Update Status</option>
                    <option>Pending</option>
                    <option>Hired</option>
                    <option>Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
