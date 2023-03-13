import { useState, useContext, useEffect } from 'react';

import styles from './Form.module.css';

import { TodosContext } from 'contexts/TodosContext';

import TodoInput from './TodoInput/TodoInput';
import Tracker from './Tracker/Tracker';

const Form: React.FC = (): JSX.Element => {
  const context = useContext(TodosContext);

  console.log(context)

  const [input, setInput] = useState((): string => {
    const ret = '';
    return ret;
  });

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    setInput(value);
  };

  const handleUpdateTodo = (id: any, todo: string) => {
    if (!context) return;

    const {
      actions: { updateTodo },
    } = context;
    updateTodo(id, todo);
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!context) return;

    const {
      states: {
        errorState: { setError },
        editMode: {
          editMode: { status, payload },
          setEditMode,
        },
      },
      actions: { createTodo },
    } = context;

    if (!input.trim().length) {
      setError('Enter a task.');
      return false;
    }

    if (status && payload._id) {
      handleUpdateTodo(payload._id!, input);

      setError(null);
    } else {
      createTodo(input);

      setError(null);
    }

    setEditMode({
      status: false,
      payload: { _id: null, todo: null },
    });

    setInput('');
  };

  useEffect(() => {
    if (
      !context?.states.errorState.error &&
      context?.states.editMode.editMode.status
    ) {
      setInput(context?.states.editMode.editMode.payload.todo!);
    }
  }, [context?.states.editMode, context?.states.errorState.error]);

  useEffect(() => {
    if (!context?.states.editMode.editMode.status) {
      setInput('');
    }
  }, [context?.states.editMode.editMode.status]);

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <TodoInput input={input} action={handleInputChange} />

      {context?.states.errorState.error && (
        <small className={styles.error}>
          {context.states.errorState.error}
        </small>
      )}

      <Tracker />
    </form>
  );
};

export default Form;
