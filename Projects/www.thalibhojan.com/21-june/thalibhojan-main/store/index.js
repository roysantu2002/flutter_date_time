import { createStore, applyMiddleware, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";
import { catalog, thalis, options, subsOptions } from ".//data/menus"
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { firebase } from "../utils/firebase";
import { loadState } from "../utils/helpers";

const localState = loadState();

console.log(localState)

// let persistedState =
//   localState && localState.length
//     ? localState
//     : {
//         thalis: thalis,
//         catalog: catalog,
//         options: options,
//         subsOptions: subsOptions,
//         total: 0,
//         shipping: 0,
//         addedItems: [],
//       };


export const newStore = () => {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunk.withExtraArgument({
          getFirebase,
          getFirestore,
        })
      ),
      reduxFirestore(firebase)
    )
  );
};
export const wrapper = createWrapper(newStore, { debug: true });
