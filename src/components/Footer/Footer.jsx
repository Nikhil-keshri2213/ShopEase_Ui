import React from 'react'
import FbIcon from '../common/FbIcon.jsx'
import InstaIcon from '../common/InstaIcon.jsx'

const Footer = ({ content }) => {
  return (
    <div className='bg-black text-white py-8'>
      <div className='flex justify-around'>
        {content?.items && content.items.map((item, index) => {
          return (
            <div className='flex flex-col' key={item?.title || index}>
              <p className='text-[16px] pb-[10px]'>{item?.title}</p>
              {item?.list && item.list.map((listItem, subIndex) => (
                <a
                  className='flex flex-col text-[12px] py-2'
                  href={listItem?.path}
                  key={listItem?.label || subIndex}
                >
                  {listItem?.label}
                </a>
              ))}
              {item?.description && <p>{item.description}</p>}
            </div>
          )
        })}
      </div>

      <div className='flex gap-2 items-center justify-center py-4'>
        <a href='/fb'><FbIcon /></a>
        <a href='/insta'><InstaIcon /></a>
      </div>

      <p className='text-sm text-white text-center content-center'>
        {content?.copyright}
      </p>
      <p className='text-[12px] text-gray-400 text-center content-center cursor-pointer     ' href='https://nikhil-keshri2213.github.io/MyPortfolio/'>
        {content?.developer}
      </p>
    </div>
  )
}

export default Footer
