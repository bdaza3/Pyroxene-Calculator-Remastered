declare module '@/assets/script.js' {
    export const navbuttons: any;
    export const menuDropdown: any;
  }

  declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }