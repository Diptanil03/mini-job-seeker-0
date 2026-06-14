import React, { useRef, useState } from 'react'
import { MdDocumentScanner } from "react-icons/md";
import { FaRegPaperPlane } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import pdfToText from 'react-pdftotext'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import Table from './Table'
import { analyzeJob } from '../utils/analyzeJob'

const PdfScan = () => {
  const inputFileRef = useRef(null)
  const [text, setText] = useState('')
  const [pdf, setPdf] = useState(undefined)
  const [table, setTable] = useState(undefined)
  const [loader, setLoader] = useState(false)

  const onIconClick = () => {
    inputFileRef.current.click()
  }

  const submitPdf = async (e) => {
    e.preventDefault()
    setLoader(true)
    
    const file = inputFileRef.current.files[0]
    if (!file) {
      setLoader(false)
      return
    }

    pdfToText(file)
      .then(async (data) => {
        setText(data)
        return analyzeJob(data)
      })
      .then(async (extractedData) => {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/jobs`, { data: extractedData })
      })
      .then(res => {
        setTable(res.data.jobs)
        setLoader(false)
      })
      .catch(error => {
        console.error(error)
        setLoader(false)
      })
  }

  return (
    <>
      <div className='h-full w-full flex justify-center items-center'>
        <form className='flex flex-col items-center gap-5'>
          <div className='text-7xl text-blue-500 ring-2 ring-blue-500 focus:border-transparent rounded-xl overflow-hidden p-2.5 shadow-[4px_4px_6px_0px_rgba(0,0,0,0.1)]'>
            <MdDocumentScanner 
              className={`${inputFileRef?.current?.files[0] ? 'text-blue-300' : 'text-blue-500'} cursor-pointer`} 
              onClick={onIconClick}
            />
            <input 
              ref={inputFileRef} 
              className='hidden outline-none border-none px-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-normal text-gray-900 placeholder-gray-400' 
              type='file' 
              accept='application/pdf' 
              id='cv' 
              name='cv' 
              onChange={(e) => setPdf(e.target.value)} 
              value={pdf || ''}
            />
          </div>

          {inputFileRef?.current?.files[0] ? (
            <span className='flex items-center gap-1.5 text-base font-medium text-wrap p-2.5'>
              <SiTicktick className='text-green-500' />
              {inputFileRef.current.files[0].name}
            </span>
          ) : (
            <span className='text-md font-semibold text-gray-900'>Click icon to upload PDF</span>
          )}

          <button 
            onClick={submitPdf} 
            className='bg-blue-500 hover:bg-blue-700 text-4xl text-white px-7 py-3 rounded-lg shadow-[6px_6px_6px_0px_rgba(0,0,0,0.1)]'
          >
            <FaRegPaperPlane />
          </button>
        </form>
      </div>

      <div className='flex justify-center mt-5'>
        {loader ? (
          <Oval 
            visible={loader}
            height="80"
            width="80"
            color="#2b7fff"
            ariaLabel="oval-loading"
            secondaryColor='#ADD8E6'
            wrapperStyle={{ padding: '20px' }}
          />
        ) : (
          <Table tableData={table} />
        )}
      </div>
    </>
  )
}

export default PdfScan