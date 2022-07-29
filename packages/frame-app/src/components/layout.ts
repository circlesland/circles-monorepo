import { SvelteComponent } from 'svelte';

export interface Content {
  component: SvelteComponent;
  params: {
    [x: string]: any;
  };
}

export interface Dialog extends Content {
  isOpen: boolean;
}

export interface Layout {
  type: "description" | "runtime";
  main?: Content;
  dialogs: {
    left?: Dialog;
    center?: Dialog;
    right?: Dialog;
  };
}

export interface LayoutDescription extends Layout {
  type: "description";
  main?: Content;
  dialogs: {
    left?: Dialog;
    center?: Dialog;
    right?: Dialog;
  };
}
export interface RuntimeLayout extends Layout {
  type: "runtime";
  main?: Content;
  dialogs: {
    left?: Dialog;
    center?: Dialog;
    right?: Dialog;
  };
}
