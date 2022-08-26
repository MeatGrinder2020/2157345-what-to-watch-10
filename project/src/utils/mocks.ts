import {internet} from 'faker';
import {FilmsData, UserProcess} from '../types/state';
import { Comments } from '../types/types';

export const makeFakeAratarUrl = (): UserProcess => ({
  avatarUrl: internet.avatar(),
} as UserProcess);

export const makeFakeFilmsData = (): FilmsData => ({
  films: [{
    id: 1,
    name: 'The Grand Budapest Hotel',
    posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
    previewImage: 'img/the-grand-budapest-hotel.jpg',
    backgroundImage: 'img/the-grand-budapest-hotel-bg.jpg',
    backgroundColor: '#ffffff',
    videoLink: 'https://some-link',
    previewVideoLink: 'https://some-link',
    description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.',
    rating: 8.9,
    scoresCount: 240,
    director: 'Wes Anderson',
    starring: [
      'Bill Murray'
    ],
    runTime: 99,
    genre: 'Comedy',
    released: 2014,
    isFavorite: false
  }],
} as unknown as FilmsData);

export const makeFakeCommentsData = (): Comments => (
  [
    {
      comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
      date: 'Wed Aug 24 2022 21:40:19 GMT+0300 (Москва, стандартное время)',
      id: 1,
      rating: 8.9,
      user: {
        id: 4,
        name: 'Kate Muir'
      }
    }
  ]);
