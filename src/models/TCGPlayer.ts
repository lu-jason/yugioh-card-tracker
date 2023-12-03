export interface TCGPlayer {
  errors: any[];
  results: TCGPlayerResult[];
}

export interface TCGPlayerResult {
  aggregations: Aggregations;
  algorithm: string;
  searchType: string;
  didYouMean: DidYouMean;
  totalResults: number;
  resultId: string;
  results: ResultResult[];
}

export interface Aggregations {
  cardType: CardType[];
  rarityName: CardType[];
  setName: CardType[];
  productTypeName: CardType[];
  productLineName: CardType[];
}

export interface CardType {
  urlValue: string;
  isActive: boolean;
  value: string;
  count: number;
}

export interface DidYouMean {}

export interface ResultResult {
  shippingCategoryId: number;
  duplicate: boolean;
  productLineUrlName: string;
  productUrlName: string;
  productTypeId: number;
  rarityName: string;
  sealed: boolean;
  marketPrice: number;
  customAttributes: CustomAttributes;
  lowestPriceWithShipping: number;
  productName: string;
  setId: number;
  productId: number;
  score: number;
  setName: string;
  foilOnly: boolean;
  setUrlName: string;
  sellerListable: boolean;
  totalListings: number;
  productLineId: number;
  productStatusId: number;
  productLineName: string;
  maxFulfillableQuantity: number;
  listings: Listing[];
  lowestPrice: number;
}

export interface CustomAttributes {
  description: string;
  attribute: string[];
  detailNote: string;
  releaseDate: Date;
  number: string;
  cardType: string[] | null;
  monsterType: string[];
  cardTypeB: string;
  rarityDbName: string;
  level: string;
  defense: string;
  linkArrows: null;
  flavorText: null;
  attack: string;
}

export interface Listing {
  directProduct: boolean;
  goldSeller: boolean;
  listingId: number;
  channelId: number;
  conditionId: number;
  verifiedSeller: boolean;
  directInventory: number;
  rankedShippingPrice: number;
  productId: number;
  printing: string;
  languageAbbreviation: string;
  sellerName: string;
  forwardFreight: boolean;
  sellerShippingPrice: number;
  language: string;
  shippingPrice: number;
  condition: string;
  languageId: number;
  score: number;
  directSeller: boolean;
  productConditionId: number;
  sellerId: string;
  listingType: string;
  sellerRating: number;
  sellerSales: string;
  quantity: number;
  sellerKey: string;
  price: number;
  customData: CustomData;
}

export interface CustomData {
  images: any[];
}
