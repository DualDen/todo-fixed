import { useState, useContext, useEffect } from 'react';

import styles from './Form.module.css';

import { TodosContext } from 'contexts/TodosContext';

import {TodoInput} from './TodoInput/TodoInput';
import {Tracker} from './Tracker/Tracker';

export const Form: React.FC = (): JSX.Element|null => {
  const context = useContext(TodosContext);
  const [input, setInput] = useState("");
  useEffect(() => {
    if (
       !error &&
        status
    ) {
      setInput(payload.todo!);
    }
  }, [context?.states.editMode, context?.states.errorState.error]);

  useEffect(() => {
    if (!status) {
      setInput('');
    }
  }, [context?.states.editMode.editMode.status]);
  if(!context) return null;
  const {updateTodo,createTodo} = context.actions;
  const {error,setError} = context.states.errorState;
  const {status,payload} = context.states.editMode.editMode


  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    setInput(value);
  };

  const handleUpdateTodo = (id: string, todo: string) => {
    updateTodo(id, todo);
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!input.trim().length) {
      setError('Enter a task.');
      return false;
    }

    if (status && payload._id) {
      handleUpdateTodo(payload._id!, input);

      setError(null);
    } else {
      createTodo(input);
      setInput("");

      setError(null);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <TodoInput input={input} action={handleInputChange} />

      {error && (
        <small className={styles.error}>
          {error}
        </small>
      )}

      <Tracker />
    </form>
  );
};

