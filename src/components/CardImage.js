function CardImage({ id, selected, ...props }) {
  return (
    <svg width="100%" height="100%" {...props}>
      <use href={`/CardSprites.svg#${id}`} />
    </svg>
  );
}

export default CardImage;
