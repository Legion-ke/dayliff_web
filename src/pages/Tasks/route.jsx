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
import { Chip, Stack } from "@mui/material";

const initForm = {
  orderNo: "",
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

  const deleteData = (id) => {
    del(`/husers/${id}`)
      .then(() => {
        alertSuccess(`route deleted successfully`);
        refetch();
      })
      .catch((err) => {
        alertError(err.message);
      });
  };

  const handleEdit = (row) => {
    setSelected(row);
    setFormData({
      route_id: row.route_id,
      driver_id: row.driver_id,
      route_name: row.route_name,
      origin_address: row.origin_address,
      destination_address: row.destination_address,
      distance_in_km:row.distance_in_km,
      estimated_duration_minutes:row.estimated_duration_minutes,
      status:row.status,
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
        alertSuccess(`route updated successfully`);
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
      title: "Delete Route!",
      message: "Are you sure you want to delete this route?",
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
      name: "Driver ID",
      selector: (row) => <TextView primary={row.driver_id} />,
    },
    {
      name: "Origin Address",
      selector: (row) => <TextView primary={row.name} />,
    },
    {
      name: "Destination address",
      selector: (row) => <TextView primary={row.name} />,
    },
    {
      name: "Distance(km)",
      selector: (row) => <TextView primary={row.name} />,
    },
    {
      name: "Estimate Duration(min)",
      selector: (row) => <TextView primary={row.name} />,
    },
    {
      name: "Status",
      selector: (row) => <TextView primary={row.status} />,
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
          <FieldRender
            fields={[
              createField("name", "Name", {
                value: formData?.name,
              }),
            ]}
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
