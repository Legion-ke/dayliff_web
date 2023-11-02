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
  first_name: "",
  last_name: "",
  email: "",
  status: null,
  phone_number: "",
  role: null,
};

const statusType = [
  { value: "active", label: "Active" },
  { value: "inActive", label: "Inactive" },
];

const roleType = [
  { value: "admin", label: "Admin" },
  { value: "driver", label: "Driver" },
];

export default function Users() {
  const { confirm, alertError, alertSuccess } = useAlerts();
  const {
    data: users,
    loading,
    error,
    put,
    del,
    post,
    refetch,
  } = useAPI("/users");
  console.log("users: ", users);
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
      case "active":
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
      name: "User ID",
      selector: (row) => <TextView primary={row.user_id} />,
    },
    {
      name: "Name",
      selector: (row) => (
        <TextView primary={row.first_name} secondary={row.last_name} />
      ),
    },
    {
      name: "email",
      selector: (row) => <TextView primary={row.email} />,
    },
    {
      name: "Phone Number",
      selector: (row) => <TextView primary={row.phone_number} />,
    },
    {
      name: "Role",
      selector: (row) => <TextView primary={row.role} />,
    },
    {
      name: "Status",
      selector: (row) => (
        <Chip
          label={row.status.toUpperCase()}
          color={getStatusColor(row.status)}
          size="small"
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
        data={users}
        showSearch
        onRowClicked={handleEdit}
        buttons={[
          {
            children: "New User",
            onClick: handleNew,
          },
        ]}
      />
      <Modal
        open={open}
        onClose={toggleModal}
        title={`${selected ? "Edit" : "New"} User`}
        size="large"
      >
        <form onSubmit={onSubmit}>
          <FieldRender
            fields={[
              createField("name", "Name", {
                value: formData?.name,
              }),
              createField("email", "Email", {
                value: formData?.email,
              }),
              createField("phone", "Phone Number", {
                value: formData?.phone,
              }),
              createField("role", "Role", {
                type: "select",
                grow: { xs: 6 },
                options: roleType.map((t) => ({
                  ...t,
                  value: t.value,
                  label: t.label,
                })),
                value: formData?.role,
              }),
              createField("status", "Status", {
                type: "select",
                grow: { xs: 6 },
                options: statusType.map((t) => ({
                  ...t,
                  value: t.value,
                  label: t.label,
                })),
                value: formData?.role,
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
