import React from 'react';
import { Badge } from 'reactstrap';
import { IoMdClose } from "react-icons/io";

const UserBadgeItem = ({ user, admin, handleFunction }) => {
  return (
    <Badge color="secondary" className='d-flex align-items-center me-2 my-2' pill={false}>
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <IoMdClose pl={2} size={15} className='cursor-pointer' onClick={() => handleFunction(user)} />
    </Badge>
  );
};

export default UserBadgeItem;
