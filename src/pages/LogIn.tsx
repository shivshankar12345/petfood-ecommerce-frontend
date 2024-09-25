// import React from 'react'
// import { useForm, SubmitHandler } from 'react-hook-form';
// import InputBox from '../components/InputBox';

// interface IFormInput {
//     name: string;
//     email: string; // Already provided by the user
//     phone: string;
//     gender: 'male' | 'female' | 'other';
//   }
// interface LogInProps {
//     email: string;
//   }
  

// const LogIn: React.FC<LogInProps> = ({email}) => {
//     const { register:registerDetails, handleSubmit:handleDetailsSubmit,formState:{errors} } = useForm<IFormInput>();
//     const onSubmitDetails: SubmitHandler<IFormInput> = (data) => {
//         console.log(data);
//         // Perform your form submission logic here (API call, etc.)
//       };
//     console.log(errors);
//   return (
//     <div>LogIn Details 
//         {/* <form onSubmit={handleDetailsSubmit(onSubmitDetails)}> */}

//          {/* <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             id="name"
//             type="text"
//             placeholder="Enter your name"
//             {...registerDetails('name', {
//               required: 'Name is required',
//               minLength: {
//                 value: 20,
//                 message: 'Name must be at least 20 characters long'
//               }
//             })}
//           /> */}
//           <InputBox
//            id="name"
//            label="Name"
//            type="text"
//            placeholder="Enter your name"
//            register= {registerDetails('name', {
//             required: 'Name is required',
//             minLength: {
//               value: 20,
//               message: 'Name must be at least 20 characters long'
//              },
//            })}
//            handleSubmit={handleDetailsSubmit}
//            onSubmit={onSubmitDetails}
//            buttonText=""
//            value=""
           
//           />
//         {/* </div> */}

//         {/* Email (Read-only)
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             readOnly
//             {...registerDetails('email')}
//           />
//         </div> */}
//         <InputBox 
//            id="email"
//            label="Email"
//            type="email"
//            value={email}
//            placeholder=''
//            register={registerDetails('email')}
//            handleSubmit={handleDetailsSubmit}
//            onSubmit={onSubmitDetails}
//            buttonText=""
//            disabled={true}
//         />

//         {/* Phone Number Input */}
//         {/* <div className="form-group">
//           <label htmlFor="phone">Phone Number:</label>
//           <input
//             id="phone"
//             type="tel"
//             placeholder="Enter your phone number"
//             {...registerDetails('phone', {
//               required: 'Phone number is required',
//               pattern: {
//                 value: /^[0-9]{10}$/,
//                 message: 'Enter a valid 10-digit phone number'
//               }
//             })}
//           />
//         </div> */}
//         <InputBox
//          id="phone"
//          label="Phone Number"
//          type="tel"
//          placeholder='Enter your phone number'
//          register={registerDetails('phone', {
//             required: 'Phone number is required',
//             pattern: {
//               value: /^[0-9]{10}$/,
//               message: 'Enter a valid 10-digit phone number'
//             }
//           })}
//           handleSubmit={handleDetailsSubmit}
//           onSubmit={onSubmitDetails}
//           buttonText=""
//           value=""

//          />

//         {/* Gender Select */}
//         {/* <div className="form-group">
//           <label htmlFor="gender">Gender:</label>
//           <select
//             id="gender"
//             {...registerDetails('gender', { required: 'Gender is required' })}
//           >
//             <option value="">Select your gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div> */}

//         {/* Submit Button */}
//         {/* <button type="submit">Sign Up</button>
//       </form> */}
//       <InputBox
//          id="gender"
//          type="option"
//          label="Gender"
//          placeholder=''
//          register={registerDetails('gender', { required: 'Gender is required' })}
//           handleSubmit={handleDetailsSubmit}
//           onSubmit={onSubmitDetails}
//           buttonText="Sign Up"
//           value=""
//          />

//      </div> 
      

//   )
// }

// export default LogIn;

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputBox from '../components/InputBox';

interface IFormInput {
  name: string;
  email: string; // Already provided by the user
  phone: string;
  gender: 'male' | 'female' | 'other';
}

interface LogInProps {
  email: string;
}

const LogIn: React.FC<LogInProps> = ({ email }) => {
  const {
    register: registerDetails,
    handleSubmit: handleDetailsSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmitDetails: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    // Perform your form submission logic here (API call, etc.)
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
            value: 20,
            message: 'Name must be at least 20 characters long',
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
