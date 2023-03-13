import { useContext } from 'react';

import styles from './Tracker.module.css';

import { TodosContext } from 'contexts/TodosContext';

const Tracker: React.FC = (): JSX.Element | null => {
  const context = useContext(TodosContext);

  if (!context) return null;

  const {
    state,
    states: { completedTodos },
  } = context;

  return (
    <div className={styles.counter}>
      <small className={styles.blocks}>
        {state.length === 1
          ? `${completedTodos.length} out of ${state.length} task`
          : `${completedTodos.length} out of ${state.length} tasks`}
      </small>

      <small className={styles.blocks}>
        {`${state.length! - completedTodos.length!} left`}
      </small>
    </div>
  );
};

export default Tracker;
