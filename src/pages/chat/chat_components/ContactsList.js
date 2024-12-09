import React from 'react';
import { FaCircle } from 'react-icons/fa6';
import { Box, Stack } from '@chakra-ui/react';

const ContactsList = React.memo(({ contacts, currentChat, setCurrentChat, loading }) => {
  console.log('Rendering ContactsList');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!contacts.length) {
    return (
      <li className="clearfix py-4">
        <div className="text-center">No results found</div>
      </li>
    );
  }

  return (
    <Stack className="chat-list" pt={2}>
      {/* <ul className="list-unstyled chat-list mb-0"> */}
      {contacts.map((item, index) => (
        <Box
          onClick={() => setCurrentChat(item)}
          cursor="pointer"
          bg={currentChat === item ? '#ffeba7' : 'transparent'}
          color={currentChat === item ? 'black' : 'white'}
          px={3}
          py={2}
          borderRadius="lg"
          key={index}
          className="chat-contact-user"
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
          <img
            src={item.avatarImage ?? "https://bootdey.com/img/Content/avatar/avatar1.png"}
            alt="avatar"
          />
          <div className="about">
            <div className="name">{item.name}</div>
            <div className="status d-flex gap-1 align-items-center">
              <FaCircle className="fa-circle offline" /> left 7 mins ago
            </div>
          </div>
        </Box>
      ))}
      {/* </ul> */}
    </Stack>
  );
});

export default ContactsList;
