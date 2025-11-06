import { Link, useParams } from 'react-router';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';

const JobApply = () => {
  const { id: jobId } = useParams();
  const { user } = useAuth();
  const hansaleApplyJobData = e => {
    e.preventDefault();
    const from = e.target;
    const formData = new FormData(from);
    const data = Object.fromEntries(formData.entries());
    const { ...all } = data;
    const allData = {
      ...all,
      jobId,
    };
    // use Axios post opration
    axios
      .post(`http://localhost:5000/application`, allData)
      .then(res => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success('Job Apply Success !');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <form
      onSubmit={hansaleApplyJobData}
      className="container flex flex-col w-11/12 mx-auto space-y-12 my-20"
    >
      <h2 className="">
        Applide Jobs :{' '}
        <Link className="underline" to={`/jobs/${jobId}`}>
          Detals
        </Link>{' '}
      </h2>
      <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="firstname" className="text-sm">
              First name
            </label>
            <input
              id="firstname"
              type="text"
              name="name"
              placeholder="First name"
              className="w-full rounded-md border p-1 border-gray-300"
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="lastname" className="text-sm">
              Last name
            </label>
            <input
              id="lastname"
              type="text"
              name="lastName"
              placeholder="Last name"
              className="w-full rounded-md border p-1 border-gray-300"
            />
          </div>
          <div className="col-span-full sm:col-span-3">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={user?.email}
              readOnly
              placeholder="Email"
              className="w-full rounded-md border p-1 border-gray-300"
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="address" className="text-sm">
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder=""
              className="w-full rounded-md border p-1 border-gray-300"
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="address" className="text-sm">
              Linkedin Link
            </label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              placeholder="Linkedin Link"
              className="w-full rounded-md border p-1 border-gray-300"
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="address" className="text-sm">
              Github Link
            </label>
            <input
              id="github"
              name="github"
              type="url"
              placeholder="Github Link"
              className="w-full rounded-md border p-1 border-gray-300"
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="address" className="text-sm">
              Resume Link
            </label>
            <input
              id="resume"
              name="resume"
              type="url"
              placeholder="Resume Link"
              className="w-full rounded-md border p-1 border-gray-300"
            />
          </div>
          <input type="submit" className="btn" value="Apply" />
        </div>
      </fieldset>
    </form>
  );
};

export default JobApply;
