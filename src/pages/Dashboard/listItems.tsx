import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import FolderIcon from '@mui/icons-material/Folder';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary='Search' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary='Owned' />
    </ListItemButton>
  </React.Fragment>
);
