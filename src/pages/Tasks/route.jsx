import { CButton, Modal, Table, useAlerts } from "ochom-react-components";
import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableMenus } from "ochom-react-components";
import { actionProps } from "../../common/actions-props";
import { useState } from "react";
import { TextView } from "../../common/text-view";
import { SmoothBox } from "../../common/styled";
import { useModal } from "../../app/utils";
import { useAPI } from "../../hooks/useAPI";
import { FieldRender, useFormData } from "../../components/forms";
import { Chip, Stack, TextField } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const initForm = {
  distance_in_km: "",
  estimated_duration_minutes: "",
  destination_address: null,
  origin_address: null,
};

export default function Directions() {
  const { confirm, alertError, alertSuccess } = useAlerts();
  const {
    data: routes,
    loading,
    error,
    put,
    del,
    post,
    refetch,
  } = useAPI("/routes");
  console.log("am orders: ", routes);

  const { createField, formData, setFormData } = useFormData(initForm);
  const [open, toggleModal] = useModal();
  const [selected, setSelected] = useState(null);

  const handleClose = () => {
    toggleModal();
  };

  const handleNew = () => {
    setSelected(null);
    setFormData(initForm);
    toggleModal();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "success";
      case "processing":
        return "info";
      default:
        return "warning";
    }
  };

  const deleteData = (id) => {
    del(`/husers/${id}`)
      .then(() => {
        alertSuccess(`staff deleted successfully`);
        refetch();
      })
      .catch((err) => {
        alertError(err.message);
      });
  };

  const handleEdit = (row) => {
    setSelected(row);
    setFormData({
      name: row.name,
      email: row.email,
      phone: row.phone,
      profession: row.profession,
    });
    toggleModal();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData };
    if (selected) {
      updateData({ variables: { id: selected.id, data } });
    } else {
      createData({ variables: { data } });
    }
  };

  const updateData = () => {
    const data = { ...formData };

    put(`/husers/${selected.id}`, data)
      .then(() => {
        alertSuccess(`User updated successfully`);
        toggleModal();
        refetch();
      })
      .catch((err) => {
        alertError(err.message);
      });
  };
  const createData = () => {
    post(`/routes`, formData)
      .then(() => {
        alertSuccess(`Route created successfully`);
        toggleModal();
        refetch();
      })
      .catch((err) => {
        alertError(err.message);
      });
  };

  const deleteVendor = (row) => {
    confirm({
      title: "Delete user!",
      message: "Are you sure you want to delete this User?",
      onConfirm: () => {
        deleteData(row.id);
      },
    });
  };

  let dropMenuOptions = [
    {
      title: "Edit",
      action: (row) => handleEdit(row),
      icon: <Edit fontSize="small" color="success" />,
    },
    {
      title: "Delete",
      action: deleteVendor,
      icon: <DeleteIcon fontSize="small" color="error" />,
    },
  ];

  const columns = [
    {
      name: "Route ID",
      selector: (row) => <TextView primary={row.route_id} />,
    },
    {
      name: "Driver",
      selector: (row) => <TextView primary={row.name} />,
    },
    {
      name: "Origin Address",
      selector: (row) => (
        <TextView
          primary={row.origin_address.lat}
          secondary={row.origin_address.long}
        />
      ),
    },
    {
      name: "Destination address",
      selector: (row) => (
        <TextView
          primary={row.destination_address.lat}
          secondary={row.destination_address.long}
        />
      ),
    },
    {
      name: "Distance(km)",
      selector: (row) => <TextView primary={row.distance_in_km} />,
    },
    {
      name: "Estimate Duration(min)",
      selector: (row) => <TextView primary={row.estimated_duration_minutes} />,
    },
    {
      name: "Status",
      selector: () => (
        <Chip
          label="delivery"
          color={getStatusColor("delivery")}
          size=""
          variant="outlined"
        />
      ),
    },
    {
      selector: (row) => <TableMenus options={dropMenuOptions} row={row} />,
      ...actionProps,
    },
  ];

  const [position, setPosition] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [address, setAddress] = useState("");

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    setSelectedLocation({ latitude: lat, longitude: lng });
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const calculateDistance = () => {
    // You can calculate the distance between two points (selectedLocation and another location) here using geolib.
    // For demonstration, let's calculate the distance to a hardcoded point.
    const otherLocation = { latitude: 51.5, longitude: 0 };
    const distance = getDistance(selectedLocation, otherLocation);
    alert(`Distance: ${distance} meters`);
  };
  return (
    <SmoothBox>
      <Table
        sx={{ p: 3 }}
        loading={loading}
        error={error}
        columns={columns}
        data={routes}
        showSearch
        onRowClicked={handleEdit}
        buttons={[
          {
            children: "New Route",
            onClick: handleNew,
          },
        ]}
      />
      <Modal
        open={open}
        onClose={toggleModal}
        title={`${selected ? "Edit" : "New"} Route`}
        size="large"
      >
        <form onSubmit={onSubmit}>
          <MapContainer
            center={[51.505, -0.09]} // Initial map center
            zoom={13}
            style={{ height: "400px", width: "100%" }}
            onClick={handleMapClick}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {position && (
              <Marker position={position}>
                <Popup>Your selected location</Popup>
              </Marker>
            )}
          </MapContainer>
          <TextField
            label="Address"
            variant="outlined"
            value={address}
            onChange={handleAddressChange}
            style={{ marginTop: "10px" }}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 3 }}
            justifyContent="space-between"
          >
            <CButton onClick={() => handleClose()} variant="outlined">
              Cancel
            </CButton>
            <CButton type="submit">Submit</CButton>
          </Stack>
        </form>
      </Modal>
    </SmoothBox>
  );
}
