import React, { useCallback, useEffect, useState } from 'react';
import { Box, For, HStack, Stack } from '@chakra-ui/react';
import { Skeleton, SkeletonCircle } from '../../../components/ui/skeleton';
import { ChatState } from '../../ChatProvider';
import useDebounce from '../../../hooks/useDebounce';
import { GetApiCall } from '../../../helper/axios';
import { Toaster, toaster } from '../../../components/ui/toaster';
import LazyImage from '../../../components/LazyImage';
import { getSender } from '../../../helper/commonFunction';

const ContactsList = React.memo(({ searchUser, fetchDataAgain }) => {
  const token = localStorage.getItem('access-token');
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [loading, setLoading] = useState(false);
  const debouncedSearchUser = useDebounce(searchUser, 500);

  const fetchContacts = useCallback(async (searchQuery = '') => {
    setLoading(true);
    try {
      const res = await GetApiCall('GET', '/chat', { authentication: token });
      if (res.data.status === 'success' && res.data.statusCode === 200) {
        setChats(res.data.data);
      } else {
        setChats([]);
      }
    } catch (error) {
      toaster.error({
        description: 'Error fetching contacts!',
        type: 'info',
        duration: 2000,
      });
      console.error('Error fetching contacts:', error);
      setChats([]);
    }
    setLoading(false);
  }, []);

  // Fetch contacts whenever the debounced search term changes
  useEffect(() => {
    fetchContacts(debouncedSearchUser);
  }, [debouncedSearchUser, fetchContacts, fetchDataAgain]);

  if (loading) {
    return (
      <For each={[1, 2, 3]}>
        {(item) => (
          <HStack gap="10" marginY={2} paddingInline={3} gapX={2} key={item}>
            <SkeletonCircle size="11" />
            <Stack flex="1">
              <Skeleton height="4" width="40%" />
              <Skeleton height="4" width="40%" />
            </Stack>
          </HStack>
        )}
      </For>
    );
  }

  const filteredChats = chats?.filter((chat) => {
    if (!searchUser) return true;
    const nameToCompare = !chat.isGroupChat ? getSender(user, chat.users) : chat.chatName;
    return nameToCompare?.toLowerCase().includes(searchUser.toLowerCase());
  }) ?? [];

  if (!filteredChats.length) {
    return (
      <li className="clearfix py-4">
        <div className="text-center">No results found</div>
      </li>
    );
  }

  return (
    <Stack className="chat-list" pt={2}>
      {filteredChats.map((chat, index) => (
        <Box
          onClick={() => setSelectedChat(chat)}
          cursor="pointer"
          bg={selectedChat?._id === chat?._id ? '#ffeba7' : 'transparent'}
          color={selectedChat?._id === chat?._id ? 'black' : 'white'}
          px={3}
          py={2}
          borderRadius="lg"
          key={chat._id}
          className="chat-contact-user"
          display={'flex'}
        >
          {/* <Text>
            {!chat.isGroupChat
              ? getSender(loggedUser, chat.users)
              : chat.chatName}
          </Text>
          {chat.latestMessage && (
            <Text fontSize="xs">
              <b>{chat.latestMessage.sender.name} : </b>
              {chat.latestMessage.content.length > 50
                ? chat.latestMessage.content.substring(0, 51) + "..."
                : chat.latestMessage.content}
            </Text>
              )} */}
          <LazyImage
            src={chat.avatarImage ?? 'https://bootdey.com/img/Content/avatar/avatar1.png'}
            placeholder="https://bootdey.com/img/Content/avatar/avatar1.png"
            alt="Example"
            width="45px"
            height="45px"
          />
          {/* <img
              src={
                chat.avatarImage ??
                'https://bootdey.com/img/Content/avatar/avatar1.png'
              }
              loading="lazy"
              alt="avatar"
            /> */}
          {/* <Text>
                  {!chat.isGroupChat
                    ? getSender(currentUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>)} */}
          <div className="about">
            <div className="name">{!chat.isGroupChat ? getSender(user, chat.users) : chat.chatName}</div>
            <div className="status d-flex gap-1 align-items-center">
              {/* <FaCircle className="fa-circle offline" /> left 7 mins ago */}
              {chat.latestMessage && (
                <p fontSize="xs">
                  <b>{chat.latestMessage.sender?.name} : </b>
                  {chat.latestMessage.message?.length > 50 ? chat.latestMessage.message.substring(0, 51) + '...' : chat.latestMessage.message}
                </p>
              )}
            </div>
          </div>
        </Box>
      ))}
      {/* </ul> */}
      <Toaster />
    </Stack>
  );
});

export default ContactsList;
