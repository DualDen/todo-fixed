import moment from 'moment';

import styles from './Todos.module.css';

import {Form} from './Form/Form';
import {TodoList} from './TodosList/TodoList';

const Todos: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>My Day</h4>

        <div className={styles.date}>
          <p>
            {moment().format('dddd')} {moment().format('D')}{' '}
            {moment().format('MMMM')}
          </p>
        </div>
      </div>

      <Form />

      <TodoList />
    </div>
  );
};

export default Todos;
