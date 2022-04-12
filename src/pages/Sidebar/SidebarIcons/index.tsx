import { icons } from '..';

const SidebarIcons: React.FC<{ id: string }> = ({ id }) => {
  return icons[id];
};

export default SidebarIcons;
