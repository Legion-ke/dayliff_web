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
  rconfirmation_id: "",
  order_id: "",
  rconfirmation_date:"",
  recipient_name: "",
  signature_image:"",
  order_image: "",
  comments:" ",
};

export default function ReturnConfirmation() {
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
      rconfirmation_id: row.rconfirmation_id,
      order_id: row.order_id,
      rconfirmation_date: row.rconfirmation_date,
      receipient_name: row.recipient_name,
      signature_image: row.signature_image,
      order_image: row.order_image,
      comments: row.comments,
      

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
        name: "Return ID",
        selector: (row) => <TextView primary={row.rconfirmation_id} />,
    },
    {
        name: "OrderNo",
        selector: (row) => <TextView primary={row.name} />,
    },
    {
        name: "Confrimation Date",
        selector: (row) => <TextView primary={row.rconfirmation_date} />,
    },
    {
        name: "Recipient Name",
        selector: (row) => <TextView primary={row.recipient_name} />,
    },
    {
        name: "Signature Image",
        selector: (row) => <TextView primary={row.signature_image} />,
    },
    {
        name: "Order Image",
        selector: (row) => <TextView primary={row.order_image} />,

    },
    {
        name: "Comments",
        selector: (row) => <TextView primary={row.comments} />,
    },
    {
        name: "Created At",
        selector: (row) => <TextView primary={row.create_at} />,
    },
    {
        name: "Update At",
        selector: (row) => <TextView primary={row.update_at} />,
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
            children: "Confirm Return",
            onClick: handleNew,
          },
        ]}
      />
      <Modal
        open={open}
        onClose={toggleModal}
        title={`${selected ? "Edit" : "Confrim"} Return`}
        size="large"
      >
        <form onSubmit={onSubmit}>
          <FieldRender
            fields={[
              createField("rconfirmation_id:", "Return ID", {
                value: formData?.name,
              }),
              createField("order_id", "Order ID", {
                value: formData?.name,
              }),
              createField("rconfirmation_date", "Confirmation Date", {
                value: formData?.name,
              }),
              createField("recipient_name", "Recipient Name", {
                value: formData?.name,
              }),
              createField("signature_image", "signature Image", {
                value: formData?.name,
              }),
              createField("order_image", "Order Image", {
                value: formData?.name,
              }),
              createField("comments", "Comment", {
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
