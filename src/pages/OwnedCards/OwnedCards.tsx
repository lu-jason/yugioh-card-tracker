import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
} from '@mui/x-data-grid';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../components/firebaseConfig';
import {
  CardsState,
  addCards,
  addCardsToDb,
  deleteCard,
  selectCards,
} from '../../features/cards/cardSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserId } from '../../features/auth/authSlice';

export default function OwnedCards() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);
  const userId = useAppSelector(selectUserId);

  const [rows, setRows] = useState<GridRowsProp>(cards);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  useEffect(() => {
    setRows(cards);
  }, [cards]);

  useEffect(() => {
    const getCards = async () => {
      if (userId) {
        const querySnapshot = await getDocs(collection(db, userId));

        let cards: CardsState[] = [];

        querySnapshot.forEach((doc) => {
          cards.push(doc.data() as CardsState);
        });

        dispatch(addCards(cards));
      }
    };

    getCards();
  }, [dispatch]);

  const handleDeleteClick = (rowId: GridRowId) => () => {
    if (userId) dispatch(deleteCard({ rowId: rowId, userId: userId }));
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const generateColumns = () => {
    let columns: GridColDef[] = [];

    let columnMap = {
      cardName: 'Card Name',
      rarity: 'Rarity',
      setName: 'Set Name',
      price: 'Price',
    };

    Object.entries(columnMap).forEach(([field, headerName]) => {
      if (field === 'price') {
        columns.push({ field, headerName, width: 80 });
      } else {
        columns.push({ field, headerName, width: 150 });
      }
    });

    columns.push({
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 10,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ];
      },
    });

    return columns;
  };

  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={generateColumns()}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        processRowUpdate={processRowUpdate}
        sx={{ height: '81.85vh' }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
