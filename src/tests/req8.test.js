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

describe('8.1 - Desenvolva a opção de "Adicionar despesa" na sua tabela de gastos', () => {
  test('Crie um botão com o texto \'Adicionar despesa\' que salva as informações da despesa no estado global e atualiza a soma de despesas no header', async () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira');

    const addButton = await screen.findByRole('button', {
      name: /adicionar despesa/i,
    });
    const valueInput = await screen.findByLabelText(/valor/i);
    const currencyInput = await screen.findByRole('combobox', {
      name: /moeda/i,
    });
    const methodInput = await screen.findByRole('combobox', {
      name: /método de pagamento/i,
    });
    const tagInput = await screen.findByRole('combobox', {
      name: /tag/i,
    });
    const descriptionInput = await screen.findByRole('textbox', {
      name: /descrição/i,
    });

    userEvent.type(valueInput, '10');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.type(descriptionInput, 'Dez dólares');
    userEvent.click(addButton);

    await waitFor(() => {
      expect(mockedExchange).toBeCalledTimes(1);
    });

    const expectedStateExpense = [
      {
        id: 0,
        value: '10',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Dez dólares',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toStrictEqual(expectedStateExpense);
  });
});

describe('8.2 - Desenvolva a opção de "Adicionar despesa" na sua tabela de gastos', () => {
  test('Crie um botão com o texto \'Adicionar despesa\' que salva as informações da despesa no estado global e atualiza a soma de despesas no header', async () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira');

    const addButton = await screen.findByRole('button', {
      name: /adicionar despesa/i,
    });
    const valueInput = await screen.findByLabelText(/valor/i);
    const currencyInput = await screen.findByRole('combobox', {
      name: /moeda/i,
    });
    const methodInput = await screen.findByRole('combobox', {
      name: /método de pagamento/i,
    });
    const tagInput = await screen.findByRole('combobox', {
      name: /tag/i,
    });
    const descriptionInput = await screen.findByRole('textbox', {
      name: /descrição/i,
    });
    
    userEvent.type(valueInput, '10');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.type(descriptionInput, 'Dez dólares');
    userEvent.click(addButton);

    userEvent.type(valueInput, '20');
    userEvent.selectOptions(currencyInput, 'EUR');
    userEvent.selectOptions(methodInput, 'Cartão de débito');
    userEvent.selectOptions(tagInput, 'Trabalho');
    userEvent.type(descriptionInput, 'Vinte euros');
    userEvent.click(addButton);

    await waitFor(() => {
      expect(mockedExchange).toBeCalledTimes(3);
    });

    const expectedStateExpense2 = [
      {
        id: 0,
        value: '10',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Dez dólares',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Cartão de débito',
        tag: 'Trabalho',
        description: 'Vinte euros',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toStrictEqual(expectedStateExpense2);

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toContainHTML('187.12');
  });
});
