/**
 * using http only cookies 
 * 1.Form client side send the information (email,beter : firbase er auth token) to generate token 
 * 2. on the server side , accept user information and if needed validate it 
 * 3.generate token in the server side using secret and expiresIn
 * -------
 * set the coolies 
 * 4.while calling the api tell to use withCredentials
 *  axios
            .post('http://localhost:5000/jwt', userData, {
              withCredentials: true,
            })
            

    or for fetch add option credentiald : 'includ'
 * 5.in the cors setting set credentials and origin 

            app.use(
              cors({
                origin: ['http://localhost:5173'],
                credentials: true,
              })
            );
 * 

*6. after generating the token set it the cookies with some options 

res.cookie('token', token, {
        httpOnly: true,
        secure:false
      })


* 7.use cookiesParser as middleware 
app.use(cookieParser());
8.in the client side : if using axios withCredentials : true for fetch:credentials :include

verify token 
9.jwt.verify function 

 */
