import React from 'react';
import { useState } from 'react';
import SuccessModel from '../components/SuccessModel';


const SignUp = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat bg-gray-100" style={{ backgroundImage: `url('./images/register-img.png')` }}>
      <div className="bg-white bg-opacity-90 shadow-lg rounded-lg flex w-[1000px] overflow-hidden">
        {/* Left Logo Section */}
        <div className="w-1/3 bg-gray-200 flex p-8 boder flex-col">
          <div className="img-box">
            <img src="./images/logo-crm.png" alt="logo" className='' />
          </div>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi velit omnis ut ratione quia magnam nihil qui illum fugiat dolorem accusantium incidunt, minus provident dolor saepe? Facilis laudantium vero a.</p>
        </div>

        {/* Right Form Section */}
        <div className="w-2/3 p-8">
          <h2 className="text-sm font-semibold mb-4">Contact Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="input shadow-md p-2 outline-none" />
            <input type="text" placeholder="Last Name" className="input shadow-md p-2 outline-none" />
            <input type="email" placeholder="Email ID" className="input shadow-md p-2 outline-none" />
            <input type="text" placeholder="Phone No." className="input shadow-md p-2 outline-none" />
            <select className="input col-span-2 shadow-md p-2 outline-none">
              <option>Select Country</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>

          <h2 className="text-sm font-semibold mt-6 mb-4">Company Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Company Name" className="input shadow-md p-2 outline-none" />
            <input type="text" placeholder="Company Web (optional)" className="input shadow-md p-2 outline-none" />
            <input type="text" placeholder="Company GST Number (optional)" className="input shadow-md p-2 outline-none" />
            <input type="text" placeholder="PAN Number" className="input shadow-md p-2 outline-none" />
            <input type="text" placeholder="Company Address" className="input col-span-2 shadow-md p-2 outline-none" />
          </div>

          <button className="mt-6 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition" onClick={()=>setModalOpen(true)}>SUBMIT</button>
          <p className="text-center text-sm mt-2">Already Have Account?</p>
        </div>
      </div>
      
      <SuccessModel
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div className='relative'>
        <img src="./images/Ellipse.png" alt="logo" className='relative top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
           <img src="./images/Vector.png" alt="logo" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
        </div>
        <h2 className='text-center text-bold text-xl'>success</h2>
        <p>OTP has been sent to your phone number. 
        Please login</p>
        <div className='flex justify-center item-center'>
        <button
          onClick={() => setModalOpen(false)}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          OK
        </button>
        </div>
       
      </SuccessModel>
    </div>
    
  );
};

export default SignUp;
