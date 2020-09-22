import React from 'react'
import './ProductCategory.css'

const ProductCategory = (props) => {
    const {name, onClickCategory} = props;
    return (
        <div className="category-list" onClick={() => {onClickCategory(name)}}>
            {name}
        </div>
    )
}
export default ProductCategory;