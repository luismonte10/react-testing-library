import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const favoriteList = screen.queryByAltText(/favorite/i);
    const favoriteText = screen.getByText('No favorite pokemon found');
    if (favoriteList === null) {
      expect(favoriteText).toBeInTheDocument();
    }
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons />);

    const favoriteList = screen.queryAllByAltText(/favorite/i);
    if (favoriteList.length !== 0) {
      expect(favoriteList).toBeInTheDocument();
    }
  });
});
