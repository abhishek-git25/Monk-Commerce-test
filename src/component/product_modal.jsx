import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { debounce } from "lodash";
import { ColorRing } from "react-loader-spinner";

const ProductModal = ({ isOpen, toggle, selectedProducts, products, setSelectedProducts, productList, setProductList, setProducts, defaultProdId }) => {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const modalBodyRef = useRef(null);

  const debouncedFetch = debounce((page, term) => {
    fetchProductService(page, term);
  }, 300);

  useEffect(() => {
    if (search) {
      debouncedFetch(page, search);
    } else {
      fetchProductService(page, '');
    }
  }, [search, page])

  console.log(page, "35");



  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = modalBodyRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      setPage((prevPage) => prevPage + 1);
    }

    if (scrollTop <= 1) {
      setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    }
  }




  // Handle parent product checkbox
  const handleCheckboxes = (product) => {
    setProducts((prevProducts) => {
      const filteredProducts = prevProducts.filter((item) =>
        !item.isDefault || item.id !== defaultProdId
      );
      const productSelected = filteredProducts.some((item) => item.id === product.id);

      if (productSelected) {
        return filteredProducts.filter((item) => item.id !== product.id);
      } else {
        return [...filteredProducts, { ...product }];
      }
    });
  };

  // Handle variant checkbox
  const handleVariantCheckbox = (product, variant) => {
    setProducts((prevProducts) => {

      const filteredProducts = prevProducts.filter((item) =>
        !item.isDefault || item.id !== defaultProdId
      );

      const productIndex = filteredProducts.findIndex((item) => item.id === product.id);

      if (productIndex > -1) {
        const productSelected = filteredProducts[productIndex];
        const variantSelected = productSelected.variants.some((item) => item.id === variant.id);

        if (variantSelected) {

          const updatedVariants = productSelected.variants.filter((item) => item.id !== variant.id);

          if (updatedVariants.length === 0) {
            return filteredProducts.filter((item) => item.id !== product.id);
          } else {
            const updatedProduct = { ...productSelected, variants: updatedVariants };
            return [
              ...filteredProducts.slice(0, productIndex),
              updatedProduct,
              ...filteredProducts.slice(productIndex + 1),
            ];
          }
        } else {

          const updatedProduct = {
            ...productSelected,
            variants: [...productSelected.variants, variant],
          };
          return [
            ...filteredProducts.slice(0, productIndex),
            updatedProduct,
            ...filteredProducts.slice(productIndex + 1),
          ];
        }
      } else {
        return [...filteredProducts, { ...product, variants: [variant] }];
      }
    });
  };


  const checkActiveElements = useCallback((id) => {
    let active = false;
    if (products?.length) {
      active = products.some((prod) => prod.id === id)
    }
    return active;
  }, [products]);

  const checkActiveVariants = useCallback((id) => {
    let active = false;
    if (products?.length) {
      active = products.some((prod) =>
        prod.id === id ||
        (prod.variants && prod.variants.some((variant) => variant.id === id))
      );
    }
    return active;
  }, [products]);


  const fetchProductService = async (page, query) => {
    setLoading(true)

   
   const res = await fetchProducts(page, query)
    if (res.status === 200) {
      setProductList((prevList) => [...prevList, ...res.data])
      setTimeout(() => {
      setLoading(false)
      }, 200);
    }
  }


  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1)
  };



  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Products</ModalHeader>
 
        <ModalBody style={{ overflowY: "hidden" }}>

          <div className="border-bottom-custom pb-2">
            <Input
              type="text"
              placeholder="Search for products"
              value={search}
              onChange={handleSearch}
              className="mb-3"
            />
          </div>
          <div
            className="modal-scroll-area"
            ref={modalBodyRef}
            onScroll={handleScroll} >
            <Table className="custom-table w-100" borderless>
              <tbody>
                {productList?.length > 0 && productList?.map((product) => (
                  <>
                    {/* Parent Row */}
                    <tr key={product.id} className="border-bottom-custom">
                      <td>
                        <FormGroup check>
                          <Label check className="d-flex align-items-center">
                            <Input
                              type="checkbox"
                              className="me-2"
                              onChange={() => handleCheckboxes(product)}
                              checked={checkActiveElements(product?.id)}
                            />
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
                      <tr key={variant.id} className="border-bottom-custom">
                        <td colSpan={4}>
                          <div className="ms-5  d-flex justify-content-between">
                            <FormGroup check >
                              <Label check>
                                <Input type="checkbox" onChange={() => handleVariantCheckbox(product, variant)} checked={checkActiveVariants(variant.id)} />
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
     {loading &&
        <div className="d-flex justify-content-center p-4 w-100">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#008060', '#008060', '#008060', '#008060', '#008060']}
          />
        </div>
     }

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
