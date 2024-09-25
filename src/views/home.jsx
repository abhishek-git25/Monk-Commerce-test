import React, { useState } from 'react'
import ProductPicker from '../component/product_picker';

const Home = () => {

    const [products, setProducts] = useState([
        { id: 1, title: "Select Product", variants: [] },
    ]);

    // Add a new product (parent) without variants
    const handleAddParent = () => {
        const newProduct = {
            id: products.length + 1,
            title: "Sample Product",
            variants: [],
        };
        setProducts([...products, newProduct]);
    };

    // Remove a parent and its variants
    const handleRemoveParent = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    // Remove a specific variant from a parent
    const handleRemoveVariant = (productId, variantId) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId
                    ? {
                        ...product,
                        variants: product.variants.filter(
                            (variant) => variant.id !== variantId
                        ),
                    }
                    : product
            )
        );
    };




    return (
        <div style={{ padding: "20px" }} className='w-50'>
            {products.map((product, index) => (
                <ProductPicker
                    key={product.id}
                    index={index + 1}
                    product={product}
                    hasMultipleParents={products.length > 1}
                    onRemoveParent={() => handleRemoveParent(product.id)}
                    onRemoveChild={handleRemoveVariant}
                />
            ))}
            <button onClick={handleAddParent}>Add Product</button>
        </div>

    )
}

export default Home
