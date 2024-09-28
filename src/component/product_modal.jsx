import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Label,
  Table,
} from "reactstrap";
import { fetchProducts } from "../services/products";

const ProductModal = ({ isOpen, toggle }) => {
  const [search, setSearch] = useState("");

  const [productList, setProductList] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([]);




  useEffect(() => {
    fetchProductService()
}, [])


const handleCheckboxes = (product) => {
  setSelectedProducts((prevSelected) => [
    ...prevSelected,
    product,
  ]);
}

const checkActiveVariants = useCallback((id) => {
  let active = false;
  if (selectedProducts?.length) {
    active = selectedProducts.some(product =>
      product.variant?.some(variant => variant.id === id)
    );
  }
  return active;
}, [selectedProducts]);

const fetchProductService = async () => {
    const res = await fetchProducts()
    if(res.status === 200){
        setProductList(res.data)
    }
   
}

console.log(selectedProducts , "45");




  const handleSearch = (event) => {
    setSearch(event.target.value);
  };



  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Products</ModalHeader>
      <ModalBody style={{ overflowY : "hidden" }}>

      <div className="border-bottom-custom pb-2">
        <Input
          type="text"
          placeholder="Search for products"
          value={search}
          onChange={handleSearch}
          className="mb-3"
        />
        </div>
        <div style={{ overflowY : "auto" , height : "calc(60vh - 60px)" , scrollbarWidth : "none" , msOverflowStyle : "none" }}>
          <Table className="custom-table w-100" borderless>
            <tbody>
              {productList.map((product) => (
                <>
                  {/* Parent Row */}
                  <tr key={product.id}>
                    <td>
                      <FormGroup check>
                        <Label check className="d-flex align-items-center">
                          <Input type="checkbox" className="me-2" onChange={() => handleCheckboxes(product)}  />
                          <img
                            src={product.image.src}
                            alt={product.title}
                            width={60}
                          />
                          <span className="px-2">{product.title}</span>
                        </Label>
                      </FormGroup>
                    </td>
                  </tr>

                  {/* Child Variant Rows */}
                  {product.variants.map((variant) => (
                    <tr key={variant.id}>
                      <td colSpan={4}>
                        <div className="ms-5  d-flex justify-content-between">
                          <FormGroup check >
                            <Label check>
                              <Input type="checkbox" onChange={() => handleCheckboxes(product)} checked = {checkActiveVariants(variant.id)} />
                              <span className="ps-2">{variant.title}</span>
                            </Label>
                          </FormGroup>
                        </div>
                      </td>
                      <td colSpan={2}>
                        <span> {variant.inventory_quantity} available</span>

                      </td>
                      <td colSpan={2}>
                        <span>${variant.price}</span>
                      </td>

                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </Table>
        </div>
      </ModalBody>
      <ModalFooter>
      <Button color="secondary" outline onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={toggle}>
          Submit
        </Button>
      
      </ModalFooter>
    </Modal>
  );
};

export default ProductModal;
