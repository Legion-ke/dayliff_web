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
  name: "",
  email: "",
  phone: "",
  profession: "",
};

export default function Orders() {
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
      name: "Name",
      selector: (row) => <TextView primary={row.name} />,
    },

    {
      name: "email",
      selector: (row) => <TextView primary={row.email} />,
    },
    {
      name: "Phone Number",
      selector: (row) => <TextView primary={row.phone} />,
    },
    {
      name: "Profession",
      selector: (row) => <TextView primary={row.profession} />,
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
              createField("profession", "Profession", {
                value: formData?.profession,
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
