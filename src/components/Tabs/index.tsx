import clsx from 'clsx';

interface LabelProps {
  label: JSX.Element | string;
  className?: string;
  selected: boolean;
  selectedClass?: string;
  disabled: boolean;
  disabledClass?: string;
  tab: number;
  onChange: (val: number) => void;
}
const Label: React.FC<LabelProps> = ({
  label,
  tab,
  className,
  selected,
  selectedClass,
  disabled,
  disabledClass,
  onChange,
}) => {
  return (
    <div
      className={clsx(
        clsx('', className),
        selected && !disabled ? clsx(selectedClass) : '',
        disabled
          ? clsx('text-hblack-3 cursor-not-allowed', disabledClass)
          : 'cursor-pointer',
      )}
      onClick={!disabled ? () => onChange(tab) : undefined}
    >
      {label}
    </div>
  );
};

interface TabsProps {
  tabs: {
    label: JSX.Element | string;
    render: JSX.Element | null;
    disabled?: boolean;
  }[];
  className?: string;
  currentTab: number;
  onChange: (val: number) => void;

  labelClassName?: string;
  labelSelectedClassName?: string;
  labelDisabledClassName?: string;
}
const Tabs: React.FC<TabsProps> = ({
  tabs,
  className,
  currentTab,
  onChange,
  labelClassName,
  labelSelectedClassName,
  labelDisabledClassName,
}) => {
  const [labels, comps, disabled] = tabs.reduce<
    [(JSX.Element | string)[], (JSX.Element | null)[], (boolean | undefined)[]]
  >(
    ([labels, comps, disabled], next) => {
      labels.push(next.label);
      comps.push(next.render);
      disabled.push(next.disabled);
      return [labels, comps, disabled];
    },
    [[], [], []],
  );

  const comp = currentTab !== -1 ? comps[currentTab] : undefined;

  return (
    <div className={clsx('', className)}>
      <div className="flex flex-row flex-wrap mb-2">
        {labels.map((label, i) => {
          const thisIsDisabled = disabled[i];
          return (
            <Label
              label={label}
              selected={currentTab === i}
              disabled={thisIsDisabled === undefined ? false : thisIsDisabled}
              key={i}
              tab={i}
              onChange={onChange}
              className={labelClassName}
              selectedClass={labelSelectedClassName}
              disabledClass={labelDisabledClassName}
            />
          );
        })}
      </div>
      {comp}
    </div>
  );
};

export default Tabs;
