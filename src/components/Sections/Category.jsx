import SectionHeading from './SectionHeading/SectionHeading'
import Card from '../Card/Card'

function Category({title, data}) {
  return (
    <>
    <SectionHeading title={title}/>
    <div className='flex px-8'>
    {data && data?.map((item, index)=>{
        return(
            <Card 
              key={index}
              title={item?.title} 
              description={item?.description} 
              imagePath={item?.imagePath} 
              ActionArrow={true}
              height={'240px'}/>
        )
    })}
  </div>
  </>
  )
}

export default Category