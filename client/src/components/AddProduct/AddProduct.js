import React from 'react'
import { addProduct } from '../../firebase/firebase'

const AddProduct = () => {

    const handleSubmit = async () => {
        let object = {
            name: 'hello phast',
            category: 'dummy',
            brand: 'Zara',
            price: '69',
            sizes: ['S', 'M', 'L'],
            colors: ['blue', 'red'],
            amount: 69,
            customerType: 'ladies',
            type: 'dress'
        }
        await addProduct(object);
    }

    return (
        <div>
            {/* <input type="text"/>
            <input type="text"/>

            <input type="text"/>

            <input type="text"/>

            <input type="text"/>

            <input type="text"/> */}
            <button onClick={handleSubmit}>add</button>

        </div>
    )
}

export default AddProduct;