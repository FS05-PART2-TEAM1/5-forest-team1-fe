// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("https://five-forest-team1.onrender.com/api/studies");

// const NotificationSystem = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);

//   useEffect(() => {
//     // 사용자 등록
//     socket.emit("registerUser", userId);

//     // 알림 수신
//     socket.on("receiveNotification", (message) => {
//       setNotifications((prev) => [...prev, message]);
//       setUnreadCount((prev) => prev + 1);
//     });

//     return () => {
//       socket.off("receiveNotification");
//     };
//   }, [userId]);

//   // 알림 클릭 시 읽음 처리
//   const handleNotificationClick = (index) => {
//     setUnreadCount((prev) => Math.max(0, prev - 1));
//   };

//   return (
//     <div>
//       <h3>🔔 알림 ({unreadCount})</h3>
//       <ul>
//         {notifications.map((noti, index) => (
//           <li key={index} onClick={() => handleNotificationClick(index)}>
//             {noti}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotificationSystem;
