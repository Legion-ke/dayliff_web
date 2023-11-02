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
import { useFormData } from "../../components/forms";
import { Box, Chip, MenuItem, Paper, Stack, TextField } from "@mui/material";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

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
  console.log("routes: ", routes);

  const { formData, setFormData } = useFormData(initForm);
  const [open, toggleModal] = useModal();
  const [selected, setSelected] = useState(null);

  const convertToJson = (destinationAddress) => {
    try {
      const destinationJSON = JSON.parse(destinationAddress);
      return destinationJSON;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

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

  const [originAddress, setOriginAddress] = useState({
    lat: null,
    lng: null,
    placeName: "",
  });
  const [destinationAddress, setDestinationAddress] = useState({
    lat: null,
    lng: null,
    placeName: "",
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setOriginAddress({
      lat: latLng.lat,
      lng: latLng.lng,
      placeName: results[0].formatted_address,
    });
  };

  const handleDestinationSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setDestinationAddress({
      lat: latLng.lat,
      lng: latLng.lng,
      placeName: results[0].formatted_address,
    });
  };

  let calculateDistanceAndDuration = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371;
    const radLat1 = (lat1 * Math.PI) / 180;
    const radLon1 = (lon1 * Math.PI) / 180;
    const radLat2 = (lat2 * Math.PI) / 180;
    const radLon2 = (lon2 * Math.PI) / 180;

    const latDiff = radLat2 - radLat1;
    const lonDiff = radLon2 - radLon1;
    const a =
      Math.sin(latDiff / 2) ** 2 +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance in kilometers
    const distanceInKm = earthRadius * c;

    // Calculate estimated duration in minutes (you can adjust this based on your use case)
    const estimatedDurationMinutes = distanceInKm * 12; // Adjust the factor as needed
    return {
      distanceInKm,
      estimatedDurationMinutes,
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // const data = { ...formData };
    if (selected) {
      // updateData({ variables: { id: selected.id, data } });
    } else {
      const { distanceInKm, estimatedDurationMinutes } =
        calculateDistanceAndDuration(
          originAddress.lat,
          originAddress.lng,
          destinationAddress.lat,
          destinationAddress.lng
        );
      console.log("distanceInKm: ", distanceInKm);
      let data = {
        distance_in_km: distanceInKm,
        estimated_duration_minutes: estimatedDurationMinutes,
        destination_address: {
          lat: destinationAddress.lat,
          long: destinationAddress.lng,
        },
        origin_address: {
          lat: originAddress.lat,
          long: originAddress.lng,
        },
      };

      createData(data);
    }
  };

  // const updateData = () => {
  //   const data = { ...formData };

  //   put(`/husers/${selected.id}`, data)
  //     .then(() => {
  //       alertSuccess(`User updated successfully`);
  //       toggleModal();
  //       refetch();
  //     })
  //     .catch((err) => {
  //       alertError(err.message);
  //     });
  // };
  const createData = (data) => {
    console.log(data);
    // post(`/routes`, formData)
    //   .then(() => {
    //     alertSuccess(`Route created successfully`);
    //     toggleModal();
    //     refetch();
    //   })
    //   .catch((err) => {
    //     alertError(err.message);
    //   });
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
      selector: (row) => <TextView primary={row.id} />,
    },
    {
      name: "Route Name",
      selector: (row) => <TextView primary={row.route_name} />,
    },
    {
      name: "Driver",
      selector: (row) => <TextView primary={row.driver_id} />,
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

  return (
    <SmoothBox>
      <Table
        sx={{ p: 3 }}
        loading={loading}
        error={error}
        columns={columns}
        data={routes.routes}
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
          <Box sx={{ pb: 2 }}>
            <PlacesAutocomplete
              value={originAddress.placeName}
              onChange={(value) => setOriginAddress({ placeName: value })}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <TextField
                    label="Origin address"
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      style: { width: "100%" },
                    })}
                  />
                  <Paper>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                      };
                      return (
                        <MenuItem
                          key={index}
                          {...getSuggestionItemProps(suggestion, { style })}
                        >
                          {suggestion.description}
                        </MenuItem>
                      );
                    })}
                  </Paper>
                </div>
              )}
            </PlacesAutocomplete>
          </Box>
          <Box>
            <PlacesAutocomplete
              value={destinationAddress.placeName}
              onChange={(value) => setDestinationAddress({ placeName: value })}
              onSelect={handleDestinationSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <>
                  <TextField
                    label="Destination address"
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      style: { width: "100%" },
                    })}
                  />
                  <Paper>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                      };
                      return (
                        <MenuItem
                          key={index}
                          {...getSuggestionItemProps(suggestion, { style })}
                        >
                          {suggestion.description}
                        </MenuItem>
                      );
                    })}
                  </Paper>
                </>
              )}
            </PlacesAutocomplete>
          </Box>

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
