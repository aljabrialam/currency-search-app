import '@testing-library/jest-native/extend-expect';

// Silence warnings for Animated module
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}));
