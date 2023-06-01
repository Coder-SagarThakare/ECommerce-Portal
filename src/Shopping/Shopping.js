import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import CustomerRegistrationPage from "../Customer/CustomerRegistrationPage";
import { secureGet } from "../HttpService/APIService";
import getToken from "../HttpService/LocalStorageService";

import { CgProfile } from "react-icons/cg";
// import { TfiShoppingCartFull } from "react-icons/tfi";
import { FaUserTie } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

import OffCanvas from "../Customer/OffCanvas";
import { Button, Pagination } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux"; // disptach action ko trigger krta hai. action ko call karke batat hai ki muze yeh chahiye. fir action reducer k pass chala jayega
import { addToCart, buyProducts } from "../Redux/Actions/action";
// import store from "../Redux/store";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import CustomerLoginModal from "../Customer/CustomerLoginModal";

export default function Shopping() {
  // states
  const [currentItems, setCurrentItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  // console.log(store.getState().dataAddedToCart.length);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState();
  const [showCanvas, setShowCanvas] = useState(false);
  const [paginationObj, setPaginationObj] = useState({
    sortBy: "",
    limit: 10,
    pageNo: 4,
    searchText: "",
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [totalPages, setTotalPages] = useState();
  const cartItem = useSelector((state) => state.dataAddedToCart.length);
  // console.log(cartItem);

  // ====================== useEffect
  useEffect(() => {
    // console.log(searchParams.get("user"));
    // setCurrentLoggedInUser(JSON.parse(searchParams.get("user")));

    if (paginationObj.limit !== "" && paginationObj.pageNo !== "")
      paginationObj?.sortBy === ""
        ? secureGet(
            `/shop/products?limit=${paginationObj.limit}&page=${paginationObj.pageNo}`
          ).then((response) => {
            console.log(response);
            setCurrentItems(response.data.results);
            setTotalPages(response.data.totalPages);
          })
        : secureGet(
            `/shop/products?sortBy=${paginationObj.sortBy}&limit=${paginationObj.limit}&page=${paginationObj.pageNo}`
          ).then((response) => {
            console.log(response);
            setCurrentItems(response.data.results);
          });

    searchText &&
      secureGet(
        `/shop/products?limit=${paginationObj.limit}&page=${paginationObj.pageNo}&name=${paginationObj.searchText}`
      ).then((response) => {
        console.log(response.data.results);
        setCurrentItems(response.data.results);
      });
  }, [paginationObj]);

  useEffect(() => {
    // secureGet("shop/auth/self").then((response) => {
    //   // console.log(response.data);
    //   setCurrentLoggedInUser(response.data);
    // });
  }, [showCanvas]);

  // send payload to redux
  const createPayload = (products) => {
    let payload = {};
    let amount = 0;

    payload.items = products.map((item) => {
      amount = item.totalPrice;
      console.log(item);

      return {
        productId: item.productId,
        name: item.name,
        price: item.price,
        qty: 1,
        subTotal: item.totalPrice,
        images: item.images,
      };
    });

    payload.deliveryFee = 0;
    payload.total = amount;

    console.log(payload);

    dispatch(buyProducts(payload));
    navigate("/order");
  };

  function checkUserAddress(element) {
    var addressLength = 0;
    secureGet("/customers/address").then(async (response) => {
      console.log(response);
      addressLength = response.data.length;

      if (addressLength >= 1) {
        let items = [
          {
            productId: element._id,
            name: element.name,
            price: element.price,
            quantity: element.quantity,
            totalPrice: element.total,
            images: element.images,
          },
        ];
        console.log(element);
        console.log(items);
        createPayload(items);
      } else {
        toast.error("add address first ");
        navigate("/update");
      }
    });
  }

  function isCustomerLogin() {
    if (getToken("activeCustomerToken")) {
      // createPayload();
      console.log("in if block");
    } else {
      Swal.fire({
        title: "You need to login first !!! ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        denyButtonText: `Don't save `,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setShowLoginModal(true);
        } else {
        }
      });
    }
  }

  // ==================== product list
  const productList =
    currentItems &&
    currentItems.map((product, index) => {
      return (
        <div
          className="border py-2 px-2 rounded-3 mt-3 bg-light gap-4 d-flex flex-column"
          style={{
            width: "22%",
            boxSizing: "border-box",
            boxShadow:
              "-2px -2px 14px rgba(0, 0, 0, 0.20), 7px 7px 16px rgba(0, 0, 0, 0.15)",
          }}
          key={index}
        >
          <div
            className=" d-flex justify-content-center"
            style={{
              height: "20vh",
              overflow: "hidden",
              scrollbarWidth: "none",
            }}
          >
            <img
              className="h-100"
              style={{ objectFit: "cover" }}
              src={product.images[0]?.url}
              alt="..."
            ></img>
          </div>

          <div className="rounded-3">
            <p className="m-0 text-truncate">
              product name : <b>{product.name}</b>
            </p>
            <p className="m-0">price : {product.price}</p>
            <p className="text-truncate m-0">
              description : {product.description}
            </p>
          </div>
          <div className="d-flex justify-content-evenly mt-2 p-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => {
                product.quantity = 1;
                product.totalPrice = product.quantity * product.price;
                dispatch(addToCart(product));
              }}
            >
              Add to cart
            </button>

            <Button
              variant="outline-success"
              className="btn btn-sm"
              onClick={() => {
                product.total = product.price; // we need to multiply with quantity here
                isCustomerLogin();
                checkUserAddress(product);
              }}
            >
              buy now
            </Button>
          </div>

          {/* <button>{index}</button> */}
        </div>
      );
    });

  // const myState = useSelector((state) => {
  //   return state.changeNumber;
  // });
  const dispatch = useDispatch();

  // const cartArr = useSelector();
  function getLoggedUserData() {
    // secureGet("shop/auth/self").then((response) => {
    //   // console.log(response.data);
    //   setCurrentLoggedInUser(response.data);
    // });
  }

  // ==================================== return block
  return (
    <div className="d-flex justify-content-center flex-column align-items-center ">
      {/* {console.log("in shopping return block")} */}
      {/*=================== NavBar  */}
      <div
        className="navbar p-2 px-3  d-flex justify-content-between align-items-center border w-100 text-light"
        style={{ padding: "0 2%", backgroundColor: "#050e36" }}
      >
        <h4>online shopping</h4>

        <div className="d-flex align-items-center gap-1">
          <div
            role={"button"}
            onClick={() => {
              navigate("/cart");
            }}
          >
            <button
              type="button"
              className="bg-transparent position-relative border-0"
            >
              <BsCart3 color="white" size={24} />

              <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                {cartItem}+
                {/* <span class="visually-hidden">unread messages</span> */}
              </span>
            </button>
          </div>

          {getToken("activeCustomerToken") ? (
            // if customer token is present then show this div

            <div className="d-flex align-items-center gap-1 ">
              {getLoggedUserData()}
              <div
                className="d-flex  justify-content-center text-light"
                onClick={() => {
                  setShowCanvas(true);
                }}
              >
                <button className="bg-transparent border-0">
                  <FaUserTie color="white" size={25} />

                  {/* <img src={currentLoggedInUser.images[0]}></img> */}
                  {/* <p className="text-light">{currentLoggedInUser?.name}</p> */}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-1 d-flex gap-1">
              <button
                className="border-0"
                onClick={() => {
                  navigate("/registration");
                }}
              >
                Register <CgProfile />
              </button>

              <button className="border-0" onClick={() => navigate("/login")}>
                Login <CgProfile />
              </button>
            </div>
          )}
        </div>
      </div>

      {showCanvas ? (
        <OffCanvas setShowCanvas={setShowCanvas} showCanvas={showCanvas} />
      ) : (
        ""
      )}

      {/* ================= search sort by, limit, page no*/}
      <div
        className="w-100 d-flex justify-content-between p-2 align-items-center"
        style={{ backgroundColor: "#fff3e6" }}
      >
        {/* search box div */}
        <div className="d-flex">
          <input
            className="w-75 bg-transparent"
            style={{ border: "0", borderBottom: "1px solid #a19f9f" }}
            placeholder="search item"
            onChange={(event) => setSearchText(event.target.value)}
          />

          <Button
            variant="primary "
            className="border-0 btn btn-sm"
            style={{ backgroundColor: "#050e36" }}
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
            className="bg-transparent"
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
            className="bg-transparent"
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
            className="bg-transparent"
            style={{ width: "20%" }}
            placeholder="enter page no"
            defaultValue={paginationObj.pageNo}
            onChange={(event) => {
              setPaginationObj((prev) => {
                return { ...prev, pageNo: event.target.value };
              });
              console.log(event.log.value);
            }}
          />
        </div>
      </div>

      {/* =========== list of prouct */}
      <div
        className=" w-100 p-3 "
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          overflowY: "scroll",
          backgroundColor: "#fff3e6",
          gap: "2%",
          columnCount: "4",
          boxSizing: "border-box",
          height: "75vh",
        }}
      >
        {productList}
      </div>

      {/* pagination  */}
      <div className="pt-3">
        <Pagination>
          {/* <Pagination.Ellipsis /> */}

          {paginationObj?.pageNo >= 2 ? (
            <Pagination.Prev
              onClick={() => {
                setPaginationObj((prev) => {
                  return { ...prev, pageNo: Number(prev.pageNo - 1 )};
                });
              }}
            />
          ) : (
            // <Pagination.Item>{paginationObj?.pageNo - 1}</Pagination.Item>
            ""
          )}
          <Pagination.Item active>{paginationObj?.pageNo}</Pagination.Item>

          {totalPages === paginationObj.pageNo ? (
           ''
          ) : (
            // <Pagination.Item >{Number(paginationObj.pageNo) + 1}</Pagination.Item>
            <Pagination.Next
              onClick={() => {
                setPaginationObj((prev) => {
                console.log(typeof Number(prev.pageNo) + 1);
                console.log (typeof Number(prev.pageNo+ 1));

                  return { ...prev, pageNo: Number(prev.pageNo) + 1 };
                });
              }}
            />
          )}

          {/* <Pagination.Ellipsis /> */}
        </Pagination>
      </div>

      {showLoginModal ? (
        <CustomerLoginModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
        />
      ) : (
        ""
      )}

      <div className="border"></div>
    </div>
  );
}
