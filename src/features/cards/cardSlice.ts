import { GridRowId, GridValidRowModel } from '@mui/x-data-grid';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { addCardsToFirebase, deleteCardFromFirebase } from './firebaseAPI';

// Define a type for the slice state
export interface CardsState {
  id: number;
  cardName: string;
  rarity: string;
  setName: string;
  price: number;
}

export const toCardsState = (rowModel: GridValidRowModel): CardsState => {
  return {
    id: rowModel.id,
    cardName: rowModel.cardName,
    setName: rowModel.setName,
    price: rowModel.price,
    rarity: rowModel.rarity,
  };
};

export const toCardsStates = (rowModel: GridValidRowModel[]): CardsState[] => {
  return rowModel.map((data) => {
    return {
      id: data.id,
      cardName: data.cardName,
      setName: data.setName,
      price: data.price,
      rarity: data.rarity,
    };
  });
};

// Define the initial state using that type
const initialState: CardsState[] = [];

export const cardsSlice = createSlice({
  name: 'cards',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<GridValidRowModel>) => {
      state.push(toCardsState(action.payload));
    },
    addCards: (state, action: PayloadAction<GridValidRowModel[]>) => {
      toCardsStates(action.payload).forEach((payloadValue: CardsState) => {
        if (
          state.findIndex((value: CardsState) => {
            return payloadValue.id === value.id;
          }) === -1
        ) {
          state.push(payloadValue);
        }
      });
    },
    addCardsToDb: (_, action: PayloadAction<{ rows: GridValidRowModel[]; userId: string }>) => {
      toCardsStates(action.payload.rows).forEach((payloadValue: CardsState) => {
        addCardsToFirebase(toCardsState(payloadValue), action.payload.userId);
      });
    },
    deleteCard: (state, action: PayloadAction<{ rowId: GridRowId; userId: string }>) => {
      let id = Number(action.payload.rowId);
      deleteCardFromFirebase(String(id), action.payload.userId);

      return state.filter((value) => value.id !== id);
    },
  },
});

export const { addCard, addCards, addCardsToDb, deleteCard } = cardsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCards = (state: RootState) => state.cards;

export default cardsSlice.reducer;
