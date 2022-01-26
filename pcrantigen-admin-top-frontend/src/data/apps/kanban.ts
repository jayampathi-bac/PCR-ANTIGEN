import { reactive } from 'vue'

export const tasks = reactive([
  {
    id: '1',
    title: 'Create prototype with JWT authentication',
    state: 'new',
    dueDate: '3 weeks',
    participants: [
      {
        color: 'warning',
        picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png',
      },
    ],
  },
  {
    id: '2',
    title: 'Design a todo list component using React',
    state: 'new',
    dueDate: '3 weeks',
    participants: [
      {
        color: 'info',
        picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png',
      },
    ],
  },
  {
    id: '3',
    title: 'Implement the users REST API',
    state: 'progress',
    dueDate: '3 days',
    participants: [
      {
        color: 'danger',
        picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png',
      },
      {
        picture: '/demo/avatars/26.jpg',
      },
      {
        picture: '/demo/avatars/19.jpg',
      },
    ],
  },
  {
    id: '4',
    title: 'Review project wireframes',
    state: 'progress',
    dueDate: '1 week',
    participants: [
      {
        color: 'success',
        picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png',
      },
    ],
  },
  {
    id: '5',
    title: 'Implement new footer in all pages',
    state: 'progress',
    dueDate: '5 days',
    participants: [
      {
        color: 'info',
        picture: '/demo/avatars/16.jpg',
      },
    ],
  },
  {
    id: '6',
    title: 'Implement the projects REST API',
    state: 'ready',
    dueDate: '2 days',
    participants: [
      {
        color: 'warning',
        picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png',
      },
    ],
  },
  {
    id: '7',
    title: 'Landing page redesign',
    state: 'completed',
    dueDate: 'On time',
    participants: [
      {
        color: 'success',
        picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png',
      },
    ],
  },
  {
    id: '8',
    title: 'Projects REST API Implementation',
    state: 'completed',
    dueDate: 'On time',
    participants: [
      {
        color: 'danger',
        picture: '/demo/avatars/18.jpg',
      },
      {
        picture: '/demo/avatars/9.jpg',
      },
    ],
  },
  {
    id: '9',
    title: 'Database replication setup',
    state: 'completed',
    dueDate: 'On time',
    participants: [
      {
        color: 'primary',
        picture: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png',
      },
    ],
  },
  {
    id: '10',
    title: 'Firebase demo application setup',
    state: 'completed',
    dueDate: 'On time',
    participants: [
      {
        color: 'warning',
        picture: '/demo/avatars/16.jpg',
      },
    ],
  },
])
