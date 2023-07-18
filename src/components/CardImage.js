function CardImage({ id, ...props }) {
  return (
    <svg width="100%" height="100%" {...props}>
      <use href={`/sprites.svg#${id}`} />
    </svg>
  );
}

export default CardImage;
