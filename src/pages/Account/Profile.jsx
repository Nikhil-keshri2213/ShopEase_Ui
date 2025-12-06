import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { removeAddress, selectUserInfo } from "../../store/features/user.js";
import AddAddress from "./AddAddress.jsx";
import { setLoading } from "../../store/features/common.js";
import { deleteAddressAPI, updateAddressAPI } from "../../api/userInfo.jsx";

const Profile = () => {
  const customStyles = {
    content: {
      width: "500px",
      maxHeight: "550px",
      margin: "auto",
      borderRadius: "12px",
      padding: "24px",
      overflowY: "auto",
    },
  };

  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [addAddress, setAddAddress] = useState(false);

  // Modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  // Delete address
  const onDeleteAddress = useCallback(
    (id) => {
      dispatch(setLoading(true));
      deleteAddressAPI(id)
        .finally(() => dispatch(setLoading(false)))
        .then(() => dispatch(removeAddress(id)));
    },
    [dispatch]
  );

  // Open modal for editing specific address
  const openModal = (address) => {
    setFormData({ ...address });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated address via API
  const handleSave = async () => {
    try {
      dispatch(setLoading(true));
      await updateAddressAPI(formData.id, formData);
      closeModal();
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {!addAddress ? (
        <div className="space-y-8">
          {/* Contact Details */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Contact Details</h2>
              <button className="text-blue-600 hover:underline">Edit</button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="font-medium">
                  {userInfo?.firstName} {userInfo?.lastName}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Phone Number</p>
                <p className="font-medium">{userInfo?.phoneNumber ?? "None"}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">{userInfo?.email}</p>
              </div>
            </div>
          </div>

          {/* Address List */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Saved Addresses</h2>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setAddAddress(true)}
              >
                Add New
              </button>
            </div>

            {userInfo?.addressList?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userInfo.addressList.map((address) => (
                  <div
                    key={address?.id}
                    className="border rounded-lg p-4 shadow-sm bg-gray-50"
                  >
                    <p className="font-bold">{address?.name}</p>
                    <p>{address?.phoneNumber}</p>
                    <p>
                      {address?.street}, {address?.city}, {address?.state},{" "}
                      {address?.country}
                    </p>
                    <p>{address?.pincode}</p>

                    <div className="flex gap-4 mt-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => openModal(address)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteAddress(address?.id)}
                        className="text-red-600 hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6">No Address Found</p>
            )}
          </div>
        </div>
      ) : (
        <AddAddress onCancel={() => setAddAddress(false)} />
      )}

      {/* Edit Address Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Update Address"
      >
        <h2 className="text-lg font-semibold mb-4">Update Address</h2>
        <hr className="h-[1px] bg-gray-300 mb-4" />
        <div className="flex flex-col gap-3">
          <label className="text-[12px] text-slate-500">Flat/ Apartment/ House Name</label>
          <input
            className="border p-2 rounded"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <label className="text-[12px] text-slate-500">Street</label>
          <input
            className="border p-2 rounded"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
          />

          <label className="text-[12px] text-slate-500">City</label>
          <input
            className="border p-2 rounded"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />

          <label className="text-[12px] text-slate-500">State</label>
          <input
            className="border p-2 rounded"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />

          <label className="text-[12px] text-slate-500">Country</label>
          <input
            className="border p-2 rounded"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />

          <label className="text-[12px] text-slate-500">Pincode</label>
          <input
            className="border p-2 rounded"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button className="px-4 py-2 border rounded-lg" onClick={closeModal}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-lg" onClick={handleSave}>
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
