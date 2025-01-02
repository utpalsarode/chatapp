import { Avatar } from '../../../components/ui/avatar';
import { Tooltip } from '../../../components/ui/tooltip';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../../helper/commonFunction';
import { ChatState } from '../../ChatProvider';
import { Spinner } from 'reactstrap';

const ScrollableChat = ({ messages, loading }) => {
  const { user } = ChatState();

  return !loading ? (
    messages?.length ? (
      messages.map((m, i) => (
        <div style={{ display: 'flex' }} key={m._id}>
          {(isSameSender(messages, m, i, user.id) || isLastMessage(messages, i, user.id)) && (
            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
              <Avatar mt="7px" mr={1} size="sm" cursor="pointer" name={m.sender.name} src={m.sender.avatarImage} />
            </Tooltip>
          )}
          <span
            style={{
              backgroundColor: `${m.sender._id === user.id ? '#BEE3F8' : '#ffeba7'}`,
              color: 'black',
              marginLeft: isSameSenderMargin(messages, m, i, user.id),
              marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
              borderRadius: '20px',
              padding: '5px 15px',
              maxWidth: '75%',
            }}
          >
            {m.message}
          </span>
        </div>
      ))
    ) : (
      <span>No messages</span>
    )
  ) : (
    <div className="chat-history-loader">
      <Spinner />
    </div>
  );
};

export default ScrollableChat;
