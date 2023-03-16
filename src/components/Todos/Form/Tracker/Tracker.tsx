import { useContext } from 'react';

import styles from './Tracker.module.css';

import { TodosContext } from 'contexts/TodosContext';

export const Tracker: React.FC = (): JSX.Element | null => {
  const context = useContext(TodosContext);

  if (!context) return null;

  const {state} = context;
  const {completedTodos} = context.states;
  const todosLeft = state.length! - completedTodos.length!;

  const textByLength = () => {
     return state.length === 1
          ? `${completedTodos.length} out of ${state.length} task`
          : `${completedTodos.length} out of ${state.length} tasks`
  }

  return (
    <div className={styles.counter}>
      <small className={styles.blocks}>
        {textByLength()}
      </small>

      <small className={styles.blocks}>
        {`${todosLeft} left`}
      </small>
    </div>
  );
};
