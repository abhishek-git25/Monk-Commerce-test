import React, { useState } from 'react'
import DraggableIcon from '../assets/icons/draggable_icon.png'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { VscClose } from 'react-icons/vsc';
import EditIcon from '../assets/icons/edit_icon.png'

const ToggleButton = ({ isOpen, onClick }) => (
    <div  onClick={onClick} style={{ cursor: "pointer" , textDecoration : "underline" , color : "#006EFF" , fontSize: "12px" }}>
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


const ProductPicker = ({ product, onRemoveParent, hasMultipleParents, onRemoveChild , index }) => {
    console.log(index , "24");
    
    const [showVariants, setShowVariants] = useState(false);

    const handleToggleVariants = () => setShowVariants(!showVariants);

    const handleRemoveVariant = (variantId) => {
        onRemoveChild(product.id, variantId);
    };

    return (
        <>
            <div className=''>
                
                <div className='d-flex align-items-center w-100'>
                    <div>
                        <img src={DraggableIcon} alt='drag' />
                    </div>
                    <div>
                        <span className='px-2'>{index}.</span>
                    </div>
                
                    <div
                        style={{
                            border: "1px solid #00000012",
                            padding: "10px",
                            margin: "10px 0",
                            position: "relative",
                        }}
                        className='w-100'
                    >
                    <span className='ps-2'>{product.title}</span>
                     <img src={EditIcon} alt='edit' style={{ float : "right" }} />
                    </div>

                    <div>
                        {hasMultipleParents && (
                            <span onClick={onRemoveParent} className='ps-3' >
                                <VscClose size={25} className='text-muted' />

                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <div className='d-flex justify-content-end'>
                        {/* {product.variants.length > 0 && ( */}
                        <ToggleButton isOpen={showVariants} onClick={handleToggleVariants} />
                        {/* )} */}
                    </div>

                    {showVariants &&
                        product.variants.map((variant) => (
                            <div
                                key={variant.id}
                                style={{
                                    marginLeft: "20px",
                                    marginTop: "10px",
                                    border: "1px solid black",
                                    padding: "10px",
                                    width: "80%",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <DraggableIcon />
                                <span>{variant.title}</span>
                                <span style={{ marginLeft: "auto" }}>${variant.price}</span>
                                <button
                                    onClick={() => handleRemoveVariant(variant.id)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    ❌
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};


export default ProductPicker