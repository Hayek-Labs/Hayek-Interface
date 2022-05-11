import { Button as AntdButton, ButtonProps } from 'antd';

const Btn: React.FC<ButtonProps> = (props) => {
  return <AntdButton {...props}>{props.children}</AntdButton>;
};

export default Btn;
