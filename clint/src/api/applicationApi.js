// //defrent way to fetch promice
export const ayApplicationPromuse = email => {
  return fetch(`http://localhost:5000/applications?email=${email}`, {
    credentials: 'include',
  }).then(res => res.json());
};
