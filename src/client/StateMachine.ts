// import { States } from "./PlayerStates";

interface StateConfig {
  state?: string;
  onEnter?: () => void;
  onExit?: () => void;
  onUpdate?: (dt: number) => void;
}

export default class StateMachine {
  //
  private context?: any;
  private actor: string;
  private states = new Map<string, StateConfig>();
  private currentState?: StateConfig;
  private isSwitchingState: boolean = false;
  private stateQueue: string[] = [];

  constructor(context?: any, actor?: string) {
    this.context = context;
    this.actor = actor ?? "state machine";
  }

  isCurrentState(state: string) {
    if (this.currentState?.state !== state) {
      return false;
    }
    return this.currentState?.state === state;
  }
  addState(state: string, config: StateConfig) {
    this.states.set(state, {
      state: state,
      onEnter: config.onEnter?.bind(this.context),
      onUpdate: config.onUpdate?.bind(this.context),
      onExit: config.onExit?.bind(this.context),
    });
  }

  setState(state: string) {
    if (!this.states.has(state)) {
      return;
    }

    if (this.isSwitchingState) {
      this.stateQueue.push(state);
      return;
    }

    this.isSwitchingState = true;

    if (this.currentState && this.currentState.onExit) {
      this.currentState.onExit();
    }
    this.currentState = this.states.get(state);

    if (this.currentState?.onEnter) {
      this.currentState.onEnter();
    }

    this.isSwitchingState = false;

    return this;
  }

  update(dt: number) {
    if (this.stateQueue.length > 0) {
      const state = this.stateQueue.shift()!;
      this.setState(state);
      return;
    }

    if (!this.currentState) {
      return;
    }

    if (this.currentState.onUpdate) {
      this.currentState.onUpdate(dt);
    }
  }
}
