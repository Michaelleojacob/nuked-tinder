/* eslint-disable */
export const mockPeopleArr = [];

const botFactory = ({ uid, first, last, age, bio, mainPhoto, photos }) => {
  const obj = {
    uid,
    first,
    last,
    age,
    bio,
    mainPhoto,
    photos,
    likedUsers: ['gszdhgHeRMRQbm3BWhNtQlLLyHf1'],
  };
  mockPeopleArr.push(obj);
};

const AnaDeArmas = botFactory({
  uid: 'OqLiilZ7EERorBFi1xzWdTPPsmLd',
  first: 'Ana',
  last: 'Armas',
  age: '26',
  bio: 'person',
  mainPhoto: 'assets/images//anaArmas.ico',
  photos: ['assets/images//anaArmas.ico'],
});
const bradPit = botFactory({
  uid: 'OqLiilZ7EERorBFi1xzWdTPPswLd',
  first: 'brad',
  last: 'pit',
  age: '58',
  bio: 'Mickey ONeil',
  mainPhoto: 'assets/images/mickey-oneil.jpg',
  photos: ['assets/images/mickey-oneil.jpg'],
});
const oliviaMun = botFactory({
  uid: 'OqLiilZ7EERoQBFi1xzWdTPPswLd',
  first: 'Olivia',
  last: 'Munn',
  age: '24',
  bio: 'idk',
  mainPhoto: 'assets/images/Olivia_Munn.jpg',
  photos: ['assets/images/Olivia_Munn.jpg'],
});
const derpyCat = botFactory({
  uid: 'OqLiilZ7EERoQBFi1xzTdTPPswLd',
  first: 'derpy',
  last: 'cat',
  age: '104',
  bio: 'lolxd',
  mainPhoto: 'assets/images/derpcat.png',
  photos: ['assets/images/derpcat.png'],
});
const watson = botFactory({
  uid: 'OqLpilZ7EERoQBFi1xzTdTPPswLd',
  first: 'Emma',
  last: 'Watson',
  age: '23',
  bio: 'hermione',
  mainPhoto: 'assets/images/emmaWatson.webp',
  photos: ['assets/images/emmaWatson.webp'],
});
const dwayne = botFactory({
  uid: 'OqLpilZ7EERbQBFi1xzTdTPPswLd',
  first: 'Dwayne',
  last: 'Johnson',
  age: '47',
  bio: 'the rock',
  mainPhoto: 'assets/images/rock.jpg',
  photos: ['assets/images/rock.jpg'],
});
const jennifer = botFactory({
  uid: 'OqLpilZ7EERbQBFi1xzTdlPPswLd',
  first: 'jennifer',
  last: 'aniston',
  age: '43',
  bio: 'Rachel from friends',
  mainPhoto: 'assets/images/jenAniston.jpg',
  photos: ['assets/images/jenAniston.jpg'],
});
const tomc = botFactory({
  uid: 'OqLpilZ7EERbQBFi1xzTdsPPswLd',
  first: 'tom',
  last: 'cruise',
  age: '50',
  bio: 'top gun',
  mainPhoto: 'assets/images/tomC.jpg',
  photos: ['assets/images/tomC.jpg'],
});
const tomh = botFactory({
  uid: 'OqLpilZ7EERbQBFi1xjTdTPPswLd',
  first: 'tom',
  last: 'hanks',
  age: '60',
  bio: 'princess amadalla',
  mainPhoto: 'assets/images/tomH.jpg',
  photos: ['assets/images/tomH.jpg'],
});
const emmaS = botFactory({
  uid: 'OqLpilZ7EERbQBFi1xqTdTPPswLd',
  first: 'emma',
  last: 'stone',
  age: '20',
  bio: 'easy A',
  mainPhoto: 'assets/images/emmaStone.jpg',
  photos: ['assets/images/emmaStone.jpg'],
});
