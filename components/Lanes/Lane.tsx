import { FC } from 'react';
import { useAppDispatch } from '../../reducers/hooks';

import { addACardToLane } from '../../reducers/lanesSlice';
import { Card } from '../Cards/Card';
import { useDrop } from 'react-dnd';
import { PlusIcon } from '@heroicons/react/24/outline';

import type { Lane as LaneType, Card as CardType } from '../../types/types';

export const Lane: FC<LaneType> = ({ name, cards, id }) => {
  const dispatch = useAppDispatch();
  const [, drop] = useDrop(() => ({ accept: 'Card' }));
  return (
    <div className="h-full">
      <div className="m-1 rounded-md bg-slate-100 p-4">
        <div className="flex items-center">
          <p className="text-slate-600">{name}</p>
          <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 text-xs font-semibold text-slate-600">
            {cards.length}
          </div>
        </div>
      </div>

      <div className="rounded-md bg-slate-100 p-4">
        <div className="mb-3">
          <button
            className="flex w-full content-center justify-center rounded-md border bg-slate-200 p-2 align-middle hover:bg-slate-300"
            // Should probably kick off the same modal as edit. Right now it just dumps an empty card onto top of column.
            onClick={() => {
              dispatch(addACardToLane(id));
            }}>
            <PlusIcon className="h-5 w-5 stroke-2" />
          </button>
        </div>
        <div className="min-h-20" ref={drop}>
          {/*TODO October 22, 2022. Need to handle for empty lane drops, also fix bugs where spacing between cards causes drop not to trigger (css margin issue) */}
          {cards.length == 0 && (
            <div className="border p-4">
              TODO: 💣 Add UI to handle dragging into empty column.
            </div>
          )}
          {cards.map((card: CardType, i) => {
            return <Card index={i} key={card.id} laneId={id} card={card} />;
          })}
        </div>
      </div>
    </div>
  );
};
