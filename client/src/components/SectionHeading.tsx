export function SectionHeading({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <p className="kicker">
        <span>{index}</span>
        {kicker}
      </p>
      <h2>{title}</h2>
    </div>
  );
}
