import React, { useCallback, useEffect, useState } from 'react';
import { FaSistrix } from 'react-icons/fa6';
import InputTextField from '../../../components/InputTextFiled';
import ContactsList from './ContactsList';
import useDebounce from '../../../hooks/useDebounce';
import { GetApiCall } from '../../../helper/axios';

const ChatSidebar = ({ setCurrentChat }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('access-token');
  const [searchUser, setSearchUser] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchUser = useDebounce(searchUser, 500);

  const fetchContacts = useCallback(async (searchQuery = '') => {
    setLoading(true);
    try {
      // const response = await fetch(
      //   `/api/getAllUsers?search=${encodeURIComponent(searchQuery)}`,
      // );
      const url = searchQuery ? `/getAllUsers/${userData.id}?search=${searchQuery}` : `/getAllUsers/${userData.id}`
      const res = await GetApiCall('GET', url, { authentication: token });
      if (res.data.status === 'success' && res.data.statusCode === 200) {
        setContacts(res.data.data);
      } else {
        setContacts([]);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    }
    setLoading(false);
  }, [])

  // Fetch contacts whenever the debounced search term changes
  useEffect(() => {
    fetchContacts(debouncedSearchUser);
  }, [debouncedSearchUser, fetchContacts]);

  return (
    <div id="plist" className="people-list col-xl-4 col-lg-3 col-md-4">
      <div className="input-group input-search-contact mb-3">
        <span className="input-group-text px-3 py-2 btn">
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
      <ContactsList
        contacts={contacts}
        setCurrentChat={setCurrentChat}
        loading={loading}
      />
    </div>
  );
};

export default ChatSidebar;
