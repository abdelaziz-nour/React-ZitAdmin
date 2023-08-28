export const secretKey = "0123456789abcdef0123456789abcdef";
export const BORDER_RADIUS = 3;
export const MAIN_PADDING = 3;
export const BOX_SHADOW = 3;
export const MAIN_GAP = 1;
export const SMALL_PADDING = 1;
export const BIG_GAP = 3;
export const HOST = "https://vzzoz.pythonanywhere.com";
export const SIDEBAR_WIDTH='13rem'

export interface LoginCredentials {
  username: string;
  password: string;
}
export interface LoginResponse {
  data: {
    token: string;
  };
  success: boolean;
  message: string | null;
}
export interface UserData {
  id: number;
  StoreID: string;
  Store: string;
  StoreDeletion: boolean;
  UserName: string;
  Email: string;
}
export interface ProductData {
  id: string;
  Store: string;
  Name: string;
  Price: string;
  Image: string;
}
export interface OrderedItemsData {
  id: string;
  ProductName: string;
  Price: string;
  Quantity: number;
  Subtotal: number;
}
export interface OrderData {
  id: string;
  Store: string;
  Status: string;
  Location: string;
  CreatedBy: string;
  CreatedOn: string;
  OrderItems:Array<OrderedItemsData>;
  Total: number;
}
export interface BestSellerData {
  id: string;
  Owner: string;
  Name: string;
  Image: string;
  OrdersCount: number;
}
export interface BestProductData {
  id: string;
  Store: string;
  Name: string;
  Description: string;
  Price: string;
  Image: string;
  OrdersCount: number;
}
export interface StoreProductData {
  id: string;
  Name: string;
  Description: string;
  Category: string;
  Price: string;
  Image: string;
}
export interface StoreCategoriesData {
  id: string;
  Name: string;
  Image: string;
}
export interface GetUsersResponse {
  data: Array<UserData>;
  success: boolean;
  message: string | null;
}
export interface GetStoresResponse {
  data: Array<{
    id: string;
    Owner: string;
    Name: string;
    Image: string;
  }>;
  success: boolean;
  message: string | null;
}
export interface UsersTableProps {
  users: UserData[];
}
export interface ProductsTableProps {
  products: ProductData[];
}
export interface BestSellersTableProps {
  sellers: BestSellerData[];
}
export interface BestProductsTableProps {
  products: BestProductData[];
}
export interface StoreProductsTableProps {
  products: StoreProductData[];
}
export interface StoreCategoriesTableProps {
  categories: StoreCategoriesData[];
}
export interface OrdersTableProps {
  orders: OrderData[];
}
export interface OrderedItemsPageProps {
  orderedItems: OrderedItemsData[];
}
export interface ListTileData {
  image: string;
  title: string;
  subtitle: string;
  to?: string;
}
export interface AddStoreRequest {
  Image: File;
  Email: string;
  Name: string;
}
export interface getStoreDetailsRequest {
  Store: string;
}
export interface AddStoreResponse {
  data: {};
  success: boolean;
  message: string | null;
}
export interface GetProductsResponse {
  data: Array<ProductData>;
  success: boolean;
  message: string | null;
}
export interface GetOrdersResponse {
  data: Array<OrderData>;
  success: boolean;
  message: string | null;
}
export interface GetBestSellersResponse {
  data: Array<BestSellerData>;
  success: boolean;
  message: string | null;
}
export interface GetBestProductsResponse {
  data: Array<BestProductData>;
  success: boolean;
  message: string | null;
}
export interface GetStoreProductsResponse {
  data: Array<StoreProductData>;
  success: boolean;
  message: string | null;
}
export interface GetStoreCategoriesResponse {
  data: Array<StoreCategoriesData>;
  success: boolean;
  message: string | null;
}
export interface DeleteStoreResponse {
  data: {};
  success: boolean;
  message: string | null;
}