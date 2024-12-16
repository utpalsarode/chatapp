import React from 'react';
import { FaCircle } from 'react-icons/fa6';
import { Box, For, HStack, Stack } from '@chakra-ui/react';
import { Skeleton, SkeletonCircle } from '../../../components/ui/skeleton';

const ContactsList = React.memo(
  ({ contacts, currentUser, currentChat, setCurrentChat, loading }) => {
    console.log('Rendering ContactsList');

    if (loading) {
      return <For each={[1, 2, 3]}>
      {(item) => <HStack gap="10" marginY={2} paddingInline={3} gapX={2} key={item}>
        <SkeletonCircle size="11" />
        <Stack flex="1">
          <Skeleton height="4" width="40%" />
          <Skeleton height="4" width="40%" />
        </Stack>
      </HStack>}
    </For>;
    }

    if (!contacts.length) {
      return (
        <li className="clearfix py-4">
          <div className="text-center">No results found</div>
        </li>
      );
    }

    const getSender = (loggedUser, users) => {
      return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
    };

    return (
      <Stack className="chat-list" pt={2}>
        {/* <ul className="list-unstyled chat-list mb-0"> */}
        {contacts.map((chat, index) => (
          <Box
            onClick={() => setCurrentChat(chat)}
            cursor="pointer"
            bg={currentChat === chat ? '#ffeba7' : 'transparent'}
            color={currentChat === chat ? 'black' : 'white'}
            px={3}
            py={2}
            borderRadius="lg"
            key={index}
            className="chat-contact-user"
          >
            {console.log('chat.latestMessage', chat.latestMessage)}
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
              src={
                chat.avatarImage ??
                'https://bootdey.com/img/Content/avatar/avatar1.png'
              }
              alt="avatar"
            />
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
              <div className="name">{!chat.isGroupChat
                    ? getSender(currentUser, chat.users)
                    : chat.chatName}</div>
              <div className="status d-flex gap-1 align-items-center">
                {/* <FaCircle className="fa-circle offline" /> left 7 mins ago */}
                {chat.latestMessage && (
                  <p fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </p>)}
              </div>
            </div>
          </Box>
        ))}
        {/* </ul> */}
      </Stack>
    );
  },
);

export default ContactsList;
