import { GridValidRowModel } from '@mui/x-data-grid';
import React, { Dispatch } from 'react';
import { TCGPlayer } from '../models/TCGPlayer';

const searchURL = 'https://mp-search-api.tcgplayer.com/v1/search/request?q=';
export const imageURLSmall = 'https://product-images.tcgplayer.com/fit-in/50x50/';
export const imageURLFull = 'https://product-images.tcgplayer.com/fit-in/420x420/';
const corsProxy = 'https://corsproxy.io/?';
const emptyBody = {
  algorithm: 'sales_exp_fields_experiment',
  from: 0,
  size: 24,
  filters: {
    term: {
      productLineName: ['yugioh'],
    },
    range: {},
    match: {},
  },
  listingSearch: {
    context: {
      cart: {},
    },
    filters: {
      term: {
        sellerStatus: 'Live',
        channelId: 0,
      },
      range: {
        quantity: {
          gte: 1,
        },
      },
      exclude: {
        channelExclusion: 0,
      },
    },
  },
  context: {
    cart: {},
    shippingCountry: 'AU',
  },
  settings: {
    useFuzzySearch: true,
    didYouMean: {},
  },
  sort: {},
};

export const getRaritiesAndSets = (
  cardName: string,
  setSearchData: Dispatch<React.SetStateAction<GridValidRowModel[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(emptyBody),
  };

  fetch(`${corsProxy}${searchURL}${encodeURIComponent(cardName)}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let parsedResult: TCGPlayer = result;

      let resultArray: GridValidRowModel[] = parsedResult.results[0].results.map((result) => {
        return {
          id: result.productId,
          cardName: result.productName,
          setName: result.setName,
          rarity: result.rarityName,
          price: result.marketPrice,
          picture: `${result.productId}`,
          fullPicture: `${imageURLFull}${result.productId}.jpg`,
        };
      });

      setSearchData(resultArray);
      setIsLoading(false);
    });
};
