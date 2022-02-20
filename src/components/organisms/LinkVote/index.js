import React, { useEffect, useRef, useState } from "react";
import {
  CardLink,
  Button,
  Select,
  Divider,
  Pagination,
  Empty,
} from "../../index";
import { PlusOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";

import "./styles.css";
const LinkVote = ({
  setPoint,
  onPaginationChange,
  data = [],
  onDeleteLink,
  onChangeFilter,
  totalCount = 0,
  clickSubmitLink,
  page = 1,
}) => {
  return (
    <>
      <Button
        onClick={clickSubmitLink}
        label="SUBMIT A LINK"
        icon={<PlusOutlined />}
      />
      <Divider />
      {data?.length > 0 && (
        <Select
          size="md"
          optionValKey="value"
          optionLabelKey="name"
          onChange={onChangeFilter}
          placeholder="Order By"
          options={[
            { name: "Most Voted (A - Z)", value: 2 },
            { name: "Less Voted (Z - A)", value: 1 },
          ]}
        />
      )}

      {data?.length > 0 ? (
        data?.map((link) => (
          <CardLink
            onDeleteLink={() => onDeleteLink(link)}
            up={() => setPoint(link, true)}
            down={() => link?.point > 0 && setPoint(link, false)}
            key={`${link?.id}${link?.linkName}`}
            point={link?.point}
            head={link?.linkName}
            head2={`(${link?.linkURL})`}
          />
        ))
      ) : (
        <Empty />
      )}
      {totalCount > 0 && (
        <Row justify="center">
          <Pagination
            defaultPageSize={5}
            onChange={onPaginationChange}
            defaultCurrent={1}
            total={totalCount}
            current={page}
          />
        </Row>
      )}
    </>
  );
};

export default LinkVote;
