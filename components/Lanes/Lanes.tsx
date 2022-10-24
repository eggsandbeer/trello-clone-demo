import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../reducers/hooks';

import { Lane } from './Lane';
import { getLaneColumns } from '../../reducers/lanesSlice';

import type { Lanes as LanesType, Lane as LaneType } from '../../types/types';

export const Lanes: FC<LanesType> = () => {
  const lanes = useAppSelector(getLaneColumns);

  return (
    <div className="grid h-full grid-cols-1 gap-0 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-4">
      {lanes.map((lane: LaneType) => {
        return <Lane key={lane.id} id={lane.id} name={lane.name} cards={lane.cards} />;
      })}
    </div>
  );
};
