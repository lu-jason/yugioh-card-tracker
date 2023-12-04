import { Button, CircularProgress, Grid, MenuItem, Popover } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowSelectionModel,
  GridValidRowModel,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getRaritiesAndSets, imageURLFull, imageURLSmall } from '../../API/tcgplayer';

import { CardsState, addCards, addCardsToDb, toCardsStates } from '../../features/cards/cardSlice';
import { selectUserId } from '../../features/auth/authSlice';

const rarities = ['Rare', 'Secret Rare'];
const sets = ['Set 1', 'Set 2'];

export default function SearchCards() {
  const [cardName, setCardName] = useState('effect veiler');
  const [setName, setSetName] = useState(rarities[0]);
  const [rarityName, setRarityName] = useState(sets[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popOverId, setPopOverId] = useState<string | null>(null);

  const [searchData, setSearchData] = useState<GridValidRowModel[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>([]);

  const dispatch = useAppDispatch();
  const open = Boolean(anchorEl?.id === popOverId);

  const userId = useAppSelector(selectUserId);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, id: string | undefined) => {
    if (id) {
      setAnchorEl(event.currentTarget);
      setPopOverId(id);
    }
  };

  const handlePopoverClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    setPopOverId(null);
  };

  const generateColumns = () => {
    let columns: GridColDef[] = [];

    let columnMap = {
      picture: '',
      cardName: 'Card Name',
      rarity: 'Rarity',
      setName: 'Set Name',
      price: 'Price',
    };

    Object.entries(columnMap).forEach(([field, headerName]) => {
      if (field === 'picture') {
        columns.push({
          field,
          headerName,
          width: 50,
          renderCell: (params: GridRenderCellParams<any, string>) => (
            <Box>
              <Popover
                sx={{ pointerEvents: 'none', bottom: 0 }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                {popOverId && (
                  <img
                    alt={popOverId}
                    src={`${imageURLFull}${popOverId}.jpg`}
                  ></img>
                )}
              </Popover>

              <img
                id={params.value}
                alt={params.value}
                src={`${imageURLSmall}${params.value}.jpg`}
                onMouseEnter={(e) => handlePopoverOpen(e, params.value)}
                onMouseLeave={handlePopoverClose}
              ></img>
            </Box>
          ),
        });
      } else if (field === 'price') {
        columns.push({ field, headerName, width: 80 });
      } else {
        columns.push({ field, headerName, width: 150 });
      }
    });

    return columns;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(cardName);
    console.log(setName);
    console.log(rarityName);
    getRaritiesAndSets(cardName, setSearchData, setIsLoading);
    setIsLoading(true);
  };

  const handleAddToList = () => {
    let selectedRows: CardsState[] = toCardsStates(
      searchData.filter((row) => selectedRowIds.includes(row.id)),
    );
    if (userId) {
      dispatch(addCards(selectedRows));
      dispatch(addCardsToDb({ rows: selectedRows, userId: userId }));
    }
  };

  return (
    <Grid>
      <Grid
        item
        xs={12}
      >
        <Box
          component='form'
          noValidate
          sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
          autoComplete='false'
          onSubmit={(e) => onSubmit(e)}
        >
          <TextField
            required
            id='card-name-required'
            label='Card Name'
            defaultValue='effect veiler'
            onChange={(e) => setCardName(e.target.value)}
          ></TextField>
          <TextField
            required
            select
            id='rarity'
            label='Rarity'
            defaultValue={rarities[0]}
            helperText='Select rarity of the card'
            onChange={(e) => setRarityName(e.target.value)}
          >
            {rarities.map((rarity) => (
              <MenuItem
                key={rarity}
                value={rarity}
              >
                {rarity}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            select
            id='set'
            label='Set'
            defaultValue={sets[0]}
            helperText='Select set of the card'
            onChange={(e) => setSetName(e.target.value)}
          >
            {sets.map((set) => (
              <MenuItem
                key={set}
                value={set}
              >
                {set}
              </MenuItem>
            ))}
          </TextField>
          <Box>
            <Button type='submit'>Search</Button>
            <Button
              type='button'
              onClick={handleAddToList}
            >
              Add to list
            </Button>
            {isLoading && <CircularProgress size='1rem'></CircularProgress>}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ height: '70vh' }}
      >
        <DataGrid
          rows={searchData}
          columns={generateColumns()}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setSelectedRowIds(newRowSelectionModel);
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 50, page: 0 },
            },
          }}
        ></DataGrid>
      </Grid>
    </Grid>
  );
}
