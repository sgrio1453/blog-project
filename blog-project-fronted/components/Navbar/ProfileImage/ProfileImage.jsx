import Image from 'next/image';
import React from 'react'

const ProfileImage = ({width, height}) => {
    const profileImage = "/images/Me.jpg";

    return (
          <Image
              src={profileImage}
              width={width}
              height={height}
              unoptimized
              alt="profile"
              className='rounded-full w-full h-full object-cover'
          />
  
    )
  }

export default ProfileImage