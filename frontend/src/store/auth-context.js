import React from "react";

const SearchOwnerNameContext = React.createContext();

export const SearchOwnerNameProvider = SearchOwnerNameContext.Provider
export const SearchOwnerNameConsumer = SearchOwnerNameContext.Consumer

export default SearchOwnerNameContext;