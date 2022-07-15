const newUserFactory = (uid) => {
  return {
    uid: uid || null,
    fullName: '',
    first: '',
    last: '',
    age: '',
    bio: '',
    mainPhoto: null,
    photos: [],
    jobTitle: '',
    location: '',
    interests: [],
    firstTimeUser: true,
  };
};
export default newUserFactory;
