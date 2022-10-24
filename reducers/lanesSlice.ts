import { v4 as uuidv4 } from 'uuid';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';

import { LaneIds, Lanes, Lane, Card, NormalizeCard } from '../types/types';

function getAvatars() {
  const randomNumber1 = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
  const randomNumber2 = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
  const randomNumber3 = Math.floor(Math.random() * (99 - 10 + 1)) + 10;

  return [
    {
      id: uuidv4(),
      img: `https://placekitten.com/${randomNumber1}/${randomNumber1}`
    },
    {
      id: uuidv4(),
      img: `https://placekitten.com/${randomNumber2}/${randomNumber2}`
    },
    {
      id: uuidv4(),
      img: `https://placekitten.com/${randomNumber3}/${randomNumber3}`
    }
  ];
}

const initialState: Lanes = {
  columns: [
    {
      id: LaneIds.backlog,
      name: 'Back Log',
      cards: [
        {
          id: uuidv4(),
          name: 'A/B Testing Round 3',
          labels: [
            { id: 3, name: 'Development', color: 'pink' },
            { id: 4, name: 'Spike', color: 'blue' }
          ],
          avatars: getAvatars()
        },
        {
          id: uuidv4(),
          name: 'Improve workflow on iOS dark mode application',
          labels: [],
          avatars: getAvatars()
        },
        {
          id: uuidv4(),
          name: 'User Testing mock version 6',
          labels: [],
          avatars: getAvatars()
        },
        {
          id: uuidv4(),
          name: 'Fix all the really annoying bugs',
          labels: [],
          avatars: getAvatars()
        }
      ]
    },
    {
      id: LaneIds.todo,
      name: 'To Do',
      cards: [
        {
          id: uuidv4(),
          name: 'Illustration of empty states',
          labels: [],
          avatars: getAvatars()
        },
        {
          id: uuidv4(),
          name: 'Create a microinteraction flow',
          labels: [],
          avatars: getAvatars()
        },
        {
          id: uuidv4(),
          name: 'Create prototype for payments inside of Prototypr',
          labels: [],
          avatars: getAvatars()
        }
      ]
    },
    {
      id: LaneIds.onGoing,
      name: 'On going',
      cards: [
        {
          id: uuidv4(),
          name: 'Update support docs',
          labels: [
            { id: 6, name: 'Logistics', color: 'violet' },
            { id: 8, name: 'Banana', color: 'yellow' }
          ],
          avatars: getAvatars()
        },
        {
          id: uuidv4(),
          name: 'Write some unit/integration tests',
          labels: [],
          avatars: getAvatars()
        }
      ]
    },
    {
      id: LaneIds.teamReview,
      name: 'Team Review',
      cards: [
        {
          id: uuidv4(),
          name: 'USER JOURNEY',
          labels: [],
          avatars: getAvatars()
        },
        {
          id: uuidv4(),
          name: 'Indepth user interviews so that this line breaks onto a third line and we can see it all fits nice.',
          labels: [],
          avatars: getAvatars()
        }
      ]
    }
  ]
};

function findCard(state: Lanes, idToFind: string): NormalizeCard {
  const flattenCardsWithLaneIdAndLaneIndex: NormalizeCard[] = state.columns.reduce(
    (cards: NormalizeCard[], column: Lane) => {
      return [
        ...cards,
        ...column.cards.map((card: Card, i) => {
          return {
            id: card.id,
            card: {
              ...card
            },
            laneIndex: i,
            laneId: column.id
          };
        })
      ];
    },
    []
  );

  const foundCard = flattenCardsWithLaneIdAndLaneIndex.find(
    (c: NormalizeCard) => c.id === idToFind
  );

  if (!foundCard) {
    throw new Error('No card found. This is very bad.');
  }

  return foundCard;
}

export const lanesSlice = createSlice({
  name: 'lanes',
  initialState,
  reducers: {
    removeCard: (state, { payload }: PayloadAction<{ cardToRemove: Card }>) => {
      state.columns = state.columns.map((column) => {
        return {
          ...column,
          cards: column.cards.reduce((cards, card) => {
            if (card.id === payload.cardToRemove.id) {
              return cards;
            }
            return [...cards, card];
          }, [])
        };
      });
    },
    addACardToLane: (state, { payload }: PayloadAction<LaneIds>) => {
      state.columns = state.columns.map((column) => {
        if (column.id === payload) {
          return {
            ...column,
            cards: [
              {
                id: uuidv4(),
                name: `New Card #${column.cards.length}`,
                labels: [],
                avatars: getAvatars()
              },
              ...column.cards
            ]
          };
        }

        return column;
      });
    },
    // TODO October 23, 2022. Consider moving this to it's own slice/reducer structure.
    updateCardData: (state, { payload }: PayloadAction<{ cardToUpdate: Card }>) => {
      state.columns = state.columns.map((column) => {
        return {
          ...column,
          cards: column.cards.map((card) => {
            if (card.id === payload.cardToUpdate.id) {
              return payload.cardToUpdate;
            }
            return card;
          })
        };
      });
    },
    moveCard: (
      state,
      {
        payload
      }: PayloadAction<{ laneId: LaneIds; cardOverId: string; draggedId: string }>
    ) => {
      const { laneIndex: overCardIndex, laneId: overCardLaneId } = findCard(
        state,
        payload.cardOverId
      );
      const { laneIndex: draggedCardIndex, card: draggedCard } = findCard(
        state,
        payload.draggedId
      );

      state.columns = state.columns.reduce((columns, column) => {
        return [
          ...columns,
          {
            ...column,
            cards: column.cards.reduce((cards, card, i) => {
              // determine what lane we are on and where we are hovering.
              if (column.id === overCardLaneId && i === overCardIndex) {
                // if we are on the right lane and card, it is time to insert
                // the dragged card into the position we are hovering over.

                // handle dragging up or dragging down from old position.
                if (draggedCardIndex <= overCardIndex) {
                  return [...cards, card, draggedCard];
                } else {
                  return [...cards, draggedCard, card];
                }
              }

              // remove dragged card from it's old position it was dragged
              // into and has now been dragged out of.
              if (card.id === draggedCard.id) {
                return [...cards];
              }

              return [...cards, card];
            }, [])
          }
        ];
      }, []);
    }
  }
});

export const getLaneColumns = (state: RootState) => state.lanes.columns;

export default lanesSlice.reducer;

export const { addACardToLane, moveCard, updateCardData, removeCard } =
  lanesSlice.actions;
