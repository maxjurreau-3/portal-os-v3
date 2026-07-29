import React, { useState } from "react";
import { PortalState } from "./state.js";
import { getSimEngine } from "../modules/sim/index.js";
import { getOperatorsEngine } from "../modules/operators/index.js";
import { getXREngine } from "../modules/xr/index.js";
import { getIdentityPhysicsEngine } from "../modules/identity-physics/index.js";
import { getGamesEngine } from "../modules/games/index.js";

export function OperatorConsole() {
  const [activeTab, setActiveTab] = useState("modules");

  const sim = getSimEngine();
  const ops = getOperatorsEngine();
  const xr = getXREngine();
  const id = getIdentityPhysicsEngine();
  const games = getGamesEngine();

  return (
    <div style={styles.console}>
      <div style={styles.tabs}>
        {["modules", "operators", "sim", "xr", "identity", "games"].map(tab => (
          <div
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.tabActive : {})
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div style={styles.panel}>
        {activeTab === "modules" && <ModulesPanel />}
        {activeTab === "operators" && <OperatorsPanel ops={ops} />}
        {activeTab === "sim" && <SimPanel sim={sim} />}
        {activeTab === "xr" && <XRPanel xr={xr} />}
        {activeTab === "identity" && <IdentityPanel id={id} />}
        {activeTab === "games" && <GamesPanel games={games} />}
      </div>
    </div>
  );
}

function ModulesPanel() {
  const modules = PortalState.modules || {};

  return (
    <div>
      <h3>Modules</h3>
      <ul>
        {Object.keys(modules).map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

function OperatorsPanel({ ops }) {
  return (
    <div>
      <h3>Operators</h3>
      <ul>
        {ops.listOperators().map(op => (
          <li key={op.name}>{op.name}</li>
        ))}
      </ul>

      <h4>Logs</h4>
      <ul>
        {ops.getLogs().map((log, i) => (
          <li key={i}>
            {log.name} → {JSON.stringify(log.result)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SimPanel({ sim }) {
  return (
    <div>
      <h3>SIM Spaces</h3>
      <ul>
        {sim.listSpaces().map(space => (
          <li key={space.name}>
            {space.name} — {JSON.stringify(space.config)}
          </li>
        ))}
      </ul>

      <h4>Active Space</h4>
      <pre>{JSON.stringify(sim.getActiveSpace(), null, 2)}</pre>
    </div>
  );
}

function XRPanel({ xr }) {
  return (
    <div>
      <h3>XR Engine</h3>
      <pre>{JSON.stringify(xr.getState(), null, 2)}</pre>
    </div>
  );
}

function IdentityPanel({ id }) {
  return (
    <div>
      <h3>Identity Physics</h3>
      <pre>{JSON.stringify(id.getFieldState(), null, 2)}</pre>
    </div>
  );
}

function GamesPanel({ games }) {
  return (
    <div>
      <h3>Games Engine</h3>
      <ul>
        {games.listSessions().map(session => (
          <li key={session.name}>{session.name}</li>
        ))}
      </ul>

      <h4>Active Session</h4>
      <pre>{JSON.stringify(games.getActiveSession(), null, 2)}</pre>
    </div>
  );
}

const styles = {
  console: {
    background: "#000",
    color: "#fff",
    padding: "20px",
    borderTop: "2px solid #333",
    height: "40vh",
    overflowY: "auto"
  },
  tabs: {
    display: "flex",
    marginBottom: "10px"
  },
  tab: {
    padding: "8px 12px",
    marginRight: "8px",
    background: "#222",
    cursor: "pointer",
    borderRadius: "4px"
  },
  tabActive: {
    background: "#444",
    fontWeight: "bold"
  },
  panel: {
    background: "#111",
    padding: "20px",
    borderRadius: "6px"
  }
};
