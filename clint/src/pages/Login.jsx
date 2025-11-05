import Lottie from 'lottie-react';
import login from '../assets/Login.json';
import { Link, useLocation, useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';
import { FcGoogle } from 'react-icons/fc';
const Login = () => {
  const { siginUser, googLeLogin } = useContext(AuthContext);
  const loaction = useLocation();
  const navigate = useNavigate();
  const froms = loaction.state || '/';
  const handaleLogin = e => {
    e.preventDefault();
    const from = e.target;
    const email = from.email.value;
    const password = from.password.value;
    const loginInfo = { email, password };
    console.log(loginInfo);
    siginUser(email, password).then(resuld => {
      navigate(froms);
    });
  };
  const handaleGoogleLogin = () => {
    googLeLogin()
      .then(result => {
        navigate(froms);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-around items-center my-10">
      <div className="card bg-base-100 w-4/12  shrink-0 shadow-2xl">
        <div className="text-center text-3xl font-bold mt-2">Login Now !</div>

        <form onSubmit={handaleLogin} className="card-body">
          <fieldset className="fieldset">
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
              Login
            </button>
            <div className="divider">OR</div>
            <button onClick={handaleGoogleLogin} type="submit" className="btn ">
              Login with Google <FcGoogle></FcGoogle>
            </button>
          </fieldset>
        </form>
        <p className="text-center pb-2">
          You have not acount{' '}
          <Link className="underline text-blue-500" to={'/register'}>
            Register
          </Link>
        </p>
      </div>
      <div>
        <Lottie animationData={login} loop={true} />
      </div>
    </div>
  );
};

export default Login;
