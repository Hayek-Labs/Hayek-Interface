declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare type OnClickFn<T = Element, E = MouseEvent> = (
  event: React.MouseEvent<T, E>,
) => void;

declare type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

declare type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;

declare type Option<T> = T | undefined;

declare type Ok<T> = T;
declare type Err<E> = E;
declare type Result<T, E> = Ok<T> | Err<E>;

declare namespace HTML {
  type Input = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}
