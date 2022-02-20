import React, { useEffect } from "react";
import { Button, Select, Input, Label } from "../../index";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { Row, Col } from "antd";

export default function AddLink({ onFinish, onBack }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      http: { value: "https://www.", label: "https://www." },
      domain: { value: ".com", label: ".com" },
    });
  }, [form]);

  const selectBeforeLink = (
    <Form.Item
      name="http"
      rules={[{ required: true, message: "Please Select" }]}
    >
      <Select
        initialvalues="https://"
        className="select-before"
        allowClear={false}
        options={[
          { value: "http://www.", label: "http://www." },
          { value: "https://www.", label: "https://www." },
        ]}
      />
    </Form.Item>
  );

  const selectAfterLink = (
    <Form.Item
      name="domain"
      rules={[{ required: true, message: "Please Select" }]}
    >
      <Select
        initialvalues="com"
        className="select-after"
        allowClear={false}
        options={[
          { value: ".com", label: ".com" },
          { value: ".com.tr", label: ".com.tr" },
          { value: ".org", label: ".org" },
          { value: ".net", label: ".net" },
        ]}
      />
    </Form.Item>
  );

  return (
    <>
      <Row justify="center" className="add-link">
        <Col xs={23} md={24}>
          <Button
            label="Return to List"
            type="link"
            position="left"
            onClick={onBack}
            icon={<ArrowLeftOutlined />}
          />
        </Col>
        <Col xs={23} md={24}>
          <Label label="Add New Link" type="h1" />
        </Col>
        <Col xs={23} md={24}>
          <Form
            name="basic"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Link Name"
              name="linkName"
              rules={[{ required: true, message: "Please enter link Name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Link URL"
              name="linkURL"
              rules={[{ required: true, message: "Please enter link URL!" }]}
            >
              <Input
                addonBefore={selectBeforeLink}
                addonAfter={selectAfterLink}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" label="ADD" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
