// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import team1 from '../assets/tem1.jpg';
import team2 from '../assets/tem2.jpg';
const Banner = () => {
  return (
    <div className="hero bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row-reverse ">
        <div className="flex-1 text-center items-center ">
          <motion.img
            src={team1}
            animate={{ y: [100, 150, 100] }}
            transition={{ duration: 6, repeat: Infinity }}
            className=" max-w-[200px] lg:max-w-sm -ml-10  rounded-t-4xl rounded-r-4xl border-l-8 border-b-8 border-blue-500 shadow-2xl"
          />
          <motion.img
            src={team2}
            animate={{ x: [100, 160, 100] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="max-w-[200px] lg:max-w-sm  rounded-t-4xl rounded-r-4xl border-l-8 border-b-8 -ml-10  border-blue-500 shadow-2xl"
          />
        </div>

        <div className="flex-1">
          {/* <motion.h1 animate={{rotate:180 ,transition:{duration:4}}} className="text-5xl font-bold">Latest jobs fore You</motion.h1> */}
          <h1 className="text-4xl font-bold">
            Latest{' '}
            <motion.span
              animate={{
                color: ['#ff5733', '#33ff33', '#8a33ff'],
                transition: { duration: 2, repeat: Infinity },
              }}
            >
              jobs fore
            </motion.span>{' '}
            You
          </h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
