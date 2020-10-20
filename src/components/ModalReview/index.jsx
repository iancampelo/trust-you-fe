import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { formatDate } from '../../utils/helpers';

const ModalReview = props => {
  const {
    className,
    reviewDetail,
    modal,
    toggleModal,
    modalTitle,
  } = props;

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        className={className}
        size="xl"
        centered={true}
      >
        <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
        <ModalBody>
          <div className="wrap-table centered">
            <div className="table ver1 m-b-110">
              <div className="table-head">
                <table>
                  <thead className="text-primary">
                    <tr className="head">
                      <th className="column1">Title</th>
                      <th className="column2">Author</th>
                      <th className="column3">Creation Time</th>
                    </tr>
                  </thead>
                  </table>
                </div>
                <div className="table-body">
                  <table>
                    <tbody>
                      {reviewDetail &&
                        reviewDetail.map(item => {
                          return (
                            <tr className="body" key={item.creation_date}>
                              <td className="column1">{item.review_title}</td>
                              <td className="column2">{item.guest_name}</td>
                              <td className="column3">{formatDate(item.creation_date)}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalReview;
