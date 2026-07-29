export function createOperatorsEngine() {
  const state = { operators: [], logs: [] };

  function registerOperator(name, fn) {
    const op = { name, fn };
    state.operators.push(op);
    console.log("[OperatorsEngine] Operator registered:", name);
    return op;
  }

  function runOperator(name, ...args) {
    const op = state.operators.find(o => o.name === name);
    if (!op) {
      console.warn("[OperatorsEngine] Unknown operator:", name);
      return null;
    }
    const result = op.fn(...args);
    state.logs.push({ name, args, result, at: Date.now() });
    console.log("[OperatorsEngine] Operator executed:", name, "→", result);
    return result;
  }

  function listOperators() {
    return state.operators;
  }

  function getLogs() {
    return state.logs;
  }

  // default operators
  registerOperator("ping", () => "pong");
  registerOperator("timestamp", () => Date.now());

  return {
    registerOperator,
    runOperator,
    listOperators,
    getLogs
  };
}
