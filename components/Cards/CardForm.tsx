import { FC, useState } from 'react';
import { useAppDispatch } from '../../reducers/hooks';
import { updateCardData } from '../../reducers/lanesSlice';
import { FormTextInput } from '../Form/TextInput/TextInput';
import { MultiSelect } from '../Form/MultiSelect/MultiSelect';

const labelOptions = [
  { id: 1, name: 'Prototype', color: 'red' },
  { id: 2, name: 'Design', color: 'orange' },
  { id: 3, name: 'Development', color: 'pink' },
  { id: 4, name: 'Spike', color: 'blue' },
  { id: 5, name: 'Research', color: 'rose' },
  { id: 6, name: 'Logistics', color: 'violet' },
  { id: 7, name: 'Mousetraps', color: 'slate' },
  { id: 8, name: 'Banana', color: 'yellow' }
];

export const CardForm: FC<any> = ({ index: originalIndex, card, laneId, closeModal }) => {
  const { id, labels, name } = card;
  const dispatch = useAppDispatch();

  const [managedName, setManagedName] = useState(name);
  const [selectedOptions, setSelectedOptions] = useState(labels);

  return (
    <div className="relative my-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO October 22, 2022. Once err model/validation added, check here, if OK, pass on to dispatch,
          // otherwise pass errs down to whatever form el needs it.
          dispatch(
            updateCardData({
              cardToUpdate: {
                ...card,
                name: managedName,
                labels: selectedOptions
              }
            })
          );

          closeModal();
        }}>
        <FormTextInput
          id="name"
          name="name"
          placeholder={' '}
          value={managedName}
          label={'Name'}
          onChange={setManagedName}
        />

        <MultiSelect
          id="name"
          name="name"
          handleChange={(o) => {
            setSelectedOptions(o);
          }}
          selectedOptions={selectedOptions}
          label="shit house"
          options={labelOptions}
        />

        <div className="grid md:grid-cols-2 md:gap-6">
          <FormTextInput
            id={id}
            name="name"
            placeholder={' '}
            value={' '}
            label={'Some Value That Card May Contain 2'}
            onChange={() => {}}
          />
          <FormTextInput
            id="name"
            name="name"
            placeholder={' '}
            value={' '}
            label={'Some Value That Card May Contain 3'}
            onChange={() => {}}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <FormTextInput
            id="name"
            name="name"
            placeholder={' '}
            value={''}
            label={'Some Value That Card May Contain 4'}
            onChange={() => {}}
          />
          <FormTextInput
            id="name"
            name="name"
            placeholder={' '}
            value={'Some static value'}
            label={'Some Value That Card May Contain 5'}
            onChange={() => {}}
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
            Submit
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
