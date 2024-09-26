import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputBox from '../components/InputBox';
import { IFormInput,LogInProps } from '../types/details.types';
import axios from 'axios';
import { baseURL } from '../env';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';

const LogIn: React.FC<LogInProps> = ({ email }) => {
  const {
    register: registerDetails,
    handleSubmit: handleDetailsSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const {accessToken}=useSelector((state:RootState)=>state.auth)

  const onSubmitDetails: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    // Perform your form submission logic here (API call, etc.)
    try{
    const resp=await axios.patch(`${baseURL}/users/update`,{
      name:data.name,
      phone:data.phone,
      gender:data.gender,
    }, {headers:{Authorization:`Bearer ${accessToken}`}})
  }
    catch(error){
      alert("Enter All Details");
    }
  };

  console.log(errors);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2> */}

      {/* Name Input */}
      <InputBox
        id="name"
        label="Name"
        type="text"
        placeholder="Enter your name"
        register={registerDetails('name', {
          required: 'Name is required',
          minLength: {
            value: 5,
            message: 'Name must be at least 5 characters long',
          },
        })}
        handleSubmit={handleDetailsSubmit}
        onSubmit={onSubmitDetails}
        buttonText=""
        value=""
      />
      {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

      {/* Email (Read-only) */}
      <InputBox
        id="email"
        label="Email"
        type="email"
        value={email}
        placeholder=""
        register={registerDetails('email')}
        handleSubmit={handleDetailsSubmit}
        onSubmit={onSubmitDetails}
        buttonText=""
        disabled={true}
      />

      {/* Phone Number Input */}
      <InputBox
        id="phone"
        label="Phone Number"
        type="tel"
        placeholder="Enter your phone number"
        register={registerDetails('phone', {
          required: 'Phone number is required',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Enter a valid 10-digit phone number',
          },
        })}
        handleSubmit={handleDetailsSubmit}
        onSubmit={onSubmitDetails}
        buttonText=""
        value=""
      />
      {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}

      {/* Gender Select */}
      <InputBox
        id="gender"
        type="option"
        label="Gender"
        placeholder=""
        register={registerDetails('gender', { required: 'Gender is required' })}
        handleSubmit={handleDetailsSubmit}
        onSubmit={onSubmitDetails}
        buttonText="Sign Up"
        value=""
      />
      {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
    </div>
  );
};

export default LogIn;
