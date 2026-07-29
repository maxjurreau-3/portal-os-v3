import React from "react";

import {
  simCreateSpace,
  simListSpaces,
  simGetActiveSpace,
  simSwitchSpace,
  simRunOperatorInActive
} from "../modules/sim/index.js";

import {
  opRegister,
  opRun,
  opList
} from "../modules/operators/index.js";

import {
  xrCreateScene,
  xrListScenes,
  xrGetActiveScene,
  xrActivateScene
} from "../modules/xr/index.js";

import {
  idDefine,
  idList,
  idGetActive,
  idActivate
} from "../modules/identity-physics/index.js";

export const ModuleRenderers = {
  games: () => ({
    title: "Games Engine",
    description: "Interactive systems and simulations.",
    content: <div>Games Engine surface.</div>
  }),

  "identity-physics": () => {
    const identities = idList();
    const active = idGetActive();

    return {
      title: "Identity Physics",
      description: "Structures of self and field.",
      content: (
        <div>
          <p>Active identity: {active ? active.name : "none"}</p>

          <button
            onClick={() =>
              idDefine(
                `identity-${Date.now()}`,
                { trait: "dynamic" }
              )
            }
          >
            Define new identity
          </button>

          <div style={{ marginTop: "12px" }}>
            <strong>Identities:</strong>
            <ul>
              {identities.map(i => (
                <li key={i.name}>
                  {i.name}{" "}
                  <button onClick={() => idActivate(i.name)}>
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

  operators: () => {
    const ops = opList();

    return {
      title: "Operators",
      description: "Control plane and system operators.",
      content: (
        <div>
          <button
            onClick={() =>
              opRegister("hello", () => "Hello from operator!")
            }
          >
            Register “hello” operator
          </button>

          <button
            onClick={() => console.log(opRun("hello"))}
            style={{ marginLeft: "10px" }}
          >
            Run “hello”
          </button>

          <div style={{ marginTop: "12px" }}>
            <strong>Operators:</strong>
            <ul>
              {ops.map(o => (
                <li key={o.name}>{o.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    };
  },

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

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() =>
                console.log(
                  simRunOperatorInActive("timestamp")
                )
              }
            >
              Run “timestamp” in active space
            </button>
          </div>
        </div>
      )
    };
  },

  xr: () => {
    const scenes = xrListScenes();
    const active = xrGetActiveScene();

    return {
      title: "XR Engine",
      description: "Extended reality and multispectral interfaces.",
      content: (
        <div>
          <p>Active XR scene: {active ? active.name : "none"}</p>

          <button
            onClick={() =>
              xrCreateScene(
                `xr-scene-${Date.now()}`,
                { mode: "dynamic-xr" }
              )
            }
          >
            Create new XR scene
          </button>

          <div style={{ marginTop: "12px" }}>
            <strong>XR Scenes:</strong>
            <ul>
              {scenes.map(s => (
                <li key={s.name}>
                  {s.name}{" "}
                  <button onClick={() => xrActivateScene(s.name)}>
                    activate
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    };
  }
};
