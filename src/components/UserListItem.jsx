import { Avatar } from './ui/avatar';
import { Box, Text } from '@chakra-ui/react';

const UserListItem = ({ key, user, handleFunction }) => {
  return (
    <Box
      key={key}
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: '#38B2AC',
        color: 'white',
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      mx={0}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box display={'flex'} flexDirection={'column'}>
        <Text as={'span'}>{user.name}</Text>
        <Text as={'span'} fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
