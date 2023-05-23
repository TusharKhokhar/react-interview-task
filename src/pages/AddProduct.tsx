import { useState } from "react";
import "./AddProducts.css";
import { Alert, AlertColor } from "@mui/material";
import { useParams } from "react-router-dom";

const AddProduct = () => {
  const initialState = {
    productName: "",
    productPrice: "",
    productPhoto: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState<any>(null);
  const params = useParams();
  const { id: productId } = params;

  const [showAlert, setShowAlert] = useState<{
    message: string;
    type: AlertColor | undefined;
  }>({
    message: "",
    type: undefined,
  });

  function getExtension(fileName: string) {
    return /[.]/.exec(fileName)
      ? /[^.]+$/.exec(fileName)?.[0].toLowerCase()
      : undefined;
  }

  const onChange = (e: any) => {
    if (e.target.name === "productPhoto") {
      const ALLOWED_FILE_EXTENSIONS = ["jpg", "jpeg", "png"];
      const extension: any = getExtension(e.target.files[0].name);
      if (ALLOWED_FILE_EXTENSIONS.indexOf(extension) === -1) {
        setError({
          has_error: true,
          message:
            "Invalid file type. (supported file types are .jpg, .jpeg and .png)",
          field: "productPhoto",
        });
      }
    } else if (e.target.name === "productPrice") {
      const regex = /^[0-9\b]+$/;
      if (regex.test(e.target.value) || e.target.value.trim().length === 0) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value.trim().length
            ? parseInt(e.target.value)
            : "",
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validateForm = () => {
    if (!formData.productName.trim().length) {
      return {
        has_error: true,
        message: "This is required field",
        field: "productName",
      };
    }
    if (!formData.productPrice) {
      return {
        has_error: true,
        message: "This is required field",
        field: "productPrice",
      };
    }
    if (!formData.productPhoto) {
      return {
        has_error: true,
        message: "This is required field",
        field: "productPhoto",
      };
    }

    return { has_error: false, error: null, field: null };
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { has_error, message, field }: any = validateForm();
    if (has_error) {
      setError({ message, field });
      return;
    }
    setShowAlert({
      message: "Product added successfully",
      type: "success",
    });
    setFormData(initialState);
    setTimeout(() => {
      setShowAlert({
        message: "",
        type: undefined,
      });
    }, 3000);
  };

  return (
    <div>
      {showAlert.message && (
        <Alert
          severity={showAlert.type}
          onClose={() =>
            setShowAlert({
              message: "",
              type: undefined,
            })
          }
        >
          {showAlert.message}
        </Alert>
      )}
      <h2>{productId ? "Edit Product" : "Add Product"}</h2>
      <form>
        <div className="form-fieldset">
          <label className="form-label" htmlFor="productName">
            Product Name
          </label>
          <input
            placeholder="Enter Product Name"
            className="form-input"
            id="productName"
            type="text"
            name="productName"
            value={formData.productName}
            onChange={onChange}
          />
          {error && error.field && error.field === "productName" && (
            <span className="error-field">{error.message}</span>
          )}
        </div>
        <div className="form-fieldset">
          <label className="form-label" htmlFor="productPrice">
            Product Price
          </label>
          <input
            placeholder="Enter Product Price"
            className="form-input"
            id="productPrice"
            type="text"
            name="productPrice"
            value={formData.productPrice}
            onChange={onChange}
          />
          {error && error.field && error.field === "productPrice" && (
            <span className="error-field">{error.message}</span>
          )}
        </div>
        <div className="form-fieldset">
          <label className="form-label" htmlFor="productPhoto">
            Product Photo
          </label>
          <input
            type="file"
            id="productPhoto"
            name="productPhoto"
            accept="image/*"
            value={formData.productPhoto}
            onChange={onChange}
          />
          {error && error.field && error.field === "productPhoto" && (
            <span className="error-field">{error.message}</span>
          )}
        </div>
        <button className="submit-btn" type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
