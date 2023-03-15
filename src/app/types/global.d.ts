declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

interface ExtendsSVGProps<T> extends React.SVGProps<T> {
  title?: string | undefined;
}

declare module '*.svg' {
  import type React from 'react';
  const SVG: React.VFC<ExtendsSVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'storybook' | 'jest' | 'frontend';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
