/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import ReactCardFlip from "react-card-flip";
import { useCookies } from "react-cookie";

const Card = ({
  id,
  name,
  surname,
  img,
  plan,
  email,
  employment,
  gender,
  username,
  number,
  birthday,
  city,
  state,
  term,
  onSave,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cookies] = useCookies(["selectedCards"]);
  const [isSelected, setIsSelected] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  useEffect(() => {
    //controlla se ci sono card nei cookies
    const selectedCards = cookies.selectedCards || [];
    setIsSelected(selectedCards.includes(id));
  }, [cookies.selectedCards, id]);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg hover:{han}'>
        {/* Header Section */}
        <div className='pt-4 px-4 pb-2'>
          <div className='flex items-center justify-center space-x-2'>
            <span className='text-gray-700 font-medium text-xl'>{plan}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className='pt-4 pb-6 px-10' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className='flex items-center space-x-4'>
            {/* User Info */}
            <div className='flex-1 flex flex-col font-poppins'>
              <span className='text-sm text-gray-500'>#{id}</span>
              <h1 className='text-gray-900 font-medium text-4xl'>{name}</h1>
              <p className='text-gray-600 text-2xl'>{surname}</p>
            </div>

            {/* Profile Image */}
            <div className='flex-shrink-0'>
              <img src={img} alt='Profile' className='h-20 w-20 rounded-full object-cover' />
            </div>
          </div>

          {/* Description List */}
          <div className='mt-4 space-y-2 font-poppins'>
            <div className='flex flex-col text-sm'>
              <span className='text-gray-900 font-bold'>Email</span>
              <span className='text-gray-700'>{email}</span>
            </div>
            <div className='flex flex-col text-sm'>
              <span className='text-gray-900 font-bold'>Employment</span>
              <span className='text-gray-700'>{employment}</span>
            </div>
            <div className='flex flex-col text-sm'>
              <span className='text-gray-900 font-bold'>Gender</span>
              <span className='text-gray-700'>{gender}</span>
            </div>
          </div>
        </div>
        <div className='pb-6 px-10'>
          <button
            onClick={onSave}
            className='flex justify-center w-full bg-zinc-500 hover:bg-red-400 text-white hover:text-red-700 font-medium py-4 px-6 rounded-xl transition-colors duration-200'
          >
            <FaHeart className='hover:text-red-600' />
          </button>
        </div>
      </div>

      {/* Back Card*/}

      <div
        className='w-full h-full max-w-md bg-white rounded-xl shadow-lg'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Content */}
        <div className='pt-4 pb-6 px-10'>
          {/* Description List */}
          <div className='flex flex-col justify-between mt-4 space-y-2 font-poppins'>
            <div className='flex flex-col text-sm'>
              <span className='text-gray-900 font-bold'>Username</span>
              <span className='text-gray-700'>{username}</span>
            </div>
            <div className='flex flex-col text-sm'>
              <span className='text-gray-900 font-bold'>Phone number</span>
              <span className='text-gray-700'>{number}</span>
            </div>
            <div className='flex flex-col text-sm'>
              <span className='text-gray-900 font-bold'>Date of Birthday</span>
              <span className='text-gray-700'>{birthday}</span>
            </div>
            <div className='flex flex-col text-sm'>
              <span className='text-gray-900 font-bold'>City</span>
              <span className='text-gray-700'>
                {city}, {state}
              </span>
            </div>
            <div className='flex flex-col text-sm'>
              <span className='text-gray-900 font-bold'>Term</span>
              <span className='text-gray-700'>{term}</span>
            </div>
          </div>
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default Card;
