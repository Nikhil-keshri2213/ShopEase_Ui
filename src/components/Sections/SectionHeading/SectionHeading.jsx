import React from 'react'

const SectionHeading = ({title}) => {
  return (
    <div className='flex flex-wrap px-10 my-5'>
        <div>

        </div>
        <p className='text-3xl'>{title}</p>
    </div>
  )
}

SectionHeading.defaultProps = {

}

SectionHeading.prototype = {
  title: String
}

export default SectionHeading