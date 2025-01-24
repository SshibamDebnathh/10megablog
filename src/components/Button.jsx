import React from 'react'

function button({
    children,
    textColor='text-white',
    bgColor='bg-blue-600',
    className='',
    type='button',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg mt-3 ${textColor} ${bgColor} ${className} `}{...props}>
        {children}
    </button>
  )
}

export default button