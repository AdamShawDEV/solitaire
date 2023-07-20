function Icon({ id, width = 24, height = 24, ...props }) {
  return (
    <svg width={width} height={height} {...props}>
      <use href={`./iconSprites.svg#${id}`} />
    </svg>
  );
}

export default Icon;
