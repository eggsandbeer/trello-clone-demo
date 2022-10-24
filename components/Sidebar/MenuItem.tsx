import { FC, ReactNode } from 'react';

export enum MenuItemType {
  link = 'link',
  action = 'action'
}

type MenuItemProps = {
  type: MenuItemType;
  icon: ReactNode;
  linkDisplayText: string;
  notification?: {
    count: number;
  };
  onClick?: () => void;
};

const MenuItemContent: FC<Omit<MenuItemProps, 'type' | 'onCLick'>> = ({
  linkDisplayText,
  icon: Icon,
  notification = null
}) => {
  const notificationCount = notification?.count;

  return (
    <>
      <span className="flex items-center justify-center text-lg">{Icon}</span>
      <span className="ml-3">{linkDisplayText}</span>
      {notification && (
        <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
          {notificationCount}
        </div>
      )}
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

export const MenuItem: FC<MenuItemProps> = ({ type, onClick, ...rest }) => {
  return (
    <li className="my-px">
      {type === MenuItemType.link && (
        // TODO: Use NEXTJS links
        <a href="nytimes.com" className={itemContainerClasses}>
          <MenuItemContent {...rest} />
        </a>
      )}
      {type === MenuItemType.action && (
        <div
          className={itemContainerClasses}
          onClick={() => {
            onClick && onClick();
          }}>
          <MenuItemContent {...rest} />
        </div>
      )}
    </li>
  );
};
