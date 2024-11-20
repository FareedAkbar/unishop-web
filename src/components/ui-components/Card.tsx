function Card(props: {
  variant?: string;
  extra?: string;
  children?: JSX.Element;
  [x: string]: unknown;
}) {
  const { variant, extra, children, ...rest } = props;
  return (
    <div
      className={`!z-5 shadow-3xl relative flex flex-col rounded-[20px] bg-white bg-clip-border ${
        props.default
          ? "shadow-shadow-500 dark:shadow-none"
          : "shadow-shadow-100 dark:shadow-none"
      } dark:!bg-stone-800 dark:text-white ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
