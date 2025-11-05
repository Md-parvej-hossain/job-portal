import Lottie from 'lottie-react';
import register from '../assets/register.json';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { Link } from 'react-router';
const Register = () => {
  const { createUser } = useContext(AuthContext);
  const handaleRegister = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const regInfo = { email, password, name };
    console.log(regInfo);
    createUser(email, password).then(resuld => {
      console.log(resuld.user);
    });
  };
  return (
    <div className="flex justify-around items-center my-10">
      <div>
        <Lottie animationData={register} loop={true} />
      </div>
      <div className="card bg-base-100 w-4/12  shrink-0 shadow-2xl">
        <div className="text-center text-3xl font-bold mt-2">
          Register Now !
        </div>

        <form onSubmit={handaleRegister} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input w-full"
              placeholder="Name"
            />
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input w-full"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input w-full"
              placeholder="Password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
          </fieldset>
        </form>
        <p className='text-center pb-2'>
          You have a acount <Link className='underline text-blue-500' to={'/login'}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
