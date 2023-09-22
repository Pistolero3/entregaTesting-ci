import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup, createEmptyLookup } from 'common/models';

describe('useConfirmationDialog spec', () => {
  it('should return the initial state', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    const isOpen = false;
    const defaultCredential: Lookup = createEmptyLookup();
    expect(result.current.isOpen).toBe(isOpen);
    expect(result.current.itemToDelete).toEqual(defaultCredential);
    expect(result.current.onAccept).toEqual(expect.any(Function));
  });

  it('should set isOpen to true when calling onOpenDialog and setting itemToDelete', () => {
    // Arrange
    const item: Lookup = { id: '1', name: 'test' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
    });

    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual({ id: '1', name: 'test' });
  });

  it('should set itemToDelete to empty when calling on Accept', () => {
    // Arrange
    const item: Lookup = { id: '1', name: 'test' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(item);
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should set isOpen to false when calling onClose', () => {
    // Arrange
    const isOpen = true;

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
  });
});
