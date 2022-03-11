import { Coin } from '@/constants/coin';
import Select from '../Select';

interface Option {
  readonly value: Coin;
  readonly label: string;
}

interface Props {
  options: Option[];
}

const CoinSelect: React.FC<Props> = ({ options }) => {
  return <Select options={options} />;
};

export default CoinSelect;
