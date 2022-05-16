import clsx from 'clsx';
import SidebarIcons from '../SidebarIcons';

interface Props {
  item: {
    id: string;
    title: string;
  };
  onClick: (id: string) => void;
  isSelected: boolean;
}

const MenuItem: React.FC<Props> = ({
  item: { id, title },
  onClick,
  isSelected,
}) => {
  return (
    <div
      className={clsx(
        'w-full z-0 h-10 rounded-lg py-1 mt-3 flex items-center px-3 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start cursor-pointer',
        isSelected ? 'sidebar-item-selected' : 'sidebar-item hover:bg-hblack-2',
      )}
      onClick={() => onClick(id)}
    >
      <SidebarIcons id={id} />
      <div className="block sm:hidden xl:block ml-2">{title}</div>
      <div className="block sm:hidden xl:block flex-grow" />
    </div>
  );
};

export default MenuItem;
