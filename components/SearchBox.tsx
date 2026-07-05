export function SearchBox({
  action,
  defaultValue,
  placeholder
}: {
  action: string;
  defaultValue?: string;
  placeholder: string;
}) {
  return (
    <form action={action} role="search">
      <input
        className="search"
        defaultValue={defaultValue}
        name="q"
        placeholder={placeholder}
        type="search"
      />
    </form>
  );
}
