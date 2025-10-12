import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/common";
import { addAddressAPI } from "../../api/userInfo";
import { saveAddress } from "../../store/features/user";

const AddAddress = ({ onCancel }) => {
  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    street: "",
    country: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(setLoading(true));
      setError("");
      addAddressAPI(values)
        .then((res) => {
          dispatch(saveAddress(res));
          onCancel && onCancel();
        })
        .catch(() => setError("Address was not added."))
        .finally(() => dispatch(setLoading(false)));
    },
    [dispatch, onCancel, values]
  );

  const handleOnChange = useCallback((e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full">
      <h2 className="text-2xl font-semibold mb-4">Add New Address</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleOnChange}
          placeholder="Full Name"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleOnChange}
          placeholder="Phone Number"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="text"
          name="street"
          value={values.street}
          onChange={handleOnChange}
          placeholder="Street Address"
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            value={values.city}
            onChange={handleOnChange}
            placeholder="City"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="text"
            name="state"
            value={values.state}
            onChange={handleOnChange}
            placeholder="State"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="country"
            value={values.country}
            onChange={handleOnChange}
            placeholder="Country"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="text"
            name="pincode"
            value={values.pincode}
            onChange={handleOnChange}
            placeholder="Pincode"
            className="border rounded-lg p-3 focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Save
          </button>
        </div>
      </form>
      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
};

export default AddAddress;
