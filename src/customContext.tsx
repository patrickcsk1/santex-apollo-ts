import React, { createContext, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ITEM_TO_ORDER, REMOVE_ALL_ORDERS } from './graphql/mutations';
import useStateWithStorage from './hooks/useStateWithStorage';

export interface AppState {
  total: number;
  loading: boolean;
}

const initState: AppState = {
  loading: false,
  total: 0,
};

export interface AppContextType {
  state: AppState;
  addItemToOrder: (product: Product, quantity: number) => void;
  clearBasket: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC = ({ children }) => {
  const [state, setState] = useStateWithStorage<AppState>('santex', initState);
  const [clearOrders] = useMutation(REMOVE_ALL_ORDERS);
  const [addItemToOrderMutation] = useMutation(ADD_ITEM_TO_ORDER);

  const clearBasket = async () => {
    try {
      await clearOrders();
      setState({ ...state, total: 0 });
    } catch (error) {
      console.error('error clearing orders', error);
    }
  };

  const addItemToOrder = async (product: Product, quantity: number) => {
    const productVariantId: string = product.variants[0].id;
    setState({ ...state, loading: true });
    try {
      const { data } = await addItemToOrderMutation({
        variables: {
          productVariantId,
          quantity,
        },
      });
      setState((prevState) => ({
        ...prevState,
        total: data.addItemToOrder.totalWithTax,
        loading: false,
      }));
    } catch (error) {
      console.error('error addint item to order', error);
      setState({ ...state, loading: false });
    }
  };

  return (
    <AppContext.Provider value={{ state, addItemToOrder, clearBasket }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
