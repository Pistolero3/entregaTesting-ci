import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent spec', () => {
  it('should display the title', () => {
    //Arrange
    const isOpen = true;
    const onAccept = () => {};
    const onClose = () => {};
    const title = 'test title';
    const labels = {
      closeButton: 'Close',
      acceptButton: 'Accept',
    };
    const children = <div test-id="children-test">test children</div>;

    //Act
    const { getByText } = render(
      <ConfirmationDialogComponent
        isOpen={isOpen}
        onAccept={onAccept}
        onClose={onClose}
        labels={labels}
        children={children}
        title={title}
      />
    );

    //Assert
    const titleElement = getByText('test title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.tagName).toEqual('H2');
    expect(titleElement.textContent).toEqual('test title');
  });

  it('should display the children', () => {
    //Arrange
    const isOpen = true;
    const onAccept = () => {};
    const onClose = () => {};
    const title = 'test title';
    const labels = {
      closeButton: 'Close',
      acceptButton: 'Accept',
    };
    const children = <div title="test-children">test children</div>;

    //Act
    const { getByTitle } = render(
      <ConfirmationDialogComponent
        isOpen={isOpen}
        onAccept={onAccept}
        onClose={onClose}
        labels={labels}
        children={children}
        title={title}
      />
    );

    //Assert
    const childrenElement = getByTitle('test-children');

    expect(childrenElement).toBeTruthy();
    expect(childrenElement.textContent).toEqual('test children');
  });

  it('should display the title using snapshot testing', () => {
    //Arrange
    const isOpen = true;
    const onAccept = () => {};
    const onClose = () => {};
    const title = 'teston title';
    const labels = {
      closeButton: 'Close',
      acceptButton: 'Accept',
    };
    const children = <div>test children</div>;

    //Act
    const { asFragment } = render(
      <ConfirmationDialogComponent
        isOpen={isOpen}
        onAccept={onAccept}
        onClose={onClose}
        labels={labels}
        children={children}
        title={title}
      />
    );

    //Assert
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display the title using inline snapshot testing', () => {
    //Arrange
    const isOpen = true;
    const onAccept = () => {};
    const onClose = () => {};
    const title = 'teston title';
    const labels = {
      closeButton: 'Close',
      acceptButton: 'Accept',
    };
    const children = <div>test children</div>;

    //Act
    const { asFragment } = render(
      <ConfirmationDialogComponent
        isOpen={isOpen}
        onAccept={onAccept}
        onClose={onClose}
        labels={labels}
        children={children}
        title={title}
      />
    );

    //Assert
    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
  });

  it('should display the title using jest-dom', () => {
    //Arrange
    const isOpen = true;
    const onAccept = () => {};
    const onClose = () => {};
    const title = 'teston title';
    const labels = {
      closeButton: 'Close',
      acceptButton: 'Accept',
    };
    const children = <div>test children</div>;

    //Act
    render(
      <ConfirmationDialogComponent
        isOpen={isOpen}
        onAccept={onAccept}
        onClose={onClose}
        labels={labels}
        children={children}
        title={title}
      />
    );
    const titleElement = screen.getByText('teston title');

    //Assert
    expect(titleElement).toBeInTheDocument();
  });

  it('should display all the buttons', () => {
    //Arrange
    const isOpen = true;
    const onAccept = () => {};
    const onClose = () => {};
    const title = 'teston title';
    const labels = {
      closeButton: 'Close',
      acceptButton: 'Accept',
    };
    const children = <div>test children</div>;

    //Act
    render(
      <ConfirmationDialogComponent
        isOpen={isOpen}
        onAccept={onAccept}
        onClose={onClose}
        labels={labels}
        children={children}
        title={title}
      />
    );
    const buttonElements = screen.getAllByRole('button');

    //Assert
    expect(buttonElements).toHaveLength(2);
    expect(buttonElements[0].textContent).toEqual('Close');
    expect(buttonElements[1].textContent).toEqual('Accept');
    expect(buttonElements[0].tagName).toEqual('BUTTON');
    expect(buttonElements[1].tagName).toEqual('BUTTON');
    expect(buttonElements[0].onclick).toBeInstanceOf(Function);
    expect(buttonElements[1].onclick).toBeInstanceOf(Function);
  });

  it('should click on the close button', async () => {
    //Arrange
    let isOpen = true;
    const onAccept = () => {};
    const onClose = () => {
      isOpen = false;
    };
    const title = 'teston title';
    const labels = {
      closeButton: 'Close',
      acceptButton: 'Accept',
    };
    const children = <div>test children</div>;

    //Act
    render(
      <ConfirmationDialogComponent
        isOpen={isOpen}
        onAccept={onAccept}
        onClose={onClose}
        labels={labels}
        children={children}
        title={title}
      />
    );
    const closeButton = screen.getByText('Close');
    await userEvent.click(closeButton);

    // Asserte
    expect(isOpen).toBe(false);
  });
});
