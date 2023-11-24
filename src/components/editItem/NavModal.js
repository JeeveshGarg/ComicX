import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import useEditStore from "../../store/useEditStore";

const NavModal = ({ open, onClose }) => {
  const metadata = useEditStore((state) => state.metadata);
  const updateMetadata = useEditStore((state) => state.updateMetadata);

  const [form] = Form.useForm();

  useEffect(() => {
    if (metadata) {
      form.setFieldsValue({
        title: metadata.title,
        description: metadata.description,
      });
    }
  }, [metadata, form]);

  const onFinish = (values) => {
    message.warning("Save comic to update comic info");
    updateMetadata({ ...metadata, ...values });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      visible={open}
      onCancel={handleCancel}
      onOk={form.submit}
      title="Edit Comic Info"
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NavModal;
