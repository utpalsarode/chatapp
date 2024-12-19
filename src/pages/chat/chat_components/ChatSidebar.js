import React, { useCallback, useEffect, useState } from 'react';
import { FaSistrix } from 'react-icons/fa6';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import InputTextField from '../../../components/InputTextFiled';
import { Button } from 'reactstrap';
import ContactsList from './ContactsList';
import { Toaster, toaster } from '../../../components/ui/toaster';
import GroupModal from '../../../components/GroupModal';

const ChatSidebar = ({ currentUser, currentChat, setCurrentChat }) => {
  const [searchUser, setSearchUser] = useState('');
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const handleGroupModal = () => {
    setIsGroupModalOpen(!isGroupModalOpen);
  };

  // const fetchContacts = useCallback(async (searchQuery = '') => {
  //   setLoading(true);
  //   try {
  //     const url = searchQuery
  //       ? `/getAllUsers/${userData.id}?search=${searchQuery}`
  //       : `/getAllUsers/${userData.id}`;
  //     const res = await GetApiCall('GET', url, { authentication: token });
  //     if (res.data.status === 'success' && res.data.statusCode === 200) {
  //       setContacts(res.data.data);
  //     } else {
  //       setContacts([]);
  //     }
  //   } catch (error) {
  //     toaster.error({
  //       description: 'Error fetching contacts!',
  //       type: 'info',
  //       duration: 2000,
  //     });
  //     console.error('Error fetching contacts:', error);
  //     setContacts([]);
  //   }
  //   setLoading(false);
  // }, []);

  return (
    <div id="plist" className="people-list col-xl-3 col-lg-3 col-md-4">
      <div className="user-input-search">
        <div className="input-search-contact">
          <span className="search-btn">
            <FaSistrix className="fs-5" />
          </span>
          <InputTextField
            value={searchUser}
            className="form-control"
            type="text"
            id="searchUser"
            placeholder="Search..."
            name="searchUser"
            autoComplete="on"
            handleChange={(_, value) => setSearchUser(value)}
          />
        </div>
        <div>
          {/* <UncontrolledDropdown>
            <DropdownToggle
              className="icon-btn hide-arrow FiMoreVertical"
              color="transparent"
              size="lg"
            >
              <BsFillChatLeftTextFill size={15} />
            </DropdownToggle>
            <DropdownMenu className="dropdownmenu-z-index">
              <DropdownItem>
                <div className="d-flex align-items-center">
                  <div className="p-2">
                    <HiUsers />
                  </div>
                  <span className="ml-2">New group</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          <Button className="h-100" onClick={handleGroupModal}>
            <BsFillChatLeftTextFill size={20} />
          </Button>
        </div>
      </div>
      <ContactsList
        searchUser={searchUser}
        currentUser={currentUser}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />

      <GroupModal
        open={isGroupModalOpen}
        toggle={handleGroupModal}
        title="Create Group Chat"
      />

      <Toaster />
    </div>
  );
};

export default ChatSidebar;
