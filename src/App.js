import React, { useEffect, useState, useCallback } from "react";
import api from './utils/api';
import './assets/css/main.css';
import Review from "./components/Review";
import ModalReview from "./components/ModalReview";

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [modal, setModal] = useState(false);
  const [detailedReview, setDetailedReview] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  const toggleModal = () => setModal(!modal);

  const loadReviews = useCallback(async () => {
    const response = await api.get(`/review-distribution`);
    setReviews(Object.entries(response.data.data));
  }, []);

  const loadReviewDetail = useCallback(async (question, answer) => {
    const response = await api.get(`/reviews?filter_type=${question}&filter_value=${answer}`);
    setModalTitle(`All reviews where ${question} is ${answer}`);
    return response.data;
  }, []);

  const getReviewDetail = async (title, item) => {
    await loadReviewDetail(title, item[0]).then((results) => {
      setDetailedReview(results.data);
      toggleModal();
    });
  }

  useEffect(() => {
    (async function iife() {
      await loadReviews();
    })();
  }, [loadReviews]);

  return (
    <div>
      <ModalReview
        toggleModal={toggleModal}
        modal={modal}
        reviewDetail={detailedReview}
        modalTitle={modalTitle}
      />
      <div className="limiter">
        <div className="container-table">
          {reviews &&
            reviews.map(item => {
              return <Review
                        key={item}
                        title={item[0]}
                        reviews={Object.entries(item[1])}
                        onDetailReview={getReviewDetail}
                      />
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
