import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ProfileModal({ open, handleChange, title, src, email }) {
  return (
    <Modal isOpen={open} toggle={handleChange} centered className="d-flex justify-content-center">
      <ModalHeader toggle={handleChange}>{title}</ModalHeader>
      <ModalBody className="user-profile-content">
        <div className="user-profile-avatar">
          <img className="user-profile-image" src={src} alt="" />
        </div>
        <h4 className="mt-4">Email: {email}</h4>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleChange}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ProfileModal;
