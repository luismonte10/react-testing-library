import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const POKEMON_NAME = 'pokemon-name';
// const POKEMON_TYPE = 'pokemon-type';
// const POKEMON_WEIGHT = 'pokemon-weight';

describe('6. Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(POKEMON_NAME).innerHTML;
    const pokemonType = screen.getByTestId('pokemon-type').innerHTML;
    const pokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
    const pokemonImage = screen.getByRole('img', { name: `${pokemonName} sprite` });

    const pokemonInfos = pokemons.find((pokemon) => pokemonName === pokemon.name);
    const { name, type, image, averageWeight } = pokemonInfos;
    const { value, measurementUnit } = averageWeight;

    expect(pokemonName).toEqual(name);
    expect(pokemonType).toEqual(type);
    expect(pokemonWeight).toEqual(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImage.src).toEqual(image);
    expect(pokemonImage.alt).toEqual(`${name} sprite`);
  });

  it('Teste se na Pokédex contém um link para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(POKEMON_NAME).innerHTML;
    const pokemonInfos = pokemons.find((pokemon) => pokemonName === pokemon.name);
    const detailsLink = screen.getByRole('link', { name: /More details/i });

    expect(detailsLink).toHaveAttribute('href', `/pokemons/${pokemonInfos.id}`);
  });

  it('Teste se ao clicar no link, é mostrado os detalhes do Pokémon.', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const summary = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(summary).toBeInTheDocument();
  });

  it('Teste se a URL no navegador muda para /pokemon/<id do Pokémon>', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(POKEMON_NAME).innerHTML;
    const pokemonInfos = pokemons.find((pokemon) => pokemonName === pokemon.name);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const { location } = history;
    const { pathname } = location;

    expect(pathname).toEqual(`/pokemons/${pokemonInfos.id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favorite);

    const pokemonName = screen.getByTestId(POKEMON_NAME).innerHTML;
    const favoriteImg = screen.getByRole('img', {
      name: `${pokemonName} is marked as favorite`,
    });

    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
