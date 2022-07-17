const newUserFactory = (uid) => {
  return {
    uid: uid || null,
    first: '',
    last: '',
    age: '',
    bio: '',
    mainPhoto: null,
    photos: [],
    likedUsers: [],
    firstTimeUser: true,
  };
};
export default newUserFactory;
