import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import withMainLayout from '../layout/MainLayout';
import UserChats from '../components/messages/UserChats';
import UserChatMessages from '../components/messages/UserChatMessages';
import EmptyChat from '../components/messages/EmptyChat';
import axios from 'axios';
import Toast from '../shared/Toast';
import { setNotification } from '../store/storeIndex';
import Socket from '../Socket';

const Users = () => {
  const User = useSelector((state) => state.user.user);
  const notification = useSelector((state) => state.notification.notifications);
  const dispatch = useDispatch();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [allMsgs, setAllMsgs] = useState([]);
  const [message, setMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [conversationId, setConversationId] = useState('');
  const [conversationUser, setConversationUser] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showContent, setShowContent] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/v1/conversations/${User._id}`)
      .then((response) => {
        setConversations(response.data.userConversations);
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
      });
  }, []);

  useEffect(() => {
    setSocket(Socket);
    return () => {
      Socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null) return;
    socket.emit('addNewUser', User._id);
    socket.on('getOnlineUsers', (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off('getOnlineUsers');
    };
  }, [socket, User._id]);

  useEffect(() => {
    if (socket === null) return;
    socket.on('getMessage', (data) => {
      console.log(data);
      const newmessage = {
        receiverId: data.conversationId,
        sender: data.sender,
        message: data.message
      };
      setArrivalMessage(newmessage);
      setMessages((prev) => [...prev, data]);
    });

    socket.on('getNotification', (data) => {
      const isChatOpen = currentChat?.members?.some(
        (member) => member._id.toString() === data.sender.toString()
      );
      if (isChatOpen) {
        dispatch(setNotification([...notification, { ...data, isRead: true }]));
      } else {
        dispatch(setNotification([...notification, data]));
      }
    });
    return () => {
      socket.off('getMessage');
      socket.off('getNotification');
    };
  }, [socket, currentChat, dispatch, notification, setNotification, currentChat]);

  useEffect(() => {
    const updatedNotifications = notification.map((notification) => {
      if (notification.conversationId === currentChat._id) {
        return { ...notification, isRead: true };
      }
      return notification;
    });
    dispatch(setNotification(updatedNotifications));
  }, [currentChat]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const receiverId = currentChat.members.find((member) => member._id !== User._id)?._id;
      const sentMsg = {
        conversationId: currentChat,
        sender: User._id,
        message: message,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      axios
        .post(
          'http://localhost:5001/api/v1/messages',
          {
            conversationId: conversationId,
            sender: User._id,
            message: message,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then(() => {
          if (socket === null) return;
          socket.emit('sendMessage', {
            receiver: receiverId,
            sender: User._id,
            message: message,
            conversationId: conversationId,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          setMessages((prev) => [...prev, sentMsg]);
          setMessage('');
        })
        .catch((error) => {
          Toast.error(error.response.data.message);
        });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setShowSidebar(true);
        setShowContent(true);
      }
      if (window.innerWidth <= 991) {
        setShowSidebar(true);
        setShowContent(false);
      }
      if (window.innerWidth <= 991 && showSidebar) {
        setShowSidebar(true);
        setShowContent(false);
      }
      if (window.innerWidth <= 991 && showContent && conversationId) {
        setShowSidebar(false);
        setShowContent(true);
      }
    };
    if (window.innerWidth <= 991 && showSidebar) {
      setShowSidebar(true);
      setShowContent(false);
    } else if (window.innerWidth <= 991 && showContent) {
      setShowSidebar(false);
      setShowContent(true);
    } else if (window.innerWidth >= 992) {
      setShowSidebar(true);
      setShowContent(true);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showSidebar, showContent]);
  return (
    <Container fluid>
      <Row>
        {showSidebar && (
          <Col xs="12" lg="4" className="ps-0">
            <span>
              <UserChats
                setShowSidebar={setShowSidebar}
                setShowContent={setShowContent}
                setConversationId={setConversationId}
                setConversationUser={setConversationUser}
                conversationUser={conversationUser}
                conversations={conversations}
                setCurrentChat={setCurrentChat}
                currentChat={currentChat}
                allMsgs={allMsgs}
                setAllMsgs={setAllMsgs}
                setMessages={setMessages}
                onlineUsers={onlineUsers}
                notification={notification}
              />
            </span>
          </Col>
        )}
        {showContent && (
          <Col xs="12" lg={showSidebar ? '8' : '12'} className="pe-0">
            {conversationId ? (
              <UserChatMessages
                setShowSidebar={setShowSidebar}
                setShowContent={setShowContent}
                conversationId={conversationId}
                conversationUser={conversationUser}
                Socket={socket}
                sendMessage={sendMessage}
                message={message}
                setMessage={setMessage}
                arrivalMessage={arrivalMessage}
                messages={messages}
                setMessages={setMessages}
              />
            ) : (
              <EmptyChat />
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default withMainLayout(Users);
