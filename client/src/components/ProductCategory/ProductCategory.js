import React from 'react'

//redux
import { useSelector } from 'react-redux';

const ProductCategory = (props) => {
    const {name, id} = props;
    return (
        <div>
            {name}
        </div>
    )
}
export default ProductCategory;