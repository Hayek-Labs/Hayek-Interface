import { useInScrolledView } from '@/hooks/useInScrolledView';
import React, { useContext, useMemo, useRef } from 'react';

const RenderIfScrollVisibleContext = React.createContext<{
  selfRef: React.RefObject<HTMLDivElement>;
}>(undefined!);

export const useRenderIfScrollVisibleContext = () => {
  return useContext(RenderIfScrollVisibleContext);
};

const RenderIfScrollVisible: React.FC<{
  containerRef: React.RefObject<HTMLDivElement>;
  height?: string;
  width?: string;
}> = ({ containerRef, children, width, height }) => {
  const selfRef = useRef<HTMLDivElement>(null);
  const isVisible = useInScrolledView(selfRef, containerRef);
  const contextValue = useMemo(() => ({ selfRef }), []);

  if (isVisible) {
    return (
      <RenderIfScrollVisibleContext.Provider value={contextValue}>
        {children}
      </RenderIfScrollVisibleContext.Provider>
    );
  } else {
    return (
      <div
        ref={selfRef}
        style={{
          width,
          height,
        }}
      />
    );
  }
};

export default RenderIfScrollVisible;
