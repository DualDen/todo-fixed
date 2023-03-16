import { useContext } from 'react';

import styles from './TodoList.module.css';

import { TodosContext } from 'contexts/TodosContext';

import {Todo} from './Todo/Todo';

export const TodoList: React.FC = (): JSX.Element | null => {
  const context = useContext(TodosContext);

  if (!context) return null;

  const { state } = context;

  const stateCheck = () => {
    return state.length ? (
        <ul className={styles.list}>
          {state.map((todo) => (
              <Todo key={todo._id} todo={todo} />
          ))}
        </ul>
    ) : (
        <p className={styles.empty}>No tasks yet. Create one!</p>
    );
  }

  return (
    stateCheck()
  );

};

