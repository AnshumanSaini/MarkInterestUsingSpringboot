import React from 'react'
import Masonry from 'react-masonry-css';

import Pin from './Pin';

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}

const MasonryLayout = ({ pins, userData }) => {
  // console.log("masonry is running");
  // console.log({pins});
  return (
    <div>
      <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>
      {pins?.map((pin)=> <Pin className="w-max" key={pin._id} pin={pin} userData={userData} />)}
      </Masonry>
    </div>
  )
}

export default MasonryLayout