const sortChatUsersId = (user1Id: number, user2Id: number) => {
  if (user1Id < user2Id) {
    return [user1Id, user2Id];
  } else {
    return [user2Id, user1Id];
  }
};

export default sortChatUsersId;
