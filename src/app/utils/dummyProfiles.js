export const mockPeopleArr = [];

const botFactory = ({ uid, first, last, age, bio, mainPhoto, photos }) => {
  const obj = { uid, first, last, age, bio, mainPhoto, photos };
  mockPeopleArr.push(obj);
};

const AnaDeArmas = botFactory({
  uid: 'tiLhAdWqJVT5cK4AMz4kQpnCfvB4',
  first: 'Anna',
  last: 'Armas',
  age: '26',
  bio: 'person',
  mainPhoto: process.env.PUBLIC_URL + '/anaArmas.ico',
  photos: [process.env.PUBLIC_URL + '/anaArmas.ico'],
});
const bradPit = botFactory({
  uid: 'OqLiilZ7EERorBFi1xzWdTPPswLd',
  first: 'brad',
  last: 'pit',
  age: '58',
  bio: 'Mickey ONeil',
  mainPhoto: process.env.PUBLIC_URL + 'mickey-oneil.jpg',
  photos: [process.env.PUBLIC_URL + 'mickey-oneil.jpg'],
});
const oliviaMun = botFactory({
  uid: 'OqLiilZ7EERoQBFi1xzWdTPPswLd',
  first: 'Olivia',
  last: 'Munn',
  age: '24',
  bio: 'idk',
  mainPhoto: process.env.PUBLIC_URL + 'Olivia_Munn.jpg',
  photos: [process.env.PUBLIC_URL + 'Olivia_Munn.jpg'],
});
const derpyCat = botFactory({
  uid: 'OqLiilZ7EERoQBFi1xzTdTPPswLd',
  first: 'derpy',
  last: 'cat',
  age: '104',
  bio: 'lolxd',
  mainPhoto: process.env.PUBLIC_URL + 'derpcat.png',
  photos: [process.env.PUBLIC_URL + 'derpcat.png'],
});
const watson = botFactory({
  uid: 'OqLpilZ7EERoQBFi1xzTdTPPswLd',
  first: 'Emma',
  last: 'Watson',
  age: '23',
  bio: 'hermione',
  mainPhoto: process.env.PUBLIC_URL + 'emmaWatson.webp',
  photos: [process.env.PUBLIC_URL + 'emmaWatson.webp'],
});
const dwayne = botFactory({
  uid: 'OqLpilZ7EERbQBFi1xzTdTPPswLd',
  first: 'Dwayne',
  last: 'Johnson',
  age: '47',
  bio: 'the rock',
  mainPhoto: process.env.PUBLIC_URL + 'rock.jpg',
  photos: [process.env.PUBLIC_URL + 'rock.jpg'],
});
