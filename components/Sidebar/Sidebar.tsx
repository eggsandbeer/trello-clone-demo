import { FC } from 'react';
import { MenuItem, MenuItemType } from './MenuItem';
import { SubMenuItem, SubMenuItemType } from './SubMenuItem';

import { InboxIcon } from '@heroicons/react/24/outline';
import { FolderIcon } from '@heroicons/react/24/outline';
import { ClockIcon } from '@heroicons/react/24/outline';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { HashtagIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const topLevelMenuItems = [
  {
    id: 'some-uuid-1',
    type: 'link',
    linkDisplayText: 'Inbox',
    icon: <InboxIcon className="h-5 w-5" />
  },
  {
    id: 'some-uuid-2',
    type: 'link',
    linkDisplayText: 'Update',
    icon: <ClockIcon className="h-5 w-5" />,
    notification: {
      count: 6
    }
  },
  {
    id: 'some-uuid-3',
    type: 'link',
    linkDisplayText: 'Settings',
    icon: <WrenchScrewdriverIcon className="h-5 w-5" />
  }
];

const workSpaceMenuItems = [
  {
    id: 'some-uuid-1',
    type: 'link',
    linkDisplayText: 'Lyft Design 🎨',
    icon: <DocumentTextIcon className="h-5 w-5" />
  },
  {
    id: 'some-uuid-2',
    type: 'link',
    linkDisplayText: 'Marketing Site 🎉',
    icon: <FolderIcon className="h-5 w-5" />
  },
  {
    id: 'some-uuid-3',
    type: 'link',
    linkDisplayText: 'Stripe Payments 💳',
    icon: <DocumentTextIcon className="h-5 w-5" />
  },
  {
    id: 'some-uuid-4',
    type: 'link',
    linkDisplayText: 'Xcode Studios 🎁',
    icon: <DocumentTextIcon className="h-5 w-5" />
  },
  {
    id: 'some-uuid-5',
    type: 'link',
    linkDisplayText: 'Conversion 🤖',
    icon: <DocumentTextIcon className="h-5 w-5" />
  },
  {
    id: 'some-uuid-6',
    type: 'action',
    linkDisplayText: 'Add new workspace',
    icon: <PlusIcon className="h-5 w-5 stroke-2 text-blue-400" />,
    onClick: () => {
      alert('Call some add work space action/flow');
    }
  }
];

const projectItems = [
  {
    id: 'some-uuid-1',
    type: 'link',
    linkDisplayText: 'Revamp Tokopedia',
    icon: <HashtagIcon className="h-5 w-5" />
  },
  {
    id: 'some-uuid-2',
    type: 'link',
    linkDisplayText: 'Stripe Payment Gateway',
    icon: <HashtagIcon className="h-5 w-5" />
  },
  {
    id: 'some-uuid-3',
    type: 'link',
    linkDisplayText: 'Design System 4.8',
    icon: <HashtagIcon className="h-5 w-5" />
  },
  {
    id: 'some-uuid-4',
    type: 'action',
    linkDisplayText: 'Add new project',
    icon: <PlusIcon className="h-5 w-5 stroke-2 text-blue-400" />,
    onClick: () => {
      alert('Call some add project action/flow');
    }
  }
];

const parentClassNames = [
  'sidebar',
  'w-96',
  'transform',
  '-translate-x-full',
  'transform bg-slate-100',
  'transition-transform',
  'duration-150',
  'ease-in',
  'md:translate-x-0',
  'md:shadow'
].join(' ');

export const Sidebar: FC = () => {
  return (
    <aside className={parentClassNames}>
      <div className="sidebar-header justify-left flex px-6 pt-6 pb-2 text-center align-middle">
        <div className="inline-flex items-center">
          {/* TODO Add select profile picker -- unclear how this will work from mockup */}
          <div className="ml-auto mr-2 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-xl">
            👯
          </div>
          <div>Cameron Strandberg</div>
        </div>
      </div>
      <div className="sidebar-content px-8 py-2">
        <ul className="flex w-full flex-col">
          {topLevelMenuItems.map(({ icon, id, linkDisplayText, notification, type }) => {
            return (
              <MenuItem
                key={id}
                linkDisplayText={linkDisplayText}
                icon={icon}
                notification={notification}
                type={type as MenuItemType}
              />
            );
          })}

          <li className="break" role="presentation">
            <hr className="my-4 w-full border-t border-gray-300" />
          </li>
          <ul>
            <li className="my-px">
              <span className="my-2 flex px-2 text-sm font-medium uppercase text-slate-400">
                Workspace
              </span>
            </li>
            <ul className="ml-4">
              {workSpaceMenuItems.map(({ icon, id, linkDisplayText, onClick, type }) => {
                return (
                  <SubMenuItem
                    key={id}
                    linkDisplayText={linkDisplayText}
                    icon={icon}
                    type={type as SubMenuItemType}
                    onClick={onClick}
                  />
                );
              })}
            </ul>
          </ul>
          <li className="break" role="presentation">
            <hr className="my-4 w-full border-t border-gray-300" />
          </li>
          <li className="my-px">
            <span className="my-2 flex px-2 text-sm font-medium uppercase text-slate-400">
              Project
            </span>
          </li>
          {projectItems.map(({ icon, id, linkDisplayText, onClick, type }) => {
            return (
              <MenuItem
                key={id}
                linkDisplayText={linkDisplayText}
                icon={icon}
                type={type as MenuItemType}
                onClick={onClick}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
