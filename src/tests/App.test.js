import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  it('Ao clicar em Home, a página é redirecionada para "Encountered Pokémons"?', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole('link', { name: /Home/i });

    userEvent.click(homeLink);

    const home = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(home).toBeInTheDocument();
  });

  it('Ao clicar em About, a página é redirecionada para "About Pokédex"?', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = screen.getByRole('link', { name: /About/i });

    userEvent.click(aboutLink);

    const about = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(about).toBeInTheDocument();
  });

  it('Ao clicar em Favorite Pokémons, é redirecionada para "Favorite Pokémons"?', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(favoritePokemonsLink);

    const favoritePokemons = screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('Ao clicar em uma URL desconhecida, é redirecionada para "Not Found"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    history.push('/xablau');

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
