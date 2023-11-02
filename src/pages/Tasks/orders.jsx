/* eslint-disable no-undef */
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
import moment from "moment/moment";

const initForm = {
  customer_name: "",
  customer_phone: "",
  order_status: null,
  delivery_date: "",
  destination_address: null,
  route_id: null,
};
const statusType = [
  { value: "PENDING", label: "Pending" },
  { value: "TRANSIT", label: "Transit" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "PARTIAL", label: "Partial" },
];
export default function Orders() {
  const { confirm, alertError, alertSuccess } = useAlerts();
  const {
    data: orders,
    loading,
    error,
    put,
    del,
    post,
    refetch,
  } = useAPI("/orders");
  console.log("orders: ", orders);
  const { createField, formData, setFormData } = useFormData(initForm);
  const [open, toggleModal] = useModal();
  const [selected, setSelected] = useState(null);
  console.log("selected: ", selected);

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
      customer_name: row.customer_name,
      customer_phone: row.customer_phone,
      order_status: null,
      delivery_date: row.delivery_date,
      destination_address: row.destination_address,
      route_id: null,
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

  const statusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      order_status: e.target.value,
    }));
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
    post(`/husers`, formData)
      .then(() => {
        alertSuccess(`User created successfully`);
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
      name: "OrderNo",
      selector: (row) => <TextView primary={row.id} />,
    },
    {
      name: "Order Image",
      selector: () => <img src="/davis.png" alt="" />,
    },
    {
      name: "Customer",
      selector: (row) => (
        <TextView primary={row.customer_name} secondary={row.customer_phone} />
      ),
    },

    {
      name: "Destination Address",
      selector: (row) => (
        <TextView
          primary={row.destination_address.long}
          secondary={row.destination_address.lat}
        />
      ),
    },
    {
      name: "Route",
      selector: (row) => <TextView primary={row.route_id} />,
    },
    {
      name: "Order Date",
      selector: (row) => (
        <TextView primary={moment(row.created_at).format("DD/MM/YYYY")} />
      ),
    },
    {
      name: "Delivery date",
      selector: (row) => (
        <TextView primary={moment(row.delivery_date).format("DD/MM/YYYY")} />
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <Chip
          label={row.order_status.toUpperCase}
          color={getStatusColor(row.order_status)}
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
        data={orders.orders}
        showSearch
        onRowClicked={handleEdit}
        buttons={[
          {
            children: "New Order",
            onClick: handleNew,
          },
        ]}
      />
      <Modal
        open={open}
        onClose={toggleModal}
        title={`${selected ? "Edit" : "New"} Order`}
        size="large"
      >
        <form onSubmit={onSubmit}>
          <FieldRender
            fields={[
              createField("customer_name", "Customer Name", {
                value: formData?.customer_name,
              }),
              createField("customer_phone", "Customer Phone ", {
                value: formData?.customer_phone,
              }),

              createField(`order_status`, "Order Status", {
                type: "select",
                grow: { xs: 6 },
                options: statusType.map((t) => ({
                  ...t,
                  value: t.value,
                  label: t.label,
                })),
                value: formData?.order_status,
                onChange: (e) => statusChange(e),
              }),
              createField("delivery_date", "Deliver Date", {
                type: "date-time",
                grow: { xs: 6 },

                value: formData?.delivery_date,
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
