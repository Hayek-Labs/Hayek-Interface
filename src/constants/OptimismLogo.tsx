import optimismLogo from '@/assets/logos/chains/optimism.png';
interface OptimismLogoProps {
  width: number;
  height: number;
}
export default function OptimismLogo({ width, height }: OptimismLogoProps) {
  return (
    <div>
      {/* 使用导入的 PNG 图片 */}
      <img
        width={width}
        height={height}
        src={optimismLogo}
        alt="Optimism Logo"
      />
    </div>
  );
}
