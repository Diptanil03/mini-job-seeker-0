import React from 'react'

const Hero = () => {
  return (
    <div className='min-h-2/6 p-5 md:p-10 lg:p-20'>
      <div className='flex flex-col lg:gap-20 md:flex-row gap-10'>
        <h1 className='text-4xl lg:text-7xl lg:px-10 md:text-6xl text-wrap md:text-nowrap leading-12 md:leading-15 tracking-wide md:tracking-wider'>
          Your <span className='text-blue-500'>CV</span> is Your <br /> Entire <span className='text-blue-500'>Job</span> Search
        </h1>
        <p className='text-xl font-normal lg:px-10'>
          You’ve already done the hard work of building your resume—now let it work for you. 
          Instead of spending hours filling out identical applications, just drop your PDF document here. 
          Our intelligent platform reads your background and immediately surfaces personalized job matches that actually fit your profile.
        </p>
      </div>
      <span className='text-base text-blue-400 font-semibold tracking-wide mt-2.5 md:mt-5'>
        Scan Your Resume Instantly &gt;&gt;&gt;
      </span>
    </div>
  )
}

export default Hero