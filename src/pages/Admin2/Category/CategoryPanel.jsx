import React,{useState} from 'react'
//import data from '../../data/data.json'
import CategoryList from './CategoryList';

const CategoryPanel = () => {

 const [categories, setCategories] = useState('');

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-lg">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Category</h2>
          <button className="px-4 py-1 text-green-500 font-semibold border rounded-md hover:bg-green-500 hover:text-white transition">
            Create +
          </button>
        </div>

        <div>
          <CategoryList categoryTypeList={categories?.categoryTypeList} name={categories?.name}/>
        </div>
    </div>
  )
}

export default CategoryPanel