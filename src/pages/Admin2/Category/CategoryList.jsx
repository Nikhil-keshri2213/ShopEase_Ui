import React, { useState } from 'react';

const CategoryList = ({name, categoryTypeList}) => {
  // Initial data
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Men",
      categoryTypeList: [
        {
          name: "Shirt",
          category: "Men's Apparel",
          categoryCode: "SHIRT01"
        },
        {
          name: "Jeans",
          category: "Men's Apparel",
          categoryCode: "JEANS01"
        }
      ]
    }
  ]);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  
  // Handle add category type
  const handleAddCategoryType = () => {
    if (selectedCategory) {
      const newCategoryType = {
        name: "New Category",
        category: "New Apparel",
        categoryCode: `NEW${selectedCategory.categoryTypeList.length + 1}`
      };
      const updatedCategory = {
        ...selectedCategory,
        categoryTypeList: [...selectedCategory.categoryTypeList, newCategoryType]
      };
      
      setCategories(categories.map(cat => cat.id === selectedCategory.id ? updatedCategory : cat));
    }
  };

  // Handle delete category type
  const handleDeleteCategoryType = (categoryCode) => {
    if (selectedCategory) {
      const updatedCategory = {
        ...selectedCategory,
        categoryTypeList: selectedCategory.categoryTypeList.filter(type => type.categoryCode !== categoryCode)
      };

      setCategories(categories.map(cat => cat.id === selectedCategory.id ? updatedCategory : cat));
    }
  };

  return (
    <div>
      {/* Category List */}
      <div>
        <h2>Categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category.id} onClick={() => handleCategoryClick(category)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Category Details (if a category is selected) */}
      {selectedCategory && (
        <div>
          <h3>{selectedCategory.name} Details</h3>
          <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Category Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedCategory.categoryTypeList.map((type, index) => (
                <tr key={index}>
                  <td>{type.name}</td>
                  <td>{type.category}</td>
                  <td>{type.categoryCode}</td>
                  <td>
                    <button onClick={() => handleDeleteCategoryType(type.categoryCode)} style={{ marginRight: '10px' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Add New Category Type */}
          <button onClick={handleAddCategoryType} style={{ marginTop: '20px' }}>
            Add New Category Type
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
