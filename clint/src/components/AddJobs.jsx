import toast from 'react-hot-toast';
import useAuth from './../hooks/useAuth';
import axios from 'axios';
const AddJobs = () => {
  const { user } = useAuth();
  const handaleFormData = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const { min, max, currency, ...newJob } = data;
    newJob.salaryRange = { min, max, currency };

    //process requarment
    const requirementsString = newJob.requirements;
    const requirementsDirty = requirementsString.split(',');
    const requirementsClean = requirementsDirty.map(req => req.trim());
    newJob.requirements = requirementsClean;
    newJob.responsibilities = newJob.responsibilities
      .split(',')
      .map(res => res.trim());
    newJob.status = 'active';
    console.log(newJob);
    axios
      .post('http://localhost:5000/jobs', newJob)
      .then(res => {
        if (res.data.insertedId) {
          toast.success('New Jobd Added Successfull');
        }
      })
      .catch(err => {
        console.log(err);
        toast.error(err.massage);
      });
  };
  return (
    <div>
      <h1>Add Jons</h1>
      <form onSubmit={handaleFormData}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Job Title</label>
          <input
            type="text"
            className="input"
            name="title"
            placeholder="Title"
          />

          <label className="label">Company Name</label>
          <input
            type="text"
            className="input"
            name="company"
            placeholder="Company Name"
          />

          <label className="label">Location</label>
          <input
            type="text"
            className="input"
            name="location"
            placeholder="Company Location"
          />
          <label className="label">Company Logo</label>
          <input
            type="url"
            className="input"
            name="company_logo"
            placeholder="Company Logo"
          />
        </fieldset>
        {/* //job types */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-label">Job Type</legend>
          <div className="filter">
            <input
              className="btn filter-reset"
              type="radio"
              name="jobType"
              aria-label="All"
            />
            <input
              className="btn"
              type="radio"
              name="jobType"
              aria-label="On-Site"
              value="On-Site"
            />
            <input
              className="btn"
              type="radio"
              name="jobType"
              aria-label="Remote"
              value="Remote"
            />
            <input
              className="btn"
              type="radio"
              name="jobType"
              aria-label="Hybrid"
              value="Hybrid"
            />
          </div>
        </fieldset>
        {/* //job catagory */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-label">Job Category</legend>
          <select
            defaultValue="Job Category"
            name="category"
            className="select"
          >
            <option disabled={true}>Job Category</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Finance</option>
          </select>
        </fieldset>
        {/* //application dadline{' '} */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-label">Application Dadline</legend>

          <input type="date" name="applicationDeadline" className="input" />
        </fieldset>
        {/* hr name email  */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Page details</legend>

          <label className="label">HR Name </label>
          <input
            type="text"
            name="hr_name"
            className="input"
            placeholder="My awesome page"
          />

          <label className="label">HR Email</label>
          <input
            type="email"
            name="hr_email"
            className="input"
            defaultValue={user?.email}
            readOnly
            placeholder="my-awesome-page"
          />
        </fieldset>
        {/* //salary Range */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Page details</legend>

          <label className="label">Min Salary</label>
          <input
            type="number"
            className="input"
            name="min"
            placeholder="Min Salary"
          />

          <label className="label">Max Salary </label>
          <input
            type="number"
            className="input"
            name="max"
            placeholder="Max Salary"
          />

          <label className="label">Currency</label>
          <select
            defaultValue="Select a Currency"
            name="currency"
            className="select"
          >
            <option disabled={true}>Select a Currency</option>
            <option>BDT</option>
            <option>USD</option>
            <option>EU</option>
          </select>
        </fieldset>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-label">Job Requirements</legend>

          <textarea
            className="textarea rounded-none"
            name="requirements"
            placeholder="job requirements"
          ></textarea>
        </fieldset>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-label">Job Description</legend>

          <textarea
            className="textarea rounded-none"
            name="description"
            placeholder="Job Description"
          ></textarea>
        </fieldset>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-label">Job Responsibilities</legend>

          <textarea
            className="textarea rounded-none"
            name="responsibilities"
            placeholder="Job responsibilities"
          ></textarea>
        </fieldset>
        <input className="btn" type="submit" value={'Add Job'} />
      </form>
    </div>
  );
};

export default AddJobs;
