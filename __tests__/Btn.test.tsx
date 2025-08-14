import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Btn } from '../src/ui/components/Btn';


describe('<Btn />', () => {
  it('renders label', () => {
    const { getByText } = render(<Btn label="Click Me" onPress={() => {}} />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('fires onPress', () => {
    const mockFn = jest.fn();
    const { getByText } = render(<Btn label="Click Me" onPress={mockFn} />);
    fireEvent.press(getByText('Click Me'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
