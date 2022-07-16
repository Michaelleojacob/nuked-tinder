import { useEffect } from 'react';
import { createMock } from '../firebase-utils/firestore-newUser';
import { mockPeopleArr } from './dummyProfiles';

export const useMockHumans = () => {
  useEffect(() => {
    const addMocksToFirestore = async () => {
      mockPeopleArr.forEach((person) => {
        createMock(person);
      });
    };
    addMocksToFirestore();
    return () => {};
  }, []);
};
