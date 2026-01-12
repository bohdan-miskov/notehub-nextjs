type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesFilterLayout = ({ children, sidebar }: Props) => {
  return (
    <div>
      <aside>{sidebar}</aside>
      <div>{children}</div>
    </div>
  );
};

export default NotesFilterLayout;
