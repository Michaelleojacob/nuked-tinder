const newUserFactory = (uid) => {
  return {
    uid: uid || null,
    fullName: null,
    first: null,
    last: null,
    age: null,
    bio: null,
    mainPhoto: null,
    photos: [],
    jobTitle: null,
    location: null,
    interests: [],
  };
};
export default newUserFactory;
