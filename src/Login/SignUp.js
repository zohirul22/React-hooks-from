import React from 'react';
import auth from '../firebase.init';
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit ,reset  } = useForm();
  

    const [signInWithGoogle, GoogleUser, GoogleLoading, GoogleError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        SignUser,
        SignLoading,
        SignError,
      ] = useCreateUserWithEmailAndPassword(auth);

      const [updateProfile, updating, error] = useUpdateProfile(auth);

      const navigate = useNavigate();

      let EmailPasswordError;

      if( GoogleLoading || SignLoading){
          return <Loading></Loading>
      }

      if(GoogleError || SignError){
        EmailPasswordError= <p className='text-red-500'>{GoogleError?.message || SignError?.message || updating?.message}</p>
      }

      if(GoogleUser||SignUser){
          console.log(GoogleUser||SignUser)
      }
   

      const onSubmit = async data => {
     
        await createUserWithEmailAndPassword(data.email , data.password)
        await updateProfile({ displayName:data });
        console.log("updating done")
        navigate("/home");
       reset();
    };


    return (
        <div className='flex justify-center mt-12'>
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-center text-4xl text-red-700 font-bold">Sign Up</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* name ar code */}
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text text-2xl text-blue-700">Name</span> </label>
                        <input
                            
                            type="text"
                            placeholder="Your Name"
                            class="input input-bordered w-full max-w-xs"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "name is required"
                                }
                            })}

                     

                        />
                        <label class="label">
                            {errors.name?.type === 'required' && <span class="label-text-alt text-red-700">{errors.name.message}</span>}
                          
                        </label>
                    </div>
                    {/* name ar code */}

                    {/* Email ar code */}
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text text-2xl text-blue-700">Email</span> </label>
                        <input

                            type="email"
                            placeholder="Your Email"
                            class="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email is required"
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Enter Your Valid Email'
                                }
                            })}

                        />
                        <label class="label">
                            {errors.email?.type === 'required' && <span class="label-text-alt text-red-700">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span class="label-text-alt text-xl text-red-700">{errors.email.message}</span>}
                        </label>
                    </div>
                    {/* Email ar code */}

                    {/* Password code */}
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text text-2xl text-blue-700">Password</span> </label>
                        <input

                            type="password"
                            placeholder="Your password"
                            class="input input-bordered w-full max-w-xs"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "password is required"
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Please give 6 character'
                                }
                            })}

                        />
                        <label class="label">
                            {errors.password?.type === 'required' && <span class="label-text-alt   text-red-700">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span class="label-text-alt text-xl text-red-700">{errors.password.message}</span>}
                        </label>
                    </div>
                    {EmailPasswordError}
                    {/* Password code */}
                    <input className='btn w-full max-w-xs text-xl mt-2' type="submit" value="Sign Up" />
                </form>

                <p><small>Already Have an account <Link className='text-green-600 hover:text-sky-700 font-semibold' to="/login">Please Login</Link></small></p>

                <div className="divider">OR</div>

                <button
                    onClick={() => signInWithGoogle()}
                    className="btn btn-outline btn-primary">Continue WithGoogle</button>

            </div>
        </div>
    </div>
    );
};

export default SignUp;