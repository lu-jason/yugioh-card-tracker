import { collection, getDocs, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from '../../components/firebaseConfig';
import { CardsState } from './cardSlice';
import { store } from '../../store';

export const addCardsToFirebase = async (cards: CardsState, id: string) => {
  try {
    let cardFromFirebase = await getDoc(doc(db, id, String(cards.id)));
    if (!cardFromFirebase.exists()) {
      await setDoc(doc(db, id, String(cards.id)), cards);
      console.log('Added card', cards.cardName);
    } else {
      console.log('Card already previously added', cards.cardName);
    }
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getCardsFromFirebase = async (id: string): Promise<CardsState[]> => {
  const querySnapshot = await getDocs(collection(db, 'cards'));

  let cards: CardsState[] = [];

  querySnapshot.forEach((doc) => {
    cards.push(doc.data() as CardsState);
  });

  return cards;
};

export const deleteCardFromFirebase = async (id: string, userId: string) => {
  let cardFromFirebase = await getDoc(doc(db, 'cards', String(id)));

  if (cardFromFirebase.exists()) {
    console.log('Deleted card with id', id);
    deleteDoc(cardFromFirebase.ref);
  }
};
