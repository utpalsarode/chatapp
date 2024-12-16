import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from 'reactstrap';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { GetApiCall } from '../helper/axios';

const GroupModal = ({ open, toggle, title = '' }) => {
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const fetchContacts = async (query = '') => {
    let res = await GetApiCall('GET', `/getAllUsers?search=${query}`, {
      authentication: localStorage.getItem('access-token'),
    });
    if (res.data.status === 'success' && res.data.statusCode === 200) {
      const contactsData = res.data.data;
      const updatedData = contactsData.map((data) => {
        return { value: data._id, label: data.name };
      });
      setUsers(contactsData);
      setSearchUsers(updatedData);
      setIsLoading(false);
      return updatedData;
    } else {
      setIsLoading(false);
      setSearchUsers([]);
      return [];
    }
  };

  const loadOptions = async (inputValue, callback) => {
    setIsLoading(true);
    return await fetchContacts(inputValue.toLowerCase());
  };
  return (
    <Modal isOpen={open} toggle={toggle} centered>
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
          <AsyncSelect
            isMulti
            cacheOptions
            loadOptions={loadOptions}
            onChange={(data) => setSelectedUsers(data)}
            defaultOptions={[]}
            placeholder="search users.."
            isLoading={isLoading}
          />

          {/* <Select
            options={searchUsers}
            onInputChange={loadOptions}
            placeholder="search users.."
            isLoading={isLoading}
          /> */}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default GroupModal;
