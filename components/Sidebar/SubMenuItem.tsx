import { FC, ReactNode } from 'react';
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline';

export enum SubMenuItemType {
  link = 'link',
  action = 'action'
}
type SubMenuProps = {
  icon: ReactNode;
  linkDisplayText: string;
  type: SubMenuItemType;
  onClick?: () => void;
};

const SubMenuItemContent: FC<Omit<SubMenuProps, 'type' | 'onClick'>> = ({
  linkDisplayText,
  icon: Icon
}) => {
  return (
    <>
      <span className="flex items-center justify-center text-lg">{Icon}</span>
      <span className="ml-2">{linkDisplayText}</span>
      <ArrowSmallRightIcon className="ml-auto h-5 w-5 translate-x-0 stroke-2 opacity-0 transition-all delay-75 duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
    </>
  );
};

const itemContainerClasses = [
  'group',
  'flex',
  'min-h-10',
  'py-1',
  'flex-row',
  'items-center',
  'rounded-lg',
  'px-2',
  'text-slate-500',
  'transition-all',
  'duration-100',
  'hover:bg-slate-200',
  'hover:text-slate-900',
  'cursor-pointer'
].join(' ');

export const SubMenuItem: FC<SubMenuProps> = ({ onClick, type, ...rest }) => {
  return (
    <li>
      {type === SubMenuItemType.link && (
        // TODO: Use NEXTJS links
        <a href="nytimes.com" className={itemContainerClasses}>
          <SubMenuItemContent {...rest} />
        </a>
      )}
      {type === SubMenuItemType.action && (
        <div
          className={itemContainerClasses}
          onClick={() => {
            onClick && onClick();
          }}>
          <SubMenuItemContent {...rest} />
        </div>
      )}
    </li>
  );
};
