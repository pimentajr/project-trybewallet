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

describe('6 - Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:', () => {
  test('Um campo para adicionar o valor da despesa', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const valueInput = await screen.findByLabelText(/valor/i);

    expect(valueInput).toBeInTheDocument();
  });

  test('Um campo para selecionar em qual moeda será registrada a despesa', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const currencyInput = await screen.findByRole('combobox', {
      name: /moeda/i,
    });

    expect(currencyInput).toBeInTheDocument();
  });

  test('Um campo para selecionar qual método de pagamento será utilizado', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const methodInput = await screen.findByRole('combobox', {
      name: /método de pagamento/i,
    });

    const moneyOption = screen.getByRole('option', { name: /dinheiro/i });
    const creditOption = screen.getByRole('option', { name: /cartão de crédito/i });
    const debitOption = screen.getByRole('option', { name: /cartão de débito/i });

    expect(methodInput).toBeInTheDocument();
    expect(moneyOption).toBeInTheDocument();
    expect(creditOption).toBeInTheDocument();
    expect(debitOption).toBeInTheDocument();
  });

  test('Um campo para selecionar uma categoria (tag) para a despesa.', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const tagInput = await screen.findByRole('combobox', {
      name: /tag/i,
    });
    const foodOption = screen.getByRole('option', { name: /alimentação/i });
    const funOption = screen.getByRole('option', { name: /lazer/i });
    const workOption = screen.getByRole('option', { name: /trabalho/i });
    const transportOption = screen.getByRole('option', { name: /transporte/i });
    const healthOption = screen.getByRole('option', { name: /saúde/i });

    expect(tagInput).toBeInTheDocument();
    expect(foodOption).toBeInTheDocument();
    expect(funOption).toBeInTheDocument();
    expect(workOption).toBeInTheDocument();
    expect(transportOption).toBeInTheDocument();
    expect(healthOption).toBeInTheDocument();
  });

  test('Um campo para adicionar a descrição da despesa', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const descriptionInput = await screen.findByRole('textbox', {
      name: /descrição/i,
    });

    expect(descriptionInput).toBeInTheDocument();
   });
});