import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Badge, Button, Pagination } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import OrderDetailsModal from "./OrderDetailsModal";
import { GrEdit } from "react-icons/gr";
import { IoCheckmarkDone } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { patch, secureGet } from "../HttpService/APIService";
// import patch from '../HttpService/APIService/patch'

export default function CustomerOrderHistory() {
  const [searchText, setSearchText] = useState("");
  const [paginationObj, setPaginationObj] = useState({
    sortBy: "",
    limit: 10,
    pageNo: 5,
    searchText: "",
  });
  const [totalPages, setTotalPages] = useState();

  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();

  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderId, setOrderId] = useState();

  useEffect(() => {
    secureGet(
      `/shop/orders?limit=${paginationObj.limit}&page=${paginationObj.pageNo}`
    ).then((response) => {
      console.log(response);
      setOrderList(response.data.results);
      setTotalPages(response.data.totalPages);
    });
  }, [paginationObj]);

  function cancelOrder(item) {
    console.log(item);
    console.log("cancel order");
    patch(`/shop/orders/cancel/${item._id}`, null).then((response) => {
      console.log(response);
    });
  }
  // console.log(orderList);

  return (
    <div className=" d-flex flex-column ">
      {/* ================= search sort by, limit, page no*/}
      <div
        className="w-100 d-flex justify-content-between p-2"
        style={{ boxShadow: "5px 5px 7px #d4d4d4" }}
      >
        {/* search box div */}

        <div className="d-flex">
          <input
            className="w-75"
            style={{ border: "0", borderBottom: "1px solid #a19f9f" }}
            placeholder="search item"
            onChange={(event) => setSearchText(event.target.value)}
          />

          <Button
            variant="primary"
            onClick={() => {
              setPaginationObj((prev) => {
                return { ...prev, searchText: searchText };
              });
            }}
          >
            Search
          </Button>
        </div>

        <div>
          <p>
            page <b>{paginationObj?.pageNo}</b> out of <b>{totalPages}</b>
          </p>
        </div>

        <div className="d-flex justify-content-end align-items-center w-25">
          <select
            onChange={(event) => {
              setPaginationObj((prev) => {
                return { ...prev, sortBy: event.target.value };
              });
              console.log(event.target.value);
            }}
          >
            <option value="">default</option>
            <option value="name">name</option>
            <option value="price">price</option>
          </select>

          {/*==== limit of products */}
          <input
            className=""
            style={{ width: "20%" }}
            placeholder="limit"
            type="number"
            defaultValue={paginationObj.limit}
            onChange={(event) => {
              setPaginationObj((prev) => {
                return {
                  ...prev,
                  limit: event.target.value,
                };
              });
            }}
          />

          {/* // page no */}
          <input
            className=""
            style={{ width: "20%" }}
            placeholder="enter page no"
            defaultValue={paginationObj.pageNo}
            onChange={(event) => {
              if (event.target.value <= totalPages) {
                setPaginationObj((prev) => {
                  return { ...prev, pageNo: event.target.value };
                });
              } else toast.error("invalid page no");
              console.log(event.log.value);
            }}
          />
        </div>
      </div>

      <div
        className=" container text-dark mx-auto border d-flex flex-column gap-3  p-3 "
        style={{ height: "85vh", overflowY: "scroll" }}
      >
        {/* order card */}
        {orderList.map((element, index) => {
          return (
            <div key={index}>
              {/* order history card */}
              <div
                className="border mx-5 my-2 rounded px-5 py-2"
                style={{ backgroundColor: "#e0e0e0" }}
              >
                <div className="d-flex justify-content-between">
                  <p>
                    <b>order id : </b> {element._id}
                  </p>

                  {/* payment status / order status badge */}
                  <div>
                    <h6>
                      payment status :
                      <Badge
                        bg={
                          element.paymentStatus === "Paid"
                            ? "success"
                            : element.paymentStatus === "Pending"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {element.paymentStatus}
                      </Badge>
                      {/* <span class="badge bg-primary">Pending</span> */}
                    </h6>

                    <h6>
                      order status :
                      <Badge
                        bg={
                          element.status === "Cancelled"
                            ? "danger"
                            : element.status === "Pending"
                            ? "warning"
                            : "success"
                        }
                      >
                        {element.status}{" "}
                      </Badge>{" "}
                    </h6>
                  </div>

                </div>

                {/* show all product names in card  */}
                <div className="p-2">
                  <p className="m-0">
                    <u>
                      <b>product names</b>
                    </u>{" "}
                  </p>
                  {element.items.map((item, index) => {
                    return (
                      <div key={index}>
                        <span>{index + 1} </span>
                        {/* {console.log(item?.name)} */}
                        <span> {item?.name}</span>
                      </div>
                    );
                  })}
                </div>

                {/* total amount / order details, make payment, cancel order */}
                <div className="d-flex align-items-end justify-content-between">
                  <h6>total amount : {element.total}</h6>
                  <div className="d-flex gap-2">
                    <Button
                      className="btn btn-sm"
                      variant="info"
                      onClick={() => {
                        setOrderId(element._id);
                        // console.log(element._id);
                        setShowOrderDetails(true);
                      }}
                    >
                      order details
                    </Button>

                    {element.paymentStatus === "Paid" ? (
                      element.status !== "Cancelled" ? (
                        <Button
                          className="btn btn-sm"
                          variant="outline-warning"
                          onClick={() => {
                            // console.log(element);
                            cancelOrder(element);
                          }}
                        >
                          cancel order
                        </Button>
                      ) : (
                        ""
                      )
                    ) : (
                      <Button
                        className="btn btn-sm"
                        variant="outline-success"
                        onClick={() => {
                          navigate("/confirmOrder", {
                            state: {
                              orderId: element._id,
                            },
                          });
                        }}
                      >
                        Make payment
                      </Button>
                    )}

                    {/* {
                      element.status !== "Cancelled" ? <Button>make payment</Button> : ''
                    } */}
                  </div>
                </div>

              </div>
              
            </div>
          );
        })}
      </div>

      <div className="d-flex justify-content-center">
        <Pagination>
          {/* <Pagination.First /> */}
          {/* <Pagination.Prev /> */}
          {/* <Pagination.Ellipsis /> */}

          {/* {paginationObj.pageNo >1 ? <Pagination.Item
            onClick={() => {
              setPaginationObj((prev) => {
                return { ...prev, pageNo: paginationObj.pageNo - 1 };
              });
            }}
          >
            {paginationObj.pageNo - 1}
          </Pagination.Item> : ''} */}

          {paginationObj.pageNo > 1 ? (
            <Pagination.Prev
              onClick={() => {
                setPaginationObj((prev) => {
                  return { ...prev, pageNo: paginationObj.pageNo - 1 };
                });
              }}

              // {paginationObj.pageNo - 1}
            />
          ) : (
            ""
          )}

          <Pagination.Item active>{paginationObj.pageNo}</Pagination.Item>

          {/* {paginationObj.pageNo !== totalPages ? (
            <Pagination.Next
              onClick={() => {
                setPaginationObj((prev) => {
                  return { ...prev, pageNo: paginationObj.pageNo + 1 };
                });
              }}
            >
              {paginationObj.pageNo + 1}
            </Pagination.Next>
          ) : (
            ""
          )} */}

          {paginationObj.pageNo !== totalPages ? (
            <Pagination.Next
              onClick={() => {
                setPaginationObj((prev) => {
                  return { ...prev, pageNo: paginationObj.pageNo + 1 };
                });
              }}

              // {paginationObj.pageNo + 1}
            />
          ) : (
            ""
          )}

          {/* <Pagination.Ellipsis /> */}
          <Pagination.Next />
          {/* <Pagination.Last /> */}
        </Pagination>
      </div>

      {showOrderDetails ? (
        <OrderDetailsModal
          setShowOrderDetails={setShowOrderDetails}
          showOrderDetails={showOrderDetails}
          orderId={orderId}
        />
      ) : (
        ""
      )}
    </div>
  );
}
