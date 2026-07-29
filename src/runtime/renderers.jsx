import {
  simCreateSpace,
  simListSpaces,
  simGetActiveSpace,
  simSwitchSpace
} from "../modules/sim/index.js";

export const ModuleRenderers = {
  games: () => ({
    title: "Games Engine",
    description: "Interactive systems and simulations.",
    content: <div>Games Engine surface.</div>
  }),
  "identity-physics": () => ({
    title: "Identity Physics",
    description: "Structures of self and field.",
    content: <div>Identity Physics surface.</div>
  }),
  operators: () => ({
    title: "Operators",
    description: "Control plane and system operators.",
    content: <div>Operators surface.</div>
  }),
  sim: () => {
    const spaces = simListSpaces();
    const active = simGetActiveSpace();

    return {
      title: "SIM Core",
      description: "Simulation architecture and cognitive space.",
      content: (
        <div>
          <p>Active space: {active ? active.name : "none"}</p>

          <button
            onClick={() =>
              simCreateSpace(
                `space-${Date.now()}`,
                { mode: "dynamic" }
              )
            }
          >
            Create new space
          </button>

          <div style={{ marginTop: "12px" }}>
            <strong>Spaces:</strong>
            <ul>
              {spaces.map(s => (
                <li key={s.name}>
                  {s.name}{" "}
                  <button onClick={() => simSwitchSpace(s.name)}>
                    activate
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    };
  },
  xr: () => ({
    title: "XR Engine",
    description: "Extended reality and multispectral interfaces.",
    content: <div>XR Engine surface.</div>
  })
};
