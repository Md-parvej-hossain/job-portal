export const jobsCreatadeByPromise = email => {
  return fetch(`http://localhost:5000/jobs/application?email=${email}`, {
    credentials: 'include',
  }).then(res => res.json());
};
