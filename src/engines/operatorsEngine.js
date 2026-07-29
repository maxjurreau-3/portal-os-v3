export function createOperatorsEngine() {
  const state = { operators: [], logs: [] };

  return {
    registerOperator(name, fn) {
      const op = { name, fn };
      state.operators.push(op);
      console.log("[OperatorsEngine] Operator registered:", name);
      return op;
    },
    runOperator(name, ...args) {
      const op = state.operators.find(o => o.name === name);
      if (!op) {
        console.warn("[OperatorsEngine] Unknown operator:", name);
        return null;
      }
      const result = op.fn(...args);
      state.logs.push({ name, args, result, at: Date.now() });
      return result;
    },
    listOperators() {
      return state.operators;
    },
    getLogs() {
      return state.logs;
    }
  };
}
