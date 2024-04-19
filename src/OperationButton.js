import { CHOOSE_OPERATION } from "./Actions";

export default function OperationButton({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({ calculationType: CHOOSE_OPERATION, payload: { operation } })}
    >
      {operation}
    </button>
  );
}