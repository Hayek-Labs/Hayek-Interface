import RenderIfScrollVisible from '@/components/RenderIfScrollVisible';
import { useContainerRef } from '@/layouts/Main';
import React from 'react';

const HomeRenderIfVisible: React.FC<{
  height?: string;
  width?: string;
}> = ({ children, width, height }) => {
  const { containerRef } = useContainerRef();
  return (
    <RenderIfScrollVisible
      containerRef={containerRef}
      width={width}
      height={height}
    >
      {children}
    </RenderIfScrollVisible>
  );
};

export default HomeRenderIfVisible;
