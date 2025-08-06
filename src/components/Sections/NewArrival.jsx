import React from 'react'
import SectionHeading from './SectionHeading/SectionHeading'
import Card from '../Card/Card'

import jeans from '../../assets/img/jeans.jpg'
import shirts from '../../assets/img/shirts.jpg'
import tshirt from '../../assets/img/tshirts.jpeg'
import dresses from '../../assets/img/dresses.jpg'
import joggers from '../../assets/img/joggers.jpg'
import kurtis from '../../assets/img/kurtis.jpg'
import Carousel from 'react-multi-carousel'
import { responsive } from '../../Utils/Section.constants'
import './NewArrival.css'

const items = [{
  'title':"Jeans",
  'imagePath':jeans
},
{
  'title':"Shirt",
  'imagePath':shirts
},
{
  'title':"T-Shirt",
  'imagePath':tshirt
},{
  'title':"Dresses",
  'imagePath':dresses
},{
  'title':"Joggers",
  'imagePath':joggers
},{
  'title':"Kurtis",
  'imagePath':kurtis
}]


function NewArrival() {
  return (
    <>
        <SectionHeading title={"| New Arrivals"}/>
        <Carousel
          responsive={responsive}
          autoPlay={false}
          swipeable={true}
          draggable={false}
          showDots={false}
          infinite={false}
          partialVisbile={false}
          itemClass={'react-slider-custom-item'}
          className='px-12'>
            {items && items?.map((item, index)=><Card key={item?.title + index} title={item.title} imagePath={item.imagePath}></Card>)}
        </Carousel>
    </>
  )
}

export default NewArrival