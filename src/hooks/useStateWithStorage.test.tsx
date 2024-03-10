import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useStateWithStorage from './useStateWithStorage';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key]),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

const TestComponent: React.FC<{ defaultValue: number }> = ({ defaultValue }) => {
  const [value, setValue] = useStateWithStorage<number>('testKey', defaultValue);

  return (
    <div>
      <span data-testid="value">{value}</span>
      <button onClick={() => setValue(value + 1)}>Increment Value</button>
    </div>
  );
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useStateWithStorage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test('initializes with default value', () => {
    const { getByTestId } = render(<TestComponent defaultValue={10} />);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('testKey', '10');
    expect(getByTestId('value')).toHaveTextContent('10');
  });

  test('updates value correctly', () => {
    const { getByTestId, getByText } = render(<TestComponent defaultValue={5} />);
    fireEvent.click(getByText('Increment Value'));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('testKey', '6');
    expect(getByTestId('value')).toHaveTextContent('6');
  });

  test('initializes with value from localStorage', () => {
    localStorageMock.getItem = jest.fn((key: string) => '7');
    const { getByTestId } = render(<TestComponent defaultValue={0} />);
    expect(getByTestId('value')).toHaveTextContent('7');
  });
});
