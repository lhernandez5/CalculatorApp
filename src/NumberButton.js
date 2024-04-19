import { ADD_DIGIT } from "./Actions";

export default function DigitButton({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ calculationType: ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
