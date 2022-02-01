import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('4. Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um h2 com o texto "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem: https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    const image = screen.getByAltText(/Pikachu crying/i);
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
