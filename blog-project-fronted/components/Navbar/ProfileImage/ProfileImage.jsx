import Image from 'next/image';
import React from 'react'

const ProfileImage = ({src, width, height}) => {

    return (
          <Image
              src={src}
              width={width}
              height={height}
              unoptimized
              alt="profile"
              className='rounded-full w-full h-full object-cover'
          />
  
    )
  }

export default ProfileImage