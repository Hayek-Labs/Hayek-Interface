import clsx from 'clsx';
import SidebarIcons from '../SidebarIcons';

interface Props {
  item: {
    id: string;
    title: string;
  };
  onClick: (id: string) => void;
  isSelected: boolean;
  sidebarExpand: boolean;
}

const MenuItem: React.FC<Props> = ({
  item: { id, title },
  onClick,
  isSelected,
  sidebarExpand,
}) => {
  return (
    <div
      className={clsx(
        // 'w-full trans z-0 h-10 rounded-lg py-1 mt-3 flex flex-row items-center px-3 sm:px-0 xl:group-hover:px-3 justify-start sm:justify-center xl:group-hover:justify-start cursor-pointer',
        'w-full trans z-0 h-10 rounded-lg py-1 mt-3 flex flex-row items-center px-3 justify-start sm:justify-center cursor-pointer',
        sidebarExpand ? 'xl:justify-start xl:px-3' : 'sm:px-0',
        isSelected ? 'sidebar-item-selected' : 'sidebar-item',
      )}
      onClick={() => onClick(id)}
    >
      {/* <div className="block sm:text-[0px] xl:group-hover:text-base xl:group-hover:block xl:group-hover:ml-2 trans"> */}
      <div
        className={clsx(
          sidebarExpand
            ? 'block sm:text-[0px] xl:text-base xl:block xl:ml-2 trans'
            : 'block sm:text-[0px] trans',
        )}
      >
        {title}
      </div>
      {/* <div className="block trans flex-grow-0 xl:group-hover:flex-grow" /> */}
      <div
        className={clsx(
          sidebarExpand
            ? 'block trans flex-grow-0 xl:flex-grow'
            : 'block trans flex-grow-0',
        )}
      />
      <div className="ml-auto sm:mx-auto">
        <SidebarIcons id={id} />
      </div>
    </div>
  );
};

export default MenuItem;
