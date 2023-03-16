import {createContext, FC, ReactNode, useEffect, useReducer, useState} from 'react';
import {nanoid} from 'nanoid';

import {getLocalStorage, setLocalStorage} from 'utils/services/helpers';

import {ArrayOfType, DispatchSetStateActionType, ITodo, StringOrNullType,} from 'utils/constants/types';


type Context = {
  state: ArrayOfType<ITodo>;
  actions: Actions;
  states: {
    editMode: {
      editMode: EditModeType;
      setEditMode: DispatchSetStateActionType<EditModeType>;
    };
    completedTodos: ArrayOfType<ITodo>;
    errorState: {
      error: StringOrNullType;
      setError: DispatchSetStateActionType<StringOrNullType>;
    };
  };
} | null;

type TodosProviderType = {
  children: ReactNode;
};

const enum ACTION_TYPES {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  COMPLETE_TODO,
}

type State = ArrayOfType<ITodo>;

type Action =
  | {
      type: ACTION_TYPES.ADD_TODO;
      payload: {
        todo: string;
      };
    }
  | {
      type: ACTION_TYPES.UPDATE_TODO;
      payload: {
        _id: string;
        todo: string;
      };
    }
  | {
      type: ACTION_TYPES.DELETE_TODO | ACTION_TYPES.COMPLETE_TODO;
      payload: {
        _id: string;
      };
    };

type EditModeType = {
  status: boolean;
  payload: {
    _id: StringOrNullType;
    todo: StringOrNullType;
  };
};

interface Actions {
  createTodo: (todo: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, todo: string) => void;
  completeTodo: (id: string) => void;
}

export const TodosContext = createContext<Context>(null);

const initialState: State = [];

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ACTION_TYPES.ADD_TODO:
      return [
        ...state,
        {
          _id: nanoid(10),
          todo: payload.todo,
          completed: false,
        },
      ];

    case ACTION_TYPES.UPDATE_TODO:
      return state.map((todo) => {
        if (todo._id === payload._id) {
          todo.todo = payload.todo;
        }
        return todo;
      });

    case ACTION_TYPES.DELETE_TODO:
      return state.filter((todo) => todo._id !== payload._id);

    case ACTION_TYPES.COMPLETE_TODO:
      return state.map((todo) => {
        if (todo._id === payload._id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });

    default:
      return state;
  }
};

const init = (): any => {
  return getLocalStorage('todos') ? getLocalStorage('todos') : initialState;
}
export const ProvideTodos: FC<TodosProviderType> = ({
  children,
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const [editMode, setEditMode] = useState<EditModeType>(
     {
      status: false,
      payload: {
        _id: null,
        todo: null,
      },
    });

  const [completedTodos, setCompletedTodos] = useState<ArrayOfType<ITodo>>([]);

  const [error, setError] = useState<StringOrNullType>(null);

  const createTodo = (todo: string): void => {
    const action: Action = {
      type: ACTION_TYPES.ADD_TODO,
      payload: { todo },
    };

    dispatch(action);
  };

  const deleteTodo = (id: string): void => {
    const action: Action = {
      type: ACTION_TYPES.DELETE_TODO,
      payload: {
        _id: id,
      },
    };

    dispatch(action);


  };

  const updateTodo = (id: string, todo: string): void => {
    const action: Action = {
      type: ACTION_TYPES.UPDATE_TODO,
      payload: {
        _id: id,
        todo,
      },
    };

    dispatch(action);
    setEditMode({
      status: false,
      payload: {
        _id: null,
        todo: null,
      },
    });
  };

  const completeTodo = (id: string): void => {
    const action: Action = {
      type: ACTION_TYPES.COMPLETE_TODO,
      payload: { _id: id },
    };

    dispatch(action);
  };

  useEffect(() => {
    const completedTodos = state.filter((todo) => todo.completed);

    setCompletedTodos(completedTodos);
  }, [state]);

  useEffect(() => {
    setLocalStorage('todos', state);
  }, [state]);

  const actions: Actions = { createTodo, deleteTodo, updateTodo, completeTodo };

  const states = {
    editMode: { editMode, setEditMode },
    completedTodos: completedTodos,
    errorState: { error, setError },
  };

  const values: Context = {
    state,
    actions,
    states,
  };

  return (
    <TodosContext.Provider value={values}>{children}</TodosContext.Provider>
  );
};
