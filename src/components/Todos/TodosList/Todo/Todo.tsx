import React, { useContext, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import styles from './Todo.module.css';

import { TodosContext } from 'contexts/TodosContext';

import { ITodo } from 'utils/constants/types';
import { TodoIcons } from 'utils/constants/icons';

type Props = {
  todo: ITodo;
};

export const Todo: React.FC<Props> = ({ todo }): JSX.Element | null => {
  const { Options } = TodoIcons;

  const [optionsToggle, setOptionsToggle] = useState(false);

  const optionsReference = useRef<null | HTMLDivElement>(null);

  const context = useContext(TodosContext);

  useEffect(() => {
    const effect = ({ target }: MouseEvent) => {
      if (
        optionsToggle &&
        optionsReference.current &&
        !optionsReference.current.contains(target as Node)
      ) {
        setOptionsToggle(false);
      }
    };

    document.addEventListener('mousedown', effect);

    return () => {
      document.removeEventListener('mousedown', effect);
    };
  }, [optionsToggle]);

  if (!context) return null;

  const {setEditMode} = context.states.editMode;
  const {setError} = context.states.errorState;
  const {deleteTodo, completeTodo} = context.actions

  const { Edit, Delete } = TodoIcons;

  const handleUpdateToggle = (id: string, todo: string): void => {
    setEditMode({
      status: true,
      payload: { _id: id, todo },
    });

    setError(null);
  };

  const handleDeleteTodo = (id: string): void => {
    deleteTodo(id);

    setError(null);
  };

  const handleCompleteTodo = (id: string) => {
    completeTodo(id);

    setEditMode({
      status: false,
      payload: {
        _id: null,
        todo: null,
      },
    });
  };

  const handleOptionsToggle = () => {
    setOptionsToggle(!optionsToggle);
  };

  const handleEnterAccessibility = (
    { target, key }: React.KeyboardEvent<HTMLSpanElement>,
    id: string,
    todo?: string
  ): void => {
    const innerTargetText = (target as HTMLSpanElement).innerText;

    if (key === 'Enter') {
      handleDeleteTodo(id);
    }

    if (innerTargetText === 'Delete') {
      handleDeleteTodo(id);
    }

    if (key === 'Enter') {
      handleUpdateToggle(id, todo!);
    }

    if (innerTargetText === 'Edit') {
      handleUpdateToggle(id, todo!);
    }
  };

  return (
    <motion.li
      className={styles.todo}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ stiffness: 10 }}
    >
      <p
        className={todo.completed ? styles.completed : styles.incomplete}
        onDoubleClick={() => handleCompleteTodo(todo._id)}
      >
        {todo.todo}
      </p>

      <div ref={optionsReference} className={styles.options}>
        <button
          className={styles.options__button}
          onClick={handleOptionsToggle}
        >
          <Options />
        </button>

        {optionsToggle && (
          <div className={styles.options__table}>
            <span className={todo.completed ? styles.button__inaccessible : ''}>
              <span
                role="button"
                aria-label="edit button"
                tabIndex={0}
                className={
                  todo.completed ? styles.button__disabled : styles.buttons
                }
                onClick={() => {
                  handleUpdateToggle(todo._id, todo.todo);
                  setOptionsToggle(false);
                }}
                onKeyUp={(e) => handleEnterAccessibility(e, todo._id, todo.todo)}
              >
                <span>
                  <Edit />
                </span>
                <span className={styles.buttons__text}>Edit</span>
              </span>
            </span>

            <hr />

            <span
              role="button"
              aria-label="delete button"
              tabIndex={0}
              className={styles.buttons}
              onClick={() => {
                handleDeleteTodo(todo._id);
                setOptionsToggle(false);
              }}
              onKeyUp={(e) => handleEnterAccessibility(e, todo._id)}
            >
              <span>
                <Delete />
              </span>
              <span className={'buttons__text'}>Delete</span>
            </span>
          </div>
        )}
      </div>
    </motion.li>
  );
};


