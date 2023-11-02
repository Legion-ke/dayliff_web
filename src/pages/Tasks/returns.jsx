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
import { Stack } from "@mui/material";

const initForm = {
  order_id: "",
  customer_name: "",
  customer_phone: "",
  return_date: "",
  delivery_date: "",
  destination_address: "",
  return_status: " ",
  route_id: "",
};

export default function Returns() {
  const { confirm, alertError, alertSuccess } = useAlerts();
  const {
    data: users,
    loading,
    error,
    put,
    del,
    post,
    refetch,
  } = useAPI("/husers");
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
        alertSuccess(`return deleted successfully`);
        refetch();
      })
      .catch((err) => {
        alertError(err.message);
      });
  };

  const handleEdit = (row) => {
    setSelected(row);
    setFormData({
      order_id: row.order_id,
      customer_name: row.customer_name,
      customer_phone: row.customer_phone,
      return_date: row.return_date,
      delivery_date: row.delivery_date,
      destination_address: row.destination_address,
      return_status: row.return_status,
      route_id: row.route_id,
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
        alertSuccess(`Return updated successfully`);
        toggleModal();
        refetch();
      })
      .catch((err) => {
        alertError(err.message);
      });
  };
  const createData = () => {
    post(`/husers`, formData)
      .then(() => {
        alertSuccess(`Return created successfully`);
        toggleModal();
        refetch();
      })
      .catch((err) => {
        alertError(err.message);
      });
  };

  const deleteVendor = (row) => {
    confirm({
      title: "Delete Return!",
      message: "Are you sure you want to delete this Return?",
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
      name: "Order ID",
      selector: (row) => <TextView primary={row.order_id} />,
    },
    {
      name: "Customer Phone",
      selector: (row) => <TextView primary={row.customer_phone} />,
    },
    {
      name: "Return Date",
      selector: (row) => <TextView primary={row.return_date} />,
    },
    {
      name: "Delivery Date",
      selector: (row) => <TextView primary={row.delivery_date} />,
    },
    {
      name: "Destination Address",
      selector: (row) => <TextView primary={row.destination_address} />,
    },
    {
      name: "Status",
      selector: (row) => <TextView primary={row.return_status} />,
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
        data={users.products}
        showSearch
        onRowClicked={handleEdit}
        buttons={[
          {
            children: "New Return",
            onClick: handleNew,
          },
        ]}
      />
      <Modal
        open={open}
        onClose={toggleModal}
        title={`${selected ? "Edit" : "New"} Return`}
        size="large"
      >
        <form onSubmit={onSubmit}>
          <FieldRender
            fields={[
              createField("order_ID:", "Order ID", {
                value: formData?.name,
              }),
              createField("customer_name", "Customer Name", {
                value: formData?.name,
              }),
              createField("customer_phone", "Customer Phone", {
                value: formData?.name,
              }),
              createField("return_date", "Return Date", {
                value: formData?.name,
              }),
              createField("delivery_date", "Delivery Date", {
                value: formData?.name,
              }),
              createField("destination_address", "Destination Address", {
                value: formData?.name,
              }),
              createField("return_status", "Return Status", {
                value: formData?.name,
              }),
              createField("route_id", "Route ID", {
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
