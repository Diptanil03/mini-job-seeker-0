import React from 'react'

const Table = ({ tableData }) => {
  return (
    <div className='flex items-center justify-center w-full p-10'>
      {tableData && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-auto gap-7'>
          {tableData.map((job, idx) => (
            <div 
              key={idx} 
              className='flex flex-col gap-1 p-3 border border-gray-300 shadow-[0_4px_4px_0_rgba(0,0,0,0.1)] max-w-150 rounded-lg'
            >
              <h3 className='text-xl font-semibold'>{job.company}</h3>
              <h5 className='text-lg'>{job.title}</h5>
              <p>{job.location}</p>
              <a 
                className='bg-blue-500 text-white font-semibold text-center px-2.5 py-2 rounded-lg' 
                href={job.link} 
                target='_blank' 
                rel='noopener noreferrer'
              >
                Apply
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Table