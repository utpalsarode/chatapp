import React from 'react';
import { Badge } from 'reactstrap';
import { IoMdClose } from "react-icons/io";

const UserBadgeItem = ({ user, admin }) => {
  return (
    <Badge color="secondary" className='d-flex me-2 my-2' pill={false}>
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <IoMdClose pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
