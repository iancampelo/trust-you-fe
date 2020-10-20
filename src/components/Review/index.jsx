import React from "react";
import "./review.css";
import { Pie } from "react-chartjs-2";
import { getAnswerTitle, prepareDataToChart } from "../../utils/helpers";

const Review = props => {
  const { reviews, title, onDetailReview } = props;
  return (
      <div className="review-card">
        <h4>{getAnswerTitle(title)}</h4>
        <div className="wrap-table">
          <div className="table ver1 m-b-110">
            <div className="table-head">
              <table>
                <thead className="text-primary">
                  <tr className="head">
                    <th className="column1">Answer Type</th>
                    <th className="column2">Reviews Quantity</th>
                  </tr>
                </thead>
                </table>
              </div>
              <div className="table-body">
                <table>
                  <tbody>
                    {reviews &&
                      reviews.map(item => {
                        return (
                          <tr className="body" key={item[0]} onClick={() => onDetailReview(title, item)}>
                            <td className="column1">{item[0]}</td>
                            <td className="column2">{item[1]}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
          </div>
        </div>
        <div>
          <Pie
            data={prepareDataToChart(title, reviews)}
          />
        </div>
      </div>
  );
};

export default Review;
