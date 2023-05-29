import { Invocation } from '../models/invocation.model'

export const INVOCATIONS_MOCK: Invocation[] = [
  {
    _id: '1',
    status: 'completed',
    functionName: 'Funzione 1',
    image: 'verycool',
    env: [],
    updatedAt: '2023-05-29T03:10:00.065+00:00',
    phases: [
      {
        status: 'pending',
        date: '2023-05-28T02:10:00.065+00:00',
      },
      {
        status: 'initializing',
        date: '2023-05-28T04:10:00.065+00:00',
      },
      {
        status: 'running',
        date: '2023-05-28T08:10:00.065+00:00',
      },
      {
        status: 'completed',
        date: '2023-05-29T02:10:00.065+00:00',
      },
    ],
  },
  {
    _id: '2',
    status: 'failed',
    functionName: 'Funzione 1',
    image: 'verycool',
    env: [],
    updatedAt: '2023-05-29T05:10:00.065+00:00',
    phases: [
      {
        status: 'pending',
        date: '2023-05-28T02:10:00.065+00:00',
      },
      {
        status: 'initializing',
        date: '2023-05-28T04:10:00.065+00:00',
      },
      {
        status: 'running',
        date: '2023-05-28T08:10:00.065+00:00',
      },
      {
        status: 'failed',
        date: '2023-05-29T02:10:00.065+00:00',
      },
    ],
  },
  {
    _id: '3',
    status: 'initializing',
    functionName: 'Funzione bella',
    image: 'kittycatimage.shubbishu',
    env: [],
    updatedAt: '2023-05-29T04:10:00.065+00:00',
    phases: [
      {
        status: 'pending',
        date: '2023-05-28T02:10:00.065+00:00',
      },
      {
        status: 'initializing',
        date: '2023-05-28T04:10:00.065+00:00',
      },
    ],
  },
  {
    _id: '4',
    status: 'pending',
    functionName: 'Function v2',
    image: 'yobitchimage.piennegi',
    env: [],
    updatedAt: '2023-04-28T02:10:00.065+00:00',
    phases: [
      {
        status: 'pending',
        date: '2023-05-28T02:10:00.065+00:00',
      },
    ],
  },
  {
    _id: '5',
    status: 'running',
    functionName: 'Funzione v3',
    image: 'lorem_ipsum_image.geipegh',
    env: [],
    updatedAt: '2023-03-30T02:10:00.065+00:00',
    phases: [
      {
        status: 'pending',
        date: '2023-05-28T02:10:00.065+00:00',
      },
      {
        status: 'initializing',
        date: '2023-05-29T02:10:00.065+00:00',
      },
      {
        status: 'running',
        date: '2023-05-30T02:10:00.065+00:00',
      },
    ],
  },
]
