import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../src/ui/components/SearchBar';


describe('<SearchBar />', () => {
  it('calls onChangeText', () => {
    const mockFn = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChange={mockFn} onBack={()=>{}} onClear={() => {}}placeholder="Search" />
    );
    fireEvent.changeText(getByPlaceholderText('Search'), 'BTC');
    expect(mockFn).toHaveBeenCalledWith('BTC');
  });
});
