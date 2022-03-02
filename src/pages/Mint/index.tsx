import clsx from 'clsx';
import styles from './index.less';

interface CoinStatProps {
  statName: string;
  stat: string;
}
const CoinStat: React.FC<CoinStatProps> = ({ stat, statName }) => {
  return (
    <div className="flex flex-col header-coin-stat">
      <span className="p-2 text-base border-b-2 border-white">{statName}</span>
      <span className="p-2 text-sm">{stat}</span>
    </div>
  );
};

const Header = () => {
  return (
    <div className="rounded-md bg-card flex flex-row text-center">
      <div className="p-3 header-coin-stat flex items-center justify-center">
        <span className="text-lg">Mint FRAX</span>
      </div>
      <CoinStat statName="FRAX PRICE" stat="$0.9992" />
      <CoinStat statName="COLLATERAL RATIO" stat="84.50%" />
      <CoinStat statName="POOL BALANCE / CEILING" stat="15.619M / 75M" />
      <CoinStat statName="AVAILABLE TO MINT" stat="59.381M" />
    </div>
  );
};

const ContentPiece: React.FC = ({ children }) => {
  return (
    <div className="flex-1 flex items-center justify-center">{children}</div>
  );
};

const MintOptions = () => {
  return (
    <ContentPiece>
      <div className="flex flex-col items-center">
        <span>MINT METHOD</span>
        <span>Choose normal if you already have USDC and FXS.</span>
        <span>Normal</span>
        <span>COLLATERAL POOL</span>
        <select className="text-black">
          <option>USDC</option>
        </select>
        <span>AMOUNT</span>
        <input placeholder="Amount" />
        <span>0 Available</span>
        <div className="border-b-2 border-white" />
        <span>FXS</span>
        <input placeholder="Amount" />
        <span>0 Available</span>
      </div>
    </ContentPiece>
  );
};

const MintExchangeInfo = () => {
  return (
    <ContentPiece>
      <div className="flex flex-col items-center">
        <span>EXCHANGE RATES</span>
        <span>
          {'{icon}'} USDC: <b>$1.000</b>
        </span>
        <span>
          {'{icon}'} FXS: <b>$22.880</b>
        </span>
        <span>{'{arrow-right}'}</span>
        <span>0.3000% MINTING FEE</span>
        <span>(0.00000 FRAX)</span>
        <span>Pool (V3){'{icon}'}: 0x2fE0...0729</span>
      </div>
    </ContentPiece>
  );
};

const MintReceiveInfo = () => {
  return (
    <ContentPiece>
      <div className="flex flex-col items-center">
        <span>YOU RECEIVE</span>
        <div className="flex flex-row items-center">
          <span>{'{icon}'}</span>
          <div className="ml-2 px-20 py-2 rounded-md bg-gray-800">-</div>
        </div>
      </div>
    </ContentPiece>
  );
};

const Content = () => {
  return (
    <div className="flex-1 w-full flex flex-row text-center px-2">
      <MintOptions />
      <MintExchangeInfo />
      <MintReceiveInfo />
    </div>
  );
};

const Footer = () => {
  return (
    <div className="text-center mt-auto py-2">
      <button className="bg-white rounded-md text-black px-4 py-2">MINT</button>
    </div>
  );
};

const Mint = () => {
  return (
    <div
      className={clsx('flex flex-col w-full h-full text-white', styles.mint)}
    >
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default Mint;
