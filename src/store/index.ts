interface IState {
  path: string;
  username: string;
  password: string;
  isAuth: boolean;
  isModalOpen: boolean;
  tasks: ITask[];
  showSuccessAlert: boolean;
}

interface ITask {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

export class Store {
  private state: IState;
  private init: (() => void) | null;

  constructor(state: IState) {
    this.state = state;
    this.init = null;
  }

  forceUpdate() {
    this.init && this.init();
  }

  get getState() {
    return this.state;
  }

  private setState(state: IState) {
    this.state = state;
    if (this.init) this.init();
  }

  subscribeInit(fn: () => void) {
    this.init = fn;
  }

  setPath(path: string) {
    this.setState({
      ...this.state,
      path,
    });
  }

  setUsername(username: string) {
    this.setState({
      ...this.state,
      username,
    });
  }

  setPassword(password: string) {
    this.setState({
      ...this.state,
      password,
    });
  }

  setIsAuth(flag: boolean) {
    this.setState({
      ...this.state,
      isAuth: flag,
    });
  }

  setIsModalOpen(flag: boolean) {
    this.setState({
      ...this.state,
      isModalOpen: flag,
    });
  }

  setShowSuccessAlert(flag: boolean) {
    this.setState({
      ...this.state,
      showSuccessAlert: flag,
    });
  }

  setTasks(tasks: ITask[]) {
    this.setState({
      ...this.state,
      tasks,
    });
  }

  async login(formData: {
    username: string;
    password: string;
  }) {
    const db = {
      username: 'slacker',
      password: 'qwerty123',
    };

    const { username, password } = formData;

    if (
      username !== db.username ||
      password !== db.password
    ) {
      return {
        code: 403,
        message: 'Credentials are incorrect',
      };
    }

    this.setState({
      ...this.state,
      username,
      password,
      isAuth: true,
    });

    return { code: 200 };
  }

  async complete(data: ITask) {
    const tasks = this.state.tasks.map((task) => {
      if (task.id === data.id) {
        return { ...data, completed: true };
      }

      return task;
    });

    this.setState({
      ...this.state,
      tasks,
    });
  }
}
