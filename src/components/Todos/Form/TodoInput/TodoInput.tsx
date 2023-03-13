import styles from '../Form.module.css';

import { TodoIcons } from '../../../../utils/constants/icons';

type Props = {
  input: string;
  action: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TodoInput: React.FC<Props> = ({ input, action }): JSX.Element => {
  const { Add } = TodoIcons;

  return (
    <div className={styles.inputContainer}>
      <span className={styles.inputIcon}>
        <Add />
      </span>
      <input
        type="text"
        placeholder="Add a task"
        className={styles.input}
        value={input}
        onChange={action}
      />
    </div>
  );
};

export default TodoInput;
