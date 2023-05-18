import { useContext, createContext, useReducer } from "react";

const PlacesContext = createContext(null);

const PlacesDispatchContext = createContext(null);

export function PlacesProvider({ children }) {
  const [places, dispatch] = useReducer(placesReducer, initialPlaces);
  return (
    <PlacesContext.Provider value={places}>
      <PlacesDispatchContext.Provider value={dispatch}>
        {children}
      </PlacesDispatchContext.Provider>
    </PlacesContext.Provider>
  );
}

export function usePlaces() {
  return useContext(PlacesContext);
}

export function usePlacesDispatch() {
  return useContext(PlacesDispatchContext);
}

function placesReducer(places, action) {
  switch (action.type) {
    case "added": {
      return [
        ...places,
        {
          id: action.id,
          image: action.image,
          name: action.name,
          address: action.address,
        },
      ];
    }
    case "deleted": {
      return places.filter((p) => p.id !== action.id);
    }
    default: {
      throw Error("Unknow action: " + action.type);
    }
  }
}

const initialPlaces = [
  {
    id: 0,
    image:
      "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg",
    name: "kereminyeri",
    address: "aa",
  },
];
