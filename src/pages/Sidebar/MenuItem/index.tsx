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
        'w-full trans z-0 h-10 rounded-lg py-1 mt-3 flex flex-row items-center px-3 sm:px-0 xl:group-hover:px-3 justify-start sm:justify-center xl:group-hover:justify-start cursor-pointer',
        isSelected ? 'sidebar-item-selected' : 'sidebar-item hover:bg-hblack-2',
      )}
      onClick={() => onClick(id)}
    >
      <div className="block sm:text-[0px] xl:group-hover:text-base xl:group-hover:block xl:group-hover:ml-2 trans">
        {title}
      </div>
      <div className="block trans flex-grow-0 xl:group-hover:flex-grow" />
      <div className="ml-auto sm:mx-auto">
        <SidebarIcons id={id} />
      </div>
    </div>
  );
};

export default MenuItem;
