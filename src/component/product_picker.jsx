import React, { useState } from 'react'
import DraggableIcon from '../assets/icons/draggable_icon.png'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { VscClose } from 'react-icons/vsc';
import EditIcon from '../assets/icons/edit_icon.png'
import { Button, Input } from 'reactstrap';
import { Reorder } from 'framer-motion';

const ToggleButton = ({ isOpen, onClick }) => (
    <div onClick={onClick} style={{ cursor: "pointer", textDecoration: "underline", color: "#006EFF", fontSize: "12px" }}>
        <span className='pb-2'>
            {isOpen ? (
                <>
                    Hide Variants <IoIosArrowUp />
                </>
            ) : (
                <>
                    Show Variants  <IoIosArrowDown />
                </>
            )}
        </span>
    </div>
);

const discountType = [
    {
        id: 1,
        type: "Flat Off"
    },
    {
        id: 2,
        type: "% Off"
    }
]


const ProductPicker = ({ product, onRemoveParent, hasMultipleParents, onRemoveChild, index, setProducts, setModelOpen }) => {


    const [showVariants, setShowVariants] = useState(false);
    const [addDiscount, setAddDiscount] = useState(false)

    const handleToggleVariants = () => setShowVariants(!showVariants);




    const handleReorder = (productId, newVariants) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId
                    ? { ...product, variants: newVariants }
                    : product
            )
        );
    };

    const handleDiscountVisiblity = () => {
        setAddDiscount(true)
    }

    return (
        <>
            <div className='w-100'>
                <div className='d-flex align-items-center'>
                    <span>
                        <img src={DraggableIcon} alt='drag' />
                    </span>
                    <span>
                        <span className='px-3'>{index}.</span>
                    </span>

                    <div
                        style={{
                            border: "1px solid #00000012",
                            padding: "6px 10px",
                            margin: "10px 0",
                            position: "relative",
                        }}
                        className='w-100'
                    >
                        <span className='ps-2'>{product.title}</span>
                        <span style={{ flexGrow: 1 }}>
                            <img src={EditIcon} alt='edit' className='clickable pt-1' style={{ float: "right" }} onClick={() => setModelOpen(true , product?.id)} />
                        </span>
                    </div>

                    <div className='px-2 d-flex align-items-center justify-content-end w-100'>
                        {!addDiscount ?
                            <Button color='primary' className='button-md ' size='md' onClick={() => handleDiscountVisiblity()}>Add Discount</Button>
                            :
                            <>
                                <Input className='border border-white fs-sm' />

                                <Input
                                    className='border border-white fs-sm mx-2'
                                    name="select"
                                    type="select"
                                >
                                    {discountType.map((item) => {
                                        return (<option value={item.id}>
                                            {item.type}
                                        </option>)
                                    })}
                                </Input>

                            </>
                        }
                    </div>

                    <div className='p-2'>
                        {hasMultipleParents && (
                            <span onClick={onRemoveParent} className='clickable' >
                                <VscClose size={25} className='text-muted' />

                            </span>
                        )}
                    </div>
                </div>
                <div className='p-1 px-4 mb-5 d-flex justify-content-end'>
                    {product.variants.length > 0 && (
                        <ToggleButton isOpen={showVariants} onClick={handleToggleVariants} />
                    )}
                </div>
                <Reorder.Group axis='y' values={product.variants} onReorder={(newVariants) => handleReorder(product.id, newVariants)} className='mt-4 ms-auto' style={{ width: "93%", listStyleType: "none" }}>
                    {showVariants &&
                        product.variants.map((variant) => (
                            <Reorder.Item key={variant.id} value={variant}>

                                <div
                                    key={variant.id}
                                    className='d-flex align-items-center mb-3'
                                >
                                    <span className='ms-2'>
                                        <img src={DraggableIcon} alt='drag' width={"7px"} height={"14px"} />
                                    </span>
                                    <div style={{
                                        border: "1px solid #00000012",
                                        borderRadius: "30px"
                                    }}
                                        className='w-100 mx-3 p-2 text-center'
                                    >
                                        <span>{variant.title}</span>
                                    </div>
                                    <div className='d-flex align-items-center w-100 px-2'>
                                        <Input className='border border-white fs-sm' />

                                        <Input
                                            className='border border-white fs-sm mx-2'
                                            name="select"
                                            type="select"
                                            

                                        >
                                            {discountType.map((item) => {
                                                return (<option value={item.id}>
                                                    {item.type}
                                                </option>)
                                            })}
                                        </Input>

                                    </div>

                                    <div className='p-2'>
                                        <span onClick={() =>  onRemoveChild(product.id , variant.id)} className='clickable' >
                                            <VscClose size={25} className='text-muted' />

                                        </span>
                                    </div>
                                </div>
                            </Reorder.Item>
                        ))}
                </Reorder.Group>
            </div>
        </>
    );
};


export default ProductPicker