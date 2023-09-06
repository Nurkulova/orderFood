import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  isModalOpen: false,
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { isModalOpen: true };
    case 'CLOSE_MODAL':
      return { isModalOpen: false };
    default:
      return state;
  }
};

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, dispatch] = useReducer(modalReducer, initialState);

  const openModalHandler = () => dispatch({ type: 'OPEN_MODAL' });
  const closeModalHandler = () => dispatch({ type: 'CLOSE_MODAL' });

  return (
    <ModalContext.Provider
      value={{
        isModalOpen: modalState.isModalOpen,
        onClose: closeModalHandler,
        onOpen: openModalHandler,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
