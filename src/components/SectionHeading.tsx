export const SectionHeading = ({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) => (
  <div>
    <p className="font-mono text-xs text-amber-800 dark:text-amber-400">
      <span>{index}</span>
      <span className="ms-3 uppercase tracking-[0.18em]">{label}</span>
    </p>
    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl dark:text-stone-50">
      {title}
    </h2>
  </div>
);
