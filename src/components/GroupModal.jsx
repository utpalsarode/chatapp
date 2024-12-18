import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from 'reactstrap';
import { ApiCall, GetApiCall } from '../helper/axios';
import UserListItem from './UserListItem';
import { Toaster, toaster } from './ui/toaster';
import useDebounce from '../hooks/useDebounce';
import { Box } from '@chakra-ui/react';
import UserBadgeItem from './UserBadgeItem';

const GroupModal = ({ open, toggle, title = '', setContacts }) => {
  const token = localStorage.getItem('access-token');
  const [groupName, setGroupName] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearchUser = useDebounce(userSearch, 500);

  const fetchContacts = async (query = '') => {
    setIsLoading(true);
    if (query) {
      let res = await GetApiCall('GET', `/getAllUsers?search=${query}`, {
        authentication: localStorage.getItem('access-token'),
      });
      if (res.data.status === 'success' && res.data.statusCode === 200) {
        const contactsData = res.data.data;
        const updatedData = contactsData.map((data) => {
          return { value: data._id, label: data.name };
        });
        setUsers(contactsData);
        setIsLoading(false);
        return updatedData;
      } else {
        setUsers([]);
        setIsLoading(false);
        return [];
      }
    } else {
      setUsers([]);
      setIsLoading(false);
      return [];
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.find((user) => user._id === userToAdd._id)) {
      toaster.error({
        description: 'User already added',
        type: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  useEffect(() => {
    fetchContacts(debouncedSearchUser.toLowerCase());
  }, [debouncedSearchUser]);

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleCreateChat = async () => {
    try {
      const data = {
        name: groupName,
        users: JSON.stringify(selectedUsers.map((user) => user._id)),
      };
      const res = await ApiCall('POST', '/chat/create-group', data, {
        authentication: token,
      });
      if (res.data.status === 'success' && res.data.statusCode === 200) {
        setContacts((chats) => [res.data.data, ...chats]);
        toggle();
      }
    } catch (error) {
      toaster.error({
        description: 'Error creating chat!',
        type: 'info',
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Modal isOpen={open} toggle={toggle} centered size="md">
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody className="group-modal-content">
          <div>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              type="text"
              placeholder="Group name"
            />
          </div>
          <div>
            <Input
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              type="text"
              placeholder="Search users.."
            />
            <div className="my-2">
              <Box w="100%" display="flex" flexWrap="wrap">
                {selectedUsers.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
              </Box>
            </div>
            <div>
              {isLoading ? (
                <div className="d-flex justify-content-center">Loading...</div>
              ) : users.length ? (
                users
                  ?.slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              if (!groupName || !selectedUsers.length) {
                toaster.error({
                  description: 'Please fill all the feilds',
                  type: 'warning',
                  duration: 2000,
                  isClosable: true,
                  position: 'top',
                });
                return;
              }
              handleCreateChat();
            }}
          >
            Create Chat
          </Button>
        </ModalFooter>
      </Modal>
      <Toaster />
    </>
  );
};

export default GroupModal;
