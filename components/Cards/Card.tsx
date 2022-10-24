import { FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch } from '../../reducers/hooks';
import { moveCard } from '../../reducers/lanesSlice';
import { CardContent } from './CardContent';

export const Card: FC<any> = ({ index: originalIndex, card, laneId }) => {
  const { id } = card;
  const dispatch = useAppDispatch();

  const [, dragRef, dragPreview] = useDrag(
    () => ({
      type: 'Card',
      item: { id: card.id, laneId, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        // const { id: droppedId } = item;
        const didDrop = monitor.didDrop();
        // setIsDirtyDragging(false);
        if (!didDrop) {
          // TODO Oct 22, 2022. update here with some revert fuction if user drops outside zones, just uses last lane position/index triggered now.
        }
      }
    }),
    [card, laneId]
  );

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: 'Card',
      hover({ id: draggedId }) {
        // Once the dragged card is inserted into position on lane where we are hovering, it is
        // hovering over itself basically and this logic will stop the move card insert action
        // from firing over and over.
        if (draggedId !== id) {
          // setIsDirtyDragging(true);
          dispatch(moveCard({ laneId, cardOverId: id, draggedId }));
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver()
      })
    }),
    [dispatch, moveCard, id]
  );

  return (
    <div className="mb-3" ref={dragPreview}>
      <div
        ref={(node) => dragRef(dropRef(node))}
        className={`flex min-h-40 w-full cursor-grab rounded-md border bg-white p-3 ${
          isOver ? 'border-spacing-2 border-2 border-blue-600' : ''
        }`}>
        <CardContent card={card} />
      </div>
    </div>
  );
};
