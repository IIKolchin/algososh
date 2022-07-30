import { render, screen } from '@testing-library/react';
import { Button } from './button';
import userEvent from '@testing-library/user-event';

const onClick = jest.fn();

describe('Button component', () => {
  it('Button with text', () => {
    const button = render(<Button text='Добавить' />);
    expect(button).toMatchSnapshot();
  });

  it('Button without text', () => {
    const button = render(<Button />);
    expect(button).toMatchSnapshot();
  });

  it('Button disabled', () => {
    const button = render(<Button disabled />);
    expect(button).toMatchSnapshot();
  });

  it('Button isLoader', () => {
    const button = render(<Button isLoader />);
    expect(button).toMatchSnapshot();
  });

  it('Button onClick', () => {
    render(<Button text='Добавить' onClick={onClick} />);
    userEvent.click(screen.getByText('Добавить'));
    expect(onClick).toHaveBeenCalled();
  });
});
