import clsx from 'clsx';

interface LabelProps {
  label: JSX.Element | string;
  selected: boolean;
  disabled: boolean;
  tab: number;
  setCurrentTab: SetState<number>;
}
const Label: React.FC<LabelProps> = ({
  label,
  tab,
  selected,
  disabled,
  setCurrentTab,
}) => {
  return (
    <div
      className={clsx(
        'border-x border-t border-x-transparent border-t-transparent rounded-t-lg px-2 py-1 select-none',
        selected && !disabled
          ? 'border-x-hyellow-1 border-t-hyellow-1 text-hyellow-1 '
          : '',
        disabled ? 'text-hblack-3 cursor-not-allowed' : 'cursor-pointer',
      )}
      onClick={!disabled ? () => setCurrentTab(tab) : undefined}
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
  setCurrentTab: SetState<number>;
}
const Tabs: React.FC<TabsProps> = ({
  tabs,
  className,
  currentTab,
  setCurrentTab,
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
      <div className="flex flex-row flex-wrap mb-2 border-b border-b-hblack-3">
        {labels.map((label, i) => {
          const thisIsDisabled = disabled[i];
          return (
            <Label
              label={label}
              selected={currentTab === i}
              disabled={thisIsDisabled === undefined ? false : thisIsDisabled}
              key={i}
              tab={i}
              setCurrentTab={setCurrentTab}
            />
          );
        })}
      </div>
      {comp}
    </div>
  );
};

export default Tabs;
