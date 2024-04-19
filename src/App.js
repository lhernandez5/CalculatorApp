import { useReducer } from "react";
import "./styles.css";
import NumberButton from "./NumberButton";
import OperationButton from "./OperationButton";
import { ADD_DIGIT, CHOOSE_OPERATION, CLEAR, DELETE_DIGIT, EVALUATE } from "./Actions";

function reducer(state, { calculationType, payload }) {
  switch (calculationType) {
    case ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case CLEAR:
      return {};
    case DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) {
        return state;
      }
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) {
    return "";
  }
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div>
      <h1 className="heading">Calculator</h1>
        <div className="calculator-grid">
          <div className="output">
            <div className="previous-operand">
              {previousOperand} {operation}
            </div>
            <div className="current-operand">{currentOperand}</div>
          </div>
          <button
            className="span-two"
            onClick={() => dispatch({ calculationType: CLEAR })}
          >
            AC
          </button>
          <button
            onClick={() => dispatch({ calculationType: DELETE_DIGIT })}
          >
            DEL
          </button>
          <OperationButton operation="÷" dispatch={dispatch} />
          <NumberButton digit="1" dispatch={dispatch} />
          <NumberButton digit="2" dispatch={dispatch} />
          <NumberButton digit="3" dispatch={dispatch} />
          <OperationButton operation="*" dispatch={dispatch} />
          <NumberButton digit="4" dispatch={dispatch} />
          <NumberButton digit="5" dispatch={dispatch} />
          <NumberButton digit="6" dispatch={dispatch} />
          <OperationButton operation="+" dispatch={dispatch} />
          <NumberButton digit="7" dispatch={dispatch} />
          <NumberButton digit="8" dispatch={dispatch} />
          <NumberButton digit="9" dispatch={dispatch} />
          <OperationButton operation="-" dispatch={dispatch} />
          <NumberButton digit="." dispatch={dispatch} />
          <NumberButton digit="0" dispatch={dispatch} />
          <button
            className="span-two"
            onClick={() => dispatch({ calculationType: EVALUATE })}
          >
            =
          </button>
        </div>
    </div>
  );
}

export default App;
