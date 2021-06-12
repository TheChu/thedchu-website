import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import Scroll from '../../src/components/Scroll';

window.scroll = jest.fn();
Element.prototype.getBoundingClientRect = jest.fn();
(Element.prototype.getBoundingClientRect as jest.Mock).mockReturnValue({
  top: 100,
});
console.log = jest.fn(); // eslint-disable-line

describe('Scroll', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('no props', () => {
    const scrollButtonNoProps = (
      <Scroll>
        <button type="button" aria-label="Test button" />
      </Scroll>
    );

    it('should match Scroll snapshot', () => {
      const { asFragment } = render(scrollButtonNoProps);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should call window.scroll with top as 0', () => {
      const { getByRole } = render(scrollButtonNoProps);
      expect(window.scroll).not.toHaveBeenCalled();

      fireEvent.click(getByRole('button', { name: 'Test button' }));
      expect(window.scroll).toHaveBeenCalledWith({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      expect(Element.prototype.getBoundingClientRect).not.toHaveBeenCalled();
    });
  });

  describe('id type', () => {
    it('should call window.scroll', () => {
      const { getByRole } = render(
        <>
          <Scroll type="id" element="test-div">
            <button type="button" aria-label="Test button" />
          </Scroll>
          <div id="test-div" />
        </>
      );
      expect(window.scroll).not.toHaveBeenCalled();

      fireEvent.click(getByRole('button', { name: 'Test button' }));
      expect(window.scroll).toHaveBeenCalledTimes(1);
      expect(window.scroll).toHaveBeenCalledWith({
        top: 100,
        left: 0,
        behavior: 'smooth',
      });
    });

    it('should not call window.scroll if element does not exist', () => {
      const { getByRole } = render(
        <>
          <Scroll type="id" element="wrong-div">
            <button type="button" aria-label="Test button" />
          </Scroll>
          <div id="test-div" />
        </>
      );
      expect(window.scroll).not.toHaveBeenCalled();

      fireEvent.click(getByRole('button', { name: 'Test button' }));
      expect(window.scroll).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Element not found: wrong-div'); // eslint-disable-line
    });

    describe('offset', () => {
      it('should call window.scroll with offset', () => {
        const { getByRole } = render(
          <>
            <Scroll type="id" element="test-div" offset={50}>
              <button type="button" aria-label="Test button" />
            </Scroll>
            <div id="test-div" />
          </>
        );
        expect(window.scroll).not.toHaveBeenCalled();

        fireEvent.click(getByRole('button', { name: 'Test button' }));
        expect(window.scroll).toHaveBeenCalledTimes(1);
        expect(window.scroll).toHaveBeenCalledWith({
          top: 150,
          left: 0,
          behavior: 'smooth',
        });
      });
    });

    describe('timeout', () => {
      it('should call window.scroll after timeout', async () => {
        const { getByRole } = render(
          <>
            <Scroll type="id" element="test-div" timeout={100}>
              <button type="button" aria-label="Test button" />
            </Scroll>
            <div id="test-div" />
          </>
        );
        expect(window.scroll).not.toHaveBeenCalled();

        fireEvent.click(getByRole('button', { name: 'Test button' }));
        await waitFor(() => {
          expect(window.scroll).toHaveBeenCalledTimes(1);
          expect(window.scroll).toHaveBeenCalledWith({
            top: 100,
            left: 0,
            behavior: 'smooth',
          });
        });
      });
    });

    describe('onClick', () => {
      const mockFunc = jest.fn();

      it('should call window.scroll and the provided onClick function', () => {
        const { getByRole } = render(
          <>
            <Scroll type="id" element="test-div" onClick={mockFunc}>
              <button type="button" aria-label="Test button" />
            </Scroll>
            <div id="test-div" />
          </>
        );
        expect(window.scroll).not.toHaveBeenCalled();
        expect(mockFunc).not.toHaveBeenCalled();

        fireEvent.click(getByRole('button', { name: 'Test button' }));
        expect(window.scroll).toHaveBeenCalledTimes(1);
        expect(window.scroll).toHaveBeenCalledWith({
          top: 100,
          left: 0,
          behavior: 'smooth',
        });
        expect(mockFunc).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('class type', () => {
    it('should call window.scroll', () => {
      const { getByRole } = render(
        <>
          <Scroll type="class" element="test-div">
            <button type="button" aria-label="Test button" />
          </Scroll>
          <div className="test-div" />
        </>
      );
      expect(window.scroll).not.toHaveBeenCalled();

      fireEvent.click(getByRole('button', { name: 'Test button' }));
      expect(window.scroll).toHaveBeenCalledTimes(1);
      expect(window.scroll).toHaveBeenCalledWith({
        top: 100,
        left: 0,
        behavior: 'smooth',
      });
    });

    it('should not call window.scroll if element does not exist', () => {
      const { getByRole } = render(
        <>
          <Scroll type="class" element="wrong-div">
            <button type="button" aria-label="Test button" />
          </Scroll>
          <div className="test-div" />
        </>
      );
      expect(window.scroll).not.toHaveBeenCalled();

      fireEvent.click(getByRole('button', { name: 'Test button' }));
      expect(window.scroll).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Element not found: wrong-div'); // eslint-disable-line
    });

    describe('offset', () => {
      it('should call window.scroll with offset', () => {
        const { getByRole } = render(
          <>
            <Scroll type="class" element="test-div" offset={50}>
              <button type="button" aria-label="Test button" />
            </Scroll>
            <div className="test-div" />
          </>
        );
        expect(window.scroll).not.toHaveBeenCalled();

        fireEvent.click(getByRole('button', { name: 'Test button' }));
        expect(window.scroll).toHaveBeenCalledTimes(1);
        expect(window.scroll).toHaveBeenCalledWith({
          top: 150,
          left: 0,
          behavior: 'smooth',
        });
      });
    });

    describe('timeout', () => {
      it('should call window.scroll after timeout', async () => {
        const { getByRole } = render(
          <>
            <Scroll type="class" element="test-div" timeout={100}>
              <button type="button" aria-label="Test button" />
            </Scroll>
            <div className="test-div" />
          </>
        );
        expect(window.scroll).not.toHaveBeenCalled();

        fireEvent.click(getByRole('button', { name: 'Test button' }));
        await waitFor(() => {
          expect(window.scroll).toHaveBeenCalledTimes(1);
          expect(window.scroll).toHaveBeenCalledWith({
            top: 100,
            left: 0,
            behavior: 'smooth',
          });
        });
      });
    });

    describe('onClick', () => {
      const mockFunc = jest.fn();

      it('should call window.scroll and the provided onClick function', () => {
        const { getByRole } = render(
          <>
            <Scroll type="id" element="test-div" onClick={mockFunc}>
              <button type="button" aria-label="Test button" />
            </Scroll>
            <div id="test-div" />
          </>
        );
        expect(window.scroll).not.toHaveBeenCalled();
        expect(mockFunc).not.toHaveBeenCalled();

        fireEvent.click(getByRole('button', { name: 'Test button' }));
        expect(window.scroll).toHaveBeenCalledTimes(1);
        expect(window.scroll).toHaveBeenCalledWith({
          top: 100,
          left: 0,
          behavior: 'smooth',
        });
        expect(mockFunc).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('invalid type', () => {
    it('should call window.scroll with top as 0', () => {
      const { getByRole } = render(
        <>
          <Scroll type="invalidType" element="test-div">
            <button type="button" aria-label="Test button" />
          </Scroll>
          <div />
        </>
      );
      expect(window.scroll).not.toHaveBeenCalled();

      fireEvent.click(getByRole('button', { name: 'Test button' }));
      expect(window.scroll).toHaveBeenCalledWith({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      expect(Element.prototype.getBoundingClientRect).not.toHaveBeenCalled();
    });
  });

  describe('only onClick', () => {
    const mockFunc = jest.fn();

    it('should call window.scroll with top as 0 and the provided onClick function', () => {
      const { getByRole } = render(
        <>
          <Scroll onClick={mockFunc}>
            <button type="button" aria-label="Test button" />
          </Scroll>
        </>
      );
      expect(window.scroll).not.toHaveBeenCalled();
      expect(mockFunc).not.toHaveBeenCalled();

      fireEvent.click(getByRole('button', { name: 'Test button' }));
      expect(window.scroll).toHaveBeenCalledTimes(1);
      expect(window.scroll).toHaveBeenCalledWith({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      expect(mockFunc).toHaveBeenCalledTimes(1);
    });
  });
});
