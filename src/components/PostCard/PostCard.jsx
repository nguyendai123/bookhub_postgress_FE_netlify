import { useState, useEffect } from "react";
import "./PostCard.css";
import { Progress } from "antd";
import likeicon from "../../assets/like.svg";
import iconlike from "../../assets/iconlike.svg";
import loveicon from "../../assets/love.svg";
import commenticon from "../../assets/iconcomment.svg";
import iconshare from "../../assets/iconshare.svg";
import Destination from "../../assets/Destination";
import moment from "moment";
import { Rate, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faLock,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AccountHeader from "../AccountHeader/AccountHeader";
import { Button, Dropdown, Modal, Space, Popover, ConfigProvider } from "antd";
import { Input } from "antd";
import LikeCount from "./LikeCount/LikeCount";
import PostCardItem from "./PostCardItem/PostCardItem";

const { TextArea } = Input;

const breakPoints = [
  { width: 1, itemsToShow: 3 },
  { width: 550, itemsToShow: 3, itemsToScroll: 3 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 },
];
const items = [
  {
    label: <a href="#">Private</a>,
    key: "account",
    icon: <FontAwesomeIcon icon={faLock} />,
  },
];
function PostCard({ data, load, setLoad, isError, isLoading }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [currentValue, setCurrentValue] = useState(2);
  const [openComment, setOpenComment] = useState(false);
  const [post, setPost] = useState({});
  const [userLike, setUserLike] = useState(false);
  const handleClickComment = () => {
    setOpenComment(!openComment);
  };
  console.log("dât", data);

  const handleClickEditSave = (postID) => {
    // Assuming the postID, updatedPost, and result are defined and available

    const url = `https://bookhubpostgress-production.up.railway.app/api/posts/update/${postID}`;

    // Check for validation errors
    // The request payload and headers
    const updatedPost = {
      content: value,
      rating: currentValue,
    };
    const data = updatedPost;

    axios
      .put(url, data)
      .then((response) => {
        console.log(response.data); // Handle success response
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
    setLoad(!load);
  };
  const handleDeletePost = (postID) => {
    const url = `https://bookhubpostgress-production.up.railway.app/api/posts/delete/${postID}`;

    // DELETE request using axios with error handling
    axios
      .delete(url)
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.error("There was an error!", error);
      });
    setLoad(!load);
  };
  const handleClickLikePost = (postID) => {
    setUserLike(!userLike);
    const url = `https://bookhubpostgress-production.up.railway.app/api/posts/post/${postID}`;
  };
  return (
    <>
      <Modal
        title={
          <Space
            direction="horizontal"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Create Post
          </Space>
        }
        centered
        open={open}
        width={600}
        height={420}
        footer={null}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <hr style={{ color: "#9197a3" }} />
        <div className="home-create-post-model-content">
          <Space>
            <AccountHeader />
            <div className="model-content-acount-des">
              <div className="model-content-acount-name">dai nguyenvan</div>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomRight"
                arrow
                className="model-content-scope"
              >
                <Button>
                  <Space>
                    <FontAwesomeIcon icon={faEarthAmericas} /> Public
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </Space>
          <div>
            <TextArea
              style={{
                margin: "20px 0 10px 0",
                border: "none",
                fontSize: "18px",
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Please share your impressions ..."
              autoSize={{
                minRows: 3,
                maxRows: 10,
              }}
            />
            <div>
              <div className="post-content-image-user-add">
                <img
                  src="https://source.unsplash.com/random/120"
                  alt="post image"
                  className="post-content-image-user-add-1"
                />
              </div>
              <div className="post-content-body">
                <img
                  src="https://source.unsplash.com/random/12"
                  alt="post image"
                  className="post-content-image"
                />
                <div>
                  <p>{post.book?.title}</p>
                  <p>{post.book?.author}</p>
                  <Progress
                    style={{ width: "280px" }}
                    percent={100}
                    strokeColor={{
                      "0%": "#87d068",
                      "100%": "#108ee9",
                    }}
                  />
                  <div style={{ marginBottom: "30px" }}>
                    <Space>
                      <span>
                        {post.book?.page}/{post.book?.page}
                      </span>
                      <span>Trang sách đã đọc</span>
                    </Space>
                  </div>
                  <Space>
                    <Button className="btn-post-content-body">
                      <div className="btn-post-content-body-des">
                        <Destination />
                      </div>
                      <div style={{ margin: "0px 10px 0 0" }}>Muốn đọc</div>
                      <div style={{ margin: "0px 10px 0 0" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="12"
                          viewBox="0 0 15 12"
                          fill="none"
                        >
                          <path
                            d="M7.5 12L0.571797 -1.30507e-06L14.4282 -9.36995e-08L7.5 12Z"
                            fill="#6D6D6D"
                          />
                        </svg>
                      </div>
                    </Button>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Rate
                        defaultValue={currentValue}
                        onChange={(rating) => setCurrentValue(rating)}
                      />
                    </div>
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ color: "#9197a3" }} />
        <div className="model-content-active">
          <div className="model-content-add">
            <div className="model-content-title">
              Add to post <span style={{ color: "red" }}>*</span>
            </div>
            <ConfigProvider
              theme={{
                token: {
                  colorText: "white",
                  colorBgElevated: "#000000b3",
                },
              }}
            >
              <Space size={25}>
                <Popover
                  overlayStyle={{ maxWidth: "140px" }}
                  trigger="hover"
                  content={"Books (Required)"}
                >
                  <div className="add-post-book">
                    <svg
                      width="26"
                      height="29"
                      viewBox="0 0 28 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.15625 6.6375L0.433946 5.73462C0.159666 5.95404 0 6.28625 0 6.6375H1.15625ZM13.875 24.9062L13.1527 25.8091L13.875 26.387L14.5973 25.8091L13.875 24.9062ZM1.15625 24.9062H0C0 25.3507 0.254775 25.7558 0.655375 25.9484C1.05598 26.1409 1.53148 26.0868 1.87855 25.8091L1.15625 24.9062ZM26.5938 6.6375H27.75C27.75 6.28625 27.5903 5.95404 27.3161 5.73462L26.5938 6.6375ZM26.5938 24.9062L25.8714 25.8091C26.2185 26.0868 26.694 26.1409 27.0946 25.9484C27.4952 25.7558 27.75 25.3507 27.75 24.9062H26.5938ZM12.7188 6.6375V24.9062H15.0312V6.6375H12.7188ZM2.3125 24.9062V6.6375H0V24.9062H2.3125ZM1.15625 6.6375C1.87855 7.54038 1.87835 7.54054 1.87816 7.54069C1.87811 7.54073 1.87793 7.54088 1.87784 7.54095C1.87764 7.54111 1.8775 7.54122 1.8774 7.5413C1.87721 7.54145 1.8772 7.54146 1.87739 7.54131C1.87775 7.54102 1.87886 7.54014 1.88072 7.53868C1.88442 7.53577 1.89107 7.53056 1.90056 7.52321C1.91956 7.5085 1.94991 7.48525 1.99086 7.45468C2.07282 7.39348 2.19679 7.30325 2.35665 7.19363C2.67735 6.97372 3.13718 6.67944 3.68767 6.38585C4.81503 5.78459 6.20504 5.25 7.51562 5.25V2.9375C5.64652 2.9375 3.85685 3.67479 2.59944 4.3454C1.95755 4.68775 1.42372 5.0294 1.04887 5.28645C0.860948 5.4153 0.711667 5.5238 0.607316 5.60172C0.555106 5.6407 0.514043 5.6721 0.48491 5.69466C0.470341 5.70594 0.458745 5.71501 0.450221 5.72172C0.445959 5.72508 0.442463 5.72784 0.439747 5.73C0.438389 5.73108 0.437225 5.732 0.436258 5.73277C0.435775 5.73316 0.43534 5.73351 0.434955 5.73381C0.434762 5.73397 0.43451 5.73417 0.434413 5.73425C0.434174 5.73444 0.433946 5.73462 1.15625 6.6375ZM7.51562 5.25C8.82621 5.25 10.2162 5.78459 11.3436 6.38585C11.8941 6.67944 12.3539 6.97372 12.6746 7.19363C12.8345 7.30325 12.9584 7.39348 13.0404 7.45468C13.0813 7.48525 13.1117 7.5085 13.1307 7.52321C13.1402 7.53056 13.1468 7.53577 13.1505 7.53868C13.1524 7.54014 13.1535 7.54102 13.1539 7.54131C13.154 7.54146 13.154 7.54145 13.1538 7.5413C13.1537 7.54122 13.1536 7.54111 13.1534 7.54095C13.1533 7.54088 13.1531 7.54073 13.1531 7.54069C13.1529 7.54054 13.1527 7.54038 13.875 6.6375C14.5973 5.73462 14.5971 5.73444 14.5968 5.73425C14.5967 5.73417 14.5965 5.73397 14.5963 5.73381C14.5959 5.73351 14.5955 5.73316 14.595 5.73277C14.594 5.732 14.5929 5.73108 14.5915 5.73C14.5888 5.72784 14.5853 5.72508 14.581 5.72172C14.5725 5.71501 14.5609 5.70594 14.5463 5.69466C14.5172 5.6721 14.4761 5.6407 14.4239 5.60172C14.3196 5.5238 14.1703 5.4153 13.9824 5.28645C13.6075 5.0294 13.0737 4.68775 12.4318 4.3454C11.1744 3.67479 9.38473 2.9375 7.51562 2.9375V5.25ZM13.875 24.9062C14.5973 24.0034 14.5971 24.0032 14.5968 24.003C14.5967 24.0029 14.5965 24.0027 14.5963 24.0026C14.5959 24.0023 14.5955 24.0019 14.595 24.0015C14.594 24.0008 14.5929 23.9998 14.5915 23.9988C14.5888 23.9966 14.5853 23.9938 14.581 23.9905C14.5725 23.9838 14.5609 23.9747 14.5463 23.9634C14.5172 23.9409 14.4761 23.9095 14.4239 23.8705C14.3196 23.7926 14.1703 23.6841 13.9824 23.5552C13.6075 23.2982 13.0737 22.9565 12.4318 22.6142C11.1744 21.9435 9.38473 21.2063 7.51562 21.2063V23.5188C8.82621 23.5188 10.2162 24.0533 11.3436 24.6546C11.8941 24.9482 12.3539 25.2425 12.6746 25.4624C12.8345 25.572 12.9584 25.6622 13.0404 25.7234C13.0813 25.754 13.1117 25.7773 13.1307 25.792C13.1402 25.7993 13.1468 25.8045 13.1505 25.8074C13.1524 25.8089 13.1535 25.8098 13.1539 25.8101C13.154 25.8102 13.154 25.8102 13.1538 25.81C13.1538 25.81 13.1536 25.8099 13.1534 25.8097C13.1533 25.8096 13.1531 25.8095 13.1531 25.8094C13.1529 25.8093 13.1527 25.8091 13.875 24.9062ZM7.51562 21.2063C5.64652 21.2063 3.85685 21.9435 2.59944 22.6142C1.95755 22.9565 1.42372 23.2982 1.04887 23.5552C0.860949 23.6841 0.711667 23.7926 0.607316 23.8705C0.555107 23.9095 0.514044 23.9409 0.484911 23.9634C0.470341 23.9747 0.458745 23.9838 0.450221 23.9905C0.445959 23.9938 0.442464 23.9966 0.439747 23.9988C0.438389 23.9998 0.437226 24.0008 0.436258 24.0015C0.435775 24.0019 0.43534 24.0023 0.434955 24.0026C0.434762 24.0027 0.43451 24.0029 0.434414 24.003C0.434174 24.0032 0.433947 24.0034 1.15625 24.9062C1.87855 25.8091 1.87835 25.8093 1.87816 25.8094C1.87811 25.8095 1.87793 25.8096 1.87784 25.8097C1.87764 25.8099 1.8775 25.81 1.8774 25.81C1.87721 25.8102 1.8772 25.8102 1.87739 25.8101C1.87775 25.8098 1.87886 25.8089 1.88072 25.8074C1.88442 25.8045 1.89107 25.7993 1.90056 25.792C1.91956 25.7773 1.94991 25.754 1.99086 25.7234C2.07282 25.6622 2.19679 25.572 2.35665 25.4624C2.67735 25.2425 3.13718 24.9482 3.68767 24.6546C4.81503 24.0533 6.20504 23.5188 7.51562 23.5188V21.2063ZM25.4375 6.6375V24.9062H27.75V6.6375H25.4375ZM13.875 6.6375C14.5973 7.54038 14.5971 7.54054 14.5969 7.54069C14.5969 7.54073 14.5967 7.54088 14.5966 7.54095C14.5964 7.54111 14.5963 7.54122 14.5962 7.5413C14.596 7.54145 14.596 7.54146 14.5961 7.54131C14.5965 7.54102 14.5976 7.54014 14.5995 7.53868C14.6032 7.53577 14.6098 7.53056 14.6193 7.52321C14.6383 7.5085 14.6687 7.48525 14.7096 7.45468C14.7916 7.39348 14.9155 7.30325 15.0754 7.19363C15.3961 6.97372 15.8559 6.67944 16.4064 6.38585C17.5338 5.78459 18.9238 5.25 20.2344 5.25V2.9375C18.3653 2.9375 16.5756 3.67479 15.3182 4.3454C14.6763 4.68775 14.1425 5.0294 13.7676 5.28645C13.5797 5.4153 13.4304 5.5238 13.3261 5.60172C13.2739 5.6407 13.2328 5.6721 13.2037 5.69466C13.1891 5.70594 13.1775 5.71501 13.169 5.72172C13.1647 5.72508 13.1612 5.72784 13.1585 5.73C13.1571 5.73108 13.156 5.732 13.155 5.73277C13.1545 5.73316 13.1541 5.73351 13.1537 5.73381C13.1535 5.73397 13.1533 5.73417 13.1532 5.73425C13.1529 5.73444 13.1527 5.73462 13.875 6.6375ZM20.2344 5.25C21.545 5.25 22.935 5.78459 24.0623 6.38585C24.6128 6.67944 25.0727 6.97372 25.3933 7.19363C25.5532 7.30325 25.6772 7.39348 25.7591 7.45468C25.8001 7.48525 25.8304 7.5085 25.8494 7.52321C25.8589 7.53056 25.8656 7.53577 25.8693 7.53868C25.8711 7.54014 25.8722 7.54102 25.8726 7.54131C25.8728 7.54146 25.8728 7.54145 25.8726 7.5413C25.8725 7.54122 25.8724 7.54111 25.8722 7.54095C25.8721 7.54088 25.8719 7.54073 25.8718 7.54069C25.8716 7.54054 25.8714 7.54038 26.5938 6.6375C27.3161 5.73462 27.3158 5.73444 27.3156 5.73425C27.3155 5.73417 27.3152 5.73397 27.315 5.73381C27.3147 5.73351 27.3142 5.73316 27.3137 5.73277C27.3128 5.732 27.3116 5.73108 27.3103 5.73C27.3075 5.72784 27.304 5.72508 27.2998 5.72172C27.2913 5.71501 27.2797 5.70594 27.2651 5.69466C27.236 5.6721 27.1949 5.6407 27.1427 5.60172C27.0383 5.5238 26.8891 5.4153 26.7011 5.28645C26.3263 5.0294 25.7925 4.68775 25.1506 4.3454C23.8932 3.67479 22.1035 2.9375 20.2344 2.9375V5.25ZM26.5938 24.9062C27.3161 24.0034 27.3158 24.0032 27.3156 24.003C27.3155 24.0029 27.3152 24.0027 27.315 24.0026C27.3147 24.0023 27.3142 24.0019 27.3137 24.0015C27.3128 24.0008 27.3116 23.9998 27.3103 23.9988C27.3075 23.9966 27.304 23.9938 27.2998 23.9905C27.2913 23.9838 27.2797 23.9747 27.2651 23.9634C27.236 23.9409 27.1949 23.9095 27.1427 23.8705C27.0383 23.7926 26.8891 23.6841 26.7011 23.5552C26.3263 23.2982 25.7925 22.9565 25.1506 22.6142C23.8932 21.9435 22.1035 21.2063 20.2344 21.2063V23.5188C21.545 23.5188 22.935 24.0533 24.0623 24.6546C24.6128 24.9482 25.0727 25.2425 25.3933 25.4624C25.5532 25.572 25.6772 25.6622 25.7591 25.7234C25.8001 25.754 25.8304 25.7773 25.8494 25.792C25.8589 25.7993 25.8656 25.8045 25.8693 25.8074C25.8711 25.8089 25.8722 25.8098 25.8726 25.8101C25.8728 25.8102 25.8728 25.8102 25.8726 25.81C25.8725 25.81 25.8724 25.8099 25.8722 25.8097C25.8721 25.8096 25.8719 25.8095 25.8718 25.8094C25.8717 25.8093 25.8714 25.8091 26.5938 24.9062ZM20.2344 21.2063C18.3653 21.2063 16.5756 21.9435 15.3182 22.6142C14.6763 22.9565 14.1425 23.2982 13.7676 23.5552C13.5797 23.6841 13.4304 23.7926 13.3261 23.8705C13.2739 23.9095 13.2328 23.9409 13.2037 23.9634C13.1891 23.9747 13.1775 23.9838 13.169 23.9905C13.1647 23.9938 13.1612 23.9966 13.1585 23.9988C13.1571 23.9998 13.156 24.0008 13.155 24.0015C13.1545 24.0019 13.1541 24.0023 13.1537 24.0026C13.1535 24.0027 13.1533 24.0029 13.1532 24.003C13.1529 24.0032 13.1527 24.0034 13.875 24.9062C14.5973 25.8091 14.5971 25.8093 14.5969 25.8094C14.5969 25.8095 14.5967 25.8096 14.5966 25.8097C14.5964 25.8099 14.5962 25.81 14.5962 25.81C14.596 25.8102 14.596 25.8102 14.5961 25.8101C14.5965 25.8098 14.5976 25.8089 14.5995 25.8074C14.6032 25.8045 14.6098 25.7993 14.6193 25.792C14.6383 25.7773 14.6687 25.754 14.7096 25.7234C14.7916 25.6622 14.9155 25.572 15.0754 25.4624C15.3961 25.2425 15.8559 24.9482 16.4064 24.6546C17.5338 24.0533 18.9238 23.5188 20.2344 23.5188V21.2063Z"
                        fill="#79787F"
                      ></path>
                    </svg>
                  </div>
                </Popover>

                <Popover content={"Author (Required)"} trigger="hover">
                  <div className="add-post-book">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="item-add-to-post-svg"
                    >
                      <path
                        d="M9.9412 14.2942L18.1765 14.2942M1.11768 23.1177L15.2353 9.00007M4.64708 11.353L12.8824 3.11769C15.1565 0.843583 18.8435 0.84358 21.1177 3.11769C23.3918 5.3918 23.3918 9.07887 21.1177 11.353L12.8824 19.5883L5.23532 19L4.64708 11.353Z"
                        stroke="#E0AF7E"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  </div>
                </Popover>
                <Popover content={"Genres (Required)"} trigger="hover">
                  <div className="add-post-book">
                    <svg
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="item-add-to-post-svg"
                    >
                      <path
                        d="M1.90625 4.09375C1.90625 2.81659 2.94159 1.78125 4.21875 1.78125H8.84375C10.1209 1.78125 11.1562 2.81659 11.1562 4.09375V8.71875C11.1562 9.99591 10.1209 11.0312 8.84375 11.0312H4.21875C2.94159 11.0312 1.90625 9.99591 1.90625 8.71875V4.09375Z"
                        stroke="#79787F"
                        strokeWidth="2.3125"
                      ></path>
                      <path
                        d="M18.0938 4.09375C18.0938 2.81659 19.1291 1.78125 20.4062 1.78125H25.0312C26.3084 1.78125 27.3438 2.81659 27.3438 4.09375V8.71875C27.3438 9.99591 26.3084 11.0312 25.0312 11.0312H20.4062C19.1291 11.0312 18.0938 9.99591 18.0938 8.71875V4.09375Z"
                        stroke="#79787F"
                        strokeWidth="2.3125"
                      ></path>
                      <path
                        d="M1.90625 20.2812C1.90625 19.0041 2.94159 17.9688 4.21875 17.9688H8.84375C10.1209 17.9688 11.1562 19.0041 11.1562 20.2812V24.9062C11.1562 26.1834 10.1209 27.2188 8.84375 27.2188H4.21875C2.94159 27.2188 1.90625 26.1834 1.90625 24.9062V20.2812Z"
                        stroke="#79787F"
                        strokeWidth="2.3125"
                      ></path>
                      <path
                        d="M18.0938 20.2812C18.0938 19.0041 19.1291 17.9688 20.4062 17.9688H25.0312C26.3084 17.9688 27.3438 19.0041 27.3438 20.2812V24.9062C27.3438 26.1834 26.3084 27.2188 25.0312 27.2188H20.4062C19.1291 27.2188 18.0938 26.1834 18.0938 24.9062V20.2812Z"
                        stroke="#79787F"
                        strokeWidth="2.3125"
                      ></path>
                    </svg>
                  </div>
                </Popover>
                <Popover content={"Image"} trigger="hover">
                  <div className="add-post-book">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.7652 20.3217C4.39059 20.7275 4.4159 21.3602 4.82172 21.7348C5.22754 22.1094 5.8602 22.0841 6.2348 21.6783L4.7652 20.3217ZM16.2221 9.3844L16.9569 10.0627V10.0627L16.2221 9.3844ZM18.9582 9.19305L19.5914 8.41909V8.41909L18.9582 9.19305ZM22.3668 13.274C22.7942 13.6237 23.4242 13.5607 23.774 13.1332C24.1237 12.7058 24.0607 12.0758 23.6332 11.726L22.3668 13.274ZM3.5 13C3.5 13.5523 3.94772 14 4.5 14C5.05228 14 5.5 13.5523 5.5 13H3.5ZM11.5 13C11.5 13.5523 11.9477 14 12.5 14C13.0523 14 13.5 13.5523 13.5 13H11.5ZM3 4H21V2H3V4ZM22 5V19H24V5H22ZM21 20H3V22H21V20ZM2 19V5H0V19H2ZM3 20C2.44772 20 2 19.5523 2 19H0C0 20.6569 1.34314 22 3 22V20ZM22 19C22 19.5523 21.5523 20 21 20V22C22.6569 22 24 20.6569 24 19H22ZM21 4C21.5523 4 22 4.44772 22 5H24C24 3.34315 22.6569 2 21 2V4ZM3 2C1.34315 2 0 3.34315 0 5H2C2 4.44772 2.44772 4 3 4V2ZM6.2348 21.6783L16.9569 10.0627L15.4873 8.70612L4.7652 20.3217L6.2348 21.6783ZM18.3249 9.96701L22.3668 13.274L23.6332 11.726L19.5914 8.41909L18.3249 9.96701ZM16.9569 10.0627C17.3158 9.67389 17.9154 9.63195 18.3249 9.96701L19.5914 8.41909C18.3629 7.41392 16.564 7.53973 15.4873 8.70612L16.9569 10.0627ZM0.292893 10.7071L8.04289 18.4571L9.45711 17.0429L1.70711 9.29289L0.292893 10.7071ZM5.5 13C5.5 13.0142 5.50846 12.8888 5.66543 12.6344C5.80866 12.4022 6.03205 12.1349 6.3251 11.8819C6.91906 11.3691 7.69587 11 8.5 11V9C7.09499 9 5.8718 9.63094 5.01804 10.3681C4.58724 10.7401 4.22484 11.1603 3.96325 11.5844C3.71539 11.9862 3.5 12.4858 3.5 13H5.5ZM8.5 11C9.30413 11 10.0809 11.3691 10.6749 11.8819C10.968 12.1349 11.1913 12.4022 11.3346 12.6344C11.4915 12.8888 11.5 13.0142 11.5 13H13.5C13.5 12.4858 13.2846 11.9862 13.0368 11.5844C12.7752 11.1603 12.4128 10.7401 11.982 10.3681C11.1282 9.63094 9.90501 9 8.5 9V11Z"
                        fill="#2D2C42"
                      ></path>
                    </svg>
                  </div>
                </Popover>
              </Space>
            </ConfigProvider>
          </div>
          <div className="model-content-submit">
            <Button
              className="model-content-btn-submit"
              onClick={() => {
                handleClickEditSave(post.postID);
                setOpen(false);
              }}
            >
              Post
            </Button>
          </div>
        </div>
      </Modal>
      {data.map((item) => (
        <div key={"id" + item.postID}>
          {console.log("item123 ", item)}
          <PostCardItem
            isError={isError}
            isLoading={isLoading}
            data={data}
            item={item}
            load={load}
            setLoad={setLoad}
            setOpen={setOpen}
            setValue={setValue}
            setCurrentValue={setCurrentValue}
            setPost={setPost}
          />
        </div>
      ))}
    </>
  );
}

export default PostCard;
