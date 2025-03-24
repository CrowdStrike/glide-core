export default function <Type extends new (...arguments_: any[]) => object>(constructor: Type): {
    new (...arguments_: any[]): {};
} & Type;
