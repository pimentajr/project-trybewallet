import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { response as mockData, initialStateHeader, initialStateWithExpenses } from './mockData';
import App from '../App';
import Wallet from '../pages/Wallet';

import { renderWithRouterAndStore } from './testConfig';

const apiResponse = Promise.resolve({
  json: () => Promise.resolve(mockData),
  ok: true,
});

const mockedExchange = jest.spyOn(global, 'fetch').mockImplementation(() => apiResponse);

afterEach(() => jest.clearAllMocks());

describe('10 - Crie um botão para deletar uma despesa da tabela contendo as seguintes características:', () => {
  const initial = initialStateWithExpenses;

  test('O botão deve estar dentro do último item da linha da tabela e deve possuir `data-testid="delete-btn"`', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    expect(screen.getAllByTestId('delete-btn')[0]).toBeInTheDocument();
  });

  test('Ao ser clicado, o botão deleta a linha da tabela, alterando o estado global.', () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const deleteBtn = screen.getAllByTestId('delete-btn')[0];
    fireEvent.click(deleteBtn);

    expect(screen.getByRole('cell', { name: 'Vinte euros' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Trabalho' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Dinheiro' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '20' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Euro' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '6.57' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '131.37' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Real' })).toBeInTheDocument();
    const newExpenses = [
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: 'Trabalho',
        description: 'Vinte euros',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toStrictEqual(newExpenses);
  });

  test('Ao clicar no botão para remover uma despesa, o valor correspondente deve ser subtraído e a despesa total deve ser atualizada no header', () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const deleteBtn = screen.getAllByTestId('delete-btn')[0];

    fireEvent.click(deleteBtn);

    const newExpenses = [
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: 'Trabalho',
        description: 'Vinte euros',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toStrictEqual(newExpenses);

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toContainHTML('131.37');
  });
});