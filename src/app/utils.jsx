import Axios from "axios";
import { useState } from "react";

export const catchAxiosError = (error) => {
  if (Axios.isCancel(error)) {
    return new Error("request cancelled");
  }

  if (error.response) {
    return new Error(
      error.response.data?.message ||
        error.response.data ||
        "Something went wrong"
    );
  }

  if (error.request) {
    return new Error("Something went wrong");
  }

  return error;
};

export const formatCount = (count) =>
  count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const cutText = (text, size) => {
  if (!text) return "";
  if (text.length <= size) return text;

  return text.substring(0, size) + "...";
};

export const formatClass = (classroom) => {
  return `${classroom?.level} ${classroom?.stream}`;
};

export const formatName = (user) => {
  return `${user?.firstName} ${user?.lastName}`;
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return [isOpen, toggleModal];
};

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const field = (name, label, options = []) => {
    return {
      name,
      label,
      value: formData[name],
      onChange,
      options: options.map((e) => ({ label: e, value: e })),
    };
  };

  return { field, formData, setFormData, onChange };
};
