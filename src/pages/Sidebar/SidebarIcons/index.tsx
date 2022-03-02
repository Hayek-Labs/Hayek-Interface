import { icons } from '..';

const SidebarIcons: React.FC<{ id: string }> = ({ id }) => {
  return (
    <svg
      className="w-8 h-8 xl:w-5 xl:h-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[id]}
    </svg>
  );
};

export default SidebarIcons;
