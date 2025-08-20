declare module '*.svg' {
  import { FC, SVGProps } from 'react';

  const component: FC<SVGProps<SVGSVGElement>>;

  export default component;
}
