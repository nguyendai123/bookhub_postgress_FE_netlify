import React from "react";
import useFetch from "../customize/fetch";
import { Rate } from "antd";
import "./RatingBookItem.css";
function RatingBookItem() {
  const {
    data: dataBooks,
    isLoadingBooks,
    isErrorBooks,
  } = useFetch(
    "https://bookhubpostgress-production.up.railway.app/api/books",
    false
  );
  return (
    <>
      {Object.keys(dataBooks).map((item, idx) => (
        <div key={item.bookID}>
          {idx <= 4 && (
            <div className="rating-book-item" style={{ margin: "0 5px" }}>
              <div className="number-book-item">0{idx + 1}</div>
              <img
                style={{
                  width: "140px",
                  height: "200px",
                  borderRadius: "10px",
                }}
                src={item.image}
                alt="imageBook1"
                className="home-book-image-rating"
              />
              <div className="home-book-rating-content">
                <div className="home-book-rating-des">
                  <div className="home-book-rating-name">{item.title}</div>
                  <div className="home-book-rating-author">{item.author}</div>
                </div>
                <Rate allowHalf defaultValue={item.rate} disabled />
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default RatingBookItem;
