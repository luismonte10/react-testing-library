import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('2. Teste o componente <About.js />.', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const about = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(about).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const pokemonText = screen.getAllByText(/Pokémons/i);
    expect(pokemonText).toHaveLength(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const pokedexImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    renderWithRouter(<About />);

    const image = screen.getByAltText('Pokédex').src;
    expect(image).toEqual(pokedexImage);
  });
});
