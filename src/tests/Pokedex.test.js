import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokeName = 'pokemon-name';

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const encounteredPokemon = screen.getByRole('heading', {
      level: 2,
      nome: /Encountered pokémons/i,
    });
    expect(encounteredPokemon).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon quando "Próximo pokémon" é clicado.', () => {
    renderWithRouter(<App />);

    // O botão deve conter o texto Próximo pokémon
    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonBtn).toBeInTheDocument();

    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId(pokeName, { text: pokemon.name });
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextPokemonBtn);
    });

    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    const firstPokemon = screen.getByText(/Pikachu/i);
    pokemons.forEach(() => userEvent.click(nextPokemonBtn));
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId(pokeName);
    expect(pokemonName).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    const electricBtn = screen.getByRole('button', { name: /Electric/i });
    const fireBtn = screen.getByRole('button', { name: /Fire/i });
    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/i });

    userEvent.click(electricBtn);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();

    userEvent.click(fireBtn);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(nextPokemonBtn);
    const rapidash = screen.getByText(/Rapidash/i);
    expect(rapidash).toBeInTheDocument();

    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    // && O texto do botão deve corresponder ao nome do tipo, ex. Psychic
    const pokemonsTypes = [];

    pokemons.forEach((pokemon) => {
      const haveThisType = pokemonsTypes.some((poke) => pokemon.type === poke.type);
      if (!haveThisType) {
        pokemonsTypes.push(pokemon);
      }
    });

    const testIdBtns = screen.getAllByTestId('pokemon-type-button');

    testIdBtns.forEach((type, index) => {
      expect(type.innerHTML).toEqual(pokemonsTypes[index].type);
    });

    // O botão All precisa estar sempre visível.
    const allFilterBtn = screen.getByRole('button', { name: /All/i });
    expect(allFilterBtn).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allFilterBtn = screen.getByRole('button', { name: /All/i });
    expect(allFilterBtn).toBeInTheDocument();
    userEvent.click(allFilterBtn);
  });
});
