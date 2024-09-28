import React, { useState } from 'react'
import ProductPicker from '../component/product_picker';
import { Button } from 'reactstrap';
import { Reorder } from "framer-motion"
import ProductModal from '../component/product_modal';



const Home = () => {
    
    const [modelOpen, setModelOpen] = useState(false)

    const [products, setProducts] = useState([
        { id: 1, title: "Select Product", variants: [] },
    ]);


    const handleAddParent = () => {
        const newProduct = {
            id: products.length + 1,
            title: "Sample Product",
            variants: [],
        };
        setProducts([...products, newProduct]);
    };

    const handleModelClose = () => {
        setModelOpen(false)
    }

    const handleRemoveParent = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    
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
        <>
            <Reorder.Group axis="y" values={products} onReorder={setProducts} className='product-picker mx-auto'>
                <div className=''>
                    {products.map((product, index) => (
                        <Reorder.Item key={product.id} value={product}>

                            <ProductPicker
                                key={product.id}
                                index={index + 1}
                                product={product}
                                hasMultipleParents={products.length > 1}
                                onRemoveParent={() => handleRemoveParent(product.id)}
                                onRemoveChild={handleRemoveVariant}
                                setProducts={setProducts}
                                setModelOpen = {setModelOpen}
                            />
                        </Reorder.Item>
                    ))}
                    <div className='w-100 mt-5 px-4'>
                        <Button onClick={handleAddParent} className=' button-lg me-auto' color='primary' size='lg' outline style={{ float: "right" }} >Add Product</Button>
                    </div>
                </div>
            </Reorder.Group>
            <ProductModal isOpen={modelOpen} toggle={handleModelClose} />
        </>

    )
}

export default Home
