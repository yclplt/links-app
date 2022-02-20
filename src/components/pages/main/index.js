import React, { useEffect, useState } from "react";
import { Header, LinkVote, Confirm, Alert } from "../../index";
import AddLink from "./addLink";
import useLocalStorage from "./../../../hooks/useLocalStorage";
import { Row, Col } from "antd";

export default function Main() {
  const [links, setLinks] = useLocalStorage("links");
  const [linkList, setLinkList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(null);
  const [isSubmitLink, setIsSubmitLink] = useState(false);
  const PER_PAGE = 5;

  const onFinish = (values) => {
    const FormData = {
      linkName: values?.linkName,
      linkURL: `${values?.http?.value}${values?.linkURL}${values?.domain?.value}`,
      point: 0,
      id: links?.length ? links?.length + 1 : 1,
      createdDate: new Date(),
    };

    if (links) {
      setLinks([...links, FormData]);
    } else {
      setLinks([FormData]);
    }

    Alert({
      type: "success",
      description: `${values?.linkName} added.`,
    });
    setIsSubmitLink(false);
  };

  const setPoint = (item, increase) => {
    const oldList = [...links];
    const currentIndex = oldList?.indexOf(item);
    oldList[currentIndex].point = increase
      ? oldList?.[currentIndex]?.point + 1
      : oldList?.[currentIndex]?.point - 1;

    setLinks(oldList);

    let sortedData;
    if (filter) {
      if (filter === 1) {
        sortedData = setSorter(links, "point", "createdDate", false);
      }
      if (filter === 2) {
        sortedData = setSorter(links, "point", "createdDate", true);
      }
    } else {
      sortedData = links.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    }

    if (links?.length > 0) {
      const indexOfLastLink = currentPage * PER_PAGE;
      const indexOfFirstlink = indexOfLastLink - PER_PAGE;
      const currentLink = sortedData?.slice(indexOfFirstlink, indexOfLastLink);
      setLinkList(currentLink);
    }

    //onPaginationChange(currentPage);
  };

  useEffect(() => {
    if (links?.length > 0) {
      onPaginationChange(1, false);
    }
  }, [links?.length]);

  const onPaginationChange = (page, filterMode) => {
    setCurrentPage(page);
    let sortedDate;
    if (!filterMode) {
      sortedDate = links?.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    } else {
      sortedDate = links;
    }

    if (links?.length > 0) {
      const indexOfLastLink = page * PER_PAGE;
      const indexOfFirstlink = indexOfLastLink - PER_PAGE;
      const currentLink = sortedDate?.slice(indexOfFirstlink, indexOfLastLink);
      setLinkList(currentLink);
    }
  };

  const onDeleteLink = (item) => {
    Confirm({
      okText: "OK",
      cancelText: "CANCEL",
      type: "danger",
      title: "Remove Item",
      description: `Do you want to remove: ${item?.linkName}`,
      onCheck: () => {
        const currentIndex = links?.indexOf(item);
        const fetchLink = removeItemWithSlice(currentIndex, links);
        setLinks(fetchLink);
        const currentListIndex = linkList?.indexOf(item);
        const fetchListLink = removeItemWithSlice(currentListIndex, linkList);
        setLinkList(fetchListLink);
        Alert({
          type: "success",
          description: ` ${item?.linkName} removed.`,
        });
      },
      onCancel: () => {},
    });
  };

  function removeItemWithSlice(index, data) {
    const firstArr = data?.slice(0, index);
    const secondArr = data?.slice(index + 1);
    return [...firstArr, ...secondArr];
  }

  const setSorter = (data, key, key2, reverse) => {
    let listSort;
    if (!reverse) {
      listSort = data.sort(function (a, b) {
        if (a?.[key] !== b?.[key]) {
          return a?.[key] - b?.[key];
        }
        return new Date(b?.[key2]) - new Date(a?.[key2]);
      });
    } else {
      listSort = data.sort(function (a, b) {
        if (a?.[key] !== b?.[key]) {
          return b?.[key] - a?.[key];
        }
        return new Date(b?.[key2]) - new Date(a?.[key2]);
      });
    }
    return listSort;
  };

  const onChangeFilter = (filter) => {
    if (links?.length > 0) {
      let listFilter;
      setFilter(filter);
      if (filter === 1) {
        listFilter = setSorter(links, "point", "createdDate", false);
      }
      if (filter === 2) {
        listFilter = setSorter(links, "point", "createdDate", true);
      }
      onPaginationChange(1, true);
      setLinks(listFilter);
    }
  };

  return (
    <>
      <Row justify="center">
        <Col xs={23} md={20}>
          <Header label="LinkVOTE Challenge" />
          <Row justify="center">
            <Col xs={20} md={12} lg={10}>
              {!isSubmitLink && (
                <LinkVote
                  data={linkList}
                  setPoint={setPoint}
                  onPaginationChange={onPaginationChange}
                  onDeleteLink={onDeleteLink}
                  onChangeFilter={onChangeFilter}
                  totalCount={links?.length}
                  page={currentPage}
                  clickSubmitLink={() => setIsSubmitLink(true)}
                  submitAlink={() => alert("")}
                />
              )}
              {isSubmitLink && (
                <AddLink
                  onBack={() => setIsSubmitLink(false)}
                  onFinish={onFinish}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
